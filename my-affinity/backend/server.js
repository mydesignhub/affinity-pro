import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Groq from 'groq-sdk';

// Load environment variables from the .env file
dotenv.config();

const app = express();

// Allow the frontend to talk to the backend
app.use(cors());
app.use(express.json());

// Initialize Groq AI with your secure key
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post('/chat', async (req, res) => {
    try {
        const { prompt, history, language } = req.body;

        // Give the AI its personality and rules
        const systemPrompt = `You are an expert AI assistant inside the "My Affinity" mobile app. 
        You specialize in teaching Graphic Design, Affinity Photo, and Affinity Designer software. 
        Keep your answers concise, friendly, highly professional, and format them nicely with emojis.
        The user is currently using the app in: ${language === 'km' ? 'Khmer' : 'English'}.
        If they speak Khmer, you must reply in natural Khmer.
        Here is the recent conversation history so you know what they are talking about:\n${history}`;

        // Call the Groq Llama 3 Model
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: prompt }
            ],
            model: 'llama-3.3-70b-versatile', // 🌟 The brand new, active Llama 3.3 model!
            temperature: 0.7,
            max_tokens: 1024,
        });

        // Send the AI's answer back to your frontend
        res.json({ reply: chatCompletion.choices[0]?.message?.content || "No response generated." });

    } catch (error) {
        console.error('Groq AI Error:', error);
        res.status(500).json({ error: 'Failed to communicate with AI', details: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 My Affinity Backend running successfully on http://localhost:${PORT}`);
});