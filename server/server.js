require("dotenv").config();

const express = require("express");
const cors = require("cors");

const likes = {};


const http = require("http");

const { Server } = require("socket.io");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const conversationRoutes = require("./routes/conversationRoutes");

const Conversation =
require("./models/Conversation");

const Match = require( "./models/Match.js");

const Message = require(
  "./models/Message"
);  

const messageRoutes = require(
  "./routes/messageRoutes"
);

const matchRoutes =
require("./routes/matchRoutes");

const app = express();



//websockets
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

// our middleware to parse JSON bodies
app.use(express.json());

// connect to the database
connectDB();

// cors
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// create route prefixing
app.use("/api/auth", authRoutes);

app.use(
  "/api/conversations",
  conversationRoutes
);

app.use(
  "/api/messages",
  messageRoutes
);

app.use("/api/matches", matchRoutes);

// routes
app.get("/", (req, res) => {
  res.send("Server running");
});

//start the server
server.listen(5000, () => {
  console.log("Server started on port 5000");
});

const onlineUsers = {};
const activeUsers = new Map(); 
const waitingQueue = [];

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  const {findMatch}=require("./matchmaking/services");

  socket.on(
    "user_connected",
    (userId)=>{
    
    onlineUsers[userId] =
    socket.id;

    activeUsers.set(socket.id, userId);
    
    console.log(
    "Online users:",
    onlineUsers
    );
    
    });
    
    socket.on(
    "disconnect",
    ()=>{
    
    for(
    const userId
    in onlineUsers
    ){
    
    if(
    onlineUsers[userId] ===
    socket.id
    ){
    
    delete onlineUsers[userId];
    
    break;
    
    }
    
    }
    
  });

  socket.on(
    "find_match",
    async ({ userId }) => {
    
    try {
    
    console.log(
    "Searching user:",
    userId
    );
    
    // prevent duplicate queue entries
    const existing =
    waitingQueue.find(
    u => u.userId === userId
    );
    
    if(existing){
    
    console.log(
    "Already waiting"
    );
    
    return;
    }
    
    // add user
    waitingQueue.push({
    
    socketId:
    socket.id,
    
    userId
    
    });
    
    console.log(
    "Queue:",
    waitingQueue.map(
    u => u.userId
    )
    );
    
    // not enough users yet
    if(
    waitingQueue.length < 2
    ){
    return;
    }
    
    // remove first two users
    const user1 =
    waitingQueue.shift();
    
    const user2 =
    waitingQueue.shift();
    
    const roomId =
    "room_" + Date.now();
    
    const conversation =
    await Conversation.create({
    
    participants:[
    user1.userId,
    user2.userId
    ],
    
    roomId,
    
    startedAt:
    new Date(),
    
    duration:
    60
    
    });
    
    console.log(
    "Match created:",
    conversation._id
    );
    
    // send conversation to BOTH users
    io.to(
    user1.socketId
    ).emit(
    "match_found",
    conversation
    );
    
    io.to(
    user2.socketId
    ).emit(
    "match_found",
    conversation
    );
    
    }
    catch(error){
    
    console.log(
    "Match error:",
    error
    );
    
    }
    
  });


  socket.on(
    "send_message",
    async (data) => {
      try {
  
        let newMessage =
        await Message.create({
  
          conversationId:
          data.conversationId,
  
          sender:
          data.sender,
  
          text:
          data.message,
        });
  
        newMessage =
        await newMessage.populate(
          "sender",
          "username"
        );
  
        io.to(
          data.roomId
        ).emit(
          "receive_message",
          newMessage
        );
  
      } catch(error){
  
        console.log(error);
  
      }
  });
  socket.on("join_room", (roomId) => {
    socket.join(roomId);
  
    console.log(
      `${socket.id} joined ${roomId}`
    );
  });
  socket.on(
    "continue_chat",
    async (data)=>{

      const {
        conversationId,
        userId,
        roomId
      }=data;

    const continueVotes = {}; 
    // { conversationId: Set(userIds) }

    console.log(
      "Server received:",
      data
    );
    
    
    if(
    !likes[conversationId]
    ){
    
    likes[conversationId]={};
    }
    
    console.log(
      "Created conversation entry"
      );

    likes[conversationId][userId]=true;

    console.log(
      "Current likes:",
      likes
      );
    
    const responses =
    Object.keys(
    likes[conversationId]
    );

    console.log(
      "Response count:",
      responses.length
      );
    
    if(
    responses.length===2
    ){

    console.log(
      "Both users clicked YES"
      );
    
    io.to(
    data.roomId
    ).emit(
    "permanent_match"
    );
    
    }
    if (!continueVotes[conversationId]) {
      continueVotes[conversationId] = new Set();
    }
  
    continueVotes[conversationId].add(userId);
  
    // if both users said YES
    if (continueVotes[conversationId].size === 2) {
  
      const conversation = await Conversation.findById(conversationId);
  
      await Match.create({
        users: conversation.participants,
        conversationId: conversation._id,
        status: "active",
      });
  
      io.to(roomId).emit("permanent_match", {
        message: "You are now permanently matched!",
      });
  
      delete continueVotes[conversationId];
    }
    });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    activeUsers.delete(socket.id);
  });
});



