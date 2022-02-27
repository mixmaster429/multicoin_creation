require("dotenv").config()


const { DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_LOGGING } = process.env

const config = {
  development: {
    dialect: "sqlite",
    storage: "app/db/database.sqlite",
    logging: parseInt(DB_LOGGING, 10) === 1 ? console.log : false,
    retry: {
      match: [/SQLITE_BUSY/],
      name: "query",
      max: 5,
    },
  },
  test: {
    database: DB_NAME,
    host: DB_HOST,
    dialect: "mysql",
    username: DB_USER,
    password: DB_PASS,
    logging: parseInt(DB_LOGGING, 10) === 1 ? console.log : false,
  },
  production: {
    database: DB_NAME,
    host: DB_HOST,
    dialect: "mysql",
    username: DB_USER,
    password: DB_PASS,
    logging: parseInt(DB_LOGGING, 10) === 1 ? console.log : false,
  },
}

module.exports = config
