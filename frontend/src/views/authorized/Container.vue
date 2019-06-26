<template>
<div>
	<keep-alive v-if="keepAlive">
		<router-view />
	</keep-alive>
	<router-view v-else />
</div>
</template>

<script>
export default {
	name: 'Container',
	computed: {
		keepAlive: function() {
			return !this.$route.meta.keepNotAlive
		}
	}
}
</script>
