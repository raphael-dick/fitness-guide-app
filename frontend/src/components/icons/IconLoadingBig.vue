<template>
<div>
	<svg xmlns="http://www.w3.org/2000/svg"
	     viewBox="0 0 196.91 257">
		<path d="M161.79,104.27l10-65.38A33.71,33.71,0,0,0,138.49,0H57.78A33.72,33.72,0,0,0,24.47,38.86l10.08,65.9a98.46,98.46,0,0,0,3,152.24H159.37a98.47,98.47,0,0,0,2.43-152.73ZM139.29,40l-7.21,47.13a98.89,98.89,0,0,0-67.86.22L57,40a5.07,5.07,0,0,1-.2-1.33,1.58,1.58,0,0,1,0-.35A6.4,6.4,0,0,1,63.16,32H133.1a6.4,6.4,0,0,1,6.39,6.39,2.34,2.34,0,0,1,0,.42A5.13,5.13,0,0,1,139.29,40Z" /></svg>
	<svg xmlns="http://www.w3.org/2000/svg"
	     viewBox="0 0 196.91 257">
		<path d="M161.79,104.27l10-65.38A33.71,33.71,0,0,0,138.49,0H57.78A33.72,33.72,0,0,0,24.47,38.86l10.08,65.9a98.46,98.46,0,0,0,3,152.24H159.37a98.47,98.47,0,0,0,2.43-152.73ZM139.29,40l-7.21,47.13a98.89,98.89,0,0,0-67.86.22L57,40a5.07,5.07,0,0,1-.2-1.33,1.58,1.58,0,0,1,0-.35A6.4,6.4,0,0,1,63.16,32H133.1a6.4,6.4,0,0,1,6.39,6.39,2.34,2.34,0,0,1,0,.42A5.13,5.13,0,0,1,139.29,40Z" /></svg>
	<svg xmlns="http://www.w3.org/2000/svg"
	     viewBox="0 0 196.91 257">
		<path d="M161.79,104.27l10-65.38A33.71,33.71,0,0,0,138.49,0H57.78A33.72,33.72,0,0,0,24.47,38.86l10.08,65.9a98.46,98.46,0,0,0,3,152.24H159.37a98.47,98.47,0,0,0,2.43-152.73ZM139.29,40l-7.21,47.13a98.89,98.89,0,0,0-67.86.22L57,40a5.07,5.07,0,0,1-.2-1.33,1.58,1.58,0,0,1,0-.35A6.4,6.4,0,0,1,63.16,32H133.1a6.4,6.4,0,0,1,6.39,6.39,2.34,2.34,0,0,1,0,.42A5.13,5.13,0,0,1,139.29,40Z" /></svg>

	<div class="circle"></div>
	<div class="circle2"></div>

</div>
</template>


<script>
export default {
	name: 'IconLoadingBig'
}
</script>

<style scoped lang="sass">
div
	position: absolute
	top: calc(50% - 50px)
	left: calc(50% - 50px)
	height: 100px
	width: 100px

	line-height: 100px

	&.circle, &.circle2
		border-radius: 50%
		background-color: #4ECF75

		opacity: 0.3

		animation: pulse 1500ms ease-in-out infinite
		z-index: -100

		&.circle2
			animation-delay: 300ms
svg
	vertical-align: middle
	width: 1em
	animation: animate 750ms ease-in-out infinite
	//, colorize 2250ms linear infinite
	fill: #4ECF75
	fill: white

	transition: fill 750ms linear

	&:nth-child(2)
		animation-delay: 500ms
	&:nth-child(3)
		animation-delay: 1000ms

@keyframes animate
	0%
		transform: scale(0.8)
		opacity: 0.8
	50%
		transform: scale(1) translateY(-2px)
		opacity: 1
	100%
		transform: scale(0.8)
		opacity: 0.8

@keyframes pulse
	0%
		transform: scale(1)
	50%
		transform: scale(1.2)
	100%
		transform: scale(1)


@keyframes colorize
	0%
		fill: darken(#4ECF75, 10)
	50%
		fill: darken(#F5BD4D, 10)
	100%
		fill: darken(#4ECF75, 10)
</style>
