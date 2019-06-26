<template>
<div class="schedule selection">
	<span @click="previous">
		<icon-back />
	</span>
	<span class="date"
	      @click="showModal">
		<h2>
			<span v-if="isYesterday">Gestern</span>
			<span v-else-if="isToday">Heute</span>
			<span v-else-if="isTomorrow">Morgen</span>
			<span v-else>{{dateString}}</span>
		</h2>
		<p>
			<span v-if="daysUntil > 1">in {{daysUntil}} Tagen</span>
			<span v-else-if="daysUntil < -1">vor {{daysUntil*-1}} Tagen</span>
			<span v-else>{{dateString}}</span>
		</p>
	</span>
	<span @click="next">
		<icon-next />
	</span>
</div>
</template>


<script>
export default {
	data: () => {
		return {
			selected: false,
			date: new Date()
		}
	},
	created: function() {
		this.$emit("update:date", this.$data.date.getFullYear() + "-" + (this.$data.date.getMonth() + 1) + "-" + this.$data.date.getDate())
	},
	methods: {
		next: function() {
			this.$data.date = new Date(this.$data.date.getTime() + (24 * 60 * 60 * 1000))

			let dateString = this.$data.date.getFullYear() + "-" + (this.$data.date.getMonth() + 1) + "-" + this.$data.date.getDate()
			this.$emit("update:date", dateString)
		},
		previous: function() {
			this.$data.date = new Date(this.$data.date.getTime() - (24 * 60 * 60 * 1000))

			let dateString = this.$data.date.getFullYear() + "-" + (this.$data.date.getMonth() + 1) + "-" + this.$data.date.getDate()
			this.$emit("update:date", dateString)
		},
		showModal: function() {
			this.$emit("showDatepicker")
		},
		setDate: function(date) {
			console.log("mei neiches Datum", date);
			let dateParts = date.split("-")
			this.$data.date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2])

			this.$emit("update:date", date)
		}
	},
	computed: {
		isYesterday: function() {
			let yesterday = new Date(new Date().getTime() - (24 * 60 * 60 * 1000)).setHours(0, 0, 0, 0)
			let date = new Date(this.$data.date).setHours(0, 0, 0, 0)
			return (yesterday == date)
		},
		isToday: function() {
			let today = new Date(new Date()).setHours(0, 0, 0, 0)
			let date = new Date(this.$data.date).setHours(0, 0, 0, 0)
			return (today == date)
		},
		isTomorrow: function() {
			let tomorrow = new Date(new Date().getTime() + (24 * 60 * 60 * 1000)).setHours(0, 0, 0, 0)
			let date = new Date(this.$data.date).setHours(0, 0, 0, 0)
			return (tomorrow == date)
		},
		daysUntil: function() {
			var today = new Date().setHours(0, 0, 0, 0)
			var otherday = new Date(this.$data.date).setHours(0, 0, 0, 0)
			var timeDiff = otherday - today
			return timeDiff / (1000 * 3600 * 24)
		},
		dateString: function() {
			return this.$data.date.getDate() + "." + (this.$data.date.getMonth() + 1) + "." + this.$data.date.getFullYear()
		}
	}
}
</script>
