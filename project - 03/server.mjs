import express from 'express';
import cors from 'cors';
import fetch, { Headers } from 'node-fetch';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config({ path: '.env.local' });

const PORT = 8000;

globalThis.fetch = fetch;  // fetch fonksiyonunu global olarak tanımlar
globalThis.Headers = Headers;  // Headers sınıfını global olarak tanımlar

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.post('/gemini', async (req, res) => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const chat = model.startChat({
        history: req.body.history
    });
    const msg = req.body.message;
    try {
        const result = await chat.sendMessage(msg);
        const response = await result.response;
        const text = await response.text();
        res.send(text);
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).send("An error occurred.");
    }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
