<template>
<div class="buttonContainer">
	<button :class="{'button':true, 'disabled': !enabled}"
	        @click="clicked">
		<slot></slot>
	</button>
</div>
</template>


<script>
export default {
	name: "InputButton",
	props: ["enabled"],
	methods: {
		clicked: function() {
			if (this.$props.enabled) this.$emit("call")
		}
	}
}
</script>
