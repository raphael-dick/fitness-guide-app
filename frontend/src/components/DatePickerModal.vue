<template>
<modal :visible.sync="showModal"
       ref="modal">
	<date-picker ref="datePicker"
	             :date="date"
	             @dateUpdated="dateUpdated"></date-picker>
</modal>
</template>


<script>
import api from "@/api"

export default {
	data: function() {
		return {
			showModal: false,
		}
	},
	props: ["date"],
	methods: {
		show: function() {
			this.$data.showModal = true
		},
		close: function() {
			this.$refs.modal.close()
		},
		getDate: function() {
			return this.$refs.datePicker.getDate()
		},
		dateUpdated: function(date) {
			this.$emit("dateUpdated", date.year + "-" + date.month + "-" + date.day)
			this.close()
		}
	},
}
</script>
