import dotenv from "dotenv";  // Çevresel değişkenleri yüklemek için dotenv kütüphanesini içe aktarır
dotenv.config({ path: '.env.local' });  // .env.local dosyasından çevresel değişkenleri yükler
import http from 'http';  // HTTP sunucusu oluşturmak için http modülünü içe aktarır
import { GoogleGenerativeAI } from '@google/generative-ai';  // Google Generative AI kütüphanesini içe aktarır
import fetch from 'node-fetch';  // fetch fonksiyonunu node ortamında kullanabilmek için node-fetch kütüphanesini içe aktarır

globalThis.fetch = fetch;  // fetch fonksiyonunu global olarak tanımlar

// Google Generative AI nesnesini oluşturur, API anahtarını kullanarak
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const server = http.createServer(async (req, res) => {
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // gelen veriyi birleştir
        });
        req.on('end', async () => {
            try {
                // Yapay zeka sohbet modelini kullanarak cevap üret
                const model = genAI.getGenerativeModel({ model: "gemini-pro" });
                const chat = model.startChat({
                    history: [],
                    generationConfig: {
                        maxOutputTokens: 500,
                    },
                });
                const result = await chat.sendMessage(body);
                const response = await result.response;
                const text = await response.text();  // Yanıtın metin içeriğini al

                // Cevabı geri gönder
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end(text);
            } catch (error) {
                console.error("Error: ", error);  // Hata olursa hatayı konsola yazdırır
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end("Internal Server Error");
            }
        });
    } else {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Bu sunucu sadece POST isteklerini kabul eder.');
    }
});

const port = 3000;
const hostname = 'localhost';
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
