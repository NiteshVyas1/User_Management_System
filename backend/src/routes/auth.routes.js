import express from "express";
import { signup,login,logout,me } from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middleware/auth.js";
import { body } from "express-validator";
import { validate } from "../middleware/validate.js";
const router = express.Router();

router.post(
  "/signup",
  [
    body("fullName").notEmpty().withMessage("Full name is required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("password")
      .isLength({min:6})
      .withMessage("Password must be at least 6 characters long"),
    body("role")
      .optional()
      .isIn(["admin","user"])
      .withMessage("Role must be admin or user")
  ],
  validate,
  signup
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("password").notEmpty().withMessage("Password required"),
  ],
  validate,
  login
);

router.get("/me", isAuthenticated, me);
router.post("/logout", logout);

export default router;
