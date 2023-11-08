export default function ChatMsgs(prompt: { data: Msg[] }) {
  return (
    <div className="ChatMsgs">
      {prompt.data.length === 0 ? (
        <div>No Messages</div>
      ) : (
        <div>
          {prompt.data.map((element) => (
            <div key={element.messageId}>
              <p>{element.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
