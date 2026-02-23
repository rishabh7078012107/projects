import { createContext, useEffect, useState } from "react";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl= import.meta.env.VITE_BACKEND_URL
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const [cartItems, setCartItems] = useState({});
  const [products,setProducts]=useState([])

  const[token,setToken]=useState("")

  // 🔥 PAGINATION STATES
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;        // tum decide karlo
  const [totalItems, setTotalItems] = useState(0);

  const navigate = useNavigate();

  const addToCart = async ( itemId, size ) => {

    if(!size){
        toast.error('Select product size');
        return;
    }
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);

    if(token){
      try {
        await axios.post(backendUrl +'/api/cart/add',{itemId,size},{headers:{token}})
        toast.success("Item Added into Cart Succesfully")
        
      } catch (error) {
        console.log(error)
        toast.error(error.message)
        
      }
    }
  };

  const getCartCount =()=>{
    let totalCount=0;
    for(const items in cartItems){
        for(const item in cartItems[items]){
            try {
               if(cartItems[items][item]>0){
                totalCount+=cartItems[items][item]
               } 
            } catch (error) {
                
            }
        }
    }
    return totalCount;
  }

  const updateQuantity = async(itemId,size,quantity)=>{
    let cartData=structuredClone(cartItems);
    cartData[itemId][size]=quantity
    setCartItems(cartData);
    if(token){
      try {
        await axios.post(backendUrl +'/api/cart/update',{itemId,size,quantity},{headers:{token}})
        
      } catch (error) {
        console.log(error)
        toast.error(error.message)
        
      }
    }


  }

  const getCartAmount =()=>{
    let totalAmount=0;
    for(const items in cartItems){
        let itemInfo =products.find((product)=>product._id === items);
        for(const item in cartItems[items]){
            try {
                if(cartItems[items][item]>0){
                    totalAmount+=itemInfo.price*cartItems[items][item]
                }
            } catch (error) {
                
            }
        }
    }
    return totalAmount;
  }

  const getProductData = async (page = 1) => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/product/list?page=${page}&limit=${itemsPerPage}`
      );

      if (response.data.success) {
        setProducts(response.data.products);
        setTotalItems(response.data.total);
      } else {
        toast.error(response.data.message);
      }

      
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
      
    }
  }

  const getUserCart=async(token)=>{
    try {
      const response =await axios.post(backendUrl +'/api/cart/get',{},{headers:{token}})
      if(response.data.success){
        setCartItems(response.data.cartData)

      }
      
    } catch (error) {
      console.log(error)
        toast.error(error.message)
      
    }

  }

   // 🔥 Page change → auto load new products
  useEffect(() => {
    getProductData(currentPage);
  }, [currentPage]);

  useEffect(()=>{
    if(!token && localStorage.getItem('token')){
      setToken(localStorage.getItem('token'))
      getUserCart(localStorage.getItem('token'))

    }
  },[])


  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
     addToCart,
     getCartCount,updateQuantity,
     getCartAmount,
     navigate,
     backendUrl,token,
     setToken,
     setCartItems,

      totalItems,
    currentPage,
    setCurrentPage,
    itemsPerPage,

     

  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
