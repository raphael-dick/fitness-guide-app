import store from "@/store"
import api from "@/api"

export default {
	loadExerciseOverview(id) {
		return new Promise((resolve, reject) => {
			if (store.state.exercises[id] == undefined) {
				store.state.exercises[id] = {}
			}

			if (store.state.exercises[id]["thumbnail_url"] == undefined) {
				api.getExerciseOverview(id).then(data => {
					// prelaod Thumbnail Image
					let img = new Image()
					img.src = api.fileserver_url + "" + data.thumbnail_url
					img.onload = () => {

						// add to list and resolve
						store.state.exercises[id] = {
							...store.state.exercises[id],
							...data
						}
						resolve(id)
					}

				})
			} else {
				resolve(id)
			}
		})
	},
	loadExerciseInformation(id) {
		return new Promise((resolve, reject) => {
			if (store.state.exercises[id] == undefined) {
				store.state.exercises[id] = {}
			}

			if (store.state.exercises[id]["video_url"] == undefined) {
				api.getExerciseInformation(id).then(data => {
					store.state.exercises[id] = {
						...store.state.exercises[id],
						...data
					}
					resolve(id)
				})
			} else {
				resolve(id)
			}
		})
	},
	loadSchedule(date) {
		return new Promise((resolve, reject) => {
			if (store.state.schedule[date] == undefined) {
				store.state.schedule[date] = {}
			}

			console.log("date", date);

			api.getSchedule(date).then(data => {
				console.log("data", data);
				//store.state.schedule[date] = data

				console.log("state", store.state.schedule[date]);

				let arr = []

				for (let val of data) {
					console.log(val);
					this.loadExerciseOverview(val.exercise_id).then(id => {
						store.state.schedule[date][val.task_id] = {
							...val
						}

						arr.push(val.task_id)
					})
				}

				resolve(arr)
			})

		})
	}
}