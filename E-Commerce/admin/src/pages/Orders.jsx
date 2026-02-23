// import React from "react";
// import { useEffect } from "react";
// import { useState } from "react";
// import axios from "axios";
// import { backendUrl, currency } from "../App";
// import toast from "react-hot-toast";
// import { assets } from "../assets/assets";

// const Orders = ({ token }) => {
//   const [orders, setOrders] = useState([]);

//   const fetchAllOrders = async () => {
//     if (!token) {
//       return null;
//     }
//     try {
//       const response = await axios.post(
//         backendUrl + "/api/order/list",
//         {},
//         { headers: { token } }
//       );
//       if (response.data.success) {
//         setOrders(response.data.orders);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchAllOrders();
//   }, [token]);
//   return (
//     <div>
//       <h3>Order Page</h3>

//       <div>
//         {orders.map((order, index) => (
//           <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4 items-start border-2 border-gray-200 p-5 md:p-6 my-4 rounded-lg text-sm text-gray-700 bg-white shadow-sm" key={index}>
//             <img className="w-12" src={assets.parcel_icon} alt="" />
//             <div className="lg:col-span-2">
//               <div>
//                 {order.items.map((item, index) => {
//                   if (index === order.items.length - 1) {
//                     return (
//                       <p className="py-2" key={index}>
//                         {item.name} x {item.quantity} <span>{item.size}</span>
//                       </p>
//                     );
//                   } else {
//                     return (
//                       <p className="py-2" key={index}>
//                         {item.name} x {item.quantity} <span>{item.size}</span>,
//                       </p>
//                     );
//                   }
//                 })}
//               </div>
//               <p>{order.address.firstName + " " + order.address.lastName}</p>
//               <div>
//                 <p>{order.address.street + ","}</p>
//                 <p>
//                   {order.address.city +
//                     ", " +
//                     order.address.state +
//                     "," +
//                     order.address.country +
//                     "," +
//                     order.address.zipcode}
//                 </p>
//               </div>

//               <p>{order.address.phone}</p>
//             </div>

//             <div>
//               <p className="text-sm sm:text-[15px]">Items:{order.items.length}</p>
//               <p className="mt-3">Method:{order.paymentMethod}</p>
//               <p>Payment:{order.payment ? "Done" : "Pending"}</p>
//               <p>Date:{new Date(order.date).toLocaleDateString()}</p>
//             </div>
//             <p className="text-sm sm:text-[15px]">{currency}{order.amount}</p>
//             <select className="p-2 font-semibold" >
//               <option value="Order Placed">Order Placed</option>
//               <option value="Packing">Packing</option>
//               <option value="Shipped">Shipped</option>
//               <option value="Out for delivery">Out for delivery</option>
//               <option value="Delivered">Delivered</option>
//             </select>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Orders;


import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import toast from "react-hot-toast";
import { assets } from "../assets/assets";
import Pagination from "../components/Pagination";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; // BACKEND LIMIT

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
     const response = await axios.post(
  `${backendUrl}/api/order/list?page=${currentPage}&limit=${itemsPerPage}`,{},
  { headers: { token } }
);

      if (response.data.success) {
        setOrders(response.data.orders);
         setTotalItems(response.data.total); // total orders
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const statusHandler =async(e,orderId)=>{
    try {
      const response = await axios.post(backendUrl +'/api/order/status',{orderId,status:e.target.value},{headers:{token}}
        
      )

      if(response.data.success){
        await fetchAllOrders()
      }
        
      
    } catch (error) {
         console.log(error);
      toast.error(error.message);
    
      
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token,currentPage]);
  
  return (
    <div className="p-2 md:p-8">
      <h3 className="mb-6">Order Page</h3>

      <div>
        {orders.map((order, index) => (
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-start border-2 border-gray-200 p-6 md:p-8 my-6 rounded-lg text-sm text-gray-700 bg-white shadow-sm" key={index}>
            <img className="w-12" src={assets.parcel_icon} alt="" />
            
            <div className="lg:col-span-2 space-y-4">
              <div className="space-y-3">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p className="py-2" key={index}>
                        {item.name} x {item.quantity} <span>{item.size}</span>
                      </p>
                    );
                  } else {
                    return (
                      <p className="py-2" key={index}>
                        {item.name} x {item.quantity} <span>{item.size}</span>,
                      </p>
                    );
                  }
                })}
              </div>
              
              <div className="space-y-3">
                <p className="py-1">{order.address.firstName + " " + order.address.lastName}</p>
                <div className="space-y-2">
                  <p>{order.address.street + ","}</p>
                  <p>
                    {order.address.city +
                      ", " +
                      order.address.state +
                      "," +
                      order.address.country +
                      "," +
                      order.address.zipcode}
                  </p>
                </div>
                <p className="py-1">{order.address.phone}</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm sm:text-[15px] py-1">Items: {order.items.length}</p>
              <p className="py-1">Method: {order.paymentMethod}</p>
              <p className="py-1">Payment: {order.payment ? "Done" : "Pending"}</p>
              <p className="py-1">Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>
            
            <p className="text-sm sm:text-[15px] py-1">{currency}{order.amount}</p>
            
            <select onChange={(e)=>statusHandler(e,order._id)} className="p-1 font-semibold w-full min-w-[140px] " value={order.status}>
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>

      <Pagination
  totalItems={totalItems}
  itemsPerPage={itemsPerPage}
  currentPage={currentPage}
  setCurrentPage={setCurrentPage}
/>

    </div>
  );
};

export default Orders;