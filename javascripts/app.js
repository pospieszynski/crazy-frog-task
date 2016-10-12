import React from 'react';
import ReactDOM from 'react-dom';
import Lake from './lake.js';
import Lagend from './legend.js';

class App extends React.Component {
    constructor(props) {
        super(props);
        let initialCells = [];
        initialCells[0] = {
            id: 0,
            type: "frog male",
            characteristics: ["tall", "short", "fat", "slim"],
            checked: false
        }
        initialCells[1] = {
            id: 1,
            type: "frog female",
            characteristics: ["tall", "short", "fat", "slim"],
            checked: false
        }
        for (let i = 2; i < 60; i++) {
            initialCells.push(
                {
                    id: i,
                    type: "",
                    characteristics: ["tall", "short", "fat", "slim"],
                    checked: false
                }
            )
        }
        this.state = {
            noOfSelections: 0,
            cells: initialCells,
            firstItemSelected: null,
            secondItemSelected: null,
            lastSelect: 0
        }
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(e, id) {
        /* check if unselected */
        let updatedCells = this.state.cells;
        let selectionsNo = this.state.noOfSelections;
        let firstItem = this.state.firstItemSelected;
        let secondItem = this.state.secondItemSelected;

        if (updatedCells[id].checked) {
            selectionsNo--;
            updatedCells[id].checked = false;
            firstItem == id? firstItem = null: secondItem = null;
        } else {
            if (selectionsNo < 2) {
                if(firstItem == null){
                    firstItem = id;
                }else{
                    secondItem = id;
                }
                selectionsNo++;
            } else {
                updatedCells[firstItem].checked = false;
                firstItem = id;
                let temp = secondItem;
                secondItem = firstItem;
                firstItem = temp;
            }

            updatedCells[id].checked = true;
        }

        this.setState({
            noOfSelections: selectionsNo,
            cells: updatedCells,
            firstItemSelected: firstItem,
            secondItemSelected: secondItem
        })
    }

    render() {
        return (
            <div>
                <Lake handleSelect={this.handleSelect} cells={this.state.cells}/>
                <Lagend/>
            </div>
        )
    }
}

export default App