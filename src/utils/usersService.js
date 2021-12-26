import Data from './data.js'

const USERS_PATH = 'data/users.json';
const data = new Data(USERS_PATH);

class UsersService {
    constructor() {
        this.users = data.readData();
    }

    getUser(userId) {
        let user = this.users[userId];

        if (!user) {
            return;
        }

        return {
            id: userId,
            ...user
        };
    }

    addUser(userData) {
        this.users[userData.id] = {
            username: userData.username,
            stage: 'start',
            readedWords: []
        }

        data.writeData(this.users);

        return {
            id: userData.id,
            ...this.users[userData.id]
        };
    }

    getAllUsers() {
        return this.users;
    }

    updateWords(userId, newWords) {
        this.users[userId].readedWords.push(...newWords);
        data.writeData(this.users);
    }

    deleteWords(userId) {
        this.users[userId].readedWords = [];
        data.writeData(this.users);
    }

    updateStage(userId, stage) {
        this.users[userId].stage = stage;
        data.writeData(this.users);
    }

    updateTimeout(userId, timeout) {
        this.users[userId].timeout = timeout;
        data.writeData(this.users);
    }

    updateCountWords(userId, count) {
        this.users[userId].count = count;
        data.writeData(this.users);
    }
}

export default new UsersService();