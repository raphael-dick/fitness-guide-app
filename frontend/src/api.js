import axios from 'axios' // Package for AJAX Requests
import Joi from "joi"
import router from "./router"
import jwt from "jsonwebtoken"

const base_url = "http://51.75.156.165"

// const api_url = "http://localhost:4000/"
// Schule
// const api_url = "http://10.0.0.8:4000/" // Anna
// const api_url = "http://192.168.1.102:4000/" // Zuhause

const api_url = base_url + ":4000/"
const fileserver_url = base_url + ":5000/"

export default {
	fileserver_url,
	validationSchema: {
		name: Joi.string().max(32).regex(/^[\w\d\.\-]+[\w\d\.\- ]*$/),
		password: Joi.string().min(8).max(32).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/), // one letter and one number (regex)
		email: Joi.string().email({
			minDomainAtoms: 2 // length of letters after the .
		}).min(5).max(256)
	},
	login(email, password) {
		return new Promise((resolve, reject) => {
			axios.post(api_url + "user/login/", { // new AJAX request to server
					email,
					password
				})
				.then(response => {
					console.log(response)

					let token = response.data.token

					if (token) {
						localStorage.setItem('jwt-token', token)

						var decoded = jwt.decode(token);

						localStorage.setItem('user-email', decoded.email)
						localStorage.setItem('user-name', decoded.name)

						console.log(localStorage);

						router.push("/")


					} else
						reject({
							type: "general",
							hint: "Es ist ein unbekannter Fehler aufgetreten!"
						})

					resolve()
				})
				.catch(err => {
					console.log(err)

					let error = err.response ? err.response.data.error : {
						type: "general",
						hint: "Es ist ein unbekannter Fehler aufgetreten!"
					}

					reject(error)
				})
		})
	},
	register(name, email, password) {
		return new Promise((resolve, reject) => {
			axios.post(api_url + "user/register/", { // new AJAX request to server
					name,
					email,
					password
				})
				.then(response => {
					console.log(response)

					// TODO: Add register logic

					resolve()
				})
				.catch(err => {
					console.log(err.response.data.error)

					let error = err.response.data.error
					error = error ? error : {
						type: "general",
						hint: "Es ist ein unbekannter Fehler aufgetreten!"
					}

					reject(error)
				})
		})
	},
	checkEmail(email) {
		return new Promise((resolve, reject) => {
			axios.post(api_url + "user/check/", { // new AJAX request to server
					email
				})
				.then(response => {
					console.log(response)

					if (response.data.email_valid)
						resolve()
					else
						reject("Die Email ist bereits in Verwendung")
				})
				.catch(error => {
					console.log(error.response)

					reject("Es ist ein unbekannter Fehler aufgetreten!")
				})
		})
	},
	checkToken() {
		let config = {
			headers: {
				"Authorization": localStorage.getItem('jwt-token')
				//Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJuYW1lIjoiUmFwaGFlbCBEaWNrIiwiZW1haWwiOiJ0ZXN0QG1haWwuY29tIiwiaWF0IjoxNTQwODk5OTc1LCJleHAiOjE1NDE1MDQ3NzV9.tQjXxde2cpa0l5vyJ4pap1Wg8LV9dXKSqtllPOVvMys"
			}
		}
		return new Promise((resolve, reject) => {
			axios.post(api_url + "user/check/token/", {
					test: "test"
				}, config)
				.then(res => {
					if (res.data.success)
						resolve()
					else
						reject("error")
				}).catch(err => {
					reject("error")
				})
		})
	},
	getRecommended() {
		let config = {
			headers: {
				"Authorization": localStorage.getItem('jwt-token')
			}
		}
		return new Promise((resolve, reject) => {
			axios.get(api_url + "exercise/recommended/", config)
				.then(res => resolve(res.data.results))
				.catch(err => {
					console.log(err.message);
					reject("error")
				})
		})
	},
	search(value) {
		let config = {
			headers: {
				"Authorization": localStorage.getItem('jwt-token')
			}
		}
		return new Promise((resolve, reject) => {
			axios.get(api_url + "exercise/search/" + value, config)
				.then(res => resolve(res.data.results))
				.catch(err => {
					console.log(err.message);
					reject("error")
				})
		})
	},
	getExerciseOverview(id) {
		let config = {
			headers: {
				"Authorization": localStorage.getItem('jwt-token')
			}
		}
		return new Promise((resolve, reject) => {
			axios.get(api_url + "exercise/overview/" + id, config)
				.then(res => resolve(res.data))
				.catch(err => {
					console.log(err.message);
					reject("error")
				})
		})
	},
	getExerciseInformation(id) {
		let config = {
			headers: {
				"Authorization": localStorage.getItem('jwt-token')
			}
		}
		return new Promise((resolve, reject) => {
			axios.get(api_url + "exercise/" + id, config)
				.then(res => resolve(res.data))
				.catch(err => {
					console.log(err.message);
					reject("error")
				})
		})
	},
	getMuscles() {
		let config = {
			headers: {
				"Authorization": localStorage.getItem('jwt-token')
			}
		}
		return new Promise((resolve, reject) => {
			axios.get(api_url + "exercise/muscles/", config)
				.then(res => resolve(res.data))
				.catch(err => {
					console.log(err.message);
					reject("error")
				})
		})
	},
	getBrowseResults(muscle, difficulty) {
		let config = {
			headers: {
				"Authorization": localStorage.getItem('jwt-token')
			}
		}
		return new Promise((resolve, reject) => {
			axios.get(api_url + `exercise/browse/${muscle}/${difficulty}`, config)
				.then(res => resolve(res.data.results))
				.catch(err => {
					console.log(err.message);
					reject("error")
				})
		})
	},
	getSchedule(date) {
		let config = {
			headers: {
				"Authorization": localStorage.getItem('jwt-token')
			}
		}
		return new Promise((resolve, reject) => {
			axios.get(api_url + `schedule/${date}`, config)
				.then(res => resolve(res.data.results))
				.catch(err => {
					console.log(err.message);
					reject("error")
				})
		})
	},
	patchTask(id, done) {
		let config = {
			headers: {
				"Authorization": localStorage.getItem('jwt-token')
			}
		}
		return new Promise((resolve, reject) => {
			axios.patch(api_url + "task/", {
					task_id: id,
					done
				}, config)
				.then(res => resolve(res.data.results))
				.catch(err => {
					console.log(err.message);
					reject("error")
				})
		})
	},
	deleteTask(id) {
		let config = {
			headers: {
				"Authorization": localStorage.getItem('jwt-token'),
			}
		}
		return new Promise((resolve, reject) => {
			axios.delete(api_url + `task/${id}`, config)
				.then(res => resolve(res.data))
				.catch(err => {
					console.log(err.message);
					reject("error")
				})
		})
	},
	addToSchedule(exercise_id, date, sets, reps) {
		return new Promise((resolve, reject) => {
			let config = {
				headers: {
					"Authorization": localStorage.getItem('jwt-token'),
				}
			}
			axios.post(api_url + "task/", {
					exercise_id,
					date,
					sets,
					reps
				}, config)
				.then(res => {
					console.log(res)
					resolve(res.result)
				})
				.catch(err => {
					console.log(err.message);
					reject("error")
				})
		})
	},
	copySchedule(from, to) {
		return new Promise((resolve, reject) => {
			let config = {
				headers: {
					"Authorization": localStorage.getItem('jwt-token'),
				}
			}
			axios.post(api_url + "schedule/copy/", {
					from,
					to,
				}, config)
				.then(res => {
					console.log(res)
					resolve(res.result)
				})
				.catch(err => {
					console.log(err.message);
					reject("error")
				})
		})
	},
	verifyToken(token) {
		return new Promise((resolve, reject) => {
			let config = {
				headers: {
					"Authorization": localStorage.getItem('jwt-token'),
				}
			}
			axios.get(api_url + "user/verify/" + token, config)
				.then(res => {
					console.log(res)
					resolve(res.result)
				})
				.catch(err => {
					console.log(err.message);
					reject("error")
				})
		})
	},
	checkVerification() {
		return new Promise((resolve, reject) => {
			let config = {
				headers: {
					"Authorization": localStorage.getItem('jwt-token'),
				}
			}
			axios.post(api_url + "user/check/verification/", {}, config)
				.then(res => {
					console.log(res)
					resolve(res)
				})
				.catch(err => {
					console.log(err.message);
					reject("error")
				})
		})
	},
}