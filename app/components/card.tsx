import * as React from 'react';

export class Card extends React.Component<any, any> {
    public render() {
        return <div className='word-card card text-center'>
            <div className='card-header'>
                Complete the word!
            </div>
            <div className='card-block'>
                <h4 className='card-title'>
                    Special title treatment
                </h4>
                <p className='card-text'>
                    With supporting text below as a natural lead-in to additional content.
                </p>
                <a href='#' className='btn btn-primary'>
                    Go somewhere
                </a>
            </div>
            <div className='card-footer text-muted'>
                2 days ago
            </div>
        </div>;
    }
}