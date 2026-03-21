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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "테스트입니다.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917228/revision-arts/prompt_20260319_143654_%5B3d18c8_FPS_original%5D",
        "assetId": "cb747865113485792d85d3ec68da2c58",
        "uploadedAt": "2026-03-19T11:16:12Z"
    },
    {
        "id": "master 20260319 143725 [a3be60 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 143725 [a3be60 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918967/revision-arts/master%2020260319%20143725%20%5Ba3be60%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917228/revision-arts/prompt_20260319_143725_%5Ba3be60_FPS_original%5D",
        "assetId": "cbe765127a2d74aa2cbd8de315b8e877",
        "uploadedAt": "2026-03-19T11:16:07Z"
    },
    {
        "id": "master 20260319 143755 [88dd1f FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 143755 [88dd1f FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918964/revision-arts/master%2020260319%20143755%20%5B88dd1f%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917226/revision-arts/prompt_20260319_143906_%5B8fa174_FPS_original%5D",
        "assetId": "b5b5186a6823d35603c411bd2378a186",
        "uploadedAt": "2026-03-19T11:15:54Z"
    },
    {
        "id": "master 20260319 143941 [45b12c FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 143941 [45b12c FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918949/revision-arts/master%2020260319%20143941%20%5B45b12c%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917225/revision-arts/prompt_20260319_143941_%5B45b12c_FPS_original%5D",
        "assetId": "725ef2c16f5a58356631f0a0a441bd4e",
        "uploadedAt": "2026-03-19T11:15:49Z"
    },
    {
        "id": "master 20260319 144008 [aa7cb4 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 144008 [aa7cb4 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918944/revision-arts/master%2020260319%20144008%20%5Baa7cb4%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917223/revision-arts/prompt_20260319_144114_%5Bf53a8e_FPS_original%5D",
        "assetId": "e1fb4ca365477a641d681f7456d359df",
        "uploadedAt": "2026-03-19T11:15:36Z"
    },
    {
        "id": "master 20260319 144144 [de8b82 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 144144 [de8b82 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918931/revision-arts/master%2020260319%20144144%20%5Bde8b82%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917220/revision-arts/prompt_20260319_144144_%5Bde8b82_FPS_original%5D",
        "assetId": "c91e3243b4e33d472cc3d6ec9781cc67",
        "uploadedAt": "2026-03-19T11:15:31Z"
    },
    {
        "id": "master 20260319 144232 [954120 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 144232 [954120 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918926/revision-arts/master%2020260319%20144232%20%5B954120%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917218/revision-arts/prompt_20260319_144331_%5B144388_FPS_original%5D",
        "assetId": "9b55764f46fca924d5537afec6f783ae",
        "uploadedAt": "2026-03-19T11:15:18Z"
    },
    {
        "id": "master 20260319 144424 [af4944 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 144424 [af4944 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918914/revision-arts/master%2020260319%20144424%20%5Baf4944%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917216/revision-arts/prompt_20260319_144424_%5Baf4944_FPS_original%5D",
        "assetId": "3569975e339a1636be8eca2bf5d7ac28",
        "uploadedAt": "2026-03-19T11:15:14Z"
    },
    {
        "id": "master 20260319 144453 [5696a6 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 144453 [5696a6 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918911/revision-arts/master%2020260319%20144453%20%5B5696a6%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917212/revision-arts/prompt_20260319_144657_%5B64c13e_FPS_original%5D",
        "assetId": "f95f56308d31376263a73d11943eec36",
        "uploadedAt": "2026-03-19T11:14:55Z"
    },
    {
        "id": "master 20260319 144725 [cd57de FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 144725 [cd57de FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918890/revision-arts/master%2020260319%20144725%20%5Bcd57de%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917211/revision-arts/prompt_20260319_144725_%5Bcd57de_FPS_original%5D",
        "assetId": "a2de4c4442efb061212dbe8ba031512f",
        "uploadedAt": "2026-03-19T11:14:50Z"
    },
    {
        "id": "master 20260319 144801 [7f901c FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 144801 [7f901c FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918887/revision-arts/master%2020260319%20144801%20%5B7f901c%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917209/revision-arts/prompt_20260319_144903_%5B11c579_FPS_original%5D",
        "assetId": "02b5df33e66daafe2c5f7fbdafac41e3",
        "uploadedAt": "2026-03-19T11:14:37Z"
    },
    {
        "id": "master 20260319 144938 [fcda60 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 144938 [fcda60 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918874/revision-arts/master%2020260319%20144938%20%5Bfcda60%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917209/revision-arts/prompt_20260319_144938_%5Bfcda60_FPS_original%5D",
        "assetId": "0d092623e6e7bedf8e61bd81efd3270d",
        "uploadedAt": "2026-03-19T11:14:34Z"
    },
    {
        "id": "master 20260319 145009 [d8b4c3 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 145009 [d8b4c3 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918871/revision-arts/master%2020260319%20145009%20%5Bd8b4c3%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917208/revision-arts/prompt_20260319_145009_%5Bd8b4c3_FPS_original%5D",
        "assetId": "b8ad0ce75270d93b7949fb4549b97284",
        "uploadedAt": "2026-03-19T11:14:31Z"
    },
    {
        "id": "master 20260319 145041 [6c33ee FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 145041 [6c33ee FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918866/revision-arts/master%2020260319%20145041%20%5B6c33ee%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917179/revision-arts/prompt_20260319_151037_%5Bc45291_FPS_original%5D",
        "assetId": "f3c643e13149d882c2fcea083e9ed4bd",
        "uploadedAt": "2026-03-19T11:11:56Z"
    },
    {
        "id": "master 20260319 151104 [86732f FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 151104 [86732f FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918711/revision-arts/master%2020260319%20151104%20%5B86732f%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917179/revision-arts/prompt_20260319_151104_%5B86732f_FPS_original%5D",
        "assetId": "a1ddd62b65aa88224a286a50cf24784b",
        "uploadedAt": "2026-03-19T11:11:51Z"
    },
    {
        "id": "master 20260319 151131 [7697fe FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 151131 [7697fe FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918706/revision-arts/master%2020260319%20151131%20%5B7697fe%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917169/revision-arts/prompt_20260319_151718_%5Bb6b079_FPS_original%5D",
        "assetId": "eb93fa066fa220b1ade49e6bc193763d",
        "uploadedAt": "2026-03-19T11:10:59Z"
    },
    {
        "id": "master 20260319 151746 [c17d13 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 151746 [c17d13 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918654/revision-arts/master%2020260319%20151746%20%5Bc17d13%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917169/revision-arts/prompt_20260319_151746_%5Bc17d13_FPS_original%5D",
        "assetId": "1515d87b324c76496552326864ddc08c",
        "uploadedAt": "2026-03-19T11:10:54Z"
    },
    {
        "id": "master 20260319 151818 [c66bfc FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 151818 [c66bfc FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918650/revision-arts/master%2020260319%20151818%20%5Bc66bfc%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917163/revision-arts/prompt_20260319_151849_%5B1389c2_FPS_original%5D",
        "assetId": "92edd7286ba744d0d6fe6b7aed582524",
        "uploadedAt": "2026-03-19T11:10:45Z"
    },
    {
        "id": "master 20260319 151919 [503903 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 151919 [503903 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918641/revision-arts/master%2020260319%20151919%20%5B503903%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917162/revision-arts/prompt_20260319_151919_%5B503903_FPS_original%5D",
        "assetId": "1880bd3c12e89904f17085bc2d1691f3",
        "uploadedAt": "2026-03-19T11:10:41Z"
    },
    {
        "id": "master 20260319 151952 [9f58ac FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 151952 [9f58ac FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918638/revision-arts/master%2020260319%20151952%20%5B9f58ac%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917161/revision-arts/prompt_20260319_151952_%5B9f58ac_FPS_original%5D",
        "assetId": "2fb8b4ab456b6428c5c90d7dbc26f54d",
        "uploadedAt": "2026-03-19T11:10:38Z"
    },
    {
        "id": "master 20260319 152104 [d2a928 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 152104 [d2a928 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918635/revision-arts/master%2020260319%20152104%20%5Bd2a928%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917160/revision-arts/prompt_20260319_152104_%5Bd2a928_FPS_original%5D",
        "assetId": "afb9ae0f50610bb923bbbc60f72f5e67",
        "uploadedAt": "2026-03-19T11:10:35Z"
    },
    {
        "id": "master 20260319 152135 [4bb6a5 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 152135 [4bb6a5 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918630/revision-arts/master%2020260319%20152135%20%5B4bb6a5%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917159/revision-arts/prompt_20260319_152205_%5B0fe5f6_FPS_original%5D",
        "assetId": "7e039860df3303b48cb09bdae37b66c1",
        "uploadedAt": "2026-03-19T11:10:25Z"
    },
    {
        "id": "master 20260319 152234 [86de79 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 152234 [86de79 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918622/revision-arts/master%2020260319%20152234%20%5B86de79%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917158/revision-arts/prompt_20260319_152234_%5B86de79_FPS_original%5D",
        "assetId": "c1e8426b087576f155044a84323acd1a",
        "uploadedAt": "2026-03-19T11:10:22Z"
    },
    {
        "id": "master 20260319 152306 [1e42f6 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 152306 [1e42f6 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918617/revision-arts/master%2020260319%20152306%20%5B1e42f6%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917154/revision-arts/prompt_20260319_152506_%5B682a4a_FPS_original%5D",
        "assetId": "b170ef506bac9624fb9d31c2abb47a0e",
        "uploadedAt": "2026-03-19T11:10:03Z"
    },
    {
        "id": "master 20260319 152533 [50dce1 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 152533 [50dce1 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918598/revision-arts/master%2020260319%20152533%20%5B50dce1%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917153/revision-arts/prompt_20260319_152533_%5B50dce1_FPS_original%5D",
        "assetId": "eed6007f10ee5e5e2107dcecb681fd05",
        "uploadedAt": "2026-03-19T11:09:58Z"
    },
    {
        "id": "master 20260319 152600 [969bba FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 152600 [969bba FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918595/revision-arts/master%2020260319%20152600%20%5B969bba%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917148/revision-arts/prompt_20260319_152859_%5B2b16bb_FPS_original%5D",
        "assetId": "5348c504a37cf789286dd7e69ba48273",
        "uploadedAt": "2026-03-19T11:09:30Z"
    },
    {
        "id": "master 20260319 152929 [c0b77c FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 152929 [c0b77c FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918556/revision-arts/master%2020260319%20152929%20%5Bc0b77c%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917147/revision-arts/prompt_20260319_152929_%5Bc0b77c_FPS_original%5D",
        "assetId": "c5ec9754520e0c3ede0d9e80cb9ad91f",
        "uploadedAt": "2026-03-19T11:09:16Z"
    },
    {
        "id": "master 20260319 152957 [baa5ce FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 152957 [baa5ce FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918550/revision-arts/master%2020260319%20152957%20%5Bbaa5ce%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917146/revision-arts/prompt_20260319_152957_%5Bbaa5ce_FPS_original%5D",
        "assetId": "2c9e3046a2fa552cdb098577a8bffd6a",
        "uploadedAt": "2026-03-19T11:09:10Z"
    },
    {
        "id": "master 20260319 153028 [5929e5 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 153028 [5929e5 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918546/revision-arts/master%2020260319%20153028%20%5B5929e5%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917132/revision-arts/prompt_20260319_154111_%5Ba0dbc2_FPS_original%5D",
        "assetId": "a27aa1b72c66c4143afe7a8f7e9bc894",
        "uploadedAt": "2026-03-19T11:07:24Z"
    },
    {
        "id": "master 20260319 154142 [75d2e9 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 154142 [75d2e9 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918441/revision-arts/master%2020260319%20154142%20%5B75d2e9%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917131/revision-arts/prompt_20260319_154142_%5B75d2e9_FPS_original%5D",
        "assetId": "0f693afddcce8c30f00f45619b4e4f87",
        "uploadedAt": "2026-03-19T11:07:21Z"
    },
    {
        "id": "master 20260319 154213 [8df3c7 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 154213 [8df3c7 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918437/revision-arts/master%2020260319%20154213%20%5B8df3c7%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917126/revision-arts/prompt_20260319_154513_%5Bd599fd_FPS_original%5D",
        "assetId": "94dbd977b38735b85ea614278537243e",
        "uploadedAt": "2026-03-19T11:06:54Z"
    },
    {
        "id": "master 20260319 154544 [dde5c1 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 154544 [dde5c1 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918411/revision-arts/master%2020260319%20154544%20%5Bdde5c1%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917124/revision-arts/prompt_20260319_154544_%5Bdde5c1_FPS_original%5D",
        "assetId": "2f1467bd9ebba62a8fcfae44f9b96f2a",
        "uploadedAt": "2026-03-19T11:06:51Z"
    },
    {
        "id": "master 20260319 154613 [fc3ea3 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 154613 [fc3ea3 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918407/revision-arts/master%2020260319%20154613%20%5Bfc3ea3%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917120/revision-arts/prompt_20260319_154756_%5B927253_FPS_original%5D",
        "assetId": "1b1cf7ff678ca19d17f742abaa2ce2e1",
        "uploadedAt": "2026-03-19T11:06:37Z"
    },
    {
        "id": "master 20260319 154823 [41375a FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 154823 [41375a FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918391/revision-arts/master%2020260319%20154823%20%5B41375a%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917119/revision-arts/prompt_20260319_154823_%5B41375a_FPS_original%5D",
        "assetId": "176e738b0ce77869c8059c741fbe7ee7",
        "uploadedAt": "2026-03-19T11:06:31Z"
    },
    {
        "id": "master 20260319 154852 [f5303e FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 154852 [f5303e FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918388/revision-arts/master%2020260319%20154852%20%5Bf5303e%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917118/revision-arts/prompt_20260319_154852_%5Bf5303e_FPS_original%5D",
        "assetId": "b9455a856b81478730095b4f51290c3c",
        "uploadedAt": "2026-03-19T11:06:28Z"
    },
    {
        "id": "master 20260319 154927 [1834a6 FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 154927 [1834a6 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918385/revision-arts/master%2020260319%20154927%20%5B1834a6%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917117/revision-arts/prompt_20260319_154927_%5B1834a6_FPS_original%5D",
        "assetId": "e9bca8e72b54d5e9c11ed695929cb791",
        "uploadedAt": "2026-03-19T11:06:25Z"
    },
    {
        "id": "master 20260319 154955 [bfc45d FPS original]",
        "tags": [
            "twins"
        ],
        "title": "master 20260319 154955 [bfc45d FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918381/revision-arts/master%2020260319%20154955%20%5Bbfc45d%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104626/revision-arts/prompt_20260321_222059_%5B69a78c_FPS_original%5D",
        "assetId": "f60d5b8a15834b8542bcf9e402b9d71a",
        "uploadedAt": "2026-03-21T15:01:29Z"
    },
    {
        "id": "master 20260321 222116 [9caa6d FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 222116 [9caa6d FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105285/revision-arts/master%2020260321%20222116%20%5B9caa6d%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104625/revision-arts/prompt_20260321_222116_%5B9caa6d_FPS_original%5D",
        "assetId": "0d42fd109e38ad1f0e131933b8e7add2",
        "uploadedAt": "2026-03-21T15:01:25Z"
    },
    {
        "id": "master 20260321 222120 [311660 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 222120 [311660 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105281/revision-arts/master%2020260321%20222120%20%5B311660%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104623/revision-arts/prompt_20260321_222132_%5B78fc2e_FPS_original%5D",
        "assetId": "1df2654bf87778129ed1ebc102b54bb0",
        "uploadedAt": "2026-03-21T15:01:18Z"
    },
    {
        "id": "master 20260321 222147 [ffea24 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 222147 [ffea24 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105274/revision-arts/master%2020260321%20222147%20%5Bffea24%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104623/revision-arts/prompt_20260321_222147_%5Bffea24_FPS_original%5D",
        "assetId": "04fe0ebc8af669a558da34658f423a09",
        "uploadedAt": "2026-03-21T15:01:14Z"
    },
    {
        "id": "master 20260321 222150 [460751 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 222150 [460751 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105271/revision-arts/master%2020260321%20222150%20%5B460751%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104621/revision-arts/prompt_20260321_222215_%5B06d6b1_FPS_original%5D",
        "assetId": "2d6b13060953548663231f3476fb49ea",
        "uploadedAt": "2026-03-21T15:01:06Z"
    },
    {
        "id": "master 20260321 222221 [462736 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 222221 [462736 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105263/revision-arts/master%2020260321%20222221%20%5B462736%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104620/revision-arts/prompt_20260321_222221_%5B462736_FPS_original%5D",
        "assetId": "e639b58907fd78ee0681027446584d10",
        "uploadedAt": "2026-03-21T15:01:03Z"
    },
    {
        "id": "master 20260321 222251 [548ec9 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 222251 [548ec9 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105259/revision-arts/master%2020260321%20222251%20%5B548ec9%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104619/revision-arts/prompt_20260321_222251_%5B548ec9_FPS_original%5D",
        "assetId": "89c151fb27c952701c4b8f04fee00a26",
        "uploadedAt": "2026-03-21T15:00:59Z"
    },
    {
        "id": "master 20260321 222321 [611ff0 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 222321 [611ff0 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105255/revision-arts/master%2020260321%20222321%20%5B611ff0%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104619/revision-arts/prompt_20260321_222321_%5B611ff0_FPS_original%5D",
        "assetId": "83a9ecb688e87c1bc47cc2b688f337f7",
        "uploadedAt": "2026-03-21T15:00:55Z"
    },
    {
        "id": "master 20260321 222356 [2b6d83 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 222356 [2b6d83 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105248/revision-arts/master%2020260321%20222356%20%5B2b6d83%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104618/revision-arts/prompt_20260321_222356_%5B2b6d83_FPS_original%5D",
        "assetId": "320a8ef27a1ae7909668812cc3b6c791",
        "uploadedAt": "2026-03-21T15:00:48Z"
    },
    {
        "id": "master 20260321 222436 [692b72 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 222436 [692b72 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105245/revision-arts/master%2020260321%20222436%20%5B692b72%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104616/revision-arts/prompt_20260321_222537_%5B69a1c7_FPS_original%5D",
        "assetId": "3894d411e37f51e6f8fb46cff3aecea5",
        "uploadedAt": "2026-03-21T15:00:38Z"
    },
    {
        "id": "master 20260321 222635 [5b526b FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 222635 [5b526b FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105234/revision-arts/master%2020260321%20222635%20%5B5b526b%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104615/revision-arts/prompt_20260321_222635_%5B5b526b_FPS_original%5D",
        "assetId": "679e929e6d3e31be61a98e3287be3083",
        "uploadedAt": "2026-03-21T15:00:34Z"
    },
    {
        "id": "master 20260321 222703 [43e73c FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 222703 [43e73c FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105231/revision-arts/master%2020260321%20222703%20%5B43e73c%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104614/revision-arts/prompt_20260321_222703_%5B43e73c_FPS_original%5D",
        "assetId": "e5ec4278767cbf52d0b3d006e6fa0522",
        "uploadedAt": "2026-03-21T15:00:31Z"
    },
    {
        "id": "master 20260321 222737 [4923d7 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 222737 [4923d7 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105227/revision-arts/master%2020260321%20222737%20%5B4923d7%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104611/revision-arts/prompt_20260321_222924_%5Befbc07_FPS_original%5D",
        "assetId": "592d82c6370fe3be0a2016e3aedb075f",
        "uploadedAt": "2026-03-21T15:00:06Z"
    },
    {
        "id": "master 20260321 222940 [ea41ce FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 222940 [ea41ce FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105203/revision-arts/master%2020260321%20222940%20%5Bea41ce%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104610/revision-arts/prompt_20260321_222940_%5Bea41ce_FPS_original%5D",
        "assetId": "c081ab7c93811bd71d7fa2d3194ebcd9",
        "uploadedAt": "2026-03-21T15:00:03Z"
    },
    {
        "id": "master 20260321 222956 [21e85d FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 222956 [21e85d FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105199/revision-arts/master%2020260321%20222956%20%5B21e85d%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104603/revision-arts/prompt_20260321_223101_%5B35fcdc_FPS_original%5D",
        "assetId": "b4eb9404080d351585fe87a0cf00df5f",
        "uploadedAt": "2026-03-21T14:59:43Z"
    },
    {
        "id": "master 20260321 223131 [21c5f3 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223131 [21c5f3 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105180/revision-arts/master%2020260321%20223131%20%5B21c5f3%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104602/revision-arts/prompt_20260321_223131_%5B21c5f3_FPS_original%5D",
        "assetId": "311d1db35a56d7217a051cd67ea63979",
        "uploadedAt": "2026-03-21T14:59:40Z"
    },
    {
        "id": "master 20260321 223134 [d50615 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223134 [d50615 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105176/revision-arts/master%2020260321%20223134%20%5Bd50615%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104601/revision-arts/prompt_20260321_223159_%5B0ae44e_FPS_original%5D",
        "assetId": "e65dbc28f6327e7d472f29ff9a8e93f3",
        "uploadedAt": "2026-03-21T14:59:33Z"
    },
    {
        "id": "master 20260321 223202 [1c7559 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223202 [1c7559 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105170/revision-arts/master%2020260321%20223202%20%5B1c7559%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104600/revision-arts/prompt_20260321_223202_%5B1c7559_FPS_original%5D",
        "assetId": "dcf6a36ebcb81db916e08f5ec3c4dc3f",
        "uploadedAt": "2026-03-21T14:59:30Z"
    },
    {
        "id": "master 20260321 223232 [ee4db7 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223232 [ee4db7 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105167/revision-arts/master%2020260321%20223232%20%5Bee4db7%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104599/revision-arts/prompt_20260321_223232_%5Bee4db7_FPS_original%5D",
        "assetId": "fb0d3cebe55eb98c75c876d10f8da2f3",
        "uploadedAt": "2026-03-21T14:59:27Z"
    },
    {
        "id": "master 20260321 223239 [6dc66c FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223239 [6dc66c FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105164/revision-arts/master%2020260321%20223239%20%5B6dc66c%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104599/revision-arts/prompt_20260321_223239_%5B6dc66c_FPS_original%5D",
        "assetId": "12268fe5912c430e83d9ff97a5a521ed",
        "uploadedAt": "2026-03-21T14:59:24Z"
    },
    {
        "id": "master 20260321 223304 [b966b9 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223304 [b966b9 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105161/revision-arts/master%2020260321%20223304%20%5Bb966b9%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104598/revision-arts/prompt_20260321_223304_%5Bb966b9_FPS_original%5D",
        "assetId": "5abb66ed48dc47875980ea23b8f2fba0",
        "uploadedAt": "2026-03-21T14:59:21Z"
    },
    {
        "id": "master 20260321 223310 [7d5565 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223310 [7d5565 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105157/revision-arts/master%2020260321%20223310%20%5B7d5565%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104597/revision-arts/prompt_20260321_223310_%5B7d5565_FPS_original%5D",
        "assetId": "8c6cf478d15da77d051c3c81f6feed7d",
        "uploadedAt": "2026-03-21T14:59:17Z"
    },
    {
        "id": "master 20260321 223336 [4f9779 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223336 [4f9779 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105153/revision-arts/master%2020260321%20223336%20%5B4f9779%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104592/revision-arts/prompt_20260321_223451_%5B662318_FPS_original%5D",
        "assetId": "a3ab0db7d2845df6a80216a65bb1a17e",
        "uploadedAt": "2026-03-21T14:58:54Z"
    },
    {
        "id": "master 20260321 223508 [12d99b FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223508 [12d99b FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105131/revision-arts/master%2020260321%20223508%20%5B12d99b%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104591/revision-arts/prompt_20260321_223508_%5B12d99b_FPS_original%5D",
        "assetId": "9216674051d5077d5cccb8eaf32d5d00",
        "uploadedAt": "2026-03-21T14:58:51Z"
    },
    {
        "id": "master 20260321 223509 [9cc2d9 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223509 [9cc2d9 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105128/revision-arts/master%2020260321%20223509%20%5B9cc2d9%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104589/revision-arts/prompt_20260321_223539_%5Bfb1856_FPS_original%5D",
        "assetId": "35fcde48e28b3cb0305e38d162ee41be",
        "uploadedAt": "2026-03-21T14:58:40Z"
    },
    {
        "id": "master 20260321 223545 [430435 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223545 [430435 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105116/revision-arts/master%2020260321%20223545%20%5B430435%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104589/revision-arts/prompt_20260321_223545_%5B430435_FPS_original%5D",
        "assetId": "f54e3247bfce2c0f2cf91e30dfcef0fe",
        "uploadedAt": "2026-03-21T14:58:36Z"
    },
    {
        "id": "master 20260321 223553 [128483 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223553 [128483 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105113/revision-arts/master%2020260321%20223553%20%5B128483%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104585/revision-arts/prompt_20260321_223642_%5B5bc2e4_FPS_original%5D",
        "assetId": "ef84c78e2fd61d9a7e7f5f89c6df8106",
        "uploadedAt": "2026-03-21T14:58:21Z"
    },
    {
        "id": "master 20260321 223644 [af1c7f FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223644 [af1c7f FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105097/revision-arts/master%2020260321%20223644%20%5Baf1c7f%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104584/revision-arts/prompt_20260321_223644_%5Baf1c7f_FPS_original%5D",
        "assetId": "c41f6bfa274c71f6f2aeed367c3faf58",
        "uploadedAt": "2026-03-21T14:58:17Z"
    },
    {
        "id": "master 20260321 223656 [395751 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223656 [395751 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105094/revision-arts/master%2020260321%20223656%20%5B395751%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104581/revision-arts/prompt_20260321_223740_%5B5b7817_FPS_original%5D",
        "assetId": "587235adfbfdfa051f17ce9222bc996d",
        "uploadedAt": "2026-03-21T14:58:01Z"
    },
    {
        "id": "master 20260321 223743 [b076ec FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223743 [b076ec FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105078/revision-arts/master%2020260321%20223743%20%5Bb076ec%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104580/revision-arts/prompt_20260321_223743_%5Bb076ec_FPS_original%5D",
        "assetId": "d81204594146ed3269d55ec1fe7d5253",
        "uploadedAt": "2026-03-21T14:57:58Z"
    },
    {
        "id": "master 20260321 223758 [431580 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223758 [431580 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105074/revision-arts/master%2020260321%20223758%20%5B431580%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104579/revision-arts/prompt_20260321_223758_%5B431580_FPS_original%5D",
        "assetId": "e5088d92aabb65af043347019e4c0055",
        "uploadedAt": "2026-03-21T14:57:54Z"
    },
    {
        "id": "master 20260321 223807 [646d27 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223807 [646d27 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774105070/revision-arts/master%2020260321%20223807%20%5B646d27%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104576/revision-arts/prompt_20260321_223836_%5Bccc7c6_FPS_original%5D",
        "assetId": "76f7e48c91ced06ef15c8bd22937e20d",
        "uploadedAt": "2026-03-21T14:56:31Z"
    },
    {
        "id": "master 20260321 223841 [dbcb1e FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223841 [dbcb1e FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104988/revision-arts/master%2020260321%20223841%20%5Bdbcb1e%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104574/revision-arts/prompt_20260321_223841_%5Bdbcb1e_FPS_original%5D",
        "assetId": "060ea90c35b8e3e008c462fa7e31fffe",
        "uploadedAt": "2026-03-21T14:56:28Z"
    },
    {
        "id": "master 20260321 223900 [530465 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 223900 [530465 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104983/revision-arts/master%2020260321%20223900%20%5B530465%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104564/revision-arts/prompt_20260321_224138_%5Ba2f3ee_FPS_original%5D",
        "assetId": "4d8cda853e83b56c73e6386d2cefdd96",
        "uploadedAt": "2026-03-21T14:55:51Z"
    },
    {
        "id": "master 20260321 224153 [f83b4a FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 224153 [f83b4a FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104948/revision-arts/master%2020260321%20224153%20%5Bf83b4a%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104563/revision-arts/prompt_20260321_224153_%5Bf83b4a_FPS_original%5D",
        "assetId": "5818fc54b1d8dab16c27025f1857e7a0",
        "uploadedAt": "2026-03-21T14:55:48Z"
    },
    {
        "id": "master 20260321 224208 [a3af38 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 224208 [a3af38 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104944/revision-arts/master%2020260321%20224208%20%5Ba3af38%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104562/revision-arts/prompt_20260321_224208_%5Ba3af38_FPS_original%5D",
        "assetId": "c4d1e3c6336887d1968910e83ce332ee",
        "uploadedAt": "2026-03-21T14:55:44Z"
    },
    {
        "id": "master 20260321 224225 [6fe108 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 224225 [6fe108 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104941/revision-arts/master%2020260321%20224225%20%5B6fe108%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104561/revision-arts/prompt_20260321_224225_%5B6fe108_FPS_original%5D",
        "assetId": "3ffed50be53d0751f9a310bb8edab5f8",
        "uploadedAt": "2026-03-21T14:55:41Z"
    },
    {
        "id": "master 20260321 224235 [abe6b1 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 224235 [abe6b1 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104938/revision-arts/master%2020260321%20224235%20%5Babe6b1%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104551/revision-arts/prompt_20260321_224629_%5Bed30ce_FPS_original%5D",
        "assetId": "d31348a4e45c3ea10052bca9c3835f02",
        "uploadedAt": "2026-03-21T14:54:50Z"
    },
    {
        "id": "master 20260321 224643 [b41b42 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 224643 [b41b42 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104887/revision-arts/master%2020260321%20224643%20%5Bb41b42%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104550/revision-arts/prompt_20260321_224643_%5Bb41b42_FPS_original%5D",
        "assetId": "798808dad25caeb3b1c7a10e31abb627",
        "uploadedAt": "2026-03-21T14:54:47Z"
    },
    {
        "id": "master 20260321 224701 [39d207 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 224701 [39d207 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104883/revision-arts/master%2020260321%20224701%20%5B39d207%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104547/revision-arts/prompt_20260321_224747_%5Bbebd95_FPS_original%5D",
        "assetId": "f53bdaf196da7b7ac32705a54fc2a84a",
        "uploadedAt": "2026-03-21T14:54:33Z"
    },
    {
        "id": "master 20260321 224803 [e44a3b FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 224803 [e44a3b FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104870/revision-arts/master%2020260321%20224803%20%5Be44a3b%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104546/revision-arts/prompt_20260321_224803_%5Be44a3b_FPS_original%5D",
        "assetId": "5b22c70e07d3d158105691767d0d29c1",
        "uploadedAt": "2026-03-21T14:54:30Z"
    },
    {
        "id": "master 20260321 224824 [c49c75 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 224824 [c49c75 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104867/revision-arts/master%2020260321%20224824%20%5Bc49c75%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104539/revision-arts/prompt_20260321_225037_%5Bd9b613_FPS_original%5D",
        "assetId": "cd105d9724446bee09eb80991684ecb9",
        "uploadedAt": "2026-03-21T14:53:54Z"
    },
    {
        "id": "master 20260321 225045 [fb1f75 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 225045 [fb1f75 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104828/revision-arts/master%2020260321%20225045%20%5Bfb1f75%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104538/revision-arts/prompt_20260321_225045_%5Bfb1f75_FPS_original%5D",
        "assetId": "8a3f5f6937cfa5882fd594566ec2ef2d",
        "uploadedAt": "2026-03-21T14:53:48Z"
    },
    {
        "id": "master 20260321 225108 [d55c5c FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 225108 [d55c5c FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104820/revision-arts/master%2020260321%20225108%20%5Bd55c5c%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104535/revision-arts/prompt_20260321_225217_%5Bd50008_FPS_original%5D",
        "assetId": "ad21aa9f24f19f42928964369fe00575",
        "uploadedAt": "2026-03-21T14:53:18Z"
    },
    {
        "id": "master 20260321 225219 [58a501 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 225219 [58a501 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104792/revision-arts/master%2020260321%20225219%20%5B58a501%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104534/revision-arts/prompt_20260321_225219_%5B58a501_FPS_original%5D",
        "assetId": "7b0cc801f2f8f657fb6ae7726c26b695",
        "uploadedAt": "2026-03-21T14:53:12Z"
    },
    {
        "id": "master 20260321 225250 [e1f6dd FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 225250 [e1f6dd FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104786/revision-arts/master%2020260321%20225250%20%5Be1f6dd%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104531/revision-arts/prompt_20260321_225250_%5Be1f6dd_FPS_original%5D",
        "assetId": "ef63092650c1a1a854c00a00006df4a4",
        "uploadedAt": "2026-03-21T14:53:06Z"
    },
    {
        "id": "master 20260321 225253 [d29986 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 225253 [d29986 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104781/revision-arts/master%2020260321%20225253%20%5Bd29986%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104529/revision-arts/prompt_20260321_225253_%5Bd29986_FPS_original%5D",
        "assetId": "6b11dc20591cf4b2462cdb950a6843e9",
        "uploadedAt": "2026-03-21T14:53:01Z"
    },
    {
        "id": "master 20260321 225323 [e3c533 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 225323 [e3c533 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104776/revision-arts/master%2020260321%20225323%20%5Be3c533%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104475/revision-arts/prompt_20260321_225753_%5Bf41be2_FPS_original%5D",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104465/revision-arts/prompt_20260321_225950_%5Bf319cb_FPS_original%5D",
        "assetId": "ccad7abf599271f97fc22220b773cfcf",
        "uploadedAt": "2026-03-21T14:51:45Z"
    },
    {
        "id": "master 20260321 231248 [7029429 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 231248 [7029429 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104699/revision-arts/master%2020260321%20231248%20%5B7029429%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104429/revision-arts/prompt_20260321_231248_%5B7029429_FPS_original%5D",
        "assetId": "595f41549b464bb37ffbc1a03d59c501",
        "uploadedAt": "2026-03-21T14:51:39Z"
    },
    {
        "id": "master 20260321 231327 [7029429 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 231327 [7029429 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104696/revision-arts/master%2020260321%20231327%20%5B7029429%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104391/revision-arts/prompt_20260321_231710_%5B51160b4ebe649778141304ad1050ef7b_FPS_ori%5D",
        "assetId": "7606406b56b64f901bfe5888152febff",
        "uploadedAt": "2026-03-21T14:51:09Z"
    },
    {
        "id": "master 20260321 231739 [74286731 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 231739 [74286731 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104646/revision-arts/master%2020260321%20231739%20%5B74286731%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104390/revision-arts/prompt_20260321_231739_%5B74286731_FPS_original%5D",
        "assetId": "36ab2f7d8a4f300d5c37178253d33990",
        "uploadedAt": "2026-03-21T14:50:46Z"
    },
    {
        "id": "master 20260321 231812 [img 015 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260321 231812 [img 015 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774104676/revision-arts/master%2020260321%20231812%20%5Bimg%20015%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
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
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774104391/revision-arts/prompt_20260321_231845_%5B7a30a1_FPS_original%5D",
        "assetId": "5004a8f17607843cd381388390b152fa",
        "uploadedAt": "2026-03-21T14:51:12Z"
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
initViewerSlider();



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
    const contentHeight = media.getBoundingClientRect().height;
    const pb = parseFloat(window.getComputedStyle(item).paddingBottom) || 0;
    item.style.gridRowEnd = `span ${Math.ceil(contentHeight + pb)}`;
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
        // Handle click at the parent level so pseudo-elements (like ::after) don't block it
        cardMedia.onclick = () => openViewer(absoluteIndex);

        const img = document.createElement('img');
        img.src = item.url;
        img.loading = 'lazy'; // Standard browser optimization
        img.alt = escapeHtml(item.title);
        img.onload = function() { this.classList.add('loaded'); };
        img.onerror = function() { card.style.display = 'none'; resizeGridItem(card); };

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

function mcLoadSlot(slot, index) {
    const img = slot.querySelector('img');
    if (!img) return;
    if (index < 0 || index >= filteredItems.length) {
        img.src = '';
        img.style.opacity = '0';
        return;
    }
    const item = filteredItems[index];

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
    preloadPromptText(index);
}

function mcNavigate(step) {
    if (isAnimatingViewer) return;
    
    const next = mcIndex + step;
    if (next < 0 || next >= filteredItems.length) {
        // Bounce back
        mcSetTrack(0, true);
        return;
    }
    
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
        discoveryPool = STREAM_RECORDS.filter(i => generateAssetId(i) !== currentId);
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
        
        const img = document.createElement('img');
        img.src = item.url;
        img.loading = 'lazy';
        img.onload = function() {
            this.classList.add('loaded');
            // Trigger initial masonry fix after load
            resizeGridItem(card);
        };
        img.onerror = function() {
            card.style.display = 'none';
            resizeGridItem(card);
        };
        
        media.appendChild(img);
        card.appendChild(media);
        
        // Add ResizeObserver for responsive masonry
        globalGridObserver.observe(card);
        
        const sentinel = document.getElementById('discovery-sentinel');
        if (sentinel) {
            dGrid.insertBefore(card, sentinel);
        } else {
            dGrid.appendChild(card);
        }
    });
    
    discoveryRendered += 20;
}

