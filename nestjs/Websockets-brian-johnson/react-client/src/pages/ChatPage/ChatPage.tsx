import { useContext, useEffect, useState } from "react";
import { WebsocketContext, socket } from "../../contexts/WebsocketContext";
import ChatMsgs from "./components/ChatMsgs";

export const ChatPage = () => {
  const socket = useContext(WebsocketContext);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [value, setValue] = useState("");

  const sendMessage = (msg: string) => {
    try {
      const messageId = new Date().toISOString();
      console.log("----------");
      console.log("send: " + msg);
      const data = { message: msg, messageId: messageId };
      socket.emit("msgToServer", data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  function recieveMessage(data: Msg) {
    const { message, messageId } = data;

    // Check for duplicate messages based on message ID
    if (messages.some((m) => m.messageId === messageId)) {
    } else {
      // console.log(messages);
      console.log("reciev: ", data);
      setMessages((prev) => [...prev, { message, messageId }]);
    }
  }

  useEffect(() => {
    // Establish connection and join room
    // socket.on("connect", () => {
    //   socket.emit("join", "client1");
    // });

    // Handle incoming messages
    socket.on("msgToClient", (data) => {
      recieveMessage(data);
    });
    return () => {
      socket.off("msgToClient");
    };
  }, []);

  const onSubmit = () => {
    sendMessage(value);
    setValue("");
  };

  return (
    <div>
      <div>
        <h1>Websocket component</h1>
        <ChatMsgs data={messages} />
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
