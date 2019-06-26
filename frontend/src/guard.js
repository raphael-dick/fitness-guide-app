import axios from 'axios' // Package for AJAX Requests
import api from '@/api'

const homeRoute = "/" // default authorized Route
const loginRoute = "/login" // default unautorized Route

const devmode = false

export default {
	checkAuth(to, from, next) {
		// console.log("from", from);
		// console.log("to", to);
		if (devmode) next()

		// redirect to verfify when not verified
		console.log(to);
		if (hasAuthKey() && to.name != "Verify")
			api.checkVerification().then((res) => {
				if (!res.verified)
					next("/verify/0/")
			}).catch(err => {
				console.log(err);
			})

		if (from.name != null) { // comes from other Route
			if (requiresAuth(from)) { // auth page
				// console.log("from: auth");
				if (requiresAuth(to)) { // auth page
					// console.log("to: auth");
					// has auth?
					if (hasAuthKey()) {
						// console.log("fine")
						next()
					} else {
						// console.log("red '/login'")
						next(loginRoute)
					}
				} else { // no auth page
					// console.log("to: no-auth");
					// has auth?
					if (hasAuthKey()) {
						// console.log("red '/'")
						next(homeRoute)
					} else {
						// console.log("fine")
						next()
					}
				}
			} else { // no auth page
				// console.log("from: no-auth");
				if (requiresAuth(to)) { // auth page
					// console.log("to: auth");
					// check auth key
					if (hasAuthKey()) {
						checkAuthKey().then((response) => {
							// console.log("fine")
							next()
						}).catch((e) => {
							// console.log("red '/login'")
							localStorage.removeItem('jwt-token')
							localStorage.clear() // MAY BE THE ERROR
							next(loginRoute)
						})
					} else {
						// console.log("red '/login'")
						next(loginRoute)
					}
				} else { // no auth page
					// console.log("to: no-auth");
					// has auth?
					if (hasAuthKey()) {
						// console.log("red '/'")
						next(homeRoute)
					} else {
						// console.log("fine")
						next()
					}
				}
			}
		} else { // new page load
			// console.log("from: new");
			if (requiresAuth(to)) {
				// console.log("to: auth");
				// check auth
				if (hasAuthKey()) {
					checkAuthKey().then(response => {
						// console.log("fine")
						next()
					}).catch((e) => {
						// console.log("red '/login'")
						localStorage.removeItem('jwt-token')
						localStorage.clear()
						next(loginRoute)
					})
				} else {
					// console.log("red '/login'")
					next(loginRoute)
				}
			} else {
				// console.log("to: no-auth");
				// has auth?
				if (hasAuthKey()) {
					// console.log("red '/'")
					next(homeRoute)
				} else {
					// console.log("fine")
					next()
				}
			}
		}
	}
}

function requiresAuth(route) {
	// console.log("requires?");
	return route.matched.some(record => record.meta.requiresAuth) // returns boolean of the requiresAuth state of the route
}

function hasAuthKey() {
	// console.log("has key?");
	//localStorage.removeItem("jwt-token")
	if (localStorage.getItem('jwt-token') && localStorage.getItem('jwt-token').length > 0) // check if there is an auth key and if its 32 long (md5 hash length)
		return true
	// console.log("no");
	return false
}

async function checkAuthKey() {
	// console.log("key valid?");
	return api.checkToken()
}