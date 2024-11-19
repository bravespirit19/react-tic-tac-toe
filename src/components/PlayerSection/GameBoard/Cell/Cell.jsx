import { useEffect } from 'react';
import { makeMove, resetBoard } from '../../../../store/gameSlice';
import styles from './Cell.module.css';
import {useDispatch, useSelector} from 'react-redux'

const Cell = ({index, player, children}) => {
  const dispatch = useDispatch();
  const isXTurn = useSelector(state => state.game.isXTurn)
  const isGameOver = useSelector(state => state.game.isGameOver)
  const handleClick = () => {
    if(isXTurn && player === 'O' || !isXTurn && player === 'X') return;
    dispatch(makeMove({index}))
  }

  useEffect(() => {
    if(isGameOver) {
      const timer = setTimeout(() => {
        dispatch(resetBoard());
      }, 5000)

      return () => clearTimeout(timer);
    }
  }, [isGameOver, dispatch])

  return (
    <div className={styles.cell} onClick={handleClick}>
      {children}
    </div>
  )
}

export default Cell;