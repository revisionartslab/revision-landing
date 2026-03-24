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
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 125954 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774328881/revision-arts/master%2020260324%20125954%20%5BFPS%203x4%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774328778/revision-arts/prompt_20260324_125954_%5BFPS_3x4%5D",
        "assetId": "093c39b6abed2ef69ea03ac63d40b9c4",
        "uploadedAt": "2026-03-24T05:08:01Z"
    },
    {
        "id": "master 20260324 130031 [FPS 3x4]",
        "tags": [
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 130031 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774328878/revision-arts/master%2020260324%20130031%20%5BFPS%203x4%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774328777/revision-arts/prompt_20260324_130031_%5BFPS_3x4%5D",
        "assetId": "a22af430cbdeff97d1cc90782810bbe4",
        "uploadedAt": "2026-03-24T05:07:58Z"
    },
    {
        "id": "master 20260324 130111 [FPS 4x5]",
        "tags": [
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 130111 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774328875/revision-arts/master%2020260324%20130111%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774328776/revision-arts/prompt_20260324_130111_%5BFPS_4x5%5D",
        "assetId": "d9132dbeb59e9a9ff4a2e53cfd0716a6",
        "uploadedAt": "2026-03-24T05:07:55Z"
    },
    {
        "id": "master 20260324 130219 [FPS 4x5]",
        "tags": [
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 130219 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774328872/revision-arts/master%2020260324%20130219%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774328775/revision-arts/prompt_20260324_130219_%5BFPS_4x5%5D",
        "assetId": "732e53218a04126e40cce4cfb308a743",
        "uploadedAt": "2026-03-24T05:07:52Z"
    },
    {
        "id": "master 20260324 130252 [FPS 4x5]",
        "tags": [
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 130252 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774328996/revision-arts/master%2020260324%20130252%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774328800/revision-arts/prompt_20260324_130252_%5BFPS_4x5%5D",
        "assetId": "b72f49a164bcc3fdd190a0e2af53b30f",
        "uploadedAt": "2026-03-24T05:09:56Z"
    },
    {
        "id": "master 20260324 130332 [FPS 3x4]",
        "tags": [
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 130332 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774328993/revision-arts/master%2020260324%20130332%20%5BFPS%203x4%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774328799/revision-arts/prompt_20260324_130332_%5BFPS_3x4%5D",
        "assetId": "1529c1d5a6aab409d4ef0643528559c9",
        "uploadedAt": "2026-03-24T05:09:53Z"
    },
    {
        "id": "master 20260324 130416 [FPS 4x5]",
        "tags": [
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 130416 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774328990/revision-arts/master%2020260324%20130416%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774328799/revision-arts/prompt_20260324_130416_%5BFPS_4x5%5D",
        "assetId": "e370423c973c1cfb61b79fb76a456028",
        "uploadedAt": "2026-03-24T05:09:50Z"
    },
    {
        "id": "master 20260324 130455 [FPS 4x5]",
        "tags": [
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 130455 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774328987/revision-arts/master%2020260324%20130455%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774328798/revision-arts/prompt_20260324_130455_%5BFPS_4x5%5D",
        "assetId": "cc7936afa414a466dc21c74337892a3c",
        "uploadedAt": "2026-03-24T05:09:47Z"
    },
    {
        "id": "master 20260324 130529 [FPS 4x5]",
        "tags": [
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 130529 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774328984/revision-arts/master%2020260324%20130529%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774328797/revision-arts/prompt_20260324_130529_%5BFPS_4x5%5D",
        "assetId": "3484b55a3d2d64a4963507760c447eb7",
        "uploadedAt": "2026-03-24T05:09:44Z"
    },
    {
        "id": "master 20260324 130613 [FPS 3x4]",
        "tags": [
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 130613 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774328981/revision-arts/master%2020260324%20130613%20%5BFPS%203x4%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774328797/revision-arts/prompt_20260324_130613_%5BFPS_3x4%5D",
        "assetId": "b3f8fc926c035473348376f8c42a17eb",
        "uploadedAt": "2026-03-24T05:09:41Z"
    },
    {
        "id": "master 20260324 131235 [FPS 1x1]",
        "tags": [
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 131235 [FPS 1x1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774328978/revision-arts/master%2020260324%20131235%20%5BFPS%201x1%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774328796/revision-arts/prompt_20260324_131235_%5BFPS_1x1%5D",
        "assetId": "a483faaf6f6a78da1e7daa292c2bc315",
        "uploadedAt": "2026-03-24T05:09:38Z"
    },
    {
        "id": "master 20260324 131317 [FPS 4x5]",
        "tags": [
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 131317 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774328975/revision-arts/master%2020260324%20131317%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774328796/revision-arts/prompt_20260324_131317_%5BFPS_4x5%5D",
        "assetId": "7e982b8f1dabaff958b80a5ec77de2de",
        "uploadedAt": "2026-03-24T05:09:35Z"
    },
    {
        "id": "master 20260324 131350 [FPS 4x5]",
        "tags": [
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 131350 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774328972/revision-arts/master%2020260324%20131350%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774328795/revision-arts/prompt_20260324_131350_%5BFPS_4x5%5D",
        "assetId": "eae622cf61629323874a4d1524485261",
        "uploadedAt": "2026-03-24T05:09:32Z"
    },
    {
        "id": "master 20260324 131516 [FPS 4x5]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 131516 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774328967/revision-arts/master%2020260324%20131516%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774328794/revision-arts/prompt_20260324_131516_%5BFPS_4x5%5D",
        "assetId": "5d6fea38b01a65a04402532c5db0f20d",
        "uploadedAt": "2026-03-24T05:09:27Z"
    },
    {
        "id": "master 20260324 131751 [FPS 4x5]",
        "tags": [
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 131751 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774328964/revision-arts/master%2020260324%20131751%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774328794/revision-arts/prompt_20260324_131751_%5BFPS_4x5%5D",
        "assetId": "b15dbcb31146afffecafe8f1f0fe560d",
        "uploadedAt": "2026-03-24T05:09:24Z"
    },
    {
        "id": "master 20260324 131829 [FPS 2x3]",
        "tags": [
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 131829 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774328961/revision-arts/master%2020260324%20131829%20%5BFPS%202x3%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774328793/revision-arts/prompt_20260324_131829_%5BFPS_2x3%5D",
        "assetId": "f78d20661645e6a905e7d5e3d0f2883d",
        "uploadedAt": "2026-03-24T05:09:21Z"
    },
    {
        "id": "master 20260324 131910 [FPS 4x5]",
        "tags": [
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 131910 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774328956/revision-arts/master%2020260324%20131910%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774328793/revision-arts/prompt_20260324_131910_%5BFPS_4x5%5D",
        "assetId": "cd569d48632297900256a5b54bc66c2c",
        "uploadedAt": "2026-03-24T05:09:16Z"
    },
    {
        "id": "master 20260324 132132 [FPS 4x5]",
        "tags": [
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 132132 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774328953/revision-arts/master%2020260324%20132132%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774328792/revision-arts/prompt_20260324_132132_%5BFPS_4x5%5D",
        "assetId": "c9ddcdbb57a9025a25c14938bd799640",
        "uploadedAt": "2026-03-24T05:09:13Z"
    },
    {
        "id": "master 20260324 132208 [FPS 9x16]",
        "tags": [
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 132208 [FPS 9x16]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774328950/revision-arts/master%2020260324%20132208%20%5BFPS%209x16%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774328791/revision-arts/prompt_20260324_132208_%5BFPS_9x16%5D",
        "assetId": "8b2ddbe9ba6b173381b75acb420771fa",
        "uploadedAt": "2026-03-24T05:09:10Z"
    },
    {
        "id": "master 20260324 132335 [FPS 4x5]",
        "tags": [
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 132335 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774328938/revision-arts/master%2020260324%20132335%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774328791/revision-arts/prompt_20260324_132335_%5BFPS_4x5%5D",
        "assetId": "1b9526fd93ee24a0bee76a24c9b16b81",
        "uploadedAt": "2026-03-24T05:08:58Z"
    },
    {
        "id": "master 20260324 132504 [FPS 4x5]",
        "tags": [
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 132504 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774328932/revision-arts/master%2020260324%20132504%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774328790/revision-arts/prompt_20260324_132504_%5BFPS_4x5%5D",
        "assetId": "2305c62ff186121b30e0c439c62e6bea",
        "uploadedAt": "2026-03-24T05:08:52Z"
    },
    {
        "id": "master 20260324 134501 [FPS 9x16]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 134501 [FPS 9x16]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774328929/revision-arts/master%2020260324%20134501%20%5BFPS%209x16%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774328790/revision-arts/prompt_20260324_134501_%5BFPS_9x16%5D",
        "assetId": "73932cdc26631451366f10e334ab57ee",
        "uploadedAt": "2026-03-24T05:08:49Z"
    },
    {
        "id": "master 20260324 134528 [FPS 4x5]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 134528 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774328924/revision-arts/master%2020260324%20134528%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774328789/revision-arts/prompt_20260324_134528_%5BFPS_4x5%5D",
        "assetId": "ea2f0d1a551b475395e0eb7ef9898b90",
        "uploadedAt": "2026-03-24T05:08:44Z"
    },
    {
        "id": "master 20260324 134915 [FPS 9x16]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 134915 [FPS 9x16]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774328918/revision-arts/master%2020260324%20134915%20%5BFPS%209x16%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774328788/revision-arts/prompt_20260324_134915_%5BFPS_9x16%5D",
        "assetId": "ae071824c82b37542a2d16dbf75251ea",
        "uploadedAt": "2026-03-24T05:08:38Z"
    },
    {
        "id": "master 20260324 135243 [FPS 3x4]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 135243 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774328915/revision-arts/master%2020260324%20135243%20%5BFPS%203x4%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774328787/revision-arts/prompt_20260324_135243_%5BFPS_3x4%5D",
        "assetId": "4bf75479d7b3f3532a8ce883c151f9d1",
        "uploadedAt": "2026-03-24T05:08:35Z"
    },
    {
        "id": "master 20260324 135331 [FPS 4x5]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 135331 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774328912/revision-arts/master%2020260324%20135331%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774328786/revision-arts/prompt_20260324_135331_%5BFPS_4x5%5D",
        "assetId": "20863ad2d87e92c91a05bf0c10719b12",
        "uploadedAt": "2026-03-24T05:08:32Z"
    },
    {
        "id": "master 20260324 135556 [FPS 3x4]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 135556 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774328906/revision-arts/master%2020260324%20135556%20%5BFPS%203x4%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774328784/revision-arts/prompt_20260324_135556_%5BFPS_3x4%5D",
        "assetId": "c7a787d861cdf33906916bedc10c7881",
        "uploadedAt": "2026-03-24T05:08:26Z"
    },
    {
        "id": "master 20260324 135848 [FPS 4x5]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 135848 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774328903/revision-arts/master%2020260324%20135848%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774328783/revision-arts/prompt_20260324_135848_%5BFPS_4x5%5D",
        "assetId": "d1b1cf44e7dedd177414fa0f23b377de",
        "uploadedAt": "2026-03-24T05:08:23Z"
    },
    {
        "id": "master 20260324 135937 [FPS 2x3]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 135937 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774328900/revision-arts/master%2020260324%20135937%20%5BFPS%202x3%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774328782/revision-arts/prompt_20260324_135937_%5BFPS_2x3%5D",
        "assetId": "da15925e12b22176524530b34811cb82",
        "uploadedAt": "2026-03-24T05:08:20Z"
    },
    {
        "id": "master 20260324 140039 [FPS 9x16]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 140039 [FPS 9x16]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774328892/revision-arts/master%2020260324%20140039%20%5BFPS%209x16%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774328782/revision-arts/prompt_20260324_140039_%5BFPS_9x16%5D",
        "assetId": "32a9ff95e032e461eeb8331e502d933a",
        "uploadedAt": "2026-03-24T05:08:12Z"
    },
    {
        "id": "master 20260324 140108 [FPS 2x3]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 140108 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774328888/revision-arts/master%2020260324%20140108%20%5BFPS%202x3%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774328781/revision-arts/prompt_20260324_140108_%5BFPS_2x3%5D",
        "assetId": "989a2f8a7773266e55065730e76abbdc",
        "uploadedAt": "2026-03-24T05:08:08Z"
    },
    {
        "id": "master 20260324 140920 [FPS 2x3]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 140920 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774332473/revision-arts/master%2020260324%20140920%20%5BFPS%202x3%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774332427/revision-arts/prompt_20260324_140920_%5BFPS_2x3%5D",
        "assetId": "2ab5eddb48e34e779cbca63ae5b41d6c",
        "uploadedAt": "2026-03-24T06:07:53Z"
    },
    {
        "id": "master 20260324 140954 [FPS 3x4]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 140954 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774332469/revision-arts/master%2020260324%20140954%20%5BFPS%203x4%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774332426/revision-arts/prompt_20260324_140954_%5BFPS_3x4%5D",
        "assetId": "703f8e64c1da46788582531f714386c0",
        "uploadedAt": "2026-03-24T06:07:49Z"
    },
    {
        "id": "master 20260324 141310 [FPS 9x16]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 141310 [FPS 9x16]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774332461/revision-arts/master%2020260324%20141310%20%5BFPS%209x16%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774332425/revision-arts/prompt_20260324_141310_%5BFPS_9x16%5D",
        "assetId": "f685c44a1a843e0b226424886cb1f012",
        "uploadedAt": "2026-03-24T06:07:41Z"
    },
    {
        "id": "master 20260324 141402 [FPS 4x5]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 141402 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774332541/revision-arts/master%2020260324%20141402%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774332424/revision-arts/prompt_20260324_141402_%5BFPS_4x5%5D",
        "assetId": "3b57716841ed3e4a3d83116f5a977299",
        "uploadedAt": "2026-03-24T06:09:01Z"
    },
    {
        "id": "master 20260324 141518 [FPS 3x4]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 141518 [FPS 3x4]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774332512/revision-arts/master%2020260324%20141518%20%5BFPS%203x4%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774332433/revision-arts/prompt_20260324_141518_%5BFPS_3x4%5D",
        "assetId": "c1f176c5e48ce226d3ba49dae3d31fb9",
        "uploadedAt": "2026-03-24T06:08:32Z"
    },
    {
        "id": "master 20260324 141553 [FPS 2x3]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 141553 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774332509/revision-arts/master%2020260324%20141553%20%5BFPS%202x3%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774332432/revision-arts/prompt_20260324_141553_%5BFPS_2x3%5D",
        "assetId": "141dae1df5346c5dd5adc2b8dad5101a",
        "uploadedAt": "2026-03-24T06:08:29Z"
    },
    {
        "id": "master 20260324 141629 [FPS 2x3]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 141629 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774332506/revision-arts/master%2020260324%20141629%20%5BFPS%202x3%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774332432/revision-arts/prompt_20260324_141629_%5BFPS_2x3%5D",
        "assetId": "13404289e0e02d5d5ba01720a54a717b",
        "uploadedAt": "2026-03-24T06:08:26Z"
    },
    {
        "id": "master 20260324 141739 [FPS 2x3]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 141739 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774332503/revision-arts/master%2020260324%20141739%20%5BFPS%202x3%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774332431/revision-arts/prompt_20260324_141739_%5BFPS_2x3%5D",
        "assetId": "523370e9d5cc7e0658ae8a69971fb7af",
        "uploadedAt": "2026-03-24T06:08:23Z"
    },
    {
        "id": "master 20260324 141810 [FPS 1x1]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 141810 [FPS 1x1]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774332500/revision-arts/master%2020260324%20141810%20%5BFPS%201x1%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774332431/revision-arts/prompt_20260324_141810_%5BFPS_1x1%5D",
        "assetId": "d01921b9ecd00d099129b442ce9a1cf1",
        "uploadedAt": "2026-03-24T06:08:20Z"
    },
    {
        "id": "master 20260324 141845 [FPS 4x5]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 141845 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774332497/revision-arts/master%2020260324%20141845%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774332430/revision-arts/prompt_20260324_141845_%5BFPS_4x5%5D",
        "assetId": "c2e101b66c5884ac421307b4eecf0fd9",
        "uploadedAt": "2026-03-24T06:08:17Z"
    },
    {
        "id": "master 20260324 142206 [FPS 2x3]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 142206 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774332487/revision-arts/master%2020260324%20142206%20%5BFPS%202x3%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774332429/revision-arts/prompt_20260324_142206_%5BFPS_2x3%5D",
        "assetId": "4764acd3caf492df2a627e6d02a2f6a7",
        "uploadedAt": "2026-03-24T06:08:07Z"
    },
    {
        "id": "master 20260324 142247 [FPS 2x3]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 142247 [FPS 2x3]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774332482/revision-arts/master%2020260324%20142247%20%5BFPS%202x3%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774332428/revision-arts/prompt_20260324_142247_%5BFPS_2x3%5D",
        "assetId": "6a2dc74bd96921e68f8e3ffdc0e4648e",
        "uploadedAt": "2026-03-24T06:08:02Z"
    },
    {
        "id": "master 20260324 142330 [FPS 9x16]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 142330 [FPS 9x16]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774332479/revision-arts/master%2020260324%20142330%20%5BFPS%209x16%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774332428/revision-arts/prompt_20260324_142330_%5BFPS_9x16%5D",
        "assetId": "bf2751f7491f54f36823b15ce462a2a1",
        "uploadedAt": "2026-03-24T06:07:59Z"
    },
    {
        "id": "master 20260324 142559 [FPS 4x5]",
        "tags": [
            "B&W",
            "PLANE",
            "portrait"
        ],
        "title": "master 20260324 142559 [FPS 4x5]",
        "url": "https://res.cloudinary.com/dy2gu58kz/image/upload/v1774332476/revision-arts/master%2020260324%20142559%20%5BFPS%204x5%5D.jpg",
        "description": "REVISION ARTS honors humanity’s artistic heritage by utilizing algorithmic intelligence as an alchemical tool to deconstruct and reconstruct aesthetic DNA. Within this horizon, traditional mediums and computational creations coexist without distinction, merging into a singular vision. We define these tools not as an imitation, but as a transformative instrument and an expanded gaze that crystallizes fleeting thoughts into eternal forms.",
        "promptUrl": "https://res.cloudinary.com/dy2gu58kz/raw/upload/v1774332427/revision-arts/prompt_20260324_142559_%5BFPS_4x5%5D",
        "assetId": "1c8dda2d5f567cb5fc69149929e6eb16",
        "uploadedAt": "2026-03-24T06:07:56Z"
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








