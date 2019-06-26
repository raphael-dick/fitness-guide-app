<template>
<div class="numberPicker">
	<button @click="update(-1)">
		-
	</button>
	<span>{{current}}</span>
	<button @click="update(+1)">
		+
	</button>
</div>
</template>


<script>
export default {
	data: function() {
		return {
			current: this.$props.value
		}
	},
	props: {
		value: {
			default: 0
		}
	},
	methods: {
		update: function(value) {
			this.$data.current += value
			if (this.$data.current < 0)
				this.$data.current = 0
			this.$emit('update:value', this.$data.current)
		}
	}
}
</script>
