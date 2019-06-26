const task = require("express").Router()
const auth = require("jwt-auth-node")
const config = require("../config")

const connection = config.connection

task.post("/", auth.protect, (req, res) => {
	if (!(req.body.exercise_id && req.body.date && req.body.sets && req.body.reps)) {
		res.status(403).json({
			success: false,
			error: {
				type: "params",
				hint: "invalid params, provide: 'exercise_id', 'data', 'sets' & 'reps'"
			}

			// ["Provide: exercise_id, date, sets and reps"]
		})
		return
	}
	connection.query(`INSERT INTO task (exercise_id, user_id, date, sets, reps, done) VALUES (${req.body.exercise_id}, ${req.auth.user_id}, '${req.body.date}', ${req.body.sets}, ${req.body.reps}, false)`)
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

task.patch("/", auth.protect, (req, res) => {
	if (!(req.body.done != undefined && req.body.task_id)) {
		res.status(403).json({
			success: false,
			errors: {
				type: "params",
				hint: "invalid params, provide: 'done' & 'task_id'"
			}

			//["Provide: done and task_id"]
		})
		return
	}
	connection.query(`UPDATE task SET done = ${req.body.done} WHERE task_id = ${req.body.task_id}`)
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

task.delete("/:task_id", auth.protect, (req, res) => {
	if (!(req.params.task_id)) {
		res.status(403).json({
			success: false,
			errors: {
				type: "params",
				hint: "invalid params, provide: 'task_id'"
			}
			// ["Provide: task_id"]
		})
		return
	}
	connection.query(`DELETE FROM task WHERE task_id = ${req.params.task_id} AND user_id = ${req.auth.user_id}`)
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

module.exports = task