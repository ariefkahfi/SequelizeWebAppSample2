const MarketModel = require("../models/market-model")
const SellerModel = require("../models/seller-model")

const marketModel = new MarketModel()
const sellerModel = new SellerModel()


class MarketRouter { 
    constructor() {
        this.router = require("express").Router();
        this.initAllRouters();
    }
    initAllRouters() {
        
        this.router.get("/",(req,res)=>{ 
            sellerModel.getSellerById(req.session.user_id)
                .then(seller=>{ 
                    res.render("market/market-form",{ 
                        titlePage:"Market Page",
                        cardTitle: "Market",
                        navbarTitle: "Market Page"
                    })
                }).catch(err=>{ 
                    console.error(err)
                    res.sendStatus(500)
                })
            
        })
        this.router.post("/",(req,res)=>{
            console.log(req.body)
            marketModel.saveMarket({
                market_name: req.body.market_name,
                market_contact: req.body.market_contact
            }).then(()=>{ 
                console.log("/market POST DONE !!!")
            }).catch(err=>{ 
                console.error(err)
                res.sendStatus(500)
            })
         })
    }
}

module.exports = MarketRouter