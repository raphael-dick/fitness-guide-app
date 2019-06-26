<template>
<div class="navigation">
	<router-link to="/"
	             :class="{'icon': true, 'selected': selected == 'recommended'}">
		<icon-trends />
	</router-link>
	<router-link to="/search/"
	             :class=" {'icon': true, 'selected': selected == 'search'}">
		<icon-search />
	</router-link>
	<router-link to="/browse/"
	             :class=" {'icon': true, 'selected': selected == 'browse'}">
		<icon-browse />
	</router-link>
	<router-link to="/schedule/"
	             :class=" {'icon': true, 'selected': selected == 'schedule'}">
		<icon-schedule />
	</router-link>
</div>
</template>


<script>
export default {
	name: "Navigationbar",
	computed: {
		selected: function() {
			return this.$route.meta.tab ? this.$route.meta.tab : ""
		}
	}
}
</script>
