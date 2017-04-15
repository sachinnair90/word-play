import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as CSSModules from 'react-css-modules';

import { Card } from './components/card';
import wordStore from './store/word.store';

const appStyles = require('./app.scss');

@CSSModules(appStyles)
class LexiEikasia extends React.Component<any, any> {
    public render() {
        return <div className='container'>
            <div className='row'>
                <div className='col text-center'>
                    <h1 styleName='app-header'>Lexi Eikasia</h1>
                </div>
            </div>
            <div className='row justify-content-center' styleName='word-card-container'>
                <Card store={ wordStore }/>
            </div>
        </div>;
    }
}

ReactDOM.render(<LexiEikasia />, document.getElementById('app__container'));