import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js';
// function for add product
const addProduct =async(req,res)=>{
    try {
        const{name,description,price,category,subCategory,sizes,bestseller}=req.body
        if (!name || !description || !price || !category || !subCategory || !sizes || !bestseller) {
              return res.json({ success: false, message: "Missing required fields" });
            }
        
        const image1 =   req.files.image1 && req.files.image1[0];
         const image2 =   req.files.image2 && req.files.image2[0];
          const image3 =   req.files.image3 && req.files.image3[0];
           const image4 =   req.files.image4 && req.files.image4[0];

           const images =[image1,image2,image3,image4].filter((item)=>item !== undefined)

           let imagesUrl= await Promise.all(
            images.map(async(item)=>{
                let result= await cloudinary.uploader.upload(item.path,{resource_type:'image'})
                return result.secure_url
            })
           )
          


          const productData ={
            name,
            description,
            price:Number(price),
            category,
            subCategory,
            sizes:JSON.parse(sizes),// string to array
            bestseller:bestseller ==="true"?true:false,
            image:imagesUrl,
            date:Date.now()


          }
          console.log(productData)

          const product = new productModel(productData)
          await product.save();
            
           res.json({success:true,message:'Product Added'})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }


}

// function for list product
const listProduct =async(req,res)=>{
    try {

         const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

        // const products =await productModel.find({});
        // res.json({success:true,products})

         const skip = (page - 1) * limit;

    const total = await productModel.countDocuments();
     const products = await productModel
      .find({})
      .sort({ createdAt: -1 })  // <-- newest first
      .skip(skip)
      .limit(limit);

    res.json({ success: true, products, total });
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})

        
    }

}


// function for remove product product
const removeProduct =async(req,res)=>{
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Product Removed"})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
    

}

// function for single product
const singleProduct =async(req,res)=>{
    try {
        const {productId}=req.body
        if (!productId) {
              return res.json({ success: false, message: "Missing required fields" });
            }

        const product =await productModel.findById(productId)
        res.json({success:true,product})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
    

}
export {addProduct,listProduct,removeProduct,singleProduct}