const authMiddleware = require("../middleware/auth-middleware")
const SellerModel = require("../models/seller-model")
const sellerModel = new SellerModel()

class SellerRouter { 
    constructor() {
        this.router = require("express").Router();
        this.initAllRouters()
    }
    initAllRouters() {
        this.router.get("/",authMiddleware,(req,res)=>{ 
            res.render("seller/seller-form",{
                titlePage: "Seller Page",
                cardTitle: "Seller",
                navbarTitle: "Seller Page"
            })
        })
        this.router.post("/",authMiddleware,(req,res)=>{ 
            console.log(req.body);
            res.end("NOT IMPLEMENTED YET");
        })
        this.router.get("/register",(req,res)=>{ 
            res.render("seller/seller-register",{ 
                titlePage:"Register Seller",
                cardTitle:"Register",
                navbarTitle:"Register Seller",
                seller_id : require("uniqid")()
            })
        })
        this.router.post("/register",(req,res)=>{
            sellerModel.saveSeller({ 
                seller_id: req.body.seller_id,
                seller_name: req.body.seller_name,
                seller_address: req.body.seller_address
            }).then(()=>{
                console.log("POST /register success register")
                res.redirect("back");
            }).catch(err=>{
                console.error(err)
                res.sendStatus(500)
             })
        })
        this.router.get("/login",(req,res)=>{ 
            res.render("seller/seller-login",{ 
                titlePage: "Login as seller",
                cardTitle: "Login",
                navbarTitle: "Login as seller"
            })
        })
        this.router.get("/logout",(req,res)=>{ 
            req.session.destroy(err=>{ 
                res.redirect("/seller/login")
            })
        })
        this.router.post("/login",(req,res)=>{ 
            console.log(req.body);
            sellerModel.getSellerByIdAndName(req.body.seller_id,req.body.seller_name)
                .then(seller=>{ 
                    req.session.username = seller.seller_name 
                    console.log("CHECK VAL SESSION_USERNAME : " , req.session.username)
                    res.redirect(".")
                }).catch(err=>{ 
                    console.error(err)
                    res.sendStatus(500)
                })
        })
    }
}

module.exports = SellerRouter