<template>
	<view class="page">
		<view class="user-page-header">
			<view class="login-wapper" v-if="islogin">
				<view class="userInfo">
					<image :src="account.avatar" class="login-icon" @click="avatarPreview"></image>
					<view class="user-content">
						<view class="user-name">
							{{account.name}}
						</view>
						<view class="user-account">
							账号：{{account.account}}
						</view>
					</view>
				</view>
				<view class="account-setting">
					<uni-icons type="gear" size="30" color="#fff" />
				</view>
			</view>
			<view class="unlogin-wapper" v-else>
				<uni-icons type="person" size="60" color="#666666" class="unlogin-icon" />
				<view class="registry">
					<navigator url="/pages/login/login">
						<text>登录</text>
					</navigator>
					/
					<navigator url="/pages/registry/registry">
						<text>注册</text>
					</navigator>
				</view>
			</view>

			<!-- <image :src="movieDetailJson?.image" class="header-avatar-image"> -->
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from "vue"
	import { onShow } from '@dcloudio/uni-app'
	import request from "../../utils/request"
	import { Account } from "../../entity/interface/Account"
	import { responseStatus } from "../../utils/enum"

	const islogin = ref(false)
	const account = ref < Account > ()

	onShow(() => {
		getAccount()
	})

	async function getAccount() {
		islogin.value = false
		const res = await request < Account > (`account`)
		if (res?.errCode === responseStatus.OK) {
			// islogin.value = true
			account.value = res?.data
		}
	}

	// 头像图片预览
	function avatarPreview() {
		if (account.value.avatar) {
			uni.previewImage({
				urls: [account.value.avatar],
				loop: false,
				current: account.value.avatar
			})
		}
	}
</script>

<style>
	@import url("user.css");
</style>