window.toggleMobileInfo = function() {
    if (mcInfoOpen) mcCloseInfo();
    else mcOpenInfo();
};

window.mobileFilterAll = function() {
    // Hide dropdown if open
    document.getElementById('m-category-dropdown')?.classList.remove('open');
    document.getElementById('m-category-btn')?.classList.remove('active', 'open');
    document.getElementById('m-filter-all')?.classList.add('active');
    
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
            const dynamicCategories = getDynamicCategories().filter(c => c.id !== 'all');
            dynamicCategories.forEach(cat => {
                const item = document.createElement('button');
                item.className = 'm-cat-item';
                item.innerText = cat.label;
                item.onclick = () => {
                    // Update header visual
                    document.getElementById('m-filter-all')?.classList.remove('active');
                    btn.classList.add('active');
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


// (loadSlideImage kept for PC metadata resolution update, mobile uses mcLoadSlot)
function loadSlideImage(index) {
    preloadPromptText(index);
}

// triggerMobileGhostUI is no longer needed (controls are static)
function triggerMobileGhostUI() {}

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
    
    titleEl.onclick = async function (e) {
        titleEl._eggCount = (titleEl._eggCount || 0) + 1;
        // console.log(`[EGG] Click ${titleEl._eggCount}`);
        clearTimeout(titleEl._eggTimer);
        
        if (titleEl._eggCount >= 3) {
            titleEl._eggCount = 0;
            window.__eggMode = !window.__eggMode;
            applyEggUIState(window.__eggMode);

            if (window.__eggMode) {
                const content = document.getElementById('prompt-content');
                if (content) fetchPromptContent(content, item);
            }
        } else {
            // Increased to 1500ms to allow plenty of time for 3 clicks
            titleEl._eggTimer = setTimeout(() => { titleEl._eggCount = 0; }, 1500);
        }
    };

    // Build Title with Premium Underscores (Instant Render)
    const displayTitle = (item.title || '').replace(/ /g, '_');
    const titleHtml = displayTitle.split('_').map(p => `<span>${p}</span>`).join('_');
    titleEl.innerHTML = titleHtml;
    const mt = document.getElementById('m-viewer-title');
    if (mt) mt.innerHTML = titleHtml;
    
    // Update Meta
    const categoryText = (item.tags || []).join(' / ').toUpperCase();
    document.getElementById('viewer-category').innerText = categoryText;
    const mc = document.getElementById('m-viewer-category');
    if (mc) mc.innerText = categoryText;

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
        img.onload = null; // Clean up any old listeners
        img.onload = () => {
            const resStr = `${img.naturalWidth} x ${img.naturalHeight}`;
            const pcRes = document.getElementById('viewer-res');
            const mRes = document.getElementById('m-viewer-res');
            if (pcRes) pcRes.innerText = resStr;
            if (mRes) mRes.innerText = resStr;
            img.style.opacity = '1';
        };
    }

    // Lazy load next/prev in background
    function loadSlideImage(idx) {
        if (idx < 0 || idx >= filteredItems.length) return;
        const targetDesc = filteredItems[idx];
        if (targetDesc && targetDesc.url) {
            const preloadImg = new Image();
            preloadImg.src = targetDesc.url;
        }
    }
    loadSlideImage(index + 1);
    loadSlideImage(index - 1);
    loadSlideImage(index + 2);
    loadSlideImage(index - 2);

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

window.navViewer = function (step) {
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
            
            // ── PREMIUM FADE-OUT & SWAP ───────────────────────────────────
            galleryContainer.style.minHeight = `${galleryContainer.scrollHeight}px`; // Guard against collapse
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
                
                // Fade back in
                setTimeout(() => {
                    galleryContainer.classList.remove('filtering');
                    // Clean up min-height after fade-in to allow natural growth
                    setTimeout(() => { galleryContainer.style.minHeight = ''; }, 300);
                }, 10);
                
                if (typeof scrollToTop === 'function') scrollToTop();
            }, 250); // Matches transition duration roughly
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

        setTimeout(() => {
            galleryContainer.classList.remove('filtering');
            setTimeout(() => { galleryContainer.style.minHeight = ''; }, 300);
        }, 10);

        if (typeof scrollToTop === 'function') scrollToTop();
    }, 250);
};

console.log('Gallery Initializing DYNAMICALLY...');
initFilters();
renderAll();
initViewerSlider(); 

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
