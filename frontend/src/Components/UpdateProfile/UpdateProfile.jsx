import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { Avatar, Typography } from "@mui/material";
// import {Link} from "react-router-dom"
import "./UpdateProfile.css";
import { loadUser, registerUser } from "../../Actions/User";
import { useAlert } from "react-alert";
import { updateProfile } from "../../Actions/Post";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
const UpdateProfile = () => {
  const { loading, error, user } = useSelector((state) => state.user);
  const {
    loading: updateLoading,
    error: updateError,
    message,
  } = useSelector((state) => state.like);
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);
  const [image, setImage] = useState(null);
  const [imagePrev, setImagePrev] = useState(user.avatar.url);
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const alert = useAlert();
  const registerHandler =async  (e) => {
    e.preventDefault();
    await dispatch(updateProfile(name, email, image));
    await dispatch(loadUser())
    navigate("/account")
  };
  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
        setImagePrev(reader.result);
      }
    };
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({
        type: "clearErrors",
      });
    }
    if (updateError) {
      alert.error(updateError);
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
  }, [error, dispatch, alert, message, updateError]);
  return loading ? (
    <Loader />
  ) : (
    <div className="updateProfile">
      <form className="updateProfileForm">
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social App
        </Typography>
        <Avatar
          src={imagePrev}
          alt="User"
          sx={{ height: "10vmax", width: "10vmax" }}
        />
        <input type="file" accept="image/*" onChange={imageHandler} />
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Enter Name"
          className="updateProfileInputs"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Enter Email"
          className="updateProfileInputs"
          required
        />
        <Button
          type="submit"
          disabled={updateLoading}
          onClick={registerHandler}
        >
          Update
        </Button>
      </form>
    </div>
  );
};

export default UpdateProfile;
