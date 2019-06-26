const crypto = require("crypto")
const config = require("./config")

const mail = require('@sendgrid/mail');

const connection = config.connection

module.exports = {
	generateKey: function(user) {
		let user_id = user.user_id
		let key = undefined

		connection.query(`DELETE FROM verification where USER_ID = ${user_id}`)
			.then((res) => {
				key = crypto.createHash('md5').update(Math.random().toString(36).replace(/[^a-z]+/g, '')).digest("hex")
				console.log(key);

				return connection.query(`INSERT INTO verification (user_id, token) VALUES ('${user_id}', '${key}')`)
			})
			.then((res) => {
				console.log(res);
				return this.sendMail(user, key)
			})
			.then((res) => {
				console.log("Success");
			})
			.catch((err) => {
				console.log(err);
			})
	},
	sendMail: function(user, key) {
		mail.setApiKey(process.env.SEND_GRID_KEY)

		//user.email = "raphael.dick@studierende.htl-donaustadt.at"

		const msg = {
			to: user.email,
			from: {
				email: 'no-reply@fitness-guide.at',
				name: 'Fitness Guide'
			},
			subject: 'Your Fitness-Guide Verfication Link',
			//text: 'Your Verfication Link',
			//html: `<h1>Welcome to Fitness Guide ${user.name},</h1><strong>Click this link to verify your account</strong> http://localhost:8080/#/verify/${key}`,
			template_id: "d-af211ed1bf924f2283150bf42c6bb20b",
			dynamic_template_data: {
				subject: 'Your Fitness-Guide Verfication Link',
				name: user.name,
				buttonUrl: "http://localhost:8080/#/verify/" + key,
			},

		}

		/*text: 'Your Verfication Link',
		html: `<h1>Welcome to Fitness Guide ${user.name},</h1><strong>Click this link to verify your account</strong> http://localhost:8080/#/verify/${key}`,
		*/

		console.log("MESSAGE");
		console.log(msg);

		return mail.send(msg)
	}

}