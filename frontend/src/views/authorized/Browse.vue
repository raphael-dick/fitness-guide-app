<template>
<div class="browseSelection">
	<div v-if="muscle == ''"
	     v-for="current in $store.state.muscles"
	     class="muscleSelector"
	     :style="{height: 'calc((100% + 1px) / '+Object.keys($store.state.muscles).length/2+')'}"
	     @click="setMuscle(current)">
		{{current}}
	</div>
	<div v-if="muscle != '' && difficulty == ''"
	     v-for="current in difficulties"
	     class="difficultySelector"
	     @click="setDifficulty(current.id)">
		{{current.name}}
	</div>

	<div v-if="muscle != '' && difficulty != ''">
		<div class="informationBox">
			<p>
				{{$store.state.muscles[muscle]}}
			</p>
			<Difficulty :difficulty="difficulty" />
		</div>

		<ItemPreview v-for="item in itemOverviews"
		             :key="item.exercise_id"
		             :id="item.exercise_id"
		             :title="item.title"
		             :difficulty="item.difficulty"
		             :muscles="item.muscles"
		             :currentMuscle="muscle"
		             :hideDifficulty="true"
		             :thumbnail_url="item.thumbnail_url" />


		<div v-if="loading">
			<icon-loading-big />
		</div>

		<div v-else
		     class="redirect">
			<router-link to="/search/"
			             v-if="items.length <= 0">
				<h1>Leider nichts gefunden</h1>
				<p>
					suche auf dem <br />
					Suchen Tab nach neuen Übungen
				</p>
				<img src="@/assets/undraw_personal_trainer.svg" />
			</router-link>
			<router-link to="/search/"
			             v-else>
				<h1>Nichts dabei gewesen?</h1>
				<p>
					suche auf dem <br />
					Suchen Tab nach neuen Übungen
				</p>
				<img src="@/assets/undraw_questions.svg" />
			</router-link>
		</div>
	</div>
</div>
</template>

<script>
import api from "@/api"
import actions from "@/actions"

export default {
	name: 'Browse',
	data: function() {
		return {
			items: [],
			difficulties: [
				{
					id: 1,
					name: "Anfänger",
					image_url: "",
				}, {
					id: 2,
					name: "Fortgeschritten"
				}, {
					id: 3,
					name: "Experte"
				}
			],
			loading: false,
		}
	},
	methods: {
		setMuscle(name) {
			let muscle = Object.keys(this.$store.state.muscles).find(key => this.$store.state.muscles[key] === name)
			console.log(muscle);
			let path = this.$route.path
			path = path.slice(-1) == "/" ? path : path + "/" // force '/' on end
			this.$router.push(path + muscle)
		},
		setDifficulty(difficulty) {
			let path = this.$route.path
			path = path.slice(-1) == "/" ? path : path + "/" // force '/' on end
			this.$router.push(path + difficulty)
		},
		browse() {
			this.$data.items = []
			this.$data.loading = true
			api.getBrowseResults(this.muscle, this.difficulty).then(data => {
				if (data.length <= 0)
					this.$data.loading = false

				for (let val of data) {
					actions.loadExerciseOverview(val.exercise_id).then(() => {
						this.$data.items.push(val.exercise_id)
						this.$data.loading = false
					})
				}
			})
		},
	},
	computed: {
		muscle: function() {
			return this.$route.params.muscle ? this.$route.params.muscle : ""
		},
		difficulty: function() {
			return this.$route.params.difficulty ? this.$route.params.difficulty : ""
		},
		itemOverviews: function() {
			return this.$store.getters.getItemOverviews(this.$data.items)
		}
	},
	afterMount: function() {
		console.log("mounted");
		if (muscle && difficulty) {
			console.log(this.$route.meta.parent_url);
			this.$route.meta.parent_url += "/" + muscle
			console.log(this.$route.meta.parent_url);
		}
	},
	created: function() {
		console.log(this.$route.params.muscle, this.$route.params.difficulty)

		if (this.$route.params.muscle && this.$route.params.difficulty)
			this.browse()
	},
	watch: {
		$route(to, from) {
			if (this.$route.params.muscle && this.$route.params.difficulty)
				this.browse()
		},
		// '$route.params.difficulty': function(difficulty) {
		// 	this.browse()
		// }
	}
}
</script>
