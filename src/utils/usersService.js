import Data from './data.js'

const USERS_PATH = 'data/users.json';
const data = new Data(USERS_PATH);

class UsersService {
    constructor() {
        this.users = data.readData();
    }

    getUser(userData) {
        let user = this.users[userData.id];

        if (!user) {
            this.addUser(userData);
        }

        return {
            id: userData.id,
            ...this.users[userData.id]
        };
    }

    addUser(userData) {
        this.users[userData.id] = {
            username: userData.username,
            stage: 'start',
            readedWords: []
        }

        data.writeData(this.users);
    }

    getAllUsers() {
        return this.users;
    }

    updateWords(id, newWords) {
        this.users[id].readedWords.push(...newWords);
        data.writeData(this.users);
    }

    deleteWords(id) {
        this.users[id].readedWords = [];
        data.writeData(this.users);
    }

    updateStage(userData, stage) {
        this.users[userData.id].stage = stage;
        data.writeData(this.users);
    }

    updateTimeout(userData, timeout) {
        this.users[userData.id].timeout = timeout;
        data.writeData(this.users);
    }

    updateCountWords(userData, count) {
        this.users[userData.id].count = count;
        data.writeData(this.users);
    }
}

export default new UsersService();