/**
 * REVISION ARTS GALLERY - Premium Logic (Pinflow Inspired)
 * Custom Cinematic Viewer & RV-CARD System
 */

// --- GLOBAL FEEDBACK SINGLETON (Prevents overlapping 'COPIED' messages) ---
// --- ASSET ID GENERATION HELPER ---
function generateAssetId(item) {
    if (!item) return 'RV-EMPTY';
    try {
        const dateStr = item.uploadedAt || (item.id.match(/\d{8} \d{6}/) ? item.id.match(/\d{8} \d{6}/)[0] : null);
        const rawAssetId = item.assetId || '';
        
        if (dateStr) {
            const cleanDate = dateStr.replace(/[-T:Z ]/g, '').substring(0, 8); // YYYYMMDD
            const suffix = rawAssetId ? rawAssetId.substring(rawAssetId.length - 4).toUpperCase() : (item.id.match(/\d{6}/) ? item.id.match(/\d{6}/)[0].substring(2,6) : 'ARCH');
            return `RV-${cleanDate}-${suffix}`;
        } else {
            const fallbackSuffix = rawAssetId ? rawAssetId.substring(0, 8).toUpperCase() : item.id.substring(0, 4).toUpperCase();
            return `RV-SER-${fallbackSuffix}`;
        }
    } catch (e) {
        return `RV-A-ERR-${item.id.substring(0, 4).toUpperCase()}`;
    }
}

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
        "id": "master 20260319 143356 [bb4c43 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 143356 [bb4c43 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918998/revision-arts/master%2020260319%20143356%20%5Bbb4c43%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917232/revision-arts/prompt_20260319_143356_%5Bbb4c43_FPS_original%5D",
        "assetId": "19138944784ab52c0af0fd21289dad8c",
        "uploadedAt": "2026-03-19T11:16:38Z"
    },
    {
        "id": "master 20260319 143428 [73f99b FPS original]",
        "tags": [
            "emotion",
            "landscape"
        ],
        "title": "master 20260319 143428 [73f99b FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918993/revision-arts/master%2020260319%20143428%20%5B73f99b%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": null,
        "assetId": "353e5be45a3c9e459252f64e236ca3ee",
        "uploadedAt": "2026-03-19T11:16:33Z"
    },
    {
        "id": "master 20260319 143456 [37e0f7 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 143456 [37e0f7 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918988/revision-arts/master%2020260319%20143456%20%5B37e0f7%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917231/revision-arts/prompt_20260319_143456_%5B37e0f7_FPS_original%5D",
        "assetId": "a775390601464c4b471ccc69558df413",
        "uploadedAt": "2026-03-19T11:16:28Z"
    },
    {
        "id": "master 20260319 143555 [4c56a0 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 143555 [4c56a0 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918980/revision-arts/master%2020260319%20143555%20%5B4c56a0%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917230/revision-arts/prompt_20260319_143555_%5B4c56a0_FPS_original%5D",
        "assetId": "ffdd650e68f063870fa0335dc82b90ca",
        "uploadedAt": "2026-03-19T11:16:20Z"
    },
    {
        "id": "master 20260319 143624 [227b76 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 143624 [227b76 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918977/revision-arts/master%2020260319%20143624%20%5B227b76%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917229/revision-arts/prompt_20260319_143624_%5B227b76_FPS_original%5D",
        "assetId": "d37fdf8f5204c98f2939db72bca4689b",
        "uploadedAt": "2026-03-19T11:16:17Z"
    },
    {
        "id": "master 20260319 143654 [3d18c8 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 143654 [3d18c8 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918972/revision-arts/master%2020260319%20143654%20%5B3d18c8%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917228/revision-arts/prompt_20260319_143654_%5B3d18c8_FPS_original%5D",
        "assetId": "cb747865113485792d85d3ec68da2c58",
        "uploadedAt": "2026-03-19T11:16:12Z"
    },
    {
        "id": "master 20260319 143755 [88dd1f FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 143755 [88dd1f FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918964/revision-arts/master%2020260319%20143755%20%5B88dd1f%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917227/revision-arts/prompt_20260319_143755_%5B88dd1f_FPS_original%5D",
        "assetId": "ec04f80546cebe2984a04b246a95a675",
        "uploadedAt": "2026-03-19T11:16:04Z"
    },
    {
        "id": "master 20260319 143835 [8fcb98 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 143835 [8fcb98 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918959/revision-arts/master%2020260319%20143835%20%5B8fcb98%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917226/revision-arts/prompt_20260319_143835_%5B8fcb98_FPS_original%5D",
        "assetId": "dc3e1ddaaab7672f315781d9ff0af8cb",
        "uploadedAt": "2026-03-19T11:15:59Z"
    },
    {
        "id": "master 20260319 143906 [8fa174 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 143906 [8fa174 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918954/revision-arts/master%2020260319%20143906%20%5B8fa174%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917226/revision-arts/prompt_20260319_143906_%5B8fa174_FPS_original%5D",
        "assetId": "b5b5186a6823d35603c411bd2378a186",
        "uploadedAt": "2026-03-19T11:15:54Z"
    },
    {
        "id": "master 20260319 144008 [aa7cb4 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 144008 [aa7cb4 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918944/revision-arts/master%2020260319%20144008%20%5Baa7cb4%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917224/revision-arts/prompt_20260319_144008_%5Baa7cb4_FPS_original%5D",
        "assetId": "be23bf1b1af2d1f8dfbdf00380aa3272",
        "uploadedAt": "2026-03-19T11:15:44Z"
    },
    {
        "id": "master 20260319 144044 [8defd5 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 144044 [8defd5 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918939/revision-arts/master%2020260319%20144044%20%5B8defd5%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917224/revision-arts/prompt_20260319_144044_%5B8defd5_FPS_original%5D",
        "assetId": "e788d693285d43a7a30f47b3b3dd51ef",
        "uploadedAt": "2026-03-19T11:15:39Z"
    },
    {
        "id": "master 20260319 144114 [f53a8e FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 144114 [f53a8e FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918936/revision-arts/master%2020260319%20144114%20%5Bf53a8e%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917223/revision-arts/prompt_20260319_144114_%5Bf53a8e_FPS_original%5D",
        "assetId": "e1fb4ca365477a641d681f7456d359df",
        "uploadedAt": "2026-03-19T11:15:36Z"
    },
    {
        "id": "master 20260319 144232 [954120 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 144232 [954120 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918926/revision-arts/master%2020260319%20144232%20%5B954120%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917220/revision-arts/prompt_20260319_144232_%5B954120_FPS_original%5D",
        "assetId": "f3aff9cdcc2d2fd7a67c501d6763fc15",
        "uploadedAt": "2026-03-19T11:15:26Z"
    },
    {
        "id": "master 20260319 144303 [42c266 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 144303 [42c266 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918923/revision-arts/master%2020260319%20144303%20%5B42c266%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917219/revision-arts/prompt_20260319_144303_%5B42c266_FPS_original%5D",
        "assetId": "e1996c905135460dbcc7b051122b8768",
        "uploadedAt": "2026-03-19T11:15:23Z"
    },
    {
        "id": "master 20260319 144331 [144388 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 144331 [144388 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918918/revision-arts/master%2020260319%20144331%20%5B144388%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917218/revision-arts/prompt_20260319_144331_%5B144388_FPS_original%5D",
        "assetId": "9b55764f46fca924d5537afec6f783ae",
        "uploadedAt": "2026-03-19T11:15:18Z"
    },
    {
        "id": "master 20260319 144453 [5696a6 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 144453 [5696a6 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918911/revision-arts/master%2020260319%20144453%20%5B5696a6%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917215/revision-arts/prompt_20260319_144453_%5B5696a6_FPS_original%5D",
        "assetId": "cd9f97703c9a960b2c4609d9aed67f5b",
        "uploadedAt": "2026-03-19T11:15:11Z"
    },
    {
        "id": "master 20260319 144526 [991dd3 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 144526 [991dd3 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918906/revision-arts/master%2020260319%20144526%20%5B991dd3%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917214/revision-arts/prompt_20260319_144526_%5B991dd3_FPS_original%5D",
        "assetId": "13da4550b6eb40c71ec72ddfa1764aa1",
        "uploadedAt": "2026-03-19T11:15:06Z"
    },
    {
        "id": "master 20260319 144557 [66e53b FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 144557 [66e53b FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918903/revision-arts/master%2020260319%20144557%20%5B66e53b%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917213/revision-arts/prompt_20260319_144557_%5B66e53b_FPS_original%5D",
        "assetId": "d029ae5030282e9697a86fb8952c357b",
        "uploadedAt": "2026-03-19T11:15:03Z"
    },
    {
        "id": "master 20260319 144625 [98f614 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 144625 [98f614 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918900/revision-arts/master%2020260319%20144625%20%5B98f614%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917213/revision-arts/prompt_20260319_144625_%5B98f614_FPS_original%5D",
        "assetId": "4a07d2c4a27c81bc5d97dd7f5723ee32",
        "uploadedAt": "2026-03-19T11:15:00Z"
    },
    {
        "id": "master 20260319 144657 [64c13e FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 144657 [64c13e FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918895/revision-arts/master%2020260319%20144657%20%5B64c13e%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917212/revision-arts/prompt_20260319_144657_%5B64c13e_FPS_original%5D",
        "assetId": "f95f56308d31376263a73d11943eec36",
        "uploadedAt": "2026-03-19T11:14:55Z"
    },
    {
        "id": "master 20260319 144801 [7f901c FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 144801 [7f901c FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918887/revision-arts/master%2020260319%20144801%20%5B7f901c%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917210/revision-arts/prompt_20260319_144801_%5B7f901c_FPS_original%5D",
        "assetId": "778ff95f55fd3d90f33c0d87c244e44e",
        "uploadedAt": "2026-03-19T11:14:47Z"
    },
    {
        "id": "master 20260319 144833 [1cefc3 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 144833 [1cefc3 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918882/revision-arts/master%2020260319%20144833%20%5B1cefc3%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917210/revision-arts/prompt_20260319_144833_%5B1cefc3_FPS_original%5D",
        "assetId": "0d3652a297c7344177c170d2d3f72bbf",
        "uploadedAt": "2026-03-19T11:14:42Z"
    },
    {
        "id": "master 20260319 144903 [11c579 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 144903 [11c579 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918877/revision-arts/master%2020260319%20144903%20%5B11c579%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917209/revision-arts/prompt_20260319_144903_%5B11c579_FPS_original%5D",
        "assetId": "02b5df33e66daafe2c5f7fbdafac41e3",
        "uploadedAt": "2026-03-19T11:14:37Z"
    },
    {
        "id": "master 20260319 145041 [6c33ee FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 145041 [6c33ee FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918866/revision-arts/master%2020260319%20145041%20%5B6c33ee%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917207/revision-arts/prompt_20260319_145041_%5B6c33ee_FPS_original%5D",
        "assetId": "d904fa3012c118914d236e946400b8da",
        "uploadedAt": "2026-03-19T11:14:26Z"
    },
    {
        "id": "master 20260319 145113 [5a5873 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 145113 [5a5873 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918863/revision-arts/master%2020260319%20145113%20%5B5a5873%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917206/revision-arts/prompt_20260319_145113_%5B5a5873_FPS_original%5D",
        "assetId": "35c88369925935ab8596f01348f28773",
        "uploadedAt": "2026-03-19T11:14:23Z"
    },
    {
        "id": "master 20260319 145144 [73e918 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 145144 [73e918 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918860/revision-arts/master%2020260319%20145144%20%5B73e918%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917206/revision-arts/prompt_20260319_145144_%5B73e918_FPS_original%5D",
        "assetId": "0f9056653a4dc4f76e9699c9074f8b1a",
        "uploadedAt": "2026-03-19T11:14:20Z"
    },
    {
        "id": "master 20260319 145215 [340fb8 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 145215 [340fb8 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918857/revision-arts/master%2020260319%20145215%20%5B340fb8%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917205/revision-arts/prompt_20260319_145215_%5B340fb8_FPS_original%5D",
        "assetId": "a3126b7b3b2366ef12bdf23b518a6583",
        "uploadedAt": "2026-03-19T11:14:17Z"
    },
    {
        "id": "master 20260319 145245 [2e3b34 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 145245 [2e3b34 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918854/revision-arts/master%2020260319%20145245%20%5B2e3b34%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917205/revision-arts/prompt_20260319_145245_%5B2e3b34_FPS_original%5D",
        "assetId": "a9a9df0ce1cd8ce2e75ecd5a0f3df568",
        "uploadedAt": "2026-03-19T11:14:14Z"
    },
    {
        "id": "master 20260319 145316 [eaa5a0 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 145316 [eaa5a0 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918851/revision-arts/master%2020260319%20145316%20%5Beaa5a0%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917204/revision-arts/prompt_20260319_145316_%5Beaa5a0_FPS_original%5D",
        "assetId": "b28ff5174890f669fe54540e96ac78df",
        "uploadedAt": "2026-03-19T11:14:11Z"
    },
    {
        "id": "master 20260319 145356 [df2064 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 145356 [df2064 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918847/revision-arts/master%2020260319%20145356%20%5Bdf2064%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917203/revision-arts/prompt_20260319_145356_%5Bdf2064_FPS_original%5D",
        "assetId": "090d46438245aecc6e2a6ea06ea56481",
        "uploadedAt": "2026-03-19T11:14:07Z"
    },
    {
        "id": "master 20260319 145438 [6600c6 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 145438 [6600c6 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918842/revision-arts/master%2020260319%20145438%20%5B6600c6%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917202/revision-arts/prompt_20260319_145438_%5B6600c6_FPS_original%5D",
        "assetId": "dd42193f7ff3fbded9c985cd21607d0d",
        "uploadedAt": "2026-03-19T11:14:02Z"
    },
    {
        "id": "master 20260319 145511 [ed99ca FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 145511 [ed99ca FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918838/revision-arts/master%2020260319%20145511%20%5Bed99ca%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917202/revision-arts/prompt_20260319_145511_%5Bed99ca_FPS_original%5D",
        "assetId": "9e734ca60d074962966592a8b6a5de4f",
        "uploadedAt": "2026-03-19T11:13:58Z"
    },
    {
        "id": "master 20260319 145544 [b66933 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 145544 [b66933 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918833/revision-arts/master%2020260319%20145544%20%5Bb66933%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917201/revision-arts/prompt_20260319_145544_%5Bb66933_FPS_original%5D",
        "assetId": "0cf091b44050c20adbc4387351357722",
        "uploadedAt": "2026-03-19T11:13:53Z"
    },
    {
        "id": "master 20260319 145623 [aea4ae FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 145623 [aea4ae FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918828/revision-arts/master%2020260319%20145623%20%5Baea4ae%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917200/revision-arts/prompt_20260319_145623_%5Baea4ae_FPS_original%5D",
        "assetId": "13c5b7c205c0186d9c97a97760eaab55",
        "uploadedAt": "2026-03-19T11:13:48Z"
    },
    {
        "id": "master 20260319 145655 [b7be0f FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 145655 [b7be0f FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918824/revision-arts/master%2020260319%20145655%20%5Bb7be0f%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917200/revision-arts/prompt_20260319_145655_%5Bb7be0f_FPS_original%5D",
        "assetId": "9e3382f5e048f8eeb194b2fbd0da116b",
        "uploadedAt": "2026-03-19T11:13:44Z"
    },
    {
        "id": "master 20260319 145734 [be8168 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 145734 [be8168 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918821/revision-arts/master%2020260319%20145734%20%5Bbe8168%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917198/revision-arts/prompt_20260319_145734_%5Bbe8168_FPS_original%5D",
        "assetId": "1d23ec8cf1b4ecb9568b4b8b1d5308b7",
        "uploadedAt": "2026-03-19T11:13:41Z"
    },
    {
        "id": "master 20260319 145807 [385e7c FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 145807 [385e7c FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918816/revision-arts/master%2020260319%20145807%20%5B385e7c%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917198/revision-arts/prompt_20260319_145807_%5B385e7c_FPS_original%5D",
        "assetId": "c7de19621ee8ed43e74f2009af271fb6",
        "uploadedAt": "2026-03-19T11:13:36Z"
    },
    {
        "id": "master 20260319 145837 [396e3b FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 145837 [396e3b FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918813/revision-arts/master%2020260319%20145837%20%5B396e3b%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917197/revision-arts/prompt_20260319_145837_%5B396e3b_FPS_original%5D",
        "assetId": "40a2c0506a905f8748a892fc5319381a",
        "uploadedAt": "2026-03-19T11:13:33Z"
    },
    {
        "id": "master 20260319 145912 [64094a FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 145912 [64094a FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918810/revision-arts/master%2020260319%20145912%20%5B64094a%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917196/revision-arts/prompt_20260319_145912_%5B64094a_FPS_original%5D",
        "assetId": "dbe9d435edd9f09594f291fa348a7880",
        "uploadedAt": "2026-03-19T11:13:30Z"
    },
    {
        "id": "master 20260319 145941 [1f1c49 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 145941 [1f1c49 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918807/revision-arts/master%2020260319%20145941%20%5B1f1c49%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917195/revision-arts/prompt_20260319_145941_%5B1f1c49_FPS_original%5D",
        "assetId": "25bc25a311d47e2ac4493bc03debad2f",
        "uploadedAt": "2026-03-19T11:13:27Z"
    },
    {
        "id": "master 20260319 150013 [4a0c50 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 150013 [4a0c50 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918802/revision-arts/master%2020260319%20150013%20%5B4a0c50%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917195/revision-arts/prompt_20260319_150013_%5B4a0c50_FPS_original%5D",
        "assetId": "efcba40f9480c2dd20dabb096082d627",
        "uploadedAt": "2026-03-19T11:13:22Z"
    },
    {
        "id": "master 20260319 150047 [6b19cd FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 150047 [6b19cd FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918798/revision-arts/master%2020260319%20150047%20%5B6b19cd%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917194/revision-arts/prompt_20260319_150047_%5B6b19cd_FPS_original%5D",
        "assetId": "07d002d7e4079d65b2fc20447cd7d51a",
        "uploadedAt": "2026-03-19T11:13:18Z"
    },
    {
        "id": "master 20260319 150121 [d99a03 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 150121 [d99a03 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918795/revision-arts/master%2020260319%20150121%20%5Bd99a03%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917193/revision-arts/prompt_20260319_150121_%5Bd99a03_FPS_original%5D",
        "assetId": "4d113103d3b243cfaf16cf3da169b5a3",
        "uploadedAt": "2026-03-19T11:13:15Z"
    },
    {
        "id": "master 20260319 150158 [7a2d19 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 150158 [7a2d19 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918790/revision-arts/master%2020260319%20150158%20%5B7a2d19%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917193/revision-arts/prompt_20260319_150158_%5B7a2d19_FPS_original%5D",
        "assetId": "c18a404e043388cd3e4ee53bad6f11db",
        "uploadedAt": "2026-03-19T11:13:10Z"
    },
    {
        "id": "master 20260319 150232 [381a4a FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 150232 [381a4a FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918785/revision-arts/master%2020260319%20150232%20%5B381a4a%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917192/revision-arts/prompt_20260319_150232_%5B381a4a_FPS_original%5D",
        "assetId": "65cc8e30578ca75d4406e2f12e1b1708",
        "uploadedAt": "2026-03-19T11:13:05Z"
    },
    {
        "id": "master 20260319 150330 [363a41 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 150330 [363a41 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918774/revision-arts/master%2020260319%20150330%20%5B363a41%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917190/revision-arts/prompt_20260319_150330_%5B363a41_FPS_original%5D",
        "assetId": "2af19ad8528e0d0c7a2527fe1799b5a9",
        "uploadedAt": "2026-03-19T11:12:54Z"
    },
    {
        "id": "master 20260319 150402 [e6b951 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 150402 [e6b951 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918768/revision-arts/master%2020260319%20150402%20%5Be6b951%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917190/revision-arts/prompt_20260319_150402_%5Be6b951_FPS_original%5D",
        "assetId": "99f5d551f4fd26a82d55bd28ff5f2e27",
        "uploadedAt": "2026-03-19T11:12:48Z"
    },
    {
        "id": "master 20260319 150434 [e2f3c4 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 150434 [e2f3c4 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918763/revision-arts/master%2020260319%20150434%20%5Be2f3c4%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917189/revision-arts/prompt_20260319_150434_%5Be2f3c4_FPS_original%5D",
        "assetId": "b82280bd1279552af7fc97b6cbabca16",
        "uploadedAt": "2026-03-19T11:12:43Z"
    },
    {
        "id": "master 20260319 150507 [506b69 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 150507 [506b69 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918759/revision-arts/master%2020260319%20150507%20%5B506b69%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917188/revision-arts/prompt_20260319_150507_%5B506b69_FPS_original%5D",
        "assetId": "265afc7a98473d9d3a46af2382b8abcd",
        "uploadedAt": "2026-03-19T11:12:39Z"
    },
    {
        "id": "master 20260319 150541 [f7d7ef FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 150541 [f7d7ef FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918755/revision-arts/master%2020260319%20150541%20%5Bf7d7ef%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917187/revision-arts/prompt_20260319_150541_%5Bf7d7ef_FPS_original%5D",
        "assetId": "97ad33f53fddb27127418b375dec84c7",
        "uploadedAt": "2026-03-19T11:12:35Z"
    },
    {
        "id": "master 20260319 150613 [c78e55 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 150613 [c78e55 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918752/revision-arts/master%2020260319%20150613%20%5Bc78e55%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917186/revision-arts/prompt_20260319_150613_%5Bc78e55_FPS_original%5D",
        "assetId": "4af5b9ec4854f84d799c2e643b0741b2",
        "uploadedAt": "2026-03-19T11:12:32Z"
    },
    {
        "id": "master 20260319 150642 [fb389f FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 150642 [fb389f FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918747/revision-arts/master%2020260319%20150642%20%5Bfb389f%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917185/revision-arts/prompt_20260319_150642_%5Bfb389f_FPS_original%5D",
        "assetId": "d09c9107b40e4289aabec9e974aba838",
        "uploadedAt": "2026-03-19T11:12:27Z"
    },
    {
        "id": "master 20260319 150711 [183f48 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 150711 [183f48 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918742/revision-arts/master%2020260319%20150711%20%5B183f48%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917184/revision-arts/prompt_20260319_150711_%5B183f48_FPS_original%5D",
        "assetId": "025ececc9422dc8d4fe9d70ef77f66ca",
        "uploadedAt": "2026-03-19T11:12:22Z"
    },
    {
        "id": "master 20260319 150749 [7995e6 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 150749 [7995e6 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918739/revision-arts/master%2020260319%20150749%20%5B7995e6%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917184/revision-arts/prompt_20260319_150749_%5B7995e6_FPS_original%5D",
        "assetId": "8ef938e14cf0729448ddd30deae4a64c",
        "uploadedAt": "2026-03-19T11:12:19Z"
    },
    {
        "id": "master 20260319 150818 [9c6a35 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 150818 [9c6a35 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918734/revision-arts/master%2020260319%20150818%20%5B9c6a35%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917183/revision-arts/prompt_20260319_150818_%5B9c6a35_FPS_original%5D",
        "assetId": "3df4ba8d8bf2c2fba8f24551120ebafe",
        "uploadedAt": "2026-03-19T11:12:14Z"
    },
    {
        "id": "master 20260319 150848 [839641 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 150848 [839641 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918730/revision-arts/master%2020260319%20150848%20%5B839641%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917182/revision-arts/prompt_20260319_150848_%5B839641_FPS_original%5D",
        "assetId": "7585d02e83f556d36d719049b0c00ec7",
        "uploadedAt": "2026-03-19T11:12:10Z"
    },
    {
        "id": "master 20260319 150931 [eb8814 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 150931 [eb8814 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918726/revision-arts/master%2020260319%20150931%20%5Beb8814%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917181/revision-arts/prompt_20260319_150931_%5Beb8814_FPS_original%5D",
        "assetId": "581dc86f25797ee24a87f38e1749e58e",
        "uploadedAt": "2026-03-19T11:12:06Z"
    },
    {
        "id": "master 20260319 151006 [b48e90 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 151006 [b48e90 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918721/revision-arts/master%2020260319%20151006%20%5Bb48e90%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917180/revision-arts/prompt_20260319_151006_%5Bb48e90_FPS_original%5D",
        "assetId": "5360997ecd0b0641d4e3660f88876add",
        "uploadedAt": "2026-03-19T11:12:01Z"
    },
    {
        "id": "master 20260319 151037 [c45291 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 151037 [c45291 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918716/revision-arts/master%2020260319%20151037%20%5Bc45291%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917179/revision-arts/prompt_20260319_151037_%5Bc45291_FPS_original%5D",
        "assetId": "f3c643e13149d882c2fcea083e9ed4bd",
        "uploadedAt": "2026-03-19T11:11:56Z"
    },
    {
        "id": "master 20260319 151131 [7697fe FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 151131 [7697fe FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918706/revision-arts/master%2020260319%20151131%20%5B7697fe%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917178/revision-arts/prompt_20260319_151131_%5B7697fe_FPS_original%5D",
        "assetId": "c120175dd323354d537e48eecfb07253",
        "uploadedAt": "2026-03-19T11:11:46Z"
    },
    {
        "id": "master 20260319 151206 [906b8b FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 151206 [906b8b FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918701/revision-arts/master%2020260319%20151206%20%5B906b8b%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917177/revision-arts/prompt_20260319_151206_%5B906b8b_FPS_original%5D",
        "assetId": "6f109ca28a2f24f717ba29495cf104d8",
        "uploadedAt": "2026-03-19T11:11:41Z"
    },
    {
        "id": "master 20260319 151235 [a70595 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 151235 [a70595 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918696/revision-arts/master%2020260319%20151235%20%5Ba70595%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917176/revision-arts/prompt_20260319_151235_%5Ba70595_FPS_original%5D",
        "assetId": "319af25c6d33e23be856c02ca0613a7c",
        "uploadedAt": "2026-03-19T11:11:36Z"
    },
    {
        "id": "master 20260319 151307 [c822f7 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 151307 [c822f7 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918693/revision-arts/master%2020260319%20151307%20%5Bc822f7%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917175/revision-arts/prompt_20260319_151307_%5Bc822f7_FPS_original%5D",
        "assetId": "889f314bc5cbfabc5f32b074cae21af3",
        "uploadedAt": "2026-03-19T11:11:33Z"
    },
    {
        "id": "master 20260319 151339 [71c003 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 151339 [71c003 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918688/revision-arts/master%2020260319%20151339%20%5B71c003%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917175/revision-arts/prompt_20260319_151339_%5B71c003_FPS_original%5D",
        "assetId": "c937e4d79978a9e4617223d25c781e24",
        "uploadedAt": "2026-03-19T11:11:28Z"
    },
    {
        "id": "master 20260319 151414 [2e934d FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 151414 [2e934d FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918684/revision-arts/master%2020260319%20151414%20%5B2e934d%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917174/revision-arts/prompt_20260319_151414_%5B2e934d_FPS_original%5D",
        "assetId": "84f6740c3edb3e34699c5a0cf4bd9621",
        "uploadedAt": "2026-03-19T11:11:24Z"
    },
    {
        "id": "master 20260319 151441 [adf586 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 151441 [adf586 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918680/revision-arts/master%2020260319%20151441%20%5Badf586%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917174/revision-arts/prompt_20260319_151441_%5Badf586_FPS_original%5D",
        "assetId": "8fb8f92869f42a7bde5a6fab04bc8b58",
        "uploadedAt": "2026-03-19T11:11:20Z"
    },
    {
        "id": "master 20260319 151509 [35c0de FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 151509 [35c0de FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918676/revision-arts/master%2020260319%20151509%20%5B35c0de%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917173/revision-arts/prompt_20260319_151509_%5B35c0de_FPS_original%5D",
        "assetId": "1354c65d0ac72c835a4a4ec71cc03e8c",
        "uploadedAt": "2026-03-19T11:11:16Z"
    },
    {
        "id": "master 20260319 151537 [0cb24d FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 151537 [0cb24d FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918673/revision-arts/master%2020260319%20151537%20%5B0cb24d%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917172/revision-arts/prompt_20260319_151537_%5B0cb24d_FPS_original%5D",
        "assetId": "0b101ee7a9a25a96e8f89c56ddeb1002",
        "uploadedAt": "2026-03-19T11:11:13Z"
    },
    {
        "id": "master 20260319 151616 [eb0476 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 151616 [eb0476 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918670/revision-arts/master%2020260319%20151616%20%5Beb0476%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917171/revision-arts/prompt_20260319_151616_%5Beb0476_FPS_original%5D",
        "assetId": "5193a48927927e93f5d962b4c4895ba8",
        "uploadedAt": "2026-03-19T11:11:10Z"
    },
    {
        "id": "master 20260319 151648 [fa6957 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 151648 [fa6957 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918664/revision-arts/master%2020260319%20151648%20%5Bfa6957%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917170/revision-arts/prompt_20260319_151648_%5Bfa6957_FPS_original%5D",
        "assetId": "e10348bf114f670f78d5475554b26a3a",
        "uploadedAt": "2026-03-19T11:11:04Z"
    },
    {
        "id": "master 20260319 151718 [b6b079 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 151718 [b6b079 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918659/revision-arts/master%2020260319%20151718%20%5Bb6b079%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917169/revision-arts/prompt_20260319_151718_%5Bb6b079_FPS_original%5D",
        "assetId": "eb93fa066fa220b1ade49e6bc193763d",
        "uploadedAt": "2026-03-19T11:10:59Z"
    },
    {
        "id": "master 20260319 151818 [c66bfc FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 151818 [c66bfc FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918650/revision-arts/master%2020260319%20151818%20%5Bc66bfc%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917165/revision-arts/prompt_20260319_151818_%5Bc66bfc_FPS_original%5D",
        "assetId": "b53e6f8e28c6503eb3a0ee7295c5bf10",
        "uploadedAt": "2026-03-19T11:10:50Z"
    },
    {
        "id": "master 20260319 151849 [1389c2 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 151849 [1389c2 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918645/revision-arts/master%2020260319%20151849%20%5B1389c2%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917163/revision-arts/prompt_20260319_151849_%5B1389c2_FPS_original%5D",
        "assetId": "92edd7286ba744d0d6fe6b7aed582524",
        "uploadedAt": "2026-03-19T11:10:45Z"
    },
    {
        "id": "master 20260319 151952 [9f58ac FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 151952 [9f58ac FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918638/revision-arts/master%2020260319%20151952%20%5B9f58ac%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917161/revision-arts/prompt_20260319_151952_%5B9f58ac_FPS_original%5D",
        "assetId": "2fb8b4ab456b6428c5c90d7dbc26f54d",
        "uploadedAt": "2026-03-19T11:10:38Z"
    },
    {
        "id": "master 20260319 152135 [4bb6a5 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 152135 [4bb6a5 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918630/revision-arts/master%2020260319%20152135%20%5B4bb6a5%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917159/revision-arts/prompt_20260319_152135_%5B4bb6a5_FPS_original%5D",
        "assetId": "347ccee9be6f352b4539471f8af8af84",
        "uploadedAt": "2026-03-19T11:10:30Z"
    },
    {
        "id": "master 20260319 152205 [0fe5f6 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 152205 [0fe5f6 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918625/revision-arts/master%2020260319%20152205%20%5B0fe5f6%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917159/revision-arts/prompt_20260319_152205_%5B0fe5f6_FPS_original%5D",
        "assetId": "7e039860df3303b48cb09bdae37b66c1",
        "uploadedAt": "2026-03-19T11:10:25Z"
    },
    {
        "id": "master 20260319 152306 [1e42f6 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 152306 [1e42f6 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918617/revision-arts/master%2020260319%20152306%20%5B1e42f6%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917157/revision-arts/prompt_20260319_152306_%5B1e42f6_FPS_original%5D",
        "assetId": "c697d3012ae9723d1dd353ce51e575ff",
        "uploadedAt": "2026-03-19T11:10:17Z"
    },
    {
        "id": "master 20260319 152337 [cb15ed FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 152337 [cb15ed FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918614/revision-arts/master%2020260319%20152337%20%5Bcb15ed%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917156/revision-arts/prompt_20260319_152337_%5Bcb15ed_FPS_original%5D",
        "assetId": "6b8119b93aa29a0bd16201e585d18dd9",
        "uploadedAt": "2026-03-19T11:10:14Z"
    },
    {
        "id": "master 20260319 152408 [a6ef52 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 152408 [a6ef52 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918610/revision-arts/master%2020260319%20152408%20%5Ba6ef52%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917156/revision-arts/prompt_20260319_152408_%5Ba6ef52_FPS_original%5D",
        "assetId": "7d680f2b3fcdfe4f6680d366b6629694",
        "uploadedAt": "2026-03-19T11:10:10Z"
    },
    {
        "id": "master 20260319 152438 [8c7600 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 152438 [8c7600 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918606/revision-arts/master%2020260319%20152438%20%5B8c7600%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917155/revision-arts/prompt_20260319_152438_%5B8c7600_FPS_original%5D",
        "assetId": "0d9876d88665e46476a9ed5ce8c2d22f",
        "uploadedAt": "2026-03-19T11:10:06Z"
    },
    {
        "id": "master 20260319 152506 [682a4a FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 152506 [682a4a FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918603/revision-arts/master%2020260319%20152506%20%5B682a4a%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917154/revision-arts/prompt_20260319_152506_%5B682a4a_FPS_original%5D",
        "assetId": "b170ef506bac9624fb9d31c2abb47a0e",
        "uploadedAt": "2026-03-19T11:10:03Z"
    },
    {
        "id": "master 20260319 152600 [969bba FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 152600 [969bba FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918595/revision-arts/master%2020260319%20152600%20%5B969bba%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917152/revision-arts/prompt_20260319_152600_%5B969bba_FPS_original%5D",
        "assetId": "f976f1733a824f0b6b00a985bb8c1ad3",
        "uploadedAt": "2026-03-19T11:09:55Z"
    },
    {
        "id": "master 20260319 152629 [bdb977 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 152629 [bdb977 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918590/revision-arts/master%2020260319%20152629%20%5Bbdb977%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917152/revision-arts/prompt_20260319_152629_%5Bbdb977_FPS_original%5D",
        "assetId": "237501d8effcc67f38f1073ec565a146",
        "uploadedAt": "2026-03-19T11:09:50Z"
    },
    {
        "id": "master 20260319 152701 [255723 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 152701 [255723 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918587/revision-arts/master%2020260319%20152701%20%5B255723%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917151/revision-arts/prompt_20260319_152701_%5B255723_FPS_original%5D",
        "assetId": "369cb1bd5a276bc3730d9b05a438ecdb",
        "uploadedAt": "2026-03-19T11:09:47Z"
    },
    {
        "id": "master 20260319 152735 [9d4a0f FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 152735 [9d4a0f FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918584/revision-arts/master%2020260319%20152735%20%5B9d4a0f%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917151/revision-arts/prompt_20260319_152735_%5B9d4a0f_FPS_original%5D",
        "assetId": "11a86111d5d21e4d9638365e78e4fa54",
        "uploadedAt": "2026-03-19T11:09:44Z"
    },
    {
        "id": "master 20260319 152803 [840746 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 152803 [840746 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918579/revision-arts/master%2020260319%20152803%20%5B840746%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917149/revision-arts/prompt_20260319_152803_%5B840746_FPS_original%5D",
        "assetId": "55d7912e9753e2e2a3e2b29872d4269b",
        "uploadedAt": "2026-03-19T11:09:39Z"
    },
    {
        "id": "master 20260319 152831 [a17490 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 152831 [a17490 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918575/revision-arts/master%2020260319%20152831%20%5Ba17490%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917149/revision-arts/prompt_20260319_152831_%5Ba17490_FPS_original%5D",
        "assetId": "8bd3451c47f9ed64bf846f2c1ec96baf",
        "uploadedAt": "2026-03-19T11:09:35Z"
    },
    {
        "id": "master 20260319 152859 [2b16bb FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 152859 [2b16bb FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918570/revision-arts/master%2020260319%20152859%20%5B2b16bb%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917148/revision-arts/prompt_20260319_152859_%5B2b16bb_FPS_original%5D",
        "assetId": "5348c504a37cf789286dd7e69ba48273",
        "uploadedAt": "2026-03-19T11:09:30Z"
    },
    {
        "id": "master 20260319 153028 [5929e5 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 153028 [5929e5 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918546/revision-arts/master%2020260319%20153028%20%5B5929e5%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917146/revision-arts/prompt_20260319_153028_%5B5929e5_FPS_original%5D",
        "assetId": "a79a06f388d4bee8e0f18bd688f7d61e",
        "uploadedAt": "2026-03-19T11:09:06Z"
    },
    {
        "id": "master 20260319 153058 [637175 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 153058 [637175 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918542/revision-arts/master%2020260319%20153058%20%5B637175%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917145/revision-arts/prompt_20260319_153058_%5B637175_FPS_original%5D",
        "assetId": "34b0ac5c151e5f47f534a75b011e8861",
        "uploadedAt": "2026-03-19T11:09:02Z"
    },
    {
        "id": "master 20260319 153130 [43f285 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 153130 [43f285 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918539/revision-arts/master%2020260319%20153130%20%5B43f285%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917144/revision-arts/prompt_20260319_153130_%5B43f285_FPS_original%5D",
        "assetId": "e1ad9f4dfc5cc29c36ec84e7ecd40323",
        "uploadedAt": "2026-03-19T11:08:59Z"
    },
    {
        "id": "master 20260319 153201 [b58ed5 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 153201 [b58ed5 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918535/revision-arts/master%2020260319%20153201%20%5Bb58ed5%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917144/revision-arts/prompt_20260319_153201_%5Bb58ed5_FPS_original%5D",
        "assetId": "a5a0a6d0317429b1f3cee53db92aa95f",
        "uploadedAt": "2026-03-19T11:08:55Z"
    },
    {
        "id": "master 20260319 153234 [81e5e9 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 153234 [81e5e9 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918528/revision-arts/master%2020260319%20153234%20%5B81e5e9%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917143/revision-arts/prompt_20260319_153234_%5B81e5e9_FPS_original%5D",
        "assetId": "b24ce712de305a6b1df852d37abb4070",
        "uploadedAt": "2026-03-19T11:08:48Z"
    },
    {
        "id": "master 20260319 153303 [f79199 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 153303 [f79199 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918523/revision-arts/master%2020260319%20153303%20%5Bf79199%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917142/revision-arts/prompt_20260319_153303_%5Bf79199_FPS_original%5D",
        "assetId": "7a3894176f126bc0a14afc37f3f99864",
        "uploadedAt": "2026-03-19T11:08:43Z"
    },
    {
        "id": "master 20260319 153331 [f3f011 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 153331 [f3f011 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918519/revision-arts/master%2020260319%20153331%20%5Bf3f011%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917141/revision-arts/prompt_20260319_153331_%5Bf3f011_FPS_original%5D",
        "assetId": "aeca65af4c5f68fdd62657afe3e2c4d5",
        "uploadedAt": "2026-03-19T11:08:39Z"
    },
    {
        "id": "master 20260319 153359 [cca6a3 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 153359 [cca6a3 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918516/revision-arts/master%2020260319%20153359%20%5Bcca6a3%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917140/revision-arts/prompt_20260319_153359_%5Bcca6a3_FPS_original%5D",
        "assetId": "37e3c6a995abae4509aa4b432414176b",
        "uploadedAt": "2026-03-19T11:08:36Z"
    },
    {
        "id": "master 20260319 153427 [73955e FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 153427 [73955e FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918491/revision-arts/master%2020260319%20153427%20%5B73955e%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917140/revision-arts/prompt_20260319_153427_%5B73955e_FPS_original%5D",
        "assetId": "ab826b287497a3bb7469a612884f6e91",
        "uploadedAt": "2026-03-19T11:08:11Z"
    },
    {
        "id": "master 20260319 153452 [b04514 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 153452 [b04514 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918480/revision-arts/master%2020260319%20153452%20%5Bb04514%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917139/revision-arts/prompt_20260319_153452_%5Bb04514_FPS_original%5D",
        "assetId": "2efc0bef0e56158e8ab521b761f0fb15",
        "uploadedAt": "2026-03-19T11:08:00Z"
    },
    {
        "id": "master 20260319 153642 [2e890b FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 153642 [2e890b FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918477/revision-arts/master%2020260319%20153642%20%5B2e890b%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917138/revision-arts/prompt_20260319_153642_%5B2e890b_FPS_original%5D",
        "assetId": "c643daa4c3fefc7997e0e1e3467b4d31",
        "uploadedAt": "2026-03-19T11:07:57Z"
    },
    {
        "id": "master 20260319 153717 [35a09b FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 153717 [35a09b FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918473/revision-arts/master%2020260319%20153717%20%5B35a09b%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917137/revision-arts/prompt_20260319_153717_%5B35a09b_FPS_original%5D",
        "assetId": "fb8d9b27d638640dbbd8a815c87a5da4",
        "uploadedAt": "2026-03-19T11:07:53Z"
    },
    {
        "id": "master 20260319 153749 [583f51 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 153749 [583f51 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918469/revision-arts/master%2020260319%20153749%20%5B583f51%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917136/revision-arts/prompt_20260319_153749_%5B583f51_FPS_original%5D",
        "assetId": "8767a8d16189e93c5e4ff6da7aa48c8e",
        "uploadedAt": "2026-03-19T11:07:49Z"
    },
    {
        "id": "master 20260319 153819 [c0bc70 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 153819 [c0bc70 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918466/revision-arts/master%2020260319%20153819%20%5Bc0bc70%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917135/revision-arts/prompt_20260319_153819_%5Bc0bc70_FPS_original%5D",
        "assetId": "8ccea1da53a20ce47caac20b2dfaf660",
        "uploadedAt": "2026-03-19T11:07:46Z"
    },
    {
        "id": "master 20260319 153851 [044540 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 153851 [044540 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918459/revision-arts/master%2020260319%20153851%20%5B044540%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917135/revision-arts/prompt_20260319_153851_%5B044540_FPS_original%5D",
        "assetId": "91f861cba8d8114d45014685a9a402b6",
        "uploadedAt": "2026-03-19T11:07:39Z"
    },
    {
        "id": "master 20260319 153926 [81e1b2 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 153926 [81e1b2 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918453/revision-arts/master%2020260319%20153926%20%5B81e1b2%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917134/revision-arts/prompt_20260319_153926_%5B81e1b2_FPS_original%5D",
        "assetId": "0fb01dde6b080bcf02137d05095322cc",
        "uploadedAt": "2026-03-19T11:07:33Z"
    },
    {
        "id": "master 20260319 153952 [42b473 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 153952 [42b473 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918450/revision-arts/master%2020260319%20153952%20%5B42b473%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917133/revision-arts/prompt_20260319_153952_%5B42b473_FPS_original%5D",
        "assetId": "07f2ef04a6641a81c7fd6b36a4ea1093",
        "uploadedAt": "2026-03-19T11:07:30Z"
    },
    {
        "id": "master 20260319 154038 [a3b026 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 154038 [a3b026 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918447/revision-arts/master%2020260319%20154038%20%5Ba3b026%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917132/revision-arts/prompt_20260319_154038_%5Ba3b026_FPS_original%5D",
        "assetId": "4c6b789e09ce8e75ec17e6d992e0a6aa",
        "uploadedAt": "2026-03-19T11:07:27Z"
    },
    {
        "id": "master 20260319 154111 [a0dbc2 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 154111 [a0dbc2 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918444/revision-arts/master%2020260319%20154111%20%5Ba0dbc2%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917132/revision-arts/prompt_20260319_154111_%5Ba0dbc2_FPS_original%5D",
        "assetId": "a27aa1b72c66c4143afe7a8f7e9bc894",
        "uploadedAt": "2026-03-19T11:07:24Z"
    },
    {
        "id": "master 20260319 154213 [8df3c7 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 154213 [8df3c7 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918437/revision-arts/master%2020260319%20154213%20%5B8df3c7%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917131/revision-arts/prompt_20260319_154213_%5B8df3c7_FPS_original%5D",
        "assetId": "62adfdf31e17c9fde21d7e7bd7997ff1",
        "uploadedAt": "2026-03-19T11:07:17Z"
    },
    {
        "id": "master 20260319 154245 [dee98e FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 154245 [dee98e FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918433/revision-arts/master%2020260319%20154245%20%5Bdee98e%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917130/revision-arts/prompt_20260319_154245_%5Bdee98e_FPS_original%5D",
        "assetId": "64fc20229b0ae187fbf3c9c6ff1a0eb8",
        "uploadedAt": "2026-03-19T11:07:13Z"
    },
    {
        "id": "master 20260319 154315 [29d2b3 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 154315 [29d2b3 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918430/revision-arts/master%2020260319%20154315%20%5B29d2b3%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917129/revision-arts/prompt_20260319_154315_%5B29d2b3_FPS_original%5D",
        "assetId": "99219be3af978a4c7318df7f97d7f7a4",
        "uploadedAt": "2026-03-19T11:07:10Z"
    },
    {
        "id": "master 20260319 154348 [62b5d1 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 154348 [62b5d1 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918426/revision-arts/master%2020260319%20154348%20%5B62b5d1%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917128/revision-arts/prompt_20260319_154348_%5B62b5d1_FPS_original%5D",
        "assetId": "16e28db3ed290971181ef818fb1c63cb",
        "uploadedAt": "2026-03-19T11:07:06Z"
    },
    {
        "id": "master 20260319 154418 [8ae998 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 154418 [8ae998 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918422/revision-arts/master%2020260319%20154418%20%5B8ae998%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917128/revision-arts/prompt_20260319_154418_%5B8ae998_FPS_original%5D",
        "assetId": "27bf77b36348c1116808f79230fefc8e",
        "uploadedAt": "2026-03-19T11:07:02Z"
    },
    {
        "id": "master 20260319 154443 [840e11 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 154443 [840e11 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918418/revision-arts/master%2020260319%20154443%20%5B840e11%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917127/revision-arts/prompt_20260319_154443_%5B840e11_FPS_original%5D",
        "assetId": "1a095d959466a27f8bff8418febd60cb",
        "uploadedAt": "2026-03-19T11:06:58Z"
    },
    {
        "id": "master 20260319 154513 [d599fd FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 154513 [d599fd FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918414/revision-arts/master%2020260319%20154513%20%5Bd599fd%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917126/revision-arts/prompt_20260319_154513_%5Bd599fd_FPS_original%5D",
        "assetId": "94dbd977b38735b85ea614278537243e",
        "uploadedAt": "2026-03-19T11:06:54Z"
    },
    {
        "id": "master 20260319 154613 [fc3ea3 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 154613 [fc3ea3 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918407/revision-arts/master%2020260319%20154613%20%5Bfc3ea3%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917123/revision-arts/prompt_20260319_154613_%5Bfc3ea3_FPS_original%5D",
        "assetId": "65208c12472fc6f9bea938b093be2fe7",
        "uploadedAt": "2026-03-19T11:06:47Z"
    },
    {
        "id": "master 20260319 154641 [05e136 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 154641 [05e136 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918404/revision-arts/master%2020260319%20154641%20%5B05e136%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917122/revision-arts/prompt_20260319_154641_%5B05e136_FPS_original%5D",
        "assetId": "3fdd66111198d6973b7d7f99da5828a9",
        "uploadedAt": "2026-03-19T11:06:44Z"
    },
    {
        "id": "master 20260319 154719 [e8bee0 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 154719 [e8bee0 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918401/revision-arts/master%2020260319%20154719%20%5Be8bee0%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917121/revision-arts/prompt_20260319_154719_%5Be8bee0_FPS_original%5D",
        "assetId": "c8d0054b83757b82a664f6b4c201201e",
        "uploadedAt": "2026-03-19T11:06:41Z"
    },
    {
        "id": "master 20260319 154756 [927253 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 154756 [927253 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918397/revision-arts/master%2020260319%20154756%20%5B927253%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917120/revision-arts/prompt_20260319_154756_%5B927253_FPS_original%5D",
        "assetId": "1b1cf7ff678ca19d17f742abaa2ce2e1",
        "uploadedAt": "2026-03-19T11:06:37Z"
    },
    {
        "id": "master 20260319 154852 [f5303e FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 154852 [f5303e FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918388/revision-arts/master%2020260319%20154852%20%5Bf5303e%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917118/revision-arts/prompt_20260319_154852_%5Bf5303e_FPS_original%5D",
        "assetId": "b9455a856b81478730095b4f51290c3c",
        "uploadedAt": "2026-03-19T11:06:28Z"
    },
    {
        "id": "master 20260319 154955 [bfc45d FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 154955 [bfc45d FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918381/revision-arts/master%2020260319%20154955%20%5Bbfc45d%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917116/revision-arts/prompt_20260319_154955_%5Bbfc45d_FPS_original%5D",
        "assetId": "75a9c9a513aa0bb224bf3766c9ee1a64",
        "uploadedAt": "2026-03-19T11:06:21Z"
    },
    {
        "id": "master 20260319 155024 [973c6f FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 155024 [973c6f FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918378/revision-arts/master%2020260319%20155024%20%5B973c6f%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917116/revision-arts/prompt_20260319_155024_%5B973c6f_FPS_original%5D",
        "assetId": "de78947258d31f737865c97c84c35501",
        "uploadedAt": "2026-03-19T11:06:18Z"
    },
    {
        "id": "master 20260319 155057 [Alfred 20Schwarzschild 225 Ritratto 20de]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 155057 [Alfred 20Schwarzschild 225 Ritratto 20de]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918374/revision-arts/master%2020260319%20155057%20%5BAlfred%2020Schwarzschild%20225%20Ritratto%2020de%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917115/revision-arts/prompt_20260319_155057_%5BAlfred_20Schwarzschild-225-Ritratto_20de%5D",
        "assetId": "e2f0a1e6521992108112879baad1f5be",
        "uploadedAt": "2026-03-19T11:06:14Z"
    },
    {
        "id": "master 20260321 221953 [09255a FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 221953 [09255a FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105306/revision-arts/master%2020260321%20221953%20%5B09255a%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104523/revision-arts/prompt_20260321_221953_%5B09255a_FPS_original%5D",
        "assetId": "a61f40f03269b85b30a2af8f61bc3f05",
        "uploadedAt": "2026-03-21T15:01:46Z"
    },
    {
        "id": "master 20260321 222001 [46d2ca FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 222001 [46d2ca FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105302/revision-arts/master%2020260321%20222001%20%5B46d2ca%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104629/revision-arts/prompt_20260321_222001_%5B46d2ca_FPS_original%5D",
        "assetId": "21ad503c64d17537890efa76c4f3f7a5",
        "uploadedAt": "2026-03-21T15:01:42Z"
    },
    {
        "id": "master 20260321 222022 [52321c FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 222022 [52321c FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105299/revision-arts/master%2020260321%20222022%20%5B52321c%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104628/revision-arts/prompt_20260321_222022_%5B52321c_FPS_original%5D",
        "assetId": "2deb741ffdb64793bdedc3a85b0dd98b",
        "uploadedAt": "2026-03-21T15:01:39Z"
    },
    {
        "id": "master 20260321 222030 [60ff31 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 222030 [60ff31 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105296/revision-arts/master%2020260321%20222030%20%5B60ff31%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104627/revision-arts/prompt_20260321_222030_%5B60ff31_FPS_original%5D",
        "assetId": "1c7fafaa27bdde5c304f1cd5b8daba88",
        "uploadedAt": "2026-03-21T15:01:36Z"
    },
    {
        "id": "master 20260321 222051 [85446e FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 222051 [85446e FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105292/revision-arts/master%2020260321%20222051%20%5B85446e%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104626/revision-arts/prompt_20260321_222051_%5B85446e_FPS_original%5D",
        "assetId": "c22ccfa4d49a8529e5d3abfc0575399d",
        "uploadedAt": "2026-03-21T15:01:32Z"
    },
    {
        "id": "master 20260321 222059 [69a78c FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 222059 [69a78c FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105289/revision-arts/master%2020260321%20222059%20%5B69a78c%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104626/revision-arts/prompt_20260321_222059_%5B69a78c_FPS_original%5D",
        "assetId": "f60d5b8a15834b8542bcf9e402b9d71a",
        "uploadedAt": "2026-03-21T15:01:29Z"
    },
    {
        "id": "master 20260321 222120 [311660 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 222120 [311660 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105281/revision-arts/master%2020260321%20222120%20%5B311660%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104624/revision-arts/prompt_20260321_222120_%5B311660_FPS_original%5D",
        "assetId": "4dd90692d348bfb2d69c09a36576db72",
        "uploadedAt": "2026-03-21T15:01:21Z"
    },
    {
        "id": "master 20260321 222132 [78fc2e FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 222132 [78fc2e FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105278/revision-arts/master%2020260321%20222132%20%5B78fc2e%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104623/revision-arts/prompt_20260321_222132_%5B78fc2e_FPS_original%5D",
        "assetId": "1df2654bf87778129ed1ebc102b54bb0",
        "uploadedAt": "2026-03-21T15:01:18Z"
    },
    {
        "id": "master 20260321 222150 [460751 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 222150 [460751 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105271/revision-arts/master%2020260321%20222150%20%5B460751%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104622/revision-arts/prompt_20260321_222150_%5B460751_FPS_original%5D",
        "assetId": "9e5f379d9fa95b267eb9dfa5df6de8d4",
        "uploadedAt": "2026-03-21T15:01:11Z"
    },
    {
        "id": "master 20260321 222215 [06d6b1 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 222215 [06d6b1 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105266/revision-arts/master%2020260321%20222215%20%5B06d6b1%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104621/revision-arts/prompt_20260321_222215_%5B06d6b1_FPS_original%5D",
        "assetId": "2d6b13060953548663231f3476fb49ea",
        "uploadedAt": "2026-03-21T15:01:06Z"
    },
    {
        "id": "master 20260321 222251 [548ec9 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 222251 [548ec9 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105259/revision-arts/master%2020260321%20222251%20%5B548ec9%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104619/revision-arts/prompt_20260321_222251_%5B548ec9_FPS_original%5D",
        "assetId": "89c151fb27c952701c4b8f04fee00a26",
        "uploadedAt": "2026-03-21T15:00:59Z"
    },
    {
        "id": "master 20260321 222436 [692b72 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 222436 [692b72 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105245/revision-arts/master%2020260321%20222436%20%5B692b72%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104617/revision-arts/prompt_20260321_222436_%5B692b72_FPS_original%5D",
        "assetId": "f4a92e4d16c920109370c56e25f4a088",
        "uploadedAt": "2026-03-21T15:00:45Z"
    },
    {
        "id": "master 20260321 222505 [536b89 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 222505 [536b89 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105241/revision-arts/master%2020260321%20222505%20%5B536b89%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104617/revision-arts/prompt_20260321_222505_%5B536b89_FPS_original%5D",
        "assetId": "1f3e6772b88377f3cc17cc4dcc3dfbd1",
        "uploadedAt": "2026-03-21T15:00:41Z"
    },
    {
        "id": "master 20260321 222537 [69a1c7 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 222537 [69a1c7 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105238/revision-arts/master%2020260321%20222537%20%5B69a1c7%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104616/revision-arts/prompt_20260321_222537_%5B69a1c7_FPS_original%5D",
        "assetId": "3894d411e37f51e6f8fb46cff3aecea5",
        "uploadedAt": "2026-03-21T15:00:38Z"
    },
    {
        "id": "master 20260321 222737 [4923d7 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 222737 [4923d7 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105227/revision-arts/master%2020260321%20222737%20%5B4923d7%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104613/revision-arts/prompt_20260321_222737_%5B4923d7_FPS_original%5D",
        "assetId": "923d7190c60bd62a8de62f7c182e5c50",
        "uploadedAt": "2026-03-21T15:00:27Z"
    },
    {
        "id": "master 20260321 222806 [04adb4 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 222806 [04adb4 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105224/revision-arts/master%2020260321%20222806%20%5B04adb4%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104613/revision-arts/prompt_20260321_222806_%5B04adb4_FPS_original%5D",
        "assetId": "61a2a2444daeb13eed388011401fe9c8",
        "uploadedAt": "2026-03-21T15:00:24Z"
    },
    {
        "id": "master 20260321 222840 [5f0c50 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 222840 [5f0c50 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105213/revision-arts/master%2020260321%20222840%20%5B5f0c50%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104612/revision-arts/prompt_20260321_222840_%5B5f0c50_FPS_original%5D",
        "assetId": "0351de421b95fa664f1fcb03da9dc664",
        "uploadedAt": "2026-03-21T15:00:13Z"
    },
    {
        "id": "master 20260321 222911 [2058e55627887d327646a119dc4db931 FPS ori]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 222911 [2058e55627887d327646a119dc4db931 FPS ori]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105209/revision-arts/master%2020260321%20222911%20%5B2058e55627887d327646a119dc4db931%20FPS%20ori%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104611/revision-arts/prompt_20260321_222911_%5B2058e55627887d327646a119dc4db931_FPS_ori%5D",
        "assetId": "f0c2f8328b543eee17bed2fd03a34263",
        "uploadedAt": "2026-03-21T15:00:09Z"
    },
    {
        "id": "master 20260321 222924 [efbc07 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 222924 [efbc07 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105206/revision-arts/master%2020260321%20222924%20%5Befbc07%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104611/revision-arts/prompt_20260321_222924_%5Befbc07_FPS_original%5D",
        "assetId": "592d82c6370fe3be0a2016e3aedb075f",
        "uploadedAt": "2026-03-21T15:00:06Z"
    },
    {
        "id": "master 20260321 222956 [21e85d FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 222956 [21e85d FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105199/revision-arts/master%2020260321%20222956%20%5B21e85d%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104609/revision-arts/prompt_20260321_222956_%5B21e85d_FPS_original%5D",
        "assetId": "d44b12679e58409708c09403f15801b0",
        "uploadedAt": "2026-03-21T14:59:59Z"
    },
    {
        "id": "master 20260321 223009 [9088c5 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223009 [9088c5 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105195/revision-arts/master%2020260321%20223009%20%5B9088c5%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104607/revision-arts/prompt_20260321_223009_%5B9088c5_FPS_original%5D",
        "assetId": "5f8adaa453fd9f319d2ded49605a93d3",
        "uploadedAt": "2026-03-21T14:59:55Z"
    },
    {
        "id": "master 20260321 223028 [7c2417 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223028 [7c2417 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105192/revision-arts/master%2020260321%20223028%20%5B7c2417%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104605/revision-arts/prompt_20260321_223028_%5B7c2417_FPS_original%5D",
        "assetId": "7c39c71c85e58830f4fec74f60767277",
        "uploadedAt": "2026-03-21T14:59:52Z"
    },
    {
        "id": "master 20260321 223034 [9d107c FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223034 [9d107c FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105189/revision-arts/master%2020260321%20223034%20%5B9d107c%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104605/revision-arts/prompt_20260321_223034_%5B9d107c_FPS_original%5D",
        "assetId": "4464985f725baee6d87e72a8df2ea5c6",
        "uploadedAt": "2026-03-21T14:59:49Z"
    },
    {
        "id": "master 20260321 223100 [c1b001 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223100 [c1b001 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105186/revision-arts/master%2020260321%20223100%20%5Bc1b001%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104604/revision-arts/prompt_20260321_223100_%5Bc1b001_FPS_original%5D",
        "assetId": "d8d777467f4ef779a59680187c1bc764",
        "uploadedAt": "2026-03-21T14:59:46Z"
    },
    {
        "id": "master 20260321 223101 [35fcdc FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223101 [35fcdc FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105183/revision-arts/master%2020260321%20223101%20%5B35fcdc%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104603/revision-arts/prompt_20260321_223101_%5B35fcdc_FPS_original%5D",
        "assetId": "b4eb9404080d351585fe87a0cf00df5f",
        "uploadedAt": "2026-03-21T14:59:43Z"
    },
    {
        "id": "master 20260321 223134 [d50615 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223134 [d50615 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105176/revision-arts/master%2020260321%20223134%20%5Bd50615%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104602/revision-arts/prompt_20260321_223134_%5Bd50615_FPS_original%5D",
        "assetId": "f7f824f00a7be4f9d67d1ae0e47b1de6",
        "uploadedAt": "2026-03-21T14:59:36Z"
    },
    {
        "id": "master 20260321 223159 [0ae44e FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223159 [0ae44e FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105173/revision-arts/master%2020260321%20223159%20%5B0ae44e%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104601/revision-arts/prompt_20260321_223159_%5B0ae44e_FPS_original%5D",
        "assetId": "e65dbc28f6327e7d472f29ff9a8e93f3",
        "uploadedAt": "2026-03-21T14:59:33Z"
    },
    {
        "id": "master 20260321 223304 [b966b9 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223304 [b966b9 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105161/revision-arts/master%2020260321%20223304%20%5Bb966b9%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104598/revision-arts/prompt_20260321_223304_%5Bb966b9_FPS_original%5D",
        "assetId": "5abb66ed48dc47875980ea23b8f2fba0",
        "uploadedAt": "2026-03-21T14:59:21Z"
    },
    {
        "id": "master 20260321 223336 [4f9779 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223336 [4f9779 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105153/revision-arts/master%2020260321%20223336%20%5B4f9779%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104597/revision-arts/prompt_20260321_223336_%5B4f9779_FPS_original%5D",
        "assetId": "15c7fb4d3c1fb202d78f6dec3983f768",
        "uploadedAt": "2026-03-21T14:59:13Z"
    },
    {
        "id": "master 20260321 223339 [4aaa42 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223339 [4aaa42 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105150/revision-arts/master%2020260321%20223339%20%5B4aaa42%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104596/revision-arts/prompt_20260321_223339_%5B4aaa42_FPS_original%5D",
        "assetId": "02c41aa045a67dd0cfc37a48aa2cb1ee",
        "uploadedAt": "2026-03-21T14:59:10Z"
    },
    {
        "id": "master 20260321 223406 [82cc92 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223406 [82cc92 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105147/revision-arts/master%2020260321%20223406%20%5B82cc92%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104595/revision-arts/prompt_20260321_223406_%5B82cc92_FPS_original%5D",
        "assetId": "8be760b60aa7cb8d747c14e7f9445a47",
        "uploadedAt": "2026-03-21T14:59:07Z"
    },
    {
        "id": "master 20260321 223408 [9d63a3 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223408 [9d63a3 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105144/revision-arts/master%2020260321%20223408%20%5B9d63a3%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104594/revision-arts/prompt_20260321_223408_%5B9d63a3_FPS_original%5D",
        "assetId": "0790aeb80520a50449987b624f1c8242",
        "uploadedAt": "2026-03-21T14:59:04Z"
    },
    {
        "id": "master 20260321 223437 [722a52 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223437 [722a52 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105138/revision-arts/master%2020260321%20223437%20%5B722a52%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104593/revision-arts/prompt_20260321_223437_%5B722a52_FPS_original%5D",
        "assetId": "6f65e6c06c525ed55ff5e332e44c73cf",
        "uploadedAt": "2026-03-21T14:58:58Z"
    },
    {
        "id": "master 20260321 223437 [840802 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223437 [840802 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105141/revision-arts/master%2020260321%20223437%20%5B840802%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104594/revision-arts/prompt_20260321_223437_%5B840802_FPS_original%5D",
        "assetId": "af657341f79da3926301cf7002f2d6b2",
        "uploadedAt": "2026-03-21T14:59:01Z"
    },
    {
        "id": "master 20260321 223451 [662318 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223451 [662318 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105134/revision-arts/master%2020260321%20223451%20%5B662318%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104592/revision-arts/prompt_20260321_223451_%5B662318_FPS_original%5D",
        "assetId": "a3ab0db7d2845df6a80216a65bb1a17e",
        "uploadedAt": "2026-03-21T14:58:54Z"
    },
    {
        "id": "master 20260321 223509 [9cc2d9 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223509 [9cc2d9 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105128/revision-arts/master%2020260321%20223509%20%5B9cc2d9%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104591/revision-arts/prompt_20260321_223509_%5B9cc2d9_FPS_original%5D",
        "assetId": "c8fdc8b984c0a8d89bf37684715172c2",
        "uploadedAt": "2026-03-21T14:58:48Z"
    },
    {
        "id": "master 20260321 223521 [829490 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223521 [829490 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105124/revision-arts/master%2020260321%20223521%20%5B829490%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104590/revision-arts/prompt_20260321_223521_%5B829490_FPS_original%5D",
        "assetId": "eca52d0e6440f19184791631fbedf7b6",
        "uploadedAt": "2026-03-21T14:58:44Z"
    },
    {
        "id": "master 20260321 223539 [fb1856 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223539 [fb1856 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105120/revision-arts/master%2020260321%20223539%20%5Bfb1856%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104589/revision-arts/prompt_20260321_223539_%5Bfb1856_FPS_original%5D",
        "assetId": "35fcde48e28b3cb0305e38d162ee41be",
        "uploadedAt": "2026-03-21T14:58:40Z"
    },
    {
        "id": "master 20260321 223553 [128483 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223553 [128483 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105113/revision-arts/master%2020260321%20223553%20%5B128483%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104588/revision-arts/prompt_20260321_223553_%5B128483_FPS_original%5D",
        "assetId": "3598a175f53922fd250406b6f8afeafd",
        "uploadedAt": "2026-03-21T14:58:33Z"
    },
    {
        "id": "master 20260321 223610 [796f61 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223610 [796f61 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105110/revision-arts/master%2020260321%20223610%20%5B796f61%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104587/revision-arts/prompt_20260321_223610_%5B796f61_FPS_original%5D",
        "assetId": "ca9d34034b39cad920e2c8295c3927a4",
        "uploadedAt": "2026-03-21T14:58:30Z"
    },
    {
        "id": "master 20260321 223616 [409ccc FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223616 [409ccc FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105107/revision-arts/master%2020260321%20223616%20%5B409ccc%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104587/revision-arts/prompt_20260321_223616_%5B409ccc_FPS_original%5D",
        "assetId": "5f588853bcc61c461c94ac6af0ec41eb",
        "uploadedAt": "2026-03-21T14:58:27Z"
    },
    {
        "id": "master 20260321 223626 [358997 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223626 [358997 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105104/revision-arts/master%2020260321%20223626%20%5B358997%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104586/revision-arts/prompt_20260321_223626_%5B358997_FPS_original%5D",
        "assetId": "134f2c25493a64e0bf2fdf5e9335a610",
        "uploadedAt": "2026-03-21T14:58:24Z"
    },
    {
        "id": "master 20260321 223642 [5bc2e4 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223642 [5bc2e4 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105101/revision-arts/master%2020260321%20223642%20%5B5bc2e4%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104585/revision-arts/prompt_20260321_223642_%5B5bc2e4_FPS_original%5D",
        "assetId": "ef84c78e2fd61d9a7e7f5f89c6df8106",
        "uploadedAt": "2026-03-21T14:58:21Z"
    },
    {
        "id": "master 20260321 223656 [395751 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223656 [395751 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105094/revision-arts/master%2020260321%20223656%20%5B395751%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104584/revision-arts/prompt_20260321_223656_%5B395751_FPS_original%5D",
        "assetId": "1b770fb7f501e43595a0bb33f561adac",
        "uploadedAt": "2026-03-21T14:58:14Z"
    },
    {
        "id": "master 20260321 223710 [398be4 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223710 [398be4 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105088/revision-arts/master%2020260321%20223710%20%5B398be4%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104582/revision-arts/prompt_20260321_223710_%5B398be4_FPS_original%5D",
        "assetId": "7b838cc9a5d5f115c0579c0fe1985b05",
        "uploadedAt": "2026-03-21T14:58:08Z"
    },
    {
        "id": "master 20260321 223711 [95d160 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223711 [95d160 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105091/revision-arts/master%2020260321%20223711%20%5B95d160%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104583/revision-arts/prompt_20260321_223711_%5B95d160_FPS_original%5D",
        "assetId": "747cc1174f6fd5d24dcc384e73a2f672",
        "uploadedAt": "2026-03-21T14:58:11Z"
    },
    {
        "id": "master 20260321 223728 [421218 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223728 [421218 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105085/revision-arts/master%2020260321%20223728%20%5B421218%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104582/revision-arts/prompt_20260321_223728_%5B421218_FPS_original%5D",
        "assetId": "d53b06575a97c25bbcd97d2311191d52",
        "uploadedAt": "2026-03-21T14:58:05Z"
    },
    {
        "id": "master 20260321 223740 [5b7817 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223740 [5b7817 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105081/revision-arts/master%2020260321%20223740%20%5B5b7817%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104581/revision-arts/prompt_20260321_223740_%5B5b7817_FPS_original%5D",
        "assetId": "587235adfbfdfa051f17ce9222bc996d",
        "uploadedAt": "2026-03-21T14:58:01Z"
    },
    {
        "id": "master 20260321 223807 [646d27 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223807 [646d27 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105070/revision-arts/master%2020260321%20223807%20%5B646d27%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104578/revision-arts/prompt_20260321_223807_%5B646d27_FPS_original%5D",
        "assetId": "3df60af3c4be12a52b68c60bb2657da9",
        "uploadedAt": "2026-03-21T14:57:50Z"
    },
    {
        "id": "master 20260321 223811 [d2a820 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223811 [d2a820 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105046/revision-arts/master%2020260321%20223811%20%5Bd2a820%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104578/revision-arts/prompt_20260321_223811_%5Bd2a820_FPS_original%5D",
        "assetId": "e8d608c05a257721ffb112e22019d345",
        "uploadedAt": "2026-03-21T14:57:26Z"
    },
    {
        "id": "master 20260321 223828 [467387 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223828 [467387 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105015/revision-arts/master%2020260321%20223828%20%5B467387%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104577/revision-arts/prompt_20260321_223828_%5B467387_FPS_original%5D",
        "assetId": "01d48d8829eee7da4f511f8f3d7ca281",
        "uploadedAt": "2026-03-21T14:56:55Z"
    },
    {
        "id": "master 20260321 223836 [ccc7c6 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223836 [ccc7c6 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104991/revision-arts/master%2020260321%20223836%20%5Bccc7c6%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104576/revision-arts/prompt_20260321_223836_%5Bccc7c6_FPS_original%5D",
        "assetId": "76f7e48c91ced06ef15c8bd22937e20d",
        "uploadedAt": "2026-03-21T14:56:31Z"
    },
    {
        "id": "master 20260321 223900 [530465 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223900 [530465 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104983/revision-arts/master%2020260321%20223900%20%5B530465%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104573/revision-arts/prompt_20260321_223900_%5B530465_FPS_original%5D",
        "assetId": "4f4afe86d1b6733ab301d87cc6bc5ef8",
        "uploadedAt": "2026-03-21T14:56:23Z"
    },
    {
        "id": "master 20260321 223910 [d778da FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223910 [d778da FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104979/revision-arts/master%2020260321%20223910%20%5Bd778da%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104572/revision-arts/prompt_20260321_223910_%5Bd778da_FPS_original%5D",
        "assetId": "e915990b98c413ac8a6a016b7ddef8a7",
        "uploadedAt": "2026-03-21T14:56:19Z"
    },
    {
        "id": "master 20260321 223931 [671716 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223931 [671716 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104976/revision-arts/master%2020260321%20223931%20%5B671716%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104571/revision-arts/prompt_20260321_223931_%5B671716_FPS_original%5D",
        "assetId": "7b1e1d23bc636cd00e835e91752fee8f",
        "uploadedAt": "2026-03-21T14:56:16Z"
    },
    {
        "id": "master 20260321 223941 [5cfc8c FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223941 [5cfc8c FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104973/revision-arts/master%2020260321%20223941%20%5B5cfc8c%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104570/revision-arts/prompt_20260321_223941_%5B5cfc8c_FPS_original%5D",
        "assetId": "39f1f5f494cb218634ea7b074ffc9573",
        "uploadedAt": "2026-03-21T14:56:13Z"
    },
    {
        "id": "master 20260321 223959 [941346 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223959 [941346 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104970/revision-arts/master%2020260321%20223959%20%5B941346%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104568/revision-arts/prompt_20260321_223959_%5B941346_FPS_original%5D",
        "assetId": "e7533f4d9a1c56d96dc2950b9b80fe1f",
        "uploadedAt": "2026-03-21T14:56:10Z"
    },
    {
        "id": "master 20260321 224012 [c7ad0b FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 224012 [c7ad0b FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104967/revision-arts/master%2020260321%20224012%20%5Bc7ad0b%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104568/revision-arts/prompt_20260321_224012_%5Bc7ad0b_FPS_original%5D",
        "assetId": "7c0cd6d6ddb5d29409a76c2c2a034607",
        "uploadedAt": "2026-03-21T14:56:07Z"
    },
    {
        "id": "master 20260321 224033 [989211 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 224033 [989211 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104964/revision-arts/master%2020260321%20224033%20%5B989211%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104567/revision-arts/prompt_20260321_224033_%5B989211_FPS_original%5D",
        "assetId": "2f5dcbb66dbf8f22ad02e22caac05450",
        "uploadedAt": "2026-03-21T14:56:04Z"
    },
    {
        "id": "master 20260321 224047 [57b2d2 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 224047 [57b2d2 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104961/revision-arts/master%2020260321%20224047%20%5B57b2d2%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104566/revision-arts/prompt_20260321_224047_%5B57b2d2_FPS_original%5D",
        "assetId": "93e30a89385ed1d8e38e942c6eea9a85",
        "uploadedAt": "2026-03-21T14:56:01Z"
    },
    {
        "id": "master 20260321 224104 [a0cf36 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 224104 [a0cf36 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104957/revision-arts/master%2020260321%20224104%20%5Ba0cf36%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104565/revision-arts/prompt_20260321_224104_%5Ba0cf36_FPS_original%5D",
        "assetId": "af9bef2fcd4144c5731a61014e597b57",
        "uploadedAt": "2026-03-21T14:55:57Z"
    },
    {
        "id": "master 20260321 224121 [583d70 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 224121 [583d70 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104954/revision-arts/master%2020260321%20224121%20%5B583d70%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104564/revision-arts/prompt_20260321_224121_%5B583d70_FPS_original%5D",
        "assetId": "2b82244a534b4d0197264954bd2d9010",
        "uploadedAt": "2026-03-21T14:55:54Z"
    },
    {
        "id": "master 20260321 224138 [a2f3ee FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 224138 [a2f3ee FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104951/revision-arts/master%2020260321%20224138%20%5Ba2f3ee%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104564/revision-arts/prompt_20260321_224138_%5Ba2f3ee_FPS_original%5D",
        "assetId": "4d8cda853e83b56c73e6386d2cefdd96",
        "uploadedAt": "2026-03-21T14:55:51Z"
    },
    {
        "id": "master 20260321 224208 [a3af38 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 224208 [a3af38 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104944/revision-arts/master%2020260321%20224208%20%5Ba3af38%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104562/revision-arts/prompt_20260321_224208_%5Ba3af38_FPS_original%5D",
        "assetId": "c4d1e3c6336887d1968910e83ce332ee",
        "uploadedAt": "2026-03-21T14:55:44Z"
    },
    {
        "id": "master 20260321 224235 [abe6b1 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 224235 [abe6b1 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104938/revision-arts/master%2020260321%20224235%20%5Babe6b1%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104560/revision-arts/prompt_20260321_224235_%5Babe6b1_FPS_original%5D",
        "assetId": "4004ac42d04a723fe1e0596fa4352a2d",
        "uploadedAt": "2026-03-21T14:55:38Z"
    },
    {
        "id": "master 20260321 224253 [246870 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 224253 [246870 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104935/revision-arts/master%2020260321%20224253%20%5B246870%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104560/revision-arts/prompt_20260321_224253_%5B246870_FPS_original%5D",
        "assetId": "fe180d06f80e82df2a1394df3bcaa557",
        "uploadedAt": "2026-03-21T14:55:35Z"
    },
    {
        "id": "master 20260321 224324 [7f47ad FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 224324 [7f47ad FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104931/revision-arts/master%2020260321%20224324%20%5B7f47ad%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104559/revision-arts/prompt_20260321_224324_%5B7f47ad_FPS_original%5D",
        "assetId": "69b5c409db7d6315ee359e23c4eb0e77",
        "uploadedAt": "2026-03-21T14:55:31Z"
    },
    {
        "id": "master 20260321 224350 [d25331 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 224350 [d25331 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104925/revision-arts/master%2020260321%20224350%20%5Bd25331%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104558/revision-arts/prompt_20260321_224350_%5Bd25331_FPS_original%5D",
        "assetId": "7e4500d3604ebac1eee1fc92ee077dca",
        "uploadedAt": "2026-03-21T14:55:25Z"
    },
    {
        "id": "master 20260321 224422 [ba052e FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 224422 [ba052e FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104921/revision-arts/master%2020260321%20224422%20%5Bba052e%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104557/revision-arts/prompt_20260321_224422_%5Bba052e_FPS_original%5D",
        "assetId": "e8b7762b58c05627ac3b36212f0cbb0e",
        "uploadedAt": "2026-03-21T14:55:21Z"
    },
    {
        "id": "master 20260321 224443 [ae9af8 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 224443 [ae9af8 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104918/revision-arts/master%2020260321%20224443%20%5Bae9af8%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104557/revision-arts/prompt_20260321_224443_%5Bae9af8_FPS_original%5D",
        "assetId": "de06cca6a93748572f8a787809a9e49a",
        "uploadedAt": "2026-03-21T14:55:18Z"
    },
    {
        "id": "master 20260321 224454 [ac7e37 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 224454 [ac7e37 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104913/revision-arts/master%2020260321%20224454%20%5Bac7e37%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104556/revision-arts/prompt_20260321_224454_%5Bac7e37_FPS_original%5D",
        "assetId": "b4e06e3389cde77e4119748cf09132d7",
        "uploadedAt": "2026-03-21T14:55:13Z"
    },
    {
        "id": "master 20260321 224512 [afbfb9 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 224512 [afbfb9 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104908/revision-arts/master%2020260321%20224512%20%5Bafbfb9%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104555/revision-arts/prompt_20260321_224512_%5Bafbfb9_FPS_original%5D",
        "assetId": "9acf8b4cd6c901d31ba940877522beec",
        "uploadedAt": "2026-03-21T14:55:08Z"
    },
    {
        "id": "master 20260321 224524 [df5d45 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 224524 [df5d45 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104904/revision-arts/master%2020260321%20224524%20%5Bdf5d45%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104554/revision-arts/prompt_20260321_224524_%5Bdf5d45_FPS_original%5D",
        "assetId": "1cceb6565ee8c9b582b02fd7fe2915f1",
        "uploadedAt": "2026-03-21T14:55:04Z"
    },
    {
        "id": "master 20260321 224541 [b7b4cd FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 224541 [b7b4cd FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104900/revision-arts/master%2020260321%20224541%20%5Bb7b4cd%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104553/revision-arts/prompt_20260321_224541_%5Bb7b4cd_FPS_original%5D",
        "assetId": "eddde18427474d7d0ca4cc8785d64622",
        "uploadedAt": "2026-03-21T14:55:00Z"
    },
    {
        "id": "master 20260321 224555 [178539 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 224555 [178539 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104897/revision-arts/master%2020260321%20224555%20%5B178539%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104552/revision-arts/prompt_20260321_224555_%5B178539_FPS_original%5D",
        "assetId": "a59b83862ebdf576c56d53f20eb42653",
        "uploadedAt": "2026-03-21T14:54:57Z"
    },
    {
        "id": "master 20260321 224614 [b9d8cf FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 224614 [b9d8cf FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104894/revision-arts/master%2020260321%20224614%20%5Bb9d8cf%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104552/revision-arts/prompt_20260321_224614_%5Bb9d8cf_FPS_original%5D",
        "assetId": "2c9e3f2aa30729738b139dd72ef2107a",
        "uploadedAt": "2026-03-21T14:54:54Z"
    },
    {
        "id": "master 20260321 224629 [ed30ce FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 224629 [ed30ce FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104890/revision-arts/master%2020260321%20224629%20%5Bed30ce%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104551/revision-arts/prompt_20260321_224629_%5Bed30ce_FPS_original%5D",
        "assetId": "d31348a4e45c3ea10052bca9c3835f02",
        "uploadedAt": "2026-03-21T14:54:50Z"
    },
    {
        "id": "master 20260321 224701 [39d207 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 224701 [39d207 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104883/revision-arts/master%2020260321%20224701%20%5B39d207%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104549/revision-arts/prompt_20260321_224701_%5B39d207_FPS_original%5D",
        "assetId": "a02b7036cfa8bc9596659a89e04e7f85",
        "uploadedAt": "2026-03-21T14:54:43Z"
    },
    {
        "id": "master 20260321 224718 [bb13f6 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 224718 [bb13f6 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104880/revision-arts/master%2020260321%20224718%20%5Bbb13f6%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104548/revision-arts/prompt_20260321_224718_%5Bbb13f6_FPS_original%5D",
        "assetId": "5bcd138807d33cf6d8fc2e2870e88266",
        "uploadedAt": "2026-03-21T14:54:40Z"
    },
    {
        "id": "master 20260321 224729 [4f6171 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 224729 [4f6171 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104877/revision-arts/master%2020260321%20224729%20%5B4f6171%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104548/revision-arts/prompt_20260321_224729_%5B4f6171_FPS_original%5D",
        "assetId": "2876967c0afeb6a1faacf71a404af548",
        "uploadedAt": "2026-03-21T14:54:37Z"
    },
    {
        "id": "master 20260321 224747 [bebd95 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 224747 [bebd95 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104873/revision-arts/master%2020260321%20224747%20%5Bbebd95%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104547/revision-arts/prompt_20260321_224747_%5Bbebd95_FPS_original%5D",
        "assetId": "f53bdaf196da7b7ac32705a54fc2a84a",
        "uploadedAt": "2026-03-21T14:54:33Z"
    },
    {
        "id": "master 20260321 224824 [c49c75 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 224824 [c49c75 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104867/revision-arts/master%2020260321%20224824%20%5Bc49c75%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104545/revision-arts/prompt_20260321_224824_%5Bc49c75_FPS_original%5D",
        "assetId": "30724f9a3bb8695517436d77fbb179bf",
        "uploadedAt": "2026-03-21T14:54:27Z"
    },
    {
        "id": "master 20260321 224836 [a75b1c FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 224836 [a75b1c FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104863/revision-arts/master%2020260321%20224836%20%5Ba75b1c%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104545/revision-arts/prompt_20260321_224836_%5Ba75b1c_FPS_original%5D",
        "assetId": "c67802ff3afd2192987fa287cfebde48",
        "uploadedAt": "2026-03-21T14:54:23Z"
    },
    {
        "id": "master 20260321 224857 [c98ffb FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 224857 [c98ffb FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104860/revision-arts/master%2020260321%20224857%20%5Bc98ffb%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104544/revision-arts/prompt_20260321_224857_%5Bc98ffb_FPS_original%5D",
        "assetId": "748e140078c0471bae5d3715d947a32b",
        "uploadedAt": "2026-03-21T14:54:20Z"
    },
    {
        "id": "master 20260321 224912 [ecc51e FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 224912 [ecc51e FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104857/revision-arts/master%2020260321%20224912%20%5Becc51e%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104543/revision-arts/prompt_20260321_224912_%5Becc51e_FPS_original%5D",
        "assetId": "fc52c09f466d00c2d41e525197a9828b",
        "uploadedAt": "2026-03-21T14:54:17Z"
    },
    {
        "id": "master 20260321 224927 [c522e9 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 224927 [c522e9 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104853/revision-arts/master%2020260321%20224927%20%5Bc522e9%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104542/revision-arts/prompt_20260321_224927_%5Bc522e9_FPS_original%5D",
        "assetId": "4a8c336928f8b45e841d756de1862831",
        "uploadedAt": "2026-03-21T14:54:13Z"
    },
    {
        "id": "master 20260321 224943 [2d1b72 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 224943 [2d1b72 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104849/revision-arts/master%2020260321%20224943%20%5B2d1b72%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104541/revision-arts/prompt_20260321_224943_%5B2d1b72_FPS_original%5D",
        "assetId": "9273648be77e84718267a7b9a83a2ac9",
        "uploadedAt": "2026-03-21T14:54:09Z"
    },
    {
        "id": "master 20260321 224959 [d8f504 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 224959 [d8f504 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104845/revision-arts/master%2020260321%20224959%20%5Bd8f504%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104540/revision-arts/prompt_20260321_224959_%5Bd8f504_FPS_original%5D",
        "assetId": "58472e36ba0f61776599ed71819ca6bd",
        "uploadedAt": "2026-03-21T14:54:05Z"
    },
    {
        "id": "master 20260321 225013 [9005ac FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 225013 [9005ac FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104840/revision-arts/master%2020260321%20225013%20%5B9005ac%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104539/revision-arts/prompt_20260321_225013_%5B9005ac_FPS_original%5D",
        "assetId": "74ce6928556a7262bc551d724451216c",
        "uploadedAt": "2026-03-21T14:54:00Z"
    },
    {
        "id": "master 20260321 225037 [d9b613 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 225037 [d9b613 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104834/revision-arts/master%2020260321%20225037%20%5Bd9b613%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104539/revision-arts/prompt_20260321_225037_%5Bd9b613_FPS_original%5D",
        "assetId": "cd105d9724446bee09eb80991684ecb9",
        "uploadedAt": "2026-03-21T14:53:54Z"
    },
    {
        "id": "master 20260321 225108 [d55c5c FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 225108 [d55c5c FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104820/revision-arts/master%2020260321%20225108%20%5Bd55c5c%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104537/revision-arts/prompt_20260321_225108_%5Bd55c5c_FPS_original%5D",
        "assetId": "e20395732a799ef1198a1400ad022bd7",
        "uploadedAt": "2026-03-21T14:53:40Z"
    },
    {
        "id": "master 20260321 225116 [efca46 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 225116 [efca46 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104815/revision-arts/master%2020260321%20225116%20%5Befca46%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104537/revision-arts/prompt_20260321_225116_%5Befca46_FPS_original%5D",
        "assetId": "142c2f7aad1e12c3b9bce8a3c599e50b",
        "uploadedAt": "2026-03-21T14:53:35Z"
    },
    {
        "id": "master 20260321 225135 [d65ef4 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 225135 [d65ef4 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104809/revision-arts/master%2020260321%20225135%20%5Bd65ef4%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104536/revision-arts/prompt_20260321_225135_%5Bd65ef4_FPS_original%5D",
        "assetId": "cfa01c5ffbd29f7fa9e455f842daf911",
        "uploadedAt": "2026-03-21T14:53:29Z"
    },
    {
        "id": "master 20260321 225148 [3b0de7 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 225148 [3b0de7 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104803/revision-arts/master%2020260321%20225148%20%5B3b0de7%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104535/revision-arts/prompt_20260321_225148_%5B3b0de7_FPS_original%5D",
        "assetId": "cb4ceff5f01bfe6355effe5ce5779e80",
        "uploadedAt": "2026-03-21T14:53:23Z"
    },
    {
        "id": "master 20260321 225217 [d50008 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 225217 [d50008 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104798/revision-arts/master%2020260321%20225217%20%5Bd50008%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104535/revision-arts/prompt_20260321_225217_%5Bd50008_FPS_original%5D",
        "assetId": "ad21aa9f24f19f42928964369fe00575",
        "uploadedAt": "2026-03-21T14:53:18Z"
    },
    {
        "id": "master 20260321 225250 [e1f6dd FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 225250 [e1f6dd FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104786/revision-arts/master%2020260321%20225250%20%5Be1f6dd%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104531/revision-arts/prompt_20260321_225250_%5Be1f6dd_FPS_original%5D",
        "assetId": "ef63092650c1a1a854c00a00006df4a4",
        "uploadedAt": "2026-03-21T14:53:06Z"
    },
    {
        "id": "master 20260321 225323 [e3c533 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 225323 [e3c533 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104776/revision-arts/master%2020260321%20225323%20%5Be3c533%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104529/revision-arts/prompt_20260321_225323_%5Be3c533_FPS_original%5D",
        "assetId": "908497ac2e044e5797b45a0bb4143cc0",
        "uploadedAt": "2026-03-21T14:52:56Z"
    },
    {
        "id": "master 20260321 225331 [ef451e FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 225331 [ef451e FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104762/revision-arts/master%2020260321%20225331%20%5Bef451e%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104528/revision-arts/prompt_20260321_225331_%5Bef451e_FPS_original%5D",
        "assetId": "16b1a909036f288558151e3c76938559",
        "uploadedAt": "2026-03-21T14:52:42Z"
    },
    {
        "id": "master 20260321 225355 [e186cb FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 225355 [e186cb FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104758/revision-arts/master%2020260321%20225355%20%5Be186cb%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104527/revision-arts/prompt_20260321_225355_%5Be186cb_FPS_original%5D",
        "assetId": "06c7e6fecd9e514e2eb801b8adff8650",
        "uploadedAt": "2026-03-21T14:52:38Z"
    },
    {
        "id": "master 20260321 225407 [79b186 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 225407 [79b186 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104755/revision-arts/master%2020260321%20225407%20%5B79b186%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104526/revision-arts/prompt_20260321_225407_%5B79b186_FPS_original%5D",
        "assetId": "a072163448206f88594fb2e0dcac9308",
        "uploadedAt": "2026-03-21T14:52:35Z"
    },
    {
        "id": "master 20260321 225427 [ea7cdb FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 225427 [ea7cdb FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104752/revision-arts/master%2020260321%20225427%20%5Bea7cdb%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104525/revision-arts/prompt_20260321_225427_%5Bea7cdb_FPS_original%5D",
        "assetId": "1cb1ecbd6497ed28688d5b60de511ee9",
        "uploadedAt": "2026-03-21T14:52:32Z"
    },
    {
        "id": "master 20260321 225440 [4258c1 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 225440 [4258c1 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104749/revision-arts/master%2020260321%20225440%20%5B4258c1%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104525/revision-arts/prompt_20260321_225440_%5B4258c1_FPS_original%5D",
        "assetId": "cd77341edf1e8d927cdb8ec7b3d94c02",
        "uploadedAt": "2026-03-21T14:52:29Z"
    },
    {
        "id": "master 20260321 225455 [ebaa08 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 225455 [ebaa08 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104746/revision-arts/master%2020260321%20225455%20%5Bebaa08%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104485/revision-arts/prompt_20260321_225455_%5Bebaa08_FPS_original%5D",
        "assetId": "974d9ed905275a7891c2b9d83d06084c",
        "uploadedAt": "2026-03-21T14:52:26Z"
    },
    {
        "id": "master 20260321 225508 [7ce02b FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 225508 [7ce02b FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104742/revision-arts/master%2020260321%20225508%20%5B7ce02b%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104488/revision-arts/prompt_20260321_225508_%5B7ce02b_FPS_original%5D",
        "assetId": "d4ef5c631cab3d467dc77bada4581cea",
        "uploadedAt": "2026-03-21T14:52:22Z"
    },
    {
        "id": "master 20260321 225525 [ecff19 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 225525 [ecff19 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104739/revision-arts/master%2020260321%20225525%20%5Becff19%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104488/revision-arts/prompt_20260321_225525_%5Becff19_FPS_original%5D",
        "assetId": "6c013ee89fd9b3a43a90ece3fb54f7cb",
        "uploadedAt": "2026-03-21T14:52:19Z"
    },
    {
        "id": "master 20260321 225539 [e0e191 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 225539 [e0e191 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104736/revision-arts/master%2020260321%20225539%20%5Be0e191%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104487/revision-arts/prompt_20260321_225539_%5Be0e191_FPS_original%5D",
        "assetId": "a73860787d0aa14c904fcab350fed141",
        "uploadedAt": "2026-03-21T14:52:16Z"
    },
    {
        "id": "master 20260321 225555 [eed59c FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 225555 [eed59c FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104732/revision-arts/master%2020260321%20225555%20%5Beed59c%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104486/revision-arts/prompt_20260321_225555_%5Beed59c_FPS_original%5D",
        "assetId": "1a39e9ca2062385b736a7446a4bc983f",
        "uploadedAt": "2026-03-21T14:52:12Z"
    },
    {
        "id": "master 20260321 225629 [ef3577 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 225629 [ef3577 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104728/revision-arts/master%2020260321%20225629%20%5Bef3577%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104474/revision-arts/prompt_20260321_225629_%5Bef3577_FPS_original%5D",
        "assetId": "2db6ee822968a7b8fb341e7df0b90f97",
        "uploadedAt": "2026-03-21T14:52:08Z"
    },
    {
        "id": "master 20260321 225700 [f0a783 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 225700 [f0a783 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104725/revision-arts/master%2020260321%20225700%20%5Bf0a783%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104477/revision-arts/prompt_20260321_225700_%5Bf0a783_FPS_original%5D",
        "assetId": "f90b74b199e73d83b47975cec3312c4a",
        "uploadedAt": "2026-03-21T14:52:05Z"
    },
    {
        "id": "master 20260321 225724 [f0ea6a FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 225724 [f0ea6a FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104722/revision-arts/master%2020260321%20225724%20%5Bf0ea6a%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104476/revision-arts/prompt_20260321_225724_%5Bf0ea6a_FPS_original%5D",
        "assetId": "d4a04514f84601432c222cbed72295c1",
        "uploadedAt": "2026-03-21T14:52:02Z"
    },
    {
        "id": "master 20260321 225753 [f41be2 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 225753 [f41be2 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104718/revision-arts/master%2020260321%20225753%20%5Bf41be2%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": null,
        "assetId": "78ded47a42916bf5194e8f397eae0e78",
        "uploadedAt": "2026-03-21T14:51:58Z"
    },
    {
        "id": "master 20260321 225820 [f49e2d FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 225820 [f49e2d FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104715/revision-arts/master%2020260321%20225820%20%5Bf49e2d%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104474/revision-arts/prompt_20260321_225820_%5Bf49e2d_FPS_original%5D",
        "assetId": "757c021a8b5628dbf189f8cb4804b9b0",
        "uploadedAt": "2026-03-21T14:51:55Z"
    },
    {
        "id": "master 20260321 225853 [f78b59 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 225853 [f78b59 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104712/revision-arts/master%2020260321%20225853%20%5Bf78b59%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104463/revision-arts/prompt_20260321_225853_%5Bf78b59_FPS_original%5D",
        "assetId": "90a9f2a7645d3cab7bff5f29ceda8a48",
        "uploadedAt": "2026-03-21T14:51:52Z"
    },
    {
        "id": "master 20260321 225922 [f81b04 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 225922 [f81b04 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104709/revision-arts/master%2020260321%20225922%20%5Bf81b04%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104466/revision-arts/prompt_20260321_225922_%5Bf81b04_FPS_original%5D",
        "assetId": "6f1ede763e37c7f0821f29007d80adc2",
        "uploadedAt": "2026-03-21T14:51:49Z"
    },
    {
        "id": "master 20260321 225950 [f319cb FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 225950 [f319cb FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104705/revision-arts/master%2020260321%20225950%20%5Bf319cb%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104465/revision-arts/prompt_20260321_225950_%5Bf319cb_FPS_original%5D",
        "assetId": "ccad7abf599271f97fc22220b773cfcf",
        "uploadedAt": "2026-03-21T14:51:45Z"
    },
    {
        "id": "master 20260321 231327 [7029429 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 231327 [7029429 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104696/revision-arts/master%2020260321%20231327%20%5B7029429%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104428/revision-arts/prompt_20260321_231327_%5B7029429_FPS_original%5D",
        "assetId": "c57a1b6abb304c2b7b2d46f8c9726e25",
        "uploadedAt": "2026-03-21T14:51:36Z"
    },
    {
        "id": "master 20260321 231354 [image readtop 2007 404297 11858674419794]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 231354 [image readtop 2007 404297 11858674419794]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104702/revision-arts/master%2020260321%20231354%20%5Bimage%20readtop%202007%20404297%2011858674419794%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104428/revision-arts/prompt_20260321_231354_%5Bimage_readtop_2007_404297_11858674419794%5D",
        "assetId": "474cfff012cd7b475723f4b71c7ab2f1",
        "uploadedAt": "2026-03-21T14:51:42Z"
    },
    {
        "id": "master 20260321 231425 [C0 E5 BD C2 BE F7 C3 CA BB F3 C8 AD FPS]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 231425 [C0 E5 BD C2 BE F7 C3 CA BB F3 C8 AD FPS]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104693/revision-arts/master%2020260321%20231425%20%5BC0%20E5%20BD%20C2%20BE%20F7%20C3%20CA%20BB%20F3%20C8%20AD%20FPS%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104420/revision-arts/prompt_20260321_231425_%5BC0_E5_BD_C2_BE_F7_C3_CA_BB_F3_C8_AD_FPS%5D",
        "assetId": "5eb75e8bacca5e9addbc1d0dfd2c7b0b",
        "uploadedAt": "2026-03-21T14:51:33Z"
    },
    {
        "id": "master 20260321 231427 [C0 E5 BD C2 BE F7 C3 CA BB F3 C8 AD FPS]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 231427 [C0 E5 BD C2 BE F7 C3 CA BB F3 C8 AD FPS]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104689/revision-arts/master%2020260321%20231427%20%5BC0%20E5%20BD%20C2%20BE%20F7%20C3%20CA%20BB%20F3%20C8%20AD%20FPS%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104414/revision-arts/prompt_20260321_231427_%5BC0_E5_BD_C2_BE_F7_C3_CA_BB_F3_C8_AD_FPS%5D",
        "assetId": "c37e9b33867a47a60a59575903f739a4",
        "uploadedAt": "2026-03-21T14:51:29Z"
    },
    {
        "id": "master 20260321 231459 [images FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 231459 [images FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104686/revision-arts/master%2020260321%20231459%20%5Bimages%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104413/revision-arts/prompt_20260321_231459_%5Bimages_FPS_original%5D",
        "assetId": "5ef8422cec56f5aa43e33ea38ec7ab17",
        "uploadedAt": "2026-03-21T14:51:26Z"
    },
    {
        "id": "master 20260321 231531 [74286729 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 231531 [74286729 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104683/revision-arts/master%2020260321%20231531%20%5B74286729%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104403/revision-arts/prompt_20260321_231531_%5B74286729_FPS_original%5D",
        "assetId": "a5f1bcebd79e779a45c37f55f2ccfc91",
        "uploadedAt": "2026-03-21T14:51:23Z"
    },
    {
        "id": "master 20260321 231602 [23 73571 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 231602 [23 73571 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104679/revision-arts/master%2020260321%20231602%20%5B23%2073571%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104404/revision-arts/prompt_20260321_231602_%5B23-73571_FPS_original%5D",
        "assetId": "e1e4b32ddf38c239dcf2cd74bdd1d362",
        "uploadedAt": "2026-03-21T14:51:19Z"
    },
    {
        "id": "master 20260321 231710 [51160b4ebe649778141304ad1050ef7b FPS ori]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 231710 [51160b4ebe649778141304ad1050ef7b FPS ori]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104669/revision-arts/master%2020260321%20231710%20%5B51160b4ebe649778141304ad1050ef7b%20FPS%20ori%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104391/revision-arts/prompt_20260321_231710_%5B51160b4ebe649778141304ad1050ef7b_FPS_ori%5D",
        "assetId": "7606406b56b64f901bfe5888152febff",
        "uploadedAt": "2026-03-21T14:51:09Z"
    },
    {
        "id": "master 20260321 231812 [img 015 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 231812 [img 015 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104676/revision-arts/master%2020260321%20231812%20%5Bimg%20015%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104392/revision-arts/prompt_20260321_231812_%5Bimg_015_FPS_original%5D",
        "assetId": "67f723a1a9e21b8c695d8fef0d3b8c65",
        "uploadedAt": "2026-03-21T14:51:16Z"
    },
    {
        "id": "master 20260321 231845 [7a30a1 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 231845 [7a30a1 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104672/revision-arts/master%2020260321%20231845%20%5B7a30a1%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104391/revision-arts/prompt_20260321_231845_%5B7a30a1_FPS_original%5D",
        "assetId": "5004a8f17607843cd381388390b152fa",
        "uploadedAt": "2026-03-21T14:51:12Z"
    },
    {
        "id": "master 20260322 104742 [Active Session FPS 9 16]",
        "tags": [
            "character"
        ],
        "title": "master 20260322 104742 [Active Session FPS 9 16]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774165964/revision-arts/master%2020260322%20104742%20%5BActive%20Session%20FPS%209%2016%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774165879/revision-arts/prompt_20260322_104742_%5BActive_Session_FPS_9_16%5D",
        "assetId": "1e3170a6e22d4dffa44cf40dc8c65262",
        "uploadedAt": "2026-03-22T07:52:44Z"
    },
    {
        "id": "master 20260322 104803 [Active Session FPS 16 9]",
        "tags": [
            "character"
        ],
        "title": "master 20260322 104803 [Active Session FPS 16 9]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774165961/revision-arts/master%2020260322%20104803%20%5BActive%20Session%20FPS%2016%209%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774165879/revision-arts/prompt_20260322_104803_%5BActive_Session_FPS_16_9%5D",
        "assetId": "e0322b243a87cf9e3fa22aac75a948ca",
        "uploadedAt": "2026-03-22T07:52:41Z"
    },
    {
        "id": "master 20260322 104824 [Active Session FPS 21 9]",
        "tags": [
            "character"
        ],
        "title": "master 20260322 104824 [Active Session FPS 21 9]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774165958/revision-arts/master%2020260322%20104824%20%5BActive%20Session%20FPS%2021%209%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774165878/revision-arts/prompt_20260322_104824_%5BActive_Session_FPS_21_9%5D",
        "assetId": "d234fadbd622ad7241681e532e76b864",
        "uploadedAt": "2026-03-22T07:52:38Z"
    },
    {
        "id": "master 20260322 104842 [Active Session PFS 1 1]",
        "tags": [
            "character"
        ],
        "title": "master 20260322 104842 [Active Session PFS 1 1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774165955/revision-arts/master%2020260322%20104842%20%5BActive%20Session%20PFS%201%201%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774165877/revision-arts/prompt_20260322_104842_%5BActive_Session_PFS_1_1%5D",
        "assetId": "0d0a74080dd7a6a14e6f6d4996552b5e",
        "uploadedAt": "2026-03-22T07:52:35Z"
    },
    {
        "id": "master 20260322 104901 [Active Session PFS 2 3]",
        "tags": [
            "character"
        ],
        "title": "master 20260322 104901 [Active Session PFS 2 3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774165951/revision-arts/master%2020260322%20104901%20%5BActive%20Session%20PFS%202%203%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774165876/revision-arts/prompt_20260322_104901_%5BActive_Session_PFS_2_3%5D",
        "assetId": "be67445da05db36593efda73bdd017b6",
        "uploadedAt": "2026-03-22T07:52:31Z"
    },
    {
        "id": "master 20260322 104918 [Active Session PFS 3 2]",
        "tags": [
            "character"
        ],
        "title": "master 20260322 104918 [Active Session PFS 3 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774165948/revision-arts/master%2020260322%20104918%20%5BActive%20Session%20PFS%203%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774165876/revision-arts/prompt_20260322_104918_%5BActive_Session_PFS_3_2%5D",
        "assetId": "a3ca5a2462a2f6e37f330bdd8cc2574e",
        "uploadedAt": "2026-03-22T07:52:28Z"
    },
    {
        "id": "master 20260322 104955 [Active Session PFS 4 3]",
        "tags": [
            "character"
        ],
        "title": "master 20260322 104955 [Active Session PFS 4 3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774165942/revision-arts/master%2020260322%20104955%20%5BActive%20Session%20PFS%204%203%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774165874/revision-arts/prompt_20260322_104955_%5BActive_Session_PFS_4_3%5D",
        "assetId": "aa3e6ceb6a57e6b20bcd5c90f3b26029",
        "uploadedAt": "2026-03-22T07:52:22Z"
    },
    {
        "id": "master 20260322 105013 [Active Session PFS 4 5]",
        "tags": [
            "character"
        ],
        "title": "master 20260322 105013 [Active Session PFS 4 5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774165937/revision-arts/master%2020260322%20105013%20%5BActive%20Session%20PFS%204%205%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774165874/revision-arts/prompt_20260322_105013_%5BActive_Session_PFS_4_5%5D",
        "assetId": "70fe84971a9249a25da6344ca888b1da",
        "uploadedAt": "2026-03-22T07:52:17Z"
    },
    {
        "id": "master 20260322 105031 [Active Session PFS 5 4]",
        "tags": [
            "character"
        ],
        "title": "master 20260322 105031 [Active Session PFS 5 4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774165933/revision-arts/master%2020260322%20105031%20%5BActive%20Session%20PFS%205%204%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774165872/revision-arts/prompt_20260322_105031_%5BActive_Session_PFS_5_4%5D",
        "assetId": "715b08d020c603cb57e366c237e4fb5f",
        "uploadedAt": "2026-03-22T07:52:13Z"
    },
    {
        "id": "master 20260322 105050 [Active Session PFS 9 16]",
        "tags": [
            "character"
        ],
        "title": "master 20260322 105050 [Active Session PFS 9 16]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774165930/revision-arts/master%2020260322%20105050%20%5BActive%20Session%20PFS%209%2016%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774165871/revision-arts/prompt_20260322_105050_%5BActive_Session_PFS_9_16%5D",
        "assetId": "73e6d53e1507b88b020c739dce15e478",
        "uploadedAt": "2026-03-22T07:52:10Z"
    },
    {
        "id": "master 20260322 105109 [Active Session PFS 16 9]",
        "tags": [
            "character"
        ],
        "title": "master 20260322 105109 [Active Session PFS 16 9]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774165925/revision-arts/master%2020260322%20105109%20%5BActive%20Session%20PFS%2016%209%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774165870/revision-arts/prompt_20260322_105109_%5BActive_Session_PFS_16_9%5D",
        "assetId": "672476b01e1fe2b8ad3719afcbaaa521",
        "uploadedAt": "2026-03-22T07:52:05Z"
    },
    {
        "id": "master 20260322 105131 [Active Session PFS 21 9]",
        "tags": [
            "character"
        ],
        "title": "master 20260322 105131 [Active Session PFS 21 9]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774165922/revision-arts/master%2020260322%20105131%20%5BActive%20Session%20PFS%2021%209%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774165869/revision-arts/prompt_20260322_105131_%5BActive_Session_PFS_21_9%5D",
        "assetId": "60457aa2a1bf5ada730ea34048f5e463",
        "uploadedAt": "2026-03-22T07:52:02Z"
    },
    {
        "id": "master 20260322 160525 [img 077 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260322 160525 [img 077 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774165701/revision-arts/master%2020260322%20160525%20%5Bimg%20077%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774165665/revision-arts/prompt_20260322_160525_%5Bimg_077_FPS_original%5D",
        "assetId": "357ec1b87a99dfd4619f72f34cf9f047",
        "uploadedAt": "2026-03-22T07:48:21Z"
    },
    {
        "id": "master 20260322 160552 [img 078 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260322 160552 [img 078 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774165697/revision-arts/master%2020260322%20160552%20%5Bimg%20078%20FPS%20original%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774165666/revision-arts/prompt_20260322_160552_%5Bimg_078_FPS_original%5D",
        "assetId": "ccba31e45a52209bc00c2de1c8e3c3bc",
        "uploadedAt": "2026-03-22T07:48:17Z"
    },
    {
        "id": "master 20260322 220550 [화면 캡처 2026 03 03 150349 master 202026032]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 220550 [화면 캡처 2026 03 03 150349 master 202026032]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190399/revision-arts/master%2020260322%20220550%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2003%20150349%20master%20202026032%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189481/revision-arts/prompt_20260322_220550_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-03_150349_master_202026032%5D",
        "assetId": "858b57a89adf5ce3ff746c2274cfa102",
        "uploadedAt": "2026-03-22T14:39:59Z"
    },
    {
        "id": "master 20260322 220617 [화면 캡처 2026 03 15 162248 408187 FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 220617 [화면 캡처 2026 03 15 162248 408187 FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190396/revision-arts/master%2020260322%20220617%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20408187%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189480/revision-arts/prompt_20260322_220617_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_408187_FPS_origi%5D",
        "assetId": "a9cc01188f60ff2be2d47939eacd8f84",
        "uploadedAt": "2026-03-22T14:39:56Z"
    },
    {
        "id": "master 20260322 220626 [화면 캡처 2026 03 03 150349 master 202026032]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 220626 [화면 캡처 2026 03 03 150349 master 202026032]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190393/revision-arts/master%2020260322%20220626%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2003%20150349%20master%20202026032%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189479/revision-arts/prompt_20260322_220626_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-03_150349_master_202026032%5D",
        "assetId": "26548ebcf900de9cd9443c0dc9af2674",
        "uploadedAt": "2026-03-22T14:39:53Z"
    },
    {
        "id": "master 20260322 220644 [화면 캡처 2026 03 15 162248 494629 FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 220644 [화면 캡처 2026 03 15 162248 494629 FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190390/revision-arts/master%2020260322%20220644%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20494629%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189479/revision-arts/prompt_20260322_220644_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_494629_FPS_origi%5D",
        "assetId": "a16f97d70aea9e6519dbf0c92c60dfd4",
        "uploadedAt": "2026-03-22T14:39:50Z"
    },
    {
        "id": "master 20260322 220656 [화면 캡처 2026 03 03 150349 master 202026032]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 220656 [화면 캡처 2026 03 03 150349 master 202026032]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190387/revision-arts/master%2020260322%20220656%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2003%20150349%20master%20202026032%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189478/revision-arts/prompt_20260322_220656_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-03_150349_master_202026032%5D",
        "assetId": "6939b3884429bd5b4dee2c963bedec39",
        "uploadedAt": "2026-03-22T14:39:47Z"
    },
    {
        "id": "master 20260322 220713 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 220713 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190380/revision-arts/master%2020260322%20220713%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189476/revision-arts/prompt_20260322_220713_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "858aed3feb56ddb00959d01f293909b6",
        "uploadedAt": "2026-03-22T14:39:40Z"
    },
    {
        "id": "master 20260322 220714 [화면 캡처 2026 03 15 162248 612358 FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 220714 [화면 캡처 2026 03 15 162248 612358 FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190384/revision-arts/master%2020260322%20220714%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20612358%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189477/revision-arts/prompt_20260322_220714_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_612358_FPS_origi%5D",
        "assetId": "e401d9086d70b2fe19ea8e3d9a626b1d",
        "uploadedAt": "2026-03-22T14:39:44Z"
    },
    {
        "id": "master 20260322 220728 [화면 캡처 2026 03 03 150349 master 202026032]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 220728 [화면 캡처 2026 03 03 150349 master 202026032]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190376/revision-arts/master%2020260322%20220728%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2003%20150349%20master%20202026032%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189475/revision-arts/prompt_20260322_220728_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-03_150349_master_202026032%5D",
        "assetId": "f41a94a9550066ddf874c78fa94d8d81",
        "uploadedAt": "2026-03-22T14:39:36Z"
    },
    {
        "id": "master 20260322 220736 [Please transform the 2k 202602030020 1 e]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 220736 [Please transform the 2k 202602030020 1 e]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190373/revision-arts/master%2020260322%20220736%20%5BPlease%20transform%20the%202k%20202602030020%201%20e%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189473/revision-arts/prompt_20260322_220736_%5BPlease_transform_the_2k_202602030020_1_e%5D",
        "assetId": "f45132ed1d30cc923a971bd0c722d25e",
        "uploadedAt": "2026-03-22T14:39:33Z"
    },
    {
        "id": "master 20260322 220739 [화면 캡처 2026 03 15 162248 630282 FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 220739 [화면 캡처 2026 03 15 162248 630282 FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190369/revision-arts/master%2020260322%20220739%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20630282%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189472/revision-arts/prompt_20260322_220739_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_630282_FPS_origi%5D",
        "assetId": "abb974b5174da813ef040274cdbd02ec",
        "uploadedAt": "2026-03-22T14:39:29Z"
    },
    {
        "id": "master 20260322 220741 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 220741 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190366/revision-arts/master%2020260322%20220741%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189471/revision-arts/prompt_20260322_220741_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "3931aa30584385f10fc05fcb5b194006",
        "uploadedAt": "2026-03-22T14:39:26Z"
    },
    {
        "id": "master 20260322 220759 [Please transform the 2k 202602030020 1 e]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 220759 [Please transform the 2k 202602030020 1 e]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190363/revision-arts/master%2020260322%20220759%20%5BPlease%20transform%20the%202k%20202602030020%201%20e%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189470/revision-arts/prompt_20260322_220759_%5BPlease_transform_the_2k_202602030020_1_e%5D",
        "assetId": "63b58171c27750e1f8c14ee138271e0f",
        "uploadedAt": "2026-03-22T14:39:23Z"
    },
    {
        "id": "master 20260322 220800 [화면 캡처 2026 03 03 150349 master 202026032]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 220800 [화면 캡처 2026 03 03 150349 master 202026032]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190360/revision-arts/master%2020260322%20220800%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2003%20150349%20master%20202026032%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189470/revision-arts/prompt_20260322_220800_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-03_150349_master_202026032%5D",
        "assetId": "f4a4a925e6b2abb84e230dd6e0572418",
        "uploadedAt": "2026-03-22T14:39:20Z"
    },
    {
        "id": "master 20260322 220803 [화면 캡처 2026 03 15 162248 864215 FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 220803 [화면 캡처 2026 03 15 162248 864215 FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190357/revision-arts/master%2020260322%20220803%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20864215%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189469/revision-arts/prompt_20260322_220803_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_864215_FPS_origi%5D",
        "assetId": "a60560f585c6ef35bffe5d208ea9070b",
        "uploadedAt": "2026-03-22T14:39:17Z"
    },
    {
        "id": "master 20260322 220817 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 220817 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190354/revision-arts/master%2020260322%20220817%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189468/revision-arts/prompt_20260322_220817_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "8e02235721ae5a10b6691969806d22da",
        "uploadedAt": "2026-03-22T14:39:14Z"
    },
    {
        "id": "master 20260322 220825 [Please transform the 2k 202602030020 1 e]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 220825 [Please transform the 2k 202602030020 1 e]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190351/revision-arts/master%2020260322%20220825%20%5BPlease%20transform%20the%202k%20202602030020%201%20e%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189467/revision-arts/prompt_20260322_220825_%5BPlease_transform_the_2k_202602030020_1_e%5D",
        "assetId": "fb6c67b27da99b008f0be1491df0b0d0",
        "uploadedAt": "2026-03-22T14:39:11Z"
    },
    {
        "id": "master 20260322 220830 [화면 캡처 2026 03 03 150349 master 202026032]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 220830 [화면 캡처 2026 03 03 150349 master 202026032]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190348/revision-arts/master%2020260322%20220830%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2003%20150349%20master%20202026032%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189467/revision-arts/prompt_20260322_220830_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-03_150349_master_202026032%5D",
        "assetId": "a4b69cdebc83e2b157866ecd95c0ea00",
        "uploadedAt": "2026-03-22T14:39:08Z"
    },
    {
        "id": "master 20260322 220833 [화면 캡처 2026 03 15 162248 a1e344 FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 220833 [화면 캡처 2026 03 15 162248 a1e344 FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190344/revision-arts/master%2020260322%20220833%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20a1e344%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189466/revision-arts/prompt_20260322_220833_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_a1e344_FPS_origi%5D",
        "assetId": "ebbbcd063dbc4a23af634398545d00b9",
        "uploadedAt": "2026-03-22T14:39:04Z"
    },
    {
        "id": "master 20260322 220844 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 220844 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190340/revision-arts/master%2020260322%20220844%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189465/revision-arts/prompt_20260322_220844_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "da54a6e386f7e11b38daf4cbdf0bd6ab",
        "uploadedAt": "2026-03-22T14:39:00Z"
    },
    {
        "id": "master 20260322 220856 [Please transform the 2k 202602030020 1 e]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 220856 [Please transform the 2k 202602030020 1 e]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190337/revision-arts/master%2020260322%20220856%20%5BPlease%20transform%20the%202k%20202602030020%201%20e%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189464/revision-arts/prompt_20260322_220856_%5BPlease_transform_the_2k_202602030020_1_e%5D",
        "assetId": "7d04757d337271161be47bc550479d9c",
        "uploadedAt": "2026-03-22T14:38:57Z"
    },
    {
        "id": "master 20260322 220911 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 220911 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190334/revision-arts/master%2020260322%20220911%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189464/revision-arts/prompt_20260322_220911_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "f4aa40b5d7029b2ef1a2fba5f52116f2",
        "uploadedAt": "2026-03-22T14:38:54Z"
    },
    {
        "id": "master 20260322 220912 [화면 캡처 2026 03 03 150349 master 202026032]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 220912 [화면 캡처 2026 03 03 150349 master 202026032]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190331/revision-arts/master%2020260322%20220912%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2003%20150349%20master%20202026032%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189463/revision-arts/prompt_20260322_220912_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-03_150349_master_202026032%5D",
        "assetId": "779f67620c3d177d28c55f56ad4fc7eb",
        "uploadedAt": "2026-03-22T14:38:51Z"
    },
    {
        "id": "master 20260322 220923 [화면 캡처 2026 03 15 162248 a2d4ed FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 220923 [화면 캡처 2026 03 15 162248 a2d4ed FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190328/revision-arts/master%2020260322%20220923%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20a2d4ed%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189462/revision-arts/prompt_20260322_220923_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_a2d4ed_FPS_origi%5D",
        "assetId": "a451cd7601b86137b44fb5001efa0775",
        "uploadedAt": "2026-03-22T14:38:48Z"
    },
    {
        "id": "master 20260322 220924 [Please transform the 2k 202602030020 1 e]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 220924 [Please transform the 2k 202602030020 1 e]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190325/revision-arts/master%2020260322%20220924%20%5BPlease%20transform%20the%202k%20202602030020%201%20e%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189461/revision-arts/prompt_20260322_220924_%5BPlease_transform_the_2k_202602030020_1_e%5D",
        "assetId": "77377e57013dc080c49eabe224324828",
        "uploadedAt": "2026-03-22T14:38:45Z"
    },
    {
        "id": "master 20260322 220936 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 220936 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190322/revision-arts/master%2020260322%20220936%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189461/revision-arts/prompt_20260322_220936_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "6d836df1dcbdf85a0a5aa366701d99fe",
        "uploadedAt": "2026-03-22T14:38:42Z"
    },
    {
        "id": "master 20260322 220943 [화면 캡처 2026 03 03 150349 master 202026032]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 220943 [화면 캡처 2026 03 03 150349 master 202026032]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190319/revision-arts/master%2020260322%20220943%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2003%20150349%20master%20202026032%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189460/revision-arts/prompt_20260322_220943_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-03_150349_master_202026032%5D",
        "assetId": "a8e2115dd03513bd65785171ff68c5cd",
        "uploadedAt": "2026-03-22T14:38:39Z"
    },
    {
        "id": "master 20260322 220948 [화면 캡처 2026 03 15 162248 a3c93a FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 220948 [화면 캡처 2026 03 15 162248 a3c93a FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190315/revision-arts/master%2020260322%20220948%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20a3c93a%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189459/revision-arts/prompt_20260322_220948_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_a3c93a_FPS_origi%5D",
        "assetId": "d49f572b4e2108d2ca7b2fcad7d049e4",
        "uploadedAt": "2026-03-22T14:38:35Z"
    },
    {
        "id": "master 20260322 220955 [Please transform the 2k 202602030020 1 e]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 220955 [Please transform the 2k 202602030020 1 e]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190312/revision-arts/master%2020260322%20220955%20%5BPlease%20transform%20the%202k%20202602030020%201%20e%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189459/revision-arts/prompt_20260322_220955_%5BPlease_transform_the_2k_202602030020_1_e%5D",
        "assetId": "afc955832e8f9d8b17db41fca2bb4ee0",
        "uploadedAt": "2026-03-22T14:38:32Z"
    },
    {
        "id": "master 20260322 221007 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221007 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190309/revision-arts/master%2020260322%20221007%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189458/revision-arts/prompt_20260322_221007_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "7e32ddcb92da66c0e4560bd9349748d6",
        "uploadedAt": "2026-03-22T14:38:29Z"
    },
    {
        "id": "master 20260322 221013 [화면 캡처 2026 03 03 150349 master 202026032]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221013 [화면 캡처 2026 03 03 150349 master 202026032]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190306/revision-arts/master%2020260322%20221013%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2003%20150349%20master%20202026032%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189457/revision-arts/prompt_20260322_221013_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-03_150349_master_202026032%5D",
        "assetId": "f91081c70aa78b390fbc4bd1c0dfd3bd",
        "uploadedAt": "2026-03-22T14:38:26Z"
    },
    {
        "id": "master 20260322 221029 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221029 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190303/revision-arts/master%2020260322%20221029%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189457/revision-arts/prompt_20260322_221029_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "8cadc1f7a669e02556e6710011ff849f",
        "uploadedAt": "2026-03-22T14:38:23Z"
    },
    {
        "id": "master 20260322 221033 [Please transform the 2k 202602030020 1 e]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221033 [Please transform the 2k 202602030020 1 e]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190300/revision-arts/master%2020260322%20221033%20%5BPlease%20transform%20the%202k%20202602030020%201%20e%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189456/revision-arts/prompt_20260322_221033_%5BPlease_transform_the_2k_202602030020_1_e%5D",
        "assetId": "3ace38058df61d129b5db77c0c61ccb8",
        "uploadedAt": "2026-03-22T14:38:20Z"
    },
    {
        "id": "master 20260322 221040 [화면 캡처 2026 03 03 150349 master 202026032]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221040 [화면 캡처 2026 03 03 150349 master 202026032]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190297/revision-arts/master%2020260322%20221040%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2003%20150349%20master%20202026032%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189455/revision-arts/prompt_20260322_221040_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-03_150349_master_202026032%5D",
        "assetId": "72e79cef3d7662bc4ac8b55ce6ba01f1",
        "uploadedAt": "2026-03-22T14:38:17Z"
    },
    {
        "id": "master 20260322 221044 [화면 캡처 2026 03 15 162248 a5a018 FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221044 [화면 캡처 2026 03 15 162248 a5a018 FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190294/revision-arts/master%2020260322%20221044%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20a5a018%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189454/revision-arts/prompt_20260322_221044_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_a5a018_FPS_origi%5D",
        "assetId": "5be0b62e55a9be74084b7c88551ab79e",
        "uploadedAt": "2026-03-22T14:38:14Z"
    },
    {
        "id": "master 20260322 221102 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221102 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190287/revision-arts/master%2020260322%20221102%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189454/revision-arts/prompt_20260322_221102_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "0e384ca4e48cb61fc4f758fec10c428b",
        "uploadedAt": "2026-03-22T14:38:07Z"
    },
    {
        "id": "master 20260322 221102 [Please transform the 2k 202602030020 1 e]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221102 [Please transform the 2k 202602030020 1 e]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190290/revision-arts/master%2020260322%20221102%20%5BPlease%20transform%20the%202k%20202602030020%201%20e%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189453/revision-arts/prompt_20260322_221102_%5BPlease_transform_the_2k_202602030020_1_e%5D",
        "assetId": "4b45b5cff6b073a23b70c886fd824891",
        "uploadedAt": "2026-03-22T14:38:10Z"
    },
    {
        "id": "master 20260322 221113 [화면 캡처 2026 03 03 150349 master 202026032]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221113 [화면 캡처 2026 03 03 150349 master 202026032]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190283/revision-arts/master%2020260322%20221113%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2003%20150349%20master%20202026032%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189452/revision-arts/prompt_20260322_221113_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-03_150349_master_202026032%5D",
        "assetId": "493b8d5f5a1fec4e79d69ab3db4cc24d",
        "uploadedAt": "2026-03-22T14:38:03Z"
    },
    {
        "id": "master 20260322 221117 [화면 캡처 2026 03 15 162248 a5f868 FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221117 [화면 캡처 2026 03 15 162248 a5f868 FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190279/revision-arts/master%2020260322%20221117%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20a5f868%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189451/revision-arts/prompt_20260322_221117_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_a5f868_FPS_origi%5D",
        "assetId": "7444a3a74311ca3e325c744c1d80bec2",
        "uploadedAt": "2026-03-22T14:37:59Z"
    },
    {
        "id": "master 20260322 221128 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221128 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190276/revision-arts/master%2020260322%20221128%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189451/revision-arts/prompt_20260322_221128_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "065f709eabedeca33927690497f0df50",
        "uploadedAt": "2026-03-22T14:37:56Z"
    },
    {
        "id": "master 20260322 221145 [Please transform the 2k 202602030020 1 e]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221145 [Please transform the 2k 202602030020 1 e]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190273/revision-arts/master%2020260322%20221145%20%5BPlease%20transform%20the%202k%20202602030020%201%20e%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189450/revision-arts/prompt_20260322_221145_%5BPlease_transform_the_2k_202602030020_1_e%5D",
        "assetId": "9edaecf94f999026dc79563ec9417d80",
        "uploadedAt": "2026-03-22T14:37:53Z"
    },
    {
        "id": "master 20260322 221148 [화면 캡처 2026 03 15 162248 a6feb3 FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221148 [화면 캡처 2026 03 15 162248 a6feb3 FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190270/revision-arts/master%2020260322%20221148%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20a6feb3%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189449/revision-arts/prompt_20260322_221148_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_a6feb3_FPS_origi%5D",
        "assetId": "4cb949f61ca53f822936440005f35e2a",
        "uploadedAt": "2026-03-22T14:37:50Z"
    },
    {
        "id": "master 20260322 221158 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221158 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190267/revision-arts/master%2020260322%20221158%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189448/revision-arts/prompt_20260322_221158_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "37a2ed73c8e26b6840d7116da98757d2",
        "uploadedAt": "2026-03-22T14:37:47Z"
    },
    {
        "id": "master 20260322 221212 [Please transform the 2k 202602030020 1 e]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221212 [Please transform the 2k 202602030020 1 e]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190264/revision-arts/master%2020260322%20221212%20%5BPlease%20transform%20the%202k%20202602030020%201%20e%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189447/revision-arts/prompt_20260322_221212_%5BPlease_transform_the_2k_202602030020_1_e%5D",
        "assetId": "7cd574d7e2463ab4a40b3c2b465b310f",
        "uploadedAt": "2026-03-22T14:37:44Z"
    },
    {
        "id": "master 20260322 221216 [화면 캡처 2026 03 15 162248 a7a2c1 FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221216 [화면 캡처 2026 03 15 162248 a7a2c1 FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190261/revision-arts/master%2020260322%20221216%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20a7a2c1%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189446/revision-arts/prompt_20260322_221216_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_a7a2c1_FPS_origi%5D",
        "assetId": "352d27253eed94a3bb5e88ce2114a9fc",
        "uploadedAt": "2026-03-22T14:37:41Z"
    },
    {
        "id": "master 20260322 221225 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221225 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190257/revision-arts/master%2020260322%20221225%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189445/revision-arts/prompt_20260322_221225_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "57608c4bc133c4cff991476672618036",
        "uploadedAt": "2026-03-22T14:37:37Z"
    },
    {
        "id": "master 20260322 221239 [Please transform the 2k 202602030020 1 e]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221239 [Please transform the 2k 202602030020 1 e]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190253/revision-arts/master%2020260322%20221239%20%5BPlease%20transform%20the%202k%20202602030020%201%20e%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189444/revision-arts/prompt_20260322_221239_%5BPlease_transform_the_2k_202602030020_1_e%5D",
        "assetId": "530f2e2cbb088f0a805fe17fdd090ecf",
        "uploadedAt": "2026-03-22T14:37:33Z"
    },
    {
        "id": "master 20260322 221240 [화면 캡처 2026 03 15 162248 a7f190 FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221240 [화면 캡처 2026 03 15 162248 a7f190 FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190249/revision-arts/master%2020260322%20221240%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20a7f190%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189443/revision-arts/prompt_20260322_221240_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_a7f190_FPS_origi%5D",
        "assetId": "b07641810a739707dee6d23aa8319e8f",
        "uploadedAt": "2026-03-22T14:37:29Z"
    },
    {
        "id": "master 20260322 221307 [화면 캡처 2026 03 15 162248 a8ab6e FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221307 [화면 캡처 2026 03 15 162248 a8ab6e FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190246/revision-arts/master%2020260322%20221307%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20a8ab6e%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189443/revision-arts/prompt_20260322_221307_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_a8ab6e_FPS_origi%5D",
        "assetId": "27402ce93264e8677940a24092d05e21",
        "uploadedAt": "2026-03-22T14:37:26Z"
    },
    {
        "id": "master 20260322 221311 [Please transform the 2k 202602030020 1 e]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221311 [Please transform the 2k 202602030020 1 e]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190243/revision-arts/master%2020260322%20221311%20%5BPlease%20transform%20the%202k%20202602030020%201%20e%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189442/revision-arts/prompt_20260322_221311_%5BPlease_transform_the_2k_202602030020_1_e%5D",
        "assetId": "4397c3a02f2f12b2f764838588e8ead5",
        "uploadedAt": "2026-03-22T14:37:23Z"
    },
    {
        "id": "master 20260322 221325 [화면 캡처 2026 03 03 150349 master 202026032]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221325 [화면 캡처 2026 03 03 150349 master 202026032]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190240/revision-arts/master%2020260322%20221325%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2003%20150349%20master%20202026032%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189441/revision-arts/prompt_20260322_221325_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-03_150349_master_202026032%5D",
        "assetId": "312bc37f76c2ab9789119a9d26c7bfcb",
        "uploadedAt": "2026-03-22T14:37:20Z"
    },
    {
        "id": "master 20260322 221329 [화면 캡처 2026 03 15 162248 a8c1a4 FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221329 [화면 캡처 2026 03 15 162248 a8c1a4 FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190237/revision-arts/master%2020260322%20221329%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20a8c1a4%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189441/revision-arts/prompt_20260322_221329_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_a8c1a4_FPS_origi%5D",
        "assetId": "ed034a7c6ac72e7571b8ee8ef104e194",
        "uploadedAt": "2026-03-22T14:37:17Z"
    },
    {
        "id": "master 20260322 221340 [Please transform the 2k 202602030020 1 e]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221340 [Please transform the 2k 202602030020 1 e]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190234/revision-arts/master%2020260322%20221340%20%5BPlease%20transform%20the%202k%20202602030020%201%20e%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189440/revision-arts/prompt_20260322_221340_%5BPlease_transform_the_2k_202602030020_1_e%5D",
        "assetId": "1eb53dd1d5da1ed333d954fa9b4fb457",
        "uploadedAt": "2026-03-22T14:37:14Z"
    },
    {
        "id": "master 20260322 221357 [화면 캡처 2026 03 15 162248 a8c423 FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221357 [화면 캡처 2026 03 15 162248 a8c423 FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190227/revision-arts/master%2020260322%20221357%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20a8c423%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189438/revision-arts/prompt_20260322_221357_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_a8c423_FPS_origi%5D",
        "assetId": "604ab210222ab6a8e1c5e7555bc8e740",
        "uploadedAt": "2026-03-22T14:37:07Z"
    },
    {
        "id": "master 20260322 221358 [화면 캡처 2026 03 03 150349 master 202026032]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221358 [화면 캡처 2026 03 03 150349 master 202026032]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190231/revision-arts/master%2020260322%20221358%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2003%20150349%20master%20202026032%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189438/revision-arts/prompt_20260322_221358_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-03_150349_master_202026032%5D",
        "assetId": "b0fafd129f274390a687b5d1aba22d04",
        "uploadedAt": "2026-03-22T14:37:11Z"
    },
    {
        "id": "master 20260322 221409 [Please transform the 2k 202602030020 1 e]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221409 [Please transform the 2k 202602030020 1 e]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190224/revision-arts/master%2020260322%20221409%20%5BPlease%20transform%20the%202k%20202602030020%201%20e%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189437/revision-arts/prompt_20260322_221409_%5BPlease_transform_the_2k_202602030020_1_e%5D",
        "assetId": "0d21d5c80c4049425d62b322734ccac4",
        "uploadedAt": "2026-03-22T14:37:04Z"
    },
    {
        "id": "master 20260322 221425 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221425 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190221/revision-arts/master%2020260322%20221425%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189436/revision-arts/prompt_20260322_221425_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "c3ad546ec4eac7ad823b28cadbf4fedc",
        "uploadedAt": "2026-03-22T14:37:01Z"
    },
    {
        "id": "master 20260322 221430 [화면 캡처 2026 03 03 150349 master 202026032]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221430 [화면 캡처 2026 03 03 150349 master 202026032]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190215/revision-arts/master%2020260322%20221430%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2003%20150349%20master%20202026032%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189435/revision-arts/prompt_20260322_221430_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-03_150349_master_202026032%5D",
        "assetId": "478fec86f4a866a29a96b9f0f74b0535",
        "uploadedAt": "2026-03-22T14:36:55Z"
    },
    {
        "id": "master 20260322 221430 [화면 캡처 2026 03 15 162248 a9dac5 FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221430 [화면 캡처 2026 03 15 162248 a9dac5 FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190218/revision-arts/master%2020260322%20221430%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20a9dac5%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189436/revision-arts/prompt_20260322_221430_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_a9dac5_FPS_origi%5D",
        "assetId": "80a67f601c8660324d1280092d1d5f50",
        "uploadedAt": "2026-03-22T14:36:58Z"
    },
    {
        "id": "master 20260322 221437 [Please transform the 2k 202602030020 1 e]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221437 [Please transform the 2k 202602030020 1 e]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190211/revision-arts/master%2020260322%20221437%20%5BPlease%20transform%20the%202k%20202602030020%201%20e%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189434/revision-arts/prompt_20260322_221437_%5BPlease_transform_the_2k_202602030020_1_e%5D",
        "assetId": "3796591c458b765851a62e0a1e79c8b9",
        "uploadedAt": "2026-03-22T14:36:51Z"
    },
    {
        "id": "master 20260322 221454 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221454 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190208/revision-arts/master%2020260322%20221454%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189434/revision-arts/prompt_20260322_221454_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "cf1ea218db5f42da0e9e2f01d58948a7",
        "uploadedAt": "2026-03-22T14:36:48Z"
    },
    {
        "id": "master 20260322 221459 [화면 캡처 2026 03 03 150349 master 202026032]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221459 [화면 캡처 2026 03 03 150349 master 202026032]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190205/revision-arts/master%2020260322%20221459%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2003%20150349%20master%20202026032%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189433/revision-arts/prompt_20260322_221459_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-03_150349_master_202026032%5D",
        "assetId": "11b275ced177be5bdd407cd7d65a25d0",
        "uploadedAt": "2026-03-22T14:36:45Z"
    },
    {
        "id": "master 20260322 221502 [Please transform the 2k 202602030020 1 e]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221502 [Please transform the 2k 202602030020 1 e]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190202/revision-arts/master%2020260322%20221502%20%5BPlease%20transform%20the%202k%20202602030020%201%20e%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189432/revision-arts/prompt_20260322_221502_%5BPlease_transform_the_2k_202602030020_1_e%5D",
        "assetId": "f4e6602da2b2b02713a69d3f27209721",
        "uploadedAt": "2026-03-22T14:36:42Z"
    },
    {
        "id": "master 20260322 221504 [화면 캡처 2026 03 15 162248 a31bac FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221504 [화면 캡처 2026 03 15 162248 a31bac FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190199/revision-arts/master%2020260322%20221504%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20a31bac%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189431/revision-arts/prompt_20260322_221504_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_a31bac_FPS_origi%5D",
        "assetId": "fe0a871dcab3a3e54f3ce4976a78eab2",
        "uploadedAt": "2026-03-22T14:36:39Z"
    },
    {
        "id": "master 20260322 221520 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221520 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190196/revision-arts/master%2020260322%20221520%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189431/revision-arts/prompt_20260322_221520_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "9ac1fd14c23cfe317cb6dc7c74ada09e",
        "uploadedAt": "2026-03-22T14:36:36Z"
    },
    {
        "id": "master 20260322 221529 [Please transform the 2k 202602030020 1 e]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221529 [Please transform the 2k 202602030020 1 e]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190193/revision-arts/master%2020260322%20221529%20%5BPlease%20transform%20the%202k%20202602030020%201%20e%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189430/revision-arts/prompt_20260322_221529_%5BPlease_transform_the_2k_202602030020_1_e%5D",
        "assetId": "50f85b153b136b5b015f912ccbc9d186",
        "uploadedAt": "2026-03-22T14:36:33Z"
    },
    {
        "id": "master 20260322 221533 [화면 캡처 2026 03 15 162248 a31f23 FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221533 [화면 캡처 2026 03 15 162248 a31f23 FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190189/revision-arts/master%2020260322%20221533%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20a31f23%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189429/revision-arts/prompt_20260322_221533_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_a31f23_FPS_origi%5D",
        "assetId": "fe7a106905cb1c132c9b123678ab18e0",
        "uploadedAt": "2026-03-22T14:36:29Z"
    },
    {
        "id": "master 20260322 221553 [Please transform the 2k 202602030020 1 e]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221553 [Please transform the 2k 202602030020 1 e]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190186/revision-arts/master%2020260322%20221553%20%5BPlease%20transform%20the%202k%20202602030020%201%20e%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189428/revision-arts/prompt_20260322_221553_%5BPlease_transform_the_2k_202602030020_1_e%5D",
        "assetId": "5cde83d147840d00b33eeb2f98463600",
        "uploadedAt": "2026-03-22T14:36:26Z"
    },
    {
        "id": "master 20260322 221559 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221559 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190183/revision-arts/master%2020260322%20221559%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189426/revision-arts/prompt_20260322_221559_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "6b55a1fa6b0c7e9a31cf2a11bd534402",
        "uploadedAt": "2026-03-22T14:36:23Z"
    },
    {
        "id": "master 20260322 221559 [화면 캡처 2026 03 15 162248 a49c51 FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221559 [화면 캡처 2026 03 15 162248 a49c51 FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190180/revision-arts/master%2020260322%20221559%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20a49c51%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189427/revision-arts/prompt_20260322_221559_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_a49c51_FPS_origi%5D",
        "assetId": "8a301114dae1c46ed5d21dd42dfed1bd",
        "uploadedAt": "2026-03-22T14:36:20Z"
    },
    {
        "id": "master 20260322 221615 [화면 캡처 2026 03 03 150349 master 202026032]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221615 [화면 캡처 2026 03 03 150349 master 202026032]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190177/revision-arts/master%2020260322%20221615%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2003%20150349%20master%20202026032%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189425/revision-arts/prompt_20260322_221615_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-03_150349_master_202026032%5D",
        "assetId": "23b644b43a59af51333e6cf4c4768f05",
        "uploadedAt": "2026-03-22T14:36:17Z"
    },
    {
        "id": "master 20260322 221621 [Please transform the 2k 202602030020 1 e]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221621 [Please transform the 2k 202602030020 1 e]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190174/revision-arts/master%2020260322%20221621%20%5BPlease%20transform%20the%202k%20202602030020%201%20e%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189424/revision-arts/prompt_20260322_221621_%5BPlease_transform_the_2k_202602030020_1_e%5D",
        "assetId": "c4bc88ccc1c0d6bd0502f42df3e958e3",
        "uploadedAt": "2026-03-22T14:36:14Z"
    },
    {
        "id": "master 20260322 221630 [화면 캡처 2026 03 15 162248 a067d3 FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221630 [화면 캡처 2026 03 15 162248 a067d3 FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190171/revision-arts/master%2020260322%20221630%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20a067d3%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189424/revision-arts/prompt_20260322_221630_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_a067d3_FPS_origi%5D",
        "assetId": "ce7d55c2c6d0cff1eb659ad63156562e",
        "uploadedAt": "2026-03-22T14:36:11Z"
    },
    {
        "id": "master 20260322 221648 [Please transform the 2k 202602030020 1 e]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221648 [Please transform the 2k 202602030020 1 e]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190164/revision-arts/master%2020260322%20221648%20%5BPlease%20transform%20the%202k%20202602030020%201%20e%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189422/revision-arts/prompt_20260322_221648_%5BPlease_transform_the_2k_202602030020_1_e%5D",
        "assetId": "5b3526952cb72cbbcd30047d604d5633",
        "uploadedAt": "2026-03-22T14:36:04Z"
    },
    {
        "id": "master 20260322 221648 [화면 캡처 2026 03 03 150349 master 202026032]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221648 [화면 캡처 2026 03 03 150349 master 202026032]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190167/revision-arts/master%2020260322%20221648%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2003%20150349%20master%20202026032%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189423/revision-arts/prompt_20260322_221648_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-03_150349_master_202026032%5D",
        "assetId": "b9d87fbb8d02c5285af7f90b11d65243",
        "uploadedAt": "2026-03-22T14:36:07Z"
    },
    {
        "id": "master 20260322 221657 [화면 캡처 2026 03 15 162248 a85c70 FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221657 [화면 캡처 2026 03 15 162248 a85c70 FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190161/revision-arts/master%2020260322%20221657%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20a85c70%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189421/revision-arts/prompt_20260322_221657_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_a85c70_FPS_origi%5D",
        "assetId": "0ae5693b1ba594f0d939ebb934e334e3",
        "uploadedAt": "2026-03-22T14:36:01Z"
    },
    {
        "id": "master 20260322 221716 [Please transform the 2k 202602030020 1 e]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221716 [Please transform the 2k 202602030020 1 e]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190155/revision-arts/master%2020260322%20221716%20%5BPlease%20transform%20the%202k%20202602030020%201%20e%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189420/revision-arts/prompt_20260322_221716_%5BPlease_transform_the_2k_202602030020_1_e%5D",
        "assetId": "99731bc800e158f6207e488797c79a03",
        "uploadedAt": "2026-03-22T14:35:55Z"
    },
    {
        "id": "master 20260322 221721 [화면 캡처 2026 03 03 150349 master 202026032]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221721 [화면 캡처 2026 03 03 150349 master 202026032]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190120/revision-arts/master%2020260322%20221721%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2003%20150349%20master%20202026032%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189419/revision-arts/prompt_20260322_221721_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-03_150349_master_202026032%5D",
        "assetId": "57fb13cdfa20f2b00b7bf06a8a760843",
        "uploadedAt": "2026-03-22T14:35:20Z"
    },
    {
        "id": "master 20260322 221723 [화면 캡처 2026 03 15 162248 a376a3 FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221723 [화면 캡처 2026 03 15 162248 a376a3 FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190080/revision-arts/master%2020260322%20221723%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20a376a3%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189419/revision-arts/prompt_20260322_221723_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_a376a3_FPS_origi%5D",
        "assetId": "ec02bb76274c88bc21954f4ce9665b9b",
        "uploadedAt": "2026-03-22T14:34:40Z"
    },
    {
        "id": "master 20260322 221748 [Please transform the 2k 202602030020 1 f]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221748 [Please transform the 2k 202602030020 1 f]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190046/revision-arts/master%2020260322%20221748%20%5BPlease%20transform%20the%202k%20202602030020%201%20f%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189418/revision-arts/prompt_20260322_221748_%5BPlease_transform_the_2k_202602030020_1_f%5D",
        "assetId": "af0033d8042f8b3f9e3a29eb621bf7a7",
        "uploadedAt": "2026-03-22T14:34:06Z"
    },
    {
        "id": "master 20260322 221750 [화면 캡처 2026 03 15 162248 a503b9 FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221750 [화면 캡처 2026 03 15 162248 a503b9 FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190009/revision-arts/master%2020260322%20221750%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20a503b9%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189417/revision-arts/prompt_20260322_221750_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_a503b9_FPS_origi%5D",
        "assetId": "e72304b3d7d3b86e05efa3a3c601de98",
        "uploadedAt": "2026-03-22T14:33:29Z"
    },
    {
        "id": "master 20260322 221751 [화면 캡처 2026 03 03 150349 master 202026032]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221751 [화면 캡처 2026 03 03 150349 master 202026032]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189977/revision-arts/master%2020260322%20221751%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2003%20150349%20master%20202026032%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189417/revision-arts/prompt_20260322_221751_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-03_150349_master_202026032%5D",
        "assetId": "de18352b53bdee8dd380e543a4a399b8",
        "uploadedAt": "2026-03-22T14:32:57Z"
    },
    {
        "id": "master 20260322 221754 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221754 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189942/revision-arts/master%2020260322%20221754%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189416/revision-arts/prompt_20260322_221754_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "69d24e4e9e52a7e18d177e86d1463973",
        "uploadedAt": "2026-03-22T14:32:22Z"
    },
    {
        "id": "master 20260322 221814 [Please transform the 2k 202602030020 1 f]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221814 [Please transform the 2k 202602030020 1 f]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189899/revision-arts/master%2020260322%20221814%20%5BPlease%20transform%20the%202k%20202602030020%201%20f%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189415/revision-arts/prompt_20260322_221814_%5BPlease_transform_the_2k_202602030020_1_f%5D",
        "assetId": "c85cf11417ae238b99c1f81ddcf0357d",
        "uploadedAt": "2026-03-22T14:31:39Z"
    },
    {
        "id": "master 20260322 221817 [화면 캡처 2026 03 15 162248 a6308e FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221817 [화면 캡처 2026 03 15 162248 a6308e FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189895/revision-arts/master%2020260322%20221817%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20a6308e%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189414/revision-arts/prompt_20260322_221817_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_a6308e_FPS_origi%5D",
        "assetId": "f427627fbd4821b2ba44cb99c4c84fdd",
        "uploadedAt": "2026-03-22T14:31:35Z"
    },
    {
        "id": "master 20260322 221826 [화면 캡처 2026 03 03 150349 master 202026032]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221826 [화면 캡처 2026 03 03 150349 master 202026032]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189889/revision-arts/master%2020260322%20221826%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2003%20150349%20master%20202026032%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189414/revision-arts/prompt_20260322_221826_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-03_150349_master_202026032%5D",
        "assetId": "2a0e4b676f912dd1d3edb3a3c2109704",
        "uploadedAt": "2026-03-22T14:31:29Z"
    },
    {
        "id": "master 20260322 221834 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221834 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189886/revision-arts/master%2020260322%20221834%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189413/revision-arts/prompt_20260322_221834_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "598a6797a7df039f8a6d87ee7dc4a7d4",
        "uploadedAt": "2026-03-22T14:31:26Z"
    },
    {
        "id": "master 20260322 221835 [Please transform the 2k 202602030020 1 f]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221835 [Please transform the 2k 202602030020 1 f]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189882/revision-arts/master%2020260322%20221835%20%5BPlease%20transform%20the%202k%20202602030020%201%20f%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189413/revision-arts/prompt_20260322_221835_%5BPlease_transform_the_2k_202602030020_1_f%5D",
        "assetId": "91dffa904a0ebe506f5c8581b85db2c6",
        "uploadedAt": "2026-03-22T14:31:22Z"
    },
    {
        "id": "master 20260322 221840 [화면 캡처 2026 03 15 162248 a25648 FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221840 [화면 캡처 2026 03 15 162248 a25648 FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189879/revision-arts/master%2020260322%20221840%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20a25648%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189412/revision-arts/prompt_20260322_221840_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_a25648_FPS_origi%5D",
        "assetId": "11450f96db32da72b5e2f5506f9e0305",
        "uploadedAt": "2026-03-22T14:31:19Z"
    },
    {
        "id": "master 20260322 221855 [화면 캡처 2026 03 03 150349 master 202026032]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221855 [화면 캡처 2026 03 03 150349 master 202026032]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189875/revision-arts/master%2020260322%20221855%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2003%20150349%20master%20202026032%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189411/revision-arts/prompt_20260322_221855_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-03_150349_master_202026032%5D",
        "assetId": "8560e2ecf2b925d7f83c94cc8b0d135e",
        "uploadedAt": "2026-03-22T14:31:15Z"
    },
    {
        "id": "master 20260322 221903 [Please transform the 2k 202602030020 1 f]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221903 [Please transform the 2k 202602030020 1 f]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189872/revision-arts/master%2020260322%20221903%20%5BPlease%20transform%20the%202k%20202602030020%201%20f%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189410/revision-arts/prompt_20260322_221903_%5BPlease_transform_the_2k_202602030020_1_f%5D",
        "assetId": "e98b4dafec341693d55f79cad7454b9c",
        "uploadedAt": "2026-03-22T14:31:12Z"
    },
    {
        "id": "master 20260322 221909 [화면 캡처 2026 03 15 162248 a35513 FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221909 [화면 캡처 2026 03 15 162248 a35513 FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189869/revision-arts/master%2020260322%20221909%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20a35513%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189409/revision-arts/prompt_20260322_221909_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_a35513_FPS_origi%5D",
        "assetId": "65337afe634109f765759805f63058ed",
        "uploadedAt": "2026-03-22T14:31:09Z"
    },
    {
        "id": "master 20260322 221911 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221911 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189865/revision-arts/master%2020260322%20221911%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189408/revision-arts/prompt_20260322_221911_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "becaba677dc10c2d39aa5a7d4824b6b6",
        "uploadedAt": "2026-03-22T14:31:05Z"
    },
    {
        "id": "master 20260322 221929 [화면 캡처 2026 03 03 150349 master 202026032]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221929 [화면 캡처 2026 03 03 150349 master 202026032]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189862/revision-arts/master%2020260322%20221929%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2003%20150349%20master%20202026032%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189408/revision-arts/prompt_20260322_221929_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-03_150349_master_202026032%5D",
        "assetId": "0a84f7c283e8cb76b92dedcbd1127c24",
        "uploadedAt": "2026-03-22T14:31:02Z"
    },
    {
        "id": "master 20260322 221931 [Please transform the 2k 202602030020 1 f]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221931 [Please transform the 2k 202602030020 1 f]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189859/revision-arts/master%2020260322%20221931%20%5BPlease%20transform%20the%202k%20202602030020%201%20f%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189407/revision-arts/prompt_20260322_221931_%5BPlease_transform_the_2k_202602030020_1_f%5D",
        "assetId": "5ada4c7566345ca3976b68b559b6785d",
        "uploadedAt": "2026-03-22T14:30:59Z"
    },
    {
        "id": "master 20260322 221937 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221937 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189856/revision-arts/master%2020260322%20221937%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189406/revision-arts/prompt_20260322_221937_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "a0a3bffd75b1fb77f044d87c69c0915e",
        "uploadedAt": "2026-03-22T14:30:56Z"
    },
    {
        "id": "master 20260322 221941 [화면 캡처 2026 03 15 162248 aa5625 FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221941 [화면 캡처 2026 03 15 162248 aa5625 FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189853/revision-arts/master%2020260322%20221941%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20aa5625%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189405/revision-arts/prompt_20260322_221941_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_aa5625_FPS_origi%5D",
        "assetId": "9503eb79fdcd10d58073441b55155412",
        "uploadedAt": "2026-03-22T14:30:53Z"
    },
    {
        "id": "master 20260322 221958 [Please transform the 2k 202602030020 1 f]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 221958 [Please transform the 2k 202602030020 1 f]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189850/revision-arts/master%2020260322%20221958%20%5BPlease%20transform%20the%202k%20202602030020%201%20f%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189404/revision-arts/prompt_20260322_221958_%5BPlease_transform_the_2k_202602030020_1_f%5D",
        "assetId": "a4f80279c7103b49decfb3d2117374e9",
        "uploadedAt": "2026-03-22T14:30:50Z"
    },
    {
        "id": "master 20260322 222002 [화면 캡처 2026 03 03 150349 master 202026032]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222002 [화면 캡처 2026 03 03 150349 master 202026032]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189846/revision-arts/master%2020260322%20222002%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2003%20150349%20master%20202026032%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189404/revision-arts/prompt_20260322_222002_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-03_150349_master_202026032%5D",
        "assetId": "c1945c3d778f86ba9aa9921d088a3ac9",
        "uploadedAt": "2026-03-22T14:30:46Z"
    },
    {
        "id": "master 20260322 222005 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222005 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189842/revision-arts/master%2020260322%20222005%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189403/revision-arts/prompt_20260322_222005_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "c59fd95e20b6ac14d54c928eb9e7f189",
        "uploadedAt": "2026-03-22T14:30:42Z"
    },
    {
        "id": "master 20260322 222006 [화면 캡처 2026 03 15 162248 abeda5 FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222006 [화면 캡처 2026 03 15 162248 abeda5 FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189836/revision-arts/master%2020260322%20222006%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20abeda5%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189402/revision-arts/prompt_20260322_222006_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_abeda5_FPS_origi%5D",
        "assetId": "6a15ba4159339a7c2ce3456edf7c5a13",
        "uploadedAt": "2026-03-22T14:30:36Z"
    },
    {
        "id": "master 20260322 222028 [Please transform the 2k 202602030020 1 f]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222028 [Please transform the 2k 202602030020 1 f]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189832/revision-arts/master%2020260322%20222028%20%5BPlease%20transform%20the%202k%20202602030020%201%20f%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189401/revision-arts/prompt_20260322_222028_%5BPlease_transform_the_2k_202602030020_1_f%5D",
        "assetId": "0e4abf290cb0695fc9e32f78bccff897",
        "uploadedAt": "2026-03-22T14:30:32Z"
    },
    {
        "id": "master 20260322 222035 [화면 캡처 2026 03 15 162248 ac9828 FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222035 [화면 캡처 2026 03 15 162248 ac9828 FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189829/revision-arts/master%2020260322%20222035%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20ac9828%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189400/revision-arts/prompt_20260322_222035_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_ac9828_FPS_origi%5D",
        "assetId": "b23a40f9c51207a2ac88e8c11d7086e1",
        "uploadedAt": "2026-03-22T14:30:29Z"
    },
    {
        "id": "master 20260322 222038 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222038 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189826/revision-arts/master%2020260322%20222038%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189400/revision-arts/prompt_20260322_222038_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "5814ddd78d4e7b535b76b76000744afb",
        "uploadedAt": "2026-03-22T14:30:26Z"
    },
    {
        "id": "master 20260322 222057 [Please transform the 2k 202602030020 1 f]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222057 [Please transform the 2k 202602030020 1 f]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189822/revision-arts/master%2020260322%20222057%20%5BPlease%20transform%20the%202k%20202602030020%201%20f%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189399/revision-arts/prompt_20260322_222057_%5BPlease_transform_the_2k_202602030020_1_f%5D",
        "assetId": "296ae30687c7dd8f51681fe463c48b32",
        "uploadedAt": "2026-03-22T14:30:22Z"
    },
    {
        "id": "master 20260322 222104 [화면 캡처 2026 03 15 162248 acd548 FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222104 [화면 캡처 2026 03 15 162248 acd548 FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189819/revision-arts/master%2020260322%20222104%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20acd548%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189398/revision-arts/prompt_20260322_222104_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_acd548_FPS_origi%5D",
        "assetId": "a0eddf1bfe12329f8a388aa9c407db15",
        "uploadedAt": "2026-03-22T14:30:19Z"
    },
    {
        "id": "master 20260322 222108 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222108 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189816/revision-arts/master%2020260322%20222108%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189397/revision-arts/prompt_20260322_222108_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "1f1589b5b8c6946b8b9bc663062a3c7b",
        "uploadedAt": "2026-03-22T14:30:16Z"
    },
    {
        "id": "master 20260322 222125 [Please transform the 2k 202602030020 1 f]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222125 [Please transform the 2k 202602030020 1 f]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189812/revision-arts/master%2020260322%20222125%20%5BPlease%20transform%20the%202k%20202602030020%201%20f%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189396/revision-arts/prompt_20260322_222125_%5BPlease_transform_the_2k_202602030020_1_f%5D",
        "assetId": "36b9f538586b9b98e7e9c4c82d04c6b0",
        "uploadedAt": "2026-03-22T14:30:12Z"
    },
    {
        "id": "master 20260322 222130 [화면 캡처 2026 03 03 150349 FPS 1 1]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222130 [화면 캡처 2026 03 03 150349 FPS 1 1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189808/revision-arts/master%2020260322%20222130%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2003%20150349%20FPS%201%201%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189395/revision-arts/prompt_20260322_222130_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-03_150349_FPS_1_1%5D",
        "assetId": "3c5f76dd60dbbce263be58804c8f8834",
        "uploadedAt": "2026-03-22T14:30:08Z"
    },
    {
        "id": "master 20260322 222136 [화면 캡처 2026 03 15 162248 ad8a76 FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222136 [화면 캡처 2026 03 15 162248 ad8a76 FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189804/revision-arts/master%2020260322%20222136%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20ad8a76%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189395/revision-arts/prompt_20260322_222136_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_ad8a76_FPS_origi%5D",
        "assetId": "7c3e3bdbfb156a80dcadd51f1dfa4b60",
        "uploadedAt": "2026-03-22T14:30:04Z"
    },
    {
        "id": "master 20260322 222144 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222144 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189800/revision-arts/master%2020260322%20222144%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189394/revision-arts/prompt_20260322_222144_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "17cf13399eb9924d48e3601fd60134df",
        "uploadedAt": "2026-03-22T14:30:00Z"
    },
    {
        "id": "master 20260322 222159 [화면 캡처 2026 03 15 162248 add8a6 FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222159 [화면 캡처 2026 03 15 162248 add8a6 FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189796/revision-arts/master%2020260322%20222159%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20add8a6%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189393/revision-arts/prompt_20260322_222159_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_add8a6_FPS_origi%5D",
        "assetId": "326a02653bdb34edbc736c006de2b71e",
        "uploadedAt": "2026-03-22T14:29:56Z"
    },
    {
        "id": "master 20260322 222203 [Please transform the 2k 202602030020 1 f]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222203 [Please transform the 2k 202602030020 1 f]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189793/revision-arts/master%2020260322%20222203%20%5BPlease%20transform%20the%202k%20202602030020%201%20f%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189392/revision-arts/prompt_20260322_222203_%5BPlease_transform_the_2k_202602030020_1_f%5D",
        "assetId": "28c0d46a1aec848fda49637d4b9327b1",
        "uploadedAt": "2026-03-22T14:29:53Z"
    },
    {
        "id": "master 20260322 222214 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222214 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189790/revision-arts/master%2020260322%20222214%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189391/revision-arts/prompt_20260322_222214_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "7f09b04d6aea50176463ab1babc2ae16",
        "uploadedAt": "2026-03-22T14:29:50Z"
    },
    {
        "id": "master 20260322 222226 [화면 캡처 2026 03 15 162248 adff9d FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222226 [화면 캡처 2026 03 15 162248 adff9d FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189786/revision-arts/master%2020260322%20222226%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20adff9d%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189391/revision-arts/prompt_20260322_222226_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_adff9d_FPS_origi%5D",
        "assetId": "c0cea18a37bf0826555b5e15ca67693a",
        "uploadedAt": "2026-03-22T14:29:46Z"
    },
    {
        "id": "master 20260322 222234 [Please transform the 2k 202602030020 1 f]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222234 [Please transform the 2k 202602030020 1 f]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189761/revision-arts/master%2020260322%20222234%20%5BPlease%20transform%20the%202k%20202602030020%201%20f%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189390/revision-arts/prompt_20260322_222234_%5BPlease_transform_the_2k_202602030020_1_f%5D",
        "assetId": "6bcdc87d6cfa416a2fb4c0d8324a819d",
        "uploadedAt": "2026-03-22T14:29:21Z"
    },
    {
        "id": "master 20260322 222242 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222242 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189754/revision-arts/master%2020260322%20222242%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189389/revision-arts/prompt_20260322_222242_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "87e589065761e8afb7e1c3eec7e9e42f",
        "uploadedAt": "2026-03-22T14:29:14Z"
    },
    {
        "id": "master 20260322 222305 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222305 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189741/revision-arts/master%2020260322%20222305%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189385/revision-arts/prompt_20260322_222305_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "a017b770041c7a0f70c0559cf3ee1a7d",
        "uploadedAt": "2026-03-22T14:29:01Z"
    },
    {
        "id": "master 20260322 222308 [화면 캡처 2026 03 03 150349 FPS 3 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222308 [화면 캡처 2026 03 03 150349 FPS 3 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189713/revision-arts/master%2020260322%20222308%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2003%20150349%20FPS%203%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189376/revision-arts/prompt_20260322_222308_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-03_150349_FPS_3_2%5D",
        "assetId": "b5012d7bad9b41b49e92de59eec2a74e",
        "uploadedAt": "2026-03-22T14:28:33Z"
    },
    {
        "id": "master 20260322 222326 [화면 캡처 2026 03 15 162248 ae6793 FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222326 [화면 캡처 2026 03 15 162248 ae6793 FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189738/revision-arts/master%2020260322%20222326%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20ae6793%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189384/revision-arts/prompt_20260322_222326_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_ae6793_FPS_origi%5D",
        "assetId": "d56a24ecf56fb4a64956ea22fcec29fa",
        "uploadedAt": "2026-03-22T14:28:58Z"
    },
    {
        "id": "master 20260322 222357 [화면 캡처 2026 03 15 162248 aedc9c FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222357 [화면 캡처 2026 03 15 162248 aedc9c FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189735/revision-arts/master%2020260322%20222357%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20aedc9c%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189383/revision-arts/prompt_20260322_222357_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_aedc9c_FPS_origi%5D",
        "assetId": "a28bf168d0d8e1885974a1b5d0a9d625",
        "uploadedAt": "2026-03-22T14:28:55Z"
    },
    {
        "id": "master 20260322 222400 [화면 캡처 2026 03 03 150349 FPS 3 4]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222400 [화면 캡처 2026 03 03 150349 FPS 3 4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189732/revision-arts/master%2020260322%20222400%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2003%20150349%20FPS%203%204%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189383/revision-arts/prompt_20260322_222400_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-03_150349_FPS_3_4%5D",
        "assetId": "79ff8f9153dc056e8dcde9733e9f538b",
        "uploadedAt": "2026-03-22T14:28:52Z"
    },
    {
        "id": "master 20260322 222401 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222401 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189729/revision-arts/master%2020260322%20222401%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189382/revision-arts/prompt_20260322_222401_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "f1ee899cfbeeafa5d63a8fecd2ae00b9",
        "uploadedAt": "2026-03-22T14:28:49Z"
    },
    {
        "id": "master 20260322 222421 [화면 캡처 2026 03 15 162248 aef816 FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222421 [화면 캡처 2026 03 15 162248 aef816 FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189722/revision-arts/master%2020260322%20222421%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20aef816%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189379/revision-arts/prompt_20260322_222421_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_aef816_FPS_origi%5D",
        "assetId": "b47adabda2874a60c466b6492159e4ae",
        "uploadedAt": "2026-03-22T14:28:42Z"
    },
    {
        "id": "master 20260322 222429 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222429 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189716/revision-arts/master%2020260322%20222429%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189377/revision-arts/prompt_20260322_222429_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "2c9ccf4f99305d03591927617251b69f",
        "uploadedAt": "2026-03-22T14:28:36Z"
    },
    {
        "id": "master 20260322 222429 [화면 캡처 2026 03 03 150349 FPS 4 3]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222429 [화면 캡처 2026 03 03 150349 FPS 4 3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189719/revision-arts/master%2020260322%20222429%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2003%20150349%20FPS%204%203%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189378/revision-arts/prompt_20260322_222429_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-03_150349_FPS_4_3%5D",
        "assetId": "26ba496061dae867e75be1c29378fed1",
        "uploadedAt": "2026-03-22T14:28:39Z"
    },
    {
        "id": "master 20260322 222447 [화면 캡처 2026 03 15 162248 afc940 FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222447 [화면 캡처 2026 03 15 162248 afc940 FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189710/revision-arts/master%2020260322%20222447%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20afc940%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189375/revision-arts/prompt_20260322_222447_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_afc940_FPS_origi%5D",
        "assetId": "2a9dd7fba0e181cfa5e6804c6bf53f3b",
        "uploadedAt": "2026-03-22T14:28:30Z"
    },
    {
        "id": "master 20260322 222454 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222454 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189707/revision-arts/master%2020260322%20222454%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189375/revision-arts/prompt_20260322_222454_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "2941e3e1f88da91a705474658dc4ab54",
        "uploadedAt": "2026-03-22T14:28:27Z"
    },
    {
        "id": "master 20260322 222457 [Please transform the 2k 202602030020 1 f]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222457 [Please transform the 2k 202602030020 1 f]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189703/revision-arts/master%2020260322%20222457%20%5BPlease%20transform%20the%202k%20202602030020%201%20f%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189374/revision-arts/prompt_20260322_222457_%5BPlease_transform_the_2k_202602030020_1_f%5D",
        "assetId": "556a5e24b513afa394a9c7ba0817d791",
        "uploadedAt": "2026-03-22T14:28:23Z"
    },
    {
        "id": "master 20260322 222513 [화면 캡처 2026 03 15 162248 b2ad23 FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222513 [화면 캡처 2026 03 15 162248 b2ad23 FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189680/revision-arts/master%2020260322%20222513%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20b2ad23%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189373/revision-arts/prompt_20260322_222513_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_b2ad23_FPS_origi%5D",
        "assetId": "9b9bd4a55c94d0806404762bdd22beac",
        "uploadedAt": "2026-03-22T14:28:00Z"
    },
    {
        "id": "master 20260322 222522 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222522 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189642/revision-arts/master%2020260322%20222522%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189373/revision-arts/prompt_20260322_222522_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "7114dd2a99ac3f447edb683ec0a1231e",
        "uploadedAt": "2026-03-22T14:27:22Z"
    },
    {
        "id": "master 20260322 222546 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222546 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189620/revision-arts/master%2020260322%20222546%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189372/revision-arts/prompt_20260322_222546_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "9f1a86013cd25b3375ca051a8ba01355",
        "uploadedAt": "2026-03-22T14:27:00Z"
    },
    {
        "id": "master 20260322 222600 [화면 캡처 2026 03 03 150349 FPS 21 9]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222600 [화면 캡처 2026 03 03 150349 FPS 21 9]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774190468/revision-arts/master%2020260322%20222600%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2003%20150349%20FPS%2021%209%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189371/revision-arts/prompt_20260322_222600_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-03_150349_FPS_21_9%5D",
        "assetId": "6fa5ede65b329973a4affa1cc487bc05",
        "uploadedAt": "2026-03-22T14:41:08Z"
    },
    {
        "id": "master 20260322 222610 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222610 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189599/revision-arts/master%2020260322%20222610%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189371/revision-arts/prompt_20260322_222610_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "f42345b89dff2b05c0ff01b060037783",
        "uploadedAt": "2026-03-22T14:26:39Z"
    },
    {
        "id": "master 20260322 222632 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222632 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189595/revision-arts/master%2020260322%20222632%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189370/revision-arts/prompt_20260322_222632_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "ed1899b6178edb3142eb359417f27151",
        "uploadedAt": "2026-03-22T14:26:35Z"
    },
    {
        "id": "master 20260322 222638 [화면 캡처 2026 03 15 162248 b8bf38 FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222638 [화면 캡처 2026 03 15 162248 b8bf38 FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189589/revision-arts/master%2020260322%20222638%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20b8bf38%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189369/revision-arts/prompt_20260322_222638_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_b8bf38_FPS_origi%5D",
        "assetId": "ac7954ac244dc93266b0bdf6c89ab9e0",
        "uploadedAt": "2026-03-22T14:26:29Z"
    },
    {
        "id": "master 20260322 222653 [Please transform the 2k 202602030020 1 f]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222653 [Please transform the 2k 202602030020 1 f]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189585/revision-arts/master%2020260322%20222653%20%5BPlease%20transform%20the%202k%20202602030020%201%20f%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189368/revision-arts/prompt_20260322_222653_%5BPlease_transform_the_2k_202602030020_1_f%5D",
        "assetId": "54c051bc5abe5a90db99fb683ea565fc",
        "uploadedAt": "2026-03-22T14:26:25Z"
    },
    {
        "id": "master 20260322 222657 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222657 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189582/revision-arts/master%2020260322%20222657%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189368/revision-arts/prompt_20260322_222657_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "eca8d449838ca9d2b25f07d9fc7bd165",
        "uploadedAt": "2026-03-22T14:26:22Z"
    },
    {
        "id": "master 20260322 222702 [화면 캡처 2026 03 15 162248 b9e4e3 FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222702 [화면 캡처 2026 03 15 162248 b9e4e3 FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189578/revision-arts/master%2020260322%20222702%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20b9e4e3%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189367/revision-arts/prompt_20260322_222702_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_b9e4e3_FPS_origi%5D",
        "assetId": "6e40626b0cab94dab4e88b46031db2d1",
        "uploadedAt": "2026-03-22T14:26:18Z"
    },
    {
        "id": "master 20260322 222724 [Please transform the 2k 202602030020 1 f]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222724 [Please transform the 2k 202602030020 1 f]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189572/revision-arts/master%2020260322%20222724%20%5BPlease%20transform%20the%202k%20202602030020%201%20f%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189366/revision-arts/prompt_20260322_222724_%5BPlease_transform_the_2k_202602030020_1_f%5D",
        "assetId": "e67af41235c85d71c86b78d3b4309bd5",
        "uploadedAt": "2026-03-22T14:26:12Z"
    },
    {
        "id": "master 20260322 222728 [화면 캡처 2026 03 15 162248 b48bfd FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222728 [화면 캡처 2026 03 15 162248 b48bfd FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189566/revision-arts/master%2020260322%20222728%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20b48bfd%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189365/revision-arts/prompt_20260322_222728_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_b48bfd_FPS_origi%5D",
        "assetId": "f165cc24f61b39a9eb05917ac988335c",
        "uploadedAt": "2026-03-22T14:26:06Z"
    },
    {
        "id": "master 20260322 222733 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222733 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189563/revision-arts/master%2020260322%20222733%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189364/revision-arts/prompt_20260322_222733_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "b0fcc06b449e7de129a2598e7f6c248b",
        "uploadedAt": "2026-03-22T14:26:03Z"
    },
    {
        "id": "master 20260322 222757 [화면 캡처 2026 03 15 162248 b87e09 FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222757 [화면 캡처 2026 03 15 162248 b87e09 FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189559/revision-arts/master%2020260322%20222757%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20b87e09%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189364/revision-arts/prompt_20260322_222757_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_b87e09_FPS_origi%5D",
        "assetId": "d4da18eea64875a0f5fab3444c8c3003",
        "uploadedAt": "2026-03-22T14:25:59Z"
    },
    {
        "id": "master 20260322 222801 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222801 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189556/revision-arts/master%2020260322%20222801%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189363/revision-arts/prompt_20260322_222801_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "032bfbec630fb13c59dba7facb93a50c",
        "uploadedAt": "2026-03-22T14:25:56Z"
    },
    {
        "id": "master 20260322 222824 [화면 캡처 2026 03 15 162248 b94caf FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222824 [화면 캡처 2026 03 15 162248 b94caf FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189553/revision-arts/master%2020260322%20222824%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20b94caf%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189362/revision-arts/prompt_20260322_222824_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_b94caf_FPS_origi%5D",
        "assetId": "4ea21a01535f883faa008b54ccd609cb",
        "uploadedAt": "2026-03-22T14:25:53Z"
    },
    {
        "id": "master 20260322 222830 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222830 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189549/revision-arts/master%2020260322%20222830%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189362/revision-arts/prompt_20260322_222830_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "4b173a961c1eb91f500723eee64c6df1",
        "uploadedAt": "2026-03-22T14:25:49Z"
    },
    {
        "id": "master 20260322 222844 [화면 캡처 2026 03 15 162248 b140bd FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222844 [화면 캡처 2026 03 15 162248 b140bd FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189546/revision-arts/master%2020260322%20222844%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20b140bd%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189361/revision-arts/prompt_20260322_222844_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_b140bd_FPS_origi%5D",
        "assetId": "77838849cba1a5793900504078c45800",
        "uploadedAt": "2026-03-22T14:25:46Z"
    },
    {
        "id": "master 20260322 222858 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222858 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189543/revision-arts/master%2020260322%20222858%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189360/revision-arts/prompt_20260322_222858_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "c10d39a957927e22b9d53b3f24d510d4",
        "uploadedAt": "2026-03-22T14:25:43Z"
    },
    {
        "id": "master 20260322 222922 [화면 캡처 2026 03 15 162248 b915d0 FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222922 [화면 캡처 2026 03 15 162248 b915d0 FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189538/revision-arts/master%2020260322%20222922%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20b915d0%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189359/revision-arts/prompt_20260322_222922_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_b915d0_FPS_origi%5D",
        "assetId": "504168599a5e480259ad870a42a2c340",
        "uploadedAt": "2026-03-22T14:25:38Z"
    },
    {
        "id": "master 20260322 222927 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222927 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189532/revision-arts/master%2020260322%20222927%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189359/revision-arts/prompt_20260322_222927_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "a8864503bada433654102d1c59b01e62",
        "uploadedAt": "2026-03-22T14:25:32Z"
    },
    {
        "id": "master 20260322 222943 [화면 캡처 2026 03 03 150349 FPS 5 4]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222943 [화면 캡처 2026 03 03 150349 FPS 5 4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189527/revision-arts/master%2020260322%20222943%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2003%20150349%20FPS%205%204%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189358/revision-arts/prompt_20260322_222943_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-03_150349_FPS_5_4%5D",
        "assetId": "2f43d2e3add219f4ad15801e04854542",
        "uploadedAt": "2026-03-22T14:25:27Z"
    },
    {
        "id": "master 20260322 222952 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222952 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189524/revision-arts/master%2020260322%20222952%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189357/revision-arts/prompt_20260322_222952_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "f41616772ad8e20c45ceebdc42afcda5",
        "uploadedAt": "2026-03-22T14:25:24Z"
    },
    {
        "id": "master 20260322 222953 [화면 캡처 2026 03 15 162248 b1572e FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 222953 [화면 캡처 2026 03 15 162248 b1572e FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189520/revision-arts/master%2020260322%20222953%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20b1572e%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189357/revision-arts/prompt_20260322_222953_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_b1572e_FPS_origi%5D",
        "assetId": "64f9454e7645aba0f630c073bd9e83b2",
        "uploadedAt": "2026-03-22T14:25:20Z"
    },
    {
        "id": "master 20260322 223019 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 223019 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189513/revision-arts/master%2020260322%20223019%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189355/revision-arts/prompt_20260322_223019_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "eec01459aac4c3392d0fee40a9eb1d00",
        "uploadedAt": "2026-03-22T14:25:13Z"
    },
    {
        "id": "master 20260322 223019 [화면 캡처 2026 03 15 162248 b32490 FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 223019 [화면 캡처 2026 03 15 162248 b32490 FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189516/revision-arts/master%2020260322%20223019%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20b32490%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189356/revision-arts/prompt_20260322_223019_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_b32490_FPS_origi%5D",
        "assetId": "baca37e22368fe74f8141ee6ff2ab77d",
        "uploadedAt": "2026-03-22T14:25:16Z"
    },
    {
        "id": "master 20260322 223048 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 223048 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189509/revision-arts/master%2020260322%20223048%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189355/revision-arts/prompt_20260322_223048_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "57887c47ef6de3dfb3408c17b819bc6e",
        "uploadedAt": "2026-03-22T14:25:09Z"
    },
    {
        "id": "master 20260322 223051 [Please transform the 2k 202602030020 1 M]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 223051 [Please transform the 2k 202602030020 1 M]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189506/revision-arts/master%2020260322%20223051%20%5BPlease%20transform%20the%202k%20202602030020%201%20M%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189354/revision-arts/prompt_20260322_223051_%5BPlease_transform_the_2k_202602030020_1_M%5D",
        "assetId": "1a65a644a2263c1f8430a7ebbf6a3280",
        "uploadedAt": "2026-03-22T14:25:06Z"
    },
    {
        "id": "master 20260322 223119 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 223119 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189503/revision-arts/master%2020260322%20223119%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189353/revision-arts/prompt_20260322_223119_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "ca8b60f9a1bc57fede7c92b50e16d642",
        "uploadedAt": "2026-03-22T14:25:03Z"
    },
    {
        "id": "master 20260322 223126 [화면 캡처 2026 03 15 162248 b11562 FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 223126 [화면 캡처 2026 03 15 162248 b11562 FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189499/revision-arts/master%2020260322%20223126%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20b11562%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189353/revision-arts/prompt_20260322_223126_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_b11562_FPS_origi%5D",
        "assetId": "b5baae8cc2c20f57076f712e031ef9f3",
        "uploadedAt": "2026-03-22T14:24:59Z"
    },
    {
        "id": "master 20260322 223145 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 223145 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189496/revision-arts/master%2020260322%20223145%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189352/revision-arts/prompt_20260322_223145_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "6c0175de02b72706fd5919e7da5d5a6f",
        "uploadedAt": "2026-03-22T14:24:56Z"
    },
    {
        "id": "master 20260322 223155 [화면 캡처 2026 03 15 162248 b18421 FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 223155 [화면 캡처 2026 03 15 162248 b18421 FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189493/revision-arts/master%2020260322%20223155%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20b18421%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189351/revision-arts/prompt_20260322_223155_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_b18421_FPS_origi%5D",
        "assetId": "711bf48e5173aaf3f15d06810c4ba632",
        "uploadedAt": "2026-03-22T14:24:53Z"
    },
    {
        "id": "master 20260322 223214 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 223214 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189490/revision-arts/master%2020260322%20223214%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189351/revision-arts/prompt_20260322_223214_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "4db12bf1acf8b2fd0bafb5e1c47ae6ab",
        "uploadedAt": "2026-03-22T14:24:50Z"
    },
    {
        "id": "master 20260322 223222 [화면 캡처 2026 03 15 162248 bb4874 FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 223222 [화면 캡처 2026 03 15 162248 bb4874 FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774189486/revision-arts/master%2020260322%20223222%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20bb4874%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774189350/revision-arts/prompt_20260322_223222_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_bb4874_FPS_origi%5D",
        "assetId": "9654af3875c05e05e0f8231689805b05",
        "uploadedAt": "2026-03-22T14:24:46Z"
    },
    {
        "id": "master 20260322 223243 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 223243 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188566/revision-arts/master%2020260322%20223243%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188488/revision-arts/prompt_20260322_223243_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "c6f2ef81976e5a175a566023ceff8fb3",
        "uploadedAt": "2026-03-22T14:09:26Z"
    },
    {
        "id": "master 20260322 223243 [화면 캡처 2026 03 15 162248 bc60f8 FPS origi]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 223243 [화면 캡처 2026 03 15 162248 bc60f8 FPS origi]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188569/revision-arts/master%2020260322%20223243%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2015%20162248%20bc60f8%20FPS%20origi%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188489/revision-arts/prompt_20260322_223243_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-15_162248_bc60f8_FPS_origi%5D",
        "assetId": "1a1a0cea6757b2cb51d9a3f75e25d652",
        "uploadedAt": "2026-03-22T14:09:29Z"
    },
    {
        "id": "master 20260322 223332 [Please transform the 2k 202602030020 1 t]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 223332 [Please transform the 2k 202602030020 1 t]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188849/revision-arts/master%2020260322%20223332%20%5BPlease%20transform%20the%202k%20202602030020%201%20t%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188488/revision-arts/prompt_20260322_223332_%5BPlease_transform_the_2k_202602030020_1_t%5D",
        "assetId": "73f18d903933e18b2629f619746cdfe7",
        "uploadedAt": "2026-03-22T14:14:09Z"
    },
    {
        "id": "master 20260322 223435 [master 2020260321 20105419 20 5Bdb64d5 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 223435 [master 2020260321 20105419 20 5Bdb64d5 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188846/revision-arts/master%2020260322%20223435%20%5Bmaster%202020260321%2020105419%2020%205Bdb64d5%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188556/revision-arts/prompt_20260322_223435_%5Bmaster_2020260321_20105419_20_5Bdb64d5_2%5D",
        "assetId": "6337fc3c46a998b6b92680fe87114efd",
        "uploadedAt": "2026-03-22T14:14:06Z"
    },
    {
        "id": "master 20260322 223512 [master 2020260321 20104331 20 5B05d94b 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 223512 [master 2020260321 20104331 20 5B05d94b 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188842/revision-arts/master%2020260322%20223512%20%5Bmaster%202020260321%2020104331%2020%205B05d94b%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188555/revision-arts/prompt_20260322_223512_%5Bmaster_2020260321_20104331_20_5B05d94b_2%5D",
        "assetId": "c978c39c885e825bf92b1f03e557e539",
        "uploadedAt": "2026-03-22T14:14:02Z"
    },
    {
        "id": "master 20260322 223517 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 223517 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188836/revision-arts/master%2020260322%20223517%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188555/revision-arts/prompt_20260322_223517_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "eae4e430a475b76be0929d53eb26d04e",
        "uploadedAt": "2026-03-22T14:13:56Z"
    },
    {
        "id": "master 20260322 223535 [master 2020260321 20105419 20 5Bdb64d5 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 223535 [master 2020260321 20105419 20 5Bdb64d5 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188831/revision-arts/master%2020260322%20223535%20%5Bmaster%202020260321%2020105419%2020%205Bdb64d5%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188554/revision-arts/prompt_20260322_223535_%5Bmaster_2020260321_20105419_20_5Bdb64d5_2%5D",
        "assetId": "00369c999fdb24e403f8c76858f631a5",
        "uploadedAt": "2026-03-22T14:13:51Z"
    },
    {
        "id": "master 20260322 223544 [master 2020260321 20105552 20 5B88a47b 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 223544 [master 2020260321 20105552 20 5B88a47b 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188827/revision-arts/master%2020260322%20223544%20%5Bmaster%202020260321%2020105552%2020%205B88a47b%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188553/revision-arts/prompt_20260322_223544_%5Bmaster_2020260321_20105552_20_5B88a47b_2%5D",
        "assetId": "8b9c7764f435cac383eb02a3552f54d3",
        "uploadedAt": "2026-03-22T14:13:47Z"
    },
    {
        "id": "master 20260322 223547 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 223547 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188822/revision-arts/master%2020260322%20223547%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188552/revision-arts/prompt_20260322_223547_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "d83ddb84e3d2d87333144b78e117283b",
        "uploadedAt": "2026-03-22T14:13:42Z"
    },
    {
        "id": "master 20260322 223611 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 223611 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188819/revision-arts/master%2020260322%20223611%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188551/revision-arts/prompt_20260322_223611_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "a8debabdc8c4ba4ec4e9a97451997028",
        "uploadedAt": "2026-03-22T14:13:39Z"
    },
    {
        "id": "master 20260322 223613 [master 2020260321 20104331 20 5B05d94b 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 223613 [master 2020260321 20104331 20 5B05d94b 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188813/revision-arts/master%2020260322%20223613%20%5Bmaster%202020260321%2020104331%2020%205B05d94b%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188551/revision-arts/prompt_20260322_223613_%5Bmaster_2020260321_20104331_20_5B05d94b_2%5D",
        "assetId": "79bf5b7fce786c7c8e4012193e932f8e",
        "uploadedAt": "2026-03-22T14:13:33Z"
    },
    {
        "id": "master 20260322 223613 [master 2020260321 20105131 20 5Bd3f6a5 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 223613 [master 2020260321 20105131 20 5Bd3f6a5 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188816/revision-arts/master%2020260322%20223613%20%5Bmaster%202020260321%2020105131%2020%205Bd3f6a5%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188550/revision-arts/prompt_20260322_223613_%5Bmaster_2020260321_20105131_20_5Bd3f6a5_2%5D",
        "assetId": "802813197518f601fd97bff048194930",
        "uploadedAt": "2026-03-22T14:13:36Z"
    },
    {
        "id": "master 20260322 223633 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 223633 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188810/revision-arts/master%2020260322%20223633%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188549/revision-arts/prompt_20260322_223633_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "f725687928762f2260891a96e6e098fb",
        "uploadedAt": "2026-03-22T14:13:30Z"
    },
    {
        "id": "master 20260322 223644 [master 2020260321 20105658 20 5B1bc171 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 223644 [master 2020260321 20105658 20 5B1bc171 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188806/revision-arts/master%2020260322%20223644%20%5Bmaster%202020260321%2020105658%2020%205B1bc171%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188549/revision-arts/prompt_20260322_223644_%5Bmaster_2020260321_20105658_20_5B1bc171_2%5D",
        "assetId": "ec7d9aae25b8ac1b68c73513fab53e34",
        "uploadedAt": "2026-03-22T14:13:26Z"
    },
    {
        "id": "master 20260322 223646 [master 2020260321 20105552 20 5B88a47b 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 223646 [master 2020260321 20105552 20 5B88a47b 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188803/revision-arts/master%2020260322%20223646%20%5Bmaster%202020260321%2020105552%2020%205B88a47b%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188548/revision-arts/prompt_20260322_223646_%5Bmaster_2020260321_20105552_20_5B88a47b_2%5D",
        "assetId": "6aa5aef794bd3d7bc67bc1c13aaf751c",
        "uploadedAt": "2026-03-22T14:13:23Z"
    },
    {
        "id": "master 20260322 223701 [Gemini Generated Image m02hw9m02hw9m02h]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 223701 [Gemini Generated Image m02hw9m02hw9m02h]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188800/revision-arts/master%2020260322%20223701%20%5BGemini%20Generated%20Image%20m02hw9m02hw9m02h%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188547/revision-arts/prompt_20260322_223701_%5BGemini_Generated_Image_m02hw9m02hw9m02h%5D",
        "assetId": "8515163f989668aa40faee35fd514934",
        "uploadedAt": "2026-03-22T14:13:20Z"
    },
    {
        "id": "master 20260322 223715 [master 2020260321 20105131 20 5Bd3f6a5 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 223715 [master 2020260321 20105131 20 5Bd3f6a5 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188797/revision-arts/master%2020260322%20223715%20%5Bmaster%202020260321%2020105131%2020%205Bd3f6a5%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188546/revision-arts/prompt_20260322_223715_%5Bmaster_2020260321_20105131_20_5Bd3f6a5_2%5D",
        "assetId": "0275940614efde8129676843256877b7",
        "uploadedAt": "2026-03-22T14:13:17Z"
    },
    {
        "id": "master 20260322 223722 [master 2020260321 20105903 20 5B6dd0bb 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 223722 [master 2020260321 20105903 20 5B6dd0bb 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188793/revision-arts/master%2020260322%20223722%20%5Bmaster%202020260321%2020105903%2020%205B6dd0bb%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188545/revision-arts/prompt_20260322_223722_%5Bmaster_2020260321_20105903_20_5B6dd0bb_2%5D",
        "assetId": "7f44d2c6a801ec25f8a25e0d77815a32",
        "uploadedAt": "2026-03-22T14:13:13Z"
    },
    {
        "id": "master 20260322 223724 [화면 캡처 2026 03 03 150349 PFS 21 9]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 223724 [화면 캡처 2026 03 03 150349 PFS 21 9]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188790/revision-arts/master%2020260322%20223724%20%5B%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202026%2003%2003%20150349%20PFS%2021%209%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188544/revision-arts/prompt_20260322_223724_%5B%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-03-03_150349_PFS_21_9%5D",
        "assetId": "7b45c935b23bfff3a0dc9f128594e0b4",
        "uploadedAt": "2026-03-22T14:13:10Z"
    },
    {
        "id": "master 20260322 223744 [master 2020260321 20105658 20 5B1bc171 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 223744 [master 2020260321 20105658 20 5B1bc171 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188786/revision-arts/master%2020260322%20223744%20%5Bmaster%202020260321%2020105658%2020%205B1bc171%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188544/revision-arts/prompt_20260322_223744_%5Bmaster_2020260321_20105658_20_5B1bc171_2%5D",
        "assetId": "60c65c037a222c354f5fbd2eb4617568",
        "uploadedAt": "2026-03-22T14:13:06Z"
    },
    {
        "id": "master 20260322 223754 [master 2020260321 20105800 20 5B85c0b9 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 223754 [master 2020260321 20105800 20 5B85c0b9 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188783/revision-arts/master%2020260322%20223754%20%5Bmaster%202020260321%2020105800%2020%205B85c0b9%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188543/revision-arts/prompt_20260322_223754_%5Bmaster_2020260321_20105800_20_5B85c0b9_2%5D",
        "assetId": "a0aa5588573a838f354212ab720b022c",
        "uploadedAt": "2026-03-22T14:13:03Z"
    },
    {
        "id": "master 20260322 223813 [master 2020260321 20105419 20 5Bdb64d5 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 223813 [master 2020260321 20105419 20 5Bdb64d5 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188780/revision-arts/master%2020260322%20223813%20%5Bmaster%202020260321%2020105419%2020%205Bdb64d5%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188542/revision-arts/prompt_20260322_223813_%5Bmaster_2020260321_20105419_20_5Bdb64d5_2%5D",
        "assetId": "62355f23fb1d563ea3ef5d3cca4330b0",
        "uploadedAt": "2026-03-22T14:13:00Z"
    },
    {
        "id": "master 20260322 223814 [master 2020260321 20105903 20 5B6dd0bb 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 223814 [master 2020260321 20105903 20 5B6dd0bb 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188777/revision-arts/master%2020260322%20223814%20%5Bmaster%202020260321%2020105903%2020%205B6dd0bb%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188541/revision-arts/prompt_20260322_223814_%5Bmaster_2020260321_20105903_20_5B6dd0bb_2%5D",
        "assetId": "69ff347fcd061f7d717d8a90536409e8",
        "uploadedAt": "2026-03-22T14:12:57Z"
    },
    {
        "id": "master 20260322 223832 [master 2020260321 20104404 20 5Bd13210 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 223832 [master 2020260321 20104404 20 5Bd13210 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188774/revision-arts/master%2020260322%20223832%20%5Bmaster%202020260321%2020104404%2020%205Bd13210%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188540/revision-arts/prompt_20260322_223832_%5Bmaster_2020260321_20104404_20_5Bd13210_2%5D",
        "assetId": "e6971ba0c2b58ffe6113e149ae5fd923",
        "uploadedAt": "2026-03-22T14:12:54Z"
    },
    {
        "id": "master 20260322 223846 [master 2020260321 20105800 20 5B85c0b9 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 223846 [master 2020260321 20105800 20 5B85c0b9 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188771/revision-arts/master%2020260322%20223846%20%5Bmaster%202020260321%2020105800%2020%205B85c0b9%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188539/revision-arts/prompt_20260322_223846_%5Bmaster_2020260321_20105800_20_5B85c0b9_2%5D",
        "assetId": "0de84291f38c91b00108c993644ae279",
        "uploadedAt": "2026-03-22T14:12:51Z"
    },
    {
        "id": "master 20260322 223906 [master 2020260321 20105101 20 5B755df5 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 223906 [master 2020260321 20105101 20 5B755df5 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188767/revision-arts/master%2020260322%20223906%20%5Bmaster%202020260321%2020105101%2020%205B755df5%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188539/revision-arts/prompt_20260322_223906_%5Bmaster_2020260321_20105101_20_5B755df5_2%5D",
        "assetId": "a3dae4cfecd68ad83eeeb806b98e0180",
        "uploadedAt": "2026-03-22T14:12:47Z"
    },
    {
        "id": "master 20260322 223937 [master 2020260321 20105451 20 5Bf76d34 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 223937 [master 2020260321 20105451 20 5Bf76d34 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188763/revision-arts/master%2020260322%20223937%20%5Bmaster%202020260321%2020105451%2020%205Bf76d34%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188538/revision-arts/prompt_20260322_223937_%5Bmaster_2020260321_20105451_20_5Bf76d34_2%5D",
        "assetId": "a5750f06ee83bf8e1c9db179cc05d644",
        "uploadedAt": "2026-03-22T14:12:43Z"
    },
    {
        "id": "master 20260322 224015 [master 2020260321 20104437 20 5B9536aa 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 224015 [master 2020260321 20104437 20 5B9536aa 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188760/revision-arts/master%2020260322%20224015%20%5Bmaster%202020260321%2020104437%2020%205B9536aa%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188537/revision-arts/prompt_20260322_224015_%5Bmaster_2020260321_20104437_20_5B9536aa_2%5D",
        "assetId": "e87a8768bdfab5003ab9ae860421258d",
        "uploadedAt": "2026-03-22T14:12:40Z"
    },
    {
        "id": "master 20260322 224033 [master 2020260321 20105419 20 5Bdb64d5 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 224033 [master 2020260321 20105419 20 5Bdb64d5 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188757/revision-arts/master%2020260322%20224033%20%5Bmaster%202020260321%2020105419%2020%205Bdb64d5%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188536/revision-arts/prompt_20260322_224033_%5Bmaster_2020260321_20105419_20_5Bdb64d5_2%5D",
        "assetId": "bfd0d25cab03d0757941433f0643bbff",
        "uploadedAt": "2026-03-22T14:12:37Z"
    },
    {
        "id": "master 20260322 224102 [master 2020260321 20103507 20 5Be35df2 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 224102 [master 2020260321 20103507 20 5Be35df2 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188754/revision-arts/master%2020260322%20224102%20%5Bmaster%202020260321%2020103507%2020%205Be35df2%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188535/revision-arts/prompt_20260322_224102_%5Bmaster_2020260321_20103507_20_5Be35df2_2%5D",
        "assetId": "9dc26b2afd702eee8f42e95079488c0c",
        "uploadedAt": "2026-03-22T14:12:34Z"
    },
    {
        "id": "master 20260322 224106 [master 2020260321 20104331 20 5B05d94b 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 224106 [master 2020260321 20104331 20 5B05d94b 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188751/revision-arts/master%2020260322%20224106%20%5Bmaster%202020260321%2020104331%2020%205B05d94b%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188535/revision-arts/prompt_20260322_224106_%5Bmaster_2020260321_20104331_20_5B05d94b_2%5D",
        "assetId": "152c77ce0117892e416dc29af8c9bc11",
        "uploadedAt": "2026-03-22T14:12:31Z"
    },
    {
        "id": "master 20260322 224136 [master 2020260321 20103800 20 5B5dcb1d 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 224136 [master 2020260321 20103800 20 5B5dcb1d 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188748/revision-arts/master%2020260322%20224136%20%5Bmaster%202020260321%2020103800%2020%205B5dcb1d%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188534/revision-arts/prompt_20260322_224136_%5Bmaster_2020260321_20103800_20_5B5dcb1d_2%5D",
        "assetId": "5729fefecd3254b3e2454a9d036aae89",
        "uploadedAt": "2026-03-22T14:12:28Z"
    },
    {
        "id": "master 20260322 224137 [master 2020260321 20105552 20 5B88a47b 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 224137 [master 2020260321 20105552 20 5B88a47b 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188745/revision-arts/master%2020260322%20224137%20%5Bmaster%202020260321%2020105552%2020%205B88a47b%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188533/revision-arts/prompt_20260322_224137_%5Bmaster_2020260321_20105552_20_5B88a47b_2%5D",
        "assetId": "d00d11c597a9aecefcdb0677053f8813",
        "uploadedAt": "2026-03-22T14:12:25Z"
    },
    {
        "id": "master 20260322 224155 [master 2020260321 20105101 20 5B755df5 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 224155 [master 2020260321 20105101 20 5B755df5 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188741/revision-arts/master%2020260322%20224155%20%5Bmaster%202020260321%2020105101%2020%205B755df5%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188533/revision-arts/prompt_20260322_224155_%5Bmaster_2020260321_20105101_20_5B755df5_2%5D",
        "assetId": "f7e3e16eda430ffb03711e90a66d6faa",
        "uploadedAt": "2026-03-22T14:12:21Z"
    },
    {
        "id": "master 20260322 224210 [master 2020260321 20105131 20 5Bd3f6a5 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 224210 [master 2020260321 20105131 20 5Bd3f6a5 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188735/revision-arts/master%2020260322%20224210%20%5Bmaster%202020260321%2020105131%2020%205Bd3f6a5%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188531/revision-arts/prompt_20260322_224210_%5Bmaster_2020260321_20105131_20_5Bd3f6a5_2%5D",
        "assetId": "f77977bafd69749c228e7e58d9906d11",
        "uploadedAt": "2026-03-22T14:12:15Z"
    },
    {
        "id": "master 20260322 224211 [master 2020260321 20110554 20 5B520ecc 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 224211 [master 2020260321 20110554 20 5B520ecc 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188738/revision-arts/master%2020260322%20224211%20%5Bmaster%202020260321%2020110554%2020%205B520ecc%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188532/revision-arts/prompt_20260322_224211_%5Bmaster_2020260321_20110554_20_5B520ecc_2%5D",
        "assetId": "4dd33b94507f0275d86e9331b7c8b60f",
        "uploadedAt": "2026-03-22T14:12:18Z"
    },
    {
        "id": "master 20260322 224230 [master 2020260321 20105451 20 5Bf76d34 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 224230 [master 2020260321 20105451 20 5Bf76d34 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188731/revision-arts/master%2020260322%20224230%20%5Bmaster%202020260321%2020105451%2020%205Bf76d34%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188530/revision-arts/prompt_20260322_224230_%5Bmaster_2020260321_20105451_20_5Bf76d34_2%5D",
        "assetId": "11ce37ca9c458970e4725d952cd1bc8d",
        "uploadedAt": "2026-03-22T14:12:11Z"
    },
    {
        "id": "master 20260322 224241 [master 2020260321 20105658 20 5B1bc171 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 224241 [master 2020260321 20105658 20 5B1bc171 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188728/revision-arts/master%2020260322%20224241%20%5Bmaster%202020260321%2020105658%2020%205B1bc171%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188529/revision-arts/prompt_20260322_224241_%5Bmaster_2020260321_20105658_20_5B1bc171_2%5D",
        "assetId": "c22baa559edf4938e7815bf9894dc385",
        "uploadedAt": "2026-03-22T14:12:08Z"
    },
    {
        "id": "master 20260322 224241 [master 2020260321 20110238 20 5B9046d3 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 224241 [master 2020260321 20110238 20 5B9046d3 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188725/revision-arts/master%2020260322%20224241%20%5Bmaster%202020260321%2020110238%2020%205B9046d3%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188528/revision-arts/prompt_20260322_224241_%5Bmaster_2020260321_20110238_20_5B9046d3_2%5D",
        "assetId": "0e4d2b1fa2fd7d895b9ca671808032e3",
        "uploadedAt": "2026-03-22T14:12:05Z"
    },
    {
        "id": "master 20260322 224302 [master 2020260321 20104437 20 5B9536aa 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 224302 [master 2020260321 20104437 20 5B9536aa 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188722/revision-arts/master%2020260322%20224302%20%5Bmaster%202020260321%2020104437%2020%205B9536aa%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188526/revision-arts/prompt_20260322_224302_%5Bmaster_2020260321_20104437_20_5B9536aa_2%5D",
        "assetId": "53d9952fa4faeed976b0bf16ca736fab",
        "uploadedAt": "2026-03-22T14:12:02Z"
    },
    {
        "id": "master 20260322 224312 [master 2020260321 20110523 20 5B75dff4 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 224312 [master 2020260321 20110523 20 5B75dff4 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188719/revision-arts/master%2020260322%20224312%20%5Bmaster%202020260321%2020110523%2020%205B75dff4%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188525/revision-arts/prompt_20260322_224312_%5Bmaster_2020260321_20110523_20_5B75dff4_2%5D",
        "assetId": "a77d3bb999ac38c8bcd1174a3955218c",
        "uploadedAt": "2026-03-22T14:11:59Z"
    },
    {
        "id": "master 20260322 224314 [master 2020260321 20105903 20 5B6dd0bb 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 224314 [master 2020260321 20105903 20 5B6dd0bb 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188715/revision-arts/master%2020260322%20224314%20%5Bmaster%202020260321%2020105903%2020%205B6dd0bb%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188525/revision-arts/prompt_20260322_224314_%5Bmaster_2020260321_20105903_20_5B6dd0bb_2%5D",
        "assetId": "51f9b983a1c749592155ab556c5a85d3",
        "uploadedAt": "2026-03-22T14:11:55Z"
    },
    {
        "id": "master 20260322 224337 [master 2020260321 20103507 20 5Be35df2 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 224337 [master 2020260321 20103507 20 5Be35df2 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188712/revision-arts/master%2020260322%20224337%20%5Bmaster%202020260321%2020103507%2020%205Be35df2%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188524/revision-arts/prompt_20260322_224337_%5Bmaster_2020260321_20103507_20_5Be35df2_2%5D",
        "assetId": "88ea858c3c546821b2db0e9cbe379ffd",
        "uploadedAt": "2026-03-22T14:11:52Z"
    },
    {
        "id": "master 20260322 224344 [master 2020260321 20104829 20 5B78921f 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 224344 [master 2020260321 20104829 20 5B78921f 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188709/revision-arts/master%2020260322%20224344%20%5Bmaster%202020260321%2020104829%2020%205B78921f%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188523/revision-arts/prompt_20260322_224344_%5Bmaster_2020260321_20104829_20_5B78921f_2%5D",
        "assetId": "2da4039a3b5a5c5144ff20f10d34f83b",
        "uploadedAt": "2026-03-22T14:11:49Z"
    },
    {
        "id": "master 20260322 224346 [master 2020260321 20105800 20 5B85c0b9 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 224346 [master 2020260321 20105800 20 5B85c0b9 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188705/revision-arts/master%2020260322%20224346%20%5Bmaster%202020260321%2020105800%2020%205B85c0b9%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188523/revision-arts/prompt_20260322_224346_%5Bmaster_2020260321_20105800_20_5B85c0b9_2%5D",
        "assetId": "c27712c3af492978d918e38a3f8b86b9",
        "uploadedAt": "2026-03-22T14:11:45Z"
    },
    {
        "id": "master 20260322 224412 [master 2020260321 20103800 20 5B5dcb1d 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 224412 [master 2020260321 20103800 20 5B5dcb1d 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188703/revision-arts/master%2020260322%20224412%20%5Bmaster%202020260321%2020103800%2020%205B5dcb1d%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188521/revision-arts/prompt_20260322_224412_%5Bmaster_2020260321_20103800_20_5B5dcb1d_2%5D",
        "assetId": "32031f6a0ff7ece53fd2be04b1402508",
        "uploadedAt": "2026-03-22T14:11:43Z"
    },
    {
        "id": "master 20260322 224413 [master 2020260321 20110308 20 5Bbf5fdb 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 224413 [master 2020260321 20110308 20 5Bbf5fdb 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188700/revision-arts/master%2020260322%20224413%20%5Bmaster%202020260321%2020110308%2020%205Bbf5fdb%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188522/revision-arts/prompt_20260322_224413_%5Bmaster_2020260321_20110308_20_5Bbf5fdb_2%5D",
        "assetId": "7cbab9e8f875a8697d248a05dfaa427b",
        "uploadedAt": "2026-03-22T14:11:40Z"
    },
    {
        "id": "master 20260322 224420 [master 2020260321 20104404 20 5Bd13210 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 224420 [master 2020260321 20104404 20 5Bd13210 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188697/revision-arts/master%2020260322%20224420%20%5Bmaster%202020260321%2020104404%2020%205Bd13210%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188520/revision-arts/prompt_20260322_224420_%5Bmaster_2020260321_20104404_20_5Bd13210_2%5D",
        "assetId": "103e2fd59177d2acc82ec43e3d158a0d",
        "uploadedAt": "2026-03-22T14:11:37Z"
    },
    {
        "id": "master 20260322 224442 [master 2020260321 20105936 20 5Bb02be4 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 224442 [master 2020260321 20105936 20 5Bb02be4 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188694/revision-arts/master%2020260322%20224442%20%5Bmaster%202020260321%2020105936%2020%205Bb02be4%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188520/revision-arts/prompt_20260322_224442_%5Bmaster_2020260321_20105936_20_5Bb02be4_2%5D",
        "assetId": "2b8ab45a568390f0b94046ef0b994f9a",
        "uploadedAt": "2026-03-22T14:11:34Z"
    },
    {
        "id": "master 20260322 224445 [master 2020260321 20110554 20 5B520ecc 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 224445 [master 2020260321 20110554 20 5B520ecc 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188691/revision-arts/master%2020260322%20224445%20%5Bmaster%202020260321%2020110554%2020%205B520ecc%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188519/revision-arts/prompt_20260322_224445_%5Bmaster_2020260321_20110554_20_5B520ecc_2%5D",
        "assetId": "62093b8c93ad0303f28056d0cab67365",
        "uploadedAt": "2026-03-22T14:11:31Z"
    },
    {
        "id": "master 20260322 224449 [master 2020260321 20105101 20 5B755df5 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 224449 [master 2020260321 20105101 20 5B755df5 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188688/revision-arts/master%2020260322%20224449%20%5Bmaster%202020260321%2020105101%2020%205B755df5%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188518/revision-arts/prompt_20260322_224449_%5Bmaster_2020260321_20105101_20_5B755df5_2%5D",
        "assetId": "d40b992a6b7d3036e40ab333efdfae9a",
        "uploadedAt": "2026-03-22T14:11:28Z"
    },
    {
        "id": "master 20260322 224515 [master 2020260321 20110137 20 5B7a49b4 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 224515 [master 2020260321 20110137 20 5B7a49b4 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188684/revision-arts/master%2020260322%20224515%20%5Bmaster%202020260321%2020110137%2020%205B7a49b4%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188517/revision-arts/prompt_20260322_224515_%5Bmaster_2020260321_20110137_20_5B7a49b4_2%5D",
        "assetId": "96a49fa28810a1cbb1ae4c32fdfa4b35",
        "uploadedAt": "2026-03-22T14:11:24Z"
    },
    {
        "id": "master 20260322 224517 [master 2020260321 20110238 20 5B9046d3 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 224517 [master 2020260321 20110238 20 5B9046d3 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188680/revision-arts/master%2020260322%20224517%20%5Bmaster%202020260321%2020110238%2020%205B9046d3%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188516/revision-arts/prompt_20260322_224517_%5Bmaster_2020260321_20110238_20_5B9046d3_2%5D",
        "assetId": "3d36189906130d668c67458885e665d4",
        "uploadedAt": "2026-03-22T14:11:20Z"
    },
    {
        "id": "master 20260322 224522 [master 2020260321 20105451 20 5Bf76d34 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 224522 [master 2020260321 20105451 20 5Bf76d34 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188675/revision-arts/master%2020260322%20224522%20%5Bmaster%202020260321%2020105451%2020%205Bf76d34%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188516/revision-arts/prompt_20260322_224522_%5Bmaster_2020260321_20105451_20_5Bf76d34_2%5D",
        "assetId": "683739d4173117be6b7929538612f2c4",
        "uploadedAt": "2026-03-22T14:11:15Z"
    },
    {
        "id": "master 20260322 224542 [master 2020260321 20110006 20 5B2fa9de 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 224542 [master 2020260321 20110006 20 5B2fa9de 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188671/revision-arts/master%2020260322%20224542%20%5Bmaster%202020260321%2020110006%2020%205B2fa9de%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188515/revision-arts/prompt_20260322_224542_%5Bmaster_2020260321_20110006_20_5B2fa9de_2%5D",
        "assetId": "359db9a2cd16c57b555966772cc5ac0e",
        "uploadedAt": "2026-03-22T14:11:11Z"
    },
    {
        "id": "master 20260322 224545 [master 2020260321 20110523 20 5B75dff4 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 224545 [master 2020260321 20110523 20 5B75dff4 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188667/revision-arts/master%2020260322%20224545%20%5Bmaster%202020260321%2020110523%2020%205B75dff4%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188514/revision-arts/prompt_20260322_224545_%5Bmaster_2020260321_20110523_20_5B75dff4_2%5D",
        "assetId": "c11bc2bea9f8aee9ce4390ae4dccf53f",
        "uploadedAt": "2026-03-22T14:11:07Z"
    },
    {
        "id": "master 20260322 224556 [master 2020260321 20104437 20 5B9536aa 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 224556 [master 2020260321 20104437 20 5B9536aa 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188572/revision-arts/master%2020260322%20224556%20%5Bmaster%202020260321%2020104437%2020%205B9536aa%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188513/revision-arts/prompt_20260322_224556_%5Bmaster_2020260321_20104437_20_5B9536aa_2%5D",
        "assetId": "8b8d05ff3e02e9478ad28546234272d3",
        "uploadedAt": "2026-03-22T14:09:32Z"
    },
    {
        "id": "master 20260322 224615 [master 2020260321 20103054 20 5B7a239f 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 224615 [master 2020260321 20103054 20 5B7a239f 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188663/revision-arts/master%2020260322%20224615%20%5Bmaster%202020260321%2020103054%2020%205B7a239f%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188512/revision-arts/prompt_20260322_224615_%5Bmaster_2020260321_20103054_20_5B7a239f_2%5D",
        "assetId": "ee1e4b19f429da2b6fd28a159272fd9b",
        "uploadedAt": "2026-03-22T14:11:03Z"
    },
    {
        "id": "master 20260322 224615 [master 2020260321 20104829 20 5B78921f 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 224615 [master 2020260321 20104829 20 5B78921f 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188659/revision-arts/master%2020260322%20224615%20%5Bmaster%202020260321%2020104829%2020%205B78921f%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188511/revision-arts/prompt_20260322_224615_%5Bmaster_2020260321_20104829_20_5B78921f_2%5D",
        "assetId": "0c86bd75017b328dfd8221f117fd9a62",
        "uploadedAt": "2026-03-22T14:10:59Z"
    },
    {
        "id": "master 20260322 224627 [master 2020260321 20103507 20 5Be35df2 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 224627 [master 2020260321 20103507 20 5Be35df2 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188656/revision-arts/master%2020260322%20224627%20%5Bmaster%202020260321%2020103507%2020%205Be35df2%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188510/revision-arts/prompt_20260322_224627_%5Bmaster_2020260321_20103507_20_5Be35df2_2%5D",
        "assetId": "5cbb1f4bd2b432a114c4fdafc33f57d0",
        "uploadedAt": "2026-03-22T14:10:56Z"
    },
    {
        "id": "master 20260322 224650 [master 2020260321 20104146 20 5B475f48 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 224650 [master 2020260321 20104146 20 5B475f48 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188653/revision-arts/master%2020260322%20224650%20%5Bmaster%202020260321%2020104146%2020%205B475f48%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188509/revision-arts/prompt_20260322_224650_%5Bmaster_2020260321_20104146_20_5B475f48_2%5D",
        "assetId": "a0fd239c652c11cfeb347b70fc378e41",
        "uploadedAt": "2026-03-22T14:10:53Z"
    },
    {
        "id": "master 20260322 224719 [master 2020260321 20110208 20 5B5b530d 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 224719 [master 2020260321 20110208 20 5B5b530d 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188647/revision-arts/master%2020260322%20224719%20%5Bmaster%202020260321%2020110208%2020%205B5b530d%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188508/revision-arts/prompt_20260322_224719_%5Bmaster_2020260321_20110208_20_5B5b530d_2%5D",
        "assetId": "3e93e62a90ff7c28af4fb56eb6cb7724",
        "uploadedAt": "2026-03-22T14:10:47Z"
    },
    {
        "id": "master 20260322 224720 [master 2020260321 20103800 20 5B5dcb1d 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 224720 [master 2020260321 20103800 20 5B5dcb1d 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188643/revision-arts/master%2020260322%20224720%20%5Bmaster%202020260321%2020103800%2020%205B5dcb1d%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188507/revision-arts/prompt_20260322_224720_%5Bmaster_2020260321_20103800_20_5B5dcb1d_2%5D",
        "assetId": "b74443ade91b09c0d2c4cf4903cb9925",
        "uploadedAt": "2026-03-22T14:10:43Z"
    },
    {
        "id": "master 20260322 224734 [master 2020260321 20110308 20 5Bbf5fdb 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 224734 [master 2020260321 20110308 20 5Bbf5fdb 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188640/revision-arts/master%2020260322%20224734%20%5Bmaster%202020260321%2020110308%2020%205Bbf5fdb%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188506/revision-arts/prompt_20260322_224734_%5Bmaster_2020260321_20110308_20_5Bbf5fdb_2%5D",
        "assetId": "762594480d7bbfb243a627fcb4f0917c",
        "uploadedAt": "2026-03-22T14:10:40Z"
    },
    {
        "id": "master 20260322 224751 [master 2020260321 20105029 20 5Bee9c34 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 224751 [master 2020260321 20105029 20 5Bee9c34 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188637/revision-arts/master%2020260322%20224751%20%5Bmaster%202020260321%2020105029%2020%205Bee9c34%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188506/revision-arts/prompt_20260322_224751_%5Bmaster_2020260321_20105029_20_5Bee9c34_2%5D",
        "assetId": "0ee6b56d640b01aecc923b2b4516c260",
        "uploadedAt": "2026-03-22T14:10:37Z"
    },
    {
        "id": "master 20260322 224756 [master 2020260321 20110554 20 5B520ecc 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 224756 [master 2020260321 20110554 20 5B520ecc 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188602/revision-arts/master%2020260322%20224756%20%5Bmaster%202020260321%2020110554%2020%205B520ecc%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188505/revision-arts/prompt_20260322_224756_%5Bmaster_2020260321_20110554_20_5B520ecc_2%5D",
        "assetId": "ef1192aa79314311641c3adb756aa2fc",
        "uploadedAt": "2026-03-22T14:10:02Z"
    },
    {
        "id": "master 20260322 224813 [master 2020260321 20105936 20 5Bb02be4 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 224813 [master 2020260321 20105936 20 5Bb02be4 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188633/revision-arts/master%2020260322%20224813%20%5Bmaster%202020260321%2020105936%2020%205Bb02be4%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188504/revision-arts/prompt_20260322_224813_%5Bmaster_2020260321_20105936_20_5Bb02be4_2%5D",
        "assetId": "8faaf0e26dfbdf8a435d2855e3a1fb53",
        "uploadedAt": "2026-03-22T14:10:33Z"
    },
    {
        "id": "master 20260322 224830 [master 2020260321 20110238 20 5B9046d3 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 224830 [master 2020260321 20110238 20 5B9046d3 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188630/revision-arts/master%2020260322%20224830%20%5Bmaster%202020260321%2020110238%2020%205B9046d3%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188503/revision-arts/prompt_20260322_224830_%5Bmaster_2020260321_20110238_20_5B9046d3_2%5D",
        "assetId": "b23daac43f15975c3805cc6cf6a82562",
        "uploadedAt": "2026-03-22T14:10:30Z"
    },
    {
        "id": "master 20260322 224853 [master 2020260321 20110137 20 5B7a49b4 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 224853 [master 2020260321 20110137 20 5B7a49b4 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188627/revision-arts/master%2020260322%20224853%20%5Bmaster%202020260321%2020110137%2020%205B7a49b4%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188503/revision-arts/prompt_20260322_224853_%5Bmaster_2020260321_20110137_20_5B7a49b4_2%5D",
        "assetId": "8668951ad7b72acd0629bc8e39a20de7",
        "uploadedAt": "2026-03-22T14:10:27Z"
    },
    {
        "id": "master 20260322 224906 [master 2020260321 20110523 20 5B75dff4 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 224906 [master 2020260321 20110523 20 5B75dff4 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188598/revision-arts/master%2020260322%20224906%20%5Bmaster%202020260321%2020110523%2020%205B75dff4%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188501/revision-arts/prompt_20260322_224906_%5Bmaster_2020260321_20110523_20_5B75dff4_2%5D",
        "assetId": "442650057330d4fc7df30873f595d61c",
        "uploadedAt": "2026-03-22T14:09:58Z"
    },
    {
        "id": "master 20260322 224925 [master 2020260321 20110006 20 5B2fa9de 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 224925 [master 2020260321 20110006 20 5B2fa9de 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188624/revision-arts/master%2020260322%20224925%20%5Bmaster%202020260321%2020110006%2020%205B2fa9de%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188501/revision-arts/prompt_20260322_224925_%5Bmaster_2020260321_20110006_20_5B2fa9de_2%5D",
        "assetId": "2bac70e01d70eb7a2071ef7bff3f281d",
        "uploadedAt": "2026-03-22T14:10:24Z"
    },
    {
        "id": "master 20260322 224940 [master 2020260321 20104829 20 5B78921f 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 224940 [master 2020260321 20104829 20 5B78921f 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188595/revision-arts/master%2020260322%20224940%20%5Bmaster%202020260321%2020104829%2020%205B78921f%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188499/revision-arts/prompt_20260322_224940_%5Bmaster_2020260321_20104829_20_5B78921f_2%5D",
        "assetId": "9fdd9d0fb7b8aef59c0b0880242a4d2e",
        "uploadedAt": "2026-03-22T14:09:55Z"
    },
    {
        "id": "master 20260322 224958 [master 2020260321 20103054 20 5B7a239f 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 224958 [master 2020260321 20103054 20 5B7a239f 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188621/revision-arts/master%2020260322%20224958%20%5Bmaster%202020260321%2020103054%2020%205B7a239f%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188498/revision-arts/prompt_20260322_224958_%5Bmaster_2020260321_20103054_20_5B7a239f_2%5D",
        "assetId": "b48f9f63d3e8ac4784ec8dd172f15453",
        "uploadedAt": "2026-03-22T14:10:21Z"
    },
    {
        "id": "master 20260322 225010 [master 2020260321 20110308 20 5Bbf5fdb 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 225010 [master 2020260321 20110308 20 5Bbf5fdb 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188591/revision-arts/master%2020260322%20225010%20%5Bmaster%202020260321%2020110308%2020%205Bbf5fdb%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188497/revision-arts/prompt_20260322_225010_%5Bmaster_2020260321_20110308_20_5Bbf5fdb_2%5D",
        "assetId": "129f35c93a7020cb56dbfc9385a8dbe2",
        "uploadedAt": "2026-03-22T14:09:51Z"
    },
    {
        "id": "master 20260322 225036 [master 2020260321 20104146 20 5B475f48 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 225036 [master 2020260321 20104146 20 5B475f48 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188618/revision-arts/master%2020260322%20225036%20%5Bmaster%202020260321%2020104146%2020%205B475f48%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188496/revision-arts/prompt_20260322_225036_%5Bmaster_2020260321_20104146_20_5B475f48_2%5D",
        "assetId": "a1430250bba8a9b129ca008c4b95a471",
        "uploadedAt": "2026-03-22T14:10:18Z"
    },
    {
        "id": "master 20260322 225045 [master 2020260321 20105936 20 5Bb02be4 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 225045 [master 2020260321 20105936 20 5Bb02be4 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188588/revision-arts/master%2020260322%20225045%20%5Bmaster%202020260321%2020105936%2020%205Bb02be4%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188495/revision-arts/prompt_20260322_225045_%5Bmaster_2020260321_20105936_20_5Bb02be4_2%5D",
        "assetId": "e8c5182e9b43cceded33a13993fa3e1e",
        "uploadedAt": "2026-03-22T14:09:48Z"
    },
    {
        "id": "master 20260322 225106 [master 2020260321 20110208 20 5B5b530d 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 225106 [master 2020260321 20110208 20 5B5b530d 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188615/revision-arts/master%2020260322%20225106%20%5Bmaster%202020260321%2020110208%2020%205B5b530d%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188495/revision-arts/prompt_20260322_225106_%5Bmaster_2020260321_20110208_20_5B5b530d_2%5D",
        "assetId": "4b15d37cadc80964d8a141b6072b05f8",
        "uploadedAt": "2026-03-22T14:10:15Z"
    },
    {
        "id": "master 20260322 225114 [master 2020260321 20110137 20 5B7a49b4 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 225114 [master 2020260321 20110137 20 5B7a49b4 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188584/revision-arts/master%2020260322%20225114%20%5Bmaster%202020260321%2020110137%2020%205B7a49b4%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188494/revision-arts/prompt_20260322_225114_%5Bmaster_2020260321_20110137_20_5B7a49b4_2%5D",
        "assetId": "0e0a137682b81514007c1e81a68c9ed0",
        "uploadedAt": "2026-03-22T14:09:44Z"
    },
    {
        "id": "master 20260322 225136 [master 2020260321 20105029 20 5Bee9c34 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 225136 [master 2020260321 20105029 20 5Bee9c34 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188612/revision-arts/master%2020260322%20225136%20%5Bmaster%202020260321%2020105029%2020%205Bee9c34%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188494/revision-arts/prompt_20260322_225136_%5Bmaster_2020260321_20105029_20_5Bee9c34_2%5D",
        "assetId": "f62974aeba4285f0494e5e9a188915bf",
        "uploadedAt": "2026-03-22T14:10:12Z"
    },
    {
        "id": "master 20260322 225146 [master 2020260321 20110006 20 5B2fa9de 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 225146 [master 2020260321 20110006 20 5B2fa9de 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188581/revision-arts/master%2020260322%20225146%20%5Bmaster%202020260321%2020110006%2020%205B2fa9de%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188493/revision-arts/prompt_20260322_225146_%5Bmaster_2020260321_20110006_20_5B2fa9de_2%5D",
        "assetId": "07e396c3f2470eb31908f1f5d90a116c",
        "uploadedAt": "2026-03-22T14:09:41Z"
    },
    {
        "id": "master 20260322 225224 [master 2020260321 20103054 20 5B7a239f 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 225224 [master 2020260321 20103054 20 5B7a239f 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188608/revision-arts/master%2020260322%20225224%20%5Bmaster%202020260321%2020103054%2020%205B7a239f%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188492/revision-arts/prompt_20260322_225224_%5Bmaster_2020260321_20103054_20_5B7a239f_2%5D",
        "assetId": "596d47f82927ab63d41066db494e0538",
        "uploadedAt": "2026-03-22T14:10:08Z"
    },
    {
        "id": "master 20260322 225257 [master 2020260321 20104146 20 5B475f48 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 225257 [master 2020260321 20104146 20 5B475f48 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188578/revision-arts/master%2020260322%20225257%20%5Bmaster%202020260321%2020104146%2020%205B475f48%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188491/revision-arts/prompt_20260322_225257_%5Bmaster_2020260321_20104146_20_5B475f48_2%5D",
        "assetId": "d8fb03287cc8556faaf632b5dd6cdd31",
        "uploadedAt": "2026-03-22T14:09:38Z"
    },
    {
        "id": "master 20260322 225329 [master 2020260321 20110208 20 5B5b530d 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 225329 [master 2020260321 20110208 20 5B5b530d 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188605/revision-arts/master%2020260322%20225329%20%5Bmaster%202020260321%2020110208%2020%205B5b530d%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188490/revision-arts/prompt_20260322_225329_%5Bmaster_2020260321_20110208_20_5B5b530d_2%5D",
        "assetId": "9581cfe76ded944823dbfc7bcbb815cd",
        "uploadedAt": "2026-03-22T14:10:05Z"
    },
    {
        "id": "master 20260322 225406 [master 2020260321 20105029 20 5Bee9c34 2]",
        "tags": [
            "character",
            "fashion"
        ],
        "title": "master 20260322 225406 [master 2020260321 20105029 20 5Bee9c34 2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774188575/revision-arts/master%2020260322%20225406%20%5Bmaster%202020260321%2020105029%2020%205Bee9c34%202%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774188490/revision-arts/prompt_20260322_225406_%5Bmaster_2020260321_20105029_20_5Bee9c34_2%5D",
        "assetId": "04d306a101a7cc6032d8acacfb39b481",
        "uploadedAt": "2026-03-22T14:09:35Z"
    },
    {
        "id": "master 20260323 193000 [FPS 4x5]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 193000 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272575/revision-arts/master%2020260323%20193000%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271523/revision-arts/prompt_20260323_193000_%5BFPS_4x5%5D",
        "assetId": "0e847a77c4500b6ed5ffc34eba973e28",
        "uploadedAt": "2026-03-23T13:29:35Z"
    },
    {
        "id": "master 20260323 193019 [FPS 3x4]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 193019 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272572/revision-arts/master%2020260323%20193019%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271522/revision-arts/prompt_20260323_193019_%5BFPS_3x4%5D",
        "assetId": "2a36fe85337af87b63c5020b7041a503",
        "uploadedAt": "2026-03-23T13:29:32Z"
    },
    {
        "id": "master 20260323 193029 [FPS 2x3]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 193029 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272568/revision-arts/master%2020260323%20193029%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271521/revision-arts/prompt_20260323_193029_%5BFPS_2x3%5D",
        "assetId": "05dce040ab5ddd9adb58419080a24e4e",
        "uploadedAt": "2026-03-23T13:29:28Z"
    },
    {
        "id": "master 20260323 193044 [FPS 4x5]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 193044 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272565/revision-arts/master%2020260323%20193044%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271519/revision-arts/prompt_20260323_193044_%5BFPS_4x5%5D",
        "assetId": "2be4dc8701bbced6a22c7cc820e00646",
        "uploadedAt": "2026-03-23T13:29:25Z"
    },
    {
        "id": "master 20260323 193051 [FPS 4x5]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 193051 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272561/revision-arts/master%2020260323%20193051%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271517/revision-arts/prompt_20260323_193051_%5BFPS_4x5%5D",
        "assetId": "b255ebf53de231f0e5fdd7af69a4b583",
        "uploadedAt": "2026-03-23T13:29:21Z"
    },
    {
        "id": "master 20260323 193110 [FPS 9x16]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 193110 [FPS 9x16]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272558/revision-arts/master%2020260323%20193110%20%5BFPS%209x16%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271516/revision-arts/prompt_20260323_193110_%5BFPS_9x16%5D",
        "assetId": "990383f614fe92f4c577477b7f960fde",
        "uploadedAt": "2026-03-23T13:29:18Z"
    },
    {
        "id": "master 20260323 193119 [FPS 9x16]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 193119 [FPS 9x16]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272554/revision-arts/master%2020260323%20193119%20%5BFPS%209x16%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271515/revision-arts/prompt_20260323_193119_%5BFPS_9x16%5D",
        "assetId": "291a1ca103002099133a0d71c95e7a75",
        "uploadedAt": "2026-03-23T13:29:14Z"
    },
    {
        "id": "master 20260323 193128 [FPS 2x3]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 193128 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272550/revision-arts/master%2020260323%20193128%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271514/revision-arts/prompt_20260323_193128_%5BFPS_2x3%5D",
        "assetId": "866f17b4e8f5e383faa1f5caf7f952fc",
        "uploadedAt": "2026-03-23T13:29:10Z"
    },
    {
        "id": "master 20260323 193142 [FPS 9x16]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 193142 [FPS 9x16]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272547/revision-arts/master%2020260323%20193142%20%5BFPS%209x16%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271513/revision-arts/prompt_20260323_193142_%5BFPS_9x16%5D",
        "assetId": "6f2c7729f4df980573bb6b6a4a49398a",
        "uploadedAt": "2026-03-23T13:29:07Z"
    },
    {
        "id": "master 20260323 193151 [FPS 3x4]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 193151 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272544/revision-arts/master%2020260323%20193151%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271512/revision-arts/prompt_20260323_193151_%5BFPS_3x4%5D",
        "assetId": "09bbf46a7cd9ef78d458781bc6150b06",
        "uploadedAt": "2026-03-23T13:29:04Z"
    },
    {
        "id": "master 20260323 193157 [FPS 16x9]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 193157 [FPS 16x9]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272541/revision-arts/master%2020260323%20193157%20%5BFPS%2016x9%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271512/revision-arts/prompt_20260323_193157_%5BFPS_16x9%5D",
        "assetId": "926667ad671e5a07d6f80116da79cebc",
        "uploadedAt": "2026-03-23T13:29:01Z"
    },
    {
        "id": "master 20260323 193208 [FPS 3x4]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 193208 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272538/revision-arts/master%2020260323%20193208%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271511/revision-arts/prompt_20260323_193208_%5BFPS_3x4%5D",
        "assetId": "4ed80911866317e122529ae42b78b881",
        "uploadedAt": "2026-03-23T13:28:58Z"
    },
    {
        "id": "master 20260323 193212 [FPS 3x4]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 193212 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272534/revision-arts/master%2020260323%20193212%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271510/revision-arts/prompt_20260323_193212_%5BFPS_3x4%5D",
        "assetId": "25f527f6786651a16e34df2b4c71104b",
        "uploadedAt": "2026-03-23T13:28:54Z"
    },
    {
        "id": "master 20260323 193224 [FPS 3x4]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 193224 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272531/revision-arts/master%2020260323%20193224%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271508/revision-arts/prompt_20260323_193224_%5BFPS_3x4%5D",
        "assetId": "6b1704853b54707a11253e23e0290e56",
        "uploadedAt": "2026-03-23T13:28:51Z"
    },
    {
        "id": "master 20260323 193235 [FPS 3x4]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 193235 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272527/revision-arts/master%2020260323%20193235%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271507/revision-arts/prompt_20260323_193235_%5BFPS_3x4%5D",
        "assetId": "39369a6317be21e38af75e8f1c9ca6ef",
        "uploadedAt": "2026-03-23T13:28:47Z"
    },
    {
        "id": "master 20260323 193245 [FPS 3x4]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 193245 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272524/revision-arts/master%2020260323%20193245%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271504/revision-arts/prompt_20260323_193245_%5BFPS_3x4%5D",
        "assetId": "efa46e1060a588888b061c63ce855d9c",
        "uploadedAt": "2026-03-23T13:28:44Z"
    },
    {
        "id": "master 20260323 193302 [FPS 1x1]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 193302 [FPS 1x1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272520/revision-arts/master%2020260323%20193302%20%5BFPS%201x1%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271502/revision-arts/prompt_20260323_193302_%5BFPS_1x1%5D",
        "assetId": "383d4ec22f00a32527a5a5f9608c6253",
        "uploadedAt": "2026-03-23T13:28:40Z"
    },
    {
        "id": "master 20260323 193321 [FPS 4x5]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 193321 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272507/revision-arts/master%2020260323%20193321%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271501/revision-arts/prompt_20260323_193321_%5BFPS_4x5%5D",
        "assetId": "23f8689cb91cada9b52fe543c7df1f39",
        "uploadedAt": "2026-03-23T13:28:27Z"
    },
    {
        "id": "master 20260323 193324 [FPS 3x4]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 193324 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272494/revision-arts/master%2020260323%20193324%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271500/revision-arts/prompt_20260323_193324_%5BFPS_3x4%5D",
        "assetId": "605da3b34ece0453ed97ed18b6d5c404",
        "uploadedAt": "2026-03-23T13:28:14Z"
    },
    {
        "id": "master 20260323 193326 [FPS 1x1]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 193326 [FPS 1x1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272454/revision-arts/master%2020260323%20193326%20%5BFPS%201x1%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271499/revision-arts/prompt_20260323_193326_%5BFPS_1x1%5D",
        "assetId": "e901feeea3b129b570df033db5523555",
        "uploadedAt": "2026-03-23T13:27:34Z"
    },
    {
        "id": "master 20260323 193348 [FPS 3x4]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 193348 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272385/revision-arts/master%2020260323%20193348%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271498/revision-arts/prompt_20260323_193348_%5BFPS_3x4%5D",
        "assetId": "d8fa95e18899d51f29b97d8875bc1d32",
        "uploadedAt": "2026-03-23T13:26:25Z"
    },
    {
        "id": "master 20260323 193350 [FPS 1x1]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 193350 [FPS 1x1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272324/revision-arts/master%2020260323%20193350%20%5BFPS%201x1%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271496/revision-arts/prompt_20260323_193350_%5BFPS_1x1%5D",
        "assetId": "be2d3b97824feeb2761522fd2e5c259b",
        "uploadedAt": "2026-03-23T13:25:24Z"
    },
    {
        "id": "master 20260323 193401 [FPS 9x16]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 193401 [FPS 9x16]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272260/revision-arts/master%2020260323%20193401%20%5BFPS%209x16%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271495/revision-arts/prompt_20260323_193401_%5BFPS_9x16%5D",
        "assetId": "8d63d18ef3720a251788bf84d19b155e",
        "uploadedAt": "2026-03-23T13:24:20Z"
    },
    {
        "id": "master 20260323 193411 [FPS 16x9]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 193411 [FPS 16x9]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272256/revision-arts/master%2020260323%20193411%20%5BFPS%2016x9%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271495/revision-arts/prompt_20260323_193411_%5BFPS_16x9%5D",
        "assetId": "4bdc705fca89505a048fd3e8b65d391c",
        "uploadedAt": "2026-03-23T13:24:16Z"
    },
    {
        "id": "master 20260323 193419 [FPS 3x4]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 193419 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272252/revision-arts/master%2020260323%20193419%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271494/revision-arts/prompt_20260323_193419_%5BFPS_3x4%5D",
        "assetId": "bb5964876463604eafd5dea217e96d62",
        "uploadedAt": "2026-03-23T13:24:12Z"
    },
    {
        "id": "master 20260323 193457 [FPS 9x16]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 193457 [FPS 9x16]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272248/revision-arts/master%2020260323%20193457%20%5BFPS%209x16%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271492/revision-arts/prompt_20260323_193457_%5BFPS_9x16%5D",
        "assetId": "4ade73855300e7b5e6c28516d57aa768",
        "uploadedAt": "2026-03-23T13:24:08Z"
    },
    {
        "id": "master 20260323 193522 [FPS 2x3]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 193522 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272245/revision-arts/master%2020260323%20193522%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271491/revision-arts/prompt_20260323_193522_%5BFPS_2x3%5D",
        "assetId": "1c1ed452472b6da2690106011f64014d",
        "uploadedAt": "2026-03-23T13:24:05Z"
    },
    {
        "id": "master 20260323 193525 [FPS 4x5]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 193525 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272241/revision-arts/master%2020260323%20193525%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271490/revision-arts/prompt_20260323_193525_%5BFPS_4x5%5D",
        "assetId": "e6b50ed2abc040747a1a39d50902c005",
        "uploadedAt": "2026-03-23T13:24:01Z"
    },
    {
        "id": "master 20260323 193541 [FPS 2x3]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 193541 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272237/revision-arts/master%2020260323%20193541%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271489/revision-arts/prompt_20260323_193541_%5BFPS_2x3%5D",
        "assetId": "8dcbe693c21bcda954349f3a0ade71d5",
        "uploadedAt": "2026-03-23T13:23:57Z"
    },
    {
        "id": "master 20260323 193548 [FPS 4x5]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 193548 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272216/revision-arts/master%2020260323%20193548%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271488/revision-arts/prompt_20260323_193548_%5BFPS_4x5%5D",
        "assetId": "faa0d8f8866f45e14e68487185ab29d3",
        "uploadedAt": "2026-03-23T13:23:36Z"
    },
    {
        "id": "master 20260323 193549 [FPS 16x9]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 193549 [FPS 16x9]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272147/revision-arts/master%2020260323%20193549%20%5BFPS%2016x9%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271487/revision-arts/prompt_20260323_193549_%5BFPS_16x9%5D",
        "assetId": "bca21fef1a3676c5fde2e2ef090e2def",
        "uploadedAt": "2026-03-23T13:22:27Z"
    },
    {
        "id": "master 20260323 193604 [FPS 4x5]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 193604 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272143/revision-arts/master%2020260323%20193604%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271486/revision-arts/prompt_20260323_193604_%5BFPS_4x5%5D",
        "assetId": "72896ee04255be69bae29dcafa6c1d96",
        "uploadedAt": "2026-03-23T13:22:23Z"
    },
    {
        "id": "master 20260323 193630 [FPS 9x16]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 193630 [FPS 9x16]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272138/revision-arts/master%2020260323%20193630%20%5BFPS%209x16%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271485/revision-arts/prompt_20260323_193630_%5BFPS_9x16%5D",
        "assetId": "ed8f4d6f6055eaa1bcd1bd59403cfb80",
        "uploadedAt": "2026-03-23T13:22:18Z"
    },
    {
        "id": "master 20260323 193645 [FPS 3x4]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 193645 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272134/revision-arts/master%2020260323%20193645%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271484/revision-arts/prompt_20260323_193645_%5BFPS_3x4%5D",
        "assetId": "df08eed9b8fb02a1855115bbae655114",
        "uploadedAt": "2026-03-23T13:22:14Z"
    },
    {
        "id": "master 20260323 193704 [FPS 3x4]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 193704 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272129/revision-arts/master%2020260323%20193704%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271483/revision-arts/prompt_20260323_193704_%5BFPS_3x4%5D",
        "assetId": "eb4d98f30b2bc80e45499607438380a4",
        "uploadedAt": "2026-03-23T13:22:09Z"
    },
    {
        "id": "master 20260323 193707 [FPS 3x4]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 193707 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272123/revision-arts/master%2020260323%20193707%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271482/revision-arts/prompt_20260323_193707_%5BFPS_3x4%5D",
        "assetId": "d75120086bf664fb6b0cd4530f59d8a0",
        "uploadedAt": "2026-03-23T13:22:03Z"
    },
    {
        "id": "master 20260323 193728 [FPS 9x16]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 193728 [FPS 9x16]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272118/revision-arts/master%2020260323%20193728%20%5BFPS%209x16%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271480/revision-arts/prompt_20260323_193728_%5BFPS_9x16%5D",
        "assetId": "d5adec395c00051253368ede122d1b82",
        "uploadedAt": "2026-03-23T13:21:58Z"
    },
    {
        "id": "master 20260323 193736 [FPS 4x5]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 193736 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272114/revision-arts/master%2020260323%20193736%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271479/revision-arts/prompt_20260323_193736_%5BFPS_4x5%5D",
        "assetId": "dfe9a723df256b87978e47fe5c703906",
        "uploadedAt": "2026-03-23T13:21:54Z"
    },
    {
        "id": "master 20260323 193756 [FPS 21x9]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 193756 [FPS 21x9]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272110/revision-arts/master%2020260323%20193756%20%5BFPS%2021x9%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271478/revision-arts/prompt_20260323_193756_%5BFPS_21x9%5D",
        "assetId": "a06974843b7c660bbdc026ad169e3f72",
        "uploadedAt": "2026-03-23T13:21:50Z"
    },
    {
        "id": "master 20260323 193758 [FPS 9x16]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 193758 [FPS 9x16]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272106/revision-arts/master%2020260323%20193758%20%5BFPS%209x16%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271467/revision-arts/prompt_20260323_193758_%5BFPS_9x16%5D",
        "assetId": "af5f3020b71542e3cab46003d87c2674",
        "uploadedAt": "2026-03-23T13:21:46Z"
    },
    {
        "id": "master 20260323 193815 [FPS 1x1]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 193815 [FPS 1x1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272102/revision-arts/master%2020260323%20193815%20%5BFPS%201x1%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271464/revision-arts/prompt_20260323_193815_%5BFPS_1x1%5D",
        "assetId": "54018a94de8ab1b9c6129738dbc83712",
        "uploadedAt": "2026-03-23T13:21:42Z"
    },
    {
        "id": "master 20260323 193827 [FPS 9x16]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 193827 [FPS 9x16]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272099/revision-arts/master%2020260323%20193827%20%5BFPS%209x16%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271463/revision-arts/prompt_20260323_193827_%5BFPS_9x16%5D",
        "assetId": "cf5b37b4cb6b312571f6947c1fc9c4f7",
        "uploadedAt": "2026-03-23T13:21:39Z"
    },
    {
        "id": "master 20260323 193851 [FPS 4x5]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 193851 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272096/revision-arts/master%2020260323%20193851%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271461/revision-arts/prompt_20260323_193851_%5BFPS_4x5%5D",
        "assetId": "fe107b442e6d1376bf1f423a7023670f",
        "uploadedAt": "2026-03-23T13:21:36Z"
    },
    {
        "id": "master 20260323 193909 [FPS 3x2]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 193909 [FPS 3x2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272093/revision-arts/master%2020260323%20193909%20%5BFPS%203x2%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271460/revision-arts/prompt_20260323_193909_%5BFPS_3x2%5D",
        "assetId": "908d50ea34e3682c9ca9931d8b698f2a",
        "uploadedAt": "2026-03-23T13:21:33Z"
    },
    {
        "id": "master 20260323 193913 [FPS 5x4]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 193913 [FPS 5x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272089/revision-arts/master%2020260323%20193913%20%5BFPS%205x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271459/revision-arts/prompt_20260323_193913_%5BFPS_5x4%5D",
        "assetId": "ad85de00a61da46ac1a6216d218dc787",
        "uploadedAt": "2026-03-23T13:21:29Z"
    },
    {
        "id": "master 20260323 193936 [FPS 3x4]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 193936 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272086/revision-arts/master%2020260323%20193936%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271457/revision-arts/prompt_20260323_193936_%5BFPS_3x4%5D",
        "assetId": "7e0f0f8c3738f5f8a2d9e27892aa9352",
        "uploadedAt": "2026-03-23T13:21:26Z"
    },
    {
        "id": "master 20260323 193942 [FPS 2x3]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 193942 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272083/revision-arts/master%2020260323%20193942%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271456/revision-arts/prompt_20260323_193942_%5BFPS_2x3%5D",
        "assetId": "e09904902a95905a370b1c66eee16b03",
        "uploadedAt": "2026-03-23T13:21:23Z"
    },
    {
        "id": "master 20260323 194006 [FPS 2x3]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 194006 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272080/revision-arts/master%2020260323%20194006%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271456/revision-arts/prompt_20260323_194006_%5BFPS_2x3%5D",
        "assetId": "51cf62f2bd7a50be91ff9748a789802c",
        "uploadedAt": "2026-03-23T13:21:20Z"
    },
    {
        "id": "master 20260323 194017 [FPS 4x5]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 194017 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272076/revision-arts/master%2020260323%20194017%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271455/revision-arts/prompt_20260323_194017_%5BFPS_4x5%5D",
        "assetId": "9af9c7d91f48728c6d87be3ec22fb5c6",
        "uploadedAt": "2026-03-23T13:21:16Z"
    },
    {
        "id": "master 20260323 194034 [FPS 4x5]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 194034 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272073/revision-arts/master%2020260323%20194034%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271454/revision-arts/prompt_20260323_194034_%5BFPS_4x5%5D",
        "assetId": "475fb8a792d744f59b8852c8aa5ed254",
        "uploadedAt": "2026-03-23T13:21:13Z"
    },
    {
        "id": "master 20260323 194104 [FPS 9x16]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 194104 [FPS 9x16]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272069/revision-arts/master%2020260323%20194104%20%5BFPS%209x16%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271453/revision-arts/prompt_20260323_194104_%5BFPS_9x16%5D",
        "assetId": "f3011ec19977860412c41c6cdf06117a",
        "uploadedAt": "2026-03-23T13:21:09Z"
    },
    {
        "id": "master 20260323 194106 [FPS 2x3]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 194106 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272066/revision-arts/master%2020260323%20194106%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271452/revision-arts/prompt_20260323_194106_%5BFPS_2x3%5D",
        "assetId": "52d4fa5bddaeb54c512a40a5517d5513",
        "uploadedAt": "2026-03-23T13:21:06Z"
    },
    {
        "id": "master 20260323 194126 [FPS 3x4]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 194126 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272062/revision-arts/master%2020260323%20194126%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271451/revision-arts/prompt_20260323_194126_%5BFPS_3x4%5D",
        "assetId": "2e73e6a32f457d8f0e46bb0b800d6421",
        "uploadedAt": "2026-03-23T13:21:02Z"
    },
    {
        "id": "master 20260323 194131 [FPS 4x5]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 194131 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272059/revision-arts/master%2020260323%20194131%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271450/revision-arts/prompt_20260323_194131_%5BFPS_4x5%5D",
        "assetId": "401fe7ed8ba4c2fa76d90deff2c53150",
        "uploadedAt": "2026-03-23T13:20:59Z"
    },
    {
        "id": "master 20260323 194159 [FPS 1x1]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 194159 [FPS 1x1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272056/revision-arts/master%2020260323%20194159%20%5BFPS%201x1%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271449/revision-arts/prompt_20260323_194159_%5BFPS_1x1%5D",
        "assetId": "2a5f810d3ebdd637f31a08502b9f493b",
        "uploadedAt": "2026-03-23T13:20:56Z"
    },
    {
        "id": "master 20260323 194205 [FPS 2x3]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 194205 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272052/revision-arts/master%2020260323%20194205%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271448/revision-arts/prompt_20260323_194205_%5BFPS_2x3%5D",
        "assetId": "54b540e5b82217e0b4e933a7fb6dc148",
        "uploadedAt": "2026-03-23T13:20:52Z"
    },
    {
        "id": "master 20260323 215026 [FPS 2x3]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 215026 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774273194/revision-arts/master%2020260323%20215026%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271584/revision-arts/prompt_20260323_215026_%5BFPS_2x3%5D",
        "assetId": "112160d734b9e51d2463e89d03ef0a5e",
        "uploadedAt": "2026-03-23T13:39:54Z"
    },
    {
        "id": "master 20260323 215027 [FPS 9x16]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 215027 [FPS 9x16]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774273190/revision-arts/master%2020260323%20215027%20%5BFPS%209x16%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271583/revision-arts/prompt_20260323_215027_%5BFPS_9x16%5D",
        "assetId": "c25c85fdc2af5c6d435339ad9e48b0f0",
        "uploadedAt": "2026-03-23T13:39:50Z"
    },
    {
        "id": "master 20260323 215051 [FPS 3x4]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 215051 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774273187/revision-arts/master%2020260323%20215051%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271581/revision-arts/prompt_20260323_215051_%5BFPS_3x4%5D",
        "assetId": "6d5f808b621cab9bd8ed672b1c60def0",
        "uploadedAt": "2026-03-23T13:39:47Z"
    },
    {
        "id": "master 20260323 215054 [FPS 1x1]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 215054 [FPS 1x1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774273183/revision-arts/master%2020260323%20215054%20%5BFPS%201x1%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271580/revision-arts/prompt_20260323_215054_%5BFPS_1x1%5D",
        "assetId": "6895bd54617598931c59e018562d8667",
        "uploadedAt": "2026-03-23T13:39:43Z"
    },
    {
        "id": "master 20260323 215118 [FPS 1x1]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 215118 [FPS 1x1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774273177/revision-arts/master%2020260323%20215118%20%5BFPS%201x1%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271579/revision-arts/prompt_20260323_215118_%5BFPS_1x1%5D",
        "assetId": "0d0570ed2129e08a25e70ff1d5797035",
        "uploadedAt": "2026-03-23T13:39:37Z"
    },
    {
        "id": "master 20260323 215123 [FPS 2x3]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 215123 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774273172/revision-arts/master%2020260323%20215123%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271578/revision-arts/prompt_20260323_215123_%5BFPS_2x3%5D",
        "assetId": "e8e71ba5f40e29284e62a4448f900460",
        "uploadedAt": "2026-03-23T13:39:32Z"
    },
    {
        "id": "master 20260323 215151 [FPS 3x4]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 215151 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774273166/revision-arts/master%2020260323%20215151%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271576/revision-arts/prompt_20260323_215151_%5BFPS_3x4%5D",
        "assetId": "e434e4d26e8fd80a9da3ee1d142734a2",
        "uploadedAt": "2026-03-23T13:39:26Z"
    },
    {
        "id": "master 20260323 215151 [FPS 4x5]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 215151 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774273169/revision-arts/master%2020260323%20215151%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271577/revision-arts/prompt_20260323_215151_%5BFPS_4x5%5D",
        "assetId": "9a0a08fa48432a121928040e8546f906",
        "uploadedAt": "2026-03-23T13:39:29Z"
    },
    {
        "id": "master 20260323 215218 [FPS 9x16]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 215218 [FPS 9x16]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774273162/revision-arts/master%2020260323%20215218%20%5BFPS%209x16%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271575/revision-arts/prompt_20260323_215218_%5BFPS_9x16%5D",
        "assetId": "420f2dc6b541c7d393d04ba9b2ef57f8",
        "uploadedAt": "2026-03-23T13:39:22Z"
    },
    {
        "id": "master 20260323 215223 [FPS 2x3]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 215223 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774273157/revision-arts/master%2020260323%20215223%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271574/revision-arts/prompt_20260323_215223_%5BFPS_2x3%5D",
        "assetId": "c75a5b912f6a7cd260945e3535de819c",
        "uploadedAt": "2026-03-23T13:39:17Z"
    },
    {
        "id": "master 20260323 215245 [FPS 2x3]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 215245 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774273151/revision-arts/master%2020260323%20215245%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271573/revision-arts/prompt_20260323_215245_%5BFPS_2x3%5D",
        "assetId": "8387524a4ca73183dd6c8429b68e4bd9",
        "uploadedAt": "2026-03-23T13:39:11Z"
    },
    {
        "id": "master 20260323 215247 [FPS 9x16]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 215247 [FPS 9x16]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774273146/revision-arts/master%2020260323%20215247%20%5BFPS%209x16%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271571/revision-arts/prompt_20260323_215247_%5BFPS_9x16%5D",
        "assetId": "3cab2bbefa16cc285f8b7ca752411791",
        "uploadedAt": "2026-03-23T13:39:06Z"
    },
    {
        "id": "master 20260323 215314 [FPS 4x5]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 215314 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774273139/revision-arts/master%2020260323%20215314%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271570/revision-arts/prompt_20260323_215314_%5BFPS_4x5%5D",
        "assetId": "b4cf5914d8f1c528d921f49314b6859b",
        "uploadedAt": "2026-03-23T13:38:59Z"
    },
    {
        "id": "master 20260323 215339 [FPS 2x3]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 215339 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774273134/revision-arts/master%2020260323%20215339%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271568/revision-arts/prompt_20260323_215339_%5BFPS_2x3%5D",
        "assetId": "368f8403448d004c5a0e90a0baf08fad",
        "uploadedAt": "2026-03-23T13:38:54Z"
    },
    {
        "id": "master 20260323 215408 [FPS 4x5]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 215408 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774273128/revision-arts/master%2020260323%20215408%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271567/revision-arts/prompt_20260323_215408_%5BFPS_4x5%5D",
        "assetId": "df24bf8fec730e60da8d2eadf384ce58",
        "uploadedAt": "2026-03-23T13:38:48Z"
    },
    {
        "id": "master 20260323 215437 [FPS 9x16]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 215437 [FPS 9x16]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774273121/revision-arts/master%2020260323%20215437%20%5BFPS%209x16%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271566/revision-arts/prompt_20260323_215437_%5BFPS_9x16%5D",
        "assetId": "2e10deefc0bc2b5697dd0061b900ddbd",
        "uploadedAt": "2026-03-23T13:38:41Z"
    },
    {
        "id": "master 20260323 215504 [FPS 1x1]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 215504 [FPS 1x1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774273114/revision-arts/master%2020260323%20215504%20%5BFPS%201x1%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271565/revision-arts/prompt_20260323_215504_%5BFPS_1x1%5D",
        "assetId": "b85ff685ae9801a4bbe4ea3f8764b1ed",
        "uploadedAt": "2026-03-23T13:38:34Z"
    },
    {
        "id": "master 20260323 215510 [FPS 9x16]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 215510 [FPS 9x16]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774273108/revision-arts/master%2020260323%20215510%20%5BFPS%209x16%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271564/revision-arts/prompt_20260323_215510_%5BFPS_9x16%5D",
        "assetId": "94e9d5ef4f44197f65a16948e6baa466",
        "uploadedAt": "2026-03-23T13:38:28Z"
    },
    {
        "id": "master 20260323 215532 [FPS 3x4]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 215532 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774273105/revision-arts/master%2020260323%20215532%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271563/revision-arts/prompt_20260323_215532_%5BFPS_3x4%5D",
        "assetId": "e3c4c482dd667d7ebb7f5f60820cfdc0",
        "uploadedAt": "2026-03-23T13:38:25Z"
    },
    {
        "id": "master 20260323 215540 [FPS 1x1]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 215540 [FPS 1x1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774273102/revision-arts/master%2020260323%20215540%20%5BFPS%201x1%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271562/revision-arts/prompt_20260323_215540_%5BFPS_1x1%5D",
        "assetId": "0da0efd0b0db283a2adf2ebc75d8eb12",
        "uploadedAt": "2026-03-23T13:38:22Z"
    },
    {
        "id": "master 20260323 215603 [FPS 4x5]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 215603 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774273099/revision-arts/master%2020260323%20215603%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271561/revision-arts/prompt_20260323_215603_%5BFPS_4x5%5D",
        "assetId": "8d00088fb7a6668498f8454ccefdf760",
        "uploadedAt": "2026-03-23T13:38:19Z"
    },
    {
        "id": "master 20260323 215610 [FPS 2x3]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 215610 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774273095/revision-arts/master%2020260323%20215610%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271560/revision-arts/prompt_20260323_215610_%5BFPS_2x3%5D",
        "assetId": "5400f2c6f712eb18da31afe3500068a6",
        "uploadedAt": "2026-03-23T13:38:15Z"
    },
    {
        "id": "master 20260323 215629 [FPS 1x1]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 215629 [FPS 1x1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774273089/revision-arts/master%2020260323%20215629%20%5BFPS%201x1%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271559/revision-arts/prompt_20260323_215629_%5BFPS_1x1%5D",
        "assetId": "a3380c89e02139092910a461010ba0c0",
        "uploadedAt": "2026-03-23T13:38:09Z"
    },
    {
        "id": "master 20260323 215639 [FPS 4x5]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 215639 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774273084/revision-arts/master%2020260323%20215639%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271558/revision-arts/prompt_20260323_215639_%5BFPS_4x5%5D",
        "assetId": "a7ea899a0943468b714ac983444f36d6",
        "uploadedAt": "2026-03-23T13:38:04Z"
    },
    {
        "id": "master 20260323 215654 [FPS 4x5]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 215654 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774273078/revision-arts/master%2020260323%20215654%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271557/revision-arts/prompt_20260323_215654_%5BFPS_4x5%5D",
        "assetId": "76e2cbdf0fa82f8b3dd8c53d2432a217",
        "uploadedAt": "2026-03-23T13:37:58Z"
    },
    {
        "id": "master 20260323 215706 [FPS 2x3]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 215706 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774273074/revision-arts/master%2020260323%20215706%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271556/revision-arts/prompt_20260323_215706_%5BFPS_2x3%5D",
        "assetId": "d34dc817e5b658548c2a1a3eacb19081",
        "uploadedAt": "2026-03-23T13:37:54Z"
    },
    {
        "id": "master 20260323 215729 [FPS 4x5]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 215729 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774273011/revision-arts/master%2020260323%20215729%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271555/revision-arts/prompt_20260323_215729_%5BFPS_4x5%5D",
        "assetId": "853e035879f45141e0f503fe77f8add3",
        "uploadedAt": "2026-03-23T13:36:51Z"
    },
    {
        "id": "master 20260323 215731 [FPS 9x16]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 215731 [FPS 9x16]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774273001/revision-arts/master%2020260323%20215731%20%5BFPS%209x16%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271554/revision-arts/prompt_20260323_215731_%5BFPS_9x16%5D",
        "assetId": "f6e044870760a297e9a846d8cf285edd",
        "uploadedAt": "2026-03-23T13:36:41Z"
    },
    {
        "id": "master 20260323 215753 [FPS 3x4]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 215753 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272961/revision-arts/master%2020260323%20215753%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271553/revision-arts/prompt_20260323_215753_%5BFPS_3x4%5D",
        "assetId": "457a4ddfdd2c48ad07c51008f87ec582",
        "uploadedAt": "2026-03-23T13:36:01Z"
    },
    {
        "id": "master 20260323 215800 [FPS 4x5]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 215800 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272956/revision-arts/master%2020260323%20215800%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271552/revision-arts/prompt_20260323_215800_%5BFPS_4x5%5D",
        "assetId": "6b27c7a8c08c22bba94032b7aac18537",
        "uploadedAt": "2026-03-23T13:35:56Z"
    },
    {
        "id": "master 20260323 215819 [FPS 9x16]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 215819 [FPS 9x16]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272952/revision-arts/master%2020260323%20215819%20%5BFPS%209x16%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271551/revision-arts/prompt_20260323_215819_%5BFPS_9x16%5D",
        "assetId": "2832ed9f8b7421035d61727c363ab545",
        "uploadedAt": "2026-03-23T13:35:52Z"
    },
    {
        "id": "master 20260323 215830 [FPS 2x3]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 215830 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272948/revision-arts/master%2020260323%20215830%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271550/revision-arts/prompt_20260323_215830_%5BFPS_2x3%5D",
        "assetId": "1a5d6bced3e16867cccb698a8586ca2f",
        "uploadedAt": "2026-03-23T13:35:48Z"
    },
    {
        "id": "master 20260323 215847 [FPS 1x1]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 215847 [FPS 1x1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272945/revision-arts/master%2020260323%20215847%20%5BFPS%201x1%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271549/revision-arts/prompt_20260323_215847_%5BFPS_1x1%5D",
        "assetId": "8f8f37bf2c93b5e68b068e3b45c11b93",
        "uploadedAt": "2026-03-23T13:35:45Z"
    },
    {
        "id": "master 20260323 215919 [FPS 1x1]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 215919 [FPS 1x1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272934/revision-arts/master%2020260323%20215919%20%5BFPS%201x1%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271548/revision-arts/prompt_20260323_215919_%5BFPS_1x1%5D",
        "assetId": "807af23a40974c1d4ca8e8dd1727c969",
        "uploadedAt": "2026-03-23T13:35:34Z"
    },
    {
        "id": "master 20260323 215935 [FPS 4x5]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 215935 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272931/revision-arts/master%2020260323%20215935%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271547/revision-arts/prompt_20260323_215935_%5BFPS_4x5%5D",
        "assetId": "f943c9f6434dba86b6682a2ad31855bf",
        "uploadedAt": "2026-03-23T13:35:31Z"
    },
    {
        "id": "master 20260323 215945 [FPS 1x1]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 215945 [FPS 1x1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272902/revision-arts/master%2020260323%20215945%20%5BFPS%201x1%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271546/revision-arts/prompt_20260323_215945_%5BFPS_1x1%5D",
        "assetId": "3fb4f49a903d899303805e2ab381ce6b",
        "uploadedAt": "2026-03-23T13:35:02Z"
    },
    {
        "id": "master 20260323 220005 [FPS 9x16]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 220005 [FPS 9x16]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272897/revision-arts/master%2020260323%20220005%20%5BFPS%209x16%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271546/revision-arts/prompt_20260323_220005_%5BFPS_9x16%5D",
        "assetId": "dd8081a41d6254442c06028e1d318e8d",
        "uploadedAt": "2026-03-23T13:34:57Z"
    },
    {
        "id": "master 20260323 220010 [FPS 1x1]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 220010 [FPS 1x1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272891/revision-arts/master%2020260323%20220010%20%5BFPS%201x1%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271545/revision-arts/prompt_20260323_220010_%5BFPS_1x1%5D",
        "assetId": "ffb9155fba2aa0679fca10eac347095a",
        "uploadedAt": "2026-03-23T13:34:51Z"
    },
    {
        "id": "master 20260323 220033 [FPS 1x1]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 220033 [FPS 1x1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272886/revision-arts/master%2020260323%20220033%20%5BFPS%201x1%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271543/revision-arts/prompt_20260323_220033_%5BFPS_1x1%5D",
        "assetId": "865b2cb9695d149cfbb4bafc8adee7af",
        "uploadedAt": "2026-03-23T13:34:46Z"
    },
    {
        "id": "master 20260323 220040 [FPS 4x5]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 220040 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272882/revision-arts/master%2020260323%20220040%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271542/revision-arts/prompt_20260323_220040_%5BFPS_4x5%5D",
        "assetId": "42c5f85f316ed9113956862766b0f9e3",
        "uploadedAt": "2026-03-23T13:34:42Z"
    },
    {
        "id": "master 20260323 220103 [FPS 3x4]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 220103 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272878/revision-arts/master%2020260323%20220103%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271541/revision-arts/prompt_20260323_220103_%5BFPS_3x4%5D",
        "assetId": "0ed025d157aeaed1888eb720b15e895b",
        "uploadedAt": "2026-03-23T13:34:38Z"
    },
    {
        "id": "master 20260323 220109 [FPS 4x5]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 220109 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272875/revision-arts/master%2020260323%20220109%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271540/revision-arts/prompt_20260323_220109_%5BFPS_4x5%5D",
        "assetId": "a5a77cb52212648934fec964a8d6aac0",
        "uploadedAt": "2026-03-23T13:34:35Z"
    },
    {
        "id": "master 20260323 220128 [FPS 4x5]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 220128 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272872/revision-arts/master%2020260323%20220128%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271539/revision-arts/prompt_20260323_220128_%5BFPS_4x5%5D",
        "assetId": "bc375c880c3c06508db9ad69d43dc627",
        "uploadedAt": "2026-03-23T13:34:32Z"
    },
    {
        "id": "master 20260323 220135 [FPS 3x4]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 220135 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272851/revision-arts/master%2020260323%20220135%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271538/revision-arts/prompt_20260323_220135_%5BFPS_3x4%5D",
        "assetId": "053e1d5c750ca7038af1274c808ac8ca",
        "uploadedAt": "2026-03-23T13:34:11Z"
    },
    {
        "id": "master 20260323 220155 [FPS 1x1]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 220155 [FPS 1x1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272848/revision-arts/master%2020260323%20220155%20%5BFPS%201x1%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271537/revision-arts/prompt_20260323_220155_%5BFPS_1x1%5D",
        "assetId": "1731f0794e0dd00b7d16f3c6d26c42d0",
        "uploadedAt": "2026-03-23T13:34:08Z"
    },
    {
        "id": "master 20260323 220226 [FPS 4x5]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 220226 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272844/revision-arts/master%2020260323%20220226%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271537/revision-arts/prompt_20260323_220226_%5BFPS_4x5%5D",
        "assetId": "20f1bc21ce1a7eab883fd7fb07e3aa94",
        "uploadedAt": "2026-03-23T13:34:04Z"
    },
    {
        "id": "master 20260323 220251 [FPS 4x5]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 220251 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272841/revision-arts/master%2020260323%20220251%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271536/revision-arts/prompt_20260323_220251_%5BFPS_4x5%5D",
        "assetId": "a3b1005d2e6b1826d6d51704f9012a93",
        "uploadedAt": "2026-03-23T13:34:01Z"
    },
    {
        "id": "master 20260323 220321 [FPS 3x4]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 220321 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272837/revision-arts/master%2020260323%20220321%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271535/revision-arts/prompt_20260323_220321_%5BFPS_3x4%5D",
        "assetId": "b1fee7385d4f0a3ef846c66093b3a518",
        "uploadedAt": "2026-03-23T13:33:57Z"
    },
    {
        "id": "master 20260323 220349 [FPS 9x16]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 220349 [FPS 9x16]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272834/revision-arts/master%2020260323%20220349%20%5BFPS%209x16%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271534/revision-arts/prompt_20260323_220349_%5BFPS_9x16%5D",
        "assetId": "7e13db0df335bd827ffa0306e8dff2af",
        "uploadedAt": "2026-03-23T13:33:54Z"
    },
    {
        "id": "master 20260323 220416 [FPS 1x1]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 220416 [FPS 1x1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272831/revision-arts/master%2020260323%20220416%20%5BFPS%201x1%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271532/revision-arts/prompt_20260323_220416_%5BFPS_1x1%5D",
        "assetId": "c46d6d04b3f227a6d8684bc3ce15f70d",
        "uploadedAt": "2026-03-23T13:33:51Z"
    },
    {
        "id": "master 20260323 220502 [FPS 1x1]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 220502 [FPS 1x1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272745/revision-arts/master%2020260323%20220502%20%5BFPS%201x1%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271530/revision-arts/prompt_20260323_220502_%5BFPS_1x1%5D",
        "assetId": "718208fabfff480545b0b654166bc248",
        "uploadedAt": "2026-03-23T13:32:25Z"
    },
    {
        "id": "master 20260323 220518 [FPS 4x5]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 220518 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272682/revision-arts/master%2020260323%20220518%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271529/revision-arts/prompt_20260323_220518_%5BFPS_4x5%5D",
        "assetId": "62dfcbcae091c7915b9aad0956ed14b7",
        "uploadedAt": "2026-03-23T13:31:22Z"
    },
    {
        "id": "master 20260323 220529 [FPS 1x1]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 220529 [FPS 1x1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272627/revision-arts/master%2020260323%20220529%20%5BFPS%201x1%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271528/revision-arts/prompt_20260323_220529_%5BFPS_1x1%5D",
        "assetId": "9f8db6dcbf2d93c35343d78cfc3febc3",
        "uploadedAt": "2026-03-23T13:30:27Z"
    },
    {
        "id": "master 20260323 220555 [FPS 4x5]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 220555 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272616/revision-arts/master%2020260323%20220555%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271528/revision-arts/prompt_20260323_220555_%5BFPS_4x5%5D",
        "assetId": "a94ec4e654b5b7f8704be1f2975c59ff",
        "uploadedAt": "2026-03-23T13:30:16Z"
    },
    {
        "id": "master 20260323 220624 [FPS 4x5]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 220624 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272589/revision-arts/master%2020260323%20220624%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271526/revision-arts/prompt_20260323_220624_%5BFPS_4x5%5D",
        "assetId": "bad468575c82e9a6e20d255b18c7d611",
        "uploadedAt": "2026-03-23T13:29:49Z"
    },
    {
        "id": "master 20260323 220646 [FPS 4x5]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 220646 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272583/revision-arts/master%2020260323%20220646%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271525/revision-arts/prompt_20260323_220646_%5BFPS_4x5%5D",
        "assetId": "51b37188fd3522bf1c40057e0233cc50",
        "uploadedAt": "2026-03-23T13:29:43Z"
    },
    {
        "id": "master 20260323 220655 [FPS 3x4]",
        "tags": [
            "Sculpture"
        ],
        "title": "master 20260323 220655 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774272579/revision-arts/master%2020260323%20220655%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774271524/revision-arts/prompt_20260323_220655_%5BFPS_3x4%5D",
        "assetId": "b93e97b422581677ff1e7ccea92965e5",
        "uploadedAt": "2026-03-23T13:29:39Z"
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


const BATCH_SIZE = 25;
let currentViewerIndex = -1;
let isInfoEnabled = true; // Global state for info panel persistent visibility

window.toggleTheme = function() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const nextTheme = isLight ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('rv-theme', nextTheme);
};

