const mysql = require("promise-mysql")
const connection = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
})
module.exports.connection = connection

// const auth = require("jwt-auth-node")
//
// auth.config({
// 	secret: process.env.JWT_SECRET,
// 	expiresIn: "1w"
// })
// module.exports.auth = auth