import Data from './data.js'
import usersService from './usersService.js';

const WORDS_PATH = 'data/words.json';
const data = new Data(WORDS_PATH);

class WordsService {
    constructor() {
        this.words = data.readData();
    }

    getRandomWord(wordsList = null) {
        const list = wordsList || this.words;
        const randomNumber = Math.floor(Math.random() * list.length);

        return list[randomNumber];
    }

    getWords(userId, needCount = 20) {
        const user = usersService.getUser(userId);
        const currentWordsList = this.words.filter( (word) => !user.readedWords.includes(word.id));        

        let result = [];
        let count = 0;

        if (currentWordsList.length <= needCount) {
            result.push(...currentWordsList);
            count = needCount;
        }
        
        while (needCount > count) {
            const randomWord = this.getRandomWord(currentWordsList);
            const inResult = result.includes(randomWord);

            if (inResult) {
                continue;
            }

            result.push(randomWord);
            count++;
        }

        const newReadedWords = result.map( it => it.id);
        usersService.updateWords(userId, newReadedWords);

        return result;
    }
}

export default new WordsService();