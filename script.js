// Modern entry animations + light scroll parallax
// Uses IntersectionObserver for reveals and rAF for parallax for best performance.

// Smooth scrolling for nav links (progressive enhancement)
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        if(target){
            e.preventDefault();
            target.scrollIntoView({behavior:'smooth'});
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    initReveals();
    initParallax();
});

function initReveals(){
    const reveals = Array.from(document.querySelectorAll('.reveal'));
    if(!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                const el = entry.target;
                const delay = Number(el.getAttribute('data-delay') || 0);
                setTimeout(()=> el.classList.add('is-visible'), delay);
                observer.unobserve(el);
            }
        });
    }, {threshold: 0.08});

    reveals.forEach(el => observer.observe(el));
}

function initParallax(){
    const parallaxElems = Array.from(document.querySelectorAll('[data-parallax]'));
    if(!parallaxElems.length) return;

    const items = parallaxElems.map(el => ({el, speed: Number(el.getAttribute('data-parallax')) || 0.06}));
    let lastScroll = window.scrollY; let ticking = false;

    function onScroll(){
        lastScroll = window.scrollY;
        if(!ticking){
            window.requestAnimationFrame(update);
            ticking = true;
        }
    }

    function update(){
        items.forEach(item => {
            const y = (lastScroll - item.el.offsetTop) * item.speed;
            item.el.style.transform = `translate3d(0, ${y}px, 0)`;
        });
        ticking = false;
    }

    window.addEventListener('scroll', onScroll, {passive:true});
    update();
}

// Small accessibility fallback: if user prefers reduced motion, reveal immediately
if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
}