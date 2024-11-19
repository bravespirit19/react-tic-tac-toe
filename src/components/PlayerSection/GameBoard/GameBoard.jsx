import styles from './GameBoard.module.css';
import Cell from './Cell/Cell';
import { useSelector } from 'react-redux';

const GameBoard = ({ player }) => {
  const winningCombination = useSelector(state => state.game.winningCombination);
  const board = useSelector(state => state.game.board);
  const xSymbol = useSelector(state => state.game.xSymbol)
  const oSymbol = useSelector(state => state.game.oSymbol)

  const handleSymbol = (index) => {
    if (board[index] === 'X') return xSymbol;
    if (board[index] === 'O') return oSymbol;
    return null;
  }
  return (
    <>
      <div className={styles.game_board}>
        {board.map((_, index) => {
          const symbol = handleSymbol(index)
          return (
            <Cell key={index} index={index} player={player}>
              {symbol && <img src={symbol} alt="" />}
            </Cell>
          )
        })}
      </div>
      <span className={styles[winningCombination]} />
    </>
  )
}

export default GameBoard;