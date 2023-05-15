import { configureStore } from "@reduxjs/toolkit";
import {
  userReducer,
  postOfFollowingReducer,
  allUsersReducer,
  myPostsReducer,
  userPostsReducer,
  userProfileReducer
} from "./Reducers/User";
import { likeReducer} from "./Reducers/Post";

const store = configureStore({
  reducer: {
    user: userReducer,
    postOfFollowing: postOfFollowingReducer,
    allUsers: allUsersReducer,
    like:likeReducer,
    myPosts:myPostsReducer,
    userPosts:userPostsReducer,
    userProfile:userProfileReducer
  },
});

export default store;
