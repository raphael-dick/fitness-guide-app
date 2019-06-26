<template>
<div class="modal"
     v-if="state"
     @click.self="close">
	<div class="modalcontent">
		<div class="close"
		     @click="close">

			<icon-close></icon-close>
		</div>
		<slot></slot>
	</div>
</div>
</template>


<script>
export default {
	name: "Modal",
	props: {
		visible: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		close: function() {
			this.$props.visible = false
			this.$emit('update:visible', this.$props.visible)
			this.$emit('close')
		}
	},
	computed: {
		state: function() {
			return this.$props.visible
		}
	}
}
</script>
