const Discord = require('discord.js');
const { Client, GatewayIntentBits } = require('discord.js');
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyB0b5Shl4QLz3ZkU3hF4OvARWZa-CX4qlk",
    authDomain: "bothds.firebaseapp.com",
    projectId: "bothds",
    storageBucket: "bothds.appspot.com",
    messagingSenderId: "142596566586",
    appId: "1:142596566586:web:d87fdc2fd42171642a4f03",
    measurementId: "G-K52SLHQVLP"
  };
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

// Парсинг данных из тела запроса
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 3000;

// Определяем статическую директорию для наших статических файлов
app.use(express.static(path.join(__dirname, 'public')));

// Определяем маршрут для отображения HTML страницы
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/start-bot', (req, res) => {
  const telegramToken = req.body.tk;
  const telegramChatId = req.body.tci;
  const discordToken = req.body.dt;

  // Создание экземпляра клиента Discord
const discordBot = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates]
});

// Создание экземпляра Telegram бота
const telegramBot = new TelegramBot(telegramToken);

// Функция отправки сообщения в Telegram
async function sendTelegramMessage(message) {
await telegramBot.sendMessage(telegramChatId, message);
}

// Обработчик события подключения нового пользователя к голосовому каналу
discordBot.on('voiceStateUpdate', async (oldState, newState) => {
if (newState.channel) {
// Отправка уведомления в Telegram
const message = `${newState.member.user.username} присоединился к голосовому каналу ${newState.channel.name}`;
await sendTelegramMessage(message);
}
});

// Запуск бота Discord
discordBot.login(discordToken);

  res.send('Bot запущен успешно!');
});

// Запускаем сервер
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});