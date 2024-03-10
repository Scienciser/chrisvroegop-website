import { useState } from "react";
import { GameStatus } from "../common/utils"
import "./TetchrisMessageBox.css";


interface TetchrisMessageBoxProps {
  gameStatus: GameStatus,
  uploadScore: (score: string) => void,
}

const TetchrisMessageBox = ({ gameStatus, uploadScore }: TetchrisMessageBoxProps) => {
  const [userName, setUserName] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  }

  return(
      <div
        style={{display: gameStatus === GameStatus.Running ? "none" : "block"}}
        className="tetchris-game-details">
          {gameStatus === GameStatus.GameOver 
          ?
          <form className="tetchris-game-details">
            <p>Game Over!</p>
            <p>Enter your name:</p>
            <input type='text' value={userName} onChange={handleChange}></input>
            <button className="tetchris-button" onClick={() => uploadScore(userName)}>Submit</button>
          </form>
          : "Click start to begin!\nYou can use the buttons to the right or the arrow keys"}
      </div>
  )
};

export default TetchrisMessageBox;
