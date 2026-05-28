import { useEffect, useState } from "react";

import { socket } from "../socket/socket";

import FindMatchCard from "../components/chat/FindMatchCard";
import ChatCard from "../components/chat/ChatCard";
import ContinueCard from "../components/chat/ContinueCard";

import { useNavigate } from "react-router-dom";



const currentUser =
JSON.parse(
localStorage.getItem("user")
);

console.log(currentUser);

const Chat = () => {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  const [conversation,setConversation] = useState(null);

  const [matchedUser,setMatchedUser]=useState(false);

  const [timeLeft,setTimeLeft] = useState(0);

  const [screen, setScreen] = useState("find");

  const [loading,setLoading] = useState(false);

  const [showMenu,setShowMenu] = useState(false);

  const navigate = useNavigate();


  const findMatch=()=>{

    setLoading(true);
    
    socket.emit(
    "find_match",
    {
    userId:
    currentUser._id
    });
    
    console.log(
    "Searching..."
    );
    
  };

  useEffect(() => {

    socket.connect();

    socket.emit(
      "user_connected",
      currentUser._id
    );

    socket.on(
      "permanent_match",
      ()=>{
      
      console.log(
      "Permanent match received"
      );
      
      alert(
      "Both users want to continue!"
      );
      
    });

    socket.on(
      "match_found",
      (data)=>{
      
      console.log(
      "Matched:",
      data
      );

      setLoading(false);
      
      setConversation(data);
      
      setMatchedUser(true);

      setScreen("chat");
      
      socket.emit(
      "join_room",
      data.roomId
      );

      setScreen("chat");
      
    });
  
    socket.on(
      "receive_message",
      (data)=>{
        setMessages((prev)=>[
          ...prev,
          data
        ]);
    });
  
    return ()=>{
      socket.off(
        "receive_message"
        );
  
      socket.disconnect();
    };
  
  },[]);

  useEffect(()=>{

    if(!conversation)
    return;
    
    const endTime =
    
    new Date(
    conversation.startedAt
    ).getTime()
    
    +
    
    conversation.duration
    *1000;
    
    const interval =
    
    setInterval(()=>{
    
    const remaining =
    
    Math.max(
    0,
    Math.floor(
    (endTime-Date.now())
    /1000
    )
    );
    
    setTimeLeft(
    remaining
    );
    
    if(
    remaining<=0
    ){
    
    clearInterval(
    interval
    );
    setScreen("continue");
    
    }
    
    },1000);
    
    return ()=>{
    
    clearInterval(
    interval
    );
    
    };
    
    },[conversation]);

  const sendMessage = () => {
    console.log("Send clicked");

    console.log(conversation);

    if (!message.trim()) return;
  
    const messageData = {
      roomId: conversation.roomId,
  
      conversationId:
      conversation._id,
  
      sender:
      currentUser._id,
  
      message,
    };
  
    socket.emit(
      "send_message",
      messageData
    );
  
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center text-white">
      <div className="absolute top-4 right-4">

        <button
          onClick={() =>
            setShowMenu(!showMenu)
          }
          className="
          w-10
          h-10
          rounded-full
          bg-gray-700
          flex
          items-center
          justify-center
          "
        >

          {currentUser.username[0].toUpperCase()}

        </button>

        {showMenu && (

          <div className="
          absolute
          top-12
          right-0
          bg-[#1a1a1a]
          border
          border-gray-700
          rounded-xl
          w-40
          p-2
          ">

            <button
              onClick={() =>
                navigate("/profile")
              }
              className="
              w-full
              text-left
              p-2
              hover:bg-gray-800
              rounded
              "
            >

            Matches

            </button>

            <button
              onClick={() => {

                localStorage.clear();

                navigate("/login");

              }}

              className="
              w-full
              text-left
              p-2
              hover:bg-gray-800
              rounded
              "
            >

            Logout

            </button>

          </div>
          )}
      </div>
      <div className="w-full max-w-md bg-[#1a1a1a] border border-gray-700 rounded-3xl p-6">
        <div className="text-center mb-4">

          {screen==="find" && (

          <p className="text-gray-400">

          Looking for someone...

          </p>

          )}

          {screen==="chat" && (

          <p className="text-green-400">

          🟢 Connected

          </p>

          )}

          {screen==="continue" && (

          <p className="text-yellow-400">

          ⏳ Time ended

          </p>

          )}

        </div>

        {screen === "find" && (
          <FindMatchCard
          onFindMatch={findMatch}
          loading={loading}
          />
        )}
  
        {screen === "chat" && (
          <ChatCard
            messages={messages}
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
            timer={timeLeft}
            currentUser={currentUser}
          />
        )}
  
        {screen === "continue" && (
          <ContinueCard
            onYes={() => {
              socket.emit("continue_chat", {
                conversationId: conversation._id,
                roomId: conversation.roomId,
                userId: currentUser._id
              });
            }}
            onNo={() => {
              setScreen("find");
            }}
          />
        )}
  
      </div>
    </div>
  );};

export default Chat;