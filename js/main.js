/* ============================================
   CYBER BLOG - Main JavaScript
   ============================================ */

'use strict';

// ── THEME MANAGEMENT ──
const Theme = {
  init() {
    const saved = localStorage.getItem('cyber-theme') || 'dark';
    this.apply(saved);
  },

  apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('cyber-theme', theme);
  },

  toggle() {
    const current = document.documentElement.getAttribute('data-theme');
    this.apply(current === 'dark' ? 'light' : 'dark');
  }
};

// ── TYPING EFFECT ──
class TypeWriter {
  constructor(el, phrases, { speed = 80, deleteSpeed = 40, pause = 2000 } = {}) {
    this.el = el;
    this.phrases = phrases;
    this.speed = speed;
    this.deleteSpeed = deleteSpeed;
    this.pause = pause;
    this.idx = 0;
    this.charIdx = 0;
    this.deleting = false;
    this.run();
  }

  run() {
    const current = this.phrases[this.idx];
    if (this.deleting) {
      this.el.textContent = current.slice(0, --this.charIdx);
      if (this.charIdx === 0) {
        this.deleting = false;
        this.idx = (this.idx + 1) % this.phrases.length;
        setTimeout(() => this.run(), 400);
        return;
      }
      setTimeout(() => this.run(), this.deleteSpeed);
    } else {
      this.el.textContent = current.slice(0, ++this.charIdx);
      if (this.charIdx === current.length) {
        this.deleting = true;
        setTimeout(() => this.run(), this.pause);
        return;
      }
      setTimeout(() => this.run(), this.speed);
    }
  }
}

// ── TERMINAL ANIMATION ──
class Terminal {
  constructor(el) {
    this.el = el;
    this.lines = [
      { type: 'cmd',     text: 'nmap -sV -p 80,443,8080 target.htb' },
      { type: 'output',  text: 'Starting Nmap 7.94...' },
      { type: 'success', text: '80/tcp   open  http    Apache 2.4.51' },
      { type: 'success', text: '443/tcp  open  https   Apache 2.4.51' },
      { type: 'info',    text: '8080/tcp open  http    Jetty 9.4.43' },
      { type: 'blank' },
      { type: 'cmd',     text: 'gobuster dir -u http://target.htb -w /wordlist.txt' },
      { type: 'success', text: '/admin (Status: 301) [Size: 312]' },
      { type: 'success', text: '/backup (Status: 200) [Size: 1024]' },
      { type: 'info',    text: '/secret.txt (Status: 200) [Size: 42]' },
      { type: 'blank' },
      { type: 'cmd',     text: 'cat secret.txt' },
      { type: 'error',   text: 'flag{h4ck_the_pl4n3t_2024}' },
    ];
    this.currentLine = 0;
    this.render();
  }

  render() {
    this.el.innerHTML = '';
    const visible = this.lines.slice(0, this.currentLine);
    visible.forEach(line => {
      const div = document.createElement('div');
      if (line.type === 'blank') {
        div.innerHTML = '&nbsp;';
        this.el.appendChild(div);
        return;
      }
      div.className = 'term-line';
      if (line.type === 'cmd') {
        div.innerHTML = `<span class="term-prompt">┌─[user@kali]─$ </span><span class="term-cmd">${line.text}</span>`;
      } else {
        div.innerHTML = `<span class="term-${line.type}">${line.text}</span>`;
      }
      this.el.appendChild(div);
    });

    if (this.currentLine < this.lines.length) {
      const delay = this.lines[this.currentLine]?.type === 'cmd' ? 600 : 200;
      setTimeout(() => {
        this.currentLine++;
        this.render();
      }, delay);
    } else {
      // Loop after pause
      setTimeout(() => {
        this.currentLine = 0;
        this.render();
      }, 4000);
    }
  }
}

