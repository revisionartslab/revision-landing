/**
 * REVISION ARTS GALLERY - Premium Logic (Pinflow Inspired)
 * Custom Cinematic Viewer & RV-CARD System
 */

// --- GLOBAL FEEDBACK SINGLETON (Prevents overlapping 'COPIED' messages) ---
let activeFeedback = null;
let feedbackTimeout = null;

function showFeedback(fb) {
    if (activeFeedback) activeFeedback.classList.remove('active');
    if (feedbackTimeout) clearTimeout(feedbackTimeout);
    
    fb.classList.add('active');
    activeFeedback = fb;
    
    feedbackTimeout = setTimeout(() => {
        fb.classList.remove('active');
        activeFeedback = null;
    }, 1500);
}

function clearAllFeedback() {
    if (activeFeedback) activeFeedback.classList.remove('active');
    if (feedbackTimeout) {
        clearTimeout(feedbackTimeout);
        feedbackTimeout = null;
    }
    activeFeedback = null;
    document.querySelectorAll('.copy-feedback-mini').forEach(fb => fb.classList.remove('active'));
}

// ── SECURITY: HTML Escape utility ─────────────────────────────────────────
// Prevents XSS by sanitizing any string before inserting into the DOM.
function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// ── SECURITY: Prompt URL Whitelist ─────────────────────────────────────────
// Only URLs originating from Cloudinary are permitted to be fetched.
const ALLOWED_PROMPT_DOMAINS = ['res.cloudinary.com', 'cloudinary.com'];
function isSafePromptUrl(url) {
    try {
        const parsed = new URL(url);
        return ALLOWED_PROMPT_DOMAINS.some(d => parsed.hostname === d || parsed.hostname.endsWith('.' + d));
    } catch {
        return false;
    }
}

const STREAM_RECORDS = [
    {
        "id": "master 20260319 165358 [0043a5 6f5bb9 FPS original]",
        "tags": [
            "editorial"
        ],
        "title": "master 20260319 165358 [0043a5 6f5bb9 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773915702/revision-arts/master%2020260319%20165358%20%5B0043a5%206f5bb9%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773909538/revision-arts/prompt_20260319_165358_%5B0043a5_6f5bb9_FPS_original%5D"
    },
    {
        "id": "master 20260319 171409 [0043a5 263e99 FPS original]",
        "tags": [
            "editorial"
        ],
        "title": "master 20260319 171409 [0043a5 263e99 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773915697/revision-arts/master%2020260319%20171409%20%5B0043a5%20263e99%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773909537/revision-arts/prompt_20260319_171409_%5B0043a5_263e99_FPS_original%5D"
    },
    {
        "id": "master 20260319 172236 [0043a5 05d3c0 FPS original]",
        "tags": [
            "editorial"
        ],
        "title": "master 20260319 172236 [0043a5 05d3c0 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773915694/revision-arts/master%2020260319%20172236%20%5B0043a5%2005d3c0%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773909536/revision-arts/prompt_20260319_172236_%5B0043a5_05d3c0_FPS_original%5D"
    },
    {
        "id": "master 20260319 173044 [0043a5 09fb9e FPS original]",
        "tags": [
            "editorial"
        ],
        "title": "master 20260319 173044 [0043a5 09fb9e FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773915691/revision-arts/master%2020260319%20173044%20%5B0043a5%2009fb9e%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773909536/revision-arts/prompt_20260319_173044_%5B0043a5_09fb9e_FPS_original%5D"
    },
    {
        "id": "master 20260319 173729 [0043a5 2fbae7 FPS original]",
        "tags": [
            "editorial"
        ],
        "title": "master 20260319 173729 [0043a5 2fbae7 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773915687/revision-arts/master%2020260319%20173729%20%5B0043a5%202fbae7%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773909535/revision-arts/prompt_20260319_173729_%5B0043a5_2fbae7_FPS_original%5D"
    },
    {
        "id": "master 20260319 174538 [4cae5d FPS original]",
        "tags": [
            "editorial"
        ],
        "title": "master 20260319 174538 [4cae5d FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773915682/revision-arts/master%2020260319%20174538%20%5B4cae5d%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773915663/revision-arts/prompt_20260319_174538_%5B4cae5d_FPS_original%5D"
    },
    {
        "id": "master 20260319 174847 [f4ebe1 FPS original]",
        "tags": [
            "editorial"
        ],
        "title": "master 20260319 174847 [f4ebe1 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773915678/revision-arts/master%2020260319%20174847%20%5Bf4ebe1%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773915664/revision-arts/prompt_20260319_174847_%5Bf4ebe1_FPS_original%5D"
    },
    {
        "id": "master 20260319 182540",
        "tags": [
            "editorial"
        ],
        "title": "master 20260319 182540",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773915675/revision-arts/master%2020260319%20182540.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773915663/revision-arts/prompt_20260319_182540"
    },
    {
        "id": "master 20260319 164054 [0043a5 001826 FPS original]",
        "tags": [
            "editorial"
        ],
        "title": "master 20260319 164054 [0043a5 001826 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773915672/revision-arts/master%2020260319%20164054%20%5B0043a5%20001826%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773909534/revision-arts/prompt_20260319_164054_%5B0043a5_001826_FPS_original%5D"
    }
];

