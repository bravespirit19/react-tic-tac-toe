import ChatSection from './GameBoard/ChatSection/ChatSection';
import GameBoard from './GameBoard/GameBoard';
import styles from './PlayerSection.module.css';

const PlayerSection = ({info}) => {
  const statusColor = {
    color: info.status === 'You win!' ? '#00ae1c' : (info.status === 'You lost!' ? '#ff5620' : '#ef9919')
  };
  return (
    <section className={styles.section_wrap}>
      <h2 style={statusColor}>{info.status}</h2>
      <GameBoard player={info.player}/>
      <ChatSection logo={info.logoLink} name={info.playerName} player={info.player}/>
    </section>
  )
}

export default PlayerSection;