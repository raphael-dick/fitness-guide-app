const crypto = require('crypto')
const Joi = require("joi")

module.exports.hash = (data) => {
	return crypto.createHmac('sha256', process.env.SHA265_SECRET)
		.update(data)
		.digest('hex')
}

module.exports.validationSchema = {
	password: Joi.string().regex(/^[a-zA-Z0-9]/).min(8).max(32),
	email: Joi.string().email({
		minDomainAtoms: 2 // length of letters after the .
	}).min(5).max(256)
}