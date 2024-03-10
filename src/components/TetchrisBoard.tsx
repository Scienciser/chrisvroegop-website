import { xyCoords } from "../common/utils"
import { Shape } from "../common/Shape"
import TetchrisGameInfo from "./TetchrisGameInfo";
import TetchrisGrid from "./TetchrisGrid";
import { Component } from 'react';
import TetchrisScoreboard from "./TetchrisScoreboard";
import TetchrisMessageBox from "./TetchrisMessageBox";
import "./TetchrisBoard.css";


interface BoardProps {
  width: number,
  height: number,
}

interface BoardState {
  score: number,
  scoreboardVersion: number,
  gameStatus: GameStatus,
  renderedBoardContents: Array<number>,
  level: number,
  linesToNextLevel: number,
}

enum GameStatus {
  NotStarted,
  Running,
  GameOver,
}

function ConvertToXyCoords(cells: number[], width: number): xyCoords[] {
  const tmp: xyCoords[] = cells.map(c => [c % width, Math.floor(c / width)]);
  return tmp;
}

function ConvertToCellIdx(cells: xyCoords[], width: number): number[] {
  const idx: number[] = cells.map(([x, y]) => y * width + x);
  return idx
}

class TetchrisBoard extends Component<BoardProps, BoardState> {
  shape: Shape | null = null;
  fullHeight: number = this.props.height + 2;
  timerId: number | null = null;
  boardContents: Array<number> = Array((this.props.height + 2) * this.props.width).fill(0);
  state: BoardState = {
    score: 0,
    scoreboardVersion: 0,
    gameStatus: GameStatus.NotStarted,
    renderedBoardContents: Array((this.props.height + 2) * this.props.width).fill(0),
    level: 1,
    linesToNextLevel: 5,
  }

  rotate = () => {
    const rotateValue = 1; // number of rotations
    // Prevent rotations when the shape is in the top two invsible rows to prevent the shape rotating out of the allowed area.
    if (this.shape === null || this.shape.cells.some((c: number) => c > this.props.width * this.props.height)) {
      return;
    }
    const newShape: Shape = Object.assign({}, this.shape);
    // Convert to XY coords
    const xyCoords: xyCoords[] = ConvertToXyCoords(newShape.cells, this.props.width);
    // Convert to relative XY coords
    const centerXyCoords: xyCoords = xyCoords[newShape.centre];
    const relXyCoords = xyCoords.map(([x, y]) => [x - centerXyCoords[0], y - centerXyCoords[1]]);
    // Perform basic rotation
    const rotatedRelXyCoords = relXyCoords.map(([x, y]) => [rotateValue * y, -rotateValue * x]);
    // Convert to global XY coords
    const rotatedXyCoords = rotatedRelXyCoords.map(([x, y]) => [x + centerXyCoords[0], y + centerXyCoords[1]]);
    // Perform Super Rotation System offset
    const newPosition = (newShape.position + 1) % 4;
    for (const offsets of newShape.offsets) {
      const offset: xyCoords = [offsets[newShape.position][0] - offsets[newPosition][0], offsets[newShape.position][1] - offsets[newPosition][1]]
      const offsetCoords: xyCoords[] = rotatedXyCoords.map(([x, y]) => [x + offset[0], y + offset[1]]);
      if (this.isValidXy(offsetCoords, this.shape.cells)) {
        newShape.cells = ConvertToCellIdx(offsetCoords, this.props.width);
        newShape.position = newPosition;
        this.updateShape(newShape, true);
        this.rerenderBoard();
        return;
      }
    }
  }
  isValid = (newCells: number[], oldCells: number[]) => {
    const res = newCells.map((c) => 
      c >= 0 &&
      c < this.props.width * this.fullHeight &&
      (this.boardContents[c] === 0 || oldCells.includes(c))
    );
    return res.every(x => x);
  }
  isValidXy = (xyCoords: xyCoords[], oldCells: number[]) => {
    const res = xyCoords.map(([x, y]) => (
      x >= 0 &&
      x < this.props.width &&
      y >= 0 &&
      y < this.fullHeight &&
      (this.boardContents[y*this.props.width+x] === 0) || oldCells.includes(y*this.props.width+x))
    );
    return res.every(x => x === true);
  }


  spawn = (createNewShape: boolean) => {
    const newShape = createNewShape ? new Shape(this.props.width, this.fullHeight) : null;
    this.updateShape(newShape, false);
  }

  // Returns true when a new shape is spawned or the game ends, false otherwise
  down = () => {
    if (this.shape === null) {
      return;
    }

    const newShape: Shape = Object.assign({}, this.shape);
    newShape.cells = newShape.cells.map((c) => c - this.props.width);
    if (this.isValid(newShape.cells, this.shape.cells)) {
      this.updateShape(newShape, true);
    } else if (newShape.cells.some(c => c > this.props.width * this.props.height)) {
      // If we are above the valid playspace, the game is lost.
      this.gameOver();
    } else {
      // We can no longer move down any further
      // Check for and remove full rows
      const fullRows = new Array<number>;
      for (let i = 0; i < this.fullHeight; ++i) {
        if (this.boardContents.slice(i * this.props.width, (i+1) * this.props.width).every(r => r)) {
          fullRows.push(i);
        }
      }
      if (fullRows.length > 0) { this.processFullRows(fullRows) }

      // Spawn a new shape.
      this.spawn(true);
    }
    this.rerenderBoard();
    return true;
  }

