import express from "express";
import postModel from "../mongodb/models/postModel.js";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
});

// Get all posts
router.route("/").get(async (req, res) => {
  try {
    const posts = await postModel.find({});

    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
    console.log(`Error: ${err}`);
  }
});

// post

router.route("/").post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
     
    const photoUrl = await cloudinary.uploader.upload(photo); 

    const newPost = new postModel({
      name: name, 
      prompt: prompt, 
      photo: photoUrl.url, 
    })

    await newPost.save(); 
    res.status(200).json({success: true, message: newPost}); 
    console.log("success"); 



  } catch(err) {
    res.status(500).json({message: "unsuccessfully"})
    console.log(err)
  }
});

export default router;
