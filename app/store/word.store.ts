import { observable } from 'mobx';
import axios from 'axios';

export interface IWordStore {
    getWord(numberOfLetters: number);
    getMeaning(word: string);
}

class  WordStore implements IWordStore {
    @observable public word: Array<{ value: string, isMasked: boolean }>;
    @observable public letters: Array<string>;
    @observable public isCorrect: boolean;
    @observable public meaning: string = 'Currently not available!';

    private MIN_LENGTH: number = 3;
    private MAX_LENGTH: number = 10;

    constructor() { }

    public getWord(numberOfLetters: number = this.MIN_LENGTH): void {
        axios.get('http://www.setgetgo.com/randomword/get.php', {
            params: {
                len: numberOfLetters
            }
        }).then((response: any) => {
            console.log(response.data);
            const word = typeof response.data === 'string' ? response.data.toUpperCase() : response.data;
            this.letters = [];
            this.word = word.split('').map(letter => {
                const isMasked: boolean = Math.random() > 0.5;
                this.letters.push(isMasked ? '' : letter);

                return {
                    value: letter,
                    isMasked: isMasked
                };
            });
            // this.getMeaning(this.word);
        });
    }

    public getMeaning(word: string): void {
        if (word === '') {
            return null;
        }

        axios.get('https://od-api.oxforddictionaries.com:443/api/v1/entries/en/'.concat(word),
            {
                params: {
                    'app_id': 'dcbd677e',
                    'app_key': 'b1b8a2ecd23ecc58562e33febcb3352b'
                }
            })
            .then((response: any) => {
                if (response.data &&
                    response.data.results &&
                    response.data.results.length > 0 &&
                    response.data.results.lexicalEntries &&
                    response.data.results[0].lexicalEntries.length > 0 &&
                    response.data.results.lexicalEntries[0].entries &&
                    response.data.results.lexicalEntries[0].entries.length > 0 &&
                    response.data.results.lexicalEntries[0].entries[0].senses &&
                    response.data.results.lexicalEntries[0].entries[0].senses[0].definitions &&
                    response.data.results.lexicalEntries[0].entries[0].senses[0].definitions.length > 0) {

                    this.meaning = response.data.results.lexicalEntries[0].entries[0].senses[0].definitions[0];
                }
            });
    }

    public getRandomWordLength(): number {
        return Math.floor(Math.random() * (this.MAX_LENGTH - this.MIN_LENGTH + 1)) + this.MIN_LENGTH;
    }

    public onLetterChange(index: number, event: any): void {
        this.letters[index] = typeof event.target.value === 'string' ? event.target.value.toUpperCase() : event.target.value;
        this.checkWord();
    }

    public checkWord(): void {
        this.isCorrect = this.letters.every((letter, index): boolean => {
            return this.word[index].value === letter;
        });
    }
}

export default new WordStore();