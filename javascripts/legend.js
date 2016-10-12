import React from 'react';
import ReactDOM from 'react-dom';
import JumpButton from './jump_button';
import ReproduceButton from './reproduce_button';

class Legend extends React.Component {

    render(){
        return(
            <div className="legend">
                <h3>Legend</h3>
                <ul>
                    <li>
                        <span className="frog male"></span>
                        <strong>Frog male</strong>
                    </li>
                    <li>
                        <span className="frog female"></span>
                        <strong>Frog female</strong>
                    </li>
                </ul>

                <h3>Actions</h3>
                <JumpButton/>
                <ReproduceButton/>
            </div>
        )
    }
}

export default Legend;