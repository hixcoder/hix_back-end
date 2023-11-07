import { useState } from 'react';
import reactLogo from './assets/react.svg';
import { WebsockeProvider, socket } from './contexts/WebsocketContext';
import { Websocket } from './components/Websocket';

function App() {
  const [count, setCount] = useState(0);

  return (
    <WebsockeProvider value={socket}>
      <Websocket />
    </WebsockeProvider>
  );
}

export default App;
