import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { body } from "express-validator";
import { validate } from "../middleware/validate.js";

const router = express.Router();

// ======================
// Get Profile
// ======================
router.get("/profile", isAuthenticated, async (req,res)=>{
  return res.status(200).json({
    success:true,
    user: req.user
  });
});


// ======================
// Update Profile
// ======================
router.patch(
  "/profile",
  isAuthenticated,
  [
    body("fullName").notEmpty().withMessage("Full name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
  ],
  validate,
  async(req,res)=>{
    try {
      const { fullName,email } = req.body;

      req.user.fullName = fullName;
      req.user.email = email;
      await req.user.save();

      return res.status(200).json({
        success:true,
        message:"Profile updated successfully"
      });

    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success:false,
        message:"Server error"
      });
    }
  }
);


// ======================
// Change Password
// ======================
router.patch(
  "/change-password",
  isAuthenticated,
  [
    body("oldPassword").notEmpty().withMessage("Old password is required"),
    body("newPassword")
      .isLength({min:6})
      .withMessage("New password must be at least 6 characters"),
  ],
  validate,
  async(req,res)=>{
    try{
      const { oldPassword,newPassword } = req.body;

      const match = await bcrypt.compare(oldPassword, req.user.password);
      if(!match){
        return res.status(400).json({
          success:false,
          message:"Incorrect old password"
        });
      }

      req.user.password = await bcrypt.hash(newPassword,10);
      await req.user.save();

      return res.status(200).json({
        success:true,
        message:"Password changed successfully"
      });

    } catch(err){
      console.log(err);
      return res.status(500).json({
        success:false,
        message:"Server error"
      });
    }
  }
);

export default router;
