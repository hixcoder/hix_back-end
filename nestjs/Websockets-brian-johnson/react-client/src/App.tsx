import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { WebsockeProvider, socket } from "./contexts/WebsocketContext";
import { ChatPage } from "./pages/ChatPage/ChatPage";

function App() {
  return (
    <WebsockeProvider value={socket}>
      <ChatPage />
    </WebsockeProvider>
  );
}

export default App;
