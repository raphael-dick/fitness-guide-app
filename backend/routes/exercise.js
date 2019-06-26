const exercise = require("express").Router()
const auth = require("jwt-auth-node")
const joi = require("joi")
const config = require("../config")

const connection = config.connection

exercise.get("/overview/:id", auth.protect, (req, res) => {
	let data

	connection.query(`SELECT * FROM exercise WHERE exercise_id = '${req.params.id}'`)
		.then(rows => {
			let result = rows[0]

			delete result.video_url
			delete result.information
			delete result.description
			delete result.important
			data = result

			return connection.query(`SELECT muscle_id FROM muscles WHERE exercise_id = '${req.params.id}'`)
		})
		.then(rows => {
			data.muscles = rows

			res.status(200).json({
				...data
			})
		})
		.catch(err => {
			res.status(404).json({
				success: false,
				error: {
					type: "database",
					hint: "could not find an exercise with the given id",
					message: err
				}
			})
		})
})

exercise.get("/search/:term", auth.protect, (req, res) => {
	connection.query(`SELECT exercise_id FROM exercise WHERE title LIKE '%${req.params.term}%'`)
		.then(rows => {
			res.status(200).json({
				results: rows
			})
		})
		.catch(err => {
			res.status(404).json({
				success: false,
				error: {
					type: "database",
					hint: "could not find an exercise for the given term",
					message: err
				}
			})
		})
})

exercise.get("/browse/:muscle/:difficulty", auth.protect, (req, res) => {
	connection.query(`SELECT e.exercise_id FROM exercise e, muscles m WHERE m.muscle_id = '${req.params.muscle}' AND m.exercise_id = e.exercise_id AND e.difficulty = ${req.params.difficulty}`)
		.then(rows => {
			res.status(200).json({
				results: rows
			})
		})
		.catch(err => {
			res.status(404).json({
				success: false,
				error: {
					type: "database",
					hint: "could not find an exercise for the given selection",
					message: err
				}
			})
		})
})

exercise.get("/recommended/", auth.protect, (req, res) => {
	connection.query(`SELECT exercise_id FROM exercise LIMIT 10`)
		.then(rows => {
			res.status(200).json({
				results: rows
			})
		})
		.catch(err => {
			res.status(404).json({
				success: false,
				error: {
					type: "database",
					hint: "an internal database error occurred",
					message: err
				}
			})
		})
})

exercise.get("/muscles/", auth.protect, (req, res) => {
	connection.query(`SELECT * FROM muscle`)
		.then(rows => {
			res.status(200).json({
				results: rows
			})
		})
		.catch(err => {
			res.status(404).json({
				success: false,
				error: {
					type: "database",
					hint: "an internal database error occurred",
					message: err
				}
			})
		})
})

exercise.get("/:id", auth.protect, (req, res) => {
	let data

	connection.query(`SELECT * FROM exercise WHERE exercise_id = '${req.params.id}'`)
		.then(rows => {
			let result = rows[0]

			delete result.thumbnail_url

			data = result

			return connection.query(`SELECT muscle_id FROM muscles WHERE exercise_id = '${req.params.id}'`)
		})
		.then(rows => {
			data.muscles = rows

			res.status(200).json({
				...data
			})
		})
		.catch(err => {
			res.status(404).json({
				success: false,
				error: {
					type: "database",
					hint: "could not find an exercise with the given id",
					message: err
				}
			})
		})
})
module.exports = exercise