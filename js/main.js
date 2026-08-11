/**
 * JAYDEEP MOHITE — Executive App Workspace Portfolio Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTabNavigation();
  initCompanySelector();
  initProjectFilters();
  initCopyButtons();
  initLondonClock();
  initContactForm();
});

/* -------------------------------------------------------------------
   1. Theme Switcher
   ------------------------------------------------------------------- */
function initTheme() {
  const btn = document.getElementById('theme-btn');
  const icon = document.getElementById('theme-icon');
  
  const saved = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

  setTheme(saved);

  if (btn) {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const target = current === 'light' ? 'dark' : 'light';
      setTheme(target);
      showToast(`Switched to ${target} mode`);
    });
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (icon) {
      icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', theme === 'light' ? '#f8fafc' : '#09090b');
    }
  }
}

/* -------------------------------------------------------------------
   2. Tabbed Workspace Navigation & Hash Routing
   ------------------------------------------------------------------- */
function initTabNavigation() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  if (!tabBtns.length || !tabPanes.length) return;

  const switchTab = (tabId) => {
    const targetPane = document.getElementById(`tab-${tabId}`);
    if (!targetPane) return;

    tabBtns.forEach(btn => {
      const isTarget = btn.getAttribute('data-tab') === tabId;
      btn.classList.toggle('active', isTarget);
      btn.setAttribute('aria-selected', isTarget ? 'true' : 'false');
    });

    tabPanes.forEach(pane => {
      pane.classList.remove('active');
    });

    targetPane.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      switchTab(tabId);
      window.location.hash = tabId;
    });
  });

  // Handle URL Hash navigation (e.g. #work, #experience, #skills, #contact)
  const handleHashChange = () => {
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(`tab-${hash}`)) {
      switchTab(hash);
    } else {
      switchTab('overview');
    }
  };

  window.addEventListener('hashchange', handleHashChange);
  handleHashChange(); // Initial load
}

/* -------------------------------------------------------------------
   3. Interactive Company Selector (Experience Tab)
   ------------------------------------------------------------------- */
const companyExperienceData = {
  jpmc_uk: {
    role: "Vice President — Lead DevOps Engineer",
    period: "June 2024 — Present",
    firm: "JPM Personal Investing Limited • J.P. Morgan Chase & Co.",
    location: "London, UK 🇬🇧",
    bullets: [
      "Lead DevOps and cloud infrastructure initiatives for <strong>JPM Personal Investing</strong>, establishing scalable infrastructure patterns, strict security posture, and high developer velocity across engineering squads.",
      "Spearheaded the flagship <strong>Atlas Migration</strong> program, migrating business-critical workloads and distributed data stores from standalone legacy AWS accounts to enterprise-standard J.P. Morgan Chase managed AWS accounts with <strong>zero downtime</strong>.",
      "Architected and executed end-to-end <strong>compute migration to AWS EKS</strong> (Elastic Kubernetes Service), standardizing container runtime environments, Horizontal Pod Autoscaling (HPA), and least-privilege IAM Roles for Service Accounts (IRSA).",
      "Orchestrated high-volume, secure <strong>data migrations</strong> across cloud databases (RDS/Aurora) and object storage with strict transactional integrity and zero data loss.",
      "Engineered reusable, modular Infrastructure as Code (IaC) using <strong>Terraform</strong>, automating multi-account VPC networking, security guardrails, and compliance-as-code policies.",
      "Standardized enterprise <strong>CI/CD pipelines</strong> using Jenkins, Docker, and Helm, incorporating automated security scanning, quality gates, and automated canary/blue-green deployments."
    ],
    tags: ["AWS EKS", "Terraform", "Docker", "Helm", "RDS Aurora", "Jenkins", "Zero-Downtime"]
  },
  jpmc_in: {
    role: "Associate Vice President — Software Engineer",
    period: "June 2021 — June 2024",
    firm: "JPMorgan Services India Pvt. Ltd. • J.P. Morgan Chase & Co.",
    location: "Bengaluru, India 🇮🇳",
    bullets: [
      "Served as Lead Engineer on <strong>RiskOne</strong>, J.P. Morgan's strategic real-time post-trade risk monitoring, alerting, and automated kill-switch platform handling millions of daily trading events.",
      "Architected the <strong>in-memory caching migration</strong>, transitioning static reference data from legacy relational databases to a distributed low-latency in-memory cache with real-time updates, <strong>reducing latency by over 70%</strong>.",
      "Drove the <strong>AWS cloud migration</strong> for legacy reporting monoliths, re-architecting applications into containerized cloud-native microservices on AWS.",
      "Designed generic, reusable Jenkins-based CI/CD automation pipelines for automated test execution, packaging, and on-demand deployment across staging and production environments.",
      "Collaborated closely with risk managers, trading desks, and compliance officers in a fast-paced SAFe Agile delivery environment."
    ],
    tags: ["Java 17", "Spring Boot", "Chronicle Queues", "FIX Protocol", "Redis Cache", "AWS", "Angular"]
  },
  db_in: {
    role: "Associate • Senior Analyst • Analyst",
    period: "July 2017 — June 2021",
    firm: "DBOI Global Services Pvt. Ltd. • Deutsche Bank Group",
    location: "Pune, India 🇮🇳",
    bullets: [
      "Core developer for Deutsche Bank's strategic global <strong>P&L accounting platform (dbPalace)</strong>, ensuring high availability, exception handling, and accurate front-to-back financial reporting.",
      "Redesigned trade sign-off workflows from a polling architecture to an event-driven push model using <strong>WebSockets</strong> and <strong>IBM MQ</strong>, significantly reducing message delivery latency.",
      "Engineered an in-house microservices-based reporting framework (<strong>IHAP</strong>) with React UI to decommission IBM Cognos, saving substantial annual licensing costs.",
      "Established a BDD test automation framework with Cucumber, Selenium, and Serenity, increasing regression code coverage to <strong>65%</strong> and reducing manual QA turnaround time.",
      "Delivered <strong>Digital Planner</strong>, a real-time web application enabling collaborative SAFe PI Planning for 200+ distributed engineers globally (Node.js, Angular, WebSockets, Redis)."
    ],
    tags: ["Java", "Spring Boot", "WebSockets", "IBM MQ", "OpenShift Cloud", "React", "Cucumber BDD"]
  },
  early_career: {
    role: "Early Career & Internships",
    period: "May 2016 — April 2017",
    firm: "Mastercard Technology & Choose To Thinq",
    location: "Pune, India 🇮🇳",
    bullets: [
      "<strong>Mastercard Technology (Summer Intern):</strong> Engineered a full-stack web-based resource forecasting and management platform that reduced manual tracking overhead by 80% (Spring Boot, AngularJS, MongoDB).",
      "<strong>Choose To Thinq (Project Intern):</strong> Developed an intelligent conversational chatbot for personalized book recommendations using NLP heuristics on Facebook Messenger."
    ],
    tags: ["Spring Boot", "AngularJS", "MongoDB", "Python NLP", "Chatbots"]
  }
};

