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
        this.handleJumpButton = this.handleJumpButton.bind(this);
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
            firstItem == id ? firstItem = null : secondItem = null;
        } else {
            if (selectionsNo < 2) {
                if (firstItem == null) {
                    firstItem = id;
                } else {
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

    handleJumpButton() {
        console.log("hit!")
        let type = this.state.cells[this.state.firstItemSelected].type;
        let frogPosition = null;
        let jumpPosition = null;

        if (type === "frog female" || type === "frog male") {
            frogPosition = this.state.firstItemSelected;
        }
        else if (type == "") {
            jumpPosition = this.state.firstItemSelected;
        }

        type = this.state.cells[this.state.secondItemSelected].type;

        if (type === "frog female" || type === "frog male") {
            frogPosition = this.state.secondItemSelected;
        }
        else if (type == "") {
            jumpPosition = this.state.secondItemSelected;
        }
        console.log(frogPosition + "  " + jumpPosition)

        if (frogPosition == null || jumpPosition == null) return;

        let placesToJump = this.getPlacesToJump(frogPosition);
        console.log("cscsc" + placesToJump)

        if (placesToJump.includes(jumpPosition)) {
            let frog = this.state.cells[frogPosition].type;
            let place = this.state.cells[jumpPosition].type;
            let newCells = this.state.cells;
            newCells[frogPosition].type = place;
            newCells[jumpPosition].type = frog;
            this.setState({
                cells: newCells
            })
        }
    }

    getPlacesToJump(frogPosition) {
        let virtPoints = [];

        if(this.state.cells[frogPosition].type === "frog female" ){
            virtPoints = [
                frogPosition + 20,
                frogPosition + 18,
                frogPosition - 2,
                frogPosition + 2,
                frogPosition - 22,
                frogPosition - 20,
                frogPosition - 18,
                frogPosition + 22
            ]
        }else{
            virtPoints = [
                frogPosition + 30,
                frogPosition + 27,
                frogPosition - 3,
                frogPosition - 27,
                frogPosition + 3,
                frogPosition - 30,
                frogPosition - 33,
                frogPosition + 33
            ]
        }
        return virtPoints
    }

    render() {
        return (
            <div>
                <Lake  handleSelect={this.handleSelect} cells={this.state.cells}/>
                <Lagend handleJumpButton={this.handleJumpButton} />
            </div>
        )
    }
}

export default App