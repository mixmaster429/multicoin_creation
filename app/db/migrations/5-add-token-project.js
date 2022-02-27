'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "tokens", deps: []
 *
 **/

var info = {
    "revision": 5,
    "name": "add-token-project",
    "created": "2021-07-23T13:14:37.518Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
        fn: "createTable",
        params: [
            "tokens",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "userid": {
                    "type": Sequelize.STRING,
                    "field": "userid"
                },
                "tokenName": {
                    "type": Sequelize.STRING,
                    "field": "token_name"
                },
                "tokenSymbol": {
                    "type": Sequelize.STRING,
                    "field": "token_symbol"
                },
                "decimal": {
                    "type": Sequelize.INTEGER,
                    "field": "decimal"
                },
                "network": {
                    "type": Sequelize.STRING,
                    "field": "network"
                },
                "website": {
                    "type": Sequelize.STRING,
                    "field": "website"
                },
                "whitepaper": {
                    "type": Sequelize.STRING,
                    "field": "whitepaper"
                },
                "description": {
                    "type": Sequelize.STRING,
                    "field": "description"
                },
                "logo": {
                    "type": Sequelize.STRING,
                    "field": "logo"
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email"
                },
                "developers": {
                    "type": Sequelize.STRING,
                    "field": "developers"
                },
                "audit": {
                    "type": Sequelize.STRING,
                    "field": "audit"
                },
                "telegram": {
                    "type": Sequelize.STRING,
                    "field": "telegram"
                },
                "twitter": {
                    "type": Sequelize.STRING,
                    "field": "twitter"
                },
                "facebook": {
                    "type": Sequelize.STRING,
                    "field": "facebook"
                },
                "instagram": {
                    "type": Sequelize.STRING,
                    "field": "instagram"
                },
                "linkedin": {
                    "type": Sequelize.STRING,
                    "field": "linkedin"
                },
                "coinmarketcap": {
                    "type": Sequelize.STRING,
                    "field": "coinmarketcap"
                },
                "coingecko": {
                    "type": Sequelize.STRING,
                    "field": "coingecko"
                },
                "subscription": {
                    "type": Sequelize.STRING,
                    "field": "subscription"
                },
                "paymentTx": {
                    "type": Sequelize.STRING,
                    "field": "payment_tx"
                },
                "verified": {
                    "type": Sequelize.BOOLEAN,
                    "field": "verified"
                },
                "featured": {
                    "type": Sequelize.BOOLEAN,
                    "field": "featured"
                },
                "endDate": {
                    "type": Sequelize.DATE,
                    "field": "end_date"
                },
                "thumbUp": {
                    "type": Sequelize.INTEGER,
                    "field": "thumb_up"
                },
                "thumbDown": {
                    "type": Sequelize.INTEGER,
                    "field": "thumb_down"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "created_at",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updated_at",
                    "allowNull": false
                }
            },
            {
                "transaction": transaction
            }
        ]
    }];
};
var rollbackCommands = function(transaction) {
    return [{
        fn: "dropTable",
        params: ["tokens", {
            transaction: transaction
        }]
    }];
};

module.exports = {
    pos: 0,
    useTransaction: true,
    execute: function(queryInterface, Sequelize, _commands)
    {
        var index = this.pos;
        function run(transaction) {
            const commands = _commands(transaction);
            return new Promise(function(resolve, reject) {
                function next() {
                    if (index < commands.length)
                    {
                        let command = commands[index];
                        console.log("[#"+index+"] execute: " + command.fn);
                        index++;
                        queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                    }
                    else
                        resolve();
                }
                next();
            });
        }
        if (this.useTransaction) {
            return queryInterface.sequelize.transaction(run);
        } else {
            return run(null);
        }
    },
    up: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, migrationCommands);
    },
    down: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, rollbackCommands);
    },
    info: info
};
