const DBModel = require("./db-model")
const dbModel = new DBModel()

class MarketModel { 
    saveMarket(market) {
        return dbModel.Market.create(market)
    }

    getOneById(market_id) {
        return dbModel.Market.findById(market_id)
    }
    getAll() {
        return dbModel.Market.findAll()
    }
    async removeProductFromMarket(product_id,market_id) {
        let getMarket = await this.getOneById(market_id)
        let getProduct = await dbModel.Product.findById(product_id)
        
        return getMarket.removeProduct(getProduct)
    }
    async addProductToMarket(product_id,market_id) {
        let getProduct = await dbModel.Product.findById(product_id)
        let getMarket = await this.getOneById(market_id)
        return getMarket.addProduct(getProduct)
    }
    async saveMarketAndAddProductToMarket(market,product_id) {
        let savMarket = await this.saveMarket(market)
        let getProduct = await dbModel.Product.findById(product_id)
        return savMarket.addProduct(getProduct)
    }
}

module.exports = MarketModel