// ── PINTEREST SLIDER ARCHITECTURE ──────────────────────────────────────────
const slider = document.getElementById('viewer-slider');
let isSliderScrolling = false;

let sliderObserver = null;

function initViewerSlider() {
    if (!slider) return;
    if (window.innerWidth > 1024) {
        slider.innerHTML = ''; // Keep slider empty on PC to avoid layout noise
        if (sliderObserver) sliderObserver.disconnect();
        return;
    }
    
    // Disconnect old observer to prevent duplicates
    if (sliderObserver) sliderObserver.disconnect();
    
    slider.innerHTML = '';
    
    // A modern observer to track exactly which slide naturally snaps into the center viewport
    sliderObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Keep the active slide cleanly marked for isolated zooming
                const allSlides = slider.querySelectorAll('.viewer-slide');
                allSlides.forEach(s => s.classList.remove('active-slide'));
                entry.target.classList.add('active-slide');

                if (!isSliderScrolling) {
                    const index = parseInt(entry.target.dataset.index);
                    if (!isNaN(index) && index !== currentViewerIndex) {
                        updateViewerMetadata(index);
                    }
                }
            }
        });
    }, {
        root: slider,
        threshold: 0.6 // Trigger when 60% visible
    });

    filteredItems.forEach((item, index) => {
        const slide = document.createElement('div');
        slide.className = 'viewer-slide';
        slide.dataset.index = index; // Embed index to track elegantly
        
        const img = document.createElement('img');
        img.dataset.src = item.url;
        img.alt = escapeHtml(item.title);
        
        slide.appendChild(img);
        slider.appendChild(slide);
        
        sliderObserver.observe(slide);
    });
}
// Removed redundant initViewerSlider() call here.



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
// Layout Logic (Masonry)
// --------------------------------------------------------------------------

