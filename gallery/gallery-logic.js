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
            "editorial",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 180116 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774344624/revision-arts/master%2020260324%20180116%20%5BFPS%203x4%5D.png",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774343788/revision-arts/prompt_20260324_180116_%5BFPS_3x4%5D",
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








