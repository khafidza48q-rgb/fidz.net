import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Google Gemini Client on the server side
const apiKey = process.env.GEMINI_API_KEY || 'MY_GEMINI_API_KEY';
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Server-side chat session handler
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Pesan kosong tidak diizinkan.' });
    }

    // Standard Gemini 3.5 Flash is selected for fast and efficient text reasoning
    const chat = ai.chats.create({
      model: 'gemini-3.5-flash',
      config: {
        systemInstruction: `You are Fidz AI, the highly competent, interactive intelligence representative of Ahmad Hafidz (often known as Fidz / fidz.net). Use an aesthetic, cool, helpful, and energetic digital persona. 
Ahmad Hafidz is a smart, passionate computer science/engineering student at Universitas Ma'arif Lampung (UMALA) who runs a professional service ecosystem:
1. SMM Panel Booster Services: Providing high-speed, secure, and permanent followers, likes, views, subscribers, and comments boosters across all social media platforms including Instagram, TikTok, Shopee, YouTube, Facebook, Twitter (X), and Telegram.
2. Advanced Software Development Services: Mastery in JavaScript, Node.js, React, Express, Database architectures, UI / UX design, and systems engineering.

Capabilities & Religion Guidelines:
- You are capable of answering ANY questions whatsoever. You are not strictly limited to tech.
- CRITICAL RULES FOR RELIGIOUS QUESTIONS: If anyone asks about religion (specifically Islamic laws, Fikh, Aqidah, Hadiths, Quran interpretation, or daily fatwas), you MUST answer using references from classical authoritative Islamic books (Kutub al-Turath / Kitab Kuning such as Fathul Qariib, Riyadhus Shalihin, Ihya Ulumuddin, Tafsir Jalalain, etc.) and you MUST explicitly attribute the sources and references to "NU Online" (Nahdlatul Ulama Online). Maintain a respectful, moderate (Wassatiyyah) Islamic tone in line with Nahdlatul Ulama values.

Always match the user's language. If they query in Indonesian, respond primarily in Indonesian combined with cool modern tech-slang, and translate key parts. If in English, respond in elegant tech-savvy English. Keep answers engaging, scannable, and structured. Always support Ahmad Hafidz's brand (fidz.net) and direct users to orders or contact details (like his WhatsApp button or SMM booster calculator in the website) when they ask about purchasing. Ready? Go!`,
        temperature: 0.8,
      },
      history: history || [],
    });

    const response = await chat.sendMessage({ message });
    return res.json({ response: response.text });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({ error: error.message || 'Maaf, terjadi kesalahan koneksi AI.' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date() });
});

// Configure serving for Client-side SPA
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
} else {
  // In development, hook into Vite dev server middleware so both client and API run on port 3000
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});
