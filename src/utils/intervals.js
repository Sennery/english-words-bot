import wordsService from './wordsService.js';
import usersService from './usersService.js';
import { getStage, getNextStage } from './stages.js';

function intervalHandler(bot) {
    const botMsgOptions = {
        parse_mode: 'Markdown'
    }

    const users = usersService.getAllUsers();
    for (let userId in users) {
        if (users[userId].stage != 'working') {
            return;
        }
        
        const words = wordsService.getWords(userId, users[userId].count);
        if (words.length == 0) {
            bot.sendMessage(userId, 'Эй, *' + userData.username + '*, похоже ты уже выучил все доступные слова... 😎', botMsgOptions);
            return;
        }

        const resp = words.map( it => '*' + it.word + '* - ' + it.translate).join('\n');
        bot.sendMessage(userId, '📚 Слова для изучения на сегодня 📝\n' + resp, botMsgOptions);
    }
}

function initIntervals(bot) {
    setInterval(() => intervalHandler(bot), 5000);
}

export default initIntervals;