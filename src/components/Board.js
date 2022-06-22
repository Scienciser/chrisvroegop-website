import { utils } from "./utils"
import { shape } from "./shape"
import { TetchrisGameInfo } from "./TetchrisGameInfo";
import React from 'react';
import { TetchrisScoreboard } from "./TetchrisScoreboard";

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.fullHeight = this.props.height + 2; // Includes spawn rows
    this.resetGame(); // Setup internal state

    this.gameLost = false;

    // State, used by render()
    this.state = {
      scoreboard: [],
      userName: '',
      boardContents: Array(this.fullHeight * this.props.width).fill(false),
      shape: new shape(false, this.props.width, this.fullHeight),
      gameRunning: false,
      items: []
    }
    this.username = '';
    this.scoreList = [];
  }

  componentDidMount = async () => {
    this.updateScoreboard();
  }


  rotate = (rotateValue) => {
    let newShape = Object.assign({}, this.shape);
    // Convert to relative XY coords
    const centerXyCoords = newShape.cells[newShape.centre];
    const relXyCoords = newShape.cells.map(([x, y]) => [x - centerXyCoords[0], y - centerXyCoords[1]]);
    // Perform basic rotation
    const rotatedRelXyCoords = relXyCoords.map(([x, y]) => [rotateValue * y, -rotateValue * x]);
    // Convert to global XY coords
    const rotatedXyCoords = rotatedRelXyCoords.map(([x, y]) => [x + centerXyCoords[0], y + centerXyCoords[1]]);
    // Perform Super Rotation System offset
    let newPosition = (newShape.position + 1) % 4;
    for (const offsets of newShape.offsets) {
      const offset = [offsets[newShape.position][0] - offsets[newPosition][0], offsets[newShape.position][1] - offsets[newPosition][1]]
      let offsetCoords = rotatedXyCoords.map(([x, y]) => [x + offset[0], y + offset[1]]);
      if (this.isValid(offsetCoords)) {
        newShape.cells = offsetCoords;
        newShape.position = newPosition;
        this.updateShape(newShape, true);
        return;
      }
    }
    return;
  }

  isValid = (xyCoords) => {
    const res = xyCoords.map(([x, y]) => (
      x >= 0 &&
      x < this.props.width &&
      y >= 0 &&
      y < this.fullHeight &&
      ((this.boardContentsXy[y][x] === false) || Boolean(this.shape.cells.find(([cx, cy]) => cx === x && cy === y)))
    ));
    return res.every(x => x === true);
  }

  spawn = (createNewShape) => {
    const newShape = new shape(createNewShape, this.props.width, this.fullHeight);
    this.updateShape(newShape);
  }

  // Returns true when a new shape is spawned or the game ends, false otherwise
  down = () => {
    const newShape = Object.assign({}, this.shape);
    newShape.cells = newShape.cells.map(([x, y]) => [x, y - 1]);
    if (this.isValid(newShape.cells)) {
      this.updateShape(newShape, true);
      return false;
    }

    // Cannot move down
    // If we are in the top two invisible rows, the game is lost.
    if (newShape.cells.some(([_, y]) => y >= this.props.height)) {
      this.gameOver();
      return true;
    }
    // The cell is now stuck in place
    // Check for and remove full rows
    const fullRows = this.boardContentsXy.reduce((out, row, index) => row.every(e => e) ? out.concat(index) : out, []);
    if (fullRows) { this.processFullRows(fullRows) }

    // Spawn a new shape.
    this.spawn(true, false);
    return true;
  }

  processFullRows = (fullRowIndices) => {

    // Increment score
    switch (fullRowIndices.length) {
      case 1:
        this.score += 40 * (this.level + 1);
        break;
      case 2:
        this.score += 100 * (this.level + 1);
        break;
      case 3:
        this.score += 300 * (this.level + 1);
        break;
      case 4:
        this.score += 1200 * (this.level + 1);
        break;
    }

    // Change level
    this.linesToNextLevel -= fullRowIndices.length;
    if (this.linesToNextLevel <= 0 && this.level <= 10) {
      this.level++;
      clearInterval(this.timerId);
      this.timerId = setInterval(() => this.downButton(), 300 - this.level * 25);
      this.linesToNextLevel = (this.level < 5) ? 5 : 10;
    }


    for (let i = fullRowIndices.length - 1; i > -1; i--) {
      this.boardContentsXy.splice(fullRowIndices[i], 1);
    }
    this.boardContentsXy.push(...Array.from(Array(this.fullHeight - this.boardContentsXy.length), () => Array(this.props.width).fill(false)))
  }

  sideways = (moveLeft) => {
    const newShape = Object.assign({}, this.shape);
    if (moveLeft) {
      newShape.cells = this.shape.cells.map(([x, y]) => [x - 1, y]);
    } else { // moveRight
      newShape.cells = this.shape.cells.map(([x, y]) => [x + 1, y]);
    }
    if (this.isValid(newShape.cells)) {
      this.updateShape(newShape, true);
      return;
    }
  }

  updateShape = (newShape, despawnLastShape) => {
    if (despawnLastShape) {
      for (let cell of this.shape.cells) {
        this.boardContentsXy[cell[1]][cell[0]] = false;
      }
    }
    this.shape = newShape;
    for (let cell of this.shape.cells) {
      this.boardContentsXy[cell[1]][cell[0]] = this.shape.shapeClass;
    }
  }

  clearBoard = () => {
    this.boardContentsXy = Array.from(Array(this.fullHeight), () => Array(this.props.width).fill(false));
  }

  updateBoardState = () => {
    // Convert shape to 1-D coords
    let newBoardContents = this.boardContentsXy.flat();
    this.setState({ shape: this.shape, boardContents: newBoardContents, gameRunning: this.gameRunning });
    this.forceUpdate();
  }

  startGame = () => {
    this.gameReset = false;
    this.spawn(true, true);
    this.timerId = setInterval(() => this.downButton(), 300);
    this.gameRunning = true;
  }

  // Does not clear board
  gameOver = () => {
    this.spawn(false, false); // Spawn null shape
    clearInterval(this.timerId);
    this.gameRunning = false;
    this.gameLost = true;
  }

  resetGame = () => {

    this.gameOver();
    this.gameLost = false;
    this.clearBoard();
    this.score = 0;
    this.level = 0;
    this.linesToNextLevel = 5;
    this.gameReset = true;
  }

  /*
  BUTTONS
  */

  startResetButton = () => {
    if (this.gameReset) { // Start
      this.startGame();
    } else { // Reset
      this.resetGame();
    }
    this.updateBoardState();
  }

  leftButton = () => {
    this.sideways(true);
    this.updateBoardState();
  }

  rightButton = () => {
    this.sideways(false);
    this.updateBoardState();
  }

  downButton = () => {
    this.down();
    this.updateBoardState();
  }

  rotateClockwiseButton = () => {
    this.rotate(1);
    this.updateBoardState();
  }

  handleKeyPress = (e) => {
    switch (e.code) {
      case "ArrowDown":
      case "KeyS":
        this.downButton();
        break;
      case "ArrowLeft":
      case "KeyA":
        this.leftButton();
        break;
      case "ArrowRight":
      case "KeyD":
        this.rightButton();
        break;
      case "ArrowUp":
      case "KeyW":
        this.rotateClockwiseButton();
        break;
      case "Space":
        if (!this.gameRunning) {
          this.startGame();
        }
        break;
    }
  }

  updateScoreboard = async () => {
    const response = await fetch(`https://api.chrisvroegop.com/getscores`);
    const json = await response.json();
    this.scoreList = json.Items;

    const newScore = this.scoreList.map((s) => [s.score, s.player]);
    // Order the array from highest to lowest
    newScore.sort((a, b) => b[0] - a[0]);

    //  Loops through props scoreboard and places it in a html array
    const newScoreboard = [];
    for (let i = 0; i < newScore.length; i++) {
      newScoreboard.push(
        <div key={i} className="tetchris-scoreboard-row">
          <p className="tetchris-scoreboard-list">
            {i + 1}.&nbsp; <b>{`${newScore[i][1].S}`} </b>
          </p>
          <p>
            {`${newScore[i][0].N}`}
          </p>
        </div>
      )
    }
    this.setState({ scoreboard: newScoreboard })
  }

  uploadScore = async () => {
    await fetch(`https://api.chrisvroegop.com/putscore?player=${this.state.userName}&score=${this.score}`, {
      method: 'POST'
    })

    this.updateScoreboard();
    this.startResetButton();
  }


  render = () => {
    let cellId = this.props.width * (this.props.height - 1);
    let rows = [];

    // Render table rows
    for (let i = this.props.height - 1; i > -1; i--) { // Do not use this.fullHeight so as not to render spawn rows.
      rows.push(<tr key={i}>{utils.range(cellId, cellId + this.props.width).map(cellId => <td key={cellId} className={this.state.boardContents[cellId] ? `cell shape ${this.state.boardContents[cellId]}` : "cell empty-cell"} dangerouslySetInnerHTML={{ __html: "&nbsp" }}></td>)}</tr>);
      cellId = cellId - this.props.width;
    }

    return ( // tabIndex allows div to receive focus
      <div className="tetchris-game-scoreboard-wrapper">
        <div className="tetchris-game-container" tabIndex={0} onKeyDown={this.handleKeyPress}>
          <div className="tetchris-game-board-ratio">

            <table ref={this.ref} className={"tetchris-game-board"}>
              <tbody>{rows}</tbody>
            </table>

            {this.gameLost ?
              <form className="tetchris-game-details" style={{ display: this.gameRunning ? "none" : "block" }}>
                <p>Game Over!</p>
                <p>Enter your name:</p>
                <input
                  type='text'
                  value={this.state.userName}
                  onChange={(e) => { this.setState({ userName: e.target.value }); }}/>
                <button className="tetchris-button" onClick={this.uploadScore}>Submit</button>
              </form>
              :
              <p style={{ display: this.gameRunning ? "none" : "block" }} className="tetchris-game-details">
                Click start to begin!
                You can use the buttons to the right or the arrow keys
              </p>
            }
          </div>
          <TetchrisGameInfo
            score={this.score}
            level={this.level}
            linesToNextLevel={this.linesToNextLevel}
            startResetButton={this.startResetButton}
            leftButton={this.leftButton}
            downButton={this.downButton}
            rightButton={this.rightButton}
            rotateClockwiseButton={this.rotateClockwiseButton}
            gameReset={this.gameReset} />
          <br />
          </div>
        <TetchrisScoreboard scoreboard={this.state.scoreboard}/>

      </div>
    );
  }

}