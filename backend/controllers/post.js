const Post = require("../models/Post");
const User = require("../models/User");

exports.createPosts = async (req, res) => {
  try {
    const newPostData = {
      caption: req.body.caption,
      avatar: { public_id: "Sample id", url: "Sample url" },
      owner: req.user._id,
    };
    let newpost = await Post.create(newPostData);
    const user = await User.findById(req.user._id);
    user.posts.push(newpost._id);
    await user.save();
    res.status(201).json({
      success: true,
      post: newpost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.likeAndUnlikePosts = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post Not found",
      });
    }
    if (post.likes.includes(req.user._id)) {
      const index = post.likes.indexOf(req.user._id);
      post.likes.splice(index, 1);
      await post.save();
      return res.status(200).json({
        message: "Post Unliked",
        success: true,
      });
    } else {
      post.likes.push(req.user._id);

      await post.save();
      return res.status(200).json({
        message: "Post Liked",
        success: true,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post Not Found",
      });
    }
    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    await Post.deleteOne(post);
    const user = await User.findById(req.user._id);
    const index = user.posts.indexOf(req.params.id);
    user.posts.splice(index, 1);
    await user.save();
    res.status(200).json({
      success: true,
      message: "Post Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getPostsOfFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const posts = await Post.find({
      owner: {
        $in: user.following,
      },
    });
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.updateCaption = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const { caption } = req.body;
    if (!caption) {
      return res.status(400).json({
        success: false,
        message: "Please fill the caption to be updated",
      });
    }
    post.caption = caption;
    await post.save();
    res.status(200).json({
      success: true,
      message: "Caption Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.commentOnPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    const { comment } = req.body;
    if (!comment) {
      return res.status(400).json({
        success: false,
        message: "Please enter some text to be commented",
      });
    }
    let commentIndex = -1;
    post.comments.forEach((item, index) => {
      if (item.user.toString() === req.user._id.toString()) {
        commentIndex = index;
      }
    });
    if (commentIndex !== -1) {
      post.comments[commentIndex].comment = comment;
      await post.save();
      res.status(200).json({
        success: true,
        message: "Comment Updated",
      });
    } else {
      post.comments.push({
        user: req.user._id,
        comment,
      });
      await post.save();

      res.status(200).json({
        success: true,
        message: "Comment Added",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.deleteComments = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    if (post.owner.toString() === req.user._id.toString()) {
      if(req.body.commentID==undefined)
      {
        return res.status(400).json({
          success: false,
          message:"Comment ID is required"
        })
      }
      let commentIndex = -1;
      post.comments.forEach((item, index) => {
        if (item._id.toString() === req.body.commentID.toString()) {
          commentIndex = index;
          return;
        }
      });
      post.comments.splice(commentIndex, 1);
      await post.save();

      res.status(200).json({
        success: true,
        message: "Comment deleted on your post",
      });
    } else {
      let commentIndex = -1;
      post.comments.forEach((item, index) => {
        if (item.user.toString() === req.user._id.toString()) {
          commentIndex = index;
          return;
        }
      });
      post.comments.splice(commentIndex, 1);
      await post.save();

      res.status(200).json({
        success: true,
        message: "Comment deleted on other post",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
