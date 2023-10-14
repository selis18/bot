const Discord = require('discord.js');
const { Client, GatewayIntentBits } = require('discord.js');
const TelegramBot = require('node-telegram-bot-api');
<<<<<<< HEAD:public/bot.js
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
=======
>>>>>>> parent of dd9dd83 (add html):bot.js

// Токен вашего Telegram бота
const telegramToken = '6313488393:AAEWBEywIlGOCDC-mk4Xq7W8WYSOUcMjKAU';

// ID чата, в который будут отправляться уведомления
const telegramChatId = '-988496493';

// Токен вашего Discord бота
const discordToken = 'MTE2MjM1OTMwNjgzMDc0NTY4MA.GdBG05.fsA3lciHA6N2SRHAC12xZ3Y03PfKVFOw2AGIIg';

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
