const express = require("express");
const path = require("path");
const session = require("express-session");
const app = express();
const authMiddleware = require("./middleware/auth-middleware")

app.use(session({
    secret:require("uniqid")()
}))

app.set("views",path.join(__dirname,"views"));
app.set("view engine","pug");

const SellerRouter = require("./routers/seller-router");
const MarketRouter = require("./routers/market-router");

const marketRouter = new MarketRouter();
const sellerRouter = new SellerRouter();


app.use(express.urlencoded({
    extended:true
}));

app.use("/seller",sellerRouter.router);
app.use("/market",authMiddleware,marketRouter.router);

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
