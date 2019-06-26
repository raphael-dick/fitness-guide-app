<template>
<div :class="{videoplayer: true, fullscreen: isFullscreen}">
	<video ref="video"
	       autoplay
	       loop
	       :poster="thumbnail_url"
	       @timeupdate="timeUpdate"
	       @click="showControlls">
		<source :src="src"
		        type="video/mp4">
		Es gab einen Fehler !image hier!
	</video>
	<div :class="{controlls: true, visible: timeToHide > 0}"
	     @click.self="toggleControlls">
		<div class="topnav">
			<div @click="toggleMute">
				<icon-sound-mute v-if="isMuted"></icon-sound-mute>
				<icon-sound-on v-else></icon-sound-on>
			</div>
			<div @click="toggleFullscreen">
				<icon-fullscreen-exit v-if="isFullscreen"></icon-fullscreen-exit>
				<icon-fullscreen v-else></icon-fullscreen>
			</div>
		</div>
		<div class="mainnav">
			<div @click="skipBack">
				<icon-media-back></icon-media-back>
			</div>

			<div @click="togglePlayback">
				<icon-pause v-if="isPlaying"></icon-pause>
				<icon-play v-else></icon-play>
			</div>

			<div @click="skipForward">
				<icon-media-forward></icon-media-forward>
			</div>
		</div>
		<div class="bottomnav">
			<!--<progress min="0"
			          max="100"
			          value="0"
			          ref="progressbar"></progress>-->

			<input type="range"
			       min="0"
			       max="100"
			       value="0"
			       ref="progressbar"
			       @input="progressbarChanged"
			       @mousedown="dragStarted"
			       @touchstart="dragStarted"
			       @mouseup="dragEnded"
			       @touchend="dragEnded" />

			<span>{{timestamp}}</span>

		</div>
	</div>
</div>
</template>


<script>
export default {
	data: function() {
		return {
			timestamp: "00:00",
			isPlaying: true,
			timeToHide: 0,
			starttimeToHide: 10,
			isDragging: false,
			skipTime: 10,
			isFullscreen: false,
			isMuted: false,
		}
	},
	props: ["src", "thumbnail_url"],
	methods: {
		timeUpdate: function() {
			if (this.$data.timeToHide <= 0) return

			if (this.$data.isDragging) return

			var video = this.$refs.video
			var percentage = Math.floor((100 / video.duration) * video.currentTime)
			this.$refs.progressbar.value = percentage

			let min = Math.floor(video.currentTime / 60)
			let sek = Math.floor(video.currentTime % 60)
			sek = Math.floor(sek / 10) == 0 ? "0" + sek : sek
			min = Math.floor(min / 10) == 0 ? "0" + min : min

			this.$data.timestamp = min + " : " + sek

			// hide controlls after x time
			if (this.$data.isPlaying)
				this.$data.timeToHide--

		},
		progressbarChanged: function() {
			var video = this.$refs.video
			var progressbar = this.$refs.progressbar

			video.currentTime = video.duration * (progressbar.value / 100)

		},
		playVideo: function() {
			this.$refs.video.play()
			this.$data.isPlaying = true
			console.log("test");
		},
		pauseVideo: function() {
			this.$refs.video.pause()
			this.$data.isPlaying = false
			console.log("test");
		},
		togglePlayback: function() {
			console.log("toogled");
			if (this.$data.isPlaying) this.pauseVideo()
			else this.playVideo()
		},
		showControlls: function() {
			this.$data.timeToHide = this.$data.starttimeToHide
		},
		hideControlls: function() {
			this.$data.timeToHide = 0
		},
		toggleControlls: function() {
			console.log("toogled visibi");
			this.$data.timeToHide = this.$data.timeToHide > 0 ? 0 : this.$data.starttimeToHide
		},
		mouseup: function() {
			console.log("mouuuse");
		},
		dragStarted: function() {
			this.$data.isDragging = true
			if (this.$data.isPlaying)
				this.$refs.video.pause()
		},
		dragEnded: function() {
			this.$data.isDragging = false
			if (this.$data.isPlaying)
				this.$refs.video.play()
		},
		skipBack: function() {
			this.$refs.video.currentTime -= this.$data.skipTime
		},
		skipForward: function() {
			this.$refs.video.currentTime += this.$data.skipTime
		},
		toggleFullscreen: function() {
			this.$data.isFullscreen = !this.$data.isFullscreen
		},
		toggleMute: function() {
			console.log(this.$refs.video.muted);
			this.$refs.video.muted = !this.$refs.video.muted
			this.$data.isMuted = this.$refs.video.muted
		}
	},
	afterMount: function() {
		//this.$refs.video.play()
		this.$refs.video.addEventListener('timeupdate', this.timeUpdate, false);
	}
}
</script>
<style>
input[type=range] {
	-webkit-appearance: none;
	margin-left: 0;
}

input[type=range]:focus {
	outline: none;
}

input[type=range]::-webkit-slider-runnable-track {
	width: 100%;
	height: 6px;
	cursor: pointer;
	background-color: rgba(236, 236, 236, 0.5);
	border-radius: 3px;
	overflow: hidden;
}

input[type=range]::-webkit-slider-thumb {
	height: 8px;
	width: 8px;
	/*
    margin-top: -1px;
    */
	height: 6px;
	width: 6px;
	border-radius: 50%;
	background: #FFFFFF;
	cursor: pointer;
	-webkit-appearance: none;
	box-shadow: -100vw 0 0 calc(100vw - 4px) #4ECF75;
}
</style>
