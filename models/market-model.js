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
    
}

module.exports = MarketModel