import { useState } from 'react'
import axios from "axios"
import {useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classes from './create.module.css'
export default function App() {
  const { userInfo } = useSelector((state) => state.auth)
  const navigate = useNavigate();
  const token = localStorage.getItem("token")
  const [file, setFile] = useState()
  const [name, setname] = useState("")
  const [price, setprice] = useState("")
  const [category, setcategory] = useState("")
  const [desc, setDesc] = useState("")
  const categories = [
    'all',
    'cloth',
    'laptop',
    'phone',
    'books'
  ]

  const handleCreateBlog = async event => {
    event.preventDefault()
  
    const formData = new FormData()
    formData.append("image", file)
    formData.append("name", name)
    formData.append("price", price)
    formData.append("category", category)
    formData.append("desc",desc)
   
    const result = await axios.post("https://backend-ecommerce-1uy3.onrender.com/api/product/create",formData,{
    headers: {'Authorization': `Bearer ${userInfo.token}`}})
    console.log(result.data)
    navigate('/');
  }

  return (
<div className={classes.container}>
<div className={classes.wrapper}>
  <h2 className={classes.title}>Create Product</h2>
  <form onSubmit={handleCreateBlog} encType="multipart/form-data">
    <div className={classes.inputWrapper}>
      <label>Name: </label>
      <input
        type="text"
        placeholder='Name...'
        className={classes.input}
        onChange={(e) => setname(e.target.value)}
    
      />
    </div>
    <div className={classes.inputWrapper}>
      <label>price: </label>
      <input
        type="text"
        placeholder='price...'
        className={classes.input}
        onChange={(e) => setprice(e.target.value)}
    
      />
    </div>
    <div className={classes.inputWrapper}>
      <label>Description: </label>
      <input
        type="text"
        placeholder='Description...' 

        className={classes.input}
        onChange={(e) => setDesc(e.target.value)}
      />
    </div>
    <div className={classes.inputWrapperSelect}>
      <label>Category: </label>
      
      <select   value={category}   className={classes.input} onChange={(e) => setcategory(e.target.value)}>
        {categories.map((category) => (
          <option key={crypto.randomUUID()} value={category}>{category}</option>
        ))}
      </select>
    </div>
    <div className={classes.inputWrapperImg}>
      <input
        id="image"
        type="file"
        className={classes.input}
          // style={{ display: 'none' }}
          filename={file} 
          onChange={e => setFile(e.target.files[0])} 
          accept="image/*"
      />
    </div>
    <div className={classes.buttonWrapper}>
      <button className={classes.submitBtn} type="submit">
        Submit form
      </button>
    </div>
  </form>
</div>
</div>
  )
}