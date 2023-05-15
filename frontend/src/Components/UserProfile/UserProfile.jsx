import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, getUserPosts, getUserProfile } from "../../Actions/User";
import Post from "../Post/Post";
import { Avatar, Button, Typography } from "@mui/material";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import { Dialog } from "@mui/material";
import User from "../User/User";

const UserProfile = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const alert = useAlert();
  const {
    message,
    error: followError,
    loading: followLoading,
  } = useSelector((state) => state.like);
  const { posts, loading, error } = useSelector((state) => state.userPosts);
  const { user: me, loading: userLoading } = useSelector((state) => state.user);
  const { user, error: userError } = useSelector((state) => state.userProfile);
  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);
  const [following, setFollowing] = useState(false);
  const [myProfile, setMyProfile] = useState(false);

  const followHandler = async () => {
    setFollowing(!following);
    await dispatch(followUser(params.id));
    dispatch(getUserProfile(params.id));
  };
  useEffect(() => {
    dispatch(getUserPosts(params.id));
    dispatch(getUserProfile(params.id));
  }, [dispatch, params.id]);
  useEffect(() => {
    if (me._id === params.id) {
      setMyProfile(true);
    }
    if (user) {
      user.followers.forEach((item) => {
        if (item._id === me._id) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      });
    }
  }, [user, me._id, params.id]);
  useEffect(() => {
    if (followError) {
      alert.error(followError);
      dispatch({
        type: "clearErrors",
      });
    }
    if (userError) {
      alert.error(userError);
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
  }, [alert, message, followError, error, dispatch, userError]);

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
              isAccount={false}
              isDelete={false}
            />
          ))
        ) : (
          <Typography variant="h4">User has not made any posts yet</Typography>
        )}
      </div>
      <div className="accountright">
        {user && (
          <>
            <Avatar
              src={user.avatar.url}
              sx={{ height: "8vmax", width: "8vmax" }}
            />

            <Typography variant="h5">{user.name}</Typography>

            <div>
              <button onClick={() => setFollowersToggle(!followersToggle)}>
                <Typography>Followers</Typography>
              </button>
              <Typography>{user.followers.length}</Typography>
            </div>

            <div>
              <button onClick={() => setFollowingToggle(!followingToggle)}>
                <Typography>Following</Typography>
              </button>
              <Typography>{user.following.length}</Typography>
            </div>

            <div>
              <Typography>Posts</Typography>
              <Typography>{user.posts.length}</Typography>
            </div>

            {myProfile ? null : (
              <Button
                variant="contained"
                style={{ background: following ? "red" : "" }}
                onClick={followHandler}
                disabled={followLoading}
              >
                {following ? "Unfollow" : "Follow"}
              </Button>
            )}
          </>
        )}
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
                  avatar={item.avatar.url}
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
                  avatar={item.avatar.url}
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

export default UserProfile;
