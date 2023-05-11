import React from "react";
import "./Home.css";
import User from "../User/User";

export default function Home() {
  return (
    <div className="home">
      <div className="homeleft"></div>
      <div className="homeright">
        <User
          userId={"user._id"}
          avatar={
            "https://static01.nyt.com/images/2019/04/16/sports/16onsoccerweb-2/merlin_153612873_5bb119b9-8972-4087-b4fd-371cab8c5ba2-articleLarge.jpg?quality=75&auto=webp&disable=upscale"
          }
          name={"user.name"}
        />
      </div>
    </div>
  );
}
