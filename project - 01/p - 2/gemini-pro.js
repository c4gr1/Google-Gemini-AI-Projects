import dotenv from "dotenv";  // Çevresel değişkenleri yüklemek için dotenv kütüphanesini içe aktarır
import { GoogleGenerativeAI } from "@google/generative-ai";  // Google Generative AI kütüphanesini içe aktarır
import fetch from "node-fetch";  // fetch fonksiyonunu node ortamında kullanabilmek için node-fetch kütüphanesini içe aktarır

dotenv.config({ path: '.env.local' });  // .env.local dosyasından çevresel değişkenleri yükler

globalThis.fetch = fetch;  // fetch fonksiyonunu global olarak tanımlar

const genAI = new GoogleGenerativeAI(process.env.API_KEY);  // Google Generative AI nesnesini oluşturur, API anahtarını kullanarak

async function run() {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });  // Google Generative AI modelini alır

    const prompt = "Write a sonnet about a programmer's life, but also make it rhyme.";  // AI modeline verilecek giriş metni

    try {
        const result = await model.generateContent(prompt);  // AI modelinden içerik oluşturmasını ister
        const response = await result.response;  // AI modelinden yanıt alır
        const text = response.text();  // Yanıtın metin içeriğini alır
        console.log(text);  // Yanıtı konsola yazdırır
    } catch (error) {
        console.error("Error: ", error);  // Hata olursa hatayı konsola yazdırır
    }
}

run();  // Programı çalıştırır