// GLOBAL ResizeObserver for all grid cards, prevents memory leaks from creating 1 per card
const globalGridObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
        resizeGridItem(entry.target);
    }
});

window.updateDensity = function (cols) {
    const safeCols = Math.max(1, parseInt(cols));
    document.documentElement.style.setProperty('--grid-cols', safeCols);
};

window.resizeGridItem = function (item) {
    const media = item.querySelector('.card-media');
    if (!media) return;
    
    // [ROBUST MASONRY CALC] 
    // On mobile, if an element is just added, getBoundingClientRect().height might 
    // return 0 or 1 before the grid layout settles.
    let contentHeight = media.getBoundingClientRect().height;
    
    // Fallback: If height is 0/1 but we have an aspect-ratio, calculate height from width
    if (contentHeight <= 1) {
        const width = item.getBoundingClientRect().width;
        const ratioStr = media.style.aspectRatio || media.dataset.defaultRatio || '3 / 4';
        const parts = ratioStr.split('/').map(p => parseFloat(p.trim()));
        if (parts.length === 2 && parts[1] !== 0 && width > 0) {
            const ratio = parts[0] / parts[1];
            contentHeight = width / ratio;
        }
    }

    const pb = parseFloat(window.getComputedStyle(item).paddingBottom) || 0;
    const finalSpan = Math.ceil(contentHeight + pb);
    
    // Only update if changed to avoid ResizeObserver feedback loops
    if (item.style.gridRowEnd !== `span ${finalSpan}`) {
        item.style.gridRowEnd = `span ${finalSpan}`;
    }
};

