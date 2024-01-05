import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Alldata.css";
import { Link } from "react-router-dom"

function Alldata() {
  const [productList, setProductList] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    loadusser();
  }, []);
  const loadusser = async () => {
    var response = await axios.get("https://backend-ecommerce-1uy3.onrender.com/api/product/getall", {
      headers: { accesstoken: token },
    });
    setProductList(response.data);
    console.log(response.data)
  };
  const logout = async () => {
    await localStorage.removeItem("token");
    navigate("/");
  };
  const deleteuser= async(_id)=>{
    await axios.delete(`https://backend-ecommerce-1uy3.onrender.com/api/product/delete/${_id}`,{
    headers: { accesstoken: token }});
    navigate("/");
}
  return (
    <div>
      <table>
        <tr>
          <th>id</th>
          <th>Image</th>

          <th>Name</th>
          <th>Price</th>
          {/* <th>Description</th> */}
          <th>Action</th>
        </tr>

        {productList.map((item) => {
          return (
            <tr  className="alldata">
              <th>{}</th>
              <th>
                <img src={item.avatar}></img>
              </th>
              <th>{item.name}</th>
              <th>{item.price}</th>
              {/* <th>{item.desc}</th> */}
         
              <th>
              <Link className = "btn btn-primary " to={`/product/${item._id}`} > view </Link>
              <Link className='btn btn-danger m-1' onClick={()=>deleteuser(item._id)}>delete</Link>
              <Link className = "btn btn-success" to={`/edit/${item._id}`} > edit </Link> 
              </th>
              
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default Alldata;
