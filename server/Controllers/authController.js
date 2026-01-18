const User= require("../Models/user");
const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken");


const signup= async (req,res)=>{
    const {email, password, firstName, lastName}= req.body;

    try{

        let user= await User.findOne({email});

        if(user){
            return res.status(400).json({success:false , message:"Please login", data:null});
        }

        const hashedPassword= await bcrypt.hash(password,10);
        user= await User.create({
            email,
            password:hashedPassword,
            firstName,
            lastName,

        })

        return res.status(201).json({success:true , message:"User created successfully", data:user});

    } catch(error){

        return res.status(500).json({success:false , message:error.message, data:null});

        
}
}

const login= async (req,res)=>{
    const {email, password}= req.body;

    try{
        const user= await User.findOne({email});
        if(!user){
            return res.status(400).json({success:false , message:"User not found, please signup", data:null});
        }

        const isPasswordMatch= await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({success:false , message:"Invalid credentials", data:null});
        }


        const token= jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET, {expiresIn:"1d"});

        return res.status(200).json({success:true, message:"Login successful", data:{user,token}});

        
    } catch(error){
        return res.status(500).json({success:false , message:error.message, data:null});
    }
}

module.exports={signup, login};

