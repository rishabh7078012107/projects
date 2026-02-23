// import React, { useContext, useState } from "react";
// import Title from "../components/Title";
// import CartTotal from "../components/CartTotal";
// import { assets } from "../assets/assets";
// import { ShopContext } from "../content/ShopContent";
// import axios from "axios";
// import toast from "react-hot-toast";

// const PlaceOrder = () => {
//   const [method, setMethod] = useState("cod");
//   const {navigate,backendUrl,token,cartItems,setCartItems,getCartAmount,delivery_fee,products}= useContext(ShopContext);
//     const [formData,setFormData]=useState({
//       firstName:'',
//       lastName:'',
//       email:'',
//       street:'',
//       city:'',
//       state:'',
//       zipcode:'',
//       country:''

//     })

//     const onChangeHandler =(e)=>{
//       const name= e.target.name;
//       const value= e.target.value;

//       setFormData(data=>({...data,[name]:value}))

//     }

    

//     const initPay=(order)=>{
//       const options={
//         key:import.meta.env.VITE_RAZORPAY_KEY_ID,
//         amount:order.amount,
//         currency:order.currency,
//         name:'Order Payment',
//          description:'Order Payment',
//          order_id:order.id,
//          handler:async(response)=>{
//           console.log(response)
//           try {
//             const {data} = axios.post(backendUrl+'/api/order/verifyRazorpay',response,{headers:{token}})
//             if(data.success){
//               navigate('/orders')
//               setCartItems({})
//             }
//           } catch (error) {
//              console.log(error)
//         toast.error(error.message)
            
//           }
//          }
//       }
//       const rzp= new window.Razorpay(options)
//       rzp.open()
//     }

//     const onSubmitHandler = async(e)=>{
//       e.preventDefault();
//       try {
//         let orderItems= []
//         for(const items in cartItems){
//           for(const item in cartItems[items]){
//             if(cartItems[items][item]>0){
//               const itemInfo =structuredClone(products.find(product =>product._id===items))

//               if(itemInfo){
//                 itemInfo.size=item
//                 itemInfo.quantity =cartItems[items][item]
//                 orderItems.push(itemInfo)
//               }
//             }
//           }
//         }
//       let orderData={
//         address:formData,
//         items:orderItems,
//         amount:getCartAmount() + delivery_fee
//       }
//       switch(method){
//         // api calls for cash on delivery order
//         case 'cod': {
//           const response = await axios.post(backendUrl +'/api/order/place',orderData,{headers:{token}})
          
//           console.log(response.data)
//           if(response.data.success){
//             setCartItems({})
//             navigate('/orders')

//           }else{
//             toast.error(response.data.message)
//           }
//           break;

//         }
//         case 'stripe':{
//           const responseStripe =await axios.post(backendUrl + '/api/order/stripe',orderData,{headers:{token}}) 

//            if(responseStripe.data.success){
//             const {session_url} =responseStripe.data;
//             window.location.replace(session_url)
//           }else{
//             toast.error(responseStripe.data.message)
//           }
//           break;
//         }
//         case 'razorpay':{
//            const responseRazorpay =await axios.post(backendUrl + '/api/order/razorpay',orderData,{headers:{token}})
//             if(responseRazorpay.data.success){
//               console.log("Razorpay order:", responseRazorpay.data.order);
//          initPay(responseRazorpay.data.order)
//           }else{
//             toast.error(responseRazorpay.data.message)
//           }
//           break;
//         }
          
        

//           default:
//             break;
//       }
        
        
//       } catch (error) {
//         console.log(error)
//         toast.error(error.message)
        
//       }

//     }
  
//   return (
//     <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]border-t">
//       {/* Left side */}
//       <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
//         <div className="text-xl sm:text-2xl my-3">
//           <Title text1={"DELIVERY"} text2={"INFORMATION"} />
//         </div>
//         <div className="flex gap-3 ">
//           <input required onChange={onChangeHandler} name='firstName' value={formData.firstName}
//             className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//             type="text"
//             placeholder="First name"
//           />
//           <input required onChange={onChangeHandler} name='lastName' value={formData.lastName}
//             className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//             type="text"
//             placeholder="Last name"
//           /> 
//         </div>
//         <input required onChange={onChangeHandler} name='email' value={formData.email}
//           className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//           type="email"
//           placeholder="Email address"
//         />

