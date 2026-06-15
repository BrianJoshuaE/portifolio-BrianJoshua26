// Minimal navigation and smooth scrolling behavior for the portfolio.
const navLinks = document.querySelectorAll('nav a[href^="#"]');
navLinks.forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Simple active link styling based on scroll position.
const sections = document.querySelectorAll('main section[id]');
const setActiveLink = () => {
    const offset = window.scrollY + window.innerHeight / 3;
    sections.forEach(section => {
        const id = section.id;
        const link = document.querySelector(`nav a[href="#${id}"]`);
        if (link) {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            link.classList.toggle('active', offset >= top && offset < bottom);
        }
    });
};

// Entrance animation: reveal sections on initial load with a gentle stagger.
const animatedSections = document.querySelectorAll('main .section');
const revealSections = () => {
    animatedSections.forEach((section, index) => {
        setTimeout(() => section.classList.add('visible'), index * 120 + 100);
    });
};

window.addEventListener('scroll', setActiveLink, { passive: true });
window.addEventListener('load', () => {
    revealSections();
    setActiveLink();
});