// ── AUTO-SHUFFLE ON INITIAL LOAD ───────────────────────────────────────────
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
shuffleArray(STREAM_RECORDS); // Randomize the baseline

const galleryContainer = document.getElementById('gallery');
const loader = document.getElementById('loader');
const viewer = document.getElementById('rv-viewer');
const infoBtn = document.getElementById('viewer-info-btn');
const headerNav = document.getElementById('header-nav');
const mainContent = document.querySelector('.scroll-root');

let filteredItems = [...STREAM_RECORDS];
let itemsShown = 0;
const BATCH_SIZE = 8;
let currentViewerIndex = -1;
let isInfoEnabled = true; // Global state for info panel persistent visibility

// ── THEME LOGIC ─────────────────────────────────────────────────────────────
window.toggleTheme = function() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const nextTheme = isLight ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('rv-theme', nextTheme);
};

// Initial theme load
(function() {
    const savedTheme = localStorage.getItem('rv-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
})();

// --------------------------------------------------------------------------
// Dynamic Category Extraction
// --------------------------------------------------------------------------

function getDynamicCategories() {
    const tagsSet = new Set();
    STREAM_RECORDS.forEach(item => {
        // Now prioritizing the 'tags' array from our new CloudFlow Stream Tag system
        if (item.tags && Array.isArray(item.tags)) {
            item.tags.forEach(tag => {
                if (tag) tagsSet.add(tag);
            });
        }
    });
    
    const sortedTags = Array.from(tagsSet).sort().map(tag => ({
        id: tag,
        label: tag.toUpperCase()
    }));

    return [{ id: 'all', label: 'ALL' }, ...sortedTags];
}

// --------------------------------------------------------------------------
// Randomized Shuffle Logic
// --------------------------------------------------------------------------

window.handleShuffle = function () {
    // Show loader for feedback
    loader.style.display = 'block';
    galleryContainer.style.opacity = '0.5';

    setTimeout(() => {
        // Shuffle the current filtered collection
        for (let i = filteredItems.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [filteredItems[i], filteredItems[j]] = [filteredItems[j], filteredItems[i]];
        }

        // Re-render
        itemsShown = 0;
        galleryContainer.innerHTML = '';
        galleryContainer.style.opacity = '1';
        renderAll();
        
        // Minor toast for confirmation
        showToast('Gallery layout randomized.');
    }, 150);
};

// --------------------------------------------------------------------------
// Layout Logic (Masonry)
// --------------------------------------------------------------------------

window.updateDensity = function (cols) {
    const safeCols = Math.max(1, parseInt(cols));
    document.documentElement.style.setProperty('--grid-cols', safeCols);
};

window.resizeGridItem = function (item) {
    const media = item.querySelector('.card-media');
    if (!media) return;
    const contentHeight = media.getBoundingClientRect().height;
    item.style.gridRowEnd = `span ${Math.ceil(contentHeight + 24)}`;
};

window.addEventListener('resize', () => {
    const allItems = document.querySelectorAll('.rv-card');
    allItems.forEach(item => resizeGridItem(item));
});

function renderAll() {
    loader.style.display = 'block';

    // Immediate render of all items to feel like cosmos.so
    filteredItems.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'rv-card';

        // ── SECURITY: Build card via DOM API to prevent XSS ──
        const cardMedia = document.createElement('div');
        cardMedia.className = 'card-media';
        cardMedia.setAttribute('onclick', `openViewer(${index})`);

        const img = document.createElement('img');
        img.src = item.url;                  // URL from our own Cloudinary — safe
        img.alt = escapeHtml(item.title);    // Title escaped to prevent attr injection
        img.onload = function() { this.classList.add('loaded'); };

        const overlay = document.createElement('div');
        overlay.className = 'card-overlay';
        overlay.innerHTML = `<div class="zoom-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg></div>`;

        cardMedia.appendChild(img);
        cardMedia.appendChild(overlay);
        card.appendChild(cardMedia);

        
        const ro = new ResizeObserver(() => resizeGridItem(card));
        ro.observe(card);
        
        galleryContainer.appendChild(card);
    });

    itemsShown = filteredItems.length;
    loader.style.display = 'none';
}

