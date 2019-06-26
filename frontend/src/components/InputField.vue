<template>
<div>
	<div v-if="type == 'name'"
	     class="inputfield">
		<label :for="this._uid"
		       :class="['icon', state]">
			<icon-user />
		</label>

		<input :id="this._uid"
		       placeholder="Name"
		       @click="selected"
		       @blur="leave"
		       v-model="data" />
	</div>

	<div v-if="type == 'email'"
	     class="inputfield">
		<label :for="this._uid"
		       :class="['icon', state]">
			<icon-loading-spinner v-if="state == 'loading'" />
			<icon-email v-else />
		</label>

		<input :id="this._uid"
		       placeholder="Email-Adresse"
		       type="email"
		       @click="selected"
		       @blur="leave"
		       v-model="data" />
	</div>

	<div v-if="type == 'password'"
	     class="inputfield">
		<label :for="this._uid"
		       :class="['icon', state]">
			<icon-key />
		</label>

		<input :id="this._uid"
		       placeholder="Password"
		       :type="showPassword ? 'text' : 'password'"
		       @click="selected"
		       @blur="leave"
		       v-model="data" />

		<span v-if="type == 'password'"
		      class="icon alt"
		      @click="showPassword = !showPassword">
			<icon-eye v-if="!showPassword" />
			<icon-eye-remove v-else />
		</span>
	</div>
</div>
</template>


<script>
export default {
	data: () => {
		return {
			showPassword: false,
			data: this.value
		}
	},
	name: "InputField",
	props: ["type", "value", "state"],
	methods: {
		clear: function() {
			this.$data.data = ""
		},
		selected: function() {
			this.$emit("select")
		},
		leave: function() {
			this.$emit("leave")
		}
	},
	watch: {
		data: function() {
			this.$emit("update:value", this.$data.data)
		}
	}
}
</script>
