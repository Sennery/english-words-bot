import TelegramBot from 'node-telegram-bot-api';
import wordsService from './utils/wordsService.js';
import usersService from './utils/usersService.js';
import initIntervals from './utils/intervals.js';
import { getStage, getNextStage } from './utils/stages.js';

const token = ;
const bot = new TelegramBot(token, {polling: true});

initIntervals(bot);

bot.on('message', (msg) => {
    const userData = {
        id: msg.chat.id,
        username: msg.chat.username
    };
    const user = usersService.getUser(userData);

    const stage = getStage(user.stage);
    const nextStage = stage.handle(bot, msg, user);
    if (nextStage) {
        getStage(nextStage).onSwitchStage(bot, msg, user);
    }
});

bot.on("polling_error", console.log);