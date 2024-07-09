import dotenv from "dotenv";  // Çevresel değişkenleri yüklemek için dotenv kütüphanesini içe aktarır
dotenv.config({ path: '.env.local' });  // .env.local dosyasından çevresel değişkenleri yükler
import readline from "readline";  // Kullanıcıdan terminal üzerinden giriş almak için readline kütüphanesini içe aktarır
import { GoogleGenerativeAI } from "@google/generative-ai";  // Google Generative AI kütüphanesini içe aktarır
import fetch from "node-fetch";  // fetch fonksiyonunu node ortamında kullanabilmek için node-fetch kütüphanesini içe aktarır

globalThis.fetch = fetch;  // fetch fonksiyonunu global olarak tanımlar

const genAI = new GoogleGenerativeAI(process.env.API_KEY);  // Google Generative AI nesnesini oluşturur, API anahtarını kullanarak

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});  // Kullanıcıdan terminal üzerinden giriş almak için readline arayüzü oluşturur

async function run() {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });  // Google Generative AI modelini alır

    const chat = model.startChat({
        history: [],
        generationConfig: {
            maxOutputTokens: 500,
        },
    });  // Yeni bir sohbet başlatır, maksimum çıktı token sayısını belirler

    async function askAndRespond() {
        r1.question("You: ", async (msg) => {  // Kullanıcıdan mesaj alır
            if (msg.toLowerCase() === "exit") {  // Kullanıcı "exit" yazarsa
                r1.close();  // Sohbeti kapatır
            } else {
                try {
                    const result = await chat.sendMessage(msg);  // Mesajı AI modeline gönderir
                    const response = await result.response;  // AI modelinden yanıt alır
                    const text = await response.text();  // Yanıtın metin içeriğini alır
                    console.log("AI: ", text);  // Yanıtı konsola yazdırır
                    askAndRespond();  // Yeniden kullanıcıdan mesaj alır
                } catch (error) {
                    console.error("Error: ", error);  // Hata olursa hatayı konsola yazdırır
                    askAndRespond();  // Yeniden kullanıcıdan mesaj alır
                }
            }
        });
    }

    askAndRespond();  // İlk kez kullanıcıdan mesaj alır
}

run();  // Programı çalıştırır
