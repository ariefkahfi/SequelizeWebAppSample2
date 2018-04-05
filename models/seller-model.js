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
        let getProduct = await dbModel.Product.findById(product_id)
        let getSeller = await this.getSellerById(seller_id)
        await getSeller.removeProduct(getProduct)
        return getProduct.destroy()
    }
    async addNewProductToSeller(seller_id,newProduct) {
        let getSeller = await this.getSellerById(seller_id)
        let saveNewProduct = await dbModel.Product.create(newProduct)
        return getSeller.addProduct(saveNewProduct)
    }
    async saveMarketAndSetSeller(seller_id,newMarket) {
        let gSeller = await this.getSellerById(seller_id)
        let persistMarket = await dbModel.Market.create(newMarket)
        return gSeller.addMarket(persistMarket)
    }
    async getMarketsAndGetProductsBySellerId(seller_id) { 
        let getSeller = await this.getSellerById(seller_id)
        let getProducts = await getSeller.getProducts()
        let getMarkets = await getSeller.getMarkets()

        // let jsonProducts = JSON.stringify(getProducts)
        // let jsonMarkets  = JSON.stringify(getMarkets)

        // let parsedProducts = JSON.parse(jsonProducts)
        // let parsedMarkets = JSON.parse(jsonMarkets)

        return { 
            products: getProducts,
            markets: getMarkets
        }
    } 
    getSellerByIdAndName(seller_id,s_name) {
        return dbModel.Seller.findById(seller_id,{ 
            where: {
                seller_name: s_name
            }
        })
    }
    getSellerById(seller_id) { 
        return dbModel.Seller.findById(seller_id)
    }
    getAll() {
        return dbModel.Seller.findAll()
    }
}

module.exports = SellerModel