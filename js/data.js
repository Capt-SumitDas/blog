/* ============================================
   CYBER BLOG - Data Store
   Add your posts here and they'll show up in
   search, filtering, and the homepage grid.
   ============================================ */

window.BLOG_DATA = [
  // ── BLOG POSTS ──
  {
    id: 'sql-injection-bypass',
    type: 'blog',
    title: 'SQL Injection: Modern WAF Bypass Techniques',
    date: '2024-12-15',
    tags: ['web', 'sqli', 'bypass', 'pentest'],
    excerpt: 'An in-depth look at bypassing modern Web Application Firewalls using advanced SQL injection techniques. We explore encoding tricks, time-based blind injection, and polyglot payloads.',
    url: 'blog/sql-injection-bypass.html',
    readTime: '8 min read',
  },
  {
    id: 'buffer-overflow-101',
    type: 'blog',
    title: 'Buffer Overflow 101: From Crash to Shell',
    date: '2024-11-28',
    tags: ['pwn', 'binary', 'exploit', 'linux'],
    excerpt: 'A beginner-friendly walkthrough of stack-based buffer overflows. We go from finding the vulnerability, controlling EIP, and finally popping a shell with a custom payload.',
    url: 'blog/buffer-overflow-101.html',
    readTime: '12 min read',
  },
  {
    id: 'active-directory-attacks',
    type: 'blog',
    title: 'Active Directory Attacks: Kerberoasting & AS-REP Roasting',
    date: '2024-11-10',
    tags: ['windows', 'ad', 'kerberos', 'pentest'],
    excerpt: 'Exploring Kerberos-based attacks in Active Directory environments. Learn how to perform Kerberoasting and AS-REP Roasting to crack service account passwords offline.',
    url: 'blog/active-directory-attacks.html',
    readTime: '15 min read',
  },
  {
    id: 'web-recon-methodology',
    type: 'blog',
    title: 'My Web Recon Methodology for Bug Bounty',
    date: '2024-10-22',
    tags: ['bugbounty', 'recon', 'web', 'methodology'],
    excerpt: 'A complete walkthrough of my personal recon methodology for bug bounty hunting. Covers subdomain enumeration, technology fingerprinting, and endpoint discovery.',
    url: 'blog/web-recon-methodology.html',
    readTime: '10 min read',
  },
  {
    id: 'cryptography-rsa-attacks',
    type: 'blog',
    title: 'Breaking Weak RSA: Common Cryptographic Mistakes',
    date: '2024-10-05',
    tags: ['crypto', 'rsa', 'math', 'ctf'],
    excerpt: 'Exploring common RSA implementation weaknesses including small public exponent attacks, common modulus attacks, and Wiener\'s attack on small private exponents.',
    url: 'blog/cryptography-rsa-attacks.html',
    readTime: '14 min read',
  },
  {
    id: 'linux-privesc-guide',
    type: 'blog',
    title: 'Linux Privilege Escalation: A Comprehensive Guide',
    date: '2024-09-18',
    tags: ['linux', 'privesc', 'pentest', 'suid'],
    excerpt: 'Everything you need to know about escalating privileges on Linux systems. Covers SUID binaries, cron jobs, sudo misconfigurations, and capabilities.',
    url: 'blog/linux-privesc-guide.html',
    readTime: '20 min read',
  },

  // ── CTF WRITEUPS ──
  {
    id: 'ctf-picoctf-babygame',
    type: 'ctf',
    title: 'BabyGame01',
    event: 'picoCTF 2024',
    category: 'pwn',
    difficulty: 2,
    points: 200,
    tags: ['pwn', 'picoctf'],
    excerpt: 'Exploiting a simple game binary by overwriting adjacent stack variables through unchecked user input in a grid-movement game.',
    url: 'ctf/picoctf-babygame.html',
  },
  {
    id: 'ctf-htb-bizness',
    type: 'ctf',
    title: 'Bizness',
    event: 'HackTheBox',
    category: 'web',
    difficulty: 1,
    points: 20,
    tags: ['web', 'htb', 'cve', 'apache'],
    excerpt: 'Exploiting CVE-2023-51467 in Apache OFBiz to achieve pre-authentication RCE, followed by hash extraction from Derby database for privilege escalation.',
    url: 'ctf/htb-bizness.html',
  },
  {
    id: 'ctf-ctflearn-rsa',
    type: 'ctf',
    title: 'RSA Noob',
    event: 'CTFLearn',
    category: 'crypto',
    difficulty: 1,
    points: 30,
    tags: ['crypto', 'rsa', 'ctflearn'],
    excerpt: 'Classic small public exponent attack (e=3) against RSA where the message is small enough that m^3 < n, making the cube root trivial.',
    url: 'ctf/ctflearn-rsa-noob.html',
  },
  {
    id: 'ctf-nahamcon-forensics',
    type: 'ctf',
    title: 'Stego-Saurus',
    event: 'NahamCon CTF 2024',
    category: 'forensics',
    difficulty: 2,
    points: 150,
    tags: ['forensics', 'steganography', 'nahamcon'],
    excerpt: 'Using steghide and zsteg to extract hidden data from a PNG image, then decoding the extracted payload using a custom XOR cipher.',
    url: 'ctf/nahamcon-stego.html',
  },
];

