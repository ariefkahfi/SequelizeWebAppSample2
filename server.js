const express = require("express");
const path = require("path");
const app = express();

app.set("views",path.join(__dirname,"views"));
app.set("view engine","pug");

const SellerRouter = require("./routers/seller-router");
const sellerRouter = new SellerRouter();

app.use("/seller",sellerRouter);



app.listen(9600,()=>{ 
    console.log("listening on port 9600");
})
