require('dotenv').config();
const axios = require('axios');
const https = require('https');

// Создаем экземпляр axios с настройками для игнорирования SSL
const axiosInstance = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
});

async function testGigaChat() {
    try {
        // Получаем токен доступа
        const tokenResponse = await axiosInstance.post(
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

        const accessToken = tokenResponse.data.access_token;
        console.log('Access token получен успешно');

        // Отправляем тестовое сообщение
        const chatResponse = await axiosInstance.post(
            'https://gigachat.devices.sberbank.ru/api/v1/chat/completions',
            {
                model: 'GigaChat',
                messages: [
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
                    },
                    {
                        role: 'user',
                        content: 'Привет! Как дела?'
                    }
                ],
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

        console.log('Ответ от GigaChat:');
        console.log(JSON.stringify(chatResponse.data, null, 2));
    } catch (error) {
        console.error('Ошибка при тестировании API:');
        if (error.response) {
            console.error('Статус ошибки:', error.response.status);
            console.error('Данные ошибки:', error.response.data);
        } else {
            console.error('Сообщение об ошибке:', error.message);
        }
    }
}

testGigaChat(); 
