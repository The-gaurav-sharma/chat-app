
import "dotenv/config"
import mongoose from "mongoose";
import express from "express";
const PORT = process.env.PORT;

import dns from "dns";
dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])

const app = express();  

app.listen(PORT, ()=>{
    console.log("Server is running on Port", PORT);
})


