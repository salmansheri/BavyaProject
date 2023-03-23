import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    name: String, 
    prompt: String, 
    photo: String, 

}, {
    timestamps: true,
})

const postModel = mongoose.model("Post", postSchema); 

export default postModel; 