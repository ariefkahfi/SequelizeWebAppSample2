const DBModel = require("./db-model");
const dbModel = new DBModel();

class SellerModel { 
    saveSeller(seller) {
        return dbModel.Seller.create(seller)
    }

    async saveSellerAndSaveProduct(seller,product) {
        let savedSeller = await this.saveSeller(seller);
        let savedProduct = await dbModel.Product.create(product);
        return savedSeller.addProduct(savedProduct)
    }
    async removeProductFromSeller(seller_id,product_id) {
        
    }
    async addNewProductToSeller(seller_id,newProduct) {
        let getSeller = await this.getSellerById(seller_id)
        let saveNewProduct = await dbModel.Product.create(newProduct)
        return getSeller.addProduct(saveNewProduct)
    }

    getSellerById(seller_id) { 
        return dbModel.Seller.findById(seller_id)
    }
    getAll() {
        return dbModel.Seller.findAll()
    }
}

module.exports = SellerModel