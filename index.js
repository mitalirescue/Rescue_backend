import express from 'express';
import dotenv from 'dotenv';

dotenv.config()
import inquiryRoute from './src/routes/inquiry.route.js';

const port = process.env.PORT || 4000



const app = express()
app.use(express.json());

app.use ('/api/inquiry',inquiryRoute)


app.listen(port,(req,res)=>{
    console.log(`Server is running on port :${port}`);
    
})