import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import { v4 as uuid } from 'uuid';

import { observer } from 'mobx-react';

const cardStyles = require('./card.scss');

@CSSModules(cardStyles)
@observer
export class Card extends React.Component<any, any> {
    public componentDidMount() {
        this.getWord();
    }

    private getWord() {
        this.props.store.getWord(this.props.store.getRandomWordLength());
    }

    private word(): Array<{ value: string, isMasked: boolean }> {
        return this.props.store.word || [];
    }

    private letters(): Array<string> {
        return this.props.store.letters || [];
    }

    private meaning(): string {
        return this.props.store.meaning || '';
    }

    private isCorrect(): boolean {
        return this.props.store.isCorrect;
    }

    public render() {
        const letters: Array<JSX.Element> = this.letters().map((letter, index) =>
                                                    <input key={['letter', index].join('_') }
                                                            className='text-center'
                                                            styleName='word-letter'
                                                            type='text'
                                                            maxLength={1}
                                                            pattern='/\d?/'
                                                            readOnly={ this.word()[index] ? !this.word()[index].isMasked : true }
                                                            onChange={this.props.store.onLetterChange.bind(this.props.store, index)}
                                                            value={letter}/>
                                                );

        return <div className='card text-center' styleName='word-card'>
            <div className='card-header'>
                Complete the word!
            </div>
            <div className='card-block'>
                <div className='d-flex justify-content-center' styleName='word-letters'>
                    {letters}
                </div>
                <p className='card-text'>
                    <span styleName='hint-label'>HINT:</span> <span>{this.isCorrect() ? 'Correct' : 'Incorrect' }</span>
                </p>
                <div className='d-flex justify-content-around' styleName='card-actions'>
                    <a href='#' className='btn' styleName='check-next-btn'>
                        Next
                    </a>
                    <a href='#' className='btn' styleName='skip-btn'>
                        Skip
                    </a>
                    <a href='#' className='btn' styleName='finish-btn'>
                        Finish
                    </a>
                </div>
            </div>
            <div className='card-footer' styleName='word-points'>
                10 Points
            </div>
        </div>;
    }
}