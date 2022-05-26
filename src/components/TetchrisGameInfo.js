
export function TetchrisGameInfo(props) {
    // TODO: Fix button <br/> with proper layout
    return (
        <div className="tetchris-game-info">
            <div className="tetchris-scoring">
                <p>{`Score: ${props.score}`}</p>
                <p>{`Level: ${(props.level == 10) ? "10 (max)" : props.level}`}</p>
                <p>{`Lines left: ${props.linesToNextLevel} `}</p>
            </div>
            <div className="tetchris-buttons">
                <button className="tetchris-button" onClick={props.startResetButton}>{props.gameReset ? "Start" : "Reset"}</button><br/>
                <button className="tetchris-button" onClick={props.leftButton}>◀</button><br/>
                <button className="tetchris-button" id="tetchris-down" onClick={props.downButton}>▼</button><br/>
                <button className="tetchris-button" onClick={props.rightButton}>▶</button><br/>
                <button className="tetchris-button" onClick={props.rotateClockwiseButton}>↻</button><br/>
            </div>

        </div>
    )
}