// Populate homepage posts
function renderLatestPosts(containerId, limit = 6) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const posts = window.BLOG_DATA
    .filter(p => p.type === 'blog')
    .slice(0, limit);

  container.innerHTML = posts.map((post, i) => `
    <article class="post-card" data-tags="${post.tags.join(',')}" data-animate data-delay="${i + 1}"
             onclick="window.location='${post.url}'" role="button" tabindex="0">
      <div class="post-meta">
        <span class="post-date">📅 ${formatDate(post.date)}</span>
        <span class="post-read-time">⏱ ${post.readTime}</span>
      </div>
      <h3 class="post-title">${post.title}</h3>
      <p class="post-excerpt">${post.excerpt}</p>
      <div class="post-footer">
        <div class="post-tags">
          ${post.tags.slice(0, 3).map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
        <span class="read-more">Read more</span>
      </div>
    </article>
  `).join('');
}

// Populate CTF section
function renderCTFCards(containerId, limit = 6) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const ctfs = window.BLOG_DATA
    .filter(p => p.type === 'ctf')
    .slice(0, limit);

  container.innerHTML = ctfs.map((ctf, i) => `
    <article class="ctf-card" data-tags="${ctf.tags.join(',')}" data-animate data-delay="${i + 1}"
             onclick="window.location='${ctf.url}'" role="button" tabindex="0">
      <div class="ctf-header">
        <span class="ctf-category cat-${ctf.category}">${getCatIcon(ctf.category)} ${ctf.category}</span>
        <div class="ctf-difficulty" title="Difficulty: ${getDifficultyLabel(ctf.difficulty)}">
          ${getDifficultyDots(ctf.difficulty)}
        </div>
      </div>
      <h3 class="ctf-title">${ctf.title}</h3>
      <p class="ctf-event">🏆 ${ctf.event}</p>
      <p class="ctf-desc">${ctf.excerpt}</p>
      <div class="ctf-footer">
        <span class="ctf-points">⚡ ${ctf.points} pts</span>
        <span class="read-more">Read writeup</span>
      </div>
    </article>
  `).join('');
}

// Helpers
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  });
}

function getCatIcon(cat) {
  const icons = {
    web: '🌐', crypto: '🔐', pwn: '💥', rev: '⚙️',
    misc: '🎲', forensics: '🔍', osint: '👁️'
  };
  return icons[cat] || '🏴';
}

function getDifficultyLabel(d) {
  return ['', 'Easy', 'Medium', 'Hard', 'Insane'][d] || 'Unknown';
}

function getDifficultyDots(d) {
  return Array.from({length: 4}, (_, i) => {
    const cls = i < d ? (d >= 3 ? 'hard' : 'filled') : '';
    return `<span class="diff-dot ${cls}"></span>`;
  }).join('');
}
