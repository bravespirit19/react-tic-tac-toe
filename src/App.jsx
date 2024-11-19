import { useSelector } from 'react-redux';
import './App.css'
import Header from './components/Header/Header'
import PlayerSection from './components/PlayerSection/PlayerSection';

function App() {
  const playerOInfo = useSelector(state => state.game.playerOInfo)
  const playerXInfo = useSelector(state => state.game.playerXInfo)
  return (
    <div className='container'>
      <Header />
      <div className='battlefield'>
        <PlayerSection info={playerOInfo} />
        <div className='border'></div>
        <PlayerSection info={playerXInfo} /> 
      </div>
    </div>
  )
}

export default App
