require("../stylesheets/screen.css");
import React from 'react';
import ReactDOM from 'react-dom';

import Cell from './cell.jsx';


class Lake extends React.Component {
    constructor(props) {
        super(props);
        let initialCells = [];
        initialCells[0] = {
            id: "cell-0",
            type: "frog male",
            characteristics: ["tall", "short", "fat", "slim"]
        }
        initialCells[1] = {
            id: "cell-1",
            type: "frog female",
            characteristics: ["tall", "short", "fat", "slim"]
        }
        for (let i = 2; i < 60; i++) {
            initialCells.push(
                {
                    id: "cell-" + i,
                    type: "",
                    characteristics: ["tall", "short", "fat", "slim"]
                }
            )
        }
        console.log(initialCells);
        this.state = {
            cells: initialCells
        }
    }

    renderCells() {
        let cellComponentsArray = this.state.cells.map((cell) => {
            return (
                <Cell ref={cell.id} id={cell.id} type={cell.type}/>
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

ReactDOM.render(<Lake/>, document.getElementById('lake-area'));