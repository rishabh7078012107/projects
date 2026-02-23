import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"


import Stripe from 'stripe'
import razorpay from 'razorpay'


//global variables
const currency ='inr'
const deliveryCharge =10



//gateway initialization
const stripe =new Stripe(process.env.STRIPE_SECRET_KEY )

const razorpayInstance =new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})



//placing orders using cod method

const placeOrder = async(req,res)=>{
    try {
        const {userId,items,amount,address}=req.body
         if (!userId || !items || !amount || !address) {
              return res.json({ success: false, message: "Missing required fields" });
            }

        const orderData ={
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()
        }
        const newOrder  = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartData:{}})
        res.json({success:true,message:"Order Placed"})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }
}

//placing orders using stripe method

const placeOrderStripe = async(req,res)=>{
    try {
        const {userId,items,amount,address}=req.body
        if (!userId || !items || !amount || !address) {
              return res.json({ success: false, message: "Missing required fields" });
            }
        const {origin}=req.headers

         const orderData ={
            userId,
            items,
            address,
            amount,
            paymentMethod:"Stripe",
            payment:false,
            date:Date.now()
        }
            const newOrder  = new orderModel(orderData)
        await newOrder.save()

        const line_items= items.map((item)=>({
            price_data:{
                currency:currency,
                product_data:{
                    name:item.name
                },
                unit_amount:item.price *100
            },
            quantity:item.quantity
        }))

        line_items.push({
             price_data:{
                currency:currency,
                product_data:{
                    name:'Delivery Charges'
                },
                unit_amount:deliveryCharge*100
            },
            quantity:1

        })

        const session = await stripe.checkout.sessions.create({
            success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode:'payment',

        })

        res.json({success:true,session_url:session.url})


        
    } catch (error) {
          console.log(error)
        res.json({success:false,message:error.message})
        
        
    }
}

// verify stripe
const verifyStripe =async(req,res)=>{
    const{orderId,success,userId}=req.body
    if (!orderId || !success || !userId ) {
              return res.json({ success: false, message: "Missing required fields" });
            }
    try {
        if(success){
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            await userModel.findByIdAndUpdate(userId,{cartData:{}})

            res.json({success:true})
        }else{
            await orderModel.findByIdAndDelete(orderId)
             res.json({success:false})
        }
    } catch (error) {
         console.log(error)
        res.json({success:false,message:error.message})
        
    }
}

//placing orders using razorpay method

const placeOrderRazorpay = async(req,res)=>{
    try {
         const {userId,items,amount,address}=req.body
         if (!userId || !items || !amount || !address) {
              return res.json({ success: false, message: "Missing required fields" });
            }
       

         const orderData ={
            userId,
            items,
            address,
            amount,
            paymentMethod:"Razorpay",
            payment:false,
            date:Date.now()
        }
            const newOrder  = new orderModel(orderData)
        await newOrder.save()

        const options={
            amount:amount*100,
            currency:currency.toUpperCase(),
            receipt:newOrder._id.toString()
        }
         razorpayInstance.orders.create(options,(error,order)=>{
            if(error){
                console.log(error)
                return res.json({success:false,message:error})
            }
            res.json({success:true,order})

        })
        
    } catch (error) {
            console.log(error)
        res.json({success:false,message:error.message})
    }
}

// verify razorpay

const verifyRazorpay= async(req,res)=>{
    try {
        const {userId,razorpay_order_id,} =req.body;
        if (!userId || !razorpay_order_id ) {
              return res.json({ success: false, message: "Missing required fields" });
            }
        const orderInfo =await razorpayInstance.orders.fetch(razorpay_order_id)
        if(orderInfo.status ==='paid'){
            await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
             await userModel.findByIdAndUpdate(userId,{cartData:{}})
                    res.json({success:true,message:'Payment successful'})
        }else{
                   res.json({success:false,message:'Payment Failed'})
        }
    } catch (error) {
          console.log(error)
        res.json({success:false,message:error.message})
        
    }
}

// all orders data for admin panel (with pagination)
const allOrders = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;   // current page
    const limit = Number(req.query.limit) || 10; // items per page
    const skip = (page - 1) * limit;

    // Count total orders
    const total = await orderModel.countDocuments();

    // Fetch paginated orders
    const orders = await orderModel
      .find({})
      .sort({ date: -1 }) // newest order first
      .skip(skip)
      .limit(limit)
      

    res.json({
      success: true,
      orders,
      total,     // total number of orders
      page,      // current page
      limit      // items per page
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


//user order data for frontend

const usersOrders = async(req,res)=>{
    try {

        const {userId}= req.body;
        if (!userId ) {
              return res.json({ success: false, message: "Missing required fields" });
            }
        const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

      // Total orders for this user
    const totalOrders = await orderModel.countDocuments({ userId });
       
     
    // Fetch orders with pagination
    const orders = await orderModel
      .find({ userId })
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

        
       res.json({
      success: true,
      orders,
      page,
      limit,
      totalOrders,
      totalPages: Math.ceil(totalOrders / limit),
    });
    } catch (error) {
         console.log(error)
        res.json({success:false,message:error.message})
        
    }
}

//update order status from admin panel

const updateStatus = async(req,res)=>{
    try {
        const{orderId,status} =req.body;
        if (!orderId || !status ) {
              return res.json({ success: false, message: "Missing required fields" });
            }
        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({success:true,message:"Status Updated"})
        
    } catch (error) {
         console.log(error)
        res.json({success:false,message:error.message})
        
    }
}


export{placeOrder,verifyRazorpay
    ,placeOrderStripe,placeOrderRazorpay,allOrders,usersOrders,updateStatus,verifyStripe}
