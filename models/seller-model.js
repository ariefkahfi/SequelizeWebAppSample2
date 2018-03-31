const DBModel = require("./db-model");
const dbModel = new DBModel();

class SellerModel { 
    saveSeller(seller) {
        return dbModel.Seller.create(seller)
    }
    getSellerById(seller_id) { 
        return dbModel.Seller.findById(seller_id)
    }
    getAll() {
        return dbModel.Seller.findAll()
    }
}

module.exports = SellerModel