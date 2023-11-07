import { useContext, useEffect, useState } from 'react';
import { WebsocketContext } from '../contexts/WebsocketContext';

type MessagePayload = {
  content: string;
  msg: string;
};

export const Websocket = () => {
  const socket = useContext(WebsocketContext);
  const [messages, setMessages] = useState<MessagePayload[]>([]);
  const [value, setValue] = useState('');
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected!');
    });
    socket.on('onMessage', (newMessage: MessagePayload) => {
      console.log('onMessage event recieved!');
      console.log(newMessage);
      setMessages((prev) => [...prev, newMessage]);
    });
    return () => {
      console.log('Unregistering Events...');
      socket.off('connect ');
      socket.off('onMessage');
    };
  }, []);

  const onSubmit = () => {
    socket.emit('newMessage', value);
    setValue('');
  };
  return (
    <div>
      <div>
        <h1>Websocket component</h1>
        <div>
          {messages.length === 0 ? (
            <div>No Messages</div>
          ) : (
            <div>
              {messages.map((msg) => (
                <div>
                  <p>{msg.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <button onClick={onSubmit}>Submit</button>
      </div>
    </div>
  );
};
