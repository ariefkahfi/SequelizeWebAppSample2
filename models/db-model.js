const Sequelize = require("sequelize");
const sequelize = new Sequelize("s_orm_webapp2","arief","123",{
    dialect:"mysql",
    operatorsAliases:false
});

// seller (1 to n) product
// product (n to n) store

class DatabaseModel { 
    constructor() {

    }

    syncAllTables(forceIt) {

    }
    doRelation() {
        // seller - product 
        this.Seller.hasMany(this.Product,{
            foreignKey:"seller_id"
        });
        this.Product.belongsTo(this.Seller,{
            foreignKey:"seller_id"
        });
        // seller - product

        
    }
    defineAllTables() {
        this.Seller = sequelize.define("seller",{
            seller_Id: {
                type:Sequelize.STRING,
                primaryKey:true
            },
            seller_name: {
                type:Sequelize.STRING,
                allowNull:false
            },
            seller_address: {
                type:Sequelize.STRING,
                allowNull:false
            }
        },{
            tableName:"seller",
            timestamps:false
        });
        this.Product = sequelize.define("product",{
            product_id: {
                type:Sequelize.STRING,
                primaryKey:true
            },
            product_name: {
                type:Sequelize.STRING,
                unique:true,
                allowNull:false
            },
            product_price: {
                type:Sequelize.FLOAT,
                allowNull:false
            }
        },{ 
            timestamps:false,
            tableName:"product"
        });
        this.Market = sequelize.define("market",{
            market_id: {
                type:Sequelize.INTEGER,
                primaryKey:true,
                autoIncrement:true
            },
            market_name: {
                type:Sequelize.STRING,
                allowNull:false,
                unique:true
            },
            market_contact: {
                type:Sequelize.STRING(12),
                allowNull:false,
                unique:true
            }
        },{ 
            timestamps:false,
            tableName:"market"
        });
        this.ProductMarket = sequelize.define("product_market",{},{
            timestamps:false,
            tableName:"product_market"
        });
    }
}

module.exports = DatabaseModel
