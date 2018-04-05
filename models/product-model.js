const DBModel = require("./db-model");
const dbModel = new DBModel();

class ProductModel { 
    saveProduct(product) {
        return dbModel.Product.create(product)
    }
    getProductById(product_id) {
        return dbModel.Product.findById(product_id)
    }

    reduceStockById(product_id,howMuchStock) {
        return dbModel
                    .getSequelize()
                    .query(`
                        update product
                        set product_stock = product_stock - :p_stock
                        where product_id = :p_id
                    `,{ replacements : {
                            p_stock: howMuchStock,
                            p_id: product_id
                    }})
    }
    checkStockById(product_id ,  howMuchStock,cbA){ 
        this.getProductById(product_id)
            .then(product=>{
                if(product.product_stock <=0 || howMuchStock > product.product_stock) {
                    cbA("ERR")
                    console.log("Stock is",product.product_stock)
                }else{
                    cbA("OK")
                }
            })
            .catch(err=>{ 
                cbA("ERR")
                console.log(err)
            })
    }
    getAll() {
        return dbModel.Product.findAll()
    }
}

module.exports = ProductModel