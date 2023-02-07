<template>
	<view class="page">
		<!--   轮播图   -->
		<swiper class="swiper" circular :indicator-dots="true" :autoplay="true" :interval="5000"
			indicator-color="rgba(255, 255, 255, .5)" indicator-active-color="rgba(255, 255, 255, 1)" :duration="500">
			<swiper-item v-for="img in carouselImg" :key="img">
				<view class="swiper-item">
					<image :src="img" class="carousel" mode=""></image>
				</view>
			</swiper-item>
		</swiper>
		<!--   热门   -->
		<view class="page-black super-hot">
			<view class="super-hot-header-wapper">
				<uni-icons type="fire-filled" :size="20" color="#FF0000" />
				<view class="hot-header-title">热门电影</view>
			</view>
			<view class="super-hot-content-wapper">
				<scroll-view class="scroll-view_H" scroll-x="true">
					<view class="single-poster" v-for="(movie, index) in hotLists" :key="index">
						<view class="poster">
							<image :src="movie.image" class="poster-image"></image>
							<view class="poster-name">{{movie.name}}</view>
							<ScoreComponent :socre="movie.grades" :showSocre="true" />
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 热门预告 -->
		<view class="page-black super-hot">
			<view class="super-hot-header-wapper">
				<uni-icons type="wallet-filled" :size="20" color="#16D46B" />
				<view class="hot-header-title">热门预告</view>
			</view>
			<view class="notice-video-wapper">
				<video v-for="video in videoList" :key="video.id" :id="`video-${video.id}`" class="notice-video"
					:src="video.src" :poster="video.imge" :controls="true" @play="palyVideo(`video-${video.id}`)">
				</video>
			</view>
		</view>
		<!-- 猜你喜欢 -->
		<view class="page-black super-hot">
			<view class="super-hot-header-wapper">
				<uni-icons type="heart-filled" :size="20" color="#FFB6B4" />
				<view class="hot-header-title">猜你喜欢</view>
			</view>
			<view class="love-movie-wapper">
				<view class="single-love-movie" v-for="(item, index) in LoveList" :key="item.id">
					<image :src="item.image" class="love-movie-image"></image>
					<view class="love-movie-info">
						<view class="love-movie-name">{{item.name}}</view>
						<ScoreComponent :socre="item.grades" :showSocre="false" />
						<view class="love-movie-synopsis">
							{{item.time}} / {{item.country}} / {{item.type}} / {{item.keyword}}
						</view>
						<view class="love-movie-time">上映时间: {{item.releaseTime}}</view>
					</view>
					<view class="love-movie-like" @click="praiseme(index)">
						<uni-icons type="hand-up-filled" :size="20" color="#F3BB24" />
						<view class="love-movie-like-text">
							赞一下
						</view>
						<view :animation="animationData[index]" class="love-movie-like-text animation-opacity">
							+1
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { ref, getCurrentInstance } from "vue"
	import { onLoad, onPullDownRefresh, onUnload, onHide } from '@dcloudio/uni-app'
	import request from "../../utils/request"
	import { responseStatus } from "../../utils/enum"
	import { HotMovie } from "../../entity/interface/HotMovie"
	import { Video } from "../../entity/interface/Video"
	import { LoveMovie } from "../../entity/interface/LoveMovie"
	import ScoreComponent from "../../components/ScoreComponent/ScoreComponent.vue"

	const carouselImg = ref < string[] > ([])
	const hotLists = ref < HotMovie[] > ([])
	const videoList = ref < Video[] > ([])
	const LoveList = ref < LoveMovie[] > ([])
	const animationData = ref([])
	const animation = ref()
	const currentVideoContent = ref()
	const { proxy } = getCurrentInstance()

	onLoad(() => {
		// 创建动画对象
		animation.value = uni.createAnimation()
		getNoticeList()
		getHotMovies()
		getVideoList()
		getLoveList()
	})

	onPullDownRefresh(() => {
		getLoveList()
	})

	onUnload(() => {
		animationData.value = []
	})

	onHide(() => {
		if (currentVideoContent.value) {
			currentVideoContent.value.pause()
		}
	})

	// 获取海报列表
	async function getNoticeList() {
		carouselImg.value = []
		const res = await request < string[] > ("noticeList")
		if (res.errCode === responseStatus.OK) carouselImg.value = res.data
	}

	// 获取热门列表
	async function getHotMovies() {
		hotLists.value = []
		const res = await request < HotMovie[] > ("hotList")
		if (res.errCode === responseStatus.OK) hotLists.value = res?.data
	}

	// 获取预告片列表
	async function getVideoList() {
		videoList.value = []
		const res = await request < Video[] > ("videoList")
		if (res.errCode === responseStatus.OK) {
			videoList.value = res?.data
		}
	}

	// 获取喜欢
	async function getLoveList() {
		LoveList.value = []
		proxy.showLoading()
		const res = await request < LoveMovie[] > ("loveList")
			.finally(() => {
				uni.stopPullDownRefresh()
				proxy.hideLoading()
			})

		if (res.errCode === responseStatus.OK) {
			LoveList.value = res?.data
			animationData.value = new Array(LoveList.value.length)
		}
	}

	// 赞赏
	function praiseme(index: number) {
		animation.value.translateY(-55).opacity(1).step({
			duration: 400
		})
		animationData.value[index] = animation.value.export()
		setTimeout(() => {
			animation.value.translateY(0).opacity(0).step({
				duration: 0
			})
			animationData.value[index] = animation.value.export()
		}, 500)
	}

	function palyVideo(id: string) {
		currentVideoContent.value = uni.createVideoContext(id)
		videoList.value.forEach(ele => {
			const idtmp = `video-${ele.id}`
			if (idtmp !== id) {
				uni.createVideoContext(idtmp).pause()
			}
		})
	}
</script>

<style>
	@import url("./index.css");
</style>
