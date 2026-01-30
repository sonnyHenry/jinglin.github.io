/**
 * Academic Website - Main JavaScript
 * Loads content from data.json and handles interactions
 */

document.addEventListener('DOMContentLoaded', function () {
  // Load data and populate content
  loadSiteData();

  // Mobile navigation toggle
  initMobileNav();

  // Scroll effects
  initScrollEffects();
});

/**
 * Load site data from JSON and populate pages
 */
async function loadSiteData() {
  try {
    const response = await fetch('data.json');
    const data = await response.json();

    // Determine current page and populate accordingly
    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

    // Common elements (nav logo)
    updateNavLogo(data.profile);

    // Page-specific content
    if (page === 'index.html' || page === '') {
      populateHomePage(data);
    } else if (page === 'research.html') {
      populateResearchPage(data);
    } else if (page === 'publications.html') {
      populatePublicationsPage(data);
    } else if (page === 'contact.html') {
      populateContactPage(data);
    }

  } catch (error) {
    console.error('Error loading site data:', error);
  }
}

/**
 * Update navigation logo
 */
function updateNavLogo(profile) {
  const logo = document.querySelector('.nav-logo');
  if (logo) {
    logo.textContent = profile.name_en;
  }
}

/**
 * Populate Home Page
 */
function populateHomePage(data) {
  const { profile, about, links } = data;

  // Profile photo
  const photo = document.querySelector('.profile-photo');
  if (photo) {
    photo.src = profile.photo;
    photo.alt = profile.name_en;
  }

  // Name
  const nameEl = document.querySelector('.profile-name');
  if (nameEl) {
    nameEl.innerHTML = `${profile.name_en} <span class="profile-name-cn">${profile.name_cn}</span>`;
  }

  // Title and institution
  const titleEl = document.querySelector('.profile-title');
  if (titleEl) titleEl.textContent = profile.title;

  const instEl = document.querySelector('.profile-institution');
  if (instEl) instEl.textContent = profile.institution;

  // Bio paragraphs
  const bioSection = document.querySelector('.bio-content');
  if (bioSection && about.bio) {
    bioSection.innerHTML = about.bio.map(p => `<p>${p}</p>`).join('');
  }

  // Profile links
  updateProfileLinks(profile, links);
}

/**
 * Update profile links section
 */
function updateProfileLinks(profile, links) {
  const linksContainer = document.querySelector('.profile-links');
  if (!linksContainer) return;

  let html = '';

  // Email
  html += `
    <a href="mailto:${profile.email}">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </svg>
      Email
    </a>`;

  // Google Scholar
  if (links.google_scholar) {
    html += `
      <a href="${links.google_scholar}" target="_blank" rel="noopener">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5z"/>
        </svg>
        Google Scholar
      </a>`;
  }

  // LinkedIn
  if (links.linkedin) {
    html += `
      <a href="${links.linkedin}" target="_blank" rel="noopener">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        LinkedIn
      </a>`;
  }

  // GitHub
  if (links.github) {
    html += `
      <a href="${links.github}" target="_blank" rel="noopener">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        GitHub
      </a>`;
  }

  linksContainer.innerHTML = html;
}

/**
 * Populate Research Page
 */
function populateResearchPage(data) {
  const { research } = data;

  // Research intro
  const introEl = document.querySelector('.research-intro p');
  if (introEl) {
    introEl.textContent = research.intro;
  }

  // Research areas
  const areasContainer = document.querySelector('.research-areas');
  if (areasContainer && research.areas) {
    areasContainer.innerHTML = research.areas.map(area => `
      <article class="research-card">
        <h3>${area.title}</h3>
        <p>${area.description}</p>
        <div class="research-keywords">
          ${area.keywords.map(kw => `<span class="keyword">${kw}</span>`).join('')}
        </div>
      </article>
    `).join('');
  }
}

/**
 * Populate Publications Page
 */
