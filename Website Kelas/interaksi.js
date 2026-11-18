const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('[id]');
const revealItems = document.querySelectorAll('.j, .all, .jadwal-section, .table, .gallery, article, aside, footer');
const welcomeScreen = document.querySelector('.welcome-screen');
const moreButton = document.querySelector('.more-button');
const moreMenu = document.querySelector('.more-menu');
const githubEditor = document.querySelector('.github-editor');
const githubEditorClose = document.querySelector('.github-editor-close');
const githubMemberList = document.querySelector('.github-member-list');
const githubForm = document.querySelector('.github-form');
const githubUsername = document.querySelector('#github-username');
const selectedMember = document.querySelector('.selected-member');
const githubStatus = document.querySelector('.github-status');
let selectedMemberRow = null;

if (githubEditor) document.body.appendChild(githubEditor);

const placeGithubEditor = () => {
  if (!moreButton || githubEditor.hidden) return;
  const buttonBounds = moreButton.getBoundingClientRect();
  const rightOffset = Math.max(12, window.innerWidth - buttonBounds.right);
  githubEditor.style.top = `${buttonBounds.bottom + 12}px`;
  githubEditor.style.right = `${rightOffset}px`;
};

window.setTimeout(() => welcomeScreen?.classList.add('is-hidden'), 1800);

revealItems.forEach((item) => item.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const activeLink = [...navLinks].find((link) => link.getAttribute('href') === `#${entry.target.id}`);
      if (!activeLink) return;
      navLinks.forEach((link) => {
        const isActive = link === activeLink;
        link.classList.toggle('active', isActive);
        link.classList.toggle('selected', isActive);
      });
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });

sections.forEach((section) => sectionObserver.observe(section));

document.addEventListener('click', (event) => {
  const target = event.target.closest('a, button');
  if (!target) return;
  if (target.matches('nav a')) {
    navLinks.forEach((link) => link.classList.remove('selected'));
    target.classList.add('selected');
    return;
  }
  target.style.position = 'relative';
  target.style.overflow = 'hidden';
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  const bounds = target.getBoundingClientRect();
  ripple.style.left = `${event.clientX - bounds.left - 5}px`;
  ripple.style.top = `${event.clientY - bounds.top - 5}px`;
  target.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove());
});

const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = '<button type="button" aria-label="Tutup preview">&times;</button><img alt="Preview foto kegiatan">';
document.body.appendChild(lightbox);
const lightboxImage = lightbox.querySelector('img');

document.querySelectorAll('.card img').forEach((image) => {
  image.addEventListener('error', () => {
    image.src = image.src.replace('/assets/images/', '/');
  }, { once: true });
  image.addEventListener('click', () => {
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.classList.add('is-open');
  });
});

const closeLightbox = () => lightbox.classList.remove('is-open');
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox || event.target.tagName === 'BUTTON') closeLightbox();
});
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeLightbox(); });

const memberRows = document.querySelectorAll('.Anggota-table-panel tbody tr');
memberRows.forEach((row) => {
  const nameCell = row.cells[1];
  const memberButton = document.createElement('button');
  memberButton.type = 'button';
  memberButton.className = 'github-member-button';
  memberButton.textContent = `${row.cells[0].textContent.trim()}. ${nameCell.textContent.trim()}`;
  memberButton.addEventListener('click', () => {
    selectedMemberRow?.classList.remove('github-row-selected');
    selectedMemberRow = row;
    row.classList.add('github-row-selected');
    selectedMember.textContent = nameCell.textContent.trim();
    githubUsername.value = row.cells[2].textContent.trim().replace(/^@/, '');
    githubForm.hidden = false;
    githubStatus.textContent = '';
    githubUsername.focus();
  });
  githubMemberList.appendChild(memberButton);
});


moreButton?.addEventListener('click', (event) => {
  event.stopPropagation();
  if (!githubEditor.hidden) {
    githubEditor.hidden = true;
    moreButton.setAttribute('aria-expanded', 'false');
    moreMenu.hidden = true;
    return;
  }
  const isOpen = !moreMenu.hidden;
  moreMenu.hidden = isOpen;
  moreButton.setAttribute('aria-expanded', String(!isOpen));
});

document.querySelector('[data-action="add-github"]')?.addEventListener('click', () => {
  moreMenu.hidden = true;
  moreButton.setAttribute('aria-expanded', 'false');
  githubEditor.hidden = false;
  placeGithubEditor();
});

githubEditorClose?.addEventListener('click', () => {
  githubEditor.hidden = true;
  moreButton.setAttribute('aria-expanded', 'false');
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.nav-more') && moreMenu && !moreMenu.hidden) {
    moreMenu.hidden = true;
    moreButton.setAttribute('aria-expanded', 'false');
  }
});

githubForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!selectedMemberRow) return;
  const username = githubUsername.value.trim().replace(/^@+/, '');
  if (!username) return;
  selectedMemberRow.cells[2].textContent = `@${username}`;
  githubStatus.textContent = `Akun GitHub ${selectedMemberRow.cells[1].textContent} berhasil disimpan.`;
});

window.addEventListener('resize', placeGithubEditor);
window.addEventListener('scroll', placeGithubEditor, { passive: true });

const backToTop = document.createElement('button');
backToTop.className = 'back-to-top';
backToTop.type = 'button';
backToTop.setAttribute('aria-label', 'Kembali ke atas');
backToTop.textContent = '^';
document.body.appendChild(backToTop);
window.addEventListener('scroll', () => backToTop.classList.toggle('is-visible', window.scrollY > 500));
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
