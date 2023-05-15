import "./UpdatePassword.css";
import React, { useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { updatePassword } from "../../Actions/Post";
import {useNavigate} from  "react-router-dom"
import Loader from "../Loader/Loader";
const UpdatePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate=useNavigate()
    const submitHandler=async (e)=>{
      e.preventDefault();
      await dispatch(updatePassword(oldPassword, newPassword));
      navigate("/account")

    }
    const {message,error,loading}=useSelector(state=>state.like)
    useEffect(()=>{
      if(message){
        alert.success(message);
        dispatch({
          type: "clearMessage"
        })
      }
      if(error){
        alert.error(error);
        dispatch({
          type: "clearErrors"
        })
      }

    },[alert,dispatch,error,message])
 
  return loading?<Loader/>:(
    <div className='updatePassword'>
        <form className='updatePasswordForm' onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social Aap
        </Typography>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => {
            setOldPassword(e.target.value);
          }}
          placeholder="Enter old Password"
          className='updatePasswordInputs'
          required
        />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
          placeholder="Enter new Password"
          className='updatePasswordInputs'
          required
        />
        <Button disabled={loading} type="submit">Change Password</Button>

        </form>
    </div>
  )
}

export default UpdatePassword