<template>
<div>
	<Header :profile_url="profile_url" />

	<router-view class="content"
	             ref="content" />
	<!--<keep-alive>
	</keep-alive>-->

	<Navigationbar />
</div>
</template>

<script>
import api from "@/api"
import store from "@/store"
export default {
	name: 'AppRoot',
	data: function() {
		return {
			profile_url: "https://images.unsplash.com/photo-1531251445707-1f000e1e87d0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f9b027f1ae70f3c65ec0337c710438c7&auto=format&fit=crop&w=881&q=80"
		}
	},
	methods: {
		logout: function() {
			localStorage.removeItem('jwt-token')
			if (!localStorage.getItem('jwt-token'))
				this.$router.push("/login/")
		},
		handleScroll: function(e) {
			console.log(e.target);
			console.log("Scroll");
			if (this.$store.state.modalOpen) {
				console.log("stop");
				this.$refs.content
				e.preventDefault()
				e.stopPropagation()
			}

		}
	},
	beforeRouteEnter: function(to, from, next) {
		api.getMuscles().then(data => {
			for (let val of data.results) {
				store.state.muscles[val.muscle_id] = val.name
			}
			console.log(store.state.muscles);
			next()
		})
	},
	created: function() {
		window.addEventListener('scroll', this.handleScroll);
	}
}
</script>
