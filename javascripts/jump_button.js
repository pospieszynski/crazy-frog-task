import React from 'react';
import ReactDOM from 'react-dom';
require("../stylesheets/screen.css");

class JumpButton extends React.Component {

    render(){
        return(
            <button type="button" id="jump">Jump</button>
        )
    }
}

export default JumpButton;