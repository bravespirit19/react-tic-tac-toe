import { createSlice } from '@reduxjs/toolkit';
import {v4 as uuidv4} from 'uuid'
const initialState = {
  board: Array(9).fill(null),
  isXTurn: true,
  xSymbol: '/x.svg',
  oSymbol: '/o.svg',
  isGameOver: false,
  winningCombination: null,
  messages: [],
  playerOInfo: {
    wins: 0,
    player: 'O',
    status: 'Game started: Wait for your opponent.',
    symbolLink: '/o.svg',
    logoLink: '/O-logo.svg',
    playerName: 'Player 1'
  },
  playerXInfo: {
    wins: 0,
    player: 'X',
    status: 'Game started! Your turn:',
    logoLink: '/X-logo.svg',
    playerName: 'Player 2'
  }
}

const checkWinner = (board) => {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return {combination, winner:board[a]};
    }
  }

  if (board.every(cell => cell !== null)) {
    return {combination: null, winner: 'draw'};
  }

  return null;
}

const formatWinningCombination = (c) => {
  return `win_${c[0]}_${c[1]}_${c[2]}`
} 

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    makeMove(state, action) {
      if (state.board[action.payload.index] || checkWinner(state.board)) return;

      state.board[action.payload.index] = state.isXTurn ? 'X' : 'O';
      if (!state.isXTurn) {
        state.playerXInfo.status = 'Your turn:'
        state.playerOInfo.status = 'Wait for your opponent.'
      } else if (state.isXTurn) {
        state.playerOInfo.status = 'Your turn:'
        state.playerXInfo.status = 'Wait for your opponent.'
      }

      state.isXTurn = !state.isXTurn;

      const winnerInfo = checkWinner(state.board);
      if (winnerInfo) {
        state.winningCombination = winnerInfo.combination ? formatWinningCombination(winnerInfo.combination) : null; 
        state.isGameOver = true;
        if (winnerInfo.winner === 'X') {
          ++state.playerXInfo.wins;
          state.playerXInfo.status = 'You win!';
          state.playerOInfo.status = 'You lost!';
        } else if (winnerInfo.winner === 'O') {
          ++state.playerOInfo.wins;
          state.playerOInfo.status = 'You win!';
          state.playerXInfo.status = 'You lost!';
        } else if (winnerInfo.winner === 'draw') {
          state.playerXInfo.status = 'Draw!';
          state.playerOInfo.status = 'Draw!';
        }
        return;
      }
    },
    resetBoard(state) {
      state.board = Array(9).fill(null);
      state.isGameOver = false;
      state.isXTurn = true;
      state.playerXInfo.status = 'Game started! Your turn:';
      state.playerOInfo.status = 'Game started: Wait for your opponent.';
      state.winningCombination = null;
    },
    resetGame(state) {
      state.board = Array(9).fill(null);
      state.isXTurn = true;
      state.playerOInfo.wins = '0';
      state.playerXInfo.wins = '0'
      state.playerXInfo.status = 'Game started! Your turn:'
      state.playerOInfo.status = 'Game started: Wait for your opponent.'
      state.winningCombination = null;
      state.messages = [];
    },
    sendMessage(state, action) {
      const newMessage = {id: uuidv4(), message: action.payload.message, sender: action.payload.sender, time: action.payload.time}
      state.messages.push(newMessage);
    }
  }
})

export const { makeMove, resetGame, resetBoard, sendMessage } = gameSlice.actions;

export default gameSlice.reducer;