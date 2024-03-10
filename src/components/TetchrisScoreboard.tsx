import { memo, useEffect, useState } from "react";
import "./TetchrisScoreboard.css";


interface TetchrisScoreboardProps {
  version: number
}

interface GetScoresApiResponseItem {
  score: {
    N: number,
  },
  player: {
    S: string,
  }
}

interface GetScoresApiResponse {
  Count: number,
  Items: GetScoresApiResponseItem[],
}

const TetchrisScoreboard = memo(({ version }: TetchrisScoreboardProps) => {
  const [scores, setScores] = useState<GetScoresApiResponseItem[]>([]);

  useEffect(() => {
    async function getScores() {

      const response = await fetch(`https://api.chrisvroegop.com/getscores`);
      if (response.ok) {
        const respJson: GetScoresApiResponse = await response.json();
        setScores(respJson.Items);
      }
    }

    getScores();
  }, [version]);

  const rows = scores.map((s, i) => 
    <div className="tetchris-scoreboard-row" key={i}>
      <p className="tetchris-scoreboard-list">
          {String(i+1).padStart(2, '0')}. <b>
            {s.player.S}
          </b>
      </p>
      <p>
          {s.score.N}
      </p>
      </div>)
  return(
      <div className="tetchris-scoreboard">
      <h1> Scoreboard</h1>
      <div>{rows}</div>
  </div>

  )
});

export default TetchrisScoreboard;
