import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from "axios"
import { useParams, useNavigate } from 'react-router-dom'
import classes from './updateBlog.module.css'

const UpdateBlog = () => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [desc, setDesc] = useState("")
  const [category, setCategory] = useState("")
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate();
  const { _id } = useParams()
  const { userInfo } = useSelector((state) => state.auth)
  const categories = [
    'cloth',
    'laptop',
    'phone',
    'books'
  ]

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
            const result = await axios.get(`https://backend-ecommerce-1uy3.onrender.com/api/product/find/${_id}`, {
    headers: {"accesstoken": token}})
        setName(result.data.name)
        setDesc(result.data.desc)
        setPrice(result.data.price)
        setCategory(result.data.category)

      } catch (error) {
        console.error(error)
      }
    }
    fetchBlogDetails()
  }, [])


  const handleUpdateBlog = async (e) => {
    e.preventDefault()

    try {
          await axios.put(`https://eco-portfolio-website.onrender.com/api/product/updateproduct/${_id}`,{name,price, desc, category},{
    headers: {'Authorization': `Bearer ${userInfo.token}`}}
    )
     navigate(`/`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {/* <Navbar /> */}
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <h2>Update product</h2>
          <form onSubmit={handleUpdateBlog}>
            <input
              type="text"
              placeholder='Name...'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
                        <input
              type="text"
              placeholder='price...'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              type="text"
              placeholder='Description...'
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((category) => (
                <option key={crypto.randomUUID()} value={category}>{category}</option>
              ))}
            </select>
            <button type="submit">Update</button>
          </form>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  )
}

export default UpdateBlog