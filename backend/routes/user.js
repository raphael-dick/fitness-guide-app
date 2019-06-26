const user = require("express").Router()
const auth = require("jwt-auth-node")
const Joi = require("joi")
const config = require("../config")
const util = require("../util")
const verification = require("../email_verification")

const connection = config.connection

user.post("/register/", (req, res) => {
	if (!(req.body.email && req.body.password && req.body.name)) {
		res.status(403).json({
			success: false,
			error: {
				type: "params",
				hint: "invalid params, provide: 'email', 'name' & 'password'"
			}

			//["Provide: email, name and password"]
		})
		return
	}

	const validation = Joi.validate({
		email: req.body.email,
		password: req.body.password
	}, util.validationSchema)

	if (validation.error !== null) {
		res.status(403).json({
			success: false,
			error: {
				type: "validation",
				hint: "a validation error occurred",
				error: validation.error
			}
		})
		return
	}

	connection.query(`SELECT * FROM USER WHERE email = '${req.body.email}'`)
		.then(rows => {
			if (rows.length !== 0)
				throw new Error("email already in use")

			let date = new Date().toISOString().split("T")[0]

			return connection.query(`INSERT INTO user (name, email, password, member_sice) VALUES ('${req.body.name}','${req.body.email}','${util.hash(req.body.password)}','${date}');`)

		})
		.then(res => {
			//return connection.query(`SELECT LAST_INSERT_ID();`)
			return connection.query(`SELECT * FROM USER WHERE email = '${req.body.email}'`)
		})
		.then(result => {
			console.log(result);
			return verification.generateKey(result[0])
		})
		.then(() => {
			res.status(201).json({
				success: true
			})
		})
		.catch(err => {

			res.status(403).json({
				success: false,
				error: {
					type: "database",
					hint: "an internal database error occurred",
					error: err
				}
			})
		})
})

user.post("/login/", (req, res) => {
	if (!(req.body.email && req.body.password)) {
		res.status(403).json({
			success: false,
			error: {
				type: "params",
				hint: "invalid params, provide: 'email' & 'password'"
			}

			//"Provide: email and password"
		})
		return
	}

	connection.query(`SELECT * FROM USER WHERE email = '${req.body.email}' AND password = '${util.hash(req.body.password)}'`)
		.then(rows => {
			if (rows.length !== 0) {
				rows = rows[0]

				return auth.generateToken({
					user_id: rows.user_id,
					name: rows.name,
					email: rows.email
				})

			} else {
				throw new Error("invalid credentials")
			}
		})
		.then(token => {
			res.status(202).json({
				success: true,
				token
			})
		})
		.catch(err => {
			res.status(403).json({
				success: false,
				error: {
					type: "authorization",
					hint: "could not be logged in",
					error: err.message
				}

				//err.message
			})
		})
})

user.post("/check/token/", auth.protect, (req, res) => {
	res.status(202).json({
		success: true
	})
})

user.post("/check/verification/", auth.protect, (req, res) => {
	connection.query(`SELECT verified FROM USER WHERE user_id = '${req.auth.user_id}'`)
		.then(response => {
			console.log(response);
			res.status(202).json({
				verified: Boolean(response[0].verified)
			})
		})

})

user.post("/check/", (req, res) => {
	if (!(req.body.email || req.body.password)) {
		res.status(200).json({
			success: false,
			error: {
				type: "params",
				hint: "invalid params, provide: 'email' and/or 'password'"
			}

			//["Provide: email or a password"]
		})
		return
	}

	let json = {}

	if (req.body.password) {
		const validation = Joi.validate({
			password: req.body.password
		}, util.validationSchema)

		json.password_valid = validation.error === null ? true : false
	}

	if (req.body.email) {

		const validation = Joi.validate({
			email: req.body.email
		}, util.validationSchema)

		if (validation.error !== null) {
			json.email_valid = false
			res.status(200).json(json)
		} else {
			connection.query(`SELECT * FROM USER WHERE email = '${req.body.email}'`)
				.then(rows => {
					json.email_valid = rows.length !== 0 ? false : true
					res.status(200).json(json)
				})
				.catch(err => {
					console.log(err)
					json.email_valid = false
					res.status(200).json(json)
				})
		}
	} else {
		res.status(200).json(json)
	}
})

user.patch("/update/", auth.protect, (req, res) => { // Important there is no validation implemented!
	if (!(req.body.email || req.body.password || req.body.name)) {
		res.status(400).json({
			success: false,
			error: {
				type: "params",
				hint: "invalid params, provide: 'email','name' and/or 'password'"
			}

			//["Provide: email, name or password"]
		})
		return
	}

	let toupdate = {}

	if (req.body.email) toupdate.email = req.body.email

	if (req.body.name) toupdate.name = req.body.name

	if (req.body.password) toupdate.password = util.hash(req.body.password)

	let query

	for (key in toupdate) {
		if (query)
			query += `, ${key} = '${toupdate[key]}'`
		else
			query = ` ${key} = '${toupdate[key]}'`
	}

	connection.query(`UPDATE user SET ${query} WHERE user_id = '${req.auth.user_id}'`)
		.then(rows => {
			res.status(200).json({
				success: true
			})
		})
		.catch(err => {
			res.status(400).json({
				success: false,
				error: {
					type: "database",
					hint: "an internal database error occurred",
					error: err
				}
			})
		})

})

user.get("/verify/:key", auth.protect, (req, res) => {
	console.log("verify");
	connection.query(`SELECT EXISTS(SELECT 1 FROM verification WHERE user_id = '${req.auth.user_id}' AND token = '${req.params.key}') as "exists"`)
		.then((result) => {

			let exists = result[0].exists

			if (exists == 0)
				throw new Error("not exists")

			return connection.query(`UPDATE USER SET verified = 1 WHERE user_id = '${req.auth.user_id}'`)
		}).then(() => {
			return connection.query(`DELETE FROM VERIFICATION WHERE user_id = '${req.auth.user_id}'`)
		}).then(() => {
			res.status(200).json({
				success: true
			})
		})
		.catch(err => {
			console.log(err);
			res.status(404).json({
				success: false,
				error: {
					type: "expired",
					hint: "Token expired"
				}
			})
		})

})

module.exports = user