/**
 * JAYDEEP MOHITE — CLOUD COCKPIT & INTERACTIVE DEVOPS TERMINAL CONTROLLER
 * Zero-dependency, ultra-fast ES6+ architecture
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initCursorSpotlight();
  initKeyboardShortcuts();
  initInteractiveTerminal();
  initTopologyVisualizer();
  init3DTiltCards();
  initFlightDeck();
  initCommandPalette();
  initClipboard();
  initContactForm();
  initLondonClock();
});

/* ===================================================================
   THEME TOGGLER (Dark / Light Mode)
   =================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-dock');
  const storedTheme = localStorage.getItem('jm-cockpit-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', storedTheme);
  updateThemeIcon(storedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const nextTheme = activeTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('jm-cockpit-theme', nextTheme);
      updateThemeIcon(nextTheme);
      showToast(`Switched to ${nextTheme} mode`);
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('theme-icon-dock');
  if (!icon) return;
  icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

/* ===================================================================
   CURSOR SPOTLIGHT AMBIENT GLOW
   =================================================================== */
function initCursorSpotlight() {
  const spotlight = document.getElementById('cursor-spotlight');
  if (!spotlight) return;

  window.addEventListener('mousemove', (e) => {
    spotlight.style.left = `${e.clientX}px`;
    spotlight.style.top = `${e.clientY}px`;
  });
}

/* ===================================================================
   KEYBOARD SHORTCUTS ENGINE
   =================================================================== */
function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Ignore when typing inside input or textarea
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    switch (e.key) {
      case '1':
        scrollToEl('home');
        break;
      case '2':
        scrollToEl('experience');
        break;
      case '3':
        scrollToEl('architecture');
        break;
      case '4':
        scrollToEl('skills');
        break;
      case '5':
        scrollToEl('contact');
        break;
      case 'r':
      case 'R':
        window.open('JaydeepMohiteResume.pdf', '_blank');
        showToast('Opening official resume PDF...');
        break;
      case 't':
      case 'T':
        const cliInput = document.getElementById('cli-input');
        if (cliInput) {
          cliInput.focus();
          showToast('Interactive Terminal focused');
        }
        break;
    }
  });
}

