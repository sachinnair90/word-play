import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Card } from './components/card';

class LexiEikasia extends React.Component<any, any> {
    public render() {
        return <div className='container'>
            <div className='row'>
                <div className='col text-center'>
                    <h1>Lexi Eikasia</h1>
                </div>
            </div>
            <div className='row justify-content-center'>
                <Card />
            </div>
        </div>;
    }
}

ReactDOM.render(<LexiEikasia />, document.getElementById('app'));