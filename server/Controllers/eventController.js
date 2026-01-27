const Event= require("../Models/event");

const ROLES= require("../Lib/roles");

const User= require("../Models/user");

const mongoose= require("mongoose");

const createEvent= async (req,res)=>{

    if(req.user.role !== ROLES.Admin){
        return res.status(403).json({success:false , message:"You are not authorized to create events", data:null})
    }

    const userId= req.user.id;
    
    const {title, description, date, time}= req.body;
    console.log(userId);

    try{

        const event = await Event.create({
            title,
            description,
            date,
            time,
            creator:userId,

        });

        return res.status(201).json({success:true , message:"Event created successfully", data:event});

    }catch(error){
        return res.status(500).json({success:false , message:error.message, data:null});
    }

}

 const getAdminCreatedEvents = async (req, res) => {
  if (req.user.role !== ROLES.Admin) {
    return res.status(403).json({
      success: false,
      message: "Not authorized",
      data: null,
    });
  }

  try {
    const events = await Event.find({ creator: req.user.id })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Admin created events fetched successfully",
      data: events,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const registerUser  = async (req,res)=>{
    if(req.user.role !== ROLES.user){
        return res.status(401).json({success:false , message:"You are not authorized to register for events", data:null});    
    }
    const userId= req.user.id;
    
    const eventId= req.params.id;

    try{

        console.log("JWT USER:", req.user);

       const event= await Event.findById(eventId);
       if(!event){
        return res.status(404).json({success:false, message:"Event not found", data:null});
       }

       const isUserRegistered= event.registeredUsers.some((user=> user.toString() === userId));

       if(isUserRegistered){
        return res.status(400).json({success:false, message:"User is already registered for this event", data:null});
       }

       event.registeredUsers.push(userId);

       await event.save();

       const user= await User.findById(userId);
       user.registeredEvents.push(eventId);
       await user.save();

       return res.status(200).json({success:true, message:"User regitered for the event successfully", data:event});


    }catch(error){
        return res.status(500).json({success:false , message:error.message, data:null});
    }
}

const getEvents= async (req,res)=>{

    try{
        const events= await Event.find().populate({
            path:"registeredUsers",
            select:"firstName lastName",
        })
        .sort({createdAt:-1});

        return res.json({success:true, message:"Events fetched successfully", data:events});
    }catch(error){
        return res.status(500).json({success:false, message:error.message, data:null});

    }

}

const getRegisteredEvents= async (req,res)=>{
    const userId= req.user.id;

    try{

        const events= await User.findById(userId).populate({
            path:"registeredEvents",
            options:{
                sort:{createdAt:-1},

            }
        })
        

        if(events.registeredEvents.length <= 0){
            return res.status(404).json({success:false, message:"No registered events found", data:null});
        
        }

        return res.status(200).json({success:true, message:"Registered events fetched successfully", data:events});

    }catch(error){
        return res.status(500).json({success:false, message:error.message, data:null});
    }
}

const getEventById= async (req,res)=>{
    const {id}= req.params;

     if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid event ID",
      data: null,
    });
  }

    try{
            const eventdData= await Event.findById(id).populate({
                path:"registeredUsers",
                select:"firstName lastName role",
            })

            if(!eventdData){
                return res.status(404).json({success:false, message:"Event not found", data:null});
            }

            return res.status(200).json({success:true, message:"Event fetched successfully", data:eventdData});
    }
    catch(error){
        return res.status(500).json({success:false, message:error.message, data:null});
    }

}

const searchEvent= async (req,res)=>{
    const {search}= req.query;

    try{

        const events= await Event.find({
            $or:[
                {title:{$regex: new RegExp(search, "i")}},
                {description:{$regex: new RegExp(search, "i")}},
            ],
        });

        return res.status(200).json({success:true, message:"Events fetched successfully", data:events});


    } catch (error){

        return res.status(500).json({success:false, message:error.message, data:null});
    }
    
}

const startEvent= async (req,res)=>{
    
    if(req.user.role !== ROLES.Admin){
        return res.status(403).json({success:false , message:"You are not authorized to start events", data:null})
    }

    const {id}= req.params;

    try{
        await Event.findByIdAndUpdate(id, {status:"started"});

        return res.status(200).json({success:true, message:"Event started successfully", data:null});
    } catch(error){
        return res.status(500).json({success:false, message:error.message, data:null});
    }
}

const endEvent= async (req,res)=>{
    if(req.user.role !== ROLES.Admin){
        return res.status(403).json({success:false , message:"You are not authorized to end events", data:null})
}

   const {id}= req.params;

   try{

    await Event.findByIdAndUpdate(id, {status:"ended"});

    return res.status(200).json({success:true, message:"Event ended successfully", data:null});

   } catch(error){
    return res.status(500).json({success:false, message:error.message, data:null});
   }

}

module.exports={
    createEvent,
    registerUser,
    getEvents,
    getRegisteredEvents,
    getEventById,
    searchEvent,
    startEvent,
    endEvent,
    getAdminCreatedEvents
}


