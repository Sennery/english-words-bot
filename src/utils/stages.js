import usersService from './usersService.js';

const stages = {
    'start': {
        data: {
            regExp: /\/start/,
            message: 'Привет! Чтобы начать пользоваться ботом необходимо ответить на несколько вопросов.',
            wrongValueMessage: 'Неверное значение...',
        },
        onSuccess(bot, msg, user) {
            const nextStage = getNextStage(user.stage);
            usersService.updateStage(user, nextStage);

            return nextStage;
        },
        onError(bot, msg, user) {
            bot.sendMessage(user.id, this.data.wrongValueMessage);
        },
        onSwitchStage(bot, msg, user) {
            bot.sendMessage(user.id, this.data.message);
        }
    },
    'choose_timeout': {
        data: {
            regExp: /^\d+$/,
            message: 'Для начала, с каким перерывом ты хочешь получать слова? (в днях)',
            wrongValueMessage: 'Неверное значение... Введи число',
        },
        onSuccess(bot, msg, user) {
            const nextStage = getNextStage(user.stage);
            usersService.updateStage(user, nextStage);
            usersService.updateTimeout(user, msg.text);
            
            return nextStage;
        },
        onError(bot, msg, user) {
            bot.sendMessage(user.id, this.data.wrongValueMessage);
        },
        onSwitchStage(bot, msg, user) {
            bot.sendMessage(user.id, this.data.message);
        }
    },
    'choose_words_count' : {
        data: {
            regExp: /^\d+$/,
            message: 'Сколько слов за раз нужно присылать?',
            wrongValueMessage: 'Неверное значение... Введи число',
        },
        onSuccess(bot, msg, user) {
            const nextStage = getNextStage(user.stage);
            usersService.updateStage(user, nextStage);
            usersService.updateCountWords(user, msg.text);
            
            return nextStage;
        },
        onError(bot, msg, user) {
            bot.sendMessage(user.id, this.data.wrongValueMessage);
        },
        onSwitchStage(bot, msg, user) {
            bot.sendMessage(user.id, this.data.message);
        }
    },
    'working': {
        data: {
            regExp: /\/start/,
            message: 'Привет! Чтобы начать пользоваться ботом необходимо ответить на несколько вопросов.',
            wrongValueMessage: 'Неверное значение...',
        },
        onSuccess(bot, msg, user) {
            //const nextStage = getNextStage(user.stage);
            //usersService.updateStage(user, nextStage);
            
            //return nextStage;
        },
        onError(bot, msg, user) {
            bot.sendMessage(user.id, this.data.wrongValueMessage);
        },
        onSwitchStage(bot, msg, user) {
            bot.sendMessage(user.id, this.data.message);
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
        onError(bot, msg, user) {
            bot.sendMessage(user.id, this.data.wrongValueMessage);
        },
        onSwitchStage(bot, msg, user) {
            bot.sendMessage(user.id, this.data.message);
        }
    }
};

for (let prop in stages) {
    stages[prop].handle = function(bot, msg, user) {
        const regTest = this.data.regExp.test(msg.text);
        if (regTest) {
            return this.onSuccess(bot, msg, user);
        } else {
            return this.onError(bot, msg, user);
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