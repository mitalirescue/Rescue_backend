import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import inquiryRoute from './src/routes/inquiry.route.js';


dotenv.config()

const app = express()
const port = process.env.PORT || 4000

app.use(
    cors({
      origin: [
        "http://localhost:3000",  // local dev
        "https://www.rescueclick.com" // production
      ],
      methods: ["GET", "POST"],
      credentials: true
    })
  );

app.use(express.json());

app.use ('/api/inquiry',inquiryRoute)


app.listen(port,(req,res)=>{
    console.log(`Server is running on port :${port}`);
    
})