window.addEventListener('resize', () => {
    const allItems = document.querySelectorAll('.rv-card');
    allItems.forEach(item => resizeGridItem(item));
});


let itemsRendered = 0;
let observer = null;

function renderAll() {
    itemsRendered = 0;

    galleryContainer.innerHTML = '';
    
    // Create initial batch
    renderNextBatch();
    
    // Setup observer for infinite scroll
    if (observer) observer.disconnect();
    
    observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            renderNextBatch();
        }
    }, { rootMargin: '1200px' });

    setupSentinel();
}

function setupSentinel() {
    let sentinel = document.getElementById('sentinel');
    if (!sentinel) {
        sentinel = document.createElement('div');
        sentinel.id = 'sentinel';
        sentinel.style.height = '10px';
        sentinel.style.width = '100%';
    }
    galleryContainer.after(sentinel);
    observer.observe(sentinel);
}

function renderNextBatch() {
    if (itemsRendered >= filteredItems.length) {
        loader.style.display = 'none';
        return;
    }

    const nextBatch = filteredItems.slice(itemsRendered, itemsRendered + BATCH_SIZE);
    
    nextBatch.forEach((item, index) => {
        const absoluteIndex = itemsRendered + index;
        const card = document.createElement('div');
        card.className = 'rv-card';

        // ── SECURITY: Build card via DOM API to prevent XSS ──
        const cardMedia = document.createElement('div');
        cardMedia.className = 'card-media';
        
        // [STABLE ORGANIC MASONRY SYSTEM]
        // Pick a deterministic ratio from a set of "premium" masonry-friendly ratios.
        // This gives the "organic/mixed" look without the "jolt" because the 
        // skeleton is stable from the start.
        const PRESET_RATIOS = ['3 / 4', '4 / 5', '1 / 1', '2 / 3', '5 / 7', '4 / 3'];
        const hash = (item.id || '').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const assignedRatio = PRESET_RATIOS[hash % PRESET_RATIOS.length];
        
        cardMedia.style.aspectRatio = assignedRatio;
        cardMedia.dataset.defaultRatio = assignedRatio;
        
        // Handle click at the parent level so pseudo-elements (like ::after) don't block it
        cardMedia.onclick = () => openViewer(absoluteIndex);

        const img = document.createElement('img');
        img.src = item.url;
        img.loading = 'lazy'; // Standard browser optimization
        img.alt = escapeHtml(item.title);
        img.onload = function() { 
            // We NO LONGER update the aspect-ratio here to prevent the "jolt".
            // The varied skeletons + object-fit: cover provides the perfect 
            // balance of organic variety and rigid UI stability.
            this.classList.add('loaded'); 
            cardMedia.classList.add('loaded');
        };


        img.onerror = function() { card.style.display = 'none'; };

        const overlay = document.createElement('div');
        overlay.className = 'card-overlay';
        overlay.onclick = () => openViewer(absoluteIndex);
        overlay.innerHTML = `<div class="zoom-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg></div>`;

        cardMedia.appendChild(img);
        cardMedia.appendChild(overlay);
        card.appendChild(cardMedia);

        // Staggered Entrance Animation
        card.style.animationDelay = `${index * 0.04}s`;

        globalGridObserver.observe(card);
        galleryContainer.appendChild(card);
        // Layout is now ONLY driven by aspect-ratio CSS + ResizeObserver.
        // No manual resizeGridItem call here — it causes double-measure position stealing.
    });

    itemsRendered += BATCH_SIZE;
    if (itemsRendered >= filteredItems.length) loader.style.display = 'none';
}

