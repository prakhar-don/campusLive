const Event= require("../Models/event");

const ROLES= require("../Lib/roles");

const user= require("../Models/user");

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

const registerUser  = async (req,res)=>{
    const userId= req.id;
    const eventId= req.params.id;

    try{
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

       const user= await user.findById(userId);
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
    const userId= req.id;

    try{

        const events= await user.findById(userId).populate({
            path:"registeredEvents"
        })
        .sort({createdAt:-1});

        if(events.registeredEvents.length <= 0){
            return res.status(404).json({success:false, message:"No registered events found", data:null});
        
        }

        return res.status(200).json({success:true, message:"Registered events fetched successfully", data:events});

    }catch(error){
        return res.status(500).json({success:false, message:error.message, data:null});
    }
}

const getEventById= async (req,res)=>{
    const {eventId}= req.params.id;

    try{
            const eventdData= await Event.findById(eventId).populate({
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

    const {eventId}= req.params;

    try{
        await Event.findByIdAndUpdate(eventId, {status:"started"});

        return res.status(200).json({success:true, message:"Event started successfully", data:null});
    } catch(error){
        return res.status(500).json({success:false, message:error.message, data:null});
    }
}

const endEvent= async (req,res)=>{
    if(req.user.role !== ROLES.Admin){
        return res.status(403).json({success:false , message:"You are not authorized to end events", data:null})
}

   const {eventId}= req.params;

   try{

    await Event.findByIdAndUpdate(eventId, {status:"ended"});

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
}


