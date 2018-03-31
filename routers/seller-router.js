class SellerRouter { 
    constructor() {
        this.router = require("express").Router();
        this.initAllRouters()
    }
    initAllRouters() {
        this.router.get("/",(req,res)=>{ 
            res.render("seller/seller-form",{
                titlePage: "Seller Page",
                cardTitle: "Seller",
                navbarTitle: "Seller Page"
            })
        })
        this.router.post("/",(req,res)=>{ 
            res.end("NOT IMPLEMENTED YET");
        })
        this.router.get("/seller/login",(req,res)=>{ 

        })
        this.router.post("/seller/login",(req,res)=>{ 
            
        })
    }
}

module.exports = SellerRouter