// --------------------------------------------------------------------------
// Custom Cinematic Viewer Logic
// --------------------------------------------------------------------------

window.openViewer = async function (index) {
    const item = filteredItems[index];
    if (!item) return;

    currentViewerIndex = index;

    const vImg = document.getElementById('viewer-img');
    const titleEl = document.getElementById('viewer-title');

    // 💡 Global state to persist egg mode across transitions
    if (window.__eggMode === undefined) window.__eggMode = false;

    // ★ EASTER EGG: titleEl 직접 바인딩 (openViewer마다 새로 설정)
    titleEl._eggCount = 0;
    clearTimeout(titleEl._eggTimer);
    
    // Robust listener that catches clicks even on nested spans
    titleEl.onclick = async function (e) {
        // Prevent default only if needed, but ensure counting works
        titleEl._eggCount = (titleEl._eggCount || 0) + 1;
        clearTimeout(titleEl._eggTimer);
        
        if (titleEl._eggCount >= 3) {
            titleEl._eggCount = 0;
            window.__eggMode = !window.__eggMode;
            applyEggUIState(window.__eggMode);

            if (window.__eggMode) {
                const content = document.getElementById('prompt-content');
                // Force reload if mode just enabled
                if (content) await fetchPromptContent(content);
            }
        } else {
            titleEl._eggTimer = setTimeout(() => { titleEl._eggCount = 0; }, 700);
        }
    };

    // 1. Initial State: Set image
    vImg.style.opacity = '0';

    // 2. Activate viewer to get layout context
    viewer.classList.add('active');
    syncInfoState();

    // By injecting elements one-by-one and measuring instantly, we account for 
    // dynamic layout shifts caused by our own `<br>` tags and structural changes.
    // Cloudinary returns IDs/titles with spaces, but our premium aesthetic demands underscores.
    const displayTitle = (item.title || '').replace(/ /g, '_');
    
    const parts = displayTitle.split('_');
    titleEl.innerHTML = ''; 
    
    let currentLineTop = -1;
    let underscoreCount = 0;

    parts.forEach((part, i) => {
        if (part) {
            const span = document.createElement('span');
            span.innerText = part;
            titleEl.appendChild(span);
            
            if (currentLineTop === -1) {
                currentLineTop = span.offsetTop;
            } else if (span.offsetTop > currentLineTop + 8) {
                underscoreCount = 0;
                currentLineTop = span.offsetTop;
            }
        }
        
        if (i < parts.length - 1) {
            const span = document.createElement('span');
            span.innerText = '_';
            titleEl.appendChild(span);
            titleEl.appendChild(document.createTextNode('\u200B')); 
            
            if (currentLineTop === -1) {
                currentLineTop = span.offsetTop;
            } else if (span.offsetTop > currentLineTop + 8) {
                underscoreCount = 0;
                currentLineTop = span.offsetTop;
            }
            
            underscoreCount++;
            
            if (underscoreCount === 3) {
                titleEl.appendChild(document.createElement('br'));
                underscoreCount = 0;
                currentLineTop = -1; // Reset to force new line top on next iteration
            }
        }
    });

    // 4. Parallel Reveal
    vImg.style.opacity = '1';
    vImg.src = item.url;

    // [CRITICAL UX DECISION: ATOMIC INSTANT RENDERING]
    // The user explicitly prefers the "snappy, instant" layout appearance without any CSS transitions or fade-ins.
    // By building the DOM nodes immediately with no artificial delay, the interface feels 
    // incredibly precise, sturdy, and professional—like a high-end workstation tool.
    // DO NOT attempt to add fade-ins, slide-ups, or opacity transitions back to the title.

    const displayTags = (item.tags && item.tags.length > 0) ? item.tags.join(' / ').toUpperCase() : 'NO STREAM TAGS';

    // --- HYBRID ASSET ID SYSTEM (RV-YYYYMMDD-LAST4) ---
    // Rule: RV + Archive Date (from uploadedAt or ID string) + Unique Suffix (from assetId)
    let viewerDisplayId = 'RV-REF-ERR'; 
    try {
        const dateStr = item.uploadedAt || (item.id.match(/\d{8} \d{6}/) ? item.id.match(/\d{8} \d{6}/)[0] : null);
        const rawAssetId = item.assetId || '';
        
        if (dateStr) {
            const cleanDate = dateStr.replace(/[-T:Z ]/g, '').substring(0, 8); // YYYYMMDD
            const suffix = rawAssetId ? rawAssetId.substring(rawAssetId.length - 4).toUpperCase() : (item.id.match(/\d{6}/) ? item.id.match(/\d{6}/)[0].substring(2,6) : 'ARCH');
            viewerDisplayId = `RV-${cleanDate}-${suffix}`;
        } else {
            // Fallback for items with absolutely no date info
            const fallbackSuffix = rawAssetId ? rawAssetId.substring(0, 8).toUpperCase() : item.id.substring(0, 8).toUpperCase();
            viewerDisplayId = `RV-SER-${fallbackSuffix}`;
        }
    } catch (e) {
        viewerDisplayId = `RV-A-ERR-${item.id.substring(0, 4).toUpperCase()}`;
    }

    document.getElementById('viewer-category').innerText = displayTags;
    document.getElementById('viewer-desc').innerText = item.description;
    document.getElementById('viewer-id').innerText = viewerDisplayId;

    // ── PROMPT PANEL: Apply persistent egg mode state ──
    const promptContent = document.getElementById('prompt-content');
    if (promptContent) {
        // Only reset _loaded and content if the URL is different, 
        // OR the user prefers it fresh every time.
        if (promptContent._promptUrl !== item.promptUrl) {
            promptContent.textContent = 'Loading...';
            promptContent._loaded = false;
            promptContent._promptUrl = item.promptUrl || null;
        }
    }

    // Always apply the current mode state when a new image is opened
    applyEggUIState(window.__eggMode);
    if (window.__eggMode && promptContent && !promptContent._loaded) {
        await fetchPromptContent(promptContent);
    }

    const tempImg = new Image();
    tempImg.src = item.url;
    tempImg.onload = () => {
        document.getElementById('viewer-res').innerText = `${tempImg.naturalWidth} x ${tempImg.naturalHeight}`;
    };

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    if (mainContent) mainContent.style.overflow = 'hidden';

    window.location.hash = item.id;
};

