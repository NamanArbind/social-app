import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import {Avatar,Typography}  from "@mui/material";
import {Link} from "react-router-dom"
import "./Register.css"
import { registerUser } from '../../Actions/User';
import { useAlert } from 'react-alert';
const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name,setName] = useState("");
    const [image, setImage] = useState(null)
    const dispatch = useDispatch();
    const alert=useAlert()
    const {loading,error}=useSelector(state=>state.user)
    const registerHandler = (e) => {
      e.preventDefault();
      dispatch(registerUser(name,email,password,image))
      
      
    };
    const imageHandler = (e) => {
        const file=e.target.files[0]
        const reader=new FileReader();
    
        reader.readAsDataURL(file)
        reader.onload= ()=>{
               if(reader.readyState===2)
               {
                setImage(reader.result);
               }
        }

    }  
    useEffect(()=>{
        if(error)
        {
            alert.error(error)
            dispatch({
                type: "clearErrors",
            })
        }
    },[error,dispatch,alert])
  return (
    <div className='register'>
        <form className='registerForm'>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social App
        </Typography>
        <Avatar
          src={image}
          alt="User"
          sx={{ height: "10vmax", width: "10vmax" }}
        />
        <input type='file' accept='image/*' onChange={imageHandler}/>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Enter Name"
          className='registerInputs'
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Enter Email"
          className='registerInputs'
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Enter Password"
          className='registerInputs'
          required
        />
        <Button type="submit" disabled={loading} onClick={registerHandler} >Sign Up</Button>
        <Link to={"/"}>
          <Typography>Already a User? Login</Typography>
        </Link>

        </form>
    </div>
  )
}

export default Register 