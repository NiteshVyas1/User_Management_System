import express from "express";
import { isAuthenticated,isAdmin } from "../middleware/auth.js";
import User from "../models/User.js";


const router = express.Router();

router.get("/users", isAuthenticated,isAdmin, async(req,res)=>{
  const page = Number(req.query.page) || 1;
  const limit = 10;
  const skip = (page-1)*limit;

  const users = await User.find().skip(skip).limit(limit);
  const total = await User.countDocuments();

  res.json({users,total,page});
});

router.patch("/user/:id/activate", isAuthenticated,isAdmin, async(req,res)=>{
  await User.findByIdAndUpdate(req.params.id,{status:"active"});
  res.json({message:"User activated"});
});

router.patch("/user/:id/deactivate", isAuthenticated,isAdmin, async(req,res)=>{
  await User.findByIdAndUpdate(req.params.id,{status:"inactive"});
  res.json({message:"User deactivated"});
});

export default router;
