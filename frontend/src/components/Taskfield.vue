<template>
<div :class=" {'taskfield': true, 'option' : showOptions}"
     v-if="!removed">
	{{state}}
	<v-touch class="touchdummy"
	         @swipeleft="showOptions=true">
		<v-touch class="touchdummy"
		         @swiperight="showOptions=false">
			<div class="main"
			     @click="clicked">
				<span :class="{'indicator': true, 'done': state}"
				      @click.stop="toggleState"
				      :style="{'background-image': 'url(' + thumbnail_fs_url + ')'}">
					<icon-check v-if="state" />
				</span>
				<div class="title">
					{{ title }}
				</div>

				<div class="information">
					{{ sets }} x {{ reps }}
				</div>

				<span class="options"
				      @click.stop="showOptions = !showOptions">
					<icon-more v-if="!showOptions" />
					<icon-close v-else />
				</span>
			</div>
		</v-touch>
	</v-touch>
	<div class="delete"
	     @click="remove">
		<span v-if="!removeLoading">
			entfernen
		</span>
		<icon-loading-white v-else />
	</div>
</div>
</template>


<script>
import api from '@/api'

export default {
	data: () => {
		return {
			showOptions: false,
			state: undefined,
			removed: false,
			removeLoading: false
		}
	},
	props: ["task_id", "done", "title", "sets", "reps", "thumbnail_url"],
	name: "Taskfield",
	computed: {
		thumbnail_fs_url: function() {
			return api.fileserver_url + "" + this.$props.thumbnail_url
		}
	},
	methods: {
		clicked: function() {
			if (this.$data.showOptions) this.$data.showOptions = false
		},
		toggleState: function() {
			this.$data.state = !this.$data.state


			api.patchTask(this.$props.task_id, this.$data.state).then(res => {
				console.log(res);
				let task = this.$store.getters.getTask(this.$props.task_id)
				task.done = this.$data.state

				this.$emit('update:done', this.$data.state)
				this.$emit('update')
			})

		},
		remove: function() {
			this.$data.removeLoading = true
			api.deleteTask(this.$props.task_id).then(res => {
				this.$store.getters.getTask(this.$props.task_id)
				this.$store.commit("removeTask", this.$props.task_id)
				this.$emit('remove', this.$props.task_id)
				console.log(this.$store.state.schedule);

				this.$data.removed = true
				console.log("successfully removed");
			}).catch(err => {
				this.$data.removeLoading = false
			})
		},
	},
	created: function() {
		this.$data.state = this.$props.done
	}
}
</script>
