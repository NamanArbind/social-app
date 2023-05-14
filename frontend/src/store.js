import { configureStore } from "@reduxjs/toolkit";
import {
  userReducer,
  postOfFollowingReducer,
  allUsersReducer,
  myPostsReducer
} from "./Reducers/User";
import { likeReducer} from "./Reducers/Post";

const store = configureStore({
  reducer: {
    user: userReducer,
    postOfFollowing: postOfFollowingReducer,
    allUsers: allUsersReducer,
    like:likeReducer,
    myPosts:myPostsReducer
  },
});

export default store;
