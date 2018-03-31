class MarketRouter { 
    constructor() {
        this.router = require("express").Router();
        this.initAllRouters();
    }
    initAllRouters() {
        this.router.get("/",(req,res)=>{ 
            res.render("market/market-form",{ 
                titlePage:"Market Page",
                cardTitle: "Market",
                navbarTitle: "Market Page"
            })
        })
        this.router.post("/",(req,res)=>{
            res.end("NOT IMPLEMENTED YET")
         })
    }
}

module.exports = MarketRouter