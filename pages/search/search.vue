<template>
	<view class="page">
		<view class="search-wapper">
			<uni-easyinput suffixIcon="search" v-model="value" placeholder="请输入内容" @iconClick="search"
				confirmType="confirmType" class="search-wapper-input" @confirm="search" />
		</view>
		<view class="serach-result-wapper">
			<view class="serach-result-single" v-for="(movie,index) in movies" :key="index" v-if="movies.length > 0">
				<image :src="movie.image" class="result-movie-image" @click="todetail(movie.id)"></image>
				<view class="result-movie-name">
					{{movie.name}}
				</view>
			</view>
			<view class="result-empty" v-else>
				<image src="/static/icon/empty_data.png" class="result-empty-image"></image>
				<view class="result-empty-text">
					暂无数据
				</view>
			</view>
		</view>
		<!-- 		<view class="result-pagination" v-if="movies.length > 0">
			<uni-pagination title="标题文字" show-icon="true" :total="total" :current="current" :pageSize="pageSize"
				@change="paginationSearch" />
		</view> -->
	</view>
</template>

<script lang="ts" setup>
	import { ref, getCurrentInstance } from "vue"
	import { onLoad, onReachBottom } from '@dcloudio/uni-app'
	import request from "../../utils/request"
	import { responseStatus } from "../../utils/enum"
	import { MovieList } from "../../entity/interface/MovieList"
	import { HotMovie } from "../../entity/interface/HotMovie"

	const value = ref("")
	const movies = ref < HotMovie[] > ([])
	const total = ref(0)
	const current = ref(1)
	const pageSize = ref(10)
	const { proxy } = getCurrentInstance()

	onLoad(() => {
		search()
	})

	onReachBottom(() => {
		current.value += 1
		if (current.value * pageSize.value >= total.value) {
			return
		}
		paginationSearch()
	})

	// 分页
	function paginationSearch() {
		getMovies()
	}

	// 查询
	async function search() {
		current.value = 1
		getMovies()
	}

	// 获取数据
	async function getMovies() {
		proxy.showLoading()
		const res = await request < MovieList > ("movieList", {
				q: value.value,
				current: current.value,
				pageSize: pageSize.value
			})
			.finally(() => {
				proxy.hideLoading()
			})
		if (res.errCode === responseStatus.OK) {
			movies.value = movies?.value?.concat(res?.data.movies)
			total.value = res?.data.total
		}
	}

	function todetail(id: number) {
		uni.navigateTo({
			url: `/pages/detail/detail?id=${id}`
		})
	}
</script>

<style>
	@import url("./search.css");
</style>
