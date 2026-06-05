// ==========================================
// CENTRAL APP CONFIG
// One place for env-driven URLs, keys, and feature flags.
// ==========================================

const trimSlash = (u) => (typeof u === 'string' ? u.replace(/\/+$/, '') : '');

export const API_BASE_URL = trimSlash(
    import.meta.env.VITE_API_URL || 'https://affinity-pro-backend.onrender.com'
);

export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '2.0.0';
export const IS_DEV = !!import.meta.env.DEV;

export const STORAGE_KEYS = {
    THEME: 'affinityPro_theme',
    LANG: 'affinityPro_lang',
    FONT_SCALE: 'affinityPro_fontScale',
    CHAT_HISTORY: 'affinityPro_chat_history',
    CURRENT_TOPIC: 'affinityPro_current_topic',
    AI_MEMORY_CACHE: 'affinityPro_ai_memory_cache',
    IS_ADMIN: 'affinityPro_isAdmin',
    ADMIN_TOKEN: 'affinityPro_admin_token',
    ADMIN_EMAIL: 'affinityPro_admin_email',
    USER_NAME: 'affinityPro_user_name',
    HIGH_SCORE: 'affinityProHighScore',
    UNLOCKED_LEVELS: 'affinityPro_unlocked_levels',
    LEVEL_STARS: 'affinityPro_level_stars',
    CERT_DATA: 'affinityPro_cert_data',
    CERT_UNLOCKED: 'affinityPro_cert_unlocked',
    BACKEND_KEY: 'affinityPro_backend_key',
};

export const getAdminToken = () => {
    try {
        return (
            localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN) ||
            localStorage.getItem(STORAGE_KEYS.BACKEND_KEY) ||
            ''
        );
    } catch {
        return '';
    }
};

export const authHeaders = (extra = {}) => {
    const token = getAdminToken();
    return {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...extra,
    };
};

// Generic fetch wrapper with timeout + JSON parsing.
export async function apiFetch(path, { method = 'GET', body, headers, timeoutMs = 20000, auth = false } = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    try {
        const response = await fetch(`${API_BASE_URL}${path}`, {
            method,
            headers: auth ? authHeaders(headers) : { 'Content-Type': 'application/json', ...headers },
            body: body ? JSON.stringify(body) : undefined,
            signal: controller.signal,
        });
        const text = await response.text();
        let data;
        try { data = text ? JSON.parse(text) : {}; } catch { data = { raw: text }; }
        if (!response.ok) {
            const message = data?.error || data?.message || `HTTP ${response.status}`;
            const error = new Error(message);
            error.status = response.status;
            error.data = data;
            throw error;
        }
        return data;
    } finally {
        clearTimeout(timeoutId);
    }
}
