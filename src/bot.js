import TelegramBot from 'node-telegram-bot-api';
import wordsService from './utils/wordsService.js';

const token = '2045875519:AAEZoxpIYCow7TGg4JBsROx3EPj6CfdUbjA';
const bot = new TelegramBot(token, {polling: true});

const botMsgOptions = {
    parse_mode: 'Markdown'
}

bot.on('message', (msg) => {
    const userData = {
        id: msg.chat.id,
        username: msg.chat.username
    };

    const words = wordsService.getWords(userData);
    if (words.length == 0) {
        bot.sendMessage(userData.id, 'Эй, *' + userData.username + '*, похоже ты уже выучил все доступные слова... 😎', botMsgOptions);
        return;
    }

    const resp = words.map( it => '*' + it.word + '* - ' + it.translate).join('\n');
    bot.sendMessage(userData.id, '📚 Слова для изучения на сегодня 📝\n' + resp, botMsgOptions);
});