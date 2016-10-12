import React from 'react';
import ReactDOM from 'react-dom';
require("../stylesheets/screen.css");

class ReproduceButton extends React.Component {

    render(){
        return(
            <button onClick={this.props.handleReproduceButton} type="button" id="reproduce">Reproduce</button>
        )
    }
}

export default ReproduceButton;