'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "thumbDown" to table "users"
 * addColumn "thumbUp" to table "users"
 * addColumn "purchasedDate" to table "users"
 * addColumn "purchased" to table "users"
 *
 **/

var info = {
    "revision": 4,
    "name": "add-thumbupdown-verified",
    "created": "2021-06-03T03:21:49.384Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
            fn: "addColumn",
            params: [
                "users",
                "thumb_down",
                {
                    "type": Sequelize.INTEGER,
                    "field": "thumb_down"
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "addColumn",
            params: [
                "users",
                "thumb_up",
                {
                    "type": Sequelize.INTEGER,
                    "field": "thumb_up"
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "addColumn",
            params: [
                "users",
                "purchased_date",
                {
                    "type": Sequelize.DATE,
                    "field": "purchased_date"
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "addColumn",
            params: [
                "users",
                "purchased",
                {
                    "type": Sequelize.BOOLEAN,
                    "field": "purchased",
                    "defaultValue": false
                },
                {
                    transaction: transaction
                }
            ]
        }
    ];
};
var rollbackCommands = function(transaction) {
    return [{
            fn: "removeColumn",
            params: [
                "users",
                "thumb_down",
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "removeColumn",
            params: [
                "users",
                "thumb_up",
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "removeColumn",
            params: [
                "users",
                "purchased_date",
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "removeColumn",
            params: [
                "users",
                "purchased",
                {
                    transaction: transaction
                }
            ]
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
