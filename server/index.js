import express from 'express';

import * as dotenv from 'dotenv'; 
import cors from 'cors';
import  connectDB from './mongodb/connect.js'; 
import postRoutes from './routes/postRoutes.js'; 
import dalleRoutes from './routes/dalleRoutes.js'; 

dotenv.config(); 

const app = express(); 

app.use(cors())
app.use(express.json( {limit: '50mb'})); 
const url = process.env.MONGO_URI; 

app.use('/api/v1/post', postRoutes); 
app.use('/api/v1/dalle', dalleRoutes); 

app.get("/", async(req, res) => {
    res.send("Hello From Dall-E!")
})



const startServer = () => {
    try {
        connectDB(url); 
        app.listen(5000, () => console.log("Server is listening in the port http://localhost:5000")); 

    } catch(err) {
        console.log(`Error: ${err}`); 
    }
    
}

startServer();
