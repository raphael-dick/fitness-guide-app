<template>
<div class="container search">
	<div class="inputfield search">
		<label :for="this._uid"
		       class="icon">
			<icon-search />
		</label>

		<input :id="this._uid"
		       placeholder="Suche"
		       v-model="state"
		       @blur="selected = false"
		       @click="selected = true"
		       @keyup.enter="search" />

		<span class="icon alt"
		      v-if="state != ''">

			<span v-if="selected"
			      @click="search">
				<icon-next />
			</span>
			<span v-else
			      @click="removeText">
				<icon-close />
			</span>
		</span>
	</div>
</div>
</template>


<script>
export default {
	data: () => {
		return {
			selected: false,
			state: this.value
		}
	},
	name: "Searchbar",
	props: {
		value: {
			type: String,
			default: ""
		}
	},
	methods: {
		removeText: function() {
			this.$data.state = ''
			this.$el.querySelector("input").select()
			console.log(this.$el);
			this.$data.selected = true
		},
		search: function() {
			this.$emit("search")
		},
	},
	watch: {
		state: function() {
			this.$emit("update:value", this.$data.state)
		}
	}
}
</script>
