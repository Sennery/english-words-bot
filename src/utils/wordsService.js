import Data from './data.js'
import usersService from './usersService.js';

const WORDS_PATH = 'data/words.json';

class WordsService extends Data{
    constructor() {
        super(WORDS_PATH);
        this.words = this.readData();
    }

    getRandomWord(wordsList = null) {
        const list = wordsList || this.words;
        const randomNumber = Math.floor(Math.random() * list.length);

        return list[randomNumber];
    }

    getWords(userData, needCount = 20) {
        const user = usersService.getUser(userData);
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
        usersService.updateWords(user.id, newReadedWords);

        return result;
    }
}

export default new WordsService();