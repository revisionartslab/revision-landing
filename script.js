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

        // [Fix] 모바일 테마 변경 시 배경색 렉 해결: 강제 리플로우 유도
        void document.body.offsetHeight;
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

    // 0-1. Language Selector & i18n
    const langBtn = document.getElementById('lang-btn');
    const langDropdown = document.getElementById('lang-dropdown');
    const currentLangText = document.getElementById('current-lang');
    let currentLang = localStorage.getItem('revision_landing_lang') || navigator.language.split('-')[0] || 'en';

    // Default to 'en' if language is not supported
    if (!['en', 'ko', 'ja'].includes(currentLang)) currentLang = 'en';

    let translations = {};

    async function loadTranslations(lang) {
        try {
            const response = await fetch(`./locales/${lang}.json`);
            if (!response.ok) throw new Error('Failed to load translations');
            translations = await response.json();
            applyTranslations();
            updateLangUI(lang);
            // Hide loading overlay only after translations are applied
            document.body.classList.remove('lang-loading');
        } catch (error) {
            console.error('Error loading translations:', error);
            document.body.classList.remove('lang-loading');
            // Fallback to English if loading fails
            if (lang !== 'en') loadTranslations('en');
        }
    }

    function applyTranslations() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = getNestedTranslation(translations, key);
            if (translation) {
                // If it contains tags, use innerHTML
                if (translation.includes('<')) {
                    el.innerHTML = translation;
                } else {
                    el.textContent = translation;
                }
            }
        });
    }

    function getNestedTranslation(obj, path) {
        return path.split('.').reduce((prev, curr) => {
            return prev ? prev[curr] : null;
        }, obj);
    }

    function updateLangUI(lang) {
        currentLangText.textContent = lang.toUpperCase();
        langDropdown.classList.remove('show');
        localStorage.setItem('revision_landing_lang', lang);
    }

    // Initial load
    loadTranslations(currentLang);

    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle('show');
    });

    langDropdown.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedLang = btn.getAttribute('data-lang');
            if (selectedLang !== currentLang) {
                currentLang = selectedLang;
                loadTranslations(currentLang);
            }
        });
    });

    document.addEventListener('click', () => {
        langDropdown.classList.remove('show');
    });

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

    // 2. Optimized Global Scroll Manager
    const header = document.querySelector('header');
    const ring = document.querySelector('.wireframe-ring');
    const backToTopBtn = document.getElementById('back-to-top');

    let lastScrollY = window.pageYOffset;
    let ticking = false;

    function onScrollUpdate() {
        // Header logic
        if (lastScrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }

        // Back to top logic
        if (lastScrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }

        // Parallax logic
        if (ring) {
            ring.style.transform = `rotate(-15deg) translateY(${lastScrollY * 0.15}px)`;
        }

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        lastScrollY = window.pageYOffset;
        if (!ticking) {
            window.requestAnimationFrame(onScrollUpdate);
            ticking = true;
        }
    }, { passive: true });

    // 3. Simple Reveal Animation Removal (Removed due to user request for zero-animation reliability)
    /* 
    The IntersectionObserver revealed elements such as .u-item, .step-v, etc.
    Deleting this section ensures all content is visible immediately and fixes 
    display issues on some systems.
    */





    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });



    // 7. Email Copy Logic
    const copyEmail = document.getElementById('copy-email');
    const copyTooltip = document.getElementById('copy-tooltip');

    if (copyEmail) {
        copyEmail.addEventListener('click', () => {
            const email = copyEmail.textContent;
            navigator.clipboard.writeText(email).then(() => {
                // Show tooltip
                copyTooltip.classList.add('show');

                // Hide tooltip after 1.5s
                setTimeout(() => {
                    copyTooltip.classList.remove('show');
                }, 1500);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });
    }

    // 8. Elegant Hero Video Playback
    const heroVideo = document.getElementById('hero-video');

    function startVideo() {
        if (!heroVideo) return;
        heroVideo.play().then(() => {
            heroVideo.classList.add('v-visible');
        }).catch(e => {
            // 브라우저 정책으로 차단된 경우 대기
            console.warn("Autoplay blocked, waiting for interaction:", e);
        });
    }

    if (heroVideo) {
        // [Smart Pause] Intersection Observer to save resources
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Video in view - resume
                    if (heroVideo.paused && heroVideo.classList.contains('v-visible')) {
                        heroVideo.play().catch(() => { });
                    }
                } else {
                    // Video out of view - pause to save GPU/CPU
                    heroVideo.pause();
                }
            });
        }, { threshold: 0.1 });

        observer.observe(heroVideo);

        // Initial ready check
        if (heroVideo.readyState >= 3) {
            startVideo();
        } else {
            heroVideo.addEventListener('canplay', startVideo, { once: true });
        }
    }

});
