// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import './assets/styles/reset.css'
import './assets/styles/main.sass'
import './assets/styles/views.sass'
import './assets/styles/animations.sass'

Vue.config.productionTip = false

var VueTouch = require('vue-touch')
Vue.use(VueTouch, {
	name: 'v-touch'
})

Vue.component("InputField", () =>
	import ('./components/InputField.vue'));

Vue.component("InputButton", () =>
	import ('./components/InputButton.vue'));

Vue.component("Searchbar", () =>
	import ('./components/Searchbar.vue'));

Vue.component("Taskfield", () =>
	import ('./components/Taskfield.vue'));

Vue.component("Navigationbar", () =>
	import ('./components/Navigationbar.vue'));

Vue.component("Header", () =>
	import ('./components/Header.vue'));

Vue.component("ItemPreview", () =>
	import ('./components/ItemPreview.vue'));

Vue.component("Difficulty", () =>
	import ('./components/Difficulty.vue'));

Vue.component("Modal", () =>
	import ('./components/Modal.vue'));

Vue.component("DatePicker", () =>
	import ('./components/DatePicker.vue'));

Vue.component("ScheduleSelection", () =>
	import ('./components/ScheduleSelection.vue'));

Vue.component("Menu", () =>
	import ('./components/Menu.vue'));

Vue.component("AddToScheduleModal", () =>
	import ('./components/AddToScheduleModal.vue'));

Vue.component("CopyScheduleModal", () =>
	import ('./components/CopyScheduleModal.vue'));

Vue.component("DatePickerModal", () =>
	import ('./components/DatePickerModal.vue'));

Vue.component("NumberPicker", () =>
	import ('./components/NumberPicker.vue'));

Vue.component("VideoPlayer", () =>
	import ('./components/VideoPlayer.vue'));

/*********/
/* Icons */
/*********/
Vue.component("IconEye", () =>
	import ('./components/icons/IconEye.vue'))

Vue.component("IconEyeRemove", () =>
	import ('./components/icons/IconEyeRemove.vue'))

Vue.component("IconEmail", () =>
	import ('./components/icons/IconEmail.vue'))

Vue.component("IconUser", () =>
	import ('./components/icons/IconUser.vue'))

Vue.component("IconKey", () =>
	import ('./components/icons/IconKey.vue'))

Vue.component("IconSearch", () =>
	import ('./components/icons/IconSearch.vue'))

Vue.component("IconNext", () =>
	import ('./components/icons/IconNext.vue'))

Vue.component("IconBack", () =>
	import ('./components/icons/IconBack.vue'))

Vue.component("IconClose", () =>
	import ('./components/icons/IconClose.vue'))

Vue.component("IconMore", () =>
	import ('./components/icons/IconMore.vue'))

Vue.component("IconCheck", () =>
	import ('./components/icons/IconCheck.vue'))

Vue.component("IconBrowse", () =>
	import ('./components/icons/IconBrowse.vue'))

Vue.component("IconTrends", () =>
	import ('./components/icons/IconTrends.vue'))

Vue.component("IconSchedule", () =>
	import ('./components/icons/IconSchedule.vue'))

Vue.component("IconLogout", () =>
	import ('./components/icons/IconLogout.vue'))

Vue.component("IconLoadingSpinner", () =>
	import ('./components/icons/IconLoadingSpinner.vue'))

Vue.component("IconLoading", () =>
	import ('./components/icons/IconLoading.vue'))

Vue.component("IconLoadingWhite", () =>
	import ('./components/icons/IconLoadingWhite.vue'))

Vue.component("IconLoadingBig", () =>
	import ('./components/icons/IconLoadingBig.vue'))

Vue.component("IconSupport", () =>
	import ('./components/icons/IconSupport.vue'))

Vue.component("IconPlay", () =>
	import ('./components/icons/IconPlay.vue'))

Vue.component("IconPause", () =>
	import ('./components/icons/IconPause.vue'))

Vue.component("IconFullscreen", () =>
	import ('./components/icons/IconFullscreen.vue'))

Vue.component("IconFullscreenExit", () =>
	import ('./components/icons/IconFullscreenExit.vue'))

Vue.component("IconMediaBack", () =>
	import ('./components/icons/IconMediaBack.vue'))

Vue.component("IconMediaForward", () =>
	import ('./components/icons/IconMediaForward.vue'))

Vue.component("IconSoundMute", () =>
	import ('./components/icons/IconSoundMute.vue'))

Vue.component("IconSoundOn", () =>
	import ('./components/icons/IconSoundOn.vue'))

Vue.component("IconAdd", () =>
	import ('./components/icons/IconAdd.vue'))

/* Setup */

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')