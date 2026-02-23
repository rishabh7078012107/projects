import jwt from 'jsonwebtoken'
import rateLimit from 'express-rate-limit';
import { MemoryStore } from 'express-rate-limit';


const authUser =async(req,res,next)=>{
    const {token} =req.headers;
    if(!token){
        return res.json({success:false,message:"Not Authorized Login Again"})
    }

    try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRET)
        req.body.userId =token_decode.id
        next()
    } catch (error) {
        console.log(error);
         res.json({success:false,message:error.message})
        
        
    }

}
export default authUser



export const limiterStore = new MemoryStore();

export const authLimiter = rateLimit({
     windowMs: 10 * 60 * 1000,
  max: 10, 
  message: { 
    success: false,
    message: "Too many failed login attempts, please try again after 10 minutes." 
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, 
  store: limiterStore,
})