  processFullRows = (fullRowIndices: Array<number>) => {

    // Increment score
    switch (fullRowIndices.length) {
      case 1:
        this.setState({score: this.state.score + 40 * (this.state.level + 1)});
        break;
      case 2:
        this.setState({score: this.state.score + 100 * (this.state.level + 1)});
        break;
      case 3:
        this.setState({score: this.state.score + 300 * (this.state.level + 1)})
        break;
      case 4:
        this.setState({score: this.state.score + 1200 * (this.state.level + 1)});
        break;
    }

    // Change level
    let tmp = this.state.linesToNextLevel - fullRowIndices.length;
    if (tmp <= 0 && this.state.level <= 10) {
      this.setState({level: this.state.level + 1})
      if (this.timerId !== null) {
        clearInterval(this.timerId);
      }
      this.timerId = setInterval(() => this.down(), 300 - this.state.level * 25);
      tmp = (this.state.level < 5) ? 5 : 10;
    }
    this.setState({linesToNextLevel: tmp})

    for (let i = fullRowIndices.length - 1; i > -1; i--) {
      this.boardContents.splice(fullRowIndices[i] * this.props.width, this.props.width);
    }
    this.boardContents = this.boardContents.concat(new Array(this.props.width * this.fullHeight - this.boardContents.length).fill(0));
  }

  left = () => {
    if (this.shape === null) {
      return;
    }
    const newShape = Object.assign({}, this.shape);
    if (newShape.cells.every(c => c % this.props.width !== 0)) { // No cell of the shape is in the left-most column
      newShape.cells = this.shape.cells.map(c => c-1);
      if (this.isValid(newShape.cells, this.shape.cells)) {
        this.updateShape(newShape, true);
        this.rerenderBoard();
      }
    }
  }

  right = () => {
    if (this.shape === null) {
      return;
    }
    const newShape = Object.assign({}, this.shape);
    if (newShape.cells.every(c => c % this.props.width !== this.props.width-1)) { // No cell of the shape is in the right-most column
      newShape.cells = this.shape.cells.map(c => c+1);
      if (this.isValid(newShape.cells, this.shape.cells)) {
        this.updateShape(newShape, true);
        this.rerenderBoard();
      }
    }

  }

  updateShape = (newShape: Shape | null, despawnLastShape: boolean) => {
    if (despawnLastShape && this.shape !== null) {
      for (const cell of this.shape.cells) {
        this.boardContents[cell] = 0;
      }
    }
    this.shape = newShape;
    if (newShape === null) {
      return;
    }

    for (const cell of newShape.cells) {
      this.boardContents[cell] = newShape.shapeType;
    }
  }

  clearBoard = () => {
    this.boardContents = new Array(this.props.width*this.fullHeight).fill(0);
  }

  rerenderBoard = () => {
    this.setState({renderedBoardContents: [...this.boardContents]});
  }

  startReset = () => {
    if (this.state.gameStatus === GameStatus.NotStarted) {
      this.startGame();
    } else { // GameStatus.Running || GameStatus.GameOver
      this.resetGame();
    }
    this.rerenderBoard();
  }

  handleKeyPress = (k: React.KeyboardEvent<HTMLInputElement>) => {
    switch (k.code) {
      case "ArrowDown":
      case "KeyS":
        this.down();
        break;
      case "ArrowLeft":
      case "KeyA":
        this.left();
        break;
      case "ArrowRight":
      case "KeyD":
        this.right();
        break;
      case "ArrowUp":
      case "KeyW":
        this.rotate();
        break;
      case "Space":
        if (this.state.gameStatus === GameStatus.NotStarted) {
          this.startGame();
        }
        break;
    }
  }

  startGame = () => {
    this.spawn(true);
    this.state.gameStatus = GameStatus.Running;
    if (this.timerId !== null) {
      clearInterval(this.timerId);
    }
    this.timerId = setInterval(() => this.down(), 300);
  }

  // Does not clear board
  gameOver = () => {
    this.spawn(false); // Spawn null shape
    this.state.gameStatus = GameStatus.GameOver;
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  resetGame = () => {
    this.spawn(false); // Spawn null shape
    this.setState({
      gameStatus: GameStatus.NotStarted,
      score: 0,
      level: 1,
      linesToNextLevel: 5,
    });
    this.clearBoard();
    this.rerenderBoard();
  }

  uploadScore = async (userName: string) => {
    fetch(`https://api.chrisvroegop.com/putscore?player=${userName}&score=${this.state.score}`, {
      method: 'POST'
    });
    this.resetGame();
  }

  render() {
    return ( // tabIndex allows div to receive focus 
    <div className="tetchris-game-scoreboard-wrapper" tabIndex={0} onKeyDown={this.handleKeyPress}>
      <div className="tetchris-game-container">
        <div className="tetchris-game-board-ratio">
          <TetchrisGrid board={this.state.renderedBoardContents} height={this.props.height} width={this.props.width} />
          <TetchrisMessageBox gameStatus={this.state.gameStatus} uploadScore={this.uploadScore} />
        </div>
        <TetchrisGameInfo 
          score={this.state.score} 
          level={this.state.level} 
          linesToNextLevel={this.state.linesToNextLevel}
          startResetButton={this.startReset} 
          leftButton={this.left} 
          downButton={this.down} 
          rightButton={this.right}
          rotateClockwiseButton={this.rotate}
          gameStatus={this.state.gameStatus} />
        <br />
      </div>
      <TetchrisScoreboard version={this.state.scoreboardVersion} />
    </div>
    );
  }
}

export default TetchrisBoard;
