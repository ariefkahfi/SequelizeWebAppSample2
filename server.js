const express = require("express");
const path = require("path");
const app = express();

app.set("views",path.join(__dirname,"views"));
app.set("view engine","pug");

const SellerRouter = require("./routers/seller-router");
const MarketRouter = require("./routers/market-router");

const marketRouter = new MarketRouter();
const sellerRouter = new SellerRouter();

app.use("/seller",sellerRouter.router);
app.use("/market",marketRouter.router);

app.get("/",(req,res)=>{ 
    res.render("index",{ 
        titlePage:"Index Page",
        cardTitle: "Index",
        navbarTitle: "Index Page"
    })
})


app.listen(9600,()=>{ 
    console.log("listening on port 9600");
})
