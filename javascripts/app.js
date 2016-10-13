import React from 'react';
import ReactDOM from 'react-dom';
import Lake from './lake.js';
import Lagend from './legend.js';

const frogTypes = ["frog male", "frog female"];
const apperances = ["tall", "short", "fat", "slim"];
const rows = 6;
const cols = 10;
const totalCells = rows * cols;
const maleStep = 3;
const femaleStep = 2;

export default  class App extends React.Component {
    constructor(props) {
        super(props);
        let initialCells = [];

        initialCells[0] = {
            id: 0,
            type: "frog male",
            characteristics: this.getRadomCharacteristic(),
            checked: false
        }
        initialCells[1] = {
            id: 1,
            type: "frog female",
            characteristics: this.getRadomCharacteristic(),
            checked: false
        }
        for (let i = 2; i < totalCells; i++) {
            initialCells.push(
                {
                    id: i,
                    type: "",
                    characteristics: [],
                    checked: false
                }
            )
        }

        this.state = {
            noOfSelections: 0,
            cells: initialCells,
            firstItemSelected: null,
            secondItemSelected: null
        }

        this.handleSelect = this.handleSelect.bind(this);
        this.handleJumpButton = this.handleJumpButton.bind(this);
        this.handleReproduceButton = this.handleReproduceButton.bind(this);
    }

    render() {
        return (
            <div>
                <Lake handleSelect={this.handleSelect} cells={this.state.cells}/>
                <Lagend handleJumpButton={this.handleJumpButton} handleReproduceButton={this.handleReproduceButton}/>
            </div>
        )
    }

    getRadomCharacteristic() {
        return apperances.sort(function (a, b) {
            return 0.5 - Math.random()
        }).splice(0, 2);
    }

    getRandomGender() {
        return frogTypes.sort(function (a, b) {
            return 0.5 - Math.random()
        })[0];
    }

    handleSelect(e, id) {
        /* max 2 selects possible + switching one by one */
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

        if (frogPosition == null || jumpPosition == null) return;

        let placesToJump = this.getPlacesToJump(frogPosition);

        if (placesToJump.includes(jumpPosition)) {
            let frogClass = this.state.cells[frogPosition].type;
            let placeClass = this.state.cells[jumpPosition].type;
            let newCells = this.state.cells;
            newCells[frogPosition].type = placeClass;
            newCells[jumpPosition].type = frogClass;
            this.setState({
                cells: newCells
            })
        }
    }

    handleReproduceButton() {
        let getPlaceAvailable = this.getPlaceAvailable();
        if (getPlaceAvailable && this.areAdjacent() && this.areHetero()) {
            let newCells = this.state.cells;
            newCells[getPlaceAvailable].characteristics = this.inheritFromParents();
            newCells[getPlaceAvailable].type = this.getRandomGender();
            this.setState({cells: newCells})
        }
    }

    inheritFromParents() {
        return [
            this.state.cells[this.state.firstItemSelected].characteristics[0],
            this.state.cells[this.state.secondItemSelected].characteristics[0],
        ]
    }

    areAdjacent() {
        let diff = this.state.firstItemSelected - this.state.secondItemSelected;
        if (Math.abs(diff) == 1 || Math.abs(diff) == cols) {
            return true
        } else {
            return false
        }
    }

    areHetero() {
        let types = [this.state.cells[this.state.firstItemSelected].type, this.state.cells[this.state.secondItemSelected].type]
        return types.sort().toString() === ["frog female", "frog male"].toString() ? true : false
    }

    getPlaceAvailable() {
        let motherPos;
        this.state.cells[this.state.firstItemSelected].type === "frog female" ? motherPos = this.state.firstItemSelected : motherPos = this.state.secondItemSelected
        if (motherPos + 1 < totalCells && this.state.cells[motherPos + 1].type === "") {
            return motherPos + 1;
        } else if (motherPos - 1 > 0 && this.state.cells[motherPos - 1].type === "") {
            return motherPos - 1;
        } else if (motherPos + cols < totalCells && this.state.cells[motherPos + cols].type === "") {
            return motherPos + cols;
        } else if (motherPos - cols > 0 && this.state.cells[motherPos - cols].type === "") {
            return motherPos - cols;
        } else {
            return null
        }
    }

    getPlacesToJump(frogPosition) {
        let step;

        this.state.cells[frogPosition].type === "frog female" ? step = femaleStep : step = maleStep;

        let virtPoints = [
            frogPosition - step,
            frogPosition + step,
            frogPosition + step * cols,
            frogPosition - step * cols,
            frogPosition - step * (cols - 1),
            frogPosition + step * (cols + 1),
            frogPosition + step * (cols - 1),
            frogPosition - step * (cols + 1)
        ]
        return virtPoints
    }
}
