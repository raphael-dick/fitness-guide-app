<template>
<modal class="copySchedule"
       :visible.sync="showModal"
       @close="state = 0"
       ref="modal">
	<date-picker v-if="state == 0 || state == 1"
	             ref="datePicker">
		<div class="buttons">
			<div class="cancel"
			     @click="close">abbrechen</div>
			<div class="confirm cta"
			     @click="copySchedule">
				<span v-if="state == 0">
					kopieren
				</span>
				<icon-loading-white v-else />
			</div>
		</div>
	</date-picker>
	<div class="successfullyCopied"
	     v-else-if="state == 2">
		<h1>Trainingsplan erfolgreich kopiert!</h1>
		<img src="@/assets/undraw_finish_line.svg" /><br />
		<p>
			Der Traningsplan vom {{dateFromString}} wurde <br />
			erfolgreich auf den {{dateString}} kopiert
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
			// 1 ... Sending,
			// 2 ... Success
			dateFrom: null,
		}
	},
	props: ["date"],
	methods: {
		copySchedule: function() {
			if (this.$data.state != 0) return
			this.$data.state = 1
			this.$data.dateFrom = this.getDate()
			let date = this.$data.dateFrom

			let dateString = date.year + "-" + date.month + "-" + date.day

			console.log("copy");

			api.copySchedule(dateString, this.$props.date)
				.then(res => {
					this.$data.state = 2
					console.log(res);
					console.log("successfully copied");
				})
		},
		show: function() {
			console.log("SSHOOOOW");
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
	computed: {
		dateString: function() {
			let parts = this.$props.date.split("-")
			return parts[2] + "." + parts[1] + "." + parts[0]
		},
		dateFromString: function() {
			let date = this.$refs.datePicker.getDate()
			return date.day + "." + date.month + "." + date.year
		}
	}
}
</script>
