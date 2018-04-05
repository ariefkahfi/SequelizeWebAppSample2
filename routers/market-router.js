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
            sellerModel
                .getMarketsAndGetProductsBySellerId(req.session.user_id)
                .then(result=>{ 
                    res.render("market/market-form",{ 
                        titlePage:"Market Page",
                        cardTitle: "New Market",
                        navbarTitle: "Market Page",
                        listProducts: result.products,
                        listMarkets: result.markets
                    })        
                })
                .catch(err=>{ 
                    console.error(err)
                    res.sendStatus(500)
                })
        })
        this.router.post("/",(req,res)=>{
            console.log(req.body)
            sellerModel.saveMarketAndSetSeller(req.session.user_id,{ 
                market_name:req.body.market_name,
                market_contact: req.body.market_contact
            }).then(()=>{
                console.log("/market post DONE")
                res.redirect("back")
            })
            .catch(err=>{ 
                console.error(err)
                res.sendStatus(500)
            })
         })

         this.router.post("/publish",(req,res)=>{ 
             marketModel
                .addProductToMarket(req.body.product_id,req.body.market_id)
                .then(()=>{
                    console.log("/market/publish POST done")
                    res.redirect("back")
                })
                .catch(err=>{ 
                    console.error(err)
                    res.sendStatus(500)
                })
         })
    }
}

module.exports = MarketRouter