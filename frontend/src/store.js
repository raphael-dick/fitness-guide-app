import Vue from 'vue'
import Vuex from 'vuex'
import router from './router' // Import for accessing the Router in VUEX-Store
import api from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		exercises: {},
		muscles: {},
		schedule: {},
		modalOpen: false,
	},
	getters: {
		getItemOverviews: (state) => (list) => {
			let arr = []
			for (let id of list) {
				arr.push(state.exercises[id])
			}
			return arr
		},
		getItemInformation: (state) => (id) => {
			return state.exercises[id]
		},
		getTask: (state) => (id) => {
			for (let date in state.schedule) {
				console.log(date);
				if (state.schedule[date][id])
					return state.schedule[date][id]
			}
			return null
		},
		getTasks: (state) => (date, list) => {
			console.log("ja");
			console.log(list);
			let arr = []
			for (let id of list) {
				let schedule = state.schedule[date][id]
				let exercise_id = schedule.exercise_id
				console.log("schedule", schedule);
				arr.push({
					...schedule,
					title: state.exercises[exercise_id].title,
					thumbnail_url: state.exercises[exercise_id].thumbnail_url,
				})
			}
			return arr
		},
	},
	mutations: {
		removeTask: (state, id) => {
			for (let date in state.schedule) {
				console.log(date);
				if (state.schedule[date][id])
					delete state.schedule[date][id]
			}
		}
	},
})