//         <input required onChange={onChangeHandler} name='street' value={formData.street}
//           className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//           type="text"
//           placeholder="Street"
//         />
//         <div className="flex gap-3 ">
//           <input required onChange={onChangeHandler} name='city' value={formData.city}
//             className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//             type="text"
//             placeholder="City"
//           />
//           <input required onChange={onChangeHandler} name='state' value={formData.state}
//             className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//             type="text"
//             placeholder="State"
//           />
//         </div>
//         <div className="flex gap-3 ">
//           <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode}
//             className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//             type="number"
//             placeholder="Zipcode"
//           />
//           <input required onChange={onChangeHandler} name='country' value={formData.country}
//             className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//             type="text"
//             placeholder="Country"
//           />
//         </div>
//         <input required onChange={onChangeHandler} name='phone' value={formData.phone}
//           className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//           type="number"
//           placeholder="Phone"
//         />
//       </div>

//       {/*---------------Right Side-------------- */}
//       <div className="mt-8">
//         <div className="mt-8 min-w-80">
//           <CartTotal />
//         </div>
//         <div className="mt-12">
//           <Title text1={"PAYMENT"} text2={"METHOD"} />

//           {/* Payment method Selection */}
//           <div className="flex gap-3 flex-col lg:flex-row">
//             <div
//               onClick={() => setMethod("stripe")}
//               className="flex items-center gap-3 border p-2  px-3 cursor-pointer"
//             >
//               <p
//                 className={`min-w-3.5 h-3.5 border rounded-full ${
//                   method === "stripe" ? "bg-green-400" : ""
//                 }`}
//               ></p>
//               <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
//             </div>

//             <div
//               onClick={() => setMethod("razorpay")}
//               className="flex items-center gap-3 border p-2  px-3 cursor-pointer"
//             >
//               <p
//                 className={`min-w-3.5 h-3.5 border rounded-full ${
//                   method === "razorpay" ? "bg-green-400" : ""
//                 }`}
//               ></p>
//               <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
//             </div>

//             <div
//               onClick={() => setMethod("cod")}
//               className="flex items-center gap-3 border p-2  px-3 cursor-pointer"
//             >
//               <p
//                 className={`min-w-3.5 h-3.5 border rounded-full ${
//                   method === "cod" ? "bg-green-400" : ""
//                 }`}
//               ></p>
//               <p className="text-gray-500 text-sm font-medium mx-4">
//                 CASH ON DELIVERY
//               </p>
//             </div>
//           </div>

//           <div className="w-full text-end mt-8">
//             <button type="submit"  className="bg-black text-white px-16 py-3 text-sm" >
//               PLACE ORDER

//             </button>
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default PlaceOrder;