// --------------------------------------------------------------------------
// Custom Cinematic Viewer Logic
// --------------------------------------------------------------------------

// ── Mobile Canvas Engine ──────────────────────────────────────────────────
// Three-slot virtual track: [prev | curr | next]
// JS directly controls translateX on #mobile-canvas, never touches scroll.
// Pinch zoom and pan are computed from raw Touch coordinates, completely
// independent of any browser scroll mechanism.

const mCanvas       = document.getElementById('mobile-canvas');
let mSlotPrev       = document.getElementById('canvas-prev');
let mSlotCurr       = document.getElementById('canvas-curr');
let mSlotNext       = document.getElementById('canvas-next');
const mInfoOverlay  = document.getElementById('m-info-overlay');
const mDiscoverySheet = document.getElementById('m-discovery-sheet');
const mScrollWrapper = document.getElementById('m-scroll-wrapper');

// Automatically close info panel if user scrolls down
if (mScrollWrapper) {
    mScrollWrapper.addEventListener('scroll', () => {
        if (mcInfoOpen && mScrollWrapper.scrollTop > 20) {
            mcCloseInfo();
        }
        
        // Hide ghost controls when scrolling past top
        const controls = document.getElementById('m-viewer-controls');
        if (controls) {
            if (mScrollWrapper.scrollTop > 100) {
                controls.classList.add('hidden-on-scroll');
            } else {
                controls.classList.remove('hidden-on-scroll');
            }
        }
    }, { passive: true });
}

