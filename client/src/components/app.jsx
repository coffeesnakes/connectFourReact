import React from 'react';
import Row from './Row.jsx';
import { getRowAvail, evalOneLine, transpose, diagOfMatrix, checkWinner, makeNewBoard, } from "./boardUtils.jsx";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      RedTurn: true,
      rows: 7,
      cols: 6,
      board: []
    };
   var boardInit = this.state.board;
    for (let i = 0; i < this.state.rows; i++) {
      boardInit.push([]);
      for (let j = 0; j < this.state.cols; j++) {
        boardInit[i][j] = '';
      }
    }
    this.handlePlaceDisc = this.handlePlaceDisc.bind(this);
    this.handlePlacerMouseEnter = this.handlePlacerMouseEnter.bind(this);
    this.handlePlacerMouseLeave = this.handlePlacerMouseLeave.bind(this);
    this.handleChangeBoardSize = this.handleChangeBoardSize.bind(this);
  }
  handlePlacerMouseEnter(event) {
    if (this.state.RedTurn && !event.target.classList.contains('red')) {
      event.target.classList.add('red');
    } else if (!this.state.RedTurn && !event.target.classList.contains('blue')) {
      event.target.classList.add('blue');
    }
  }
  handlePlacerMouseLeave(event) {
    event.target.className = 'col';
  }
  handlePlaceDisc(event) {
    var targetCol = event.target.attributes.y.value;
    var boardUpdate = this.state.board;
    boardUpdate[getRowAvail(boardUpdate, targetCol)][targetCol] = this.state.RedTurn ? 'red' : 'blue';
    this.setState({ RedTurn: !this.state.RedTurn });
    this.setState({ board: boardUpdate });
    setTimeout(() => checkWinner(this.state.board, newBoard => this.setState({ board: newBoard })), 0);
  }
  handleChangeBoardSize(event) {
    console.log(event.target.name, event.target.value);
    this.setState({
      [event.target.name]: event.target.value
    });
    var newBoard = makeNewBoard(this.state.rows, this.state.cols);
    this.setState({
      board: newBoard
    });
    this.render();
  }
  handleSubmit(event) {
    console.log(event.target);
    alert('Board was updated!');
    event.preventDefault();
  }

  render() {
    var arr = [];
    for (let i = 0; i < this.state.rows; i++) {
      arr[i] = <Row rowAsArr={this.state.board[i]} type={'grid_row'} row={i} col={this.state.cols} />;
    }
    return (
      <div>
        <h1>Connect Four!</h1>
        <div className="grid">
          <Row
            type={'grid_placer'}
            handlePlacerMouseEnter={this.handlePlacerMouseEnter}
            handlePlacerMouseLeave={this.handlePlacerMouseLeave}
            handlePlaceDisc={this.handlePlaceDisc}
            col={this.state.cols}
          />
          {arr}
          <br />
          <form className="boardChange" onSubmit={this.handleSubmit}>
            Change Board Size
            <input name="rows" value={this.state.value} placeholder="row count" onChange={this.handleChangeBoardSize} />
            <input name="cols" value={this.state.value} placeholder="column count" onChange={this.handleChangeBoardSize} />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default App;
