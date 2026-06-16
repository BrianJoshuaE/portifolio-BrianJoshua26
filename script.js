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

// Typewriter introduction for the hero statement.
const heroTypewriter = document.getElementById('hero-typewriter');
const heroLines = [
    'IT Student and Water Engineer crafting clean digital experiences with thoughtful UI, subtle motion,',
    'and a calm visual palette.'
];
let lineIndex = 0;
let charIndex = 0;
let isTyping = true;
let lineSpans = [];

const typewriterLoop = () => {
    const currentLine = heroLines[lineIndex];

    if (isTyping) {
        lineSpans[lineIndex].textContent = currentLine.slice(0, charIndex + 1);
        charIndex += 1;

        if (charIndex === currentLine.length) {
            charIndex = 0;
            lineIndex += 1;

            if (lineIndex === heroLines.length) {
                isTyping = false;
                setTimeout(typewriterLoop, 1800);
                return;
            }
        }
    } else {
        if (lineIndex > 0) {
            lineIndex -= 1;
            charIndex = heroLines[lineIndex].length;
        }

        lineSpans[lineIndex].textContent = heroLines[lineIndex].slice(0, charIndex - 1);
        charIndex -= 1;

        if (lineIndex === 0 && charIndex === 0) {
            lineSpans.forEach(span => (span.textContent = ''));
            isTyping = true;
            lineIndex = 0;
            setTimeout(typewriterLoop, 600);
            return;
        }
    }

    setTimeout(typewriterLoop, isTyping ? 50 : 35);
};

window.addEventListener('load', () => {
    if (!heroTypewriter) return;

    heroTypewriter.innerHTML = '<span class="typewriter-line"></span><br><span class="typewriter-line"></span>';
    lineSpans = Array.from(heroTypewriter.querySelectorAll('.typewriter-line'));
    typewriterLoop();
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

// Entrance animation: reveal sections when they scroll into view.
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    root: null,
    threshold: 0.18,
    rootMargin: '0px 0px -10% 0px'
});

document.querySelectorAll('main .section').forEach(section => {
    revealObserver.observe(section);
});

window.addEventListener('scroll', setActiveLink, { passive: true });
window.addEventListener('load', setActiveLink);