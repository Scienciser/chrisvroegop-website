
export function TetchrisScoreboard(props) {
    
    // props.scoreList.forEach((props.scoreList,index) => {
    //     props.scoreboard.push( <li key={index}> {props.scoreList} </li>)
    //   })
     
    
    return (
        <div className="tetchris-scoreboard">
            <h1> Scoreboard</h1>
            <div>{props.scoreboard}</div>
        </div>
    )
}