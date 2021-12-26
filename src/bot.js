import TelegramBot from 'node-telegram-bot-api';
import usersService from './utils/usersService.js';
import initIntervals from './utils/intervals.js';
import { getStage } from './utils/stages.js';

const token = '';
const bot = new TelegramBot(token, {polling: true});

initIntervals(bot);

bot.on('message', (msg) => {
    let user = usersService.getUser(msg.chat.id);
    if (!user) {
        const userData = {
            id: msg.chat.id,
            username: msg.chat.username
        };
        user = usersService.addUser(userData);
    }

    const stage = getStage(user.stage);
    const nextStage = stage.handle(bot, msg, msg.chat.id);
    if (nextStage) {
        getStage(nextStage).onSwitchStage(bot, msg, msg.chat.id);
    }
});

bot.on("polling_error", console.log);