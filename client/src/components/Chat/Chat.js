import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Chat = (props) => {
  const { userName, room, socket } = props;
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const handleSendMessage = async () => {
    const messageContent = {
      userName,
      message,
      room,
      date: `${new Date(Date.now()).getHours()}:${new Date(
        Date.now()
      ).getMinutes()}`,
    };
    await socket.emit('message', messageContent);
    setMessageList((prev) => [...prev, messageContent]);

    setMessage('');
  };

  useEffect(() => {
    socket.on('responseMessage', (data) => {
      setMessageList((prev) => [...prev, data]);
    });
  }, [socket]);

  return (
    <div className='flex items-center justify-center h-full'>
      <div className='w-1/3 h-[600px] bg-white relative'>
        <div className='w-full h-16 bg-gray-700 flex items-center justify-start p-3'>
          <div className='w-12 h-12 bg-[#eeeeee] rounded-full'></div>
        </div>
        <div className='w-full h-[400px] overflow-auto'>
          {!!messageList.length &&
            messageList.map((item) => {
              if (userName === item.userName) {
                return (
                  <div
                    key={uuidv4()}
                    className='w-full flex items-center justify-end'
                  >
                    <div className='w-2/3 p-2 flex flex-col items-center justify-start bg-green-600 text-[#eeeeee] text-sm m-2 rounded-br-none rounded-xl'>
                      <span className='w-full text-start text-sm'>
                        {item.message}
                      </span>
                      <span className='w-full text-end text-xs '>
                        {`${item.userName} - ${item.date}`}
                      </span>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={uuidv4()}
                  className='w-full flex items-center justify-start'
                >
                  <div className='w-2/3 p-2 flex flex-col items-center justify-start bg-blue-600 text-[#eeeeee] text-sm m-2 rounded-bl-none rounded-xl'>
                    <span className='w-full text-start text-sm'>
                      {item.message}
                    </span>
                    <span className='w-full text-end text-xs '>
                      {`${item.userName} - ${item.date}`}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
        <div className='absolute left-0 bottom-0 w-full'>
          <input
            className='w-3/4 h-12 border p-3 outline-none'
            type='text'
            placeholder='Send message'
            value={message}
            onChange={({ target }) => setMessage(target.value)}
          />
          <button
            className='w-1/4 bg-indigo-900 text-[#eeeeee] h-12 hover:opacity-80'
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
