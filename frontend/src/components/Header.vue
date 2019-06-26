<template>
<div class="header">
	<div class="back"
	     v-if="isSubpage"
	     @click="goBack">
		<icon-back />
	</div>

	<h1>Fitness Guide</h1>
	<!--
		<div class="profileimage">
	-->
	<div v-if="!showMenu"
	     class="profileimage"
	     :style="{'background-image': 'url(' + profile_url + ')'}"
	     @click="showMenu = true">
	</div>
	<span v-else
	      class="close"
	      @click="showMenu = false">
		<icon-close />
	</span>
	<Menu :visible="showMenu"
	      :profile_url="profile_url"
	      @close="showMenu = false" />
</div>
</template>


<script>
export default {
	name: "Header",
	data: function() {
		return {
			showMenu: false
		}
	},
	props: {
		profile_url: {
			type: String,
			default: "/static/img/sample_profile_image.ee8fc40.jpg"
		}
	},
	methods: {
		goBack: function() {
			let parent = this.$route.meta.parent_url
			/* Replace $ with the given param value */
			if (parent.indexOf("$") > -1) {
				console.log(this.$route.params);
				parent = parent.replace("$", this.$route.params[this.$route.meta.replaceWith])
				console.log(parent);
			}
			this.$router.push(parent)
		}
	},
	created: function() {
		console.log(this.$route);
	},
	computed: {
		isSubpage: function() {
			return this.$route.meta.isSubpage
		}
	}
}
</script>
