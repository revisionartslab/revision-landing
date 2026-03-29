/**
 * REVISION ARTS - Cinematic Gallery Slideshow Engine
 * Implements: Dual-layer Cross-fade, Ken Burns Effect, Progress Bar, Auto-play
 */

class SlideshowController {
    constructor() {
        this.isActive = false;
        this.intervalTime = 6000; // 6s per slide
        this.timer = null;
        this.lastActivity = Date.now();
        this.progressBar = document.getElementById('slideshow-progress');
        this.playPauseBtn = document.getElementById('slideshow-toggle');
        
        this.init();
    }

    init() {
        if (this.playPauseBtn) {
            this.playPauseBtn.onclick = () => this.toggle();
        }

        // Global activity listener for Ghost UI
        window.addEventListener('mousemove', () => this.recordActivity());
        window.addEventListener('click', () => this.recordActivity());
        window.addEventListener('touchstart', () => this.recordActivity());
        
        // Ghost UI Loop
        setInterval(() => this.checkUIStatus(), 1000);
    }

    recordActivity() {
        this.lastActivity = Date.now();
        document.getElementById('viewer-info-panel')?.classList.remove('ui-hidden');
        document.getElementById('rv-viewer')?.querySelectorAll('.viewer-controls, .slideshow-controls').forEach(el => el.classList.remove('ui-hidden'));
    }

    checkUIStatus() {
        if (!this.isActive || !window.viewer?.classList.contains('active')) return;
        
        const secondsInactive = (Date.now() - this.lastActivity) / 1000;
        if (secondsInactive >= 3) {
            document.getElementById('viewer-info-panel')?.classList.add('ui-hidden');
            document.getElementById('rv-viewer')?.querySelectorAll('.viewer-controls, .slideshow-controls').forEach(el => el.classList.add('ui-hidden'));
        }
    }

    toggle() {
        this.isActive = !this.isActive;
        if (this.isActive) {
            this.start();
            this.playPauseBtn.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
            showGlobalToast("Cinematic Engine Active");
        } else {
            this.stop();
            this.playPauseBtn.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
        }
    }

    start() {
        if (this.timer) clearInterval(this.timer);
        this.resetProgress();
        this.timer = setInterval(() => this.next(), this.intervalTime);
    }

    stop() {
        if (this.timer) clearInterval(this.timer);
        this.timer = null;
        this.resetProgress();
    }

    resetProgress() {
        if (!this.progressBar) return;
        this.progressBar.style.transition = 'none';
        this.progressBar.style.width = '0%';
        if (this.isActive) {
            setTimeout(() => {
                this.progressBar.style.transition = `width ${this.intervalTime}ms linear`;
                this.progressBar.style.width = '100%';
            }, 50);
        }
    }

    next() {
        if (window.navViewer) {
            window.navViewer(1);
        }
        this.resetProgress();
    }
}

// ── OVERWRITING PC VIEWER FOR DUAL-LAYER CROSSFADE ──────────────────────────
// These functions bridge the original gallery-logic to our new engine.

const KenBurnsPatterns = ['kb-zoom-in', 'kb-zoom-out', 'kb-pan-right', 'kb-pan-left'];

window.openViewer = async function(index) {
    const items = window._getFilteredItems();
    if (!items || !items[index]) return;

    window._setCurrentViewerIndex(index);
    const item = items[index];
    const viewer = document.getElementById('rv-viewer');
    const panel = document.querySelector('.viewer-media-panel');
    
    // UI Setup
    if (!viewer.classList.contains('active')) {
        viewer.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    const isMobile = window.innerWidth <= 1024;
    
    if (isMobile) {
        // Fallback to original layout for swipe compatibility
        const vImg = document.getElementById('viewer-img');
        if (vImg) vImg.src = item.url;
        // In mobile, we just sync the slider index if needed
    } else {
        // ── PC CROSSFADE ENGINE ──
        const layers = panel.querySelectorAll('.v-layer');
        const activeLayer = panel.querySelector('.v-layer.active');
        const bufferLayer = Array.from(layers).find(l => l !== activeLayer);

        // Prepare buffer
        bufferLayer.src = item.url;
        bufferLayer.className = 'v-layer'; // Clear current pattern
        
        // Wait for load to prevent flash
        await new Promise(r => {
            if (bufferLayer.complete) r();
            else bufferLayer.onload = r;
        });

        // Apply Random Ken Burns
        const randomPattern = KenBurnsPatterns[Math.floor(Math.random() * KenBurnsPatterns.length)];
        bufferLayer.classList.add(randomPattern);
        
        // Swap
        activeLayer.classList.remove('active');
        bufferLayer.classList.add('active');
    }

    // Sync Details
    updateViewerDetails(item);
};

function updateViewerDetails(item) {
    // Branded Title Hack
    const titleEl = document.getElementById('viewer-title');
    const assetId = window.generateAssetId ? window.generateAssetId(item) : 'RV-UNKNOWN';
    
    if (titleEl) {
        titleEl.textContent = item.title;
    }
    
    const descEl = document.getElementById('viewer-desc');
    if (descEl) descEl.textContent = item.description || "";
    
    document.getElementById('viewer-id').textContent = assetId;
    
    // Sync Metadata (Tags etc.)
    const metaContainer = document.querySelector('.viewer-meta-grid');
    if (metaContainer) {
        // Cleared and re-rendered as per standard logic
    }
    
    // Call the original sync if possible
    if (window._syncInfoState) window._syncInfoState();
}

// Initialize
window.slideshow = new SlideshowController();