function scrollToEl(id) {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

/* ===================================================================
   INTERACTIVE DEVOPS TERMINAL SANDBOX ENGINE (jaydeep@london-eks:~#)
   =================================================================== */
function initInteractiveTerminal() {
  const terminalBody = document.getElementById('terminal-body');
  const cliForm = document.getElementById('cli-form');
  const cliInput = document.getElementById('cli-input');
  const chipButtons = document.querySelectorAll('.cli-chip[data-cmd]');

  if (!terminalBody || !cliInput) return;

  let cmdHistory = [];
  let historyIdx = -1;

  const terminalCommands = {
    help: () => `
Available Commands:
  ▹ status       — Live AWS EKS cluster telemetry & health status
  ▹ arch         — Multi-account cloud topology & low-latency architecture
  ▹ skills       — Core competencies (AWS, Kubernetes, Terraform, Java, Spring)
  ▹ benchmarks   — Latency reductions, 99.999% SLA, and zero-downtime cutover stats
  ▹ experience   — Career timeline across J.P. Morgan and Deutsche Bank
  ▹ resume       — Open official compiled PDF resume
  ▹ contact      — Direct email, phone, and LinkedIn coordinates
  ▹ clear        — Clear terminal display
`,
    status: () => `
[jpm-eks-prod-cluster] Status: ACTIVE (Europe-London)
├── Multi-AZ NodeGroups: 3 Availability Zones (eu-west-2a, 2b, 2c)
├── Pods Health: 100% HEALTHY (HPA active: 40-180 replicas)
├── Compute Strategy: Managed NodeGroups + Karpenter Autoscaling
├── IAM Security: IRSA Least-Privilege Guardrails ENFORCED
└── Telemetry: Prometheus / Grafana / CloudWatch Synthetics: OK
`,
    arch: () => `
[Mission-Critical Architecture Topology]
  [Edge / PWA] ──> [Cloudflare CDN] ──> [AWS ALB Ingress]
                                              │
                      ┌───────────────────────┴───────────────────────┐
                      ▼                                               ▼
         [AWS EKS Pods (Java 17)]                         [RiskOne Low-Latency]
                      │                                               │
           [Chronicle Queue / FIX] ──────────────────────────> [Redis In-Memory]
                      │                                               │
             [AWS Aurora PostgreSQL] <── [Terraform IaC] <── [OCI Vault Secrets]
`,
    skills: () => `
[Core Technical Arsenal]
├── Cloud & IaC:      AWS (EKS, Aurora, S3, IAM, VPC), Terraform, Docker, Helm
├── SRE & CI/CD:      Jenkins Pipeline-as-Code, ArgoCD, SonarQube, Prometheus
├── Languages:        Java (8/11/17), Python, Bash, TypeScript, SQL
├── Frameworks:       Spring Boot (Security, Cloud, Data), Chronicle, WebSockets
└── Messaging & DB:   Redis Cache, FIX Protocol, IBM MQ, PostgreSQL, Oracle
`,
    benchmarks: () => `
[Production Impact & Verified Benchmarks]
  ✓ Latency Drop:        >70% latency reduction on RiskOne via in-memory cache
  ✓ EKS Modernization:   0 downtime cloud cutover across enterprise accounts
  ✓ Platform SLA:        99.999% high availability on global trading engines
  ✓ Test Coverage:       65% regression automation via BDD Cucumber/Selenium
`,
    experience: () => `
[Career Dossier Progression]
  1. Vice President — Lead DevOps Engineer | JPM Personal Investing (2024 - Present, London)
  2. Associate Vice President | JPMorgan Services India (2021 - 2024, Bengaluru)
  3. Associate / Senior Analyst / Analyst | Deutsche Bank Group (2017 - 2021, Pune)
  4. Summer Intern | Mastercard Technology (2016, Pune)
`,
    resume: () => {
      window.open('JaydeepMohiteResume.pdf', '_blank');
      return `✓ Opening official compiled PDF resume in new tab...`;
    },
    contact: () => `
[Direct Contact Channels]
  ▹ Email:     jaydeepmohite@hotmail.com
  ▹ Phone:     +44 7459 132498
  ▹ Location:  London, United Kingdom
  ▹ LinkedIn:  https://www.linkedin.com/in/jaydeepmohite
  ▹ GitHub:    https://github.com/jaydeepmohite
`,
    clear: () => {
      terminalBody.innerHTML = '';
      return '';
    },
    sudo: () => `Permission granted: You are authorized as Guest Superuser on Jaydeep's portfolio engine!`,
    uname: () => `Darwin london-eks-node 23.5.0 Darwin Kernel Version x86_64/arm64`,
    top: () => `Tasks: 42 running, 0 failed | Load avg: 0.12, 0.08, 0.05 | Memory: 32GB (18% used)`
  };

  function appendToTerminal(text, isCommand = false) {
    const line = document.createElement('div');
    line.className = 'cli-output-line';
    if (isCommand) {
      line.innerHTML = `<span style="color:var(--neon-emerald); font-weight:700;">jaydeep@london-eks:~#</span> <span style="color:#fff;">${text}</span>`;
    } else {
      line.textContent = text;
    }
    terminalBody.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function executeCommand(input) {
    const rawCmd = input.trim();
    if (!rawCmd) return;

    cmdHistory.push(rawCmd);
    historyIdx = cmdHistory.length;

    appendToTerminal(rawCmd, true);

    const cmdKey = rawCmd.toLowerCase().split(' ')[0];
    if (terminalCommands[cmdKey]) {
      const output = terminalCommands[cmdKey]();
      if (output) {
        appendToTerminal(output.trim());
      }
    } else {
      appendToTerminal(`bash: command not found: ${rawCmd}. Type "help" for a list of commands.`);
    }
  }

  if (cliForm) {
    cliForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = cliInput.value;
      cliInput.value = '';
      executeCommand(val);
    });
  }

  // Chip quick action buttons
  chipButtons.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) {
        executeCommand(cmd);
      }
    });
  });

  // Initial welcome greeting
  appendToTerminal(`Jaydeep Mohite Cloud Cockpit Terminal [Version 2.6.0]
Type "status", "arch", "skills", or "help" to inspect systems.`);
}

/* ===================================================================
   INTERACTIVE ARCHITECTURE TOPOLOGY VISUALIZER
   =================================================================== */
