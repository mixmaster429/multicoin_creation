'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "ratings", deps: []
 * createTable "users", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "create_user_rating",
    "created": "2021-05-25T23:19:22.829Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
            fn: "createTable",
            params: [
                "ratings",
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
                    "action": {
                        "type": Sequelize.STRING,
                        "field": "action"
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
        },
        {
            fn: "createTable",
            params: [
                "users",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "username": {
                        "type": Sequelize.STRING,
                        "field": "username"
                    },
                    "firstName": {
                        "type": Sequelize.STRING,
                        "field": "first_name"
                    },
                    "lastName": {
                        "type": Sequelize.STRING,
                        "field": "last_name"
                    },
                    "email": {
                        "type": Sequelize.STRING,
                        "field": "email"
                    },
                    "type": {
                        "type": Sequelize.STRING,
                        "field": "type"
                    },
                    "password": {
                        "type": Sequelize.STRING,
                        "field": "password"
                    },
                    "phone": {
                        "type": Sequelize.STRING,
                        "field": "phone"
                    },
                    "emailVerified": {
                        "type": Sequelize.BOOLEAN,
                        "field": "email_verified",
                        "defaultValue": false
                    },
                    "phoneVerified": {
                        "type": Sequelize.BOOLEAN,
                        "field": "phone_verified",
                        "defaultValue": false
                    },
                    "seedPhrase": {
                        "type": Sequelize.STRING,
                        "field": "seed_phrase"
                    },
                    "website": {
                        "type": Sequelize.STRING,
                        "field": "website"
                    },
                    "telegram": {
                        "type": Sequelize.STRING,
                        "field": "telegram"
                    },
                    "facebook": {
                        "type": Sequelize.STRING,
                        "field": "facebook"
                    },
                    "twitter": {
                        "type": Sequelize.STRING,
                        "field": "twitter"
                    },
                    "instagram": {
                        "type": Sequelize.STRING,
                        "field": "instagram"
                    },
                    "linkedin": {
                        "type": Sequelize.STRING,
                        "field": "linkedin"
                    },
                    "whitepaper": {
                        "type": Sequelize.STRING,
                        "field": "whitepaper"
                    },
                    "deactivated": {
                        "type": Sequelize.BOOLEAN,
                        "field": "deactivated"
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
        }
    ];
};
var rollbackCommands = function(transaction) {
    return [{
            fn: "dropTable",
            params: ["ratings", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["users", {
                transaction: transaction
            }]
        }
    ];
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
