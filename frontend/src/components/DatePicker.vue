<template>
<div class="datePicker">
	<div class="controlls">
		<span @click="prevMonth()">
			<icon-back></icon-back>
		</span>
		<span>{{months[(month-1)%12]}} {{year}}</span>
		<span @click="nextMonth()">
			<icon-next></icon-next>
		</span>
	</div>
	<table>
		<tr>
			<th v-for="day in days">
				{{day}}
			</th>
		</tr>
		<tr v-for="date in dates">
			<td v-for="day in date"
			    :class="{preview: !day.inMonth}"
			    @click="select(day)">
				<span :class="{today: day.today, current: current ? (current.day == day.date.day && current.month == day.date.month && current.year == day.date.year) : false}">
					{{day.date.day}}
				</span>

			</td>
		</tr>
	</table>

	<slot></slot>
</div>
</template>


<script>
export default {
	data: function() {
		return {
			current: null,
			month: new Date().getMonth() + 1,
			year: new Date().getFullYear(),
			months: ["Jänner", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
			days: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
		}
	},
	props: ["date"],
	methods: {
		nextMonth: function() {
			this.$data.month++
			console.log(this.$data.month)
			if (this.$data.month > 12) {
				console.log("12 hoes")
				this.$data.year++
				this.$data.month = 1

				console.log("Month", this.$data.month)
			}
		},
		prevMonth: function() {
			this.$data.month--
			console.log(this.$data.month)
			if (this.$data.month < 1) {
				console.log("0 hoes")
				this.$data.year--
				this.$data.month = 12

				console.log("Month", this.$data.month)
			}
		},
		select: function(day) {
			if (!day.inMonth) {
				this.$data.month = day.date.month
			}
			this.$data.current = day.date
			this.$emit("dateUpdated", day.date)
		},
		getDate: function() {
			return this.$data.current
		},
	},
	computed: {
		dates: function() {
			let currentDate = new Date()
			currentDate.setHours(0, 0, 0, 0)

			let month = this.$data.month
			let year = this.$data.year

			if (!this.$data.current)
				this.$data.current = {
					day: currentDate.getDate(),
					month,
					year
				}

			let dates = []

			let dayCount = new Date(year, month, 0).getDate()
			let firstWeekday = new Date(year, month - 1, 1).getDay() - 1
			let lastWeekday = new Date(year, month, 0).getDay()

			let lastPrevDay = new Date(year, month - 1, 0).getDate()


			// days before Month
			for (var i = 1; i <= firstWeekday; i++) {
				let day = lastPrevDay - firstWeekday + i
				dates.push({
					date: {
						day: day,
						month: month - 1,
						year: year,
					},
					inMonth: false,
				})
			}

			// days of Month
			for (var i = 1; i <= dayCount; i++) {
				let date = new Date(year, month - 1, i)
				let day = i
				date.setHours(0, 0, 0, 0)

				dates.push({
					date: {
						day,
						month,
						year: year,
					},
					inMonth: true,
					today: (date.valueOf() == currentDate.valueOf()) // current day class
				})
			}

			// days after Month
			let length = 42 - dates.length;
			for (var i = 1; i <= length; i++) {
				let day = i
				dates.push({
					date: {
						day,
						month: month + 1,
						year,
					},
					inMonth: false,
				})
			}


			// console.log("dayCount", dayCount);
			// console.log("firstWeekday", firstWeekday);
			// console.log("lastWeekday", lastWeekday);
			// console.log("lastPrevDay", lastPrevDay)
			// console.log("dates", dates);

			let array = []
			array.push(dates.splice(0, 7))
			array.push(dates.splice(0, 7))
			array.push(dates.splice(0, 7))
			array.push(dates.splice(0, 7))
			array.push(dates.splice(0, 7))
			array.push(dates.splice(0, 7))

			// console.log(array);
			return array
		}
	},
	beforeMount: function() {
		if (!this.$props.date) return
		let date = this.$props.date.split("-")
		this.$data.current = {
			day: date[2],
			month: date[1],
			year: date[0],
		}
	},
	name: "Date",
}
</script>