function initTopologyVisualizer() {
  const nodes = document.querySelectorAll('.topology-node');
  const panelHeading = document.getElementById('topology-detail-heading');
  const panelDesc = document.getElementById('topology-detail-desc');
  const panelTech = document.getElementById('topology-detail-tech');

  const topologyData = {
    edge: {
      title: '1. Edge Ingress & Progressive Web App Layer',
      desc: 'High-availability ingress routing with Cloudflare CDN, SSL/TLS termination, Caddy reverse proxy, and mobile PWA service worker caching.',
      tech: 'Cloudflare • Caddy • PWA Service Workers • TLS 1.3'
    },
    compute: {
      title: '2. Multi-Account AWS EKS Compute Cluster',
      desc: 'Container runtime across multi-AZ worker nodes with Kubernetes Horizontal Pod Autoscaling (HPA), Karpenter autoscaling, and IRSA least-privilege guardrails.',
      tech: 'AWS EKS • Kubernetes • Docker • Helm • Karpenter'
    },
    risk: {
      title: '3. Low-Latency Transaction & Risk Engine',
      desc: 'High-throughput post-trade risk evaluation processing real-time market feeds via FIX Protocol handlers, Chronicle queues, and microservices.',
      tech: 'Java 17 • Spring Boot • Chronicle Queue • FIX Protocol'
    },
    cache: {
      title: '4. In-Memory Distributed Cache Layer',
      desc: 'Sub-millisecond static and reference data caching with real-time replication, delivering over 70% latency drops on core transaction workflows.',
      tech: 'Redis In-Memory • WebSockets • IBM MQ • Event-Driven Push'
    },
    storage: {
      title: '5. Multi-Region Data & Secrets Vault',
      desc: 'Strict transactional integrity with AWS Aurora PostgreSQL, 256-bit AES encryption at rest, and automated OCI Vault / AWS Secrets Manager resolution.',
      tech: 'AWS Aurora • PostgreSQL • OCI Vault • 256-bit AES Encryption'
    }
  };

  nodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
      const key = node.getAttribute('data-node');
      if (topologyData[key]) {
        nodes.forEach(n => n.classList.remove('active'));
        node.classList.add('active');
        if (panelHeading) panelHeading.textContent = topologyData[key].title;
        if (panelDesc) panelDesc.textContent = topologyData[key].desc;
        if (panelTech) panelTech.textContent = topologyData[key].tech;
      }
    });

    node.addEventListener('click', () => {
      const key = node.getAttribute('data-node');
      if (topologyData[key]) {
        nodes.forEach(n => n.classList.remove('active'));
        node.classList.add('active');
        if (panelHeading) panelHeading.textContent = topologyData[key].title;
        if (panelDesc) panelDesc.textContent = topologyData[key].desc;
        if (panelTech) panelTech.textContent = topologyData[key].tech;
      }
    });
  });
}

/* ===================================================================
   3D TILT GLARE PHYSICS ON ARCHITECTURE CARDS
   =================================================================== */
function init3DTiltCards() {
  const cards = document.querySelectorAll('.arch-card-3d');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
    });
  });
}

/* ===================================================================
   MISSION EXPERIENCE FLIGHT DECK (Interactive Company Switcher)
   =================================================================== */
function initFlightDeck() {
  const btns = document.querySelectorAll('.flight-btn');
  const panels = document.querySelectorAll('.mission-panel');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-panel');

      btns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const target = document.getElementById(targetId);
      if (target) {
        target.classList.add('active');
      }
    });
  });
}

/* ===================================================================
   COMMAND PALETTE MODAL (⌘K Search)
   =================================================================== */
function initCommandPalette() {
  const triggerBtn = document.getElementById('cmd-palette-trigger-dock');
  const modal = document.getElementById('cmd-modal');
  const input = document.getElementById('cmd-search-input');
  const listContainer = document.getElementById('cmd-results-container');

  if (!modal || !input) return;

  const commands = [
    { title: 'Official Resume (PDF)', desc: 'View official compiled PDF resume', icon: 'fa-file-pdf', action: () => window.open('JaydeepMohiteResume.pdf', '_blank') },
    { title: 'Interactive DevOps Terminal', desc: 'Jump to interactive CLI sandbox in Hero', icon: 'fa-terminal', action: () => { scrollToEl('home'); document.getElementById('cli-input')?.focus(); } },
    { title: 'Cloud Architecture Topology', desc: 'Interactive visual node schematic', icon: 'fa-network-wired', action: () => scrollToEl('architecture') },
    { title: 'Executive Career Flight Deck', desc: 'J.P. Morgan, Deutsche Bank, Mastercard', icon: 'fa-briefcase', action: () => scrollToEl('experience') },
    { title: 'NetWealth Production Platform', desc: 'Live multi-broker investment engine', icon: 'fa-arrow-up-right-from-square', action: () => window.open('https://netwealth.tech', '_blank') },
    { title: 'Technical Radar & Matrix', desc: 'AWS EKS, Terraform, Spring Boot, Java', icon: 'fa-microchip', action: () => scrollToEl('skills') },
    { title: 'Verified Peer Endorsements', desc: 'Goldman Sachs, Harness, Microsoft', icon: 'fa-comment-dots', action: () => scrollToEl('credentials') },
    { title: 'Copy Email Address', desc: 'jaydeepmohite@hotmail.com', icon: 'fa-copy', action: () => copyDirect('jaydeepmohite@hotmail.com') },
    { title: 'Copy Mobile Number', desc: '+44 7459 132498', icon: 'fa-phone', action: () => copyDirect('+447459132498') },
    { title: 'Open LinkedIn Profile', desc: 'linkedin.com/in/jaydeepmohite', icon: 'fa-linkedin', action: () => window.open('https://www.linkedin.com/in/jaydeepmohite', '_blank') }
  ];

  function openModal() {
    modal.classList.add('open');
    input.value = '';
    renderList(commands);
    setTimeout(() => input.focus(), 60);
  }

  function closeModal() {
    modal.classList.remove('open');
  }

  function copyDirect(text) {
    closeModal();
    navigator.clipboard.writeText(text).then(() => {
      showToast(`Copied "${text}" to clipboard!`);
    });
  }

  function renderList(items) {
    if (!listContainer) return;
    listContainer.innerHTML = '';

    if (items.length === 0) {
      listContainer.innerHTML = '<div style="padding:1rem; text-align:center; color:var(--text-muted); font-size:0.9rem;">No matching commands found.</div>';
      return;
    }

    items.forEach((item, idx) => {
      const el = document.createElement('div');
      el.className = `cmd-entry ${idx === 0 ? 'selected' : ''}`;
      el.innerHTML = `
        <div class="cmd-entry-left">
          <i class="fas ${item.icon}"></i>
          <div>
            <div style="font-weight:600; color:var(--text-primary); font-size:0.92rem;">${item.title}</div>
            <div style="font-size:0.78rem; color:var(--text-muted);">${item.desc}</div>
          </div>
        </div>
        <span class="cmd-shortcut-tag">Jump</span>
      `;
      el.addEventListener('click', () => {
        closeModal();
        item.action();
      });
      listContainer.appendChild(el);
    });
  }

  if (triggerBtn) {
    triggerBtn.addEventListener('click', openModal);
  }

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (modal.classList.contains('open')) closeModal();
      else openModal();
    } else if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    if (!q) {
      renderList(commands);
      return;
    }
    const filtered = commands.filter(c => c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q));
    renderList(filtered);
  });
}

