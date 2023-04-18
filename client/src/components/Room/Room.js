import React from 'react';

const Room = (props) => {
  const { userName, room, socket, setUserName, setRoom, setChatScreen } = props;

  const handleSendRoom = () => {
    socket.emit('room', room);
    setChatScreen(true);
  };

  return (
    <div className=' flex items-center justify-center h-full'>
      <div className='w-1/3 bg-indigo-600 h-[300px] flex flex-col space-y-4 p-3 rounded-xl'>
        <h1 className='text-center my-4 font-bold text-2xl'>Welcome to Chat</h1>
        <input
          className='h-12 rounded-xl p-3 outline-none'
          type='text'
          placeholder='Username'
          value={userName}
          onChange={({ target }) => setUserName(target.value)}
        />
        <input
          className='h-12 rounded-xl p-3 outline-none'
          type='text'
          placeholder='Room'
          value={room}
          onChange={({ target }) => setRoom(target.value)}
        />
        <button
          onClick={handleSendRoom}
          className='bg-indigo-900 text-[#eeeeee] tracking-wider h-12 text-xl text-center rounded-xl cursor-pointer hover:opacity-80'
        >
          CHAT!!!
        </button>
      </div>
    </div>
  );
};

export default Room;