// ── SCROLL ANIMATIONS ──
const ScrollObserver = {
  init() {
    const els = document.querySelectorAll('[data-animate]');
    if (!els.length) return;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    els.forEach(el => obs.observe(el));
  }
};

// ── SEARCH ──
const Search = {
  index: [],
  resultsEl: null,
  inputEl: null,

  init() {
    this.inputEl = document.getElementById('search-input');
    this.resultsEl = document.getElementById('search-results');
    if (!this.inputEl) return;

    // Build index from blog data
    if (window.BLOG_DATA) {
      this.index = window.BLOG_DATA;
    }

    this.inputEl.addEventListener('input', () => this.query(this.inputEl.value));
    this.inputEl.addEventListener('focus', () => {
      if (this.inputEl.value) this.query(this.inputEl.value);
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('#search-results') && !e.target.closest('#search-input')) {
        this.hide();
      }
    });
  },

  query(q) {
    if (!q.trim()) { this.hide(); return; }
    const terms = q.toLowerCase().split(' ').filter(Boolean);
    const results = this.index.filter(item => {
      const haystack = `${item.title} ${item.tags?.join(' ')} ${item.excerpt}`.toLowerCase();
      return terms.every(t => haystack.includes(t));
    }).slice(0, 8);

    this.show(results, q);
  },

  show(results, q) {
    if (!this.resultsEl) return;
    this.resultsEl.classList.add('active');
    if (!results.length) {
      this.resultsEl.innerHTML = `<div class="search-empty">// No results for "${q}"</div>`;
      return;
    }
    this.resultsEl.innerHTML = results.map(r => `
      <div class="search-result-item" onclick="window.location='${r.url}'">
        <div class="search-result-title">${this.highlight(r.title, q)}</div>
        <div class="search-result-meta">
          <span>${r.date || ''}</span>
          ${r.tags?.map(t => `<span class="tag" style="margin-left:4px">${t}</span>`).join('') || ''}
        </div>
      </div>
    `).join('');
  },

  highlight(text, q) {
    const terms = q.split(' ').filter(Boolean);
    let result = text;
    terms.forEach(t => {
      const re = new RegExp(`(${t})`, 'gi');
      result = result.replace(re, '<mark style="background:var(--accent-green);color:var(--bg-primary)">$1</mark>');
    });
    return result;
  },

  hide() {
    this.resultsEl?.classList.remove('active');
  }
};

// ── TAG FILTERING ──
const Filter = {
  init() {
    const filterBtns = document.querySelectorAll('[data-filter]');
    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.apply(filter);
      });
    });
  },

  apply(filter) {
    const cards = document.querySelectorAll('[data-tags]');
    cards.forEach(card => {
      const tags = card.dataset.tags.split(',');
      const show = filter === 'all' || tags.includes(filter);
      card.style.opacity = show ? '1' : '0.3';
      card.style.pointerEvents = show ? 'auto' : 'none';
      card.style.transform = show ? '' : 'scale(0.97)';
    });
  }
};

// ── NAVBAR SCROLL ──
const NavScroll = {
  init() {
    const nav = document.getElementById('navbar');
    if (!nav) return;
    let lastY = 0;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y > 100) {
        nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.4)';
      } else {
        nav.style.boxShadow = 'none';
      }
      lastY = y;
    }, { passive: true });

    // Active nav link
    const links = document.querySelectorAll('.nav-links a');
    const path = window.location.pathname;
    links.forEach(link => {
      if (link.getAttribute('href') === path ||
          (path.includes('blog') && link.getAttribute('href')?.includes('blog')) ||
          (path.includes('ctf') && link.getAttribute('href')?.includes('ctf')) ||
          (path.includes('about') && link.getAttribute('href')?.includes('about'))) {
        link.classList.add('active');
      }
    });
  }
};

// ── BACK TO TOP ──
const BackToTop = {
  init() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
};

