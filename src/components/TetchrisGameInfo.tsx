import { GameStatus } from "../common/utils";
import "./TetchrisGameInfo.css";


interface TetchrisGameInfoProps {
    score: number,
    level: number,
    linesToNextLevel: number,
    gameStatus: GameStatus,
    startResetButton: () => void,
    rotateClockwiseButton: () => void,
    leftButton: () => void,
    rightButton: () => void,
    downButton: () => void,
}

function TetchrisGameInfo(props: TetchrisGameInfoProps) {
    return (      
        <div className="tetchris-game-info">
            <div className="tetchris-scoring">
                <p>{`Score: ${props.score}`}</p>
                <p>{`Level: ${(props.level == 10) ? "10 (max)" : props.level}`}</p>
                <p>{`Lines left: ${props.linesToNextLevel} `}</p>
            </div>
            <div>
                <button className="tetchris-button" onClick={props.startResetButton}>{props.gameStatus === GameStatus.NotStarted ? "Start" : "Reset"}</button><br/>
                <button className="tetchris-button" onClick={props.leftButton}>◀</button><br/>
                <button className="tetchris-button" id="tetchris-down" onClick={props.downButton}>▼</button><br/>
                <button className="tetchris-button" onClick={props.rightButton}>▶</button><br/>
                <button className="tetchris-button" onClick={props.rotateClockwiseButton}>↻</button><br/>
            </div>

        </div>
    )
}

export default TetchrisGameInfo;
