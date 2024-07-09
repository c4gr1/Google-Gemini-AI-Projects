import dotenv from "dotenv";  // Çevresel değişkenleri yüklemek için dotenv kütüphanesini içe aktarır
import * as fs from "fs";  // Dosya sistemi modülünü içe aktarır
import { GoogleGenerativeAI } from "@google/generative-ai";  // Google Generative AI kütüphanesini içe aktarır
import fetch from "node-fetch";  // fetch fonksiyonunu node ortamında kullanabilmek için node-fetch kütüphanesini içe aktarır

dotenv.config({ path: '.env.local' });  // .env.local dosyasından çevresel değişkenleri yükler

globalThis.fetch = fetch;  // fetch fonksiyonunu global olarak tanımlar

const genAI = new GoogleGenerativeAI(process.env.API_KEY);  // Google Generative AI nesnesini oluşturur, API anahtarını kullanarak

function fileToGenerativePart(path, mimeType) {
    return {
        inlineData: {
            data: Buffer.from(fs.readFileSync(path)).toString("base64"),  // Dosyayı okuyup base64 formatına dönüştürür
            mimeType,  // Dosyanın MIME tipini belirler
        },
    };
}

async function run() {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });  // Google Generative AI modelini alır

    const prompt = "What is the difference between these two images";  // AI modeline verilecek giriş metni

    const imageParts = [
        fileToGenerativePart("hand.jpeg", "image/jpeg"),
        fileToGenerativePart("paper.jpeg", "image/jpeg")
    ];  // Görselleri base64 formatına dönüştürüp MIME tipi ile birlikte AI modeline hazırlar

    try {
        const result = await model.generateContent([prompt, ...imageParts]);  // AI modelinden içerik oluşturmasını ister
        const response = await result.response;  // AI modelinden yanıt alır
        const text = response.text();  // Yanıtın metin içeriğini alır
        console.log(text);  // Yanıtı konsola yazdırır
    } catch (error) {
        console.error("Error: ", error);  // Hata olursa hatayı konsola yazdırır
    }
}

run();  // Programı çalıştırır
