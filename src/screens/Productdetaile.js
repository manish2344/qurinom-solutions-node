import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from 'react-redux'
import { Link, useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

import "./Productdetaile.css"
function Productdetaile() {
  const [detailProduct, setProductList] = useState([]);
  const {_id}= useParams();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    loadusser();
  }, []);
  const loadusser = async () => {
    var response = await axios.get(`https://backend-ecommerce-1uy3.onrender.com/api/product/find/${_id}`
    );
    setProductList(response.data);
    console.log(response.data)
  };
//   const logout = async () => {
//     await localStorage.removeItem("token")
//     navigate("/");
//   };
  return (
    <>
                  <div className="detail">
                <img src={detailProduct.avatar} alt="name" />
                <div className="box-detail">
                    <div className="row">
                        <h2>{detailProduct.name}</h2>
                        <h6>#id: {detailProduct.product_id}</h6>
                    </div>
                    <span>$ {detailProduct.price}</span>
                    <p>{detailProduct.desc}</p>
                    {/* <p>{detailProduct.content}</p> */}
                    <p>Sold: {detailProduct.sold}</p>
                    <Link to="/cart" className="cart"
                    // onClick={() => addCart(detailProduct)}
                    >
                        Buy Now
                    </Link>
                </div>
            </div>

    </>
  );
}

export default Productdetaile;

