<template>
	<view class="poster-grades">
		<uni-icons type="star-filled" v-for="index in fill_star" :key="index" :size="iconSize" :color="iconColor" />
		<uni-icons type="starhalf" v-for="index in half_star" :key="index" :size="iconSize" :color="iconColor" />
		<uni-icons type="star" v-for="index in star" :key="index" :size="iconSize" :color="iconColor" />
		<text :style="textStyle" v-if="showSocre">{{socre}}</text>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from "vue"

	const props = defineProps({
		socre: {
			type: Number,
			default: 0
		},
		showSocre: {
			type: Boolean,
			default: true
		},
		iconColor: {
			type: String,
			default: "#FFAA25"
		},
		iconSize: {
			type: String,
			default: "10"
		},
		textStyle: {
			type: String,
			default: "margin-left: 5px;"
		}
	})

	const star = ref(1)
	const half_star = ref(0)
	const fill_star = ref(4)

	setSore()

	function setSore() {
		let currsocre = props.socre
		if (!currsocre) {
			currsocre = 0
		}
		half_star.value = 0
		const intnum = Math.floor(currsocre / 2)
		fill_star.value = intnum
		const fractionnum = currsocre % 2
		if (fractionnum !== 0) {
			half_star.value = 1
		}
		star.value = 5 - intnum - half_star.value
	}
</script>

<style>
	@import url("ScoreComponent.css");
</style>
