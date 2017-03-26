import * as React from 'react';
import * as ReactDOM from 'react-dom';

class LexiEikasia extends React.Component<any, any> {
    public render() {
        return <div className='row'>
            <h1>Lexi Eikasia!</h1>
        </div>;
    }
}

ReactDOM.render(<LexiEikasia />, document.getElementById('app'));