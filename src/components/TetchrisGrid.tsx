import { ShapeTypeClassMapping } from "../common/Shape";
import { utils } from "../common/utils";
import "./TetchrisGrid.css";


interface TetchrisGridProps {
  board: Array<number>,
  width: number,
  height: number,
}

const TetchrisGrid = ({ board, width, height }: TetchrisGridProps) => {
  let firstCellInCurrRow = width * (height - 1); // i.e. cell 190, the first cell in the top visible row (190-199). The rows above are invisible and just used to check if the player has lost.
  const rows = [];
  for (let i = 0; i < height; ++i) {
    rows.push(<tr key={i}>{
      utils.range(firstCellInCurrRow, firstCellInCurrRow + width).map((cellId: number) => {
        return <td key={cellId} className={`cell ${ShapeTypeClassMapping[board[cellId]]}`} ></td>;
      })}</tr>);
        
    firstCellInCurrRow = firstCellInCurrRow - width;
  }
  return(
      <table className={"tetchris-game-board"}>
        <tbody>{rows}</tbody>
      </table>
  )
};

export default TetchrisGrid;