window.closeViewer = function () {
    isDragging = false; 
    viewer.classList.remove('active');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    if (mainContent) mainContent.style.overflow = 'auto';
    window.location.hash = '';

    const menu = document.getElementById('share-menu');
    if (menu) menu.classList.remove('active');
};

window.toggleInfoGlobal = function () {
    isInfoEnabled = !isInfoEnabled;
    syncInfoState();
};

function syncInfoState() {
    if (isInfoEnabled) {
        viewer.classList.remove('info-collapsed');
    } else {
        viewer.classList.add('info-collapsed');
    }
}

viewer.addEventListener('contextmenu', (e) => {
    if (viewer.classList.contains('active')) {
        // If clicking directly on the image, allow the default browser context menu
        if (e.target.id === 'viewer-img') {
            return; 
        }
        
        // Otherwise, use right-click to close the viewer
        e.preventDefault();
        closeViewer();
    }
});

window.navViewer = function (step) {
    let nextIndex = currentViewerIndex + step;
    if (nextIndex < 0) nextIndex = filteredItems.length - 1;
    if (nextIndex >= filteredItems.length) nextIndex = 0;
    openViewer(nextIndex);
};

window.copyViewerLinkDirect = function () {
    clearAllFeedback(); // Proactive instant clear on click
    const item = filteredItems[currentViewerIndex];
    if (!item) return;
    const url = `${window.location.origin}${window.location.pathname}#${item.id}`;
    navigator.clipboard.writeText(url).then(() => {
        const feedback = document.getElementById('share-copy-feedback');
        if (feedback) showFeedback(feedback);
    });
};

