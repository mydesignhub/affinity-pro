import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Restrict CORS to the known frontend origins only
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
    : ['http://localhost:5173', 'http://localhost:4173'];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (e.g. mobile apps, Postman during dev)
        if (!origin || ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
        callback(new Error('CORS: origin not allowed'));
    },
    methods: ['POST'],
}));

app.use(express.json({ limit: '20kb' }));

// Simple in-memory rate limiter: max 20 requests per IP per minute
const rateCounts = new Map();
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 60_000;

const rateLimiter = (req, res, next) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const entry = rateCounts.get(ip);

    if (!entry || now > entry.resetAt) {
        rateCounts.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
        return next();
    }
    if (entry.count >= RATE_LIMIT) {
        return res.status(429).json({ error: 'Too many requests. Please wait a moment.' });
    }
    entry.count++;
    next();
};

// Load multiple keys from the .env file and split them into an array
const apiKeys = process.env.GEMINI_API_KEYS ? process.env.GEMINI_API_KEYS.split(',') : [];
let currentKeyIndex = 0; // Keeps track of which key we are currently using

app.post('/chat', rateLimiter, async (req, res) => {
    // Safety check
    if (apiKeys.length === 0) {
        return res.status(500).json({ error: "Server Error: No API keys configured." });
    }

    const { prompt, history, language } = req.body;

    const structuredPrompt = `
    Language to respond in: ${language === 'en' ? 'English' : 'Khmer'}
    
    Recent Conversation History:
    ${history}
    
    User's New Question:
    ${prompt}
    `;

    let attempts = 0;

    // 🌟 SMART KEY ROTATION ENGINE 🌟
    while (attempts < apiKeys.length) {
        try {
            // Initialize Gemini with the current active key
            const genAI = new GoogleGenerativeAI(apiKeys[currentKeyIndex]);
            const model = genAI.getGenerativeModel({ 
                model: "gemini-2.5-flash",
                systemInstruction: "You are 'Design Master', a highly professional Graphic Design AI assistant. You specialize in the Affinity Suite (Photo, Designer, Publisher) on iPad, graphic design theory, and photo manipulation. Keep answers structured, friendly, and strictly related to design. Do not use Markdown LaTeX."
            });

            // Call the API
            const result = await model.generateContent(structuredPrompt);
            const aiResponse = result.response.text();

            // ✅ SUCCESS: Send response and exit the loop
            return res.json({ reply: aiResponse });

        } catch (error) {
            // Check if the error is a Rate Limit (429) or Quota exhaustion
            const isRateLimit = error.status === 429 || 
                                (error.message && (error.message.includes('429') || error.message.toLowerCase().includes('quota')));

            if (isRateLimit) {
                // ⚠️ FAILED: Limit reached. Switch to the next key and loop again!
                console.warn(`⚠️ Key ${currentKeyIndex + 1} hit rate limit. Switching to next key...`);
                currentKeyIndex = (currentKeyIndex + 1) % apiKeys.length; 
                attempts++;
            } else {
                // 🛑 FAILED: This is a different error (e.g., bad prompt, safety block). 
                console.error("Gemini API Error:", error);
                return res.status(500).json({ error: "Backend AI Error: " + error.message });
            }
        }
    }

    // ❌ FAILED: The loop finished and ALL keys in your array are exhausted
    return res.status(429).json({ 
        error: language === 'en' 
            ? "Servers are currently extremely busy. Please try again in a minute." 
            : "ម៉ាស៊ីនមេកំពុងមមាញឹកខ្លាំង។ សូមព្យាយាមម្ដងទៀតនៅមួយនាទីក្រោយ។" 
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Affinity AI Backend running on port ${PORT} with ${apiKeys.length} API keys loaded.`);
});