import React from 'react';
import ReactDOM from 'react-dom';

export default class JumpButton extends React.Component {

    render(){
        return(
            <button type="button" onClick={this.props.handleJumpButton} id="jump">Jump</button>
        )
    }
}
