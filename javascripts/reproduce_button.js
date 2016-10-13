import React from 'react';
import ReactDOM from 'react-dom';

export default class ReproduceButton extends React.Component {

    render(){
        return(
            <button onClick={this.props.handleReproduceButton} type="button" id="reproduce">Reproduce</button>
        )
    }
}
