import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./Login.css";
import {useDispatch, useSelector} from "react-redux";
import { loginUser } from "../../Actions/User";
import { useAlert } from "react-alert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const alert=useAlert()
  const{error}=useSelector(state=>state.user)
  const{message}=useSelector(state=>state.like)
  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email,password))
    
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({
        type: "clearErrors",
      });
    }
    if (message) {
      alert.success(message);
      dispatch({
        type: "clearMessage",
      });
    }
  }, [alert, error, dispatch,message]);

  return (
    <div className="login">
      <form className="loginForm" onSubmit={loginHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social App
        </Typography>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Enter Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Enter Password"
          required
        />
        <Link to={"/forgot/password"}>
          <Typography>Forgot Password?</Typography>
        </Link>
        <Button type="submit">Login</Button>
        <Link to={"/register"}>
          <Typography>New User?</Typography>
        </Link>
      </form>
    </div>
  );
};

export default Login;
