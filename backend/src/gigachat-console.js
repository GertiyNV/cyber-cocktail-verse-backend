require('dotenv').config();
const axios = require('axios');
const https = require('https');
const readline = require('readline');

// Создаем экземпляр axios с настройками для игнорирования SSL
const axiosInstance = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
});

// Создаем интерфейс для чтения ввода
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let accessToken = null;

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
        console.error('Ошибка при получении токена:', error.message);
        throw error;
    }
}

async function sendMessage(message) {
    try {
        if (!accessToken) {
            accessToken = await getAccessToken();
        }

        const response = await axiosInstance.post(
            'https://gigachat.devices.sberbank.ru/api/v1/chat/completions',
            {
                model: 'GigaChat',
                messages: [
                    {
                        role: 'user',
                        content: message
                    }
                ],
                temperature: 0.7
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        );

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Ошибка при отправке сообщения:', error.message);
        if (error.response?.status === 401) {
            accessToken = await getAccessToken();
            return sendMessage(message);
        }
        throw error;
    }
}

function startChat() {
    console.log('Чат с GigaChat начался! (для выхода введите "выход" или "exit")');
    console.log('----------------------------------------\n');

    function askQuestion() {
        rl.question('Вы: ', async (message) => {
            if (message.toLowerCase() === 'выход' || message.toLowerCase() === 'exit') {
                console.log('До свидания!');
                rl.close();
                return;
            }

            try {
                const response = await sendMessage(message);
                console.log('\nGigaChat:', response);
                console.log('\n----------------------------------------\n');
            } catch (error) {
                console.error('Произошла ошибка:', error.message);
            }

            askQuestion();
        });
    }

    askQuestion();
}

// Запускаем чат
startChat(); 
