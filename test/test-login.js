const SellerModel = require("../models/seller-model")
const sellerModel = new SellerModel()
const assert = require("assert")


describe("loginTest",()=>{ 
    it("must be valid seller", (done)=>{ 
       sellerModel.getSellerByIdAndName("2sej73jffldf1t","Seller001")
        .then((gSeller)=>{
            assert.equal(gSeller == undefined , false)
            done()
        }).catch(err=>done(err))
    })
    it("must be invalid seller",(done)=>{ 
        sellerModel.getSellerByIdAndName(require("uniqid")(),"Seller002")
            .then(gSeller=>{ 
                assert.equal(gSeller == undefined , true)
                done()
            }).catch(err=> done(err))
    })
})  