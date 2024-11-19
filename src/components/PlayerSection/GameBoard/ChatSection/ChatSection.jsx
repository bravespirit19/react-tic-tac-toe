import styles from './ChatSection.module.css';
import { useDispatch, useSelector } from 'react-redux'
import { sendMessage } from '../../../../store/gameSlice';
import { useState } from 'react';
import moment from 'moment';

const ChatSection = ({ logo, name, player }) => {
  const [text, setText] = useState('')
  const messagesArr = useSelector(state => state.game.messages);
  const dispatch = useDispatch();
  const messageStyle = (player, item) => {
    if (player === 'X' && item.sender === 'X' || player === 'O' && item.sender === 'O') return 'own_message';
    if (player === 'X' && item.sender === 'O' || player === 'O' && item.sender === 'X') return 'other_message';
  }
  const handleSendMessage = (message, player) => {
    if (message.trim() === '') return;
    const time = moment().format('HH:mm')
    dispatch(sendMessage({ message, sender: player, time }));
    setText('');

  }

  const onEnterKeyDown = (e) => {
    if(e.key === 'Enter')  handleSendMessage(text, player) 
  }
  return (
    <section className={styles.chat_section}>
      <div className={styles.interlocutor}>
        <img className={styles.interlocutor_avatar} src={logo} alt="" />
        <div className={styles.interlocutor_name}>{name}</div>
      </div>
      <div className={styles.chat}>
        <div className={styles.messages}>
          {messagesArr.map((item) => <div className={styles[messageStyle(player, item)]} key={item.id}>
            <div className={styles.message_text}>{item.message}</div>
            <div className={styles.message_time}>{item.time}</div>
          </div>)}
        </div>
        <div className={styles.messages_input}>
          <input type="text" placeholder='Message' value={text} onChange={(e) => setText(e.target.value)} onKeyDown={onEnterKeyDown} />
          <button>
            <img src='/send-message.svg' alt='send' className={styles.send_message} onClick={() => handleSendMessage(text, player)} />
          </button>
        </div>
      </div>
    </section>
  )
}

export default ChatSection;