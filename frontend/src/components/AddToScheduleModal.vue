<template>
<modal class="addToSchedule"
       :visible.sync="showModal"
       @close="state = 0"
       ref="modal">
	<date-picker v-if="state == 0"
	             ref="datePicker">
		<div class="buttons">
			<div class="cancel"
			     @click="close">abbrechen</div>
			<div class="confirm cta"
			     @click="date = getDate(); state = 1">weiter</div>
		</div>
	</date-picker>
	<div class="selectDetails"
	     v-else-if="state == 1 || state == 2">
		<h1>Wähle deine Informationen</h1>
		<div class="line">
			<label>Sätze</label>
			<NumberPicker :value.sync="sets" />
		</div>
		<div class="line">
			<label>Wiederholungen</label>
			<NumberPicker :value.sync="reps" />
		</div>
		<div class="buttons">
			<div class="cancel"
			     @click="close">abbrechen</div>
			<div class="confirm cta"
			     @click="addToSchedule">
				<span v-if="state == 1">
					hinzufügen
				</span>
				<icon-loading-white v-else />
			</div>
		</div>
	</div>
	<div class="successfullyAdded"
	     v-else-if="state == 3">
		<h1>Übung erfolgreich hinzugefügt!</h1>
		<img src="@/assets/undraw_finish_line.svg" /><br />
		<p>
			Die Übung wurde erfolgreich <br />
			zu deinem Traingsplan hinzugefügt
		</p>

		<!--<div class="cta"
				 @click="">zum Trainingsplan</div>-->
	</div>
</modal>
</template>


<script>
import api from "@/api"

export default {
	data: function() {
		return {
			showModal: false,
			state: 0,
			// States
			// 0 ... Pick Date,
			// 1 ... Pick Reps and Sets,
			// 2 ... Sending,
			// 3 ... Success
			sets: 3,
			reps: 8,
			date: null,
		}
	},
	props: ["exercise_id"],
	methods: {
		addToSchedule: function() {
			if (this.$data.state != 1) return
			this.$data.state = 2
			let date = this.$data.date

			let dateString = date.year + "-" + date.month + "-" + date.day

			api.addToSchedule(
					this.$props.exercise_id,
					dateString,
					this.$data.sets,
					this.$data.reps)
				.then(res => {
					this.$data.state = 3
					console.log(res);
					console.log("successfully added");
				})
		},
		show: function() {
			this.$data.showModal = true
		},
		close: function() {
			this.$refs.modal.close()
		},
		getDate: function() {
			console.log("test");
			return this.$refs.datePicker.getDate()
		}
	},
	computed: {}
}
</script>
