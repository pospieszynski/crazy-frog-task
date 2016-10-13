import React from 'react';
import ReactDOM from 'react-dom';

import Cell from './cell.js';

export default class Lake extends React.Component {

    renderCells() {
        let cellComponentsArray = this.props.cells.map((cell) => {
            return (
                <Cell id={cell.id} checked={cell.checked} handleSelect={this.props.handleSelect} type={cell.type}/>
            );
        });
        let rows = [0,1,2,3,4,5];

        return rows.map((row, i) => {
            return (
                <tr>
                    { cellComponentsArray.slice(i*10, i*10 + 10).map((cell) => {
                        return cell
                    }) }
                </tr>
            )
        })
    }

    render() {
        return (
            <table id="lake">
                <thead>
                <tr>
                    <th colSpan={10}>Lake</th>
                </tr>
                </thead>
                <tbody>
                {this.renderCells()}
                </tbody>
            </table>
        )
    }
}