window.copyEmailGlobal = function (btn) {
    clearAllFeedback(); // Proactive instant clear on click
    const email = "revisionartslab@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
        const feedback = btn.querySelector('.email-feedback');
        if (feedback) showFeedback(feedback);
    });
};

window.shareToPlatform = function (platform) {
    const item = filteredItems[currentViewerIndex];
    if (!item) return;
    const url = encodeURIComponent(`${window.location.origin}${window.location.pathname}#${item.id}`);
    const text = encodeURIComponent(`Check out "${item.title}" on REVISION ARTS GALLERY`);
    const media = encodeURIComponent(item.url);
    let shareUrl = '';
    switch (platform) {
        case 'pinterest': shareUrl = `https://www.pinterest.com/pin/create/button/?url=${url}&media=${media}&description=${text}`; break;
        case 'x': shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`; break;
        case 'instagram': copyViewerLinkDirect(); showToast('Link copied! Share it on Instagram.'); return;
    }
    if (shareUrl) window.open(shareUrl, '_blank', 'width=600,height=400');
};

window.copyRawTitle = function () {
    clearAllFeedback(); // Proactive instant clear on click
    const item = filteredItems[currentViewerIndex];
    if (!item) return;
    navigator.clipboard.writeText(item.title).then(() => {
        const feedback = document.getElementById('copy-feedback');
        if (feedback) showFeedback(feedback);
    });
};

// Removed toggleShareMenu as we are using direct drop-downless copy now

// Removed testPreset as we successfully settled on [ATOMIC INSTANT RENDERING]


function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.innerText = message;
    toast.classList.add('active');
    setTimeout(() => toast.classList.remove('active'), 3000);
}

// Removed outside click listener for share menu since it's no longer a dropdown

// --------------------------------------------------------------------------
// Interactions & Events
// --------------------------------------------------------------------------

// Global Double-Click Reset: Reset image if anywhere in viewer is double-clicked
viewer.addEventListener('dblclick', (e) => {
    // Prevent trigger if clicking on buttons or info panel
    if (e.target.closest('.viewer-info-panel') || e.target.closest('.viewer-controls')) return;
    resetImage();
});

window.addEventListener('keydown', (e) => {
    if (!viewer.classList.contains('active')) return;
    if (e.key === 'Escape') closeViewer();
    if (e.key === 'ArrowLeft') navViewer(-1);
    if (e.key === 'ArrowRight') navViewer(1);
    if (e.key === 'ArrowUp') { e.preventDefault(); applyZoom(0.1); }
    if (e.key === 'ArrowDown') { e.preventDefault(); applyZoom(-0.1); }
    if (e.key.toLowerCase() === 'c') { e.preventDefault(); resetImage(); }
    if (e.key.toLowerCase() === 'r') { e.preventDefault(); window.handleShuffle(); }
});

let currentZoom = 1;
let isDragging = false;
let startX, startY;
let translateX = 0, translateY = 0;
const ZOOM_SPEED = 0.001;
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 5;

viewer.addEventListener('wheel', (e) => {
    if (!viewer.classList.contains('active')) return;
    
    // 💡 정보영역(Info Panel) 안에서 마우스 휠을 굴릴 때는 이미지 확대/축소를 방지합니다.
    if (e.target.closest('.viewer-info-panel')) return;

    e.preventDefault();
    applyZoom(-e.deltaY * ZOOM_SPEED);
}, { passive: false });

function applyZoom(factor) {
    currentZoom += factor;
    currentZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, currentZoom));
    updateImageTransform();
}

function updateImageTransform() {
    const vImg = document.getElementById('viewer-img');
    if (!vImg) return;
    vImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentZoom})`;
}

document.addEventListener('mousedown', (e) => {
    if (!viewer.classList.contains('active')) return;

    // --- MOUSE AUXILIARY BUTTON NAVIGATION (X-Buttons) ---
    // Button 3: Browser Back / Y-Button -> Previous
    // Button 4: Browser Forward / X-Button -> Next
    if (e.button === 3) {
        e.preventDefault();
        navViewer(-1);
        return;
    }
    if (e.button === 4) {
        e.preventDefault();
        navViewer(1);
        return;
    }

    const vImg = document.getElementById('viewer-img');
    if (e.target === vImg) {
        if (e.detail === 2) { resetImage(); return; }
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        vImg.style.transition = 'none';
        e.preventDefault();
    }
});

function resetImage() {
    currentZoom = 1; translateX = 0; translateY = 0;
    const vImg = document.getElementById('viewer-img');
    if (vImg) { vImg.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'; updateImageTransform(); }
}

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const vImg = document.getElementById('viewer-img');
    const panel = document.querySelector('.viewer-media-panel');
    if (!vImg || !panel) return;

    // Current mouse offset from start
    let rawX = e.clientX - startX;
    let rawY = e.clientY - startY;

    // --- Strict Boundary Clamping (Canvas Protection) ---
    const bounds = panel.getBoundingClientRect();
    const imgRect = vImg.getBoundingClientRect();
    const margin = 150; // Minimum pixels of image to keep inside the panel

    // Calculate how much we can move before hitting the margin
    // We treat the current translateX/Y as the baseline
    translateX = rawX;
    translateY = rawY;
    
    // Update transform temporarily to check bounds
    updateImageTransform();
    
    // Check if we went too far and snap back if needed
    const newRect = vImg.getBoundingClientRect();
    let adjusted = false;

    if (newRect.left > bounds.right - margin) {
        translateX -= (newRect.left - (bounds.right - margin));
        adjusted = true;
    }
    if (newRect.right < bounds.left + margin) {
        translateX += ((bounds.left + margin) - newRect.right);
        adjusted = true;
    }
    if (newRect.top > bounds.bottom - margin) {
        translateY -= (newRect.top - (bounds.bottom - margin));
        adjusted = true;
    }
    if (newRect.bottom < bounds.top + margin) {
        translateY += ((bounds.top + margin) - newRect.bottom);
        adjusted = true;
    }

    if (adjusted) updateImageTransform();
});