/* ===================================================================
   CLIPBOARD & TOAST
   =================================================================== */
function initClipboard() {
  const copyBtns = document.querySelectorAll('.copy-icon-btn');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const text = btn.getAttribute('data-copy');
      if (!text) return;

      navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied "${text}" to clipboard!`);
        btn.innerHTML = '<i class="fas fa-check" style="color:var(--neon-emerald);"></i>';
        setTimeout(() => {
          btn.innerHTML = '<i class="fas fa-copy"></i>';
        }, 2000);
      });
    });
  });
}

function showToast(message) {
  const toast = document.getElementById('cockpit-toast');
  const toastMsg = document.getElementById('cockpit-toast-text');
  if (!toast) return;

  if (toastMsg) toastMsg.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* ===================================================================
   CONTACT FORM (Direct Mailto Client Launch)
   =================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('cockpit-contact-form');
  const formStatus = document.getElementById('cockpit-form-status');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('input-name');
    const emailInput = document.getElementById('input-email');
    const subjectInput = document.getElementById('input-subject');
    const messageInput = document.getElementById('input-message');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const rawSubject = subjectInput && subjectInput.value.trim() ? subjectInput.value.trim() : 'Cloud Platform Discussion';
    const message = messageInput ? messageInput.value.trim() : '';

    if (!name || !email || !message) {
      if (formStatus) {
        formStatus.className = 'form-status-box error';
        formStatus.textContent = 'Please complete all required fields (Name, Email, Message).';
        formStatus.style.display = 'block';
      }
      return;
    }

    const emailSubject = `[Portfolio Contact] ${rawSubject} - from ${name}`;
    const emailBody = `Hi Jaydeep,

${message}

---
Sender: ${name} (${email})
Sent via jaydeepmohite.github.io`;

    const mailtoUrl = `mailto:jaydeepmohite@hotmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    if (formStatus) {
      formStatus.className = 'form-status-box success';
      formStatus.innerHTML = `✓ Launching email app to message <strong>jaydeepmohite@hotmail.com</strong>...<br><small style="color:var(--text-muted); display:inline-block; margin-top:0.45rem;">If your mail app did not open, <a href="${mailtoUrl}" style="color:var(--neon-cyan); text-decoration:underline; font-weight:600;">click here to send</a> or write to <a href="mailto:jaydeepmohite@hotmail.com" style="color:var(--neon-cyan); text-decoration:underline;">jaydeepmohite@hotmail.com</a>.</small>`;
      formStatus.style.display = 'block';
    }

    showToast('Opening email client...');

    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 200);
  });
}

/* ===================================================================
   LONDON LIVE TIME WIDGET
   =================================================================== */
function initLondonClock() {
  const clockEl = document.getElementById('london-live-clock');
  if (!clockEl) return;

  function update() {
    try {
      const options = { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
      const formatter = new Intl.DateTimeFormat([], options);
      clockEl.textContent = formatter.format(new Date());
    } catch (e) {
      const now = new Date();
      clockEl.textContent = `${now.getHours()}:${now.getMinutes()}`;
    }
  }

  update();
  setInterval(update, 1000);
}
