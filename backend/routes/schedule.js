const schedule = require("express").Router()
const auth = require("jwt-auth-node")
const config = require("../config")

const connection = config.connection

schedule.post("/copy/", auth.protect, (req, res) => {
	if (!(req.body.from && req.body.to)) {
		res.status(403).json({
			success: false,
			errors: {
				type: "params",
				hint: "invalid params, provide: 'from' & 'to'"
			}
		})
		return
	}
	connection.query(`SELECT * FROM task WHERE date = '${req.body.from}' AND user_id = ${req.auth.user_id}`)
		.then(rows => {
			let promises = []

			for (let index in rows) {
				let row = rows[index]

				promises.push(
					connection.query(`INSERT INTO task (exercise_id, user_id, date, sets, reps, done) VALUES (${row.exercise_id}, ${req.auth.user_id}, '${req.body.to}', ${row.sets}, ${row.reps}, false)`)
				)
			}

			return Promise.all(promises)
		})
		.then(result => {
			res.status(200).json({
				result
			})
		})
		.catch(err => {
			res.status(500).json({
				success: false,
				error: {
					type: "database",
					hint: "an internal database error occurred",
					error: err
				}
			})
		})
})

schedule.get("/:date", auth.protect, (req, res) => {
	// if (!(req.params.date)) {
	// 	res.status(403).json({
	// 		success: false,
	// 		errors: ["Provide: date"]
	// 	})
	// 	return
	// }
	connection.query(`SELECT task_id, exercise_id, done, reps, sets FROM task WHERE user_id = ${req.auth.user_id} AND date = '${req.params.date}'`)
		.then(rows => {
			res.status(200).json({
				results: rows
			})
		})
		.catch(err => {
			res.status(500).json({
				success: false,
				error: {
					type: "database",
					hint: "an internal database error occurred",
					error: err
				}
			})
		})
})

module.exports = schedule