document.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    const vImg = document.getElementById('viewer-img');
    if (vImg) vImg.style.transition = 'transform 0.1s cubic-bezier(0.2, 0, 0.2, 1)';
});

const originalOpenViewer = window.openViewer;
window.openViewer = function (index) {
    resetImage();
    const vImg = document.getElementById('viewer-img');
    if (vImg) vImg.style.transition = 'none';
    const menu = document.getElementById('share-menu');
    if (menu) menu.classList.remove('active');
    originalOpenViewer(index);
};

// --------------------------------------------------------------------------
// Filtering logic (DYNAMIC)
// --------------------------------------------------------------------------

function initFilters() {
    headerNav.innerHTML = '';
    const dynamicCategories = getDynamicCategories();
    
    dynamicCategories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = `filter-chip ${cat.id === 'all' ? 'active' : ''}`;
        btn.dataset.category = cat.id;
        btn.innerText = cat.label;

        btn.addEventListener('click', () => {
            const tagId = btn.dataset.category;
            
            document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            
            // OPTION A: Lightning-fast Atomic Refresh
            // No setTimeout, no opacity fade, no loader. Instant DOM replacement.
            itemsShown = 0;
            galleryContainer.innerHTML = '';
            
            if (tagId === 'all') {
                shuffleArray(STREAM_RECORDS);
                filteredItems = [...STREAM_RECORDS];
            } else {
                const matchedItems = STREAM_RECORDS.filter(i => (i.tags && Array.isArray(i.tags) && i.tags.includes(tagId)));
                shuffleArray(matchedItems);
                filteredItems = matchedItems;
            }
            
            renderAll();
            if (typeof scrollToTop === 'function') scrollToTop();
        });

        headerNav.appendChild(btn);
    });
}