// Track state
let mcIndex         = 0;        // current image index in filteredItems
let mcScale         = 1;        // current zoom level
let mcTx            = 0;        // image pan X
let mcTy            = 0;        // image pan Y
let mcInfoOpen      = false;    // info layer state
let mcDiscoveryOpen = false;    // discovery panel state


// Touch tracking for state machine
const MC = {
    state: 'IDLE',  // IDLE | DRAG | PINCH | SNAP
    t0x: 0, t0y: 0,         // initial touch position
    tx: 0,  ty: 0,          // last touch position
    px: 0,  py: 0,          // track X during drag
    pDist: 0,               // pinch initial distance
    pScale: 1,              // pinch base scale
    pCx: 0, pCy: 0,         // pinch center
    baseImgTx: 0, baseImgTy: 0, // image offset when pinch started
    startTime: 0,
    tapTimer: null,
    tapCount: 0,
};

const MC_W = () => window.innerWidth;

function mcSetTrack(offsetX, animated) {
    // offsetX = canvas track translateX (e.g. -MC_W() for prev, 0 for curr, +MC_W() for next)
    mCanvas.style.transition = animated ? 'transform 0.32s cubic-bezier(0.22,1,0.36,1)' : 'none';
    mCanvas.style.transform = `translateX(${offsetX}px)`;
}

