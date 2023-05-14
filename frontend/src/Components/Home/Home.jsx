import React, { useEffect } from "react";
import "./Home.css";
import User from "../User/User";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getFollowingPosts } from "../../Actions/User";
import Loader from "../Loader/Loader";
import { Typography } from "@mui/material";
import {useAlert} from "react-alert"

export default function Home() {
  const dispatch = useDispatch();
  const alert=useAlert()
  const {message,error:likeError}=useSelector(state=>state.like)
  const { loading, posts, error } = useSelector(
    (state) => state.postOfFollowing
  );
  const {loading:userLoading,users}=useSelector(state=>state.allUsers)
  useEffect(() => {
    dispatch(getFollowingPosts());
    dispatch(getAllUsers())
  }, [dispatch]);

  useEffect(() => {
    if(likeError)
    {
      alert.error(likeError);
      dispatch({
        type: "clearErrors",
      })
    }
    if(message)
    {
      alert.success(message);
      dispatch({
        type: "clearMessage",
      })

    }
    if(error)
    {
      alert.error(error);
      dispatch({
        type: "clearErrors",
      })

    }

  },[alert,message,likeError,error,dispatch])
  
  return (
    loading===true|| userLoading===true?<Loader/>:(
      <div className="home">
      <div className="homeleft">
        {
          posts && posts.length>0?posts.map((post) => (
            <Post
            key={post._id}
            postId={post._id}
            postImage={post.image.url}
            caption={post.caption}
            likes = {post.likes}
            comments = {post.comments}
            ownerImage={post.owner.avatar.url}
            ownerName={post.owner.name}
            ownerId={post.owner._id}
            isAccount={false}
            />
           
          ))
          :<Typography variant="h6">No posts yet</Typography>

        }
      </div>
      <div className="homeright">
       {
        users&&users.length?users.map((user) => (
          <User
          key={user._id}
          userId={user._id}
          avatar={
            "https://static01.nyt.com/images/2019/04/16/sports/16onsoccerweb-2/merlin_153612873_5bb119b9-8972-4087-b4fd-371cab8c5ba2-articleLarge.jpg?quality=75&auto=webp&disable=upscale"
          }
          name={user.name}
        />
        )):<Typography>No users yet</Typography>
       }
      </div>
    </div>
    )
  );
}
