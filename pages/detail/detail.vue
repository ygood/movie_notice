<template>
	<view class="detail-video-wapper">
		<video class="detail-video" id="detail-video" :src="movieDetailJson?.src" :controls="true">
		</video>
	</view>
	<view class="detail-info-wapper">
		<view class="detail-image-wapper">
			<image :src="movieDetailJson?.image" class="detail-image" @click="toImagePreView(movieDetailJson?.image)">
			</image>
		</view>
		<view class="detail-info">
			<view class="detail-info-name">{{movieDetailJson?.name}}</view>
			<view class="detail-info-text">{{movieDetailJson?.info}}</view>
			<view class="detail-info-text">原名：{{movieDetailJson?.formerly}}</view>
			<view class="detail-info-text">影片时长：{{movieDetailJson?.duration}}</view>
			<view class="detail-info-text">上映时间：{{movieDetailJson?.releaseTime}}</view>
			<view class="detail-score-wapper">
				<view class="detail-score-text">
					<view class="detail-score-name detail-info-text">
						综合评分：
					</view>
					<view class="detail-score-grades detail-info-text">
						{{movieDetailJson?.grades}}
					</view>
				</view>
				<view class="detail-score-icon">
					<view class="etail-score-icon-grades">
						<ScoreComponent :socre="movieDetailJson?.grades" v-if="movieDetailJson?.grades !== undefined"
							:showSocre="false" />
					</view>
					<view class="etail-score-icon-praise detail-info-text">
						{{movieDetailJson?.praise}} 人点赞
					</view>
				</view>
			</view>
		</view>
	</view>
	<view class="line-wapper">
		<view class="line"></view>
	</view>
	<view class="detail-desc-wapper">
		<view class="detail-title">
			剧情介绍
		</view>
		<view class="detail-desc-content">
			{{movieDetailJson?.describe}}
		</view>
	</view>
	<view class="detail-casting-wapper">
		<view class="detail-title">
			演职人员
		</view>
		<view class="detail-casting-content">
			<scroll-view class="scroll-view_H" scroll-x="true">
				<view class="director-image-wapper" v-for="(director, index) in directors" :key="director.id">
					<image :src="director.src" class="director-image" @click="actorPreview(index)"></image>
					<view class="director-role">
						导演
					</view>
					<view class="director-name">
						{{director.name}}
					</view>
				</view>

				<view class="director-image-wapper" v-for="(actor, index) in actors" :key="actor.id">
					<image :src="actor.src" class="director-image" @click="actorPreview(index + directors?.length)">
					</image>
					<view class="director-name">
						{{actor.name}}
					</view>
					<view class="actor-role">
						饰 {{actor.role}}
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
	<view class="detail-desc-wapper">
		<view class="detail-title">
			片场花絮
		</view>
		<view class="detail-tidbits-content">
			<scroll-view class="scroll-view_H" scroll-x="true">
				<view class="tidbits-image-wapper" v-for="(tidbit,index) in tidbits" :key="index">
					<image :src="tidbit" class="tidbits-image" @click="tidbitsPreview(index)"></image>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from "vue"
	import { onLoad, onReady, onShow, onHide } from '@dcloudio/uni-app'
	import request from "../../utils/request"
	import ScoreComponent from "../../components/ScoreComponent/ScoreComponent.vue"
	import { Directors } from "../../entity/interface/Directors"
	import { Actor } from "../../entity/interface/Actor"
	import { MovieDetail } from "../../entity/interface/MovieDetail"
	import { responseStatus } from "../../utils/enum"

	const movieDetailJson = ref < MovieDetail > ()
	const directors = ref < Directors[] > ([])
	const actors = ref < Actor[] > ([])
	const tidbits = ref < string[] > ([])
	const videoContext = ref()

	// #ifndef H5
	onReady(() => {
		videoContext.value = uni.createVideoContext("detail-video")
	})

	onHide(() => {
		videoContext.value && videoContext.value.pause()
	})

	onShow(() => {
		videoContext.value && videoContext.value.play()
	})
	// #endif

	onLoad((option: any) => {
		getMovieDetail(option?.id)
		getDirectors(option?.id)
		getActors(option?.id)
		getTidbits(option?.id)
	})

	// 获取电影详情
	async function getMovieDetail(id: number) {
		const res = await request < MovieDetail > (`movieDeatilVideo?id=${id}`)
		if (res?.errCode === responseStatus.OK) movieDetailJson.value = res?.data
	}
	// 获取导演列表
	async function getDirectors(id: number) {
		const res = await request < Directors[] > (`directors?id=${id}`)
		if (res?.errCode === responseStatus.OK) directors.value = res?.data
	}
	// 获取演员列表
	async function getActors(id: number) {
		const res = await request < Actor[] > (`actors?id=${id}`)
		if (res?.errCode === responseStatus.OK) actors.value = res?.data
	}
	// 获取现场花絮
	async function getTidbits(id: number) {
		const res = await request < string[] > (`tidbits?id=${id}`)
		if (res?.errCode === responseStatus.OK) tidbits.value = res?.data
	}

	// 演职人员预览
	function actorPreview(index: number) {
		const actArr = directors?.value.map(ele => ele?.src).concat(actors?.value.map(ele => ele?.src))
		uni.previewImage({
			urls: actArr,
			loop: true,
			current: actArr[index]
		})
	}

	// 花絮图片预览
	function tidbitsPreview(index: number) {
		uni.previewImage({
			urls: tidbits.value,
			loop: true,
			current: tidbits.value[index]
		})
	}
	// 图片预览
	function toImagePreView(src: string) {
		uni.navigateTo({
			url: `/pages/imageDownLoad/imageDownLoad?src=${src}`
		})
	}
</script>

<style>
	@import url("detail.css");
</style>
