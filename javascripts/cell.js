import React from 'react';
import ReactDOM from 'react-dom';

class Cell extends React.Component {

    render(){
        return(
            <td>
                <label className={this.props.type}>
                    <input type="checkbox" checked={this.props.checked} onChange={ (e) => this.props.handleSelect(e, this.props.id) } />
                </label>
            </td>
        )
    }
}

export default Cell;