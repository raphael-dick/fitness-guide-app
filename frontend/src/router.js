import Vue from 'vue'
import Router from 'vue-router'

import Guard from './guard'

Vue.use(Router)

const recommended = [{
	path: '',
	name: 'Recommended-Overview',
	component: () =>
		import ('@/views/authorized/Recommended'),
	meta: {
		tab: "recommended"
	},
}, {
	path: 'item/:id',
	name: 'Recommended-Item',
	component: () =>
		import ('@/views/authorized/Item'),
	meta: {
		isSubpage: true,
		parent_url: "/",
		tab: "recommended",
		//keepNotAlive: true
	}
}]

const search = [{
	path: '',
	name: 'Search',
	component: () =>
		import ('@/views/authorized/Search'),
	meta: {
		tab: "search",
	},
}, {
	path: 'item/:id',
	name: 'Search-Item',
	component: () =>
		import ('@/views/authorized/Item'),
	meta: {
		tab: "search",
		isSubpage: true,
		parent_url: "/search/",
		//keepNotAlive: true
	}
}]

const browse = [{
	path: '',
	name: 'Browse-MuscleSelection',
	component: () =>
		import ('@/views/authorized/Browse'),
	meta: {
		tab: "browse",
	},
}, {
	path: 'item/:id',
	name: 'Browse-Item',
	component: () =>
		import ('@/views/authorized/Item'),
	meta: {
		tab: "browse",
		isSubpage: true,
		parent_url: "/browse/$", // $ Will be replaced with the value of the Param <replaceWith>
		replaceWith: ["muscle", "difficulty"],
		//keepNotAlive: true
	}
}, {
	path: ':muscle',
	name: 'Browse-DifficultySelection',
	component: () =>
		import ('@/views/authorized/Browse'),
	meta: {
		tab: "browse",
		isSubpage: true,
		parent_url: "/browse/",
		//keepNotAlive: true
	}
}, {
	path: ':muscle/:difficulty',
	name: 'Browse-Results',
	component: () =>
		import ('@/views/authorized/Browse'),
	meta: {
		tab: "browse",
		isSubpage: true,
		parent_url: "/browse/$", // $ Will be replaced with the value of the Param <replaceWith>
		replaceWith: "muscle",
		item_url: "/browse/item/"
		//keepNotAlive: true
	}
}]

const schedule = [{
	path: '',
	name: 'Schedule',
	component: () =>
		import ('@/views/authorized/Schedule'),
	meta: {
		tab: "schedule",
	},
}]

export default new Router({
	routes: [{
			path: '/',
			component: () =>
				import ('@/views/AppRoot'),
			beforeEnter: Guard.checkAuth,
			meta: {
				requiresAuth: true
			},
			children: [{
					path: '',
					name: 'Recommended-Container',
					meta: {
						tab: "recommended"
					},
					component: () =>
						import ('@/views/authorized/Container'),
					children: recommended
				},
				{
					path: 'search',
					name: 'Search-Container',
					component: () =>
						import ('@/views/authorized/Container'),
					meta: {
						tab: "search"
					},
					children: search
				},
				{
					path: 'browse',
					name: 'Browse-Container',
					component: () =>
						import ('@/views/authorized/Container'),
					meta: {
						tab: "browse"
					},
					children: browse
				},
				{
					path: 'schedule',
					name: 'Schedule-Container',
					component: () =>
						import ('@/views/authorized/Container'),
					meta: {
						tab: "schedule"
					},
					children: schedule
				},
				{
					path: 'test',
					name: 'Testpage',
					component: () =>
						import ('@/views/authorized/Container'),
					children: [{
						path: '',
						name: 'Test',
						component: () =>
							import ('@/views/authorized/Test'),
					}]
				},
			]
		},
		{
			path: '/login/',
			name: 'Login',
			component: () =>
				import ('@/views/Login'),
			beforeEnter: Guard.checkAuth,
			meta: {
				requiresAuth: false
			}
		},
		{
			path: '/register/',
			name: 'Register',
			component: () =>
				import ('@/views/Register'),
			beforeEnter: Guard.checkAuth,
			meta: {
				requiresAuth: false
			}
		},
		{
			path: '/verify/:key',
			name: 'Verify',
			component: () =>
				import ('@/views/Verify'),
			beforeEnter: Guard.checkAuth,
			meta: {
				requiresAuth: true
			}
		}
	]
})