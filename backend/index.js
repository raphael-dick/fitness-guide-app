const express = require("express")
const bodyParser = require("body-parser")
const dotenv = require("dotenv")
const cors = require("cors")
const auth = require("jwt-auth-node")
const mysql = require("promise-mysql")
// const validator = require("express-validator")

// dotenv setup
dotenv.config()

// jwt-auth setup
auth.config({
	secret: process.env.JWT_SECRET,
	expiresIn: "1w"
})

// mysql setup
const connection = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
})

// express setup
const port = process.env.PORT
const app = express()

// cors
app.use(cors())

// validatior
// app.use(validator())

// body-parser setup
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: true
}))

// Sleep For Testing Loading / Simulating Slower Connection
/*
app.use((req, res, next) => {
	setTimeout(() => {
		next()
	}, 2000);
})
*/

const verfication = require("./email_verification")
app.post("/test/", (req, res) => {
	verfication.generateKey(2)

	res.status(200).json("success")
})

// routes
app.use('/user', require('./routes/user'))
app.use('/exercise', require('./routes/exercise'))
app.use('/schedule', require('./routes/schedule'))
app.use('/task', require('./routes/task'))

// start server
app.listen(port, () => {
	console.log("\x1b[36m"); // console color cyan
	console.log("Started test-server on http://localhost:" + port)
	console.log("\x1b[0m"); // reset color
})