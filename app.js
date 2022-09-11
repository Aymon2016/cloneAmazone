require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 5007;
const cookieParser = require("cookie-parser");
const DefaultData = require("./defaultData");
require("./db/connection");
const router = require("./Routes/router");
const Products = require("./models/productsSchema");
const jwt = require("jsonwebtoken");
const cors=require('cors')
const path= require('path')


// middleware
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


app.use(router);
// app.get("/",(req,res)=>{
//     res.send("your server is running");
    
// });


if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(port,()=>{
    console.log(`your server is running on port ${port} `);
});
DefaultData()

