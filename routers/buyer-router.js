const ProductModel = require("../models/product-model")
const productModel = new ProductModel()

class BuyerRouter{ 
    constructor(){
        this.router = require("express").Router()
        this.initAllRouters()
    }

    initAllRouters() {
        this.router.get("/",(req,res)=>{ 
           productModel
            .getAll()
            .then(products=>{
                res.render("buyer/buyer-form",{ 
                    titlePage:"Buyer Page",
                    cardTitle: "Buyer",
                    navbarTitle: "Buyer Page",
                    listProduct: products
                })
            })
            .catch(err=>{ 
                console.error(err)
                res.sendStatus(500)
            })
        })
        this.router.post("/",(req,res)=>{ 
            console.log(req.body)
            productModel
                .checkStockById(req.body.product_id,req.body.howMuchStock,(r)=>{
                    if(r === "OK") {
                        productModel
                            .reduceStockById(req.body.product_id,req.body.howMuchStock)
                            .then(()=>{
                                console.log("/buyer post done")
                                res.redirect("back")
                            })
                            .catch(err=>{
                                console.error(err)
                                res.sendStatus(500)
                            })
                    }else{
                        res.end("ERR")
                    }
                })
        })
    }
}

module.exports =  BuyerRouter