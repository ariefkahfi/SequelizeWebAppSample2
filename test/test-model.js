let assert = require("assert");


const SellerModel = require("../models/seller-model")
const sellerModel = new SellerModel();

const ProductModel = require("../models/product-model");
const productModel = new ProductModel();

const uniqId = require("uniqid");

describe("SellerModel",()=>{ 
    describe("#save",()=>{ 
        it("must save seller",(done)=>{ 
            sellerModel.saveSeller({
                seller_id: uniqId(),
                seller_name: "aa1",
                seller_address: "address_aa1"
            }).then(()=>{
                done()
            }).catch(err=>{ 
                done(err)
            })
        })
    })



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