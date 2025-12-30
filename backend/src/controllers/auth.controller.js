import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const setCookie = (res, token)=>{
  res.cookie(process.env.COOKIE_NAME, token, {
    httpOnly:true,
    secure:false, // true in prod
    sameSite:"lax"
  });
};

export const signup = async(req,res)=>{
  try{
    const { fullName,email,password,role } = req.body;

    const exists = await User.findOne({ email });
    if(exists) return res.status(400).json({message:"Email already exists"});

    const hash = await bcrypt.hash(password,10);

    const user = await User.create({ 
      fullName,
      email,
      password: hash,
      role: role === "admin" ? "admin" : "user"   // 👈 role support
    });

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
    res.cookie(process.env.COOKIE_NAME, token, {
      httpOnly:true,
      secure:false,
      sameSite:"lax"
    });

    res.json({
      message:"Signup success",
      user:{ fullName:user.fullName,email:user.email,role:user.role }
    });

  }catch(err){
    console.log(err);
    res.status(500).json({message:"Server error"});
  }
};


export const login = async(req,res)=>{
  try{
    const {email,password} = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({message:"Invalid creds"});

    const match = await bcrypt.compare(password,user.password);
    if(!match) return res.status(400).json({message:"Invalid creds"});

    if(user.status === "inactive")
      return res.status(403).json({message:"Account disabled"});

    user.lastLogin = new Date();
    await user.save();

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
    setCookie(res, token);

    res.json({
      message:"Login success",
      user:{ fullName:user.fullName,email:user.email,role:user.role }
    });

  }catch(err){
    res.status(500).json({message:"Server error"});
  }
};

export const me = async(req,res)=>{
  res.json(req.user);
};

export const logout = async(req,res)=>{
  res.clearCookie(process.env.COOKIE_NAME);
  res.json({message:"Logged out"});
};
