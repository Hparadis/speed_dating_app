const ChatCard = ({
    messages,
    message,
    setMessage,
    sendMessage,
    timer,
    currentUser
  }) => {
    return (
      <div className="flex flex-col h-125">
  
        {/* header */}
        <div className="flex justify-between mb-3 text-gray-300">
          <span>Chat</span>
          <span>{timer}s</span>
        </div>
  
        {/* messages */}
        <div className="h-87.5 overflow-y-auto flex flex-col gap-4 p-4">

          {messages.map((msg)=>(

          <div
          key={msg._id}

          className={`max-w-[75%] p-3 rounded-2xl

          ${
          msg.sender?._id === currentUser._id

          ? "self-end bg-blue-600"

          : "self-start bg-gray-700"
          }
          `}
          >

          <div
          className="text-xs mb-1 opacity-70"
          >

          {
          msg.sender?._id === currentUser._id
          ? "You"
          : msg.sender?.username
          }

          </div>

          <div>

          {msg.text}

          </div>

          </div>

          ))}

        </div>
  
        {/* input */}
        <div className="flex gap-2">
          <input
            className="flex-1 bg-[#111] border border-gray-700 rounded-xl px-3 py-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type..."
          />
  
          <button
            onClick={sendMessage}
            className="bg-white text-black px-4 rounded-xl"
          >
            Send
          </button>
        </div>
  
      </div>
    );
  };
  
  export default ChatCard;