function populatePublicationsPage(data) {
  const { publications, profile } = data;

  // Journal Articles
  const journalList = document.querySelector('.journal-articles .publication-list');
  if (journalList && publications.journal_articles) {
    journalList.innerHTML = publications.journal_articles.map(pub =>
      createPublicationItem(pub, profile.name_en)
    ).join('');
  }

  // Working Papers
  const workingList = document.querySelector('.working-papers .publication-list');
  if (workingList && publications.working_papers) {
    workingList.innerHTML = publications.working_papers.map(pub => `
      <li class="publication-item">
        <div class="publication-title">${pub.title}</div>
        <div class="publication-authors">${formatAuthors(pub.authors, profile.name_en)}</div>
        <div class="publication-venue">${pub.status}</div>
      </li>
    `).join('');
  }

  // Conferences
  const confList = document.querySelector('.conferences .publication-list');
  if (confList && publications.conferences) {
    confList.innerHTML = publications.conferences.map(pub => `
      <li class="publication-item">
        <div class="publication-title">${pub.title}</div>
        <div class="publication-authors">${formatAuthors(pub.authors, profile.name_en)}</div>
        <div class="publication-venue">${pub.venue}, ${pub.location}, ${pub.year}</div>
      </li>
    `).join('');
  }
}

/**
 * Create publication item HTML
 */
function createPublicationItem(pub, highlightName) {
  let linksHtml = '';
  if (pub.pdf || pub.doi) {
    linksHtml = '<div class="publication-links">';
    if (pub.pdf) linksHtml += `<a href="${pub.pdf}" target="_blank">PDF</a>`;
    if (pub.doi) linksHtml += `<a href="${pub.doi}" target="_blank">DOI</a>`;
    linksHtml += '</div>';
  }

  const venueInfo = pub.volume
    ? `${pub.venue}, ${pub.year}, ${pub.volume}, ${pub.pages}`
    : `${pub.venue}, ${pub.year}`;

  return `
    <li class="publication-item">
      <div class="publication-title">${pub.title}</div>
      <div class="publication-authors">${formatAuthors(pub.authors, highlightName)}</div>
      <div class="publication-venue">${venueInfo}</div>
      ${linksHtml}
    </li>
  `;
}

/**
 * Format authors with highlighting
 */
function formatAuthors(authors, highlightName) {
  return authors.map(author =>
    author === highlightName
      ? `<span class="highlight">${author}</span>`
      : author
  ).join(', ');
}

/**
 * Populate Contact Page
 */
function populateContactPage(data) {
  const { profile, links, contact } = data;

  // Email
  const emailEl = document.querySelector('.contact-email');
  if (emailEl) {
    emailEl.innerHTML = `<a href="mailto:${profile.email}">${profile.email}</a>`;
  }

  // Office
  const officeEl = document.querySelector('.contact-office');
  if (officeEl && contact.office) {
    officeEl.innerHTML = `
      ${contact.office.line1}<br>
      ${contact.office.line2}<br>
      ${contact.office.line3}
    `;
  }

  // Academic links
  const linksEl = document.querySelector('.contact-links');
  if (linksEl) {
    let html = '';
    if (links.google_scholar) {
      html += `<a href="${links.google_scholar}" target="_blank" rel="noopener">Google Scholar</a><br>`;
    }
    if (links.linkedin) {
      html += `<a href="${links.linkedin}" target="_blank" rel="noopener">LinkedIn</a><br>`;
    }
    if (links.github) {
      html += `<a href="${links.github}" target="_blank" rel="noopener">GitHub</a><br>`;
    }
    linksEl.innerHTML = html;
  }
}

/**
 * Initialize mobile navigation
 */
function initMobileNav() {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function () {
        navLinks.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
      if (!navToggle.contains(event.target) && !navLinks.contains(event.target)) {
        navLinks.classList.remove('active');
      }
    });
  }
}

/**
 * Initialize scroll effects
 */
function initScrollEffects() {
  const nav = document.querySelector('.nav');

  window.addEventListener('scroll', function () {
    if (window.pageYOffset > 50) {
      nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    } else {
      nav.style.boxShadow = 'none';
    }
  });
}
