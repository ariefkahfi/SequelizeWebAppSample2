const DBModel = require("./db-model");
const dbModel = new DBModel();

class ProductModel { 
    saveProduct(product) {
        return dbModel.Product.create(product)
    }
    getProductById(product_id) {
        return dbModel.Product.findById(product_id)
    }
    getAll() {
        return dbModel.Product.findAll()
    }
}

module.exports = ProductModel