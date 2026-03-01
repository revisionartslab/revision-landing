document.addEventListener('DOMContentLoaded', () => {

    // 0. Theme Toggle
    const themeBtn = document.getElementById('theme-toggle');
    const iconSun = document.querySelector('.icon-sun');
    const iconMoon = document.querySelector('.icon-moon');

    // 로컬스토리지에서 기존 테마 확인, 없으면 OS 기본 설정 확인, 둘 다 실패 시 다크모드 기본
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultTheme = systemPrefersDark ? 'dark' : 'light';
    const savedTheme = localStorage.getItem('revision_landing_theme') || defaultTheme;

    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcons(savedTheme);

    themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('revision_landing_theme', newTheme);
        updateThemeIcons(newTheme);
    });

    function updateThemeIcons(theme) {
        if (theme === 'light') {
            iconSun.style.display = 'none';
            iconMoon.style.display = 'block';
        } else {
            iconSun.style.display = 'block';
            iconMoon.style.display = 'none';
        }
    }

    // 1. FAQ Accordion Interaction
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const toggle = item.querySelector('.faq-toggle');
        toggle.addEventListener('click', () => {
            // 다른 열려있는 아이템 닫기 (선택 사항)
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // 현재 아이템 토글
            item.classList.toggle('active');
        });
    });

    // 2. Header Style on Scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });

    // 3. Simple Reveal Animation on Scroll
    const revealElements = document.querySelectorAll('.feature-card, .step, .privacy-box');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        revealObserver.observe(el);
    });

    // 4. Giant Geometry Parallax Effect
    const ring = document.querySelector('.wireframe-ring');
    if (ring) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            // 스크롤 속도의 0.15배 만큼만 천천히 움직이게 함 (패럴랙스)
            ring.style.transform = `rotate(-15deg) translateY(${scrolled * 0.15}px)`;
        });
    }

    // 5. Removing 'initializing' class smoothly after fonts & DOM are totally ready
    const removeInitializing = () => {
        document.body.classList.remove('is-initializing');
    };

    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(removeInitializing);
        // Fallback in case fonts hang
        setTimeout(removeInitializing, 800);
    } else {
        // Fallback for older browsers
        window.addEventListener('load', removeInitializing);
        setTimeout(removeInitializing, 800);
    }

});
