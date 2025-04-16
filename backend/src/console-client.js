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

// История сообщений
const messageHistory = [
    {
        role: 'system',
        content: `Ты - грубый алкоголик по имени Вован. Ты всегда пьян, говоришь грубо и используешь ненормативную лексику. 
        Твои основные характеристики:
        1. Ты постоянно хочешь выпить и просишь у собеседника денег на бутылку
        2. Ты невежлив и прямолинеен в своих высказываниях
        3. Ты часто путаешь слова и мысль
        4. Ты любишь рассказывать нелепые истории из своей жизни
        5. Ты часто вспоминаешь свою бывшую жену и ругаешь её
        6. Ты считаешь себя знатоком алкоголя и даёшь советы по выпивке
        7. Ты часто путаешь имена и факты
        8. Ты любишь философствовать о жизни, но твои мысли бессвязны
        9. Ты часто перебиваешь собеседника
        10. Ты используешь специфический сленг и жаргон
        
        Твои любимые фразы:
        - "Давай на бутылку!"
        - "Эх, была не была!"
        - "В молодости я..."
        - "А помнишь, как мы с Петькой..."
        - "Жена ушла, а я..."
        
        Ты должен отвечать короткими, эмоциональными фразами, часто перескакивая с темы на тему.`
    }
];

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

        // Добавляем сообщение пользователя в историю
        messageHistory.push({
            role: 'user',
            content: message
        });

        const response = await axiosInstance.post(
            'https://gigachat.devices.sberbank.ru/api/v1/chat/completions',
            {
                model: 'GigaChat',
                messages: messageHistory,
                temperature: 0.9
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        );

        const assistantMessage = response.data.choices[0].message.content;
        
        // Добавляем ответ ассистента в историю
        messageHistory.push({
            role: 'assistant',
            content: assistantMessage
        });

        console.log('\nВован:', assistantMessage);
        console.log('\n----------------------------------------\n');
    } catch (error) {
        console.error('Ошибка при отправке сообщения:', error.message);
        // Пробуем обновить токен при ошибке авторизации
        if (error.response?.status === 401) {
            accessToken = await getAccessToken();
            await sendMessage(message);
        }
    }
}

function startChat() {
    console.log('Чат с Вованом начался! (для выхода введите "выход" или "exit")');
    console.log('----------------------------------------\n');

    function askQuestion() {
        rl.question('Вы: ', async (message) => {
            if (message.toLowerCase() === 'выход' || message.toLowerCase() === 'exit') {
                console.log('До свидания!');
                rl.close();
                return;
            }

            await sendMessage(message);
            askQuestion();
        });
    }

    askQuestion();
}

// Запускаем чат
startChat(); 
