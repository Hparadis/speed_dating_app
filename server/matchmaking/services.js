const waitingQueue =
require("./queue");

const Conversation =
require("../models/Conversation");

const findMatch =
async(userId)=>{

    const existingUser =
    waitingQueue.find(
        user => user === userId
    );

    if(existingUser){

        return null;
    }

    waitingQueue.push(
        userId
    );

    console.log(
        "Queue:",
        waitingQueue
    );

    if(
        waitingQueue.length >=2
    ){

        const user1 =
        waitingQueue.shift();

        const user2 =
        waitingQueue.shift();

        const conversation =
        await Conversation.create({

            participants:[
                user1,
                user2
            ],

            roomId:
            `room_${Date.now()}`,

            startedAt:
            new Date(),

            duration:
            60 // testing: 60 seconds
        });

        return conversation;
    }

    return null;
};

module.exports = {
    findMatch
};