function mcSetImage(img, item) {
    // Apply zoom+pan transform to the image in curr slot
    img.style.transition = 'none';
    img.style.transform = `translate(${mcTx}px, ${mcTy}px) scale(${mcScale})`;
}

function mcResetZoom(animated) {
    mcScale = 1; mcTx = 0; mcTy = 0;
    const img = mSlotCurr.querySelector('img');
    if (!img) return;
    if (animated) img.style.transition = 'transform 0.3s cubic-bezier(0.22,1,0.36,1)';
    else img.style.transition = 'none';
    img.style.transform = 'translate(0,0) scale(1)';
}

function showGlobalToast(msg) {
    let toast = document.getElementById('global-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'global-toast';
        toast.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, calc(-50% + 15px));
            background: rgba(20, 20, 24, 0.95);
            color: #fff;
            padding: 12px 24px;
            border-radius: 0px;
            font-size: 13px;
            font-weight: 600;
            text-transform: uppercase;
            z-index: 9999;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1), transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
            border: 1px solid rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
        `;
        document.body.appendChild(toast);
    }
    toast.innerText = msg;
    // Trigger paint
    void toast.offsetWidth;
    toast.style.transform = 'translate(-50%, -50%)';
    toast.style.opacity = '1';
    
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
        toast.style.transform = 'translate(-50%, calc(-50% + 15px))';
        toast.style.opacity = '0';
    }, 1200);
}

function mcLoadSlot(slot, index) {
    const img = slot.querySelector('img');
    if (!img) return;
    if (filteredItems.length === 0) {
        img.src = '';
        img.style.opacity = '0';
        return;
    }
    
    // Array wrapping logic for infinite scrolling
    const wrappedIndex = (index % filteredItems.length + filteredItems.length) % filteredItems.length;
    const item = filteredItems[wrappedIndex];

    img.style.transition = 'none';
    img.style.transform = 'translate(0,0) scale(1)';
    img.onload = () => { img.style.transition = 'opacity 0.3s'; img.style.opacity = '1'; };

    // Prevent onload caching bug when re-assigning the exact same source
    const targetSrc = item.url;
    if (img.getAttribute('src') === targetSrc || img.src.endsWith(targetSrc)) {
         img.style.transition = 'opacity 0.3s'; img.style.opacity = '1';
    } else {
         img.style.opacity = '0';
         img.src = targetSrc;
    }
    preloadPromptText(wrappedIndex);
}

function mcNavigate(step) {
    if (isAnimatingViewer) return;
    
    if (filteredItems.length <= 1) {
        showGlobalToast("A Sole Presence");
        mcSetTrack(0, true);
        return;
    }
    
    const next = (mcIndex + step + filteredItems.length) % filteredItems.length;
    isAnimatingViewer = true;
    
    // Smooth Native Swipe Animation
    const targetX = step > 0 ? -window.innerWidth : window.innerWidth;
    mcSetTrack(targetX, true);
    
    // Wait for the CSS transition (0.32s) to finish before tricking the eye
    setTimeout(() => {
        mcResetZoom(false);
        mcIndex = next;
        
        // DOM Node Rotation to completely eliminate flickering
        if (step > 0) {
            const oldPrev = mSlotPrev;
            mSlotPrev = mSlotCurr;
            mSlotCurr = mSlotNext;
            mSlotNext = oldPrev;
        } else {
            const oldNext = mSlotNext;
            mSlotNext = mSlotCurr;
            mSlotCurr = mSlotPrev;
            mSlotPrev = oldNext;
        }

        // Apply visual positions overriding CSS
        mSlotPrev.style.left = '-100%';
        mSlotCurr.style.left = '0';
        mSlotNext.style.left = '100%';

        mcSetTrack(0, false);
        
        // Only load the new outer wing
        if (step > 0) {
            mcLoadSlot(mSlotNext, mcIndex + 1);
        } else {
            mcLoadSlot(mSlotPrev, mcIndex - 1);
        }
        
        updateViewerMetadata(mcIndex);
        isAnimatingViewer = false;
    }, 320);
}

function mcOpenInfo() {
    mcInfoOpen = true;
    const overlay = document.getElementById('m-info-overlay');
    overlay?.classList.add('open');
    document.getElementById('m-info-btn')?.classList.add('active');
    
    // Swipe-down to close for Info Overlay (now handled globally by canvas & scroll wrapper)

    // Populate mobile-specific text fields is handled completely by updateViewerMetadata(mcIndex)
    // No redundant mapping here to prevent overriding title formatting 
}

function mcCloseInfo() {
    mcInfoOpen = false;
    document.getElementById('m-info-overlay')?.classList.remove('open');
    document.getElementById('m-info-btn')?.classList.remove('active');
}



window.mcOpenDiscovery = function() {
    mcDiscoveryOpen = true;
    const sheet = document.getElementById('m-discovery-sheet');
    sheet?.classList.add('open');
    initDiscoveryGrid();

    // Swipe-down to close for Discovery Sheet
    if (sheet && !sheet._initSwipe) {
        sheet._initSwipe = true;
        let t0y = 0;
        sheet.addEventListener('touchstart', (e) => {
             // Only if at the top of scroll
             const grid = document.getElementById('m-discovery-grid');
             if (grid && grid.scrollTop > 5) return; 
             t0y = e.touches[0].clientY;
        }, {passive: true});
        sheet.addEventListener('touchend', (e) => {
             const t1y = e.changedTouches[0].clientY;
             if (t1y - t0y > 100) mcCloseDiscovery();
        }, {passive: true});
    }
};

window.mcCloseDiscovery = function() {
    mcDiscoveryOpen = false;
    document.getElementById('m-discovery-sheet')?.classList.remove('open');
};


let discoveryPool = [];
let discoveryRendered = 0;
let discoveryObserver = null;
let discoveryCurrentId = null;

window.initDiscoveryGrid = function() {
    const dGrid = document.getElementById('m-discovery-grid');
    if (!dGrid) return;
    
    const currentItem = filteredItems[mcIndex];
    const currentId = currentItem ? generateAssetId(currentItem) : '';
    
    // Always refresh if image changed
    if (discoveryCurrentId !== currentId) {
        dGrid.innerHTML = '';
        discoveryCurrentId = currentId;
    }
    
    if (dGrid.innerHTML === '') {
        // Now using filteredItems instead of STREAM_RECORDS so discovery stays within current category
        discoveryPool = filteredItems.filter(i => generateAssetId(i) !== currentId);
        // Shuffle pool
        for (let i = discoveryPool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [discoveryPool[i], discoveryPool[j]] = [discoveryPool[j], discoveryPool[i]];
        }
        
        discoveryRendered = 0;
        
        if (discoveryObserver) discoveryObserver.disconnect();
        discoveryObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                renderNextDiscoveryBatch(dGrid);
            }
        }, { rootMargin: '800px' });
        
        renderNextDiscoveryBatch(dGrid);
        
        let sentinel = document.getElementById('discovery-sentinel');
        if (!sentinel) {
            sentinel = document.createElement('div');
            sentinel.id = 'discovery-sentinel';
            sentinel.style.height = '40px';
            sentinel.style.width = '100%';
        }
        dGrid.appendChild(sentinel);
        discoveryObserver.observe(sentinel);
    }
};
function renderNextDiscoveryBatch(dGrid) {

    if (discoveryRendered >= discoveryPool.length) return;
    
    const nextBatch = discoveryPool.slice(discoveryRendered, discoveryRendered + 20);
    
    nextBatch.forEach((item) => {
        const realIdx = filteredItems.findIndex(fi => generateAssetId(fi) === generateAssetId(item));
        
        const card = document.createElement('div');
        card.className = 'm-discovery-card rv-card'; // Added rv-card for general styles
        card.onclick = (e) => {
            e.stopPropagation();
            if (realIdx !== -1) {
                openViewer(realIdx);
            } else {
                mobileFilterAll(); // Reset filter first
                setTimeout(() => {
                    const idxToOpen = filteredItems.findIndex(fi => generateAssetId(fi) === generateAssetId(item));
                    if (idxToOpen !== -1) openViewer(idxToOpen);
                }, 100);
            }
        };

        const media = document.createElement('div');
        media.className = 'card-media';

        // [STABLE ORGANIC MASONRY SYSTEM - SYNCED]
        // Must match the main gallery logic exactly to prevent mobile layout glitches.
        const PRESET_RATIOS = ['3 / 4', '4 / 5', '1 / 1', '2 / 3', '5 / 7', '4 / 3'];
        const hash = (item.id || '').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const assignedRatio = PRESET_RATIOS[hash % PRESET_RATIOS.length];
        
        media.style.aspectRatio = assignedRatio;
        media.dataset.defaultRatio = assignedRatio;
        
        const img = document.createElement('img');
        img.src = item.url;
        img.loading = 'lazy';
        img.onload = function() {
            // Only transition opacity — ResizeObserver handles grid span.
            this.classList.add('loaded');
            media.classList.add('loaded');
        };
        img.onerror = function() {
            card.style.display = 'none';
        };
        
        media.appendChild(img);
        card.appendChild(media);
        
        // [SYNCED WITH MAIN GALLERY] Add cards directly to dGrid
        dGrid.appendChild(card);
        
        // Add ResizeObserver for responsive masonry
        globalGridObserver.observe(card);
        // Layout is driven by aspect-ratio CSS + ResizeObserver ONLY.
        // No manual resizeGridItem call — it causes double-measure position stealing (same as main gallery).
    });

    // Move sentinel to end (triggers single bulk re-layout instead of 20 times)
    const sentinel = document.getElementById('discovery-sentinel');
    if (sentinel) dGrid.appendChild(sentinel);

    discoveryRendered += nextBatch.length;
}

window.toggleMobileInfo = function() {
    if (mcInfoOpen) mcCloseInfo();
    else mcOpenInfo();
};

window.mobileFilterAll = function() {
    // Hide dropdown if open
    document.getElementById('m-category-dropdown')?.classList.remove('open');
    document.getElementById('m-category-btn')?.classList.remove('open');
    
    const textSpan = document.getElementById('m-active-category-text');
    if (textSpan) textSpan.innerText = 'ALL';
    
    document.querySelectorAll('.m-cat-item').forEach(i => {
        i.classList.toggle('active', i.innerText === 'ALL');
    });
    
    // Trigger existing logic
    const allChip = document.querySelector('.filter-chip[data-category="all"]');
    if (allChip) allChip.click();
};

window.toggleMobileCategory = function() {
    const dropdown = document.getElementById('m-category-dropdown');
    const btn = document.getElementById('m-category-btn');
    if (!dropdown || !btn) return;
    
    const isOpen = dropdown.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    
    if (isOpen) {
        // Build list if empty
        const list = document.getElementById('m-category-list');
        if (list && list.children.length === 0) {
            const dynamicCategories = getDynamicCategories();
            dynamicCategories.forEach(cat => {
                const item = document.createElement('button');
                item.className = 'm-cat-item';
                item.innerText = cat.label;
                item.onclick = () => {
                    // Update header visual
                    const textSpan = document.getElementById('m-active-category-text');
                    if (textSpan) textSpan.innerText = cat.label;
                    
                    btn.classList.remove('open');
                    dropdown.classList.remove('open');
                    
                    // Highlight selected item in dropdown
                    document.querySelectorAll('.m-cat-item').forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                    
                    // Trigger actual filter
                    const chip = document.querySelector(`.filter-chip[data-category="${cat.id}"]`);
                    if (chip) chip.click();
                };
                list.appendChild(item);
            });
        }
    }
};

// Clamp a value
function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

// Distance between two touch points
function pinchDist(t1, t2) {
    return Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
}
function pinchCenter(t1, t2) {
    return { x: (t1.clientX + t2.clientX) / 2, y: (t1.clientY + t2.clientY) / 2 };
}

// ── State Machine Touch Handlers ──────────────────────────────────────────
let isAnimatingViewer = false;

if (mCanvas) {
    mCanvas.addEventListener('touchstart', (e) => {
        if (isAnimatingViewer) return;
        const isInteractive = e.target.closest('button, a, input, [onclick]');
        if (isInteractive) return;

        const touches = e.touches;

        if (touches.length === 1) {
            MC.state = 'DRAG';
            MC.t0x = MC.tx = touches[0].clientX;
            MC.t0y = MC.ty = touches[0].clientY;
            MC.px = 0;
            MC.axis = null;
            MC.baseImgTx = mcTx;
            MC.baseImgTy = mcTy;
            MC.startTime = Date.now();

            // Double-tap detection
            clearTimeout(MC.tapTimer);
            MC.tapCount++;
            if (MC.tapCount === 2) {
                MC.tapCount = 0;
                if (mcScale > 1) {
                    mcResetZoom(true);
                } else {
                    mcScale = 2.5;
                    mcTx = 0; mcTy = 0;
                    const img = mSlotCurr.querySelector('img');
                    if (img) {
                        img.style.transition = 'transform 0.3s cubic-bezier(0.22,1,0.36,1)';
                        img.style.transform = `translate(0,0) scale(2.5)`;
                    }
                }
                return;
            }
            MC.tapTimer = setTimeout(() => { MC.tapCount = 0; }, 350);

        } else if (touches.length === 2) {
            MC.state = 'PINCH';
            MC.pDist = pinchDist(touches[0], touches[1]);
            MC.pScale = mcScale;
            const c = pinchCenter(touches[0], touches[1]);
            MC.pCx = c.x; MC.pCy = c.y;
            MC.baseImgTx = mcTx;
            MC.baseImgTy = mcTy;
        }
    }, { passive: true }); // passive: Y-axis scroll is native

    mCanvas.addEventListener('touchmove', (e) => {
        const touches = e.touches;
        const img = mSlotCurr.querySelector('img');
        if (!img) return;

        if (MC.state === 'PINCH' && touches.length >= 2) {
            e.preventDefault();
            const newDist = pinchDist(touches[0], touches[1]);
            const newScale = clamp(MC.pScale * (newDist / MC.pDist), 1, 5);
            mcScale = newScale;
            img.style.transition = 'none';
            img.style.transform = `translate(${mcTx}px, ${mcTy}px) scale(${mcScale})`;
            return;
        }

        if (MC.state !== 'DRAG' || touches.length !== 1) return;

        const cx = touches[0].clientX;
        const cy = touches[0].clientY;
        const dx = cx - MC.tx;
        MC.tx = cx;
        MC.ty = cy;

        // Determine axis lock (8px threshold)
        if (MC.axis === null) {
            const totalDx = Math.abs(cx - MC.t0x);
            const totalDy = Math.abs(cy - MC.t0y);
            if (totalDx > 8 || totalDy > 8) {
                MC.axis = totalDx > totalDy ? 'x' : 'y';
            }
        }

        if (mcScale > 1) {
            // PAN mode: block native scroll, move image
            e.preventDefault();
            mcTx = MC.baseImgTx + (cx - MC.t0x);
            mcTy = MC.baseImgTy + (cy - MC.t0y);
            img.style.transition = 'none';
            img.style.transform = `translate(${mcTx}px, ${mcTy}px) scale(${mcScale})`;
        } else if (MC.axis === 'x') {
            // HORIZONTAL SWIPE: JS takes over, block native scroll
            e.preventDefault();
            MC.px += dx;
            mcSetTrack(MC.px, false);
        }
        // Y-axis at scale=1: do nothing, let native scroll work
    }, { passive: false });

    mCanvas.addEventListener('touchend', (e) => {
        const isInteractive = e.target.closest('button, a, input, [onclick]');
        if (isInteractive) return;

        if (MC.state === 'PINCH') {
            MC.state = 'IDLE';
            if (mcScale <= 1.05) mcResetZoom(true);
            return;
        }

        if (MC.state !== 'DRAG') { MC.state = 'IDLE'; return; }
        MC.state = 'IDLE';

        if (mcScale > 1) return; // Stay in zoom mode

        const totalDx = MC.tx - MC.t0x;
        const totalDy = MC.ty - MC.t0y;
        const elapsed = Date.now() - MC.startTime;
        const velocityDx = Math.abs(totalDx) / elapsed;
        const velocityDy = Math.abs(totalDy) / elapsed;

        if (MC.axis === 'x') {
            // Horizontal swipe → navigate images
            const threshold = MC_W() * 0.22;
            if (totalDx < -threshold || (velocityDx > 0.35 && totalDx < -20)) {
                mcNavigate(1);
            } else if (totalDx > threshold || (velocityDx > 0.35 && totalDx > 20)) {
                mcNavigate(-1);
            } else {
                mcSetTrack(0, true); // Snap back
            }
        } else if (MC.axis === 'y') {
            // Swipe DOWN from the very top → close viewer (or close info first)
            const scrollWrapper = document.getElementById('m-scroll-wrapper');
            const atTop = !scrollWrapper || scrollWrapper.scrollTop < 5;
            if (atTop && totalDy > 80 && velocityDy > 0.2) {
                if (mcInfoOpen) {
                    mcCloseInfo();
                } else {
                    closeViewer();
                }
            }
        }
    }, { passive: true });
}

// ─────────────────────────────────────────────────────────────────────────

window.openViewer = async function (index) {
    const item = filteredItems[index];
    if (!item) return;

    currentViewerIndex = index;
    viewer.classList.add('active');
    
    const isMobile = window.innerWidth <= 1024;
    
    if (isMobile) {
        // Reset the SCROLL WRAPPER (not rv-viewer) to top
        const mScrollWrapper = document.getElementById('m-scroll-wrapper');
        if (mScrollWrapper) mScrollWrapper.scrollTop = 0;

        mcIndex = index;
        mcResetZoom(false);
        mcCloseInfo();
        mcSetTrack(0, false);

        // Load three slots
        mcLoadSlot(mSlotPrev, index - 1);
        mcLoadSlot(mSlotCurr, index);
        mcLoadSlot(mSlotNext, index + 1);

        // Populate discovery grid below the image
        initDiscoveryGrid();
        // Force a layout re-calc after the viewer opens and layout settles
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 150);

        // Mobile: DON'T lock body scroll — viewer itself scrolls
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        if (mainContent) mainContent.style.overflow = '';
    } else {
        // PC Mode: lock body scroll (viewer is full-screen flex)
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        if (mainContent) mainContent.style.overflow = 'hidden';

        resetImage(); 
        const vImg = document.getElementById('viewer-img');
        if (vImg) {
            vImg.onload = null; // Clean up old listener
            vImg.style.transition = 'opacity 0.2s'; // Fast fade
            
            // If already preloaded/cached, it might show instantly. 
            // We still dim it slightly to show "change" even if instant.
            vImg.style.opacity = '0.3'; 
            vImg.src = item.url;
            vImg.onload = () => {
                vImg.style.opacity = '1';
            };
        }
    }

    updateViewerMetadata(index);
};


// Preloader for cinematic viewer items
function preloadAdjacentImages(index) {
    if (index < 0 || index >= filteredItems.length) return;
    const target = filteredItems[index];
    if (target && target.url) {
        const p = new Image();
        p.src = target.url;
    }
}

function updateViewerMetadata(index) {
    const item = filteredItems[index];
    if (!item) return;
    currentViewerIndex = index;


    const titleEl = document.getElementById('viewer-title');
    
    // 💡 Global state to persist egg mode across transitions
    if (window.__eggMode === undefined) window.__eggMode = false;

    // ★ EASTER EGG Setup
    titleEl._eggCount = 0;
    clearTimeout(titleEl._eggTimer);
    
    const eggHandler = async function (e) {
        this._eggCount = (this._eggCount || 0) + 1;
        clearTimeout(this._eggTimer);
        
        if (this._eggCount >= 3) {
            this._eggCount = 0;
            window.__eggMode = !window.__eggMode;
            applyEggUIState(window.__eggMode);

            if (window.__eggMode) {
                const content = document.getElementById('prompt-content');
                if (content) fetchPromptContent(content, item);
            }
        } else {
            this._eggTimer = setTimeout(() => { this._eggCount = 0; }, 1500);
        }
    };

    titleEl.onclick = eggHandler;
    const mt = document.getElementById('m-viewer-title');
    if (mt) mt.onclick = eggHandler;

    // Ensure the inner branded spans don't block the click? 
    // They are within titleEl, so they should bubble up. 
    // But if there's any absolute positioning or pointer-events: none, I should check.

    // Branded Title Logic (Uses Asset ID parts for identity)
    const assetId = generateAssetId(item); // e.g. RV-20260321-8106
    const idParts = assetId.split('-');
    const datePart = idParts[1] || '';
    const suffixPart = idParts[2] || '';
    
    const brandedTitleHtml = `<span class="brand-prefix">REVISION ARTS</span><span class="brand-id">${datePart}-${suffixPart}</span>`;
    const realTitleHtml = (item.title || '').replace(/ /g, '_').split('_').map(p => `<span>${p}</span>`).join('_');

    // Store real title for egg mode toggle
    titleEl._realTitleHtml = realTitleHtml;
    titleEl._brandedTitleHtml = brandedTitleHtml;
    
    // Initial Render (Branded or Real based on current egg mode)
    titleEl.innerHTML = window.__eggMode ? realTitleHtml : brandedTitleHtml;
    applyEggUIState(window.__eggMode); // Sync panel classes

    if (mt) {
        mt._realTitleHtml = realTitleHtml;
        mt._brandedTitleHtml = brandedTitleHtml;
        mt.innerHTML = window.__eggMode ? realTitleHtml : brandedTitleHtml;
    }
    
    // Clickable Tags Rendering
    const tagContainer = document.getElementById('viewer-category');
    const mTagContainer = document.getElementById('m-viewer-category');
    
    const tagsHtml = (item.tags || []).map(tag => 
        `<span class="clickable-tag" onclick="event.stopPropagation(); filterByTag('${tag}')">${tag.toUpperCase()}</span>`
    ).join(' ');

    if (tagContainer) tagContainer.innerHTML = tagsHtml;
    if (mTagContainer) mTagContainer.innerHTML = tagsHtml;

    document.getElementById('viewer-desc').innerText = item.description;
    const md = document.getElementById('m-viewer-desc');
    if (md) md.innerText = item.description;
    
    // Robust Asset ID System (Dual-Source)
    const viewerDisplayId = generateAssetId(item);
    document.getElementById('viewer-id').innerText = viewerDisplayId;
    const mi = document.getElementById('m-viewer-id');
    if (mi) mi.innerText = viewerDisplayId;

    // URL Hash Sync for deep linking (Now using clean Asset ID)
    window.location.hash = viewerDisplayId;

    // ── PROMPT PANEL: Apply persistent egg mode state ──
    const promptContent = document.getElementById('prompt-content');
    if (promptContent) {
        if (promptContent._itemRef !== item) {
            if (item._promptText) {
                promptContent.textContent = item._promptText;
                promptContent._loaded = true;
            } else {
                // Instantly clear content during split-second fetch; no "Loading..." flicker
                promptContent.textContent = '';
                promptContent._loaded = false;
            }
            promptContent._itemRef = item;
        }
    }

    // Always apply the current mode state when a new image is opened
    applyEggUIState(window.__eggMode);
    if (window.__eggMode && promptContent && !promptContent._loaded) {
        fetchPromptContent(promptContent, item);
    }

    // Resolution update (Dual-Mode support)
    const isMobile = window.innerWidth <= 1024;
    let img;
    if (isMobile) {
        img = mSlotCurr?.querySelector('img');
    } else {
        img = document.getElementById('viewer-img');
    }

    if (img && img.naturalWidth) {
        const resStr = `${img.naturalWidth} x ${img.naturalHeight}`;
        const pcRes = document.getElementById('viewer-res');
        const mRes = document.getElementById('m-viewer-res');
        if (pcRes) pcRes.innerText = resStr;
        if (mRes) mRes.innerText = resStr;
    } else if (img) {
        // Use addEventListener to avoid overwriting the fade-in logic in mcLoadSlot
        const updateRes = () => {
            const resStr = `${img.naturalWidth} x ${img.naturalHeight}`;
            const pcRes = document.getElementById('viewer-res');
            const mRes = document.getElementById('m-viewer-res');
            if (pcRes) pcRes.innerText = resStr;
            if (mRes) mRes.innerText = resStr;
        };
        img.addEventListener('load', updateRes, { once: true });
    }

    // Lazy load next/prev in background
    preloadAdjacentImages(index + 1);
    preloadAdjacentImages(index - 1);
    preloadAdjacentImages(index + 2);
    preloadAdjacentImages(index - 2);

    // Also preload first few discovery items if in mobile (Preload from SHUFFLED pool)
    if (window.innerWidth <= 1024) {
        const dBatch = (typeof discoveryPool !== 'undefined' && discoveryPool.length > 0) 
            ? discoveryPool.slice(0, 8) 
            : STREAM_RECORDS.slice(0, 8);
        dBatch.forEach(i => {
            const pi = new Image();
            pi.src = i.url;
        });
    }
}

window.closeViewer = function () {
    isDragging = false; 
    viewer.classList.remove('active');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    if (mainContent) mainContent.style.overflow = 'auto';
    window.location.hash = '';

    // Mobile specific cleanup
    if (window.mcCloseInfo) mcCloseInfo();
    if (window.mcCloseDiscovery) mcCloseDiscovery();

    // Restore 'Move to Top' button visibility based on scroll position
    if (mainContent && mainContent.scrollTop > 400) {
        const topBtn = document.getElementById('move-to-top');
        if (topBtn) topBtn.classList.add('visible');
    }


    const menu = document.getElementById('share-menu');
    if (menu) menu.classList.remove('active');
};

window.toggleInfoGlobal = function () {
    isInfoEnabled = !isInfoEnabled;
    syncInfoState();
};

function syncInfoState() {
    const v = document.getElementById('rv-viewer');
    if (!v) return;
    if (isInfoEnabled) {
        v.classList.remove('info-collapsed');
    } else {
        v.classList.add('info-collapsed');
    }
}
syncInfoState(); // Initial sync on load to ensure PC start is consistent

viewer.addEventListener('contextmenu', (e) => {
    if (viewer.classList.contains('active')) {
        // Allow default context menu on image, info panel, and controls
        if (e.target.id === 'viewer-img' || 
            e.target.closest('.viewer-info-panel') || 
            e.target.closest('.viewer-controls')) {
            return; 
        }
        
        // Otherwise, use right-click to close the viewer
        e.preventDefault();
        closeViewer();
    }
});

window.filterByTag = function(tag) {
    if (viewer.classList.contains('active')) {
        closeViewer();
    }
    
    // Update mobile visual UI
    const mCatBtn = document.getElementById('m-category-btn');
    if (mCatBtn && window.innerWidth <= 1024) {
        // ── Sync header label text ──
        const textSpan = document.getElementById('m-active-category-text');
        if (textSpan) textSpan.innerText = String(tag).toUpperCase();

        document.getElementById('m-filter-all')?.classList.remove('active');
        mCatBtn.classList.add('active');
        mCatBtn.classList.remove('open');
        document.getElementById('m-category-dropdown')?.classList.remove('open');
        
        document.querySelectorAll('.m-cat-item').forEach(i => {
            if (i.innerText.trim().toLowerCase() === String(tag).toLowerCase()) {
                i.classList.add('active');
            } else {
                i.classList.remove('active');
            }
        });
    }

    // Trigger actual PC/Global underlying filter
    const chip = document.querySelector(`.filter-chip[data-category="${tag}"]`);
    if (chip) chip.click();
};

window.navViewer = function (step) {
    if (filteredItems.length <= 1) {
        showGlobalToast("A Sole Presence");
        return;
    }
    const isMobile = window.innerWidth <= 1024;
    if (isMobile) {
        mcNavigate(step);
    } else {
        let nextIndex = currentViewerIndex + step;
        if (nextIndex < 0) nextIndex = filteredItems.length - 1;
        if (nextIndex >= filteredItems.length) nextIndex = 0;
        openViewer(nextIndex); 
    }
};



window.copyViewerLinkDirect = function () {
    clearAllFeedback(); 
    const item = filteredItems[currentViewerIndex];
    if (!item) return;
    const cleanId = generateAssetId(item);
    const url = `${window.location.origin}${window.location.pathname}#${cleanId}`;
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
        case 'instagram': copyViewerLinkDirect(); return;
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




