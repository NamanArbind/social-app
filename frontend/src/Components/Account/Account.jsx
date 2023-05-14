import React, { useEffect, useState } from "react";
import "./Account.css";
import { useDispatch, useSelector } from "react-redux";
import { getMyPosts, logoutUser } from "../../Actions/User";
import Post from "../Post/Post";
import { Avatar, Button, Typography } from "@mui/material";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import { Dialog } from "@mui/material";
import User from "../User/User";

const Account = () => {
  const dispatch = useDispatch();
  const { message, error: likeError } = useSelector((state) => state.like);
  const { posts, loading, error } = useSelector((state) => state.myPosts);
  const { user, loading: userLoading } = useSelector((state) => state.user);
  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);

  const alert = useAlert();
  const logoutHandler =  () => {
    dispatch(logoutUser());
    alert.success("Logged out successfully");
  };
  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);
  useEffect(() => {
    if (likeError) {
      alert.error(likeError);
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
    if (error) {
      alert.error(error);
      dispatch({
        type: "clearErrors",
      });
    }
  }, [alert, message, likeError, error, dispatch]);

  return loading === true || userLoading === true ? (
    <Loader />
  ) : (
    <div className="account">
      <div className="accountleft">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              postImage={post.image.url}
              caption={post.caption}
              likes={post.likes}
              comments={post.comments}
              ownerImage={post.owner.avatar.url}
              ownerName={post.owner.name}
              ownerId={post.owner._id}
              isAccount={true}
              isDelete={true}
            />
          ))
        ) : (
          <Typography variant="h4">No posts made by you yet</Typography>
        )}
      </div>
      <div className="accountright">
        <Avatar
          src={user.avatar.url}
          sx={{ height: "8vmax", width: "8vmax" }}
        />
        <Typography variant="h5">{user.name}</Typography>
        <div>
          <button onClick={() => setFollowersToggle(!followersToggle)}>
            Followers
          </button>
          <Typography>{user.followers.length}</Typography>
        </div>
        <div>
          <button onClick={() => setFollowingToggle(!followingToggle)}>
            Following
          </button>
          <Typography>{user.following.length}</Typography>
        </div>
        <div>
          <Typography>Posts</Typography>
          <Typography>{user.posts.length}</Typography>
        </div>
        <Button variant="contained" onClick={logoutHandler}>
          Logout
        </Button>
        <Link to={"/update/password"}>Change password</Link>
        <Link to={"/update/profile"}>Update profile</Link>
        <Button variant="text" style={{ color: "red", margin: "2vmax" }}>
          Delete My Profile
        </Button>

        <Dialog
          open={followersToggle}
          onClose={() => setFollowersToggle(!followersToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Followers</Typography>
            {user && user.followers.length > 0 ? (
              user.followers.map((item) => (
                <User
                  key={item._id}
                  userId={item._id}
                  avatar={
                    "https://static01.nyt.com/images/2019/04/16/sports/16onsoccerweb-2/merlin_153612873_5bb119b9-8972-4087-b4fd-371cab8c5ba2-articleLarge.jpg?quality=75&auto=webp&disable=upscale"
                  }
                  name={item.name}
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                You have no followers yet
              </Typography>
            )}
          </div>
        </Dialog>

        <Dialog
          open={followingToggle}
          onClose={() => setFollowingToggle(!followingToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Following</Typography>
            {user && user.following.length > 0 ? (
              user.following.map((item) => (
                <User
                  key={item._id}
                  userId={item._id}
                  avatar={
                    "https://static01.nyt.com/images/2019/04/16/sports/16onsoccerweb-2/merlin_153612873_5bb119b9-8972-4087-b4fd-371cab8c5ba2-articleLarge.jpg?quality=75&auto=webp&disable=upscale"
                  }
                  name={item.name}
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                You have not followed anyone yet
              </Typography>
            )}
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default Account;
