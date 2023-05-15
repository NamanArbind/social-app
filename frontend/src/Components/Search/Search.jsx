import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { Avatar, Typography } from "@mui/material";
// import {Link} from "react-router-dom"
// import "./UpdateProfile.css";
import { getAllUsers, loadUser, registerUser } from "../../Actions/User";
import { useAlert } from "react-alert";
import { updateProfile } from "../../Actions/Post";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import "./Search.css";
import User from "../User/User";

const Search = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const { loading, users } = useSelector(
    (state) => state.allUsers
  );
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllUsers(name));
  };

  return (
    <div className="search">
      <form className="searchForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social App
        </Typography>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Enter Name"
          required
        />
        <Button disabled={loading} type="submit">Search</Button>
        <div className="searchResults">
        {users &&
          users.map((item) => (
            <User
              key={item._id}
              userId={item._id}
              name={item.name}
              avatar={item.avatar.url}
            />
          ))}
      </div>
      </form>
      
    </div>
  );
};

export default Search;
