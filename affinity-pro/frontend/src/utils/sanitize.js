// Minimal allowlist-based sanitizer for chat content.
// Allowed tags: strong, em, b, i, br, code, span (with safe class attr only).
// Strips scripts, event handlers, javascript: URLs.

const ALLOWED_TAGS = new Set(['STRONG', 'EM', 'B', 'I', 'BR', 'CODE', 'SPAN']);
const ALLOWED_ATTRS = { SPAN: ['class'], STRONG: ['class'], EM: ['class'] };

export function sanitizeHtml(input) {
    if (typeof input !== 'string') return '';
    if (typeof window === 'undefined' || typeof DOMParser === 'undefined') {
        return input.replace(/[<>]/g, (c) => (c === '<' ? '&lt;' : '&gt;'));
    }

    const doc = new DOMParser().parseFromString(`<div id="__root">${input}</div>`, 'text/html');
    const root = doc.getElementById('__root');
    if (!root) return '';

    const walk = (node) => {
        const children = Array.from(node.childNodes);
        for (const child of children) {
            if (child.nodeType === 1) {
                if (!ALLOWED_TAGS.has(child.tagName)) {
                    const replacement = doc.createTextNode(child.textContent || '');
                    node.replaceChild(replacement, child);
                    continue;
                }
                const allowedForTag = ALLOWED_ATTRS[child.tagName] || [];
                Array.from(child.attributes).forEach((attr) => {
                    if (!allowedForTag.includes(attr.name)) child.removeAttribute(attr.name);
                });
                walk(child);
            } else if (child.nodeType === 8) {
                node.removeChild(child); // comments
            }
        }
    };
    walk(root);
    return root.innerHTML;
}

// Convert a small inline markdown subset to safe HTML.
//   **text**  -> <strong>text</strong>
//   `code`    -> <code>code</code>
//   newlines  -> <br>
export function inlineMarkdownToHtml(text) {
    if (typeof text !== 'string') return '';
    const escaped = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    return escaped
        .replace(/\*\*(.+?)\*\*/g, '<strong class="font-black">$1</strong>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\n/g, '<br/>');
}
