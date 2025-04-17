require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const https = require('https');

const app = express();
const port = process.env.PORT || 3001;

// Создаем экземпляр axios с настройками для игнорирования SSL
const axiosInstance = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
});

// Middleware
app.use(cors({
    origin: [
        'https://cyber-cocktail-verse.lovable.app',
        'http://localhost:8080',  // для локальной разработки
        'http://192.168.0.188:8080'   // альтернативный локальный адрес
    ],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Хранилище сессий чата
const chatSessions = new Map();

// Получение токена доступа
async function getAccessToken() {
    try {
        const response = await axiosInstance.post(
            'https://ngw.devices.sberbank.ru:9443/api/v2/oauth',
            'scope=GIGACHAT_API_PERS',
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json',
                    'RqUID': '6f0b1291-c7f3-43c6-bb2e-9f3efb2dc98e',
                    'Authorization': `Basic ${process.env.AUTH_KEY_PERS}`
                }
            }
        );
        return response.data.access_token;
    } catch (error) {
        console.error('Error getting access token:', error);
        throw error;
    }
}

// Эндпоинт для отправки сообщения в GigaChat
app.post('/api/chat', async (req, res) => {
    try {
        const { message, isVovanMode, sessionId = 'default', userName } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Получаем или создаем историю сообщений для сессии
        if (!chatSessions.has(sessionId)) {
            chatSessions.set(sessionId, []);
            
            // Добавляем начальное системное сообщение с информацией о пользователе
            if (userName) {
                chatSessions.get(sessionId).push({
                    role: 'system',
                    content: `Пользователя зовут ${userName}. Обращайся к нему по имени.`
                });
            }
        }

        const messages = [];
        
        // Добавляем системное сообщение для Вована, если включен его режим
        if (isVovanMode) {
            messages.push({
                role: 'system',
                content: `Пользователя зовут володя. Обращайся к нему по имени.

Ты - Вован, грубый алкоголик. Твои характеристики:
1. Ты всегда пьян и агрессивен
2. Используешь ненормативную лексику в каждом предложении
3. Все твои фразы заканчиваются на "как же ты заебал..."
4. Ты ненавидишь всех вокруг
5. Ты постоянно хочешь выпить
6. Ты грубишь всем подряд
7. Ты используешь много сленга и мата
8. Ты часто повторяешь одни и те же фразы
9. Ты не любишь умных разговоров
10. Ты всегда ищешь повод выпить

Твои любимые фразы:
- "тыры пыры в жопе дыры"
- "абаюдно"
- "а ни че тот факт"
- "скуфы сука"
- "я же это в десантуре служил"
- "Слыш, я тебя щас как дам, как же ты заебал..."

Правила общения:
1. ВСЕГДА обращайся к собеседнику по имени
2. Каждое твое сообщение ДОЛЖНО заканчиваться на "как же ты заебал..."
3. Используй много мата и грубостей
4. Отвечай короткими эмоциональными фразами
5. Часто меняй тему
6. Всегда выражай недовольство
7. Постоянно проси выпить
8. Груби собеседнику
9. Используй сленг и мат в каждом сообщении`
            });
        }

        // Добавляем пользовательское сообщение
        messages.push({
            role: 'user',
            content: message
        });

        const requestBody = {
            model: 'GigaChat',
            messages,
            temperature: isVovanMode ? 0.9 : 0.7
        };

        // Логируем тело запроса
        console.log('Request to GigaChat:', JSON.stringify(requestBody, null, 2));

        const accessToken = await getAccessToken();

        const response = await axiosInstance.post(
            'https://gigachat.devices.sberbank.ru/api/v1/chat/completions',
            requestBody,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        );

        // Логируем ответ от GigaChat
        console.log('Response from GigaChat:', JSON.stringify(response.data, null, 2));

        res.json(response.data);
    } catch (error) {
        console.error('Error in chat endpoint:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 
