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
        "id": "master 20260324 125954 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 125954 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774356501/revision-arts/master%2020260324%20125954%20%5BFPS%203x4%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774356350/revision-arts/prompt_20260324_125954_%5BFPS_3x4%5D",
        "assetId": "01f112acedf58160c0eef6d8c4f450d7",
        "uploadedAt": "2026-03-24T12:48:21Z"
    },
    {
        "id": "master 20260324 130031 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 130031 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774356498/revision-arts/master%2020260324%20130031%20%5BFPS%203x4%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774356350/revision-arts/prompt_20260324_130031_%5BFPS_3x4%5D",
        "assetId": "55f66fc6c9dc67d9c9ac0089f19e48ad",
        "uploadedAt": "2026-03-24T12:48:18Z"
    },
    {
        "id": "master 20260324 130111 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 130111 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774356495/revision-arts/master%2020260324%20130111%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774356350/revision-arts/prompt_20260324_130111_%5BFPS_4x5%5D",
        "assetId": "6940be60754b5b92798cb8d6ee754477",
        "uploadedAt": "2026-03-24T12:48:15Z"
    },
    {
        "id": "master 20260324 130219 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 130219 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774356492/revision-arts/master%2020260324%20130219%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774356349/revision-arts/prompt_20260324_130219_%5BFPS_4x5%5D",
        "assetId": "0691d6444c03afa5edce2480884ce17b",
        "uploadedAt": "2026-03-24T12:48:12Z"
    },
    {
        "id": "master 20260324 130252 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 130252 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774356488/revision-arts/master%2020260324%20130252%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774356348/revision-arts/prompt_20260324_130252_%5BFPS_4x5%5D",
        "assetId": "0bd6b60cbcf50bcae5927bf4fbe2d4a6",
        "uploadedAt": "2026-03-24T12:48:08Z"
    },
    {
        "id": "master 20260324 130332 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 130332 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774356486/revision-arts/master%2020260324%20130332%20%5BFPS%203x4%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774356349/revision-arts/prompt_20260324_130332_%5BFPS_3x4%5D",
        "assetId": "e028bf9fed86b944fa00d111806111a6",
        "uploadedAt": "2026-03-24T12:48:06Z"
    },
    {
        "id": "master 20260324 130416 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 130416 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774356482/revision-arts/master%2020260324%20130416%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774356348/revision-arts/prompt_20260324_130416_%5BFPS_4x5%5D",
        "assetId": "f1d68c938d9f0f1669f042f431c08ee9",
        "uploadedAt": "2026-03-24T12:48:02Z"
    },
    {
        "id": "master 20260324 130455 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 130455 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774356479/revision-arts/master%2020260324%20130455%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774356348/revision-arts/prompt_20260324_130455_%5BFPS_4x5%5D",
        "assetId": "db5134aa243d81e51d99be2157c5de0a",
        "uploadedAt": "2026-03-24T12:47:59Z"
    },
    {
        "id": "master 20260324 130529 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 130529 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774356476/revision-arts/master%2020260324%20130529%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774356348/revision-arts/prompt_20260324_130529_%5BFPS_4x5%5D",
        "assetId": "3b95600dfcdb33711e8d9766ff617b5f",
        "uploadedAt": "2026-03-24T12:47:56Z"
    },
    {
        "id": "master 20260324 130613 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 130613 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774356469/revision-arts/master%2020260324%20130613%20%5BFPS%203x4%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774356348/revision-arts/prompt_20260324_130613_%5BFPS_3x4%5D",
        "assetId": "b9c60a76ab17537643066accca314219",
        "uploadedAt": "2026-03-24T12:47:49Z"
    },
    {
        "id": "master 20260324 131235 [FPS 1x1]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 131235 [FPS 1x1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774356464/revision-arts/master%2020260324%20131235%20%5BFPS%201x1%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774356348/revision-arts/prompt_20260324_131235_%5BFPS_1x1%5D",
        "assetId": "533737deedebcdc7f383cc8d3a9d94e8",
        "uploadedAt": "2026-03-24T12:47:44Z"
    },
    {
        "id": "master 20260324 131317 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 131317 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774356461/revision-arts/master%2020260324%20131317%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774356347/revision-arts/prompt_20260324_131317_%5BFPS_4x5%5D",
        "assetId": "835882d2a2940f07b98b9e2c3b95130d",
        "uploadedAt": "2026-03-24T12:47:41Z"
    },
    {
        "id": "master 20260324 131350 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 131350 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774356457/revision-arts/master%2020260324%20131350%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774356348/revision-arts/prompt_20260324_131350_%5BFPS_4x5%5D",
        "assetId": "0389d798245af8cc1b440c7b72319f2a",
        "uploadedAt": "2026-03-24T12:47:37Z"
    },
    {
        "id": "master 20260324 131516 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 131516 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774356432/revision-arts/master%2020260324%20131516%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774356346/revision-arts/prompt_20260324_131516_%5BFPS_4x5%5D",
        "assetId": "bafdceb8455b00166795ee7f7e470d00",
        "uploadedAt": "2026-03-24T12:47:12Z"
    },
    {
        "id": "master 20260324 131751 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 131751 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774356424/revision-arts/master%2020260324%20131751%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774356346/revision-arts/prompt_20260324_131751_%5BFPS_4x5%5D",
        "assetId": "57e68572340013a210917565fe3efe7f",
        "uploadedAt": "2026-03-24T12:47:04Z"
    },
    {
        "id": "master 20260324 131829 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 131829 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774356419/revision-arts/master%2020260324%20131829%20%5BFPS%202x3%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774356346/revision-arts/prompt_20260324_131829_%5BFPS_2x3%5D",
        "assetId": "477fa688470717eb8d7166a524057134",
        "uploadedAt": "2026-03-24T12:46:59Z"
    },
    {
        "id": "master 20260324 131910 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 131910 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774356409/revision-arts/master%2020260324%20131910%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774356346/revision-arts/prompt_20260324_131910_%5BFPS_4x5%5D",
        "assetId": "b5d1e2ff2c45d8aa39b85e6b548ee75f",
        "uploadedAt": "2026-03-24T12:46:49Z"
    },
    {
        "id": "master 20260324 132208 [FPS 9x16]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 132208 [FPS 9x16]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774356511/revision-arts/master%2020260324%20132208%20%5BFPS%209x16%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774356351/revision-arts/prompt_20260324_132208_%5BFPS_9x16%5D",
        "assetId": "0c78269d00b6ffed312944ee4c2c839b",
        "uploadedAt": "2026-03-24T12:48:31Z"
    },
    {
        "id": "master 20260324 132335 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 132335 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774356508/revision-arts/master%2020260324%20132335%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774356351/revision-arts/prompt_20260324_132335_%5BFPS_4x5%5D",
        "assetId": "b310fd6b89dd57804458057e92b91251",
        "uploadedAt": "2026-03-24T12:48:28Z"
    },
    {
        "id": "master 20260324 132504 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 132504 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774356505/revision-arts/master%2020260324%20132504%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774356350/revision-arts/prompt_20260324_132504_%5BFPS_4x5%5D",
        "assetId": "a4a5b871cbbacdb9310daf3bd4bf5562",
        "uploadedAt": "2026-03-24T12:48:25Z"
    },
    {
        "id": "master 20260324 134501 [FPS 9x16]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 134501 [FPS 9x16]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774356036/revision-arts/master%2020260324%20134501%20%5BFPS%209x16%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774355910/revision-arts/prompt_20260324_134501_%5BFPS_9x16%5D",
        "assetId": "5ccdbd021aa992ba13b1ab331d860932",
        "uploadedAt": "2026-03-24T12:40:36Z"
    },
    {
        "id": "master 20260324 134528 [FPS 4x5]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 134528 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774356031/revision-arts/master%2020260324%20134528%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774355909/revision-arts/prompt_20260324_134528_%5BFPS_4x5%5D",
        "assetId": "3b37f83e9bbdd3929114b4dfe32e4e2e",
        "uploadedAt": "2026-03-24T12:40:31Z"
    },
    {
        "id": "master 20260324 134915 [FPS 9x16]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 134915 [FPS 9x16]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774356028/revision-arts/master%2020260324%20134915%20%5BFPS%209x16%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774355909/revision-arts/prompt_20260324_134915_%5BFPS_9x16%5D",
        "assetId": "2bdd16beeb1096328c55068d7632cb8b",
        "uploadedAt": "2026-03-24T12:40:28Z"
    },
    {
        "id": "master 20260324 135243 [FPS 3x4]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 135243 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774356023/revision-arts/master%2020260324%20135243%20%5BFPS%203x4%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774355909/revision-arts/prompt_20260324_135243_%5BFPS_3x4%5D",
        "assetId": "5e943b5e3f1ea7d2af7cb356ef2c0eaa",
        "uploadedAt": "2026-03-24T12:40:23Z"
    },
    {
        "id": "master 20260324 135331 [FPS 4x5]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 135331 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774356019/revision-arts/master%2020260324%20135331%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774355909/revision-arts/prompt_20260324_135331_%5BFPS_4x5%5D",
        "assetId": "cf206bba6a6164cc5dbe1fecd5877172",
        "uploadedAt": "2026-03-24T12:40:19Z"
    },
    {
        "id": "master 20260324 135556 [FPS 3x4]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 135556 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774356014/revision-arts/master%2020260324%20135556%20%5BFPS%203x4%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774355909/revision-arts/prompt_20260324_135556_%5BFPS_3x4%5D",
        "assetId": "cba484569eec8aa4ade51f662fefb8c3",
        "uploadedAt": "2026-03-24T12:40:14Z"
    },
    {
        "id": "master 20260324 135848 [FPS 4x5]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 135848 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774356010/revision-arts/master%2020260324%20135848%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774355908/revision-arts/prompt_20260324_135848_%5BFPS_4x5%5D",
        "assetId": "f40a05ca4621819db618b64ac6e63ef8",
        "uploadedAt": "2026-03-24T12:40:10Z"
    },
    {
        "id": "master 20260324 135937 [FPS 2x3]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 135937 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774356007/revision-arts/master%2020260324%20135937%20%5BFPS%202x3%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774355908/revision-arts/prompt_20260324_135937_%5BFPS_2x3%5D",
        "assetId": "760396cfdd0243af92aa93746254604c",
        "uploadedAt": "2026-03-24T12:40:07Z"
    },
    {
        "id": "master 20260324 140039 [FPS 9x16]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 140039 [FPS 9x16]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774356003/revision-arts/master%2020260324%20140039%20%5BFPS%209x16%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774355908/revision-arts/prompt_20260324_140039_%5BFPS_9x16%5D",
        "assetId": "a912efbd52682522fa43b813ff87b881",
        "uploadedAt": "2026-03-24T12:40:03Z"
    },
    {
        "id": "master 20260324 140108 [FPS 2x3]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 140108 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355998/revision-arts/master%2020260324%20140108%20%5BFPS%202x3%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774355908/revision-arts/prompt_20260324_140108_%5BFPS_2x3%5D",
        "assetId": "e8abdbf8c4fe1a7e795e6d527de21653",
        "uploadedAt": "2026-03-24T12:39:58Z"
    },
    {
        "id": "master 20260324 140339 [FPS 2x3]",
        "tags": [
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 140339 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355995/revision-arts/master%2020260324%20140339%20%5BFPS%202x3%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": null,
        "assetId": "cadbd80379e54c3f316e319fa8d559a3",
        "uploadedAt": "2026-03-24T12:39:55Z"
    },
    {
        "id": "master 20260324 140848 [FPS 1x1]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 140848 [FPS 1x1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355992/revision-arts/master%2020260324%20140848%20%5BFPS%201x1%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774355906/revision-arts/prompt_20260324_140848_%5BFPS_1x1%5D",
        "assetId": "c488bba750d1199b22ece8c8311eba87",
        "uploadedAt": "2026-03-24T12:39:52Z"
    },
    {
        "id": "master 20260324 140920 [FPS 2x3]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 140920 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355989/revision-arts/master%2020260324%20140920%20%5BFPS%202x3%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774355906/revision-arts/prompt_20260324_140920_%5BFPS_2x3%5D",
        "assetId": "452625d45beb010e4614cd1f5c1c9615",
        "uploadedAt": "2026-03-24T12:39:49Z"
    },
    {
        "id": "master 20260324 140954 [FPS 3x4]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 140954 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355986/revision-arts/master%2020260324%20140954%20%5BFPS%203x4%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774355906/revision-arts/prompt_20260324_140954_%5BFPS_3x4%5D",
        "assetId": "fb343a04d36a44300b1ca73323874d08",
        "uploadedAt": "2026-03-24T12:39:46Z"
    },
    {
        "id": "master 20260324 141028 [FPS 3x4]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 141028 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355983/revision-arts/master%2020260324%20141028%20%5BFPS%203x4%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774355906/revision-arts/prompt_20260324_141028_%5BFPS_3x4%5D",
        "assetId": "2f5afcc6827d06fb4e062ae3df4df8b7",
        "uploadedAt": "2026-03-24T12:39:43Z"
    },
    {
        "id": "master 20260324 141310 [FPS 9x16]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 141310 [FPS 9x16]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355980/revision-arts/master%2020260324%20141310%20%5BFPS%209x16%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774355907/revision-arts/prompt_20260324_141310_%5BFPS_9x16%5D",
        "assetId": "160fe73e78a7d364179e9e763d86cbb8",
        "uploadedAt": "2026-03-24T12:39:40Z"
    },
    {
        "id": "master 20260324 141402 [FPS 4x5]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 141402 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355976/revision-arts/master%2020260324%20141402%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774355904/revision-arts/prompt_20260324_141402_%5BFPS_4x5%5D",
        "assetId": "4a775c69a355c17c98aee3caf4e532c2",
        "uploadedAt": "2026-03-24T12:39:36Z"
    },
    {
        "id": "master 20260324 141518 [FPS 3x4]",
        "tags": [
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 141518 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355972/revision-arts/master%2020260324%20141518%20%5BFPS%203x4%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": null,
        "assetId": "8a5f9dcbcbcec5f0ecbf41f7850baf2a",
        "uploadedAt": "2026-03-24T12:39:32Z"
    },
    {
        "id": "master 20260324 141553 [FPS 2x3]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 141553 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355970/revision-arts/master%2020260324%20141553%20%5BFPS%202x3%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774355904/revision-arts/prompt_20260324_141553_%5BFPS_2x3%5D",
        "assetId": "f06743967b90d570aaebdbd1f6d7bc04",
        "uploadedAt": "2026-03-24T12:39:30Z"
    },
    {
        "id": "master 20260324 141629 [FPS 2x3]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 141629 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355967/revision-arts/master%2020260324%20141629%20%5BFPS%202x3%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774355904/revision-arts/prompt_20260324_141629_%5BFPS_2x3%5D",
        "assetId": "a51eda954ba22b7f054654a060bf5347",
        "uploadedAt": "2026-03-24T12:39:27Z"
    },
    {
        "id": "master 20260324 141706 [FPS 1x1]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 141706 [FPS 1x1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355963/revision-arts/master%2020260324%20141706%20%5BFPS%201x1%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774355904/revision-arts/prompt_20260324_141706_%5BFPS_1x1%5D",
        "assetId": "3123deb17ba8fca69fc9c87352227217",
        "uploadedAt": "2026-03-24T12:39:23Z"
    },
    {
        "id": "master 20260324 141739 [FPS 2x3]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 141739 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355960/revision-arts/master%2020260324%20141739%20%5BFPS%202x3%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774355903/revision-arts/prompt_20260324_141739_%5BFPS_2x3%5D",
        "assetId": "0ef6e8caa7af03b77cc556deafb34984",
        "uploadedAt": "2026-03-24T12:39:20Z"
    },
    {
        "id": "master 20260324 141810 [FPS 1x1]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 141810 [FPS 1x1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355957/revision-arts/master%2020260324%20141810%20%5BFPS%201x1%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774355903/revision-arts/prompt_20260324_141810_%5BFPS_1x1%5D",
        "assetId": "ff1d07f0468dbf73b87d127ca3e8507c",
        "uploadedAt": "2026-03-24T12:39:17Z"
    },
    {
        "id": "master 20260324 141845 [FPS 4x5]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 141845 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355954/revision-arts/master%2020260324%20141845%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774355903/revision-arts/prompt_20260324_141845_%5BFPS_4x5%5D",
        "assetId": "26fd8286cd24415ad205a6f6f682768c",
        "uploadedAt": "2026-03-24T12:39:14Z"
    },
    {
        "id": "master 20260324 141928 [FPS 3x4]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 141928 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355952/revision-arts/master%2020260324%20141928%20%5BFPS%203x4%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774355903/revision-arts/prompt_20260324_141928_%5BFPS_3x4%5D",
        "assetId": "d6bdc541c39aaecd9d5208e878be239b",
        "uploadedAt": "2026-03-24T12:39:12Z"
    },
    {
        "id": "master 20260324 142206 [FPS 2x3]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 142206 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355949/revision-arts/master%2020260324%20142206%20%5BFPS%202x3%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774355903/revision-arts/prompt_20260324_142206_%5BFPS_2x3%5D",
        "assetId": "aa2961014b318b1ed8c48a97448267d7",
        "uploadedAt": "2026-03-24T12:39:09Z"
    },
    {
        "id": "master 20260324 142247 [FPS 2x3]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 142247 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355946/revision-arts/master%2020260324%20142247%20%5BFPS%202x3%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774355902/revision-arts/prompt_20260324_142247_%5BFPS_2x3%5D",
        "assetId": "cb4e05367540af1a8f5c8aa00d7b4b1d",
        "uploadedAt": "2026-03-24T12:39:06Z"
    },
    {
        "id": "master 20260324 142330 [FPS 9x16]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 142330 [FPS 9x16]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355942/revision-arts/master%2020260324%20142330%20%5BFPS%209x16%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774355902/revision-arts/prompt_20260324_142330_%5BFPS_9x16%5D",
        "assetId": "baae7fcb9ba36f641e1a1dae48aecc29",
        "uploadedAt": "2026-03-24T12:39:02Z"
    },
    {
        "id": "master 20260324 142533 [FPS 4x5]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 142533 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355938/revision-arts/master%2020260324%20142533%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774355902/revision-arts/prompt_20260324_142533_%5BFPS_4x5%5D",
        "assetId": "c1a043aee0bac31893971e881467b30d",
        "uploadedAt": "2026-03-24T12:38:58Z"
    },
    {
        "id": "master 20260324 142559 [FPS 4x5]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 142559 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355935/revision-arts/master%2020260324%20142559%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774355902/revision-arts/prompt_20260324_142559_%5BFPS_4x5%5D",
        "assetId": "ff01eae343cf4bfd07a0b999f92effb1",
        "uploadedAt": "2026-03-24T12:38:55Z"
    },
    {
        "id": "master 20260324 142636 [FPS 2x3]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 142636 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355932/revision-arts/master%2020260324%20142636%20%5BFPS%202x3%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774355902/revision-arts/prompt_20260324_142636_%5BFPS_2x3%5D",
        "assetId": "c083346d3f1e13e8acf9e95afccd90b0",
        "uploadedAt": "2026-03-24T12:38:52Z"
    },
    {
        "id": "master 20260324 173214 [FPS 4x5]",
        "tags": [
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 173214 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774341759/revision-arts/master%2020260324%20173214%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774341690/revision-arts/prompt_20260324_173214_%5BFPS_4x5%5D",
        "assetId": "621cd8ae85e46f6de4cbae03205fbdaf",
        "uploadedAt": "2026-03-24T08:42:39Z"
    },
    {
        "id": "master 20260324 173303 [FPS 4x5]",
        "tags": [
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 173303 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774341756/revision-arts/master%2020260324%20173303%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774341692/revision-arts/prompt_20260324_173303_%5BFPS_4x5%5D",
        "assetId": "0114e68d785dafe838683f2402b70208",
        "uploadedAt": "2026-03-24T08:42:36Z"
    },
    {
        "id": "master 20260324 173423 [FPS 3x4]",
        "tags": [
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 173423 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774341752/revision-arts/master%2020260324%20173423%20%5BFPS%203x4%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774341692/revision-arts/prompt_20260324_173423_%5BFPS_3x4%5D",
        "assetId": "5c4b6665e1ebca0f9241c8184067294b",
        "uploadedAt": "2026-03-24T08:42:32Z"
    },
    {
        "id": "master 20260324 174133 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 174133 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344234/revision-arts/master%2020260324%20174133%20%5BFPS%203x4%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343774/revision-arts/prompt_20260324_174133_%5BFPS_3x4%5D",
        "assetId": "90e97b6713d2613e6687151914061349",
        "uploadedAt": "2026-03-24T09:23:54Z"
    },
    {
        "id": "master 20260324 174212 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 174212 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344229/revision-arts/master%2020260324%20174212%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343773/revision-arts/prompt_20260324_174212_%5BFPS_4x5%5D",
        "assetId": "90d5c76358ea2e47e7998b32313c14b3",
        "uploadedAt": "2026-03-24T09:23:49Z"
    },
    {
        "id": "master 20260324 174246 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 174246 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344225/revision-arts/master%2020260324%20174246%20%5BFPS%203x4%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343773/revision-arts/prompt_20260324_174246_%5BFPS_3x4%5D",
        "assetId": "412912e199ea915fe5279c8c7a653795",
        "uploadedAt": "2026-03-24T09:23:45Z"
    },
    {
        "id": "master 20260324 174317 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 174317 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344222/revision-arts/master%2020260324%20174317%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343773/revision-arts/prompt_20260324_174317_%5BFPS_4x5%5D",
        "assetId": "adf0235d761ff505433c1141bd8997b2",
        "uploadedAt": "2026-03-24T09:23:42Z"
    },
    {
        "id": "master 20260324 174347 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 174347 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344219/revision-arts/master%2020260324%20174347%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343773/revision-arts/prompt_20260324_174347_%5BFPS_4x5%5D",
        "assetId": "7eb027720d53070a0c5141acc3cb2f89",
        "uploadedAt": "2026-03-24T09:23:39Z"
    },
    {
        "id": "master 20260324 174426 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 174426 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344216/revision-arts/master%2020260324%20174426%20%5BFPS%203x4%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343773/revision-arts/prompt_20260324_174426_%5BFPS_3x4%5D",
        "assetId": "b61d14901a9f43209f68a0c209edef86",
        "uploadedAt": "2026-03-24T09:23:36Z"
    },
    {
        "id": "master 20260324 174522 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 174522 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344212/revision-arts/master%2020260324%20174522%20%5BFPS%203x4%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343772/revision-arts/prompt_20260324_174522_%5BFPS_3x4%5D",
        "assetId": "9a5e78378a1842874188569303f98c31",
        "uploadedAt": "2026-03-24T09:23:32Z"
    },
    {
        "id": "master 20260324 174556 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 174556 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344209/revision-arts/master%2020260324%20174556%20%5BFPS%202x3%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343772/revision-arts/prompt_20260324_174556_%5BFPS_2x3%5D",
        "assetId": "3afe182998776518a5cbda0bb70d1a32",
        "uploadedAt": "2026-03-24T09:23:29Z"
    },
    {
        "id": "master 20260324 174631 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 174631 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344206/revision-arts/master%2020260324%20174631%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343772/revision-arts/prompt_20260324_174631_%5BFPS_4x5%5D",
        "assetId": "503af5a08cd34d7659be8f085645b3a3",
        "uploadedAt": "2026-03-24T09:23:26Z"
    },
    {
        "id": "master 20260324 174642 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 174642 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344203/revision-arts/master%2020260324%20174642%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343772/revision-arts/prompt_20260324_174642_%5BFPS_3x4%5D",
        "assetId": "cbb7a738f63a980fb821e8398baf5099",
        "uploadedAt": "2026-03-24T09:23:23Z"
    },
    {
        "id": "master 20260324 174705 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 174705 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344200/revision-arts/master%2020260324%20174705%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343771/revision-arts/prompt_20260324_174705_%5BFPS_3x4%5D",
        "assetId": "a9ba8d7d8ad6352091e652a88151905d",
        "uploadedAt": "2026-03-24T09:23:20Z"
    },
    {
        "id": "master 20260324 174712 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 174712 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344195/revision-arts/master%2020260324%20174712%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343771/revision-arts/prompt_20260324_174712_%5BFPS_4x5%5D",
        "assetId": "5a48960a1c874d15d04bf0b6492ff982",
        "uploadedAt": "2026-03-24T09:23:15Z"
    },
    {
        "id": "master 20260324 174742 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 174742 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344192/revision-arts/master%2020260324%20174742%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343771/revision-arts/prompt_20260324_174742_%5BFPS_4x5%5D",
        "assetId": "f3961a67cd8847c80e77fab6aaf0ec97",
        "uploadedAt": "2026-03-24T09:23:12Z"
    },
    {
        "id": "master 20260324 174744 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 174744 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344189/revision-arts/master%2020260324%20174744%20%5BFPS%202x3%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343771/revision-arts/prompt_20260324_174744_%5BFPS_2x3%5D",
        "assetId": "cdeba15ce6bc51736d79283693984aa8",
        "uploadedAt": "2026-03-24T09:23:09Z"
    },
    {
        "id": "master 20260324 174753 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 174753 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344186/revision-arts/master%2020260324%20174753%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343770/revision-arts/prompt_20260324_174753_%5BFPS_2x3%5D",
        "assetId": "8c359156f6be7c3dc4cb8325a868b13a",
        "uploadedAt": "2026-03-24T09:23:06Z"
    },
    {
        "id": "master 20260324 174812 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 174812 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344183/revision-arts/master%2020260324%20174812%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343770/revision-arts/prompt_20260324_174812_%5BFPS_4x5%5D",
        "assetId": "e50d0f9dea838f472e176d0e3eeaafe8",
        "uploadedAt": "2026-03-24T09:23:03Z"
    },
    {
        "id": "master 20260324 174816 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 174816 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344180/revision-arts/master%2020260324%20174816%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343770/revision-arts/prompt_20260324_174816_%5BFPS_3x4%5D",
        "assetId": "fd1592617ca42dc2e4c870283490a148",
        "uploadedAt": "2026-03-24T09:23:00Z"
    },
    {
        "id": "master 20260324 174823 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 174823 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344176/revision-arts/master%2020260324%20174823%20%5BFPS%202x3%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343770/revision-arts/prompt_20260324_174823_%5BFPS_2x3%5D",
        "assetId": "cafb3b2f6cd3f739d64d594e7e402e57",
        "uploadedAt": "2026-03-24T09:22:56Z"
    },
    {
        "id": "master 20260324 174828 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 174828 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344173/revision-arts/master%2020260324%20174828%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343769/revision-arts/prompt_20260324_174828_%5BFPS_2x3%5D",
        "assetId": "6bc59bd083225d28ab34a4e9deb4f9c4",
        "uploadedAt": "2026-03-24T09:22:53Z"
    },
    {
        "id": "master 20260324 174848 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 174848 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344170/revision-arts/master%2020260324%20174848%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343769/revision-arts/prompt_20260324_174848_%5BFPS_4x5%5D",
        "assetId": "5a909410c1d11d38a2e461daccc2eca5",
        "uploadedAt": "2026-03-24T09:22:50Z"
    },
    {
        "id": "master 20260324 174859 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 174859 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344166/revision-arts/master%2020260324%20174859%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343769/revision-arts/prompt_20260324_174859_%5BFPS_2x3%5D",
        "assetId": "0e357bedd3d7c60263e4a5ea830fdca7",
        "uploadedAt": "2026-03-24T09:22:46Z"
    },
    {
        "id": "master 20260324 174913 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 174913 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344163/revision-arts/master%2020260324%20174913%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343769/revision-arts/prompt_20260324_174913_%5BFPS_3x4%5D",
        "assetId": "315fb48b05a0af3639a41fd548d62df5",
        "uploadedAt": "2026-03-24T09:22:43Z"
    },
    {
        "id": "master 20260324 174913 [FPS 3x4] (1)",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 174913 [FPS 3x4] (1)",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344159/revision-arts/master%2020260324%20174913%20%5BFPS%203x4%5D%20%281%29.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343768/revision-arts/prompt_20260324_174913_%5BFPS_3x4%5D%20%281%29",
        "assetId": "e5fc1674af3c2f19abb614ce50aac979",
        "uploadedAt": "2026-03-24T09:22:39Z"
    },
    {
        "id": "master 20260324 174945 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 174945 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344155/revision-arts/master%2020260324%20174945%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343768/revision-arts/prompt_20260324_174945_%5BFPS_2x3%5D",
        "assetId": "268a8cf99a826b84bc50736c22dff900",
        "uploadedAt": "2026-03-24T09:22:35Z"
    },
    {
        "id": "master 20260324 174947 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 174947 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344151/revision-arts/master%2020260324%20174947%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343768/revision-arts/prompt_20260324_174947_%5BFPS_2x3%5D",
        "assetId": "8ed2ff6d0ed75465362e2bc4d7127388",
        "uploadedAt": "2026-03-24T09:22:31Z"
    },
    {
        "id": "master 20260324 174950 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 174950 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344147/revision-arts/master%2020260324%20174950%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343768/revision-arts/prompt_20260324_174950_%5BFPS_4x5%5D",
        "assetId": "fd4a2999f4284374418255bcf9b90439",
        "uploadedAt": "2026-03-24T09:22:27Z"
    },
    {
        "id": "master 20260324 175020 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175020 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344129/revision-arts/master%2020260324%20175020%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343766/revision-arts/prompt_20260324_175020_%5BFPS_2x3%5D",
        "assetId": "add907e2e58d7822181c5781c686312c",
        "uploadedAt": "2026-03-24T09:22:09Z"
    },
    {
        "id": "master 20260324 175025 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175025 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344119/revision-arts/master%2020260324%20175025%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343766/revision-arts/prompt_20260324_175025_%5BFPS_3x4%5D",
        "assetId": "3ddf82bc3cff2034fc29fa1416f48e72",
        "uploadedAt": "2026-03-24T09:21:59Z"
    },
    {
        "id": "master 20260324 175025 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175025 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344124/revision-arts/master%2020260324%20175025%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343766/revision-arts/prompt_20260324_175025_%5BFPS_4x5%5D",
        "assetId": "76d8ce089d79b4a0385d6dfac3b9ba84",
        "uploadedAt": "2026-03-24T09:22:04Z"
    },
    {
        "id": "master 20260324 175051 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175051 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344114/revision-arts/master%2020260324%20175051%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343766/revision-arts/prompt_20260324_175051_%5BFPS_2x3%5D",
        "assetId": "55dcbccaf0ec2f58e300ae43f76b8760",
        "uploadedAt": "2026-03-24T09:21:54Z"
    },
    {
        "id": "master 20260324 175058 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175058 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344110/revision-arts/master%2020260324%20175058%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343765/revision-arts/prompt_20260324_175058_%5BFPS_2x3%5D",
        "assetId": "6e8f2a6dc338a056931739210ded121c",
        "uploadedAt": "2026-03-24T09:21:50Z"
    },
    {
        "id": "master 20260324 175124 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175124 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344106/revision-arts/master%2020260324%20175124%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343765/revision-arts/prompt_20260324_175124_%5BFPS_2x3%5D",
        "assetId": "57ec22ec4f754e7d65afd382578c6788",
        "uploadedAt": "2026-03-24T09:21:46Z"
    },
    {
        "id": "master 20260324 175129 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175129 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344101/revision-arts/master%2020260324%20175129%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343765/revision-arts/prompt_20260324_175129_%5BFPS_3x4%5D",
        "assetId": "e8347e8a4aabd28debe2a56c6c0014d4",
        "uploadedAt": "2026-03-24T09:21:41Z"
    },
    {
        "id": "master 20260324 175136 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175136 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344096/revision-arts/master%2020260324%20175136%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343765/revision-arts/prompt_20260324_175136_%5BFPS_3x4%5D",
        "assetId": "535aeb94cf4b624057ead63cbfa815a5",
        "uploadedAt": "2026-03-24T09:21:36Z"
    },
    {
        "id": "master 20260324 175156 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175156 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344091/revision-arts/master%2020260324%20175156%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343765/revision-arts/prompt_20260324_175156_%5BFPS_3x4%5D",
        "assetId": "2ea75029f45912c567f6c1653a1c5f07",
        "uploadedAt": "2026-03-24T09:21:31Z"
    },
    {
        "id": "master 20260324 175158 [FPS 9x16]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175158 [FPS 9x16]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344086/revision-arts/master%2020260324%20175158%20%5BFPS%209x16%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343764/revision-arts/prompt_20260324_175158_%5BFPS_9x16%5D",
        "assetId": "fde2180cf237971a85e2e470a089c739",
        "uploadedAt": "2026-03-24T09:21:26Z"
    },
    {
        "id": "master 20260324 175200 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175200 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344082/revision-arts/master%2020260324%20175200%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343763/revision-arts/prompt_20260324_175200_%5BFPS_4x5%5D",
        "assetId": "e6fb6e81a446b3f5abcc4877d10ca965",
        "uploadedAt": "2026-03-24T09:21:22Z"
    },
    {
        "id": "master 20260324 175214 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175214 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344077/revision-arts/master%2020260324%20175214%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343763/revision-arts/prompt_20260324_175214_%5BFPS_4x5%5D",
        "assetId": "b19fe930808ddc9451150c96d514cd35",
        "uploadedAt": "2026-03-24T09:21:17Z"
    },
    {
        "id": "master 20260324 175223 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175223 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344072/revision-arts/master%2020260324%20175223%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343764/revision-arts/prompt_20260324_175223_%5BFPS_4x5%5D",
        "assetId": "38aef0f52325733fe6683a1b49c0c10d",
        "uploadedAt": "2026-03-24T09:21:12Z"
    },
    {
        "id": "master 20260324 175228 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175228 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344068/revision-arts/master%2020260324%20175228%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343763/revision-arts/prompt_20260324_175228_%5BFPS_4x5%5D",
        "assetId": "a0731f174a1714d6f19fb2e40db1e4d5",
        "uploadedAt": "2026-03-24T09:21:08Z"
    },
    {
        "id": "master 20260324 175244 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175244 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344056/revision-arts/master%2020260324%20175244%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343762/revision-arts/prompt_20260324_175244_%5BFPS_2x3%5D",
        "assetId": "ce13493d849455039be0e205f068c993",
        "uploadedAt": "2026-03-24T09:20:56Z"
    },
    {
        "id": "master 20260324 175245 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175245 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344062/revision-arts/master%2020260324%20175245%20%5BFPS%203x4%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343762/revision-arts/prompt_20260324_175245_%5BFPS_3x4%5D",
        "assetId": "6cacd44715044f597938fc1a86bbbe60",
        "uploadedAt": "2026-03-24T09:21:02Z"
    },
    {
        "id": "master 20260324 175301 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175301 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344051/revision-arts/master%2020260324%20175301%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343762/revision-arts/prompt_20260324_175301_%5BFPS_3x4%5D",
        "assetId": "1d35f24a58b231f9adc5101081a662b0",
        "uploadedAt": "2026-03-24T09:20:51Z"
    },
    {
        "id": "master 20260324 175302 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175302 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344048/revision-arts/master%2020260324%20175302%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343762/revision-arts/prompt_20260324_175302_%5BFPS_3x4%5D",
        "assetId": "1d102b757faa3922a1c2e4e649a00411",
        "uploadedAt": "2026-03-24T09:20:48Z"
    },
    {
        "id": "master 20260324 175319 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175319 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774345618/revision-arts/master%2020260324%20175319%20%5BFPS%203x4%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343762/revision-arts/prompt_20260324_175319_%5BFPS_3x4%5D",
        "assetId": "fc95aa9d72823b1e8593107fe4b39df8",
        "uploadedAt": "2026-03-24T09:46:58Z"
    },
    {
        "id": "master 20260324 175323 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175323 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774345594/revision-arts/master%2020260324%20175323%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343801/revision-arts/prompt_20260324_175323_%5BFPS_3x4%5D",
        "assetId": "f25cdbbddd6388161b582b793ba8a458",
        "uploadedAt": "2026-03-24T09:46:34Z"
    },
    {
        "id": "master 20260324 175331 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175331 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774345568/revision-arts/master%2020260324%20175331%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343801/revision-arts/prompt_20260324_175331_%5BFPS_2x3%5D",
        "assetId": "1ecbffca912d5e1e5367ff10676ec2b2",
        "uploadedAt": "2026-03-24T09:46:08Z"
    },
    {
        "id": "master 20260324 175335 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175335 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774345542/revision-arts/master%2020260324%20175335%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343800/revision-arts/prompt_20260324_175335_%5BFPS_3x4%5D",
        "assetId": "2c8a1086476dce2928d5d9f055431f98",
        "uploadedAt": "2026-03-24T09:45:42Z"
    },
    {
        "id": "master 20260324 175400 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175400 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774345516/revision-arts/master%2020260324%20175400%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343800/revision-arts/prompt_20260324_175400_%5BFPS_3x4%5D",
        "assetId": "5490374897dff819b09d3b86799dd48e",
        "uploadedAt": "2026-03-24T09:45:16Z"
    },
    {
        "id": "master 20260324 175410 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175410 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774345491/revision-arts/master%2020260324%20175410%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343800/revision-arts/prompt_20260324_175410_%5BFPS_4x5%5D",
        "assetId": "697b930abb6f9ea06778337afcedf949",
        "uploadedAt": "2026-03-24T09:44:51Z"
    },
    {
        "id": "master 20260324 175434 [FPS 1x1]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175434 [FPS 1x1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774345467/revision-arts/master%2020260324%20175434%20%5BFPS%201x1%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343800/revision-arts/prompt_20260324_175434_%5BFPS_1x1%5D",
        "assetId": "1c58906e6d084f138dd8e53309cb490e",
        "uploadedAt": "2026-03-24T09:44:27Z"
    },
    {
        "id": "master 20260324 175443 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175443 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774345442/revision-arts/master%2020260324%20175443%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343799/revision-arts/prompt_20260324_175443_%5BFPS_3x4%5D",
        "assetId": "fbba39dad531d4b21fb72672ce134a9e",
        "uploadedAt": "2026-03-24T09:44:02Z"
    },
    {
        "id": "master 20260324 175504 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175504 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774345390/revision-arts/master%2020260324%20175504%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343799/revision-arts/prompt_20260324_175504_%5BFPS_2x3%5D",
        "assetId": "8572b5c92d07ac707306d6c6c352c41e",
        "uploadedAt": "2026-03-24T09:43:10Z"
    },
    {
        "id": "master 20260324 175504 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175504 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774345416/revision-arts/master%2020260324%20175504%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343799/revision-arts/prompt_20260324_175504_%5BFPS_4x5%5D",
        "assetId": "0ed8fd1b11aeec68826c8b302bf68ec2",
        "uploadedAt": "2026-03-24T09:43:36Z"
    },
    {
        "id": "master 20260324 175530 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175530 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774345366/revision-arts/master%2020260324%20175530%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343799/revision-arts/prompt_20260324_175530_%5BFPS_4x5%5D",
        "assetId": "42a0fe271b46f50ec4397dd9d032f9e7",
        "uploadedAt": "2026-03-24T09:42:46Z"
    },
    {
        "id": "master 20260324 175535 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175535 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774345342/revision-arts/master%2020260324%20175535%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343797/revision-arts/prompt_20260324_175535_%5BFPS_4x5%5D",
        "assetId": "dd3d830e04c68310c76db3d778c3de1c",
        "uploadedAt": "2026-03-24T09:42:22Z"
    },
    {
        "id": "master 20260324 175606 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175606 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774345317/revision-arts/master%2020260324%20175606%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343798/revision-arts/prompt_20260324_175606_%5BFPS_3x4%5D",
        "assetId": "c636ebc53264fe6988814e783f639ebb",
        "uploadedAt": "2026-03-24T09:41:57Z"
    },
    {
        "id": "master 20260324 175618 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175618 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774345293/revision-arts/master%2020260324%20175618%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343797/revision-arts/prompt_20260324_175618_%5BFPS_3x4%5D",
        "assetId": "8fe4df2adc0f55bbcd28ecb2bcc88a03",
        "uploadedAt": "2026-03-24T09:41:33Z"
    },
    {
        "id": "master 20260324 175627 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175627 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774345268/revision-arts/master%2020260324%20175627%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343797/revision-arts/prompt_20260324_175627_%5BFPS_4x5%5D",
        "assetId": "e1a6f0207cdfa321717aac76e7e7780b",
        "uploadedAt": "2026-03-24T09:41:08Z"
    },
    {
        "id": "master 20260324 175637 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175637 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774345243/revision-arts/master%2020260324%20175637%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343797/revision-arts/prompt_20260324_175637_%5BFPS_2x3%5D",
        "assetId": "afc684765f10add38d1538fb260da79f",
        "uploadedAt": "2026-03-24T09:40:43Z"
    },
    {
        "id": "master 20260324 175652 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175652 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774345216/revision-arts/master%2020260324%20175652%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343797/revision-arts/prompt_20260324_175652_%5BFPS_2x3%5D",
        "assetId": "4728e9c4ec8daf9e6c2c44e18b57a370",
        "uploadedAt": "2026-03-24T09:40:16Z"
    },
    {
        "id": "master 20260324 175655 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175655 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774345190/revision-arts/master%2020260324%20175655%20%5BFPS%203x4%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343797/revision-arts/prompt_20260324_175655_%5BFPS_3x4%5D",
        "assetId": "49f5adf369cc4c1fc62c711a302f080e",
        "uploadedAt": "2026-03-24T09:39:50Z"
    },
    {
        "id": "master 20260324 175659 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175659 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774345167/revision-arts/master%2020260324%20175659%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343797/revision-arts/prompt_20260324_175659_%5BFPS_2x3%5D",
        "assetId": "973df92c0cfdd65b61816d5a043f9a36",
        "uploadedAt": "2026-03-24T09:39:27Z"
    },
    {
        "id": "master 20260324 175707 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175707 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774345141/revision-arts/master%2020260324%20175707%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343797/revision-arts/prompt_20260324_175707_%5BFPS_2x3%5D",
        "assetId": "e52fc21dc88ffb3384dc07986a393afa",
        "uploadedAt": "2026-03-24T09:39:01Z"
    },
    {
        "id": "master 20260324 175725 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175725 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774345116/revision-arts/master%2020260324%20175725%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343795/revision-arts/prompt_20260324_175725_%5BFPS_3x4%5D",
        "assetId": "ae09dc6e4dd6588881a0c724304d0871",
        "uploadedAt": "2026-03-24T09:38:36Z"
    },
    {
        "id": "master 20260324 175730 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175730 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774345090/revision-arts/master%2020260324%20175730%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343795/revision-arts/prompt_20260324_175730_%5BFPS_2x3%5D",
        "assetId": "2c5be8a0eb095d155a98f22177d2dd57",
        "uploadedAt": "2026-03-24T09:38:10Z"
    },
    {
        "id": "master 20260324 175737 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175737 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774345064/revision-arts/master%2020260324%20175737%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343795/revision-arts/prompt_20260324_175737_%5BFPS_2x3%5D",
        "assetId": "0c4ce32295c08844211742dec520aec7",
        "uploadedAt": "2026-03-24T09:37:44Z"
    },
    {
        "id": "master 20260324 175740 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175740 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774345037/revision-arts/master%2020260324%20175740%20%5BFPS%203x4%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343795/revision-arts/prompt_20260324_175740_%5BFPS_3x4%5D",
        "assetId": "14978f9efc0411e1b7ffdfb799344d87",
        "uploadedAt": "2026-03-24T09:37:17Z"
    },
    {
        "id": "master 20260324 175804 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175804 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774345013/revision-arts/master%2020260324%20175804%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343795/revision-arts/prompt_20260324_175804_%5BFPS_3x4%5D",
        "assetId": "904fef57beb51a1077bdd5d4852c0135",
        "uploadedAt": "2026-03-24T09:36:53Z"
    },
    {
        "id": "master 20260324 175806 [FPS 3x4] (1)",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175806 [FPS 3x4] (1)",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344988/revision-arts/master%2020260324%20175806%20%5BFPS%203x4%5D%20%281%29.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343794/revision-arts/prompt_20260324_175806_%5BFPS_3x4%5D%20%281%29",
        "assetId": "bf2feaa8ee2130057c5aef00a97d9493",
        "uploadedAt": "2026-03-24T09:36:28Z"
    },
    {
        "id": "master 20260324 175825 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175825 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344962/revision-arts/master%2020260324%20175825%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343794/revision-arts/prompt_20260324_175825_%5BFPS_4x5%5D",
        "assetId": "b003e1ec81a0ec3cbc669b08696a043f",
        "uploadedAt": "2026-03-24T09:36:02Z"
    },
    {
        "id": "master 20260324 175832 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175832 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344939/revision-arts/master%2020260324%20175832%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343794/revision-arts/prompt_20260324_175832_%5BFPS_2x3%5D",
        "assetId": "d1501ed3babdf4caff3179b4e8bb0597",
        "uploadedAt": "2026-03-24T09:35:39Z"
    },
    {
        "id": "master 20260324 175837 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175837 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344914/revision-arts/master%2020260324%20175837%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343794/revision-arts/prompt_20260324_175837_%5BFPS_4x5%5D",
        "assetId": "509d6dcbd61d61370d1e832cb78521cf",
        "uploadedAt": "2026-03-24T09:35:14Z"
    },
    {
        "id": "master 20260324 175854 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175854 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344888/revision-arts/master%2020260324%20175854%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343791/revision-arts/prompt_20260324_175854_%5BFPS_2x3%5D",
        "assetId": "0101aa337b767a3574ee436bba4e76d5",
        "uploadedAt": "2026-03-24T09:34:48Z"
    },
    {
        "id": "master 20260324 175859 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175859 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344864/revision-arts/master%2020260324%20175859%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343792/revision-arts/prompt_20260324_175859_%5BFPS_3x4%5D",
        "assetId": "e66310b9766deca2c9d7792fb1bf54de",
        "uploadedAt": "2026-03-24T09:34:24Z"
    },
    {
        "id": "master 20260324 175910 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175910 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344839/revision-arts/master%2020260324%20175910%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343792/revision-arts/prompt_20260324_175910_%5BFPS_3x4%5D",
        "assetId": "2d6a9a443cc0234a5f2ed18cc8db44a6",
        "uploadedAt": "2026-03-24T09:33:59Z"
    },
    {
        "id": "master 20260324 175924 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175924 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344811/revision-arts/master%2020260324%20175924%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343791/revision-arts/prompt_20260324_175924_%5BFPS_4x5%5D",
        "assetId": "8676d40837105356b25e6f6f58aa40ca",
        "uploadedAt": "2026-03-24T09:33:31Z"
    },
    {
        "id": "master 20260324 175926 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175926 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344784/revision-arts/master%2020260324%20175926%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343791/revision-arts/prompt_20260324_175926_%5BFPS_2x3%5D",
        "assetId": "34ba34bd4c43a44eed6ad20feb545b1a",
        "uploadedAt": "2026-03-24T09:33:04Z"
    },
    {
        "id": "master 20260324 175928 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175928 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344758/revision-arts/master%2020260324%20175928%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343790/revision-arts/prompt_20260324_175928_%5BFPS_3x4%5D",
        "assetId": "0e5a3c8f8b82a623e170f1895ad5bec8",
        "uploadedAt": "2026-03-24T09:32:38Z"
    },
    {
        "id": "master 20260324 175945 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 175945 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344733/revision-arts/master%2020260324%20175945%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343790/revision-arts/prompt_20260324_175945_%5BFPS_2x3%5D",
        "assetId": "ef3c982e9d397b83470187861b5bed9f",
        "uploadedAt": "2026-03-24T09:32:13Z"
    },
    {
        "id": "master 20260324 180000 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 180000 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344708/revision-arts/master%2020260324%20180000%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343790/revision-arts/prompt_20260324_180000_%5BFPS_2x3%5D",
        "assetId": "2a0681832d14923f361900178cb56c43",
        "uploadedAt": "2026-03-24T09:31:48Z"
    },
    {
        "id": "master 20260324 180008 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 180008 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344684/revision-arts/master%2020260324%20180008%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343790/revision-arts/prompt_20260324_180008_%5BFPS_2x3%5D",
        "assetId": "dfb29acc728f199c47adc5573281e48b",
        "uploadedAt": "2026-03-24T09:31:24Z"
    },
    {
        "id": "master 20260324 180015 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 180015 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344660/revision-arts/master%2020260324%20180015%20%5BFPS%202x3%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343790/revision-arts/prompt_20260324_180015_%5BFPS_2x3%5D",
        "assetId": "a9054fcbecfa174398f1eec58b62b2df",
        "uploadedAt": "2026-03-24T09:31:00Z"
    },
    {
        "id": "master 20260324 180016 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 180016 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344637/revision-arts/master%2020260324%20180016%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343789/revision-arts/prompt_20260324_180016_%5BFPS_4x5%5D",
        "assetId": "c975af0878701300b9b027282da1a0f7",
        "uploadedAt": "2026-03-24T09:30:37Z"
    },
    {
        "id": "master 20260324 180041 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 180041 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344634/revision-arts/master%2020260324%20180041%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343789/revision-arts/prompt_20260324_180041_%5BFPS_2x3%5D",
        "assetId": "2ccffbb2e8be5fb47b76fc8c62ee6f0c",
        "uploadedAt": "2026-03-24T09:30:34Z"
    },
    {
        "id": "master 20260324 180100 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 180100 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344631/revision-arts/master%2020260324%20180100%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343788/revision-arts/prompt_20260324_180100_%5BFPS_4x5%5D",
        "assetId": "9ac64d936824ec92ad3343768f8a7355",
        "uploadedAt": "2026-03-24T09:30:31Z"
    },
    {
        "id": "master 20260324 180115 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 180115 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344627/revision-arts/master%2020260324%20180115%20%5BFPS%202x3%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343788/revision-arts/prompt_20260324_180115_%5BFPS_2x3%5D",
        "assetId": "de28452142f84e8807c120f42ffa5498",
        "uploadedAt": "2026-03-24T09:30:27Z"
    },
    {
        "id": "master 20260324 180116 [FPS 3x4]",
        "tags": [
            "b&w",
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 180116 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344624/revision-arts/master%2020260324%20180116%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": null,
        "assetId": "730a0671c5ebb166ebe8c74944a57599",
        "uploadedAt": "2026-03-24T09:30:24Z"
    },
    {
        "id": "master 20260324 180128 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 180128 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344620/revision-arts/master%2020260324%20180128%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343788/revision-arts/prompt_20260324_180128_%5BFPS_2x3%5D",
        "assetId": "9b816dd6be336336baf5d15e2f5c5a57",
        "uploadedAt": "2026-03-24T09:30:20Z"
    },
    {
        "id": "master 20260324 180155 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 180155 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344600/revision-arts/master%2020260324%20180155%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343787/revision-arts/prompt_20260324_180155_%5BFPS_3x4%5D",
        "assetId": "b809d015299af0a9881067233d41c35e",
        "uploadedAt": "2026-03-24T09:30:00Z"
    },
    {
        "id": "master 20260324 180203 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 180203 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344576/revision-arts/master%2020260324%20180203%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343787/revision-arts/prompt_20260324_180203_%5BFPS_2x3%5D",
        "assetId": "31631a1ff7ece717a021381dec71053e",
        "uploadedAt": "2026-03-24T09:29:36Z"
    },
    {
        "id": "master 20260324 180204 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 180204 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344551/revision-arts/master%2020260324%20180204%20%5BFPS%203x4%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343787/revision-arts/prompt_20260324_180204_%5BFPS_3x4%5D",
        "assetId": "9be59d720b201e63ec264f834c8f092c",
        "uploadedAt": "2026-03-24T09:29:11Z"
    },
    {
        "id": "master 20260324 180229 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 180229 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344523/revision-arts/master%2020260324%20180229%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343785/revision-arts/prompt_20260324_180229_%5BFPS_4x5%5D",
        "assetId": "3bc03db76ce4128a255aca8ed976bb8e",
        "uploadedAt": "2026-03-24T09:28:43Z"
    },
    {
        "id": "master 20260324 180237 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 180237 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344501/revision-arts/master%2020260324%20180237%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343785/revision-arts/prompt_20260324_180237_%5BFPS_2x3%5D",
        "assetId": "7111b26819e010faff538d0af90ecedd",
        "uploadedAt": "2026-03-24T09:28:21Z"
    },
    {
        "id": "master 20260324 180304 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 180304 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344473/revision-arts/master%2020260324%20180304%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343784/revision-arts/prompt_20260324_180304_%5BFPS_2x3%5D",
        "assetId": "14425e55e2b5a52ff0bd6f2c790675cf",
        "uploadedAt": "2026-03-24T09:27:53Z"
    },
    {
        "id": "master 20260324 180311 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 180311 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344449/revision-arts/master%2020260324%20180311%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343784/revision-arts/prompt_20260324_180311_%5BFPS_2x3%5D",
        "assetId": "b5b8d4832d71d36c73e24d20ac978788",
        "uploadedAt": "2026-03-24T09:27:29Z"
    },
    {
        "id": "master 20260324 180342 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 180342 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344423/revision-arts/master%2020260324%20180342%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343784/revision-arts/prompt_20260324_180342_%5BFPS_4x5%5D",
        "assetId": "d54ea5a21fee643ba0f828213d214d4c",
        "uploadedAt": "2026-03-24T09:27:03Z"
    },
    {
        "id": "master 20260324 180448 [FPS 1x1]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 180448 [FPS 1x1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344398/revision-arts/master%2020260324%20180448%20%5BFPS%201x1%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343783/revision-arts/prompt_20260324_180448_%5BFPS_1x1%5D",
        "assetId": "c7351c36f425d9685d7f0ba5c18af909",
        "uploadedAt": "2026-03-24T09:26:38Z"
    },
    {
        "id": "master 20260324 180550 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 180550 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344372/revision-arts/master%2020260324%20180550%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343782/revision-arts/prompt_20260324_180550_%5BFPS_3x4%5D",
        "assetId": "d8c88e3b935a14c44604af26ba567fa7",
        "uploadedAt": "2026-03-24T09:26:12Z"
    },
    {
        "id": "master 20260324 180622 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 180622 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344346/revision-arts/master%2020260324%20180622%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343780/revision-arts/prompt_20260324_180622_%5BFPS_2x3%5D",
        "assetId": "a4bf3c5b90b22b7bf2d640cc2b0645f7",
        "uploadedAt": "2026-03-24T09:25:46Z"
    },
    {
        "id": "master 20260324 180633 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 180633 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344320/revision-arts/master%2020260324%20180633%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343780/revision-arts/prompt_20260324_180633_%5BFPS_4x5%5D",
        "assetId": "d84032177dd95be2299b026974478cf1",
        "uploadedAt": "2026-03-24T09:25:20Z"
    },
    {
        "id": "master 20260324 180651 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 180651 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344298/revision-arts/master%2020260324%20180651%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343780/revision-arts/prompt_20260324_180651_%5BFPS_3x4%5D",
        "assetId": "0b4552086f86b9f8b730d684721cbad9",
        "uploadedAt": "2026-03-24T09:24:58Z"
    },
    {
        "id": "master 20260324 180722 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 180722 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344293/revision-arts/master%2020260324%20180722%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343779/revision-arts/prompt_20260324_180722_%5BFPS_2x3%5D",
        "assetId": "2e16f2acda7210df5091a66c4036d7ce",
        "uploadedAt": "2026-03-24T09:24:53Z"
    },
    {
        "id": "master 20260324 180800 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 180800 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344290/revision-arts/master%2020260324%20180800%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343778/revision-arts/prompt_20260324_180800_%5BFPS_3x4%5D",
        "assetId": "49bf38457590b2b7ba60ce1083fde7e9",
        "uploadedAt": "2026-03-24T09:24:50Z"
    },
    {
        "id": "master 20260324 180833 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 180833 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344286/revision-arts/master%2020260324%20180833%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343778/revision-arts/prompt_20260324_180833_%5BFPS_3x4%5D",
        "assetId": "11edb0ea61e95d43f20fe6c2989f5a35",
        "uploadedAt": "2026-03-24T09:24:46Z"
    },
    {
        "id": "master 20260324 180911 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 180911 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344284/revision-arts/master%2020260324%20180911%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343777/revision-arts/prompt_20260324_180911_%5BFPS_4x5%5D",
        "assetId": "8611a2cc35f52d2f9d436e9521bcde5e",
        "uploadedAt": "2026-03-24T09:24:44Z"
    },
    {
        "id": "master 20260324 180921 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 180921 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344280/revision-arts/master%2020260324%20180921%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343777/revision-arts/prompt_20260324_180921_%5BFPS_4x5%5D",
        "assetId": "1212fdcbd48f1265b77bfaab016d24ca",
        "uploadedAt": "2026-03-24T09:24:40Z"
    },
    {
        "id": "master 20260324 180944 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 180944 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344277/revision-arts/master%2020260324%20180944%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343777/revision-arts/prompt_20260324_180944_%5BFPS_2x3%5D",
        "assetId": "b040ec5a7359c8ec7e0011c80d5e1b4d",
        "uploadedAt": "2026-03-24T09:24:37Z"
    },
    {
        "id": "master 20260324 181019 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 181019 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344274/revision-arts/master%2020260324%20181019%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343777/revision-arts/prompt_20260324_181019_%5BFPS_4x5%5D",
        "assetId": "8a93c08d0754e36bdc79b3b0c6dc2952",
        "uploadedAt": "2026-03-24T09:24:34Z"
    },
    {
        "id": "master 20260324 181048 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 181048 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344271/revision-arts/master%2020260324%20181048%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343776/revision-arts/prompt_20260324_181048_%5BFPS_3x4%5D",
        "assetId": "9e59db1de8744c2a676e54fa6698ae2c",
        "uploadedAt": "2026-03-24T09:24:31Z"
    },
    {
        "id": "master 20260324 181113 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 181113 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344268/revision-arts/master%2020260324%20181113%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343776/revision-arts/prompt_20260324_181113_%5BFPS_4x5%5D",
        "assetId": "9a2203ee388ca8cf12bc6ae3ddaf89d4",
        "uploadedAt": "2026-03-24T09:24:28Z"
    },
    {
        "id": "master 20260324 181150 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 181150 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344264/revision-arts/master%2020260324%20181150%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343776/revision-arts/prompt_20260324_181150_%5BFPS_3x4%5D",
        "assetId": "374482e4c8bd6a80896cd7ece6f1685f",
        "uploadedAt": "2026-03-24T09:24:24Z"
    },
    {
        "id": "master 20260324 181217 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 181217 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344261/revision-arts/master%2020260324%20181217%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343776/revision-arts/prompt_20260324_181217_%5BFPS_3x4%5D",
        "assetId": "1e84420d0f1c7c82add7a55a38ac2111",
        "uploadedAt": "2026-03-24T09:24:21Z"
    },
    {
        "id": "master 20260324 181249 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 181249 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344258/revision-arts/master%2020260324%20181249%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343776/revision-arts/prompt_20260324_181249_%5BFPS_4x5%5D",
        "assetId": "18367d0b74e1be57dccc6902a65a0741",
        "uploadedAt": "2026-03-24T09:24:18Z"
    },
    {
        "id": "master 20260324 181316 [FPS 9x16]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 181316 [FPS 9x16]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344254/revision-arts/master%2020260324%20181316%20%5BFPS%209x16%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343775/revision-arts/prompt_20260324_181316_%5BFPS_9x16%5D",
        "assetId": "53395b08c5bd407c7afb0cbc45841441",
        "uploadedAt": "2026-03-24T09:24:14Z"
    },
    {
        "id": "master 20260324 181344 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 181344 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344250/revision-arts/master%2020260324%20181344%20%5BFPS%203x4%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343775/revision-arts/prompt_20260324_181344_%5BFPS_3x4%5D",
        "assetId": "4dd7fa765e1c9d2bcd06fa4b211ec7c6",
        "uploadedAt": "2026-03-24T09:24:10Z"
    },
    {
        "id": "master 20260324 181351 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 181351 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344246/revision-arts/master%2020260324%20181351%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343775/revision-arts/prompt_20260324_181351_%5BFPS_2x3%5D",
        "assetId": "bf873f95ab1795694da84e5ecc7c220f",
        "uploadedAt": "2026-03-24T09:24:06Z"
    },
    {
        "id": "master 20260324 181404 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 181404 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344243/revision-arts/master%2020260324%20181404%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343775/revision-arts/prompt_20260324_181404_%5BFPS_2x3%5D",
        "assetId": "4aff2b1483a2bef14f837b941afaf571",
        "uploadedAt": "2026-03-24T09:24:03Z"
    },
    {
        "id": "master 20260324 181424 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 181424 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344240/revision-arts/master%2020260324%20181424%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343774/revision-arts/prompt_20260324_181424_%5BFPS_4x5%5D",
        "assetId": "d5c565798026ac0803ae2512030d8c4d",
        "uploadedAt": "2026-03-24T09:24:00Z"
    },
    {
        "id": "master 20260324 181429 [FPS 3x2]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 181429 [FPS 3x2]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344237/revision-arts/master%2020260324%20181429%20%5BFPS%203x2%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343774/revision-arts/prompt_20260324_181429_%5BFPS_3x2%5D",
        "assetId": "99a59a8a3f2556c3953bcf8ff2af03a7",
        "uploadedAt": "2026-03-24T09:23:57Z"
    },
    {
        "id": "master 20260324 191738 [FPS 9x16]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 191738 [FPS 9x16]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774350179/revision-arts/master%2020260324%20191738%20%5BFPS%209x16%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349478/revision-arts/prompt_20260324_191738_%5BFPS_9x16%5D",
        "assetId": "5d2c767512c09fbf87f12d766cd9f23e",
        "uploadedAt": "2026-03-24T11:02:59Z"
    },
    {
        "id": "master 20260324 191806 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 191806 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774350175/revision-arts/master%2020260324%20191806%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349478/revision-arts/prompt_20260324_191806_%5BFPS_4x5%5D",
        "assetId": "e5e1d7bf3fa96fb5c91f4a0f78ca5eaf",
        "uploadedAt": "2026-03-24T11:02:55Z"
    },
    {
        "id": "master 20260324 191857 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 191857 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774350172/revision-arts/master%2020260324%20191857%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349478/revision-arts/prompt_20260324_191857_%5BFPS_4x5%5D",
        "assetId": "417027dd477fd0638c1a4a0ff5cc1946",
        "uploadedAt": "2026-03-24T11:02:52Z"
    },
    {
        "id": "master 20260324 191926 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 191926 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774350169/revision-arts/master%2020260324%20191926%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349478/revision-arts/prompt_20260324_191926_%5BFPS_4x5%5D",
        "assetId": "a9c9cf1953b0d0acd7d5014afa41a277",
        "uploadedAt": "2026-03-24T11:02:49Z"
    },
    {
        "id": "master 20260324 192001 [FPS 4x5]",
        "tags": [
            "B&W",
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 192001 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774350166/revision-arts/master%2020260324%20192001%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": null,
        "assetId": "8f47d7d0ee8ed22fe2ea2c44865a1585",
        "uploadedAt": "2026-03-24T11:02:46Z"
    },
    {
        "id": "master 20260324 192007 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 192007 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774350163/revision-arts/master%2020260324%20192007%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349477/revision-arts/prompt_20260324_192007_%5BFPS_4x5%5D",
        "assetId": "e0b24d65ff4575dfcee14503ec31b413",
        "uploadedAt": "2026-03-24T11:02:43Z"
    },
    {
        "id": "master 20260324 192029 [FPS 4x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 192029 [FPS 4x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774350158/revision-arts/master%2020260324%20192029%20%5BFPS%204x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349478/revision-arts/prompt_20260324_192029_%5BFPS_4x3%5D",
        "assetId": "ec760aa20bd682d6a93f4333c4c4cfc2",
        "uploadedAt": "2026-03-24T11:02:38Z"
    },
    {
        "id": "master 20260324 192055 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 192055 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774350155/revision-arts/master%2020260324%20192055%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349476/revision-arts/prompt_20260324_192055_%5BFPS_2x3%5D",
        "assetId": "d52c2c76f64dfa00feea63d20c3f55b1",
        "uploadedAt": "2026-03-24T11:02:35Z"
    },
    {
        "id": "master 20260324 192115 [FPS 4x5]",
        "tags": [
            "B&W",
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 192115 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774350152/revision-arts/master%2020260324%20192115%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": null,
        "assetId": "fc2128f03b4eb92b12d52c8bc4025749",
        "uploadedAt": "2026-03-24T11:02:32Z"
    },
    {
        "id": "master 20260324 192155 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 192155 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774350149/revision-arts/master%2020260324%20192155%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349475/revision-arts/prompt_20260324_192155_%5BFPS_4x5%5D",
        "assetId": "cf11951057033e9614aecefdd80ed482",
        "uploadedAt": "2026-03-24T11:02:29Z"
    },
    {
        "id": "master 20260324 192221 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 192221 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774350146/revision-arts/master%2020260324%20192221%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349475/revision-arts/prompt_20260324_192221_%5BFPS_3x4%5D",
        "assetId": "b77ec6e01e1a1b94b7566fa68d9e63b9",
        "uploadedAt": "2026-03-24T11:02:26Z"
    },
    {
        "id": "master 20260324 192222 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 192222 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774350142/revision-arts/master%2020260324%20192222%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349475/revision-arts/prompt_20260324_192222_%5BFPS_4x5%5D",
        "assetId": "6aea8ce4939fd742f2ceb03644132c9a",
        "uploadedAt": "2026-03-24T11:02:22Z"
    },
    {
        "id": "master 20260324 192247 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 192247 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774350135/revision-arts/master%2020260324%20192247%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349474/revision-arts/prompt_20260324_192247_%5BFPS_2x3%5D",
        "assetId": "3cd93d9178ad074dfbaa2118381450b9",
        "uploadedAt": "2026-03-24T11:02:15Z"
    },
    {
        "id": "master 20260324 192251 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 192251 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774350130/revision-arts/master%2020260324%20192251%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349474/revision-arts/prompt_20260324_192251_%5BFPS_4x5%5D",
        "assetId": "2e26a46149957bae9ba0b83ef7c20666",
        "uploadedAt": "2026-03-24T11:02:10Z"
    },
    {
        "id": "master 20260324 192313 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 192313 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774350126/revision-arts/master%2020260324%20192313%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349474/revision-arts/prompt_20260324_192313_%5BFPS_4x5%5D",
        "assetId": "d54e815c9c68a808895ea441c2276422",
        "uploadedAt": "2026-03-24T11:02:06Z"
    },
    {
        "id": "master 20260324 192345 [FPS 3x4]",
        "tags": [
            "B&W",
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 192345 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774350123/revision-arts/master%2020260324%20192345%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349473/revision-arts/prompt_20260324_192345_%5BFPS_3x4%5D",
        "assetId": "7c4f689afd7644a95ef566675b8d7770",
        "uploadedAt": "2026-03-24T11:02:03Z"
    },
    {
        "id": "master 20260324 192410 [FPS 4x5] (1)",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 192410 [FPS 4x5] (1)",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774350120/revision-arts/master%2020260324%20192410%20%5BFPS%204x5%5D%20%281%29.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349472/revision-arts/prompt_20260324_192410_%5BFPS_4x5%5D%20%281%29",
        "assetId": "54124ff2ee0d7afcf4eafe6f35032040",
        "uploadedAt": "2026-03-24T11:02:00Z"
    },
    {
        "id": "master 20260324 192437 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 192437 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774350117/revision-arts/master%2020260324%20192437%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349472/revision-arts/prompt_20260324_192437_%5BFPS_4x5%5D",
        "assetId": "4bf8864c9bdd2b180850e0415d789078",
        "uploadedAt": "2026-03-24T11:01:57Z"
    },
    {
        "id": "master 20260324 192517 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 192517 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774350114/revision-arts/master%2020260324%20192517%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349470/revision-arts/prompt_20260324_192517_%5BFPS_4x5%5D",
        "assetId": "c1d4ce6c7de6ff16bb37b280842549db",
        "uploadedAt": "2026-03-24T11:01:54Z"
    },
    {
        "id": "master 20260324 192519 [FPS 4x5]",
        "tags": [
            "B&W",
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 192519 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349833/revision-arts/master%2020260324%20192519%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349447/revision-arts/prompt_20260324_192519_%5BFPS_4x5%5D",
        "assetId": "1d86839f2561c35c18b1d23f6b9cdf07",
        "uploadedAt": "2026-03-24T10:57:13Z"
    },
    {
        "id": "master 20260324 192536 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 192536 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774350110/revision-arts/master%2020260324%20192536%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349470/revision-arts/prompt_20260324_192536_%5BFPS_4x5%5D",
        "assetId": "2cff5c139b3462ea71c2455ce6055947",
        "uploadedAt": "2026-03-24T11:01:50Z"
    },
    {
        "id": "master 20260324 192544 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 192544 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349839/revision-arts/master%2020260324%20192544%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349447/revision-arts/prompt_20260324_192544_%5BFPS_4x5%5D",
        "assetId": "41aac556af81715e63eaa336589e23b5",
        "uploadedAt": "2026-03-24T10:57:19Z"
    },
    {
        "id": "master 20260324 192602 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 192602 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774350107/revision-arts/master%2020260324%20192602%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349469/revision-arts/prompt_20260324_192602_%5BFPS_2x3%5D",
        "assetId": "fc7a6eb99a2388ae1ddc3fbd2ab949da",
        "uploadedAt": "2026-03-24T11:01:47Z"
    },
    {
        "id": "master 20260324 192604 [FPS 3x4]",
        "tags": [
            "B&W",
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 192604 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774350104/revision-arts/master%2020260324%20192604%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349469/revision-arts/prompt_20260324_192604_%5BFPS_3x4%5D",
        "assetId": "10ed4a65cba35fffe6ec107afc5921b7",
        "uploadedAt": "2026-03-24T11:01:44Z"
    },
    {
        "id": "master 20260324 192610 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 192610 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349842/revision-arts/master%2020260324%20192610%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349444/revision-arts/prompt_20260324_192610_%5BFPS_3x4%5D",
        "assetId": "ce29f9c0f24d2743f3fd0ef54c1729d6",
        "uploadedAt": "2026-03-24T10:57:22Z"
    },
    {
        "id": "master 20260324 192630 [FPS 1x1]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 192630 [FPS 1x1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774350101/revision-arts/master%2020260324%20192630%20%5BFPS%201x1%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349469/revision-arts/prompt_20260324_192630_%5BFPS_1x1%5D",
        "assetId": "d79c069ba455a55c4d9402dac3d24e38",
        "uploadedAt": "2026-03-24T11:01:41Z"
    },
    {
        "id": "master 20260324 192658 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 192658 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774350076/revision-arts/master%2020260324%20192658%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349468/revision-arts/prompt_20260324_192658_%5BFPS_4x5%5D",
        "assetId": "818151f7112aeda008de0ed6e98fa111",
        "uploadedAt": "2026-03-24T11:01:16Z"
    },
    {
        "id": "master 20260324 192722 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 192722 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774350051/revision-arts/master%2020260324%20192722%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349468/revision-arts/prompt_20260324_192722_%5BFPS_4x5%5D",
        "assetId": "d1e2aa5a153fcf13519c7a423be082c1",
        "uploadedAt": "2026-03-24T11:00:51Z"
    },
    {
        "id": "master 20260324 192723 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 192723 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774350041/revision-arts/master%2020260324%20192723%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349468/revision-arts/prompt_20260324_192723_%5BFPS_2x3%5D",
        "assetId": "6384981a8bc2f4682eb905aa31b42150",
        "uploadedAt": "2026-03-24T11:00:41Z"
    },
    {
        "id": "master 20260324 192733 [FPS 4x5]",
        "tags": [
            "B&W",
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 192733 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349808/revision-arts/master%2020260324%20192733%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349445/revision-arts/prompt_20260324_192733_%5BFPS_4x5%5D",
        "assetId": "7495d7f5b81207f35fbc3c18f1d52a05",
        "uploadedAt": "2026-03-24T10:56:48Z"
    },
    {
        "id": "master 20260324 192749 [FPS 3x4]",
        "tags": [
            "B&W",
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 192749 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774350037/revision-arts/master%2020260324%20192749%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349468/revision-arts/prompt_20260324_192749_%5BFPS_3x4%5D",
        "assetId": "8716feb74866aee3fca48e173d4016f1",
        "uploadedAt": "2026-03-24T11:00:37Z"
    },
    {
        "id": "master 20260324 192751 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 192751 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774350033/revision-arts/master%2020260324%20192751%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349467/revision-arts/prompt_20260324_192751_%5BFPS_4x5%5D",
        "assetId": "9bf917ff4560fe775ae914c6524a4386",
        "uploadedAt": "2026-03-24T11:00:33Z"
    },
    {
        "id": "master 20260324 192800 [FPS 1x1]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 192800 [FPS 1x1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349814/revision-arts/master%2020260324%20192800%20%5BFPS%201x1%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349445/revision-arts/prompt_20260324_192800_%5BFPS_1x1%5D",
        "assetId": "cf40a8046f9a865cc271b468da4c6582",
        "uploadedAt": "2026-03-24T10:56:54Z"
    },
    {
        "id": "master 20260324 192816 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 192816 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774350030/revision-arts/master%2020260324%20192816%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349467/revision-arts/prompt_20260324_192816_%5BFPS_4x5%5D",
        "assetId": "4eee747a5358e856e5dd78929199e90a",
        "uploadedAt": "2026-03-24T11:00:30Z"
    },
    {
        "id": "master 20260324 192818 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 192818 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774350026/revision-arts/master%2020260324%20192818%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349467/revision-arts/prompt_20260324_192818_%5BFPS_4x5%5D",
        "assetId": "603551c98cce9a7e59c1d76828344994",
        "uploadedAt": "2026-03-24T11:00:26Z"
    },
    {
        "id": "master 20260324 192825 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 192825 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349818/revision-arts/master%2020260324%20192825%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349445/revision-arts/prompt_20260324_192825_%5BFPS_4x5%5D",
        "assetId": "f45d7c279a0f1f1902f589cffb048a19",
        "uploadedAt": "2026-03-24T10:56:58Z"
    },
    {
        "id": "master 20260324 192845 [FPS 4x5]",
        "tags": [
            "B&W",
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 192845 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774350023/revision-arts/master%2020260324%20192845%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349467/revision-arts/prompt_20260324_192845_%5BFPS_4x5%5D",
        "assetId": "97e3556778e9aaa920b623bb2756cb6e",
        "uploadedAt": "2026-03-24T11:00:23Z"
    },
    {
        "id": "master 20260324 192846 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 192846 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774350020/revision-arts/master%2020260324%20192846%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349467/revision-arts/prompt_20260324_192846_%5BFPS_4x5%5D",
        "assetId": "24ace2cc0f00db348832d97b2378834d",
        "uploadedAt": "2026-03-24T11:00:20Z"
    },
    {
        "id": "master 20260324 192855 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 192855 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349821/revision-arts/master%2020260324%20192855%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349445/revision-arts/prompt_20260324_192855_%5BFPS_4x5%5D",
        "assetId": "ec4ce6df7bd518876b7c52a2eea1fa34",
        "uploadedAt": "2026-03-24T10:57:01Z"
    },
    {
        "id": "master 20260324 192913 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 192913 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774350016/revision-arts/master%2020260324%20192913%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349466/revision-arts/prompt_20260324_192913_%5BFPS_4x5%5D",
        "assetId": "0670f1211b91eea74e9047b9373a88f5",
        "uploadedAt": "2026-03-24T11:00:16Z"
    },
    {
        "id": "master 20260324 192926 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 192926 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774350013/revision-arts/master%2020260324%20192926%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349466/revision-arts/prompt_20260324_192926_%5BFPS_4x5%5D",
        "assetId": "c248f48edc5f3e1a6aae2d35e482377c",
        "uploadedAt": "2026-03-24T11:00:13Z"
    },
    {
        "id": "master 20260324 192939 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 192939 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774350009/revision-arts/master%2020260324%20192939%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349466/revision-arts/prompt_20260324_192939_%5BFPS_4x5%5D",
        "assetId": "16fa8db623b582a0fd3c8986ce629f7a",
        "uploadedAt": "2026-03-24T11:00:09Z"
    },
    {
        "id": "master 20260324 192949 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 192949 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349826/revision-arts/master%2020260324%20192949%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349446/revision-arts/prompt_20260324_192949_%5BFPS_4x5%5D",
        "assetId": "854e56b905d192236721f429ec5d6ba2",
        "uploadedAt": "2026-03-24T10:57:06Z"
    },
    {
        "id": "master 20260324 192954 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 192954 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774350006/revision-arts/master%2020260324%20192954%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349466/revision-arts/prompt_20260324_192954_%5BFPS_3x4%5D",
        "assetId": "f4c84dc633a0a97aa15330907b7cbb56",
        "uploadedAt": "2026-03-24T11:00:06Z"
    },
    {
        "id": "master 20260324 193008 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 193008 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774350003/revision-arts/master%2020260324%20193008%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349466/revision-arts/prompt_20260324_193008_%5BFPS_4x5%5D",
        "assetId": "c7de9f7f64fc5f571ed634ddf5f83a35",
        "uploadedAt": "2026-03-24T11:00:03Z"
    },
    {
        "id": "master 20260324 193014 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 193014 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349830/revision-arts/master%2020260324%20193014%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349446/revision-arts/prompt_20260324_193014_%5BFPS_4x5%5D",
        "assetId": "fd92dd4ee2d540176ab257996dd1e217",
        "uploadedAt": "2026-03-24T10:57:10Z"
    },
    {
        "id": "master 20260324 193035 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 193035 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349999/revision-arts/master%2020260324%20193035%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349465/revision-arts/prompt_20260324_193035_%5BFPS_3x4%5D",
        "assetId": "67df7639a003bab6b4a8c9834a4c0cb3",
        "uploadedAt": "2026-03-24T10:59:59Z"
    },
    {
        "id": "master 20260324 193041 [FPS 4x5]",
        "tags": [
            "B&W",
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 193041 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349771/revision-arts/master%2020260324%20193041%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349446/revision-arts/prompt_20260324_193041_%5BFPS_4x5%5D",
        "assetId": "e0108d5356d1785f6fb44d2dc26b35b2",
        "uploadedAt": "2026-03-24T10:56:11Z"
    },
    {
        "id": "master 20260324 193106 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 193106 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349996/revision-arts/master%2020260324%20193106%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349465/revision-arts/prompt_20260324_193106_%5BFPS_4x5%5D",
        "assetId": "9d591c670a7f67e6fa379cb20fcab153",
        "uploadedAt": "2026-03-24T10:59:56Z"
    },
    {
        "id": "master 20260324 193133 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 193133 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349993/revision-arts/master%2020260324%20193133%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349464/revision-arts/prompt_20260324_193133_%5BFPS_4x5%5D",
        "assetId": "441dcd3afe1bbb6b89ce1644ce204efa",
        "uploadedAt": "2026-03-24T10:59:53Z"
    },
    {
        "id": "master 20260324 193136 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 193136 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349774/revision-arts/master%2020260324%20193136%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349440/revision-arts/prompt_20260324_193136_%5BFPS_3x4%5D",
        "assetId": "e48a4e1771a356c6cf6b48fafa996326",
        "uploadedAt": "2026-03-24T10:56:14Z"
    },
    {
        "id": "master 20260324 193200 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 193200 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349778/revision-arts/master%2020260324%20193200%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349439/revision-arts/prompt_20260324_193200_%5BFPS_4x5%5D",
        "assetId": "e6f98ab7796e089ea3d81cb1a4222add",
        "uploadedAt": "2026-03-24T10:56:18Z"
    },
    {
        "id": "master 20260324 193222 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 193222 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349990/revision-arts/master%2020260324%20193222%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349464/revision-arts/prompt_20260324_193222_%5BFPS_4x5%5D",
        "assetId": "575fd0705098f73c7a567902c6c858b1",
        "uploadedAt": "2026-03-24T10:59:50Z"
    },
    {
        "id": "master 20260324 193226 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 193226 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349987/revision-arts/master%2020260324%20193226%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349464/revision-arts/prompt_20260324_193226_%5BFPS_3x4%5D",
        "assetId": "72b9a1d9d0da17b5045de03c690bfffb",
        "uploadedAt": "2026-03-24T10:59:47Z"
    },
    {
        "id": "master 20260324 193227 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 193227 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349781/revision-arts/master%2020260324%20193227%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349443/revision-arts/prompt_20260324_193227_%5BFPS_3x4%5D",
        "assetId": "d6c0ffc9859dc852896f53016295fd85",
        "uploadedAt": "2026-03-24T10:56:21Z"
    },
    {
        "id": "master 20260324 193246 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 193246 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349983/revision-arts/master%2020260324%20193246%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349463/revision-arts/prompt_20260324_193246_%5BFPS_2x3%5D",
        "assetId": "fa6b6a36b5b2bb09fc9642240e6ef615",
        "uploadedAt": "2026-03-24T10:59:43Z"
    },
    {
        "id": "master 20260324 193253 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 193253 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349784/revision-arts/master%2020260324%20193253%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349443/revision-arts/prompt_20260324_193253_%5BFPS_3x4%5D",
        "assetId": "79fe4eb6f230b067911390b4dd9038e2",
        "uploadedAt": "2026-03-24T10:56:24Z"
    },
    {
        "id": "master 20260324 193339 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 193339 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349980/revision-arts/master%2020260324%20193339%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349463/revision-arts/prompt_20260324_193339_%5BFPS_4x5%5D",
        "assetId": "0c37d7a7fe3765d6e75186b03406b334",
        "uploadedAt": "2026-03-24T10:59:40Z"
    },
    {
        "id": "master 20260324 193348 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 193348 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349787/revision-arts/master%2020260324%20193348%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349443/revision-arts/prompt_20260324_193348_%5BFPS_4x5%5D",
        "assetId": "33ddb1cce71f36dca04fcd4c612fe958",
        "uploadedAt": "2026-03-24T10:56:27Z"
    },
    {
        "id": "master 20260324 193406 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 193406 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349976/revision-arts/master%2020260324%20193406%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349461/revision-arts/prompt_20260324_193406_%5BFPS_3x4%5D",
        "assetId": "d61545c2fc7db8b90ad5ae1b9d93e7ea",
        "uploadedAt": "2026-03-24T10:59:36Z"
    },
    {
        "id": "master 20260324 193413 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 193413 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349790/revision-arts/master%2020260324%20193413%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349443/revision-arts/prompt_20260324_193413_%5BFPS_3x4%5D",
        "assetId": "6b6af9bc3ccb4278f1666a0ae838c993",
        "uploadedAt": "2026-03-24T10:56:30Z"
    },
    {
        "id": "master 20260324 193428 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 193428 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349972/revision-arts/master%2020260324%20193428%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349461/revision-arts/prompt_20260324_193428_%5BFPS_4x5%5D",
        "assetId": "b6decc215dc0a1093c9de2c7ab274888",
        "uploadedAt": "2026-03-24T10:59:32Z"
    },
    {
        "id": "master 20260324 193432 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 193432 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349969/revision-arts/master%2020260324%20193432%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349461/revision-arts/prompt_20260324_193432_%5BFPS_2x3%5D",
        "assetId": "ba3e3bc7d08d5f9acf7d99b4faff999a",
        "uploadedAt": "2026-03-24T10:59:29Z"
    },
    {
        "id": "master 20260324 193440 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 193440 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349794/revision-arts/master%2020260324%20193440%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349444/revision-arts/prompt_20260324_193440_%5BFPS_3x4%5D",
        "assetId": "4f2280f8661a6e0ab9722fb71f95ecbe",
        "uploadedAt": "2026-03-24T10:56:34Z"
    },
    {
        "id": "master 20260324 193452 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 193452 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349965/revision-arts/master%2020260324%20193452%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349461/revision-arts/prompt_20260324_193452_%5BFPS_4x5%5D",
        "assetId": "1799e8206d13c6fbb51bd9e65a7a643f",
        "uploadedAt": "2026-03-24T10:59:25Z"
    },
    {
        "id": "master 20260324 193501 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 193501 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349962/revision-arts/master%2020260324%20193501%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349459/revision-arts/prompt_20260324_193501_%5BFPS_4x5%5D",
        "assetId": "2b2eaf52b8e69823775e33ec899da824",
        "uploadedAt": "2026-03-24T10:59:22Z"
    },
    {
        "id": "master 20260324 193507 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 193507 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349797/revision-arts/master%2020260324%20193507%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349444/revision-arts/prompt_20260324_193507_%5BFPS_4x5%5D",
        "assetId": "9884fe35159773636cafb86d2e52ae70",
        "uploadedAt": "2026-03-24T10:56:37Z"
    },
    {
        "id": "master 20260324 193517 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 193517 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349959/revision-arts/master%2020260324%20193517%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349459/revision-arts/prompt_20260324_193517_%5BFPS_4x5%5D",
        "assetId": "d9370ed07ea3dc6dd1e2da8842ea39dd",
        "uploadedAt": "2026-03-24T10:59:19Z"
    },
    {
        "id": "master 20260324 193528 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 193528 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349955/revision-arts/master%2020260324%20193528%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349459/revision-arts/prompt_20260324_193528_%5BFPS_2x3%5D",
        "assetId": "710270b874fe61ccca3040b2d2cb00af",
        "uploadedAt": "2026-03-24T10:59:15Z"
    },
    {
        "id": "master 20260324 193536 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 193536 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349801/revision-arts/master%2020260324%20193536%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349444/revision-arts/prompt_20260324_193536_%5BFPS_4x5%5D",
        "assetId": "f413673397a8a9d7a9f68d280fe27624",
        "uploadedAt": "2026-03-24T10:56:41Z"
    },
    {
        "id": "master 20260324 193557 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 193557 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349952/revision-arts/master%2020260324%20193557%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349459/revision-arts/prompt_20260324_193557_%5BFPS_4x5%5D",
        "assetId": "def5eb831504cf7a9fd9d87218365730",
        "uploadedAt": "2026-03-24T10:59:12Z"
    },
    {
        "id": "master 20260324 193604 [FPS 4x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 193604 [FPS 4x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349805/revision-arts/master%2020260324%20193604%20%5BFPS%204x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": null,
        "assetId": "81401a6c21737c825c62423b8933fa89",
        "uploadedAt": "2026-03-24T10:56:45Z"
    },
    {
        "id": "master 20260324 193617 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 193617 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349949/revision-arts/master%2020260324%20193617%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349458/revision-arts/prompt_20260324_193617_%5BFPS_4x5%5D",
        "assetId": "0560a438ccae4e387941c164fb39469d",
        "uploadedAt": "2026-03-24T10:59:09Z"
    },
    {
        "id": "master 20260324 193622 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 193622 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349946/revision-arts/master%2020260324%20193622%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349458/revision-arts/prompt_20260324_193622_%5BFPS_4x5%5D",
        "assetId": "d9d2cb3d758e5c4a76863e8fe1c5d24e",
        "uploadedAt": "2026-03-24T10:59:06Z"
    },
    {
        "id": "master 20260324 193644 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 193644 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349943/revision-arts/master%2020260324%20193644%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349458/revision-arts/prompt_20260324_193644_%5BFPS_4x5%5D",
        "assetId": "e052f61ebf59c57d1be50877237b8d54",
        "uploadedAt": "2026-03-24T10:59:03Z"
    },
    {
        "id": "master 20260324 193651 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 193651 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349939/revision-arts/master%2020260324%20193651%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349458/revision-arts/prompt_20260324_193651_%5BFPS_4x5%5D",
        "assetId": "e0e08c4d815fd5494c83dd4f793ac565",
        "uploadedAt": "2026-03-24T10:58:59Z"
    },
    {
        "id": "master 20260324 193709 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 193709 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349936/revision-arts/master%2020260324%20193709%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349458/revision-arts/prompt_20260324_193709_%5BFPS_3x4%5D",
        "assetId": "a18078d9823974e3c12d95c29a13a516",
        "uploadedAt": "2026-03-24T10:58:56Z"
    },
    {
        "id": "master 20260324 193716 [FPS 4x5]",
        "tags": [
            "B&W",
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 193716 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349933/revision-arts/master%2020260324%20193716%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349457/revision-arts/prompt_20260324_193716_%5BFPS_4x5%5D",
        "assetId": "7ae3de030121ebd22a6fb585909feb3b",
        "uploadedAt": "2026-03-24T10:58:53Z"
    },
    {
        "id": "master 20260324 193735 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 193735 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349930/revision-arts/master%2020260324%20193735%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349457/revision-arts/prompt_20260324_193735_%5BFPS_3x4%5D",
        "assetId": "d2e33263a3d84e004fc6f210b57dff62",
        "uploadedAt": "2026-03-24T10:58:50Z"
    },
    {
        "id": "master 20260324 193743 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 193743 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349926/revision-arts/master%2020260324%20193743%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349457/revision-arts/prompt_20260324_193743_%5BFPS_3x4%5D",
        "assetId": "20cc2f967aa16899b61e5f79ea58e1f5",
        "uploadedAt": "2026-03-24T10:58:46Z"
    },
    {
        "id": "master 20260324 193804 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 193804 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349923/revision-arts/master%2020260324%20193804%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349457/revision-arts/prompt_20260324_193804_%5BFPS_3x4%5D",
        "assetId": "0a8e63e83823c698600440b9f8ac620b",
        "uploadedAt": "2026-03-24T10:58:43Z"
    },
    {
        "id": "master 20260324 193810 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 193810 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349919/revision-arts/master%2020260324%20193810%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349457/revision-arts/prompt_20260324_193810_%5BFPS_4x5%5D",
        "assetId": "16dde4cdab2f29df17e09a5f5fa3b68e",
        "uploadedAt": "2026-03-24T10:58:39Z"
    },
    {
        "id": "master 20260324 193829 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 193829 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349916/revision-arts/master%2020260324%20193829%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349456/revision-arts/prompt_20260324_193829_%5BFPS_4x5%5D",
        "assetId": "7db9788a7a43cb217e7fb2aae1cd7ab6",
        "uploadedAt": "2026-03-24T10:58:36Z"
    },
    {
        "id": "master 20260324 193837 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 193837 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349912/revision-arts/master%2020260324%20193837%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349456/revision-arts/prompt_20260324_193837_%5BFPS_4x5%5D",
        "assetId": "0e646d8d43211edb71504c2904254bd7",
        "uploadedAt": "2026-03-24T10:58:32Z"
    },
    {
        "id": "master 20260324 193853 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 193853 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349909/revision-arts/master%2020260324%20193853%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349456/revision-arts/prompt_20260324_193853_%5BFPS_4x5%5D",
        "assetId": "b2c784a139481e83eda2734506149897",
        "uploadedAt": "2026-03-24T10:58:29Z"
    },
    {
        "id": "master 20260324 193923 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 193923 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349906/revision-arts/master%2020260324%20193923%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349456/revision-arts/prompt_20260324_193923_%5BFPS_4x5%5D",
        "assetId": "e51593126cb95a276e7268f4cce6050f",
        "uploadedAt": "2026-03-24T10:58:26Z"
    },
    {
        "id": "master 20260324 193952 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 193952 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349902/revision-arts/master%2020260324%20193952%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349455/revision-arts/prompt_20260324_193952_%5BFPS_4x5%5D",
        "assetId": "d2a0d47abe08b9085ea360f47b73df53",
        "uploadedAt": "2026-03-24T10:58:22Z"
    },
    {
        "id": "master 20260324 194002 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 194002 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349899/revision-arts/master%2020260324%20194002%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349455/revision-arts/prompt_20260324_194002_%5BFPS_2x3%5D",
        "assetId": "92728d18ba09c972ed6b9e671b1b0930",
        "uploadedAt": "2026-03-24T10:58:19Z"
    },
    {
        "id": "master 20260324 194018 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 194018 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349896/revision-arts/master%2020260324%20194018%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349455/revision-arts/prompt_20260324_194018_%5BFPS_4x5%5D",
        "assetId": "4810866f82e57ef372979fc04ff88859",
        "uploadedAt": "2026-03-24T10:58:16Z"
    },
    {
        "id": "master 20260324 194051 [FPS 4x5]",
        "tags": [
            "B&W",
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 194051 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349890/revision-arts/master%2020260324%20194051%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349455/revision-arts/prompt_20260324_194051_%5BFPS_4x5%5D",
        "assetId": "a681a448378ead638b0f1a17f21845b7",
        "uploadedAt": "2026-03-24T10:58:10Z"
    },
    {
        "id": "master 20260324 194115 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 194115 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349886/revision-arts/master%2020260324%20194115%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349453/revision-arts/prompt_20260324_194115_%5BFPS_3x4%5D",
        "assetId": "6286f4dd343100ac0ebe7f4ace11c0d8",
        "uploadedAt": "2026-03-24T10:58:06Z"
    },
    {
        "id": "master 20260324 194120 [FPS 4x5]",
        "tags": [
            "B&W",
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 194120 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349883/revision-arts/master%2020260324%20194120%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349453/revision-arts/prompt_20260324_194120_%5BFPS_4x5%5D",
        "assetId": "1ceda5c6892e795478cbc45f52c188e6",
        "uploadedAt": "2026-03-24T10:58:03Z"
    },
    {
        "id": "master 20260324 194140 [FPS 4x5]",
        "tags": [
            "B&W",
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 194140 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349880/revision-arts/master%2020260324%20194140%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349453/revision-arts/prompt_20260324_194140_%5BFPS_4x5%5D",
        "assetId": "2279c5dd7571cea425953045ff154835",
        "uploadedAt": "2026-03-24T10:58:00Z"
    },
    {
        "id": "master 20260324 194144 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 194144 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349876/revision-arts/master%2020260324%20194144%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349453/revision-arts/prompt_20260324_194144_%5BFPS_4x5%5D",
        "assetId": "e8e620a120c0d6c9be7d2f74461510e5",
        "uploadedAt": "2026-03-24T10:57:56Z"
    },
    {
        "id": "master 20260324 194206 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 194206 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349873/revision-arts/master%2020260324%20194206%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349453/revision-arts/prompt_20260324_194206_%5BFPS_3x4%5D",
        "assetId": "ea5ddd1bf566a6c71dfc8332769b0de0",
        "uploadedAt": "2026-03-24T10:57:53Z"
    },
    {
        "id": "master 20260324 194211 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 194211 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349869/revision-arts/master%2020260324%20194211%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349448/revision-arts/prompt_20260324_194211_%5BFPS_4x5%5D",
        "assetId": "4d6fbada1c84502b351f8f6b7b80cf94",
        "uploadedAt": "2026-03-24T10:57:49Z"
    },
    {
        "id": "master 20260324 194234 [FPS 4x5] (1)",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 194234 [FPS 4x5] (1)",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349865/revision-arts/master%2020260324%20194234%20%5BFPS%204x5%5D%20%281%29.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349449/revision-arts/prompt_20260324_194234_%5BFPS_4x5%5D%20%281%29",
        "assetId": "1f6b80f929664180df9c2ae0f554a7a5",
        "uploadedAt": "2026-03-24T10:57:45Z"
    },
    {
        "id": "master 20260324 194305 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 194305 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349860/revision-arts/master%2020260324%20194305%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349448/revision-arts/prompt_20260324_194305_%5BFPS_4x5%5D",
        "assetId": "9d19ff0d973eff9185a793c865f29e1b",
        "uploadedAt": "2026-03-24T10:57:40Z"
    },
    {
        "id": "master 20260324 194425 [FPS 4x5]",
        "tags": [
            "B&W",
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 194425 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349856/revision-arts/master%2020260324%20194425%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349448/revision-arts/prompt_20260324_194425_%5BFPS_4x5%5D",
        "assetId": "b028bae5e75b964939ee5658f7657c39",
        "uploadedAt": "2026-03-24T10:57:36Z"
    },
    {
        "id": "master 20260324 194455 [FPS 3x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 194455 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349852/revision-arts/master%2020260324%20194455%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349447/revision-arts/prompt_20260324_194455_%5BFPS_3x4%5D",
        "assetId": "1903b0f818d6563657cd8ff8bde24d90",
        "uploadedAt": "2026-03-24T10:57:32Z"
    },
    {
        "id": "master 20260324 194523 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 194523 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349847/revision-arts/master%2020260324%20194523%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349447/revision-arts/prompt_20260324_194523_%5BFPS_4x5%5D",
        "assetId": "0652cad47c202726e791f0406a4d2aac",
        "uploadedAt": "2026-03-24T10:57:27Z"
    },
    {
        "id": "master 20260324 194551 [FPS 4x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 194551 [FPS 4x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349767/revision-arts/master%2020260324%20194551%20%5BFPS%204x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349439/revision-arts/prompt_20260324_194551_%5BFPS_4x3%5D",
        "assetId": "12923b98fa8694e66120bd51cf26e3b6",
        "uploadedAt": "2026-03-24T10:56:07Z"
    },
    {
        "id": "master 20260324 194733 [FPS 9x16]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 194733 [FPS 9x16]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349764/revision-arts/master%2020260324%20194733%20%5BFPS%209x16%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349440/revision-arts/prompt_20260324_194733_%5BFPS_9x16%5D",
        "assetId": "aae6a778ccbec921c83a3e67e0617120",
        "uploadedAt": "2026-03-24T10:56:04Z"
    },
    {
        "id": "master 20260324 194804 [FPS 4x5]",
        "tags": [
            "B&W",
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 194804 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774349761/revision-arts/master%2020260324%20194804%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774349439/revision-arts/prompt_20260324_194804_%5BFPS_4x5%5D",
        "assetId": "8404f63c95461a38bf252c4aff9b842c",
        "uploadedAt": "2026-03-24T10:56:01Z"
    },
    {
        "id": "master 20260324 200500 [FPS 4x5]",
        "tags": [
            "nostalgia",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 200500 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774351454/revision-arts/master%2020260324%20200500%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774351322/revision-arts/prompt_20260324_200500_%5BFPS_4x5%5D",
        "assetId": "00bb0c0a7a346bd1178eb0ed95a486e6",
        "uploadedAt": "2026-03-24T11:24:14Z"
    },
    {
        "id": "master 20260324 200556 [FPS 4x5]",
        "tags": [
            "nostalgia",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 200556 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774351451/revision-arts/master%2020260324%20200556%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774351322/revision-arts/prompt_20260324_200556_%5BFPS_4x5%5D",
        "assetId": "61fbc1290d0253361e7ea7cba3382291",
        "uploadedAt": "2026-03-24T11:24:11Z"
    },
    {
        "id": "master 20260324 200608 [FPS 4x5]",
        "tags": [
            "nostalgia",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 200608 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774351448/revision-arts/master%2020260324%20200608%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774351320/revision-arts/prompt_20260324_200608_%5BFPS_4x5%5D",
        "assetId": "c3b8ec7f64567cd1781fd182ff06092f",
        "uploadedAt": "2026-03-24T11:24:08Z"
    },
    {
        "id": "master 20260324 200626 [FPS 4x5]",
        "tags": [
            "nostalgia",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 200626 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774351445/revision-arts/master%2020260324%20200626%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774351320/revision-arts/prompt_20260324_200626_%5BFPS_4x5%5D",
        "assetId": "3a25961457ebdcf7e82aa4c300c11b13",
        "uploadedAt": "2026-03-24T11:24:05Z"
    },
    {
        "id": "master 20260324 200638 [FPS 4x5]",
        "tags": [
            "nostalgia",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 200638 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774351442/revision-arts/master%2020260324%20200638%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774351320/revision-arts/prompt_20260324_200638_%5BFPS_4x5%5D",
        "assetId": "5ffd62ede9b6fe034ce748f9f0edde96",
        "uploadedAt": "2026-03-24T11:24:02Z"
    },
    {
        "id": "master 20260324 200658 [FPS 4x5]",
        "tags": [
            "nostalgia",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 200658 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774351439/revision-arts/master%2020260324%20200658%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774351316/revision-arts/prompt_20260324_200658_%5BFPS_4x5%5D",
        "assetId": "ff0e9ffab8a1009172fb5606dccd9ce7",
        "uploadedAt": "2026-03-24T11:23:59Z"
    },
    {
        "id": "master 20260324 200709 [FPS 4x5]",
        "tags": [
            "nostalgia",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 200709 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774351436/revision-arts/master%2020260324%20200709%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774351316/revision-arts/prompt_20260324_200709_%5BFPS_4x5%5D",
        "assetId": "590b53b6e3eb0f0eb70b81931177baae",
        "uploadedAt": "2026-03-24T11:23:56Z"
    },
    {
        "id": "master 20260324 200724 [FPS 4x5]",
        "tags": [
            "nostalgia",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 200724 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774351433/revision-arts/master%2020260324%20200724%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774351316/revision-arts/prompt_20260324_200724_%5BFPS_4x5%5D",
        "assetId": "69de48f41b9935a0ed27ec7ecc20f186",
        "uploadedAt": "2026-03-24T11:23:53Z"
    },
    {
        "id": "master 20260324 200732 [FPS 4x5]",
        "tags": [
            "nostalgia",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 200732 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774351431/revision-arts/master%2020260324%20200732%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774351316/revision-arts/prompt_20260324_200732_%5BFPS_4x5%5D",
        "assetId": "3fecca9231672ac998bc0d3b4294a1ca",
        "uploadedAt": "2026-03-24T11:23:51Z"
    },
    {
        "id": "master 20260324 200739 [FPS 4x5]",
        "tags": [
            "nostalgia",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 200739 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774351428/revision-arts/master%2020260324%20200739%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774351315/revision-arts/prompt_20260324_200739_%5BFPS_4x5%5D",
        "assetId": "79e3f7b62a0eefa6f5743ebcac5371af",
        "uploadedAt": "2026-03-24T11:23:48Z"
    },
    {
        "id": "master 20260324 200804 [FPS 4x5]",
        "tags": [
            "nostalgia",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 200804 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774351425/revision-arts/master%2020260324%20200804%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774351315/revision-arts/prompt_20260324_200804_%5BFPS_4x5%5D",
        "assetId": "76ad14afde4d50b74caf6158f9601b94",
        "uploadedAt": "2026-03-24T11:23:45Z"
    },
    {
        "id": "master 20260324 200839 [FPS 5x4]",
        "tags": [
            "nostalgia",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 200839 [FPS 5x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774351422/revision-arts/master%2020260324%20200839%20%5BFPS%205x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774351315/revision-arts/prompt_20260324_200839_%5BFPS_5x4%5D",
        "assetId": "59a8f4de5c2bfdcae1c5ebb2e4b42dba",
        "uploadedAt": "2026-03-24T11:23:42Z"
    },
    {
        "id": "master 20260324 200942 [FPS 3x4]",
        "tags": [
            "nostalgia",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 200942 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774351419/revision-arts/master%2020260324%20200942%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774351314/revision-arts/prompt_20260324_200942_%5BFPS_3x4%5D",
        "assetId": "b23bb93f7f045fe5fe345a0eff67b954",
        "uploadedAt": "2026-03-24T11:23:39Z"
    },
    {
        "id": "master 20260324 201028 [FPS 9x16]",
        "tags": [
            "nostalgia",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 201028 [FPS 9x16]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774351416/revision-arts/master%2020260324%20201028%20%5BFPS%209x16%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774351314/revision-arts/prompt_20260324_201028_%5BFPS_9x16%5D",
        "assetId": "f964df070a3a346b8258304f79a8643b",
        "uploadedAt": "2026-03-24T11:23:36Z"
    },
    {
        "id": "master 20260324 201059 [FPS 3x4]",
        "tags": [
            "nostalgia",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 201059 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774351412/revision-arts/master%2020260324%20201059%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774351314/revision-arts/prompt_20260324_201059_%5BFPS_3x4%5D",
        "assetId": "f8496df31394124cbec45af664a9786e",
        "uploadedAt": "2026-03-24T11:23:32Z"
    },
    {
        "id": "master 20260324 201238 [FPS 4x5]",
        "tags": [
            "nostalgia",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 201238 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774351408/revision-arts/master%2020260324%20201238%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774351314/revision-arts/prompt_20260324_201238_%5BFPS_4x5%5D",
        "assetId": "2ff60aa956be265b7cf8e99eb773e2e2",
        "uploadedAt": "2026-03-24T11:23:28Z"
    },
    {
        "id": "master 20260324 203421 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 203421 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355077/revision-arts/master%2020260324%20203421%20%5BFPS%202x3%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354443/revision-arts/prompt_20260324_203421_%5BFPS_2x3%5D",
        "assetId": "fa626bdb5f0d1c33ffe57085c506e5bd",
        "uploadedAt": "2026-03-24T12:24:37Z"
    },
    {
        "id": "master 20260324 203714 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 203714 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355056/revision-arts/master%2020260324%20203714%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354443/revision-arts/prompt_20260324_203714_%5BFPS_4x5%5D",
        "assetId": "e1a68f8411b75b326479457c266a0d74",
        "uploadedAt": "2026-03-24T12:24:16Z"
    },
    {
        "id": "master 20260324 203725 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 203725 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355035/revision-arts/master%2020260324%20203725%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354443/revision-arts/prompt_20260324_203725_%5BFPS_4x5%5D",
        "assetId": "11126aafe92765d6932985b0427b594a",
        "uploadedAt": "2026-03-24T12:23:55Z"
    },
    {
        "id": "master 20260324 203826 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 203826 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355013/revision-arts/master%2020260324%20203826%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354442/revision-arts/prompt_20260324_203826_%5BFPS_4x5%5D",
        "assetId": "809530bb91fcdd3206b93ef036c8f665",
        "uploadedAt": "2026-03-24T12:23:33Z"
    },
    {
        "id": "master 20260324 203859 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 203859 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774354992/revision-arts/master%2020260324%20203859%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354442/revision-arts/prompt_20260324_203859_%5BFPS_4x5%5D",
        "assetId": "2cae16c69457755858e878c1a6a0b56b",
        "uploadedAt": "2026-03-24T12:23:12Z"
    },
    {
        "id": "master 20260324 203932 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 203932 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774354976/revision-arts/master%2020260324%20203932%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354442/revision-arts/prompt_20260324_203932_%5BFPS_4x5%5D",
        "assetId": "bb6cd62b573fe0276fd9e8288833b458",
        "uploadedAt": "2026-03-24T12:22:56Z"
    },
    {
        "id": "master 20260324 204021 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 204021 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774354971/revision-arts/master%2020260324%20204021%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354441/revision-arts/prompt_20260324_204021_%5BFPS_4x5%5D",
        "assetId": "86b68cf31ade330b1d5a6318cf3b755f",
        "uploadedAt": "2026-03-24T12:22:51Z"
    },
    {
        "id": "master 20260324 204121 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 204121 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774354966/revision-arts/master%2020260324%20204121%20%5BFPS%202x3%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354441/revision-arts/prompt_20260324_204121_%5BFPS_2x3%5D",
        "assetId": "832da43b9ee433d286cf22b7c97a2418",
        "uploadedAt": "2026-03-24T12:22:46Z"
    },
    {
        "id": "master 20260324 204126 [FPS 1x1]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 204126 [FPS 1x1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774354961/revision-arts/master%2020260324%20204126%20%5BFPS%201x1%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354441/revision-arts/prompt_20260324_204126_%5BFPS_1x1%5D",
        "assetId": "a7bd9a138e6db08c53755cdb1aa1e668",
        "uploadedAt": "2026-03-24T12:22:41Z"
    },
    {
        "id": "master 20260324 204156 [FPS 1x1]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 204156 [FPS 1x1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774354957/revision-arts/master%2020260324%20204156%20%5BFPS%201x1%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354440/revision-arts/prompt_20260324_204156_%5BFPS_1x1%5D",
        "assetId": "c9c605c44646f6b9c5591a3894c94a28",
        "uploadedAt": "2026-03-24T12:22:37Z"
    },
    {
        "id": "master 20260324 204227 [FPS 1x1]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 204227 [FPS 1x1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774354952/revision-arts/master%2020260324%20204227%20%5BFPS%201x1%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354440/revision-arts/prompt_20260324_204227_%5BFPS_1x1%5D",
        "assetId": "6d7b3352240bfbe0112ee385b217921d",
        "uploadedAt": "2026-03-24T12:22:32Z"
    },
    {
        "id": "master 20260324 204311 [FPS 9x16]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 204311 [FPS 9x16]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774354947/revision-arts/master%2020260324%20204311%20%5BFPS%209x16%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354440/revision-arts/prompt_20260324_204311_%5BFPS_9x16%5D",
        "assetId": "d11dfac31147f603a27c56f210e92921",
        "uploadedAt": "2026-03-24T12:22:27Z"
    },
    {
        "id": "master 20260324 204324 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 204324 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774354943/revision-arts/master%2020260324%20204324%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354440/revision-arts/prompt_20260324_204324_%5BFPS_4x5%5D",
        "assetId": "0c449529f3d5a7b8356cee09919af5ef",
        "uploadedAt": "2026-03-24T12:22:23Z"
    },
    {
        "id": "master 20260324 204343 [FPS 1x1]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 204343 [FPS 1x1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774354939/revision-arts/master%2020260324%20204343%20%5BFPS%201x1%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354439/revision-arts/prompt_20260324_204343_%5BFPS_1x1%5D",
        "assetId": "1b0c6639d67b9d70e8a7e975c368f540",
        "uploadedAt": "2026-03-24T12:22:19Z"
    },
    {
        "id": "master 20260324 204400 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 204400 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774354935/revision-arts/master%2020260324%20204400%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354439/revision-arts/prompt_20260324_204400_%5BFPS_4x5%5D",
        "assetId": "ccc24aea3f6534ef0b953db6d9bbd3bf",
        "uploadedAt": "2026-03-24T12:22:15Z"
    },
    {
        "id": "master 20260324 204432 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 204432 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774354932/revision-arts/master%2020260324%20204432%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354439/revision-arts/prompt_20260324_204432_%5BFPS_4x5%5D",
        "assetId": "c42fb7543a2e33c8965692d4669e9faf",
        "uploadedAt": "2026-03-24T12:22:12Z"
    },
    {
        "id": "master 20260324 204503 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 204503 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774354927/revision-arts/master%2020260324%20204503%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354438/revision-arts/prompt_20260324_204503_%5BFPS_4x5%5D",
        "assetId": "bb83fa242f64c8fa718e3f80de53c407",
        "uploadedAt": "2026-03-24T12:22:07Z"
    },
    {
        "id": "master 20260324 204541 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 204541 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774354922/revision-arts/master%2020260324%20204541%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354438/revision-arts/prompt_20260324_204541_%5BFPS_4x5%5D",
        "assetId": "16722df87926cba61613a45bdd2dc0ff",
        "uploadedAt": "2026-03-24T12:22:02Z"
    },
    {
        "id": "master 20260324 204606 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 204606 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774354918/revision-arts/master%2020260324%20204606%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354437/revision-arts/prompt_20260324_204606_%5BFPS_4x5%5D",
        "assetId": "6255f66f6388ff4df002d915a580e635",
        "uploadedAt": "2026-03-24T12:21:58Z"
    },
    {
        "id": "master 20260324 204614 [FPS 1x1]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 204614 [FPS 1x1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774354913/revision-arts/master%2020260324%20204614%20%5BFPS%201x1%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354437/revision-arts/prompt_20260324_204614_%5BFPS_1x1%5D",
        "assetId": "26d10d9f642868b018e852f3fe4f4c7c",
        "uploadedAt": "2026-03-24T12:21:53Z"
    },
    {
        "id": "master 20260324 204637 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 204637 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774354908/revision-arts/master%2020260324%20204637%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354437/revision-arts/prompt_20260324_204637_%5BFPS_2x3%5D",
        "assetId": "2799c2e0ba1d4308cb32a882264708b6",
        "uploadedAt": "2026-03-24T12:21:48Z"
    },
    {
        "id": "master 20260324 204705 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 204705 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774354905/revision-arts/master%2020260324%20204705%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354435/revision-arts/prompt_20260324_204705_%5BFPS_2x3%5D",
        "assetId": "f5a887130ac51b41fc78cd475e580d3a",
        "uploadedAt": "2026-03-24T12:21:45Z"
    },
    {
        "id": "master 20260324 204711 [FPS 1x1]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 204711 [FPS 1x1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774354902/revision-arts/master%2020260324%20204711%20%5BFPS%201x1%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354435/revision-arts/prompt_20260324_204711_%5BFPS_1x1%5D",
        "assetId": "08655fa84887b7a88c7f7d43886404b4",
        "uploadedAt": "2026-03-24T12:21:42Z"
    },
    {
        "id": "master 20260324 204743 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 204743 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774354898/revision-arts/master%2020260324%20204743%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354435/revision-arts/prompt_20260324_204743_%5BFPS_4x5%5D",
        "assetId": "870f70c1d2e48e98adca2f8755fe5532",
        "uploadedAt": "2026-03-24T12:21:38Z"
    },
    {
        "id": "master 20260324 204812 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 204812 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774354895/revision-arts/master%2020260324%20204812%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354433/revision-arts/prompt_20260324_204812_%5BFPS_4x5%5D",
        "assetId": "e6437677fb6f37689e8336c05dded329",
        "uploadedAt": "2026-03-24T12:21:35Z"
    },
    {
        "id": "master 20260324 204851 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 204851 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774354892/revision-arts/master%2020260324%20204851%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354433/revision-arts/prompt_20260324_204851_%5BFPS_4x5%5D",
        "assetId": "4d69a90fff17669a89317c9cf887d106",
        "uploadedAt": "2026-03-24T12:21:32Z"
    },
    {
        "id": "master 20260324 204928 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 204928 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774354888/revision-arts/master%2020260324%20204928%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354432/revision-arts/prompt_20260324_204928_%5BFPS_4x5%5D",
        "assetId": "45e42719a200ed4143703fb67c9404cc",
        "uploadedAt": "2026-03-24T12:21:28Z"
    },
    {
        "id": "master 20260324 204934 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 204934 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774354883/revision-arts/master%2020260324%20204934%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354432/revision-arts/prompt_20260324_204934_%5BFPS_2x3%5D",
        "assetId": "50e601fff32d3260208e27acccf984f1",
        "uploadedAt": "2026-03-24T12:21:23Z"
    },
    {
        "id": "master 20260324 204948 [FPS 16x9]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 204948 [FPS 16x9]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774354880/revision-arts/master%2020260324%20204948%20%5BFPS%2016x9%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354432/revision-arts/prompt_20260324_204948_%5BFPS_16x9%5D",
        "assetId": "9fcfbcb275098ec6def0ac064cf00a9e",
        "uploadedAt": "2026-03-24T12:21:20Z"
    },
    {
        "id": "master 20260324 204952 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 204952 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774354877/revision-arts/master%2020260324%20204952%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354431/revision-arts/prompt_20260324_204952_%5BFPS_2x3%5D",
        "assetId": "8ef29d565d35213f19090f58272ecb6f",
        "uploadedAt": "2026-03-24T12:21:17Z"
    },
    {
        "id": "master 20260324 205022 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 205022 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774354874/revision-arts/master%2020260324%20205022%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354430/revision-arts/prompt_20260324_205022_%5BFPS_2x3%5D",
        "assetId": "65ee817f901d40da6733e3cc97e79e9b",
        "uploadedAt": "2026-03-24T12:21:14Z"
    },
    {
        "id": "master 20260324 205023 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 205023 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774354870/revision-arts/master%2020260324%20205023%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354430/revision-arts/prompt_20260324_205023_%5BFPS_4x5%5D",
        "assetId": "ad9244d07865daf92104d9ca206980d2",
        "uploadedAt": "2026-03-24T12:21:10Z"
    },
    {
        "id": "master 20260324 205107 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 205107 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355710/revision-arts/master%2020260324%20205107%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354473/revision-arts/prompt_20260324_205107_%5BFPS_4x5%5D",
        "assetId": "ac15f2ac0c8a50dab7fef51bb425b4ea",
        "uploadedAt": "2026-03-24T12:35:10Z"
    },
    {
        "id": "master 20260324 205143 [FPS 5x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 205143 [FPS 5x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355696/revision-arts/master%2020260324%20205143%20%5BFPS%205x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354472/revision-arts/prompt_20260324_205143_%5BFPS_5x4%5D",
        "assetId": "ec3dcd8144b2650fc3b734d4e375ce93",
        "uploadedAt": "2026-03-24T12:34:56Z"
    },
    {
        "id": "master 20260324 205306 [FPS 1x1]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 205306 [FPS 1x1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355680/revision-arts/master%2020260324%20205306%20%5BFPS%201x1%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354470/revision-arts/prompt_20260324_205306_%5BFPS_1x1%5D",
        "assetId": "c98d985e47963072a5217a3ed63e7537",
        "uploadedAt": "2026-03-24T12:34:40Z"
    },
    {
        "id": "master 20260324 205410 [FPS 9x16]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 205410 [FPS 9x16]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355659/revision-arts/master%2020260324%20205410%20%5BFPS%209x16%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354469/revision-arts/prompt_20260324_205410_%5BFPS_9x16%5D",
        "assetId": "b933964448006d6f562ab09e333ead0c",
        "uploadedAt": "2026-03-24T12:34:19Z"
    },
    {
        "id": "master 20260324 205413 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 205413 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355634/revision-arts/master%2020260324%20205413%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354469/revision-arts/prompt_20260324_205413_%5BFPS_4x5%5D",
        "assetId": "271166a081f7e2267eda0bf80dd24298",
        "uploadedAt": "2026-03-24T12:33:54Z"
    },
    {
        "id": "master 20260324 205526 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 205526 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355596/revision-arts/master%2020260324%20205526%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354468/revision-arts/prompt_20260324_205526_%5BFPS_2x3%5D",
        "assetId": "ab5fcfdbca32241db1745fef4b5fc8d3",
        "uploadedAt": "2026-03-24T12:33:16Z"
    },
    {
        "id": "master 20260324 205526 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 205526 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355615/revision-arts/master%2020260324%20205526%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354468/revision-arts/prompt_20260324_205526_%5BFPS_4x5%5D",
        "assetId": "06aec0d4701791ea0a789d2fa567b201",
        "uploadedAt": "2026-03-24T12:33:35Z"
    },
    {
        "id": "master 20260324 205559 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 205559 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355578/revision-arts/master%2020260324%20205559%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354467/revision-arts/prompt_20260324_205559_%5BFPS_4x5%5D",
        "assetId": "4a77c0c8674ad896d28858c14c3c63f1",
        "uploadedAt": "2026-03-24T12:32:58Z"
    },
    {
        "id": "master 20260324 205603 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 205603 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355559/revision-arts/master%2020260324%20205603%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354467/revision-arts/prompt_20260324_205603_%5BFPS_2x3%5D",
        "assetId": "e492a64451a3956018f59a2c032c0eb6",
        "uploadedAt": "2026-03-24T12:32:39Z"
    },
    {
        "id": "master 20260324 205820 [FPS 5x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 205820 [FPS 5x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355541/revision-arts/master%2020260324%20205820%20%5BFPS%205x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354465/revision-arts/prompt_20260324_205820_%5BFPS_5x4%5D",
        "assetId": "afb4de839a6cb41cb053532a9e53456d",
        "uploadedAt": "2026-03-24T12:32:21Z"
    },
    {
        "id": "master 20260324 205837 [FPS 5x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 205837 [FPS 5x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355517/revision-arts/master%2020260324%20205837%20%5BFPS%205x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354464/revision-arts/prompt_20260324_205837_%5BFPS_5x4%5D",
        "assetId": "5265bcb2b1d5f49f9faf64dd89ffad62",
        "uploadedAt": "2026-03-24T12:31:57Z"
    },
    {
        "id": "master 20260324 205848 [FPS 4x5]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 205848 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355511/revision-arts/master%2020260324%20205848%20%5BFPS%204x5%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354464/revision-arts/prompt_20260324_205848_%5BFPS_4x5%5D",
        "assetId": "fc36658ea4b8b058caf103788fb391e4",
        "uploadedAt": "2026-03-24T12:31:51Z"
    },
    {
        "id": "master 20260324 205922 [FPS 2x3]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 205922 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355506/revision-arts/master%2020260324%20205922%20%5BFPS%202x3%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354464/revision-arts/prompt_20260324_205922_%5BFPS_2x3%5D",
        "assetId": "44ee95821a2c76c7e4be751258fe1ee5",
        "uploadedAt": "2026-03-24T12:31:46Z"
    },
    {
        "id": "master 20260324 210002 [FPS 5x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 210002 [FPS 5x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355502/revision-arts/master%2020260324%20210002%20%5BFPS%205x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354463/revision-arts/prompt_20260324_210002_%5BFPS_5x4%5D",
        "assetId": "219e7ef4f2820f0168c036e9b8f88d8f",
        "uploadedAt": "2026-03-24T12:31:42Z"
    },
    {
        "id": "master 20260324 210018 [FPS 5x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 210018 [FPS 5x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355499/revision-arts/master%2020260324%20210018%20%5BFPS%205x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354463/revision-arts/prompt_20260324_210018_%5BFPS_5x4%5D",
        "assetId": "e7543efb7cfc9e5573d4f6a5b5de1ff1",
        "uploadedAt": "2026-03-24T12:31:39Z"
    },
    {
        "id": "master 20260324 210035 [FPS 5x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 210035 [FPS 5x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355494/revision-arts/master%2020260324%20210035%20%5BFPS%205x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354462/revision-arts/prompt_20260324_210035_%5BFPS_5x4%5D",
        "assetId": "95bb8fbc5f1058e63da12d57966b997f",
        "uploadedAt": "2026-03-24T12:31:34Z"
    },
    {
        "id": "master 20260324 210109 [FPS 1x1]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 210109 [FPS 1x1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355490/revision-arts/master%2020260324%20210109%20%5BFPS%201x1%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354462/revision-arts/prompt_20260324_210109_%5BFPS_1x1%5D",
        "assetId": "de1f737cf9accf53b5f07a2475d4d596",
        "uploadedAt": "2026-03-24T12:31:30Z"
    },
    {
        "id": "master 20260324 210113 [FPS 5x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 210113 [FPS 5x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355487/revision-arts/master%2020260324%20210113%20%5BFPS%205x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354461/revision-arts/prompt_20260324_210113_%5BFPS_5x4%5D",
        "assetId": "40afc31af45b7d2641c91b1e6e8f502a",
        "uploadedAt": "2026-03-24T12:31:27Z"
    },
    {
        "id": "master 20260324 210130 [FPS 5x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 210130 [FPS 5x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355483/revision-arts/master%2020260324%20210130%20%5BFPS%205x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354461/revision-arts/prompt_20260324_210130_%5BFPS_5x4%5D",
        "assetId": "f73a4cf90cda3d297ea86a17bb7456c4",
        "uploadedAt": "2026-03-24T12:31:23Z"
    },
    {
        "id": "master 20260324 210202 [FPS 5x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 210202 [FPS 5x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355480/revision-arts/master%2020260324%20210202%20%5BFPS%205x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354461/revision-arts/prompt_20260324_210202_%5BFPS_5x4%5D",
        "assetId": "9e40a769f4b879fbcb3da89c262693b7",
        "uploadedAt": "2026-03-24T12:31:20Z"
    },
    {
        "id": "master 20260324 210238 [FPS 5x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 210238 [FPS 5x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355475/revision-arts/master%2020260324%20210238%20%5BFPS%205x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354459/revision-arts/prompt_20260324_210238_%5BFPS_5x4%5D",
        "assetId": "3fce72e2e002f6bbf156c506f8a8b1d0",
        "uploadedAt": "2026-03-24T12:31:15Z"
    },
    {
        "id": "master 20260324 210255 [FPS 5x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 210255 [FPS 5x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355455/revision-arts/master%2020260324%20210255%20%5BFPS%205x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354458/revision-arts/prompt_20260324_210255_%5BFPS_5x4%5D",
        "assetId": "ba08681219e614ffc50a7bac5deab106",
        "uploadedAt": "2026-03-24T12:30:55Z"
    },
    {
        "id": "master 20260324 210311 [FPS 5x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 210311 [FPS 5x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355434/revision-arts/master%2020260324%20210311%20%5BFPS%205x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354458/revision-arts/prompt_20260324_210311_%5BFPS_5x4%5D",
        "assetId": "922b273a43e6cf6713e6722b90015f83",
        "uploadedAt": "2026-03-24T12:30:34Z"
    },
    {
        "id": "master 20260324 210328 [FPS 5x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 210328 [FPS 5x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355412/revision-arts/master%2020260324%20210328%20%5BFPS%205x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354458/revision-arts/prompt_20260324_210328_%5BFPS_5x4%5D",
        "assetId": "622073b2db035fc9205a1e109940b285",
        "uploadedAt": "2026-03-24T12:30:12Z"
    },
    {
        "id": "master 20260324 210345 [FPS 5x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 210345 [FPS 5x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355391/revision-arts/master%2020260324%20210345%20%5BFPS%205x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354457/revision-arts/prompt_20260324_210345_%5BFPS_5x4%5D",
        "assetId": "e216cbeddc80b191d5a187037f14aba4",
        "uploadedAt": "2026-03-24T12:29:51Z"
    },
    {
        "id": "master 20260324 210402 [FPS 5x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 210402 [FPS 5x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355372/revision-arts/master%2020260324%20210402%20%5BFPS%205x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354457/revision-arts/prompt_20260324_210402_%5BFPS_5x4%5D",
        "assetId": "013385e613f37aff1e08fbbf023c5900",
        "uploadedAt": "2026-03-24T12:29:32Z"
    },
    {
        "id": "master 20260324 210510 [FPS 5x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 210510 [FPS 5x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355351/revision-arts/master%2020260324%20210510%20%5BFPS%205x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354456/revision-arts/prompt_20260324_210510_%5BFPS_5x4%5D",
        "assetId": "9d4434e342bac4c4dcc8317153c7069b",
        "uploadedAt": "2026-03-24T12:29:11Z"
    },
    {
        "id": "master 20260324 210545 [FPS 5x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 210545 [FPS 5x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355332/revision-arts/master%2020260324%20210545%20%5BFPS%205x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354455/revision-arts/prompt_20260324_210545_%5BFPS_5x4%5D",
        "assetId": "3f78fc53f268fdd1bcb78e7e1fe34829",
        "uploadedAt": "2026-03-24T12:28:52Z"
    },
    {
        "id": "master 20260324 210602 [FPS 5x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 210602 [FPS 5x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355310/revision-arts/master%2020260324%20210602%20%5BFPS%205x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354455/revision-arts/prompt_20260324_210602_%5BFPS_5x4%5D",
        "assetId": "eb9b6c9f475b49fc0dad1ee1afae2e39",
        "uploadedAt": "2026-03-24T12:28:30Z"
    },
    {
        "id": "master 20260324 210610 [FPS 1x1]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 210610 [FPS 1x1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355287/revision-arts/master%2020260324%20210610%20%5BFPS%201x1%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354455/revision-arts/prompt_20260324_210610_%5BFPS_1x1%5D",
        "assetId": "550ac2d99f0b2a3c8b4b7af79f6f5a88",
        "uploadedAt": "2026-03-24T12:28:07Z"
    },
    {
        "id": "master 20260324 210640 [FPS 5x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 210640 [FPS 5x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355282/revision-arts/master%2020260324%20210640%20%5BFPS%205x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354453/revision-arts/prompt_20260324_210640_%5BFPS_5x4%5D",
        "assetId": "20332da6dbad22b4789b016bfdc8b4ee",
        "uploadedAt": "2026-03-24T12:28:02Z"
    },
    {
        "id": "master 20260324 210644 [FPS 1x1]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 210644 [FPS 1x1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355277/revision-arts/master%2020260324%20210644%20%5BFPS%201x1%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354453/revision-arts/prompt_20260324_210644_%5BFPS_1x1%5D",
        "assetId": "bf573e4104002c2b412975469a356972",
        "uploadedAt": "2026-03-24T12:27:57Z"
    },
    {
        "id": "master 20260324 210701 [FPS 1x1]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 210701 [FPS 1x1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355271/revision-arts/master%2020260324%20210701%20%5BFPS%201x1%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354453/revision-arts/prompt_20260324_210701_%5BFPS_1x1%5D",
        "assetId": "989c85d7c8b8f3827fc159a28ffc1331",
        "uploadedAt": "2026-03-24T12:27:51Z"
    },
    {
        "id": "master 20260324 210701 [FPS 5x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 210701 [FPS 5x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355274/revision-arts/master%2020260324%20210701%20%5BFPS%205x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354453/revision-arts/prompt_20260324_210701_%5BFPS_5x4%5D",
        "assetId": "68ff7705b86fff54b01cc431c52f4928",
        "uploadedAt": "2026-03-24T12:27:54Z"
    },
    {
        "id": "master 20260324 210731 [FPS 1x1]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 210731 [FPS 1x1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355266/revision-arts/master%2020260324%20210731%20%5BFPS%201x1%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354452/revision-arts/prompt_20260324_210731_%5BFPS_1x1%5D",
        "assetId": "5ffd7a14c22cd90a624ef49ce973b751",
        "uploadedAt": "2026-03-24T12:27:46Z"
    },
    {
        "id": "master 20260324 210734 [FPS 5x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 210734 [FPS 5x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355261/revision-arts/master%2020260324%20210734%20%5BFPS%205x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354452/revision-arts/prompt_20260324_210734_%5BFPS_5x4%5D",
        "assetId": "4ea77d9a67c4a8100f0940f7aca2c639",
        "uploadedAt": "2026-03-24T12:27:41Z"
    },
    {
        "id": "master 20260324 210748 [FPS 1x1]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 210748 [FPS 1x1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355242/revision-arts/master%2020260324%20210748%20%5BFPS%201x1%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354452/revision-arts/prompt_20260324_210748_%5BFPS_1x1%5D",
        "assetId": "1b0f9704f8bf52d48bdc12641c06993b",
        "uploadedAt": "2026-03-24T12:27:22Z"
    },
    {
        "id": "master 20260324 210750 [FPS 5x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 210750 [FPS 5x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355223/revision-arts/master%2020260324%20210750%20%5BFPS%205x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354452/revision-arts/prompt_20260324_210750_%5BFPS_5x4%5D",
        "assetId": "9938cc67f4dcb65115da7ed6476e2a10",
        "uploadedAt": "2026-03-24T12:27:03Z"
    },
    {
        "id": "master 20260324 210809 [FPS 5x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 210809 [FPS 5x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355203/revision-arts/master%2020260324%20210809%20%5BFPS%205x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354452/revision-arts/prompt_20260324_210809_%5BFPS_5x4%5D",
        "assetId": "82e48d8b0863069cc48d3628c5557ac6",
        "uploadedAt": "2026-03-24T12:26:43Z"
    },
    {
        "id": "master 20260324 210826 [FPS 5x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 210826 [FPS 5x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355200/revision-arts/master%2020260324%20210826%20%5BFPS%205x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354451/revision-arts/prompt_20260324_210826_%5BFPS_5x4%5D",
        "assetId": "1c3c4e5578373ec64e4236092a831b91",
        "uploadedAt": "2026-03-24T12:26:40Z"
    },
    {
        "id": "master 20260324 210827 [FPS 1x1]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 210827 [FPS 1x1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355196/revision-arts/master%2020260324%20210827%20%5BFPS%201x1%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354451/revision-arts/prompt_20260324_210827_%5BFPS_1x1%5D",
        "assetId": "b0fb023c993acc51f64cc1b4df4f58c3",
        "uploadedAt": "2026-03-24T12:26:36Z"
    },
    {
        "id": "master 20260324 210842 [FPS 5x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 210842 [FPS 5x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355192/revision-arts/master%2020260324%20210842%20%5BFPS%205x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354451/revision-arts/prompt_20260324_210842_%5BFPS_5x4%5D",
        "assetId": "dc45a6dc0c7e2f4672a65f18a9900945",
        "uploadedAt": "2026-03-24T12:26:32Z"
    },
    {
        "id": "master 20260324 210902 [FPS 5x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 210902 [FPS 5x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355189/revision-arts/master%2020260324%20210902%20%5BFPS%205x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354450/revision-arts/prompt_20260324_210902_%5BFPS_5x4%5D",
        "assetId": "066a6d5c0029fda1519b6c545211001d",
        "uploadedAt": "2026-03-24T12:26:29Z"
    },
    {
        "id": "master 20260324 210905 [FPS 1x1]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 210905 [FPS 1x1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355186/revision-arts/master%2020260324%20210905%20%5BFPS%201x1%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354450/revision-arts/prompt_20260324_210905_%5BFPS_1x1%5D",
        "assetId": "f8745ef5c6b71038624582e8e4c285b3",
        "uploadedAt": "2026-03-24T12:26:26Z"
    },
    {
        "id": "master 20260324 210928 [FPS 1x1]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 210928 [FPS 1x1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355182/revision-arts/master%2020260324%20210928%20%5BFPS%201x1%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354450/revision-arts/prompt_20260324_210928_%5BFPS_1x1%5D",
        "assetId": "c5dcbd3d9e43e403de7d718058425e4e",
        "uploadedAt": "2026-03-24T12:26:22Z"
    },
    {
        "id": "master 20260324 210944 [FPS 1x1]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 210944 [FPS 1x1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355178/revision-arts/master%2020260324%20210944%20%5BFPS%201x1%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354449/revision-arts/prompt_20260324_210944_%5BFPS_1x1%5D",
        "assetId": "36d52cc23a24581fbf26f9dea4493351",
        "uploadedAt": "2026-03-24T12:26:18Z"
    },
    {
        "id": "master 20260324 211043 [FPS 5x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 211043 [FPS 5x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355175/revision-arts/master%2020260324%20211043%20%5BFPS%205x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354449/revision-arts/prompt_20260324_211043_%5BFPS_5x4%5D",
        "assetId": "6ae079a0737d3c21fba7dfa73608dbb9",
        "uploadedAt": "2026-03-24T12:26:15Z"
    },
    {
        "id": "master 20260324 211058 [FPS 1x1]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 211058 [FPS 1x1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355170/revision-arts/master%2020260324%20211058%20%5BFPS%201x1%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354447/revision-arts/prompt_20260324_211058_%5BFPS_1x1%5D",
        "assetId": "06c05c63d7b078560b307799bc227851",
        "uploadedAt": "2026-03-24T12:26:10Z"
    },
    {
        "id": "master 20260324 211100 [FPS 5x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 211100 [FPS 5x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355148/revision-arts/master%2020260324%20211100%20%5BFPS%205x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354447/revision-arts/prompt_20260324_211100_%5BFPS_5x4%5D",
        "assetId": "64fde010fa40e7b9cb9cc445aa71b02c",
        "uploadedAt": "2026-03-24T12:25:48Z"
    },
    {
        "id": "master 20260324 211137 [FPS 5x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 211137 [FPS 5x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355127/revision-arts/master%2020260324%20211137%20%5BFPS%205x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354446/revision-arts/prompt_20260324_211137_%5BFPS_5x4%5D",
        "assetId": "1e5fe0b2ab968a5c25033b012b0a9c0a",
        "uploadedAt": "2026-03-24T12:25:27Z"
    },
    {
        "id": "master 20260324 211153 [FPS 5x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 211153 [FPS 5x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355124/revision-arts/master%2020260324%20211153%20%5BFPS%205x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354446/revision-arts/prompt_20260324_211153_%5BFPS_5x4%5D",
        "assetId": "3e37ca027a1aace6bd3733f61041aded",
        "uploadedAt": "2026-03-24T12:25:24Z"
    },
    {
        "id": "master 20260324 211216 [FPS 5x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 211216 [FPS 5x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355112/revision-arts/master%2020260324%20211216%20%5BFPS%205x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354445/revision-arts/prompt_20260324_211216_%5BFPS_5x4%5D",
        "assetId": "c4a98cb11db67c789f7f47fdec513316",
        "uploadedAt": "2026-03-24T12:25:12Z"
    },
    {
        "id": "master 20260324 211251 [FPS 5x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 211251 [FPS 5x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355107/revision-arts/master%2020260324%20211251%20%5BFPS%205x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354444/revision-arts/prompt_20260324_211251_%5BFPS_5x4%5D",
        "assetId": "d63b0f5c5d5c6bcc573b7bdf8dc22062",
        "uploadedAt": "2026-03-24T12:25:07Z"
    },
    {
        "id": "master 20260324 211310 [FPS 5x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 211310 [FPS 5x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355104/revision-arts/master%2020260324%20211310%20%5BFPS%205x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354444/revision-arts/prompt_20260324_211310_%5BFPS_5x4%5D",
        "assetId": "0704716599ed7ece3ea4e30ef2a9b16d",
        "uploadedAt": "2026-03-24T12:25:04Z"
    },
    {
        "id": "master 20260324 211326 [FPS 5x4]",
        "tags": [
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 211326 [FPS 5x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774355100/revision-arts/master%2020260324%20211326%20%5BFPS%205x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774354444/revision-arts/prompt_20260324_211326_%5BFPS_5x4%5D",
        "assetId": "2913931248fb0febf2bec93de28bbd26",
        "uploadedAt": "2026-03-24T12:25:00Z"
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
        if (item.tags && Array.isArray(item.tags)) {
            item.tags.forEach(tag => {
                // Normalize to lowercase for set uniqueness and consistent sorting
                if (tag) tagsSet.add(tag.trim().toLowerCase());
            });
        }
    });
    
    const sortedTags = Array.from(tagsSet).sort((a, b) => 
        a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
    ).map(tag => ({
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
            if (mcInfoOpen) {
                e.preventDefault(); // Block native browser edge swipe
                return; 
            }
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
            if (mcInfoOpen) {
                // Feature: A strong Left-to-Right swipe closes the viewer (Native feel)
                if (totalDx > 40 && velocityDx > 0.15) {
                    closeViewer();
                }
                return;
            }
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
    
    const tagId = String(tag).toLowerCase().trim();

    // Update mobile visual UI
    const mCatBtn = document.getElementById('m-category-btn');
    if (mCatBtn && window.innerWidth <= 1024) {
        // ── Sync header label text ──
        const textSpan = document.getElementById('m-active-category-text');
        if (textSpan) textSpan.innerText = tagId.toUpperCase();

        document.getElementById('m-filter-all')?.classList.remove('active');
        mCatBtn.classList.add('active');
        mCatBtn.classList.remove('open');
        document.getElementById('m-category-dropdown')?.classList.remove('open');
        
        document.querySelectorAll('.m-cat-item').forEach(i => {
            if (i.innerText.trim().toLowerCase() === tagId) {
                i.classList.add('active');
            } else {
                i.classList.remove('active');
            }
        });
    }

    // Trigger actual PC/Global underlying filter
    const chip = document.querySelector(`.filter-chip[data-category="${tagId}"]`);
    if (chip) {
        chip.click();
    } else {
        if (typeof mobileFilterAll === 'function' && window.innerWidth <= 1024) {
            mobileFilterAll();
        } else {
            const allChip = document.querySelector('.filter-chip[data-category="all"]');
            if (allChip) allChip.click();
        }
    }
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
                    // Case-insensitive matching since tagId is normalized to lowercase
                    const matchedItems = STREAM_RECORDS.filter(i => 
                        (i.tags && Array.isArray(i.tags) && i.tags.some(t => t.toLowerCase() === tagId))
                    );
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
            // Case-insensitive matching since tagId is normalized to lowercase
            const matchedItems = STREAM_RECORDS.filter(i => 
                (i.tags && Array.isArray(i.tags) && i.tags.some(t => t.toLowerCase() === tagId))
            );
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








