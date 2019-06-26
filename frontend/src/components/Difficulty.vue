<template>
<span :class="{'difficulty': true, 'hard': (difficulty == 3), 'normal': (difficulty == 2), 'easy': (difficulty == 1)}">
	{{difficultyName}}
</span>
</template>


<script>
export default {
	name: "Difficulty",
	props: ["difficulty"],
	computed: {
		difficultyName: function() {
			return this.$props.difficulty == 3 ? "Experte" : this.$props.difficulty == 1 ? "Anfänger" : "Fortgeschritten"
		}
	}
}
</script>
