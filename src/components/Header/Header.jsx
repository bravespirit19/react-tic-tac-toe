import { useDispatch, useSelector } from 'react-redux';
import styles from './Header.module.css';
import { resetGame } from '../../store/gameSlice';

const Header = () => {
  const oWins = useSelector(state => state.game.playerOInfo.wins);
  const xWins = useSelector(state => state.game.playerXInfo.wins);

  const dispatch = useDispatch();
  const handleReset = () => {
    dispatch(resetGame())
  }
  return (
    <header>
      <div className={styles.header_content}>
        <div className={styles.player_title}>Player 1</div>
        <div className={styles.score_wrap}>
          <div className={styles.score}>
            {`Score ${oWins}:${xWins}`}
          </div>
          <button className={styles.reset_btn} onClick={handleReset}>Reset</button>
        </div>
        <div className={styles.player_title}>Player 2</div>
      </div>
    </header>
  )
}

export default Header;