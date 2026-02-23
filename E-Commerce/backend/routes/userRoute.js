import express from "express"
import { loginUser,registerUser,adminLogin } from "../controllers/userController.js"
import { authLimiter } from "../middleware/auth.js";


const userRouter= express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',authLimiter,loginUser)
userRouter.post('/admin',authLimiter,adminLogin)

export default userRouter