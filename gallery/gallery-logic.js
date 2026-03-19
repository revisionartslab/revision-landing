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
        "id": "master 20260319 143356 [bb4c43 FPS original]",
        "tags": [
            "emotion"
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
            "emotion"
        ],
        "title": "master 20260319 143456 [37e0f7 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918988/revision-arts/master%2020260319%20143456%20%5B37e0f7%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917231/revision-arts/prompt_20260319_143456_%5B37e0f7_FPS_original%5D",
        "assetId": "a775390601464c4b471ccc69558df413",
        "uploadedAt": "2026-03-19T11:16:28Z"
    },
    {
        "id": "master 20260319 143528 [4ff825 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260319 143528 [4ff825 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918983/revision-arts/master%2020260319%20143528%20%5B4ff825%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917230/revision-arts/prompt_20260319_143528_%5B4ff825_FPS_original%5D",
        "assetId": "9977f4e6787eac6958f529500dff792b",
        "uploadedAt": "2026-03-19T11:16:23Z"
    },
    {
        "id": "master 20260319 143555 [4c56a0 FPS original]",
        "tags": [
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
        ],
        "title": "master 20260319 150232 [381a4a FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918785/revision-arts/master%2020260319%20150232%20%5B381a4a%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917192/revision-arts/prompt_20260319_150232_%5B381a4a_FPS_original%5D",
        "assetId": "65cc8e30578ca75d4406e2f12e1b1708",
        "uploadedAt": "2026-03-19T11:13:05Z"
    },
    {
        "id": "master 20260319 150301 [aa3737 FPS original]",
        "tags": [
            "emotion"
        ],
        "title": "master 20260319 150301 [aa3737 FPS original]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918780/revision-arts/master%2020260319%20150301%20%5Baa3737%20FPS%20original%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917191/revision-arts/prompt_20260319_150301_%5Baa3737_FPS_original%5D",
        "assetId": "d4aa029e7558a097c37d523051cefe90",
        "uploadedAt": "2026-03-19T11:13:00Z"
    },
    {
        "id": "master 20260319 150330 [363a41 FPS original]",
        "tags": [
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
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
            "emotion"
        ],
        "title": "master 20260319 155057 [Alfred 20Schwarzschild 225 Ritratto 20de]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1773918374/revision-arts/master%2020260319%20155057%20%5BAlfred%2020Schwarzschild%20225%20Ritratto%2020de%5D.png",
        "description": "Honoring art, empowering society. Curating projects for human advancement and artistic inspiration.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1773917115/revision-arts/prompt_20260319_155057_%5BAlfred_20Schwarzschild-225-Ritratto_20de%5D",
        "assetId": "e2f0a1e6521992108112879baad1f5be",
        "uploadedAt": "2026-03-19T11:06:14Z"
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

    // Hide 'Move to Top' button while viewer is open
    const topBtn = document.getElementById('move-to-top');
    if (topBtn) topBtn.classList.remove('visible');

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

    // --- ROBUST HYBRID ASSET ID SYSTEM ---
    let viewerDisplayId = 'RV-REF-ERR'; 
    try {
        const rawAssetId = item.assetId || item.asset_id || '';
        const dateStr = item.uploadedAt || (item.id.match(/\d{8} \d{6}/) ? item.id.match(/\d{8} \d{6}/)[0] : null);
        
        if (dateStr) {
            const cleanDate = dateStr.replace(/[-T:Z ]/g, '').substring(0, 8); // YYYYMMDD
            
            let suffix = 'ARCH';
            if (rawAssetId && rawAssetId.length >= 4) {
                suffix = rawAssetId.substring(rawAssetId.length - 4).toUpperCase();
            } else {
                // Better Fallback: Look for the time part (HHMMSS) or a 6-digit number that ISN'T the date
                const numbers = item.id.match(/\d+/g) || [];
                // Filter out the one that looks like the date (usually 8 digits)
                const timePart = numbers.find(n => n.length === 6 && n !== cleanDate);
                if (timePart) {
                    suffix = timePart.substring(2, 6); // Extract the middle part of HHMMSS
                } else if (item.id.includes('[')) {
                    // Try to extract from the hash/random part like [bb4c43]
                    const hashMatch = item.id.match(/\[([a-f0-9]{4})/i);
                    if (hashMatch) suffix = hashMatch[1].toUpperCase();
                }
            }
            viewerDisplayId = `RV-${cleanDate}-${suffix}`;
        } else {
            const fallbackSuffix = (rawAssetId || item.id).substring(0, 4).toUpperCase();
            viewerDisplayId = `RV-SER-${fallbackSuffix}`;
        }
    } catch (e) {
        viewerDisplayId = `RV-ERR-${item.id.substring(0, 4).toUpperCase()}`;
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

    // ── PROMPT PRE-LOAD: Fetch immediately so it's ready for the easter egg ──
    if (promptContent && promptContent._promptUrl && !promptContent._loaded) {
        // We don't await here; let it load in the background
        fetchPromptContent(promptContent);
    }

    // Always apply the current mode state when a new image is opened
    applyEggUIState(window.__eggMode);


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
