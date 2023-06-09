import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { createNewPost } from "../../Actions/Post";
import "./NewPost.css";
import { loadUser } from "../../Actions/User";
import {useNavigate} from "react-router-dom"
import Loader from "../Loader/Loader"

const NewPost = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const { loading, error, message } = useSelector((state) => state.like);
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate=useNavigate()
  const handleImageChange=(e)=>{
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
  const submitHandler=async (e)=>{
       e.preventDefault();
       await dispatch(createNewPost(caption,image))
       dispatch(loadUser())
      //  window.location.pathname="/account"
       navigate("/account")
       
  }
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message, alert]);
  return loading?<Loader/> :(
    <div className="newPost">
      <form className="newPostForm" onSubmit={submitHandler}>
        <Typography variant="h3">New Post</Typography>
        {image && <img src={image} alt="post"/>}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <input
          type="text"
          placeholder="Caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          style={{backgroundColor:"#c0e1ff"}}
        />
        <Button disabled={loading} type="submit">Post</Button>
      </form>
    </div>
  );
};

export default NewPost;
