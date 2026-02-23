import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import toast from "react-hot-toast";
import { currency } from "../App";
import Pagination from "../components/Pagination";
const List = ({token}) => {
  const [list, setList] = useState([]);

 const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // BACKEND LIMIT
  
  const fetchList = async () => {
    try {
       const response = await axios.get(
        `${backendUrl}/api/product/list?page=${currentPage}&limit=${itemsPerPage}`
      );
      if (response.data.success) {
        setList(response.data.products);
          setTotalItems(response.data.total);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);

      
    }
  };

  const removeProduct =async(id)=>{
    try {
      const response= await axios.post(backendUrl + '/api/product/remove',{id},{headers:{token}})
      if(response.data.success){
        toast.success(response.data.message)
        await fetchList()
      }else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
       console.log(error);
      toast.error(error.message);
      
    }
  }

  useEffect(() => {
    fetchList();
  }, [currentPage]);
  return (
    <>
    <p className="mb-2">All Products List </p>
    <div className="flex flex-col gap-2">
      {/*List table title */}
      <div className="hidden md:grid grid-cols-[1.5fr_3fr_2fr_1.5fr_1fr] items-center py-2 px-3 border bg-gray-100 text-sm">
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b className="text-center">Action</b>
      </div>

      {/* product-list */}
      {
        list.map((item,index)=>(
          <div className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm" key={index}>
            <img className="w-12" src={item.image[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>
            <p onClick={()=>removeProduct(item._id)} className="text-right md:text-center cursor-pointer text-lg">X</p>
          </div>

        ))
      }
    </div>

     {/* Pagination */}
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    
    </>
  );
};

export default List;
