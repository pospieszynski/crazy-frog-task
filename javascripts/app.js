import React from 'react';
import ReactDOM from 'react-dom';
import Lake from './lake.js';
import Lagend from './legend.js';

const frogTypes = ["frog male", "frog female"];
const apperances = ["tall", "short", "fat", "slim"]

class App extends React.Component {

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
        for (let i = 2; i < 60; i++) {
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
            secondItemSelected: null,
            lastSelect: 0
        }
        this.handleSelect = this.handleSelect.bind(this);
        this.handleJumpButton = this.handleJumpButton.bind(this);
        this.handleReproduceButton = this.handleReproduceButton.bind(this);
    }

    getRadomCharacteristic(){
        return apperances.sort(function(a, b){return 0.5 - Math.random()}).splice(0,2);
    }

    getRandomGender(){
        return frogTypes.sort(function(a, b){return 0.5 - Math.random()})[0];
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

    handleReproduceButton() {
        let getPlaceAvailable = this.getPlaceAvailable();
        if ( getPlaceAvailable && this.areAdjacent() && this.areHetero()) {
            let newCells = this.state.cells;
            newCells[getPlaceAvailable].characteristics = this.inheritFromParents();
            newCells[getPlaceAvailable].type = this.getRandomGender();
            this.setState({cells: newCells})
        }
    }

    inheritFromParents(){
        return [
            this.state.cells[this.state.firstItemSelected].characteristics[0],
            this.state.cells[this.state.secondItemSelected].characteristics[0],
        ]
    }

    areAdjacent() {
        let diff = this.state.firstItemSelected - this.state.secondItemSelected
        if (Math.abs(diff) == 1 || Math.abs(diff) == 10) {
            return true
        } else {
            return false
        }
    }

    areHetero() {
        let types = [this.state.cells[this.state.firstItemSelected].type, this.state.cells[this.state.secondItemSelected].type]
        return types.sort().toString() === ["frog female", "frog male"].toString() ?  true: false
    }

    getPlaceAvailable(){
        let motherPos;
        this.state.cells[this.state.firstItemSelected].type === "frog female" ? motherPos = this.state.firstItemSelected : motherPos = this.state.secondItemSelected
        if(  motherPos + 1 < 60 && this.state.cells[motherPos + 1].type === "" ){
            return motherPos + 1;
        } else if(motherPos - 1 > 0 && this.state.cells[motherPos - 1].type === "") {
            return motherPos - 1;
        }else if( motherPos + 10 < 60 && this.state.cells[motherPos + 10].type === "" ){
            return motherPos + 10;
        }else if(  motherPos - 10 > 0 && this.state.cells[motherPos - 10].type === "" ){
            return motherPos - 10;
        }else{
            return null
        }
    }

    getPlacesToJump(frogPosition) {
        let virtPoints = [];

        if (this.state.cells[frogPosition].type === "frog female") {
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
        } else {
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
                <Lake handleSelect={this.handleSelect} cells={this.state.cells}/>
                <Lagend handleJumpButton={this.handleJumpButton} handleReproduceButton={this.handleReproduceButton}/>
            </div>
        )
    }
}

export default App