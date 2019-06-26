<template>
<div class="item preview">
	<h2>{{title}}</h2>

	<Difficulty :difficulty="difficulty"
	            v-if="!hideDifficulty" />

	<router-link :to="overviewUrl"
	             class="thumbnail"
	             :style="{'background-image': 'url(' + thumbnail_fs_url + ')'}">
	</router-link>
	<div class="muscles"
	     v-if="currentMuscle">
		<span class="muscle selected">
			{{$store.state.muscles[currentMuscle]}}
		</span>
		<span class="muscle"
		      v-for="muscle in muscles"
		      v-if="muscle.muscle_id != currentMuscle"
		      @click="redirect(muscle.muscle_id)">{{$store.state.muscles[muscle.muscle_id]}}</span>
	</div>
	<div class="muscles"
	     v-else>
		<span class="muscle"
		      v-for="muscle in muscles"
		      @click="redirect(muscle.muscle_id)">{{$store.state.muscles[muscle.muscle_id]}}</span>
	</div>
	<span @click="showModal">
		<icon-add class="button"></icon-add>
	</span>
	<AddToScheduleModal :exercise_id="id"
	                    ref="modal" />
</div>
</template>


<script>
import api from "@/api"
export default {
	name: "ItemPreview",
	props: ["id", "title", "difficulty", "thumbnail_url", "muscles", "currentMuscle", "hideDifficulty"],
	computed: {
		difficultyName: function() {
			return this.$props.difficulty == 3 ? "Experte" : this.$props.difficulty == 1 ? "Anfänger" : "Fortgeschritten"
		},
		currentUrl: function() {
			return this.$route.fullPath
		},
		overviewUrl: function() {
			if (this.$route.meta.item_url) return this.$route.meta.item_url + this.$props.id
			return this.$route.fullPath + 'item/' + this.$props.id
		},
		thumbnail_fs_url: function() {
			return api.fileserver_url + "" + this.$props.thumbnail_url
		}
	},
	methods: {
		redirect: function(id) {
			this.$router.push("/browse/" + id)
		},
		showModal: function() {
			this.$refs.modal.show()
		},
	}
}
</script>