console.log('Gallery Initializing DYNAMICALLY...');
initFilters();
renderAll();

window.scrollToTop = function() {
    if (mainContent) {
        mainContent.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
};

if (mainContent) {
    mainContent.addEventListener('scroll', () => {
        const topBtn = document.getElementById('move-to-top');
        if (!topBtn) return;
        
        if (mainContent.scrollTop > 400) {
            topBtn.classList.add('visible');
        } else {
            topBtn.classList.remove('visible');
        }
    });
}

window.addEventListener('load', () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
        const index = filteredItems.findIndex(i => i.id === hash);
        if (index !== -1) openViewer(index);
    }
});

// ── PROMPT PANEL LOGIC ───────────────────────────────────────────────────────
// 공용 fetch 헬퍼 — 모듈 스코프에 먼저 선언 (이스터에그 + togglePromptPanel 공통 사용)
async function fetchPromptContent(content) {
    const url = content._promptUrl;
    if (!url) { content.textContent = 'NO PROMPT LINKED.'; return; }

    // ── SECURITY: Whitelist check — only Cloudinary URLs allowed ──
    if (!isSafePromptUrl(url)) {
        content.textContent = '⚠️ Prompt source not permitted.';
        console.warn('[SECURITY] Blocked fetch to non-whitelisted URL:', url);
        return;
    }

    try {
        content.textContent = 'Loading prompt...';
        const resp = await fetch(url);
        if (!resp.ok) throw new Error('Fetch failed');
        content.textContent = await resp.text();
        content._loaded = true;
    } catch (e) {
        content.textContent = '⚠️ Failed to load prompt.';
        console.error('[PROMPT]', e);
    }
}







window.copyPromptText = function () {
    clearAllFeedback(); // Proactive instant clear on click
    const content = document.getElementById('prompt-content');
    if (!content || !content.textContent) return;
    navigator.clipboard.writeText(content.textContent).then(() => {
        // Show localized feedback badge
        const feedback = document.getElementById('prompt-copy-feedback');
        if (feedback) showFeedback(feedback);
    });
};
// Helper to manage persistent UI state for the easter egg
function applyEggUIState(isActive) {
    const section = document.getElementById('prompt-section');
    const panel   = document.getElementById('prompt-panel');
    const desc    = document.getElementById('viewer-desc');
    const meta    = document.querySelector('.viewer-meta-grid');

    if (isActive) {
        if (section) section.style.display = 'flex';
        if (panel)   panel.style.display   = 'flex';
        if (desc)    desc.style.display    = 'none';
        if (meta)    meta.style.display    = 'none';
    } else {
        if (section) section.style.display = 'none';
        if (panel)   panel.style.display   = 'none';
        if (desc)    desc.style.display    = 'block';
        if (meta)    meta.style.display    = 'grid';
    }
}