// ── READING PROGRESS ──
const ReadingProgress = {
  init() {
    const bar = document.getElementById('reading-progress');
    if (!bar) return;

    window.addEventListener('scroll', () => {
      const total = document.body.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / total) * 100;
      bar.style.width = `${Math.min(progress, 100)}%`;
    }, { passive: true });
  }
};

// ── TOC ACTIVE ──
const TOC = {
  init() {
    const toc = document.querySelector('.toc-list');
    if (!toc) return;

    const headings = document.querySelectorAll('.post-body h2, .post-body h3');
    const links = toc.querySelectorAll('a');

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          links.forEach(l => l.classList.remove('active'));
          const active = toc.querySelector(`a[href="#${e.target.id}"]`);
          active?.classList.add('active');
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });

    headings.forEach(h => obs.observe(h));
  }
};

// ── PAGE LOADER ──
const Loader = {
  init() {
    const loader = document.querySelector('.page-loader');
    if (!loader) return;
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('hidden'), 1500);
    });
  }
};

// ── MOBILE MENU ──
const MobileMenu = {
  init() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const spans = hamburger.querySelectorAll('span');
      if (navLinks.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
  }
};

// ── NEWSLETTER ──
const Newsletter = {
  init() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      const btn = form.querySelector('button');
      const email = input.value.trim();
      if (!email) return;

      btn.textContent = 'Subscribing...';
      btn.disabled = true;

      // Simulate API call
      setTimeout(() => {
        input.value = '';
        btn.textContent = '✓ Subscribed!';
        btn.style.background = 'var(--accent-green)';
        btn.style.color = 'var(--bg-primary)';
        setTimeout(() => {
          btn.textContent = 'Subscribe';
          btn.disabled = false;
          btn.style.background = '';
          btn.style.color = '';
        }, 3000);
      }, 1000);
    });
  }
};

// ── COPY CODE ──
const CodeCopy = {
  init() {
    const blocks = document.querySelectorAll('pre');
    blocks.forEach(block => {
      const btn = document.createElement('button');
      btn.textContent = 'Copy';
      btn.style.cssText = `
        position:absolute; top:0.5rem; right:3rem;
        padding: 0.2rem 0.6rem;
        background: var(--bg-hover);
        border: 1px solid var(--border);
        border-radius: 4px;
        color: var(--text-muted);
        font-family: var(--font-mono);
        font-size: 0.7rem;
        cursor: pointer;
        transition: all 0.2s;
      `;

      btn.addEventListener('click', () => {
        const code = block.querySelector('code')?.textContent || block.textContent;
        navigator.clipboard.writeText(code).then(() => {
          btn.textContent = '✓ Copied';
          btn.style.color = 'var(--accent-green)';
          btn.style.borderColor = 'var(--accent-green)';
          setTimeout(() => {
            btn.textContent = 'Copy';
            btn.style.color = '';
            btn.style.borderColor = '';
          }, 2000);
        });
      });

      block.style.position = 'relative';
      block.appendChild(btn);
    });
  }
};

// ── SMOOTH ANCHOR SCROLL ──
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ── BOOTSTRAP ──
document.addEventListener('DOMContentLoaded', () => {
  Theme.init();
  Loader.init();
  NavScroll.init();
  MobileMenu.init();
  ScrollObserver.init();
  Search.init();
  Filter.init();
  BackToTop.init();
  ReadingProgress.init();
  TOC.init();
  Newsletter.init();
  CodeCopy.init();
  initSmoothScroll();

  // Typing effect
  const typeEl = document.getElementById('typing-target');
  if (typeEl) {
    new TypeWriter(typeEl, [
      'Cybersecurity Researcher',
      'Ethical Hacker',
      'CTF Player',
      'Bug Hunter',
      'Security Blogger',
    ]);
  }

  // Terminal
  const termEl = document.getElementById('terminal-body');
  if (termEl) {
    new Terminal(termEl);
  }

  // Theme toggle
  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => Theme.toggle());
  }
});