function initCompanySelector() {
  const companyBtns = document.querySelectorAll('.company-tab-btn');
  const roleTitle = document.getElementById('co-role-title');
  const rolePeriod = document.getElementById('co-role-period');
  const roleFirm = document.getElementById('co-role-firm');
  const roleBullets = document.getElementById('co-role-bullets');
  const roleTags = document.getElementById('co-role-tags');

  if (!companyBtns.length || !roleTitle) return;

  companyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      companyBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const coKey = btn.getAttribute('data-company');
      const data = companyExperienceData[coKey];
      if (!data) return;

      if (roleTitle) roleTitle.textContent = data.role;
      if (rolePeriod) rolePeriod.textContent = data.period;
      if (roleFirm) roleFirm.innerHTML = `<span>${data.firm}</span> <span style="font-size:0.78rem; font-family:var(--font-mono); color:var(--text-muted);"><i class="fas fa-location-dot"></i> ${data.location}</span>`;
      
      if (roleBullets) {
        roleBullets.innerHTML = data.bullets.map(b => `<div class="role-bullet">${b}</div>`).join('');
      }

      if (roleTags) {
        roleTags.innerHTML = data.tags.map(t => `<span class="tag-pill highlight">${t}</span>`).join('');
      }
    });
  });
}

/* -------------------------------------------------------------------
   4. Project Filter Tabs
   ------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* -------------------------------------------------------------------
   5. Clipboard Copy Helper
   ------------------------------------------------------------------- */
function initCopyButtons() {
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-copy');
      if (!text) return;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          showToast(`Copied "${text}" to clipboard`);
        }).catch(() => fallbackCopy(text));
      } else {
        fallbackCopy(text);
      }
    });
  });

  function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast(`Copied "${text}" to clipboard`);
  }
}

/* -------------------------------------------------------------------
   6. Live London Clock
   ------------------------------------------------------------------- */
function initLondonClock() {
  const clockEl = document.getElementById('london-clock');
  if (!clockEl) return;

  const updateClock = () => {
    const d = new Date();
    clockEl.textContent = d.toLocaleTimeString('en-GB', {
      timeZone: 'Europe/London',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  updateClock();
  setInterval(updateClock, 1000);
}

/* -------------------------------------------------------------------
   7. Contact Form Handler
   ------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim() || 'Engineering Leadership Inquiry';
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      showToast('Please complete all required fields.');
      return;
    }

    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const mailtoUrl = `mailto:jaydeepmohite@hotmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
    showToast('Opening default email client...');
    form.reset();
  });
}

/* -------------------------------------------------------------------
   8. Toast Notification Helper
   ------------------------------------------------------------------- */
let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById('toast-el');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}
