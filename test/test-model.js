let assert = require("assert");


const DBModel = require("../models/db-model")
const dbModel = new DBModel()

const SellerModel = require("../models/seller-model")
const sellerModel = new SellerModel();

const ProductModel = require("../models/product-model");
const productModel = new ProductModel();

const MarketModel = require("../models/market-model");
const marketModel = new MarketModel();

const uniqId = require("uniqid");


describe("ProductModel",()=>{ 
    // describe("#bulkSaveProduct",()=>{ 
    //     it("bulk save product",(done)=>{ 
    //         dbModel.Product.bulkCreate([
    //             {product_id: uniqId(),product_name: "product_001", product_price: 8900 , product_stock  : 120},
    //             {product_id: uniqId(),product_name: "product_002", product_price: 890 , product_stock  : 20},
    //             {product_id: uniqId(),product_name: "product_003", product_price: 120 , product_stock  : 89},
    //             {product_id: uniqId(),product_name: "product_004", product_price: 545 , product_stock  : 50},
    //             {product_id: uniqId(),product_name: "product_005", product_price: 780 , product_stock  : 44}
    //         ]).then(()=> {
    //             done()
    //         }).catch(err=> {
    //             done(err)
    //         })
    //     })
    // })
})


describe("MarketModel test",()=>{ 
    // describe("#saveMarket",()=> {
    //     it("must save market",(done)=>{ 
    //         marketModel.saveMarket({
    //             market_name: "market_001",
    //             market_contact: "873-1236"
    //         }).then(()=>{
    //             return marketModel.saveMarket({
    //                 market_name: "market_002",
    //                 market_contact:"999-2434"
    //             })
    //         }).then(()=>{ 
    //             done()
    //         }).catch(err=> {
    //             done(err)
    //         })
    //     })
    // })


    // describe("#removeproduct",()=>{ 
    //     it("remove product from market",(done)=>{ 
    //         marketModel.removeProductFromMarket("2sef5gjffgum3a",2)
    //         .then(()=>{   
    //             done()
    //         })
    //         .catch(err=>{ 
    //             done(err)
    //         })
    //     })
    // })

    // describe("#addproductstomarket",()=>{ 
    //     it("add product to market",(done)=>{ 
    //         marketModel.getOneById(2).then(getMarket=>{ 
    //             let arrOfProductId = ["2sef5gjffgum3a","2sef5gjffgum3b","2sef5gjffgum3c"]                    
    //             arrOfProductId.forEach(p_id=>{ 
    //                 getMarket.addProduct(p_id);
    //             })
    //         })
    //     })
    // })


    describe("#getAllMarkets",()=>{ 
        it("return all markets",(done)=> { 
            marketModel.getAll().then(markets=>{ 
                done()
            }).catch(err=>{ 
                done(err)
            })
        })
    })
    describe("#getOneById",()=>{ 
        it("get market by id",(done)=>{ 
            marketModel.getOneById(2)
                .then(market=>{
                    done()
                    })
                .catch(err=>{  
                    done(err)
                })
        })
    })

})

// select * from product p 
// inner join seller s  on p.seller_id = s.seller_id 
// inner join  product_market pm on pm.product_id = p.product_id  
// inner join  market m  on m.market_id = pm.market_id where s.seller_id = '...'


describe.only("Buyer test",()=>{ 
    describe("buy a product ",()=>{ 
        it("must reduce a stock",(done)=>{ 
            productModel
                .reduceStockById("2se2fxjfm0q5va",5)
                .then(()=>{
                    done()   
                })
                .catch(err=>{ 
                    console.error(err)
                    done(err)
                })
        })
    })
})

describe("SellerModel",()=>{ 
    describe("get products and market from certain seller",function(){
        it("must return all products and markets",async function(){ 
            let result = 
                await sellerModel.getMarketsAndGetProductsBySellerId("2se2edjfm0o13n")

            result.products.forEach(val=>{ 
                console.log(val.get({ 
                    plain:true
                }))
            })
            result.markets.forEach(val=>{ 
                console.log(val.get({ 
                    plain:true
                }))
            })
        })
     })
    describe("getProductsFromSeller",()=>{ 
        it("must return all products from certain seller",(done)=>{ 
            sellerModel
                .getSellerById("2sej73jffldf1t")
                .then(seller=>{ 
                    return seller.getProducts()
                }).then(products=>{ 
                    console.log(JSON.stringify(products))
                    done()
                }).catch(err=>{ 
                    console.error(err)
                    done(err)
                })
        })
    })
    describe("getMarket",()=>{ 
        it("must return market from certain seller",(done)=>{ 
            dbModel
                .getSequelize()
                .query(`
                    select * from product p 
                    inner join  seller s  on p.seller_id = s.seller_id 
                    inner join  product_market pm on pm.product_id = p.product_id  
                    inner join  market m  on m.market_id = pm.market_id where s.seller_id = '2sej73jffldf1t'
                `).spread((products,created)=>{ 
                    products.forEach(val=>{ 
                        console.log(val.market_name)
                    })
                    done()
                })
        })
    })
    // describe("#save",()=>{ 
    //     it("must save seller",(done)=>{ 
    //         sellerModel.saveSeller({
    //             seller_id: uniqId(),
    //             seller_name: "aa1",
    //             seller_address: "address_aa1"
    //         }).then(()=>{
    //             done()
    //         }).catch(err=>{ 
    //             done(err)
    //         })
    //     })
    // })

    // describe("#removeProductFromSeller",()=>{ 
    //     it("must remove a product from existing seller",(done)=>{ 
    //         let sellerId = uniqId();
    //         let productId = uniqId(); 
    //         sellerModel.saveSellerAndSaveProduct({
    //             seller_id: sellerId,
    //             seller_name: "aa10",
    //             seller_address: "address_aa10",
    //         },{
    //             product_id: productId,
    //             product_name: "product_aa10",
    //             product_price: 8900,
    //             product_stock: 150
    //         }).then(()=>{
    //             return sellerModel.removeProductFromSeller(sellerId,productId)
    //         }).then(()=>{ 
    //             done()
    //         }).catch(err=>{ 
    //             done(err)
    //         })
    //     })
    // })


    // describe("#saveSellerAndSaveProduct",()=>{ 
    //     it("must save seller and their product",(done)=>{ 
    //         sellerModel.saveSellerAndSaveProduct({
    //             seller_id: uniqId(),
    //             seller_name: "aa2",
    //             seller_address: "address_aa2"
    //         },{
    //             product_id: uniqId(),
    //             product_name: "product_aa2",
    //             product_price: 2500,
    //             product_stock: 150
    //         }).then(()=>{
    //             done()
    //         }).catch(err=>{ 
    //             done(err)
    //         })
    //     })
    // })

    // describe("#addNewProductToSeller",()=>{ 
    //     it("must add new product to existing seller",(done)=>{ 
    //         sellerModel.saveSeller({
    //             seller_id:uniqId(),
    //             seller_name: "aa100",
    //             seller_address: "address_aa100"
    //         }).then(seller=>{
    //             return sellerModel.addNewProductToSeller(seller.seller_id,{
    //                 product_id: uniqId(),
    //                 product_name: "product_aa100",
    //                 product_price: 90000,
    //                 product_stock: 500
    //             })
    //         }).then(()=>{ 
    //             done()
    //         }).catch(err=>{
    //             done(err)
    //         })
    //     })
    // })


})