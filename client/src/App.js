import { useState } from 'react';

import { io } from 'socket.io-client';
import Room from './components/Room/Room';
import Chat from './components/Chat/Chat';

const socket = io('http://localhost:4000');

const App = () => {
  const [userName, setUserName] = useState('');
  const [room, setRoom] = useState('');
  const [chatScreen, setChatScreen] = useState(false);

  const roomStates = {
    userName,
    room,
    socket,
    setUserName,
    setRoom,
    setChatScreen,
  };

  const chatStates = {
    userName,
    room,
    socket,
  };

  return (
    <div className='app__container'>
      {chatScreen ? <Chat {...chatStates} /> : <Room {...roomStates} />}
    </div>
  );
};

export default App;
