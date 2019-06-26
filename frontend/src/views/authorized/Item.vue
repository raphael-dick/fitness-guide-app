<template>
<div class="item">
	<div v-if="loaded">
		<h2>{{information.title}}</h2>

		<Difficulty :difficulty="information.difficulty" />

		<video-player :src="video_url"
		              :thumbnail_url="thumbnail_url" />


		<div class="muscles">
			<span class="muscle"
			      v-for="muscle in information.muscles">
				{{$store.state.muscles[muscle.muscle_id]}}
			</span>
		</div>
		<button class="button"
		        @click="showModal">
			zu Trainingsplan hinzufügen
		</button>

		<div class="section">
			<h3>Information</h3>
			<p>{{information.information}}</p>
		</div>

		<div class="section">
			<h3>Beschreibung</h3>
			<p>{{information.description}}</p>
		</div>

		<div class="section">
			<h3>Weitere Hinweise</h3>
			<p>{{information.important}}</p>
		</div>
	</div>
	<div v-else>
		<icon-loading-big />
	</div>
	<AddToScheduleModal :exercise_id="id"
	                    ref="modal" />
</div>
</template>

<script>
import api from "@/api"
import actions from "@/actions"

export default {
	name: 'Item',
	data: function() {
		return {
			loaded: false,
			id: -1
		}
	},
	methods: {
		showModal: function() {
			this.$refs.modal.show()
		}
	},
	computed: {
		difficultyName: function() {
			return this.information.difficulty == 3 ? "Experte" : this.information.difficulty == 1 ? "Anfänger" : "Fortgeschritten"
		},
		information: function() {
			if (this.$data.id == -1) return {}
			return this.$store.getters.getItemInformation(this.$data.id)
		},
		video_url: function() {
			return api.fileserver_url + "" + this.information.video_url
		},
		thumbnail_url: function() {
			return api.fileserver_url + "" + this.information.thumbnail_url
		}
	},
	created: function() {
		this.$data.id = this.$route.params.id
		actions.loadExerciseInformation(this.$route.params.id).then(() => {
			this.$data.loaded = true
		})
	},
	watch: {
		'$route.params.id': function(id) {
			if (id) {
				this.$data.loaded = false
				this.$data.id = id
				actions.loadExerciseInformation(id).then(() => {
					this.$data.loaded = true
				})
			}
		}
	}
}
</script>
