<template>
	<view class="downloadWapper">
		<image :src="imageSrc" class="downloadWapper-image" mode="aspectFit" @longpress="longpressEvent" />
	</view>
</template>

<script lang="ts" setup>
	import { ref, getCurrentInstance } from "vue"
	import { onLoad } from '@dcloudio/uni-app'

	const imageSrc = ref("")
	const { proxy } = getCurrentInstance()

	onLoad((option: any) => {
		imageSrc.value = option.src
	})

	// 长按弹出操作栏
	function longpressEvent() {
		if (!imageSrc.value) return
		uni.showActionSheet({
			itemList: ['保存图片'],
			success: (res) => {
				if (res.tapIndex === 0) {
					downloadFile()
				}
			},
		})
	}

	function downloadFile() {
		proxy.showLoading()
		uni.downloadFile({
			url: imageSrc.value,
			success: (res) => {
				if (res.statusCode === 200) {
					console.log('下载成功');
				}
			},
			complete() {
				proxy.hideLoading()
			}
		});
	}
</script>

<style>
	@import url("imageDownLoad.css");
</style>
