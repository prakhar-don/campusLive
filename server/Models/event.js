const mongoose= require("mongoose");
const eventSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    date:{
        type:String,
        required:true,
    },
    time:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["not started","started","ended"],
        default:"not started"
    },
    registeredUsers:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ],

    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }
},{timestamps:true});

module.exports= mongoose.model("Event", eventSchema);