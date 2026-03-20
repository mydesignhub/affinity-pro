const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 🌟 FIX: Load multiple keys from the .env file and split them into an array
const apiKeys = process.env.GEMINI_API_KEYS ? process.env.GEMINI_API_KEYS.split(',') : [];
let currentKeyIndex = 0; // Keeps track of which key we are currently using

app.post('/chat', async (req, res) => {
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
    // Try keys one by one. Stop when successful, or when all keys are exhausted.
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
                // Do not waste other keys, just return the error to the user.
                console.error("Gemini API Error:", error);
                return res.status(500).json({ error: "Backend AI Error: " + error.message });
            }
        }
    }

    // ❌ FAILED: The loop finished and ALL keys in your array are exhausted
    return res.status(429).json({ 
        error: lang === 'en' 
            ? "Servers are currently extremely busy. Please try again in a minute." 
            : "ម៉ាស៊ីនមេកំពុងមមាញឹកខ្លាំង។ សូមព្យាយាមម្ដងទៀតនៅមួយនាទីក្រោយ។" 
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Affinity AI Backend running on port ${PORT} with ${apiKeys.length} API keys loaded.`);
});