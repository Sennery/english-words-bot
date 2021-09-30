import Data from './workWithData.js'

const USERS_PATH = 'data/users.json';

class UsersService extends Data {
    constructor() {
        super(USERS_PATH);
        this.users = super.readData();
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
            readedWords: []
        }

        super.writeData(this.users);
    }

    updateWords(id, newWords) {
        this.users[id].readedWords.push(...newWords);
        super.writeData(this.users);
    }

    deleteWords(id) {
        this.users[id].readedWords = [];
        super.writeData(this.users);
    }
}

export default new UsersService();