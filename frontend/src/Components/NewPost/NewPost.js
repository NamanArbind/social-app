import React, { useState } from "react";
import "./NewPost.css";
import { Button, Typography } from "@mui/material";

const NewPost = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const handleImageChange=(e)=>{
    const file=e.target.files[0]
    const reader=new FileReader();

    reader.onload= ()=>{
           if(reader.readyState===2)
           {
            setImage(reader.result);
           }
    }
    reader.readAsDataURL(file)

  }
  const submitHandler=(e)=>{
       e.preventDefault();
  }
  return (
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
        <Button type="submit">Post</Button>
      </form>
    </div>
  );
};

export default NewPost;