import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../content/ShopContent";
import axios from "axios";
import toast from "react-hot-toast";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } =
    useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const [errors, setErrors] = useState({});

  // Validation function
  const validateField = (name, value) => {
  let error = "";

  switch (name) {
    case "firstName":
    case "lastName":
    case "city":
    case "country":
      case "state":
      if (value && !/^[A-Za-z\s]+$/.test(value)) {
        error = "Only letters are allowed";
      } else if (value && value.trim().length < 2) {
        error = "Must be at least 2 characters";
      } else {
        error = "";
      }
      break;

    case "street":
      if (value && !/^[A-Za-z0-9\s]+$/.test(value)) {
        error = "Only letters and numbers are allowed";
      } else if (value && value.trim().length < 2) {
        error = "Must be at least 2 characters";
      } else {
        error = "";
      }
      break;

    case "email":
      if (value && !/^\S+@\S+\.\S+$/.test(value)) {
        error = "Enter a valid email";
      } else {
        error = "";
      }
      break;

  

    case "zipcode":
      if (value && !/^\d{5,6}$/.test(value)) {
        error = "Zipcode must be 5-6 digits";
      } else {
        error = "";
      }
      break;

    case "phone":
      if (value && !/^\d{10}$/.test(value)) {
        error = "Phone must be 10 digits";
      } else {
        error = "";
      }
      break;

    default:
      error = "";
      break;
  }

  setErrors((prev) => ({ ...prev, [name]: error }));
};


  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
    validateField(name, value);
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            backendUrl + "/api/order/verifyRazorpay",
            response,
            { headers: { token } }
          );
          if (data.success) {
            navigate("/orders");
            setCartItems({});
          }
        } catch (error) {
          toast.error(error.message);
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Check if any error exists
    for (let key in errors) {
      if (errors[key]) {
        toast.error("Please fix all errors before submitting");
        return;
      }
    }

    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );

            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case "cod": {
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );

          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;
        }

        case "stripe": {
          const responseStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );

          if (responseStripe.data.success) {
            window.location.replace(responseStripe.data.session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;
        }

        case "razorpay": {
          const responseRazorpay = await axios.post(
            backendUrl + "/api/order/razorpay",
            orderData,
            { headers: { token } }
          );

          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order);
          } else {
            toast.error(responseRazorpay.data.message);
          }
          break;
        }

        default:
          break;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-10 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* LEFT SIDE */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        <div className="flex gap-3">
          <div className="w-full">
            <input
              required
              onChange={onChangeHandler}
              name="firstName"
              value={formData.firstName}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="First name"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>

          <div className="w-full">
            <input
              required
              onChange={onChangeHandler}
              name="lastName"
              value={formData.lastName}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="Last name"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="w-full">
          <input
            required
            onChange={onChangeHandler}
            name="email"
            value={formData.email}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="email"
            placeholder="Email address"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div className="w-full">
          <input
            required
            onChange={onChangeHandler}
            name="street"
            value={formData.street}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Street"
          />
          {errors.street && (
            <p className="text-red-500 text-sm">{errors.street}</p>
          )}
        </div>

        <div className="flex gap-3">
          <div className="w-full">
            <input
              required
              onChange={onChangeHandler}
              name="city"
              value={formData.city}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="City"
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city}</p>
            )}
          </div>

          <div className="w-full">
            <input
              required
              onChange={onChangeHandler}
              name="state"
              value={formData.state}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="State"
            />
            {errors.state && (
              <p className="text-red-500 text-sm">{errors.state}</p>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-full">
            <input
              required
              onChange={onChangeHandler}
              name="zipcode"
              value={formData.zipcode}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="number"
              placeholder="Zipcode"
            />
            {errors.zipcode && (
              <p className="text-red-500 text-sm">{errors.zipcode}</p>
            )}
          </div>

          <div className="w-full">
            <input
              required
              onChange={onChangeHandler}
              name="country"
              value={formData.country}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="Country"
            />
            {errors.country && (
              <p className="text-red-500 text-sm">{errors.country}</p>
            )}
          </div>
        </div>

        <div className="w-full">
          <input
            required
            onChange={onChangeHandler}
            name="phone"
            value={formData.phone}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Phone"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full mt-10 sm:mt-0">
        <div className="w-full">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />

          {/* PAYMENT METHODS */}
          <div className="flex gap-3 flex-col md:flex-row md:flex-wrap">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer w-full sm:w-auto"
            >
              <p
                className={`w-4 h-4 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="h-7" src={assets.stripe_logo} alt="" />
            </div>

            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer w-full sm:w-auto"
            >
              <p
                className={`w-4 h-4 border rounded-full ${
                  method === "razorpay" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="h-7" src={assets.razorpay_logo} alt="" />
            </div>

            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer w-full sm:w-auto"
            >
              <p
                className={`w-4 h-4 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium">CASH ON DELIVERY</p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-12 sm:px-16 py-3 text-sm w-full sm:w-auto"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
