const express = require("express");
const Match = require("../models/Match");

const router = express.Router();

router.get("/:userId", async(req,res)=>{

try{

const matches =
await Match.find({

users:req.params.userId

}).populate(
"users",
"username email"
)
.populate(
    "conversationId"
)
;

res.json(matches);

}catch(error){

    console.log(
    "Match route error:",
    error
    );
    
    res.status(500).json({
    
    message:
    error.message
    
    });
}
    
});
    
module.exports = router;