import usersService from './usersService.js';

const stages = {
    'start': {
        data: {
            regExp: /\/start/,
            message: 'Привет! Чтобы начать пользоваться ботом необходимо ответить на несколько вопросов.',
            wrongValueMessage: 'Неверное значение...',
        },
        onSuccess(bot, msg, userId) {
            const user = usersService.getUser(userId);        
            const nextStage = getNextStage(user.stage);
            usersService.updateStage(user.id, nextStage);

            return nextStage;
        },
        onError(bot, msg, userId) {
            bot.sendMessage(userId, this.data.wrongValueMessage);
        },
        onSwitchStage(bot, msg, userId) {
            bot.sendMessage(userId, this.data.message);
        }
    },
    'choose_timeout': {
        data: {
            regExp: /^\d+$/,
            message: 'Для начала, с каким перерывом ты хочешь получать слова? (в днях)',
            wrongValueMessage: 'Неверное значение... Введи число',
        },
        onSuccess(bot, msg, userId) {
            const user = usersService.getUser(userId);
            const nextStage = getNextStage(user.stage);
            usersService.updateStage(user.id, nextStage);
            usersService.updateTimeout(user.id, msg.text);
            
            return nextStage;
        },
        onError(bot, msg, userId) {
            bot.sendMessage(userId, this.data.wrongValueMessage);
        },
        onSwitchStage(bot, msg, userId) {
            bot.sendMessage(userId, this.data.message);
        }
    },
    'choose_words_count' : {
        data: {
            regExp: /^\d+$/,
            message: 'Сколько слов за раз нужно присылать?',
            wrongValueMessage: 'Неверное значение... Введи число',
        },
        onSuccess(bot, msg, userId) {
            const user = usersService.getUser(userId);
            const nextStage = getNextStage(user.stage);
            usersService.updateStage(user.id, nextStage);
            usersService.updateCountWords(user.id, msg.text);
            
            return nextStage;
        },
        onError(bot, msg, userId) {
            bot.sendMessage(userId, this.data.wrongValueMessage);
        },
        onSwitchStage(bot, msg, userId) {
            bot.sendMessage(userId, this.data.message);
        }
    },
    'working': {
        data: {
            regExp: /\/start/,
            wrongValueMessage: 'Неверное значение...',
        },
        onSuccess(bot, msg, user) {
            //const nextStage = getNextStage(user.stage);
            //usersService.updateStage(user, nextStage);
            
            //return nextStage;
        },
        onError(bot, msg, userId) {
            bot.sendMessage(userId, this.data.wrongValueMessage);
        },
        onSwitchStage(bot, msg, userId) {
            bot.sendMessage(userId, this.data.message);
        }
    },
    'words_ended': {
        data: {
            regExp: /\/start/,
            message: 'Привет! Чтобы начать пользоваться ботом необходимо ответить на несколько вопросов.',
            wrongValueMessage: 'Неверное значение...',
        },
        onSuccess(bot, msg, user) {
            bot.sendMessage(user.id, 'Успех');

            const nextStage = getNextStage(user.stage);
            usersService.updateStage(user, nextStage);
            
            return 'start';
        },
        onError(bot, msg, userId) {
            bot.sendMessage(userId, this.data.wrongValueMessage);
        },
        onSwitchStage(bot, msg, userId) {
            bot.sendMessage(userId, this.data.message);
        }
    }
};

for (let prop in stages) {
    stages[prop].handle = function(bot, msg, userId) {
        const regTest = this.data.regExp.test(msg.text);        
        let nextStage;
        if (regTest) {
            nextStage = this.onSuccess?.(bot, msg, userId);
        } else {
            nextStage = this.onError?.(bot, msg, userId);
        }

        if (nextStage) {
            getStage(nextStage).onSwitchStage?.(bot, msg, msg.chat.id);
        }
    }
}

function getStage(stage) {
    return stages[stage];
}

function getNextStage(stage) {
    let keys = Object.keys(stages);
    let nextIndex = keys.indexOf(stage) + 1;
    let nextStage = keys[nextIndex];
    return nextStage;
}

export { getStage, getNextStage };