// Removed outside click listener for share menu since it's no longer a dropdown

// --------------------------------------------------------------------------
// Interactions & Events
// --------------------------------------------------------------------------

// Global Double-Click Reset: Reset image if anywhere in viewer is double-clicked
viewer.addEventListener('dblclick', (e) => {
    // Prevent trigger if clicking on buttons or info panel
    if (e.target.closest('.viewer-info-panel') || e.target.closest('.viewer-controls')) return;
    
    // --- Mobile Double Tap (Mathematical Toggle) ---
    if (window.innerWidth <= 1024) {
        activeTouchImage = slider.querySelectorAll('.viewer-slide')[currentViewerIndex]?.querySelector('img');
        if (!activeTouchImage) return;
        
        if (customScale > 1) {
            // Instantly unzoom, restore carousel functionality
            customScale = 1;
            customTranslateX = 0; customTranslateY = 0;
            activeTouchImage.style.transition = 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)';
            activeTouchImage.style.transform = `translate(0px, 0px) scale(1)`;
            slider.style.overflowX = 'scroll';
            viewer.classList.remove('global-fullscreen-zoom');
        } else {
            // Instantly zoom in 2.5x, lock carousel, hide UI
            customScale = 2.5;
            viewer.classList.add('global-fullscreen-zoom');
            isInfoEnabled = false; syncInfoState();
            slider.style.overflowX = 'hidden';
            activeTouchImage.style.transition = 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)';
            activeTouchImage.style.transform = `translate(0px, 0px) scale(2.5)`;
        }
        return;
    }
    
    // --- PC Mode Reset ---
    resetImage();
});

// The click listener is removed; Ghost UI is now perfectly handled by touchstart and click bubbling differently.

window.addEventListener('keydown', (e) => {
    if (!viewer.classList.contains('active')) return;
    if (e.key === 'Escape') closeViewer();
    if (e.key === 'ArrowLeft') navViewer(-1);
    if (e.key === 'ArrowRight') navViewer(1);
    if (e.key === 'ArrowUp') { e.preventDefault(); applyZoom(0.1); }
    if (e.key === 'ArrowDown') { e.preventDefault(); applyZoom(-0.1); }
    if (e.key.toLowerCase() === 'c') { e.preventDefault(); resetImage(); }
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

// Cleaned up duplicate openViewer logic


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
            
            // ── [SMOOTH FILTER TRANSITION] ─────────────────────────────────
            // Step 1: Fade out the gallery.
            galleryContainer.classList.add('filtering');
            
            // Step 2: After fade-out completes (~250ms), swap data and re-render.
            // New cards will already have a skeleton aspect-ratio set, so the grid
            // is stable immediately. No minHeight hack needed.
            setTimeout(() => {
                itemsRendered = 0;
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
                initViewerSlider(); 
                
                // Step 3: Fade back in on the next animation frame to ensure
                // the browser has had a chance to paint the skeleton grid first.
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        galleryContainer.classList.remove('filtering');
                    });
                });
                
                if (typeof scrollToTop === 'function') scrollToTop();
            }, 280); // Slightly longer than the 0.3s CSS transition to ensure fade-out completes
        });


        headerNav.appendChild(btn);
    });
}

window.handleMobileNav = function(tagId, btn) {
    // UI Update
    document.querySelectorAll('.mobile-nav-item').forEach(i => i.classList.remove('active'));
    btn.classList.add('active');

    // ── PREMIUM FADE-OUT & SWAP ───────────────────────────────────
    galleryContainer.style.minHeight = `${galleryContainer.scrollHeight}px`;
    galleryContainer.classList.add('filtering');
    
    setTimeout(() => {
        itemsRendered = 0;
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
        initViewerSlider(); 

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                galleryContainer.classList.remove('filtering');
                setTimeout(() => { galleryContainer.style.minHeight = ''; }, 300);
            });
        });

        if (typeof scrollToTop === 'function') scrollToTop();
    }, 280);
};

console.log('Gallery Initializing DYNAMICALLY...');
initFilters();
renderAll();
initViewerSlider(); 
// Fixed: Removed duplicate init calls at the end.

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
        // Resolve the clean Asset ID back to the gallery item
        const index = filteredItems.findIndex(i => generateAssetId(i) === hash);
        if (index !== -1) openViewer(index);
    }
});

// ── PROMPT PANEL LOGIC ───────────────────────────────────────────────────────
// 공용 fetch 헬퍼 & Prefetcher (이스터에그 + 로딩 딜레이 제거)
async function preloadPromptText(index) {
    const item = filteredItems[index];
    if (!item || !item.promptUrl || item._promptText) return;
    if (!isSafePromptUrl(item.promptUrl)) return;
    try {
        const resp = await fetch(item.promptUrl);
        if (resp.ok) {
            item._promptText = await resp.text();
            
            // If the user happens to view this item right now:
            if (currentViewerIndex === index && window.__eggMode) {
                const content = document.getElementById('prompt-content');
                if (content && content._itemRef === item) {
                    content.textContent = item._promptText;
                    content._loaded = true;
                }
            }
        }
    } catch(e) {}
}

async function fetchPromptContent(content, item) {
    const curItem = item || content._itemRef;
    if (!curItem || !curItem.promptUrl) { content.textContent = '// NO PROMPT ATTACHED'; return; }

    if (curItem._promptText) {
        content.textContent = curItem._promptText;
        content._loaded = true;
        return;
    }

    // ── SECURITY: Whitelist check
    if (!isSafePromptUrl(curItem.promptUrl)) {
        content.textContent = '// NO PROMPT ATTACHED';
        return;
    }

    try {
        // Clear old content immediately while fetching (No 'Loading...' noise)
        content.textContent = '';
        const resp = await fetch(curItem.promptUrl);
        if (!resp.ok) throw new Error('Fetch failed');
        const text = await resp.text();
        curItem._promptText = text;
        
        if (content._itemRef === curItem) {
            content.textContent = text;
            content._loaded = true;
        }
    } catch (e) {
        if (content._itemRef === curItem) {
            content.textContent = '// NO PROMPT ATTACHED';
        }
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
    const title   = document.getElementById('viewer-title');
    const mTitle  = document.getElementById('m-viewer-title');
    const infoPanel = document.getElementById('viewer-info-panel');

    if (isActive) {
        if (infoPanel) infoPanel.classList.add('egg-active');
        if (section) section.style.display = 'flex';
        if (panel)   panel.style.display   = 'flex';
        if (desc)    desc.style.display    = 'none';
        if (meta)    meta.style.display    = 'none';
        
        // Swap to REAL title
        if (title && title._realTitleHtml) title.innerHTML = title._realTitleHtml;
        if (mTitle && mTitle._realTitleHtml) mTitle.innerHTML = mTitle._realTitleHtml;
    } else {
        if (infoPanel) infoPanel.classList.remove('egg-active');
        if (section) section.style.display = 'none';
        if (panel)   panel.style.display   = 'none';
        if (desc)    desc.style.display    = 'block';
        if (meta)    meta.style.display    = 'grid';
        
        // Swap to BRANDED title
        if (title && title._brandedTitleHtml) title.innerHTML = title._brandedTitleHtml;
        if (mTitle && mTitle._brandedTitleHtml) mTitle.innerHTML = mTitle._brandedTitleHtml;
    }
}

// Global Filter Helper for clicking tags within viewer
window.filterByTag = function(tag) {
    closeViewer();
    const chip = document.querySelector(`.filter-chip[data-category="${tag}"]`);
    if (chip) {
        chip.click();
    } else {
        // If tag is not in primary list, go to 'all' or handle specifically
        // Here we just try to find it or fallback
        const allChip = document.querySelector('.filter-chip[data-category="all"]');
        if (allChip) allChip.click();
    }
};

/**
 * [SOFT RESET SYSTEM]
 * Resets the gallery to its initial state without a full page reload.
 * Prevents flickering and layout shaking.
 */
window.resetGalleryState = function() {
    // 1. Close the cinematic viewer if active
    if (typeof closeViewer === 'function') {
        closeViewer();
    }
    
    // 2. Clear any active filters and return to 'ALL' (Shuffle)
    // On mobile, we use the specific helper to reset visual UI (dropdown text, etc.)
    if (typeof mobileFilterAll === 'function' && window.innerWidth <= 1024) {
        mobileFilterAll();
    } else {
        const allChip = document.querySelector('.filter-chip[data-category="all"]');
        if (allChip) {
            allChip.click();
        }
    }
    
    if (typeof window.scrollToTop === 'function') {
        window.scrollToTop();
    }
};

// Final load check (redundant but safe fallback)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { if (itemsRendered === 0) renderAll(); });
} else {
    if (itemsRendered === 0) renderAll();
}

