<template>
<div class="menu"
     v-if="visible">
	<div class="userinformation">
		<div class="profileimage"
		     :style="{'background-image': 'url(' + profile_url + ')'}"></div>
		<div class="info">
			<div class="name">
				{{name}}
			</div>
			<div class="email">
				{{email}}
			</div>
		</div>
	</div>
	<a class="item"
	   href="mailto:raphael.dick@studierende.htl-donaustadt.at?subject=Feedback/Support">
		<div class="icon">
			<icon-support></icon-support>
		</div>
		<div class="title">
			Support & Feedback
		</div>
	</a>
	<div class="item"
	     @click="logout">
		<div class="icon">
			<icon-logout></icon-logout>
		</div>
		<div class="title">
			Abmelden
		</div>
	</div>

	<div class="information">
		<div class="name">Fitness Guide App &copy</div>
		<span>ein Diplomarbeitsprojekt <br />der HTL-Donaustadt, 2018/19</span>
	</div>
</div>
</template>


<script>
export default {
	name: "Menu",
	props: {
		profile_url: {
			type: String
		},
		visible: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		logout: function() {

			localStorage.clear();

			this.$emit("close")
			if (!localStorage.getItem('jwt-token'))
				this.$router.push("/login/")
		}
	},
	created: function() {
		window.addEventListener('scroll', this.scroll);
	},
	computed: {
		name: function() {
			return localStorage.getItem('user-name')
		},
		email: function() {
			return localStorage.getItem('user-email')
		}
	},
	watch: {
		visible: function() {
			this.$store.state.modalOpen = this.$props.visible
		}
	}
}
</script>
