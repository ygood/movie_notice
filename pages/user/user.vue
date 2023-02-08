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
				<view class="account-setting" @click="toUserInfo">
					<uni-icons type="gear" size="30" color="#fff" />
				</view>
			</view>
			<view class="unlogin-wapper" v-else>
				<uni-icons type="person" size="60" color="#666666" class="unlogin-icon" />
				<view class="registry">
					<navigator url="/pages/login/login">
						<text>登录 / 注册</text>
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from "vue"
	import { onShow } from '@dcloudio/uni-app'
	import { Account } from "../../entity/interface/Account"
	import { getAccountInfo } from "../../utils/storage"

	const islogin = ref(false)
	const account = ref < Account > ()

	onShow(() => {
		getAccount()
	})

	async function getAccount() {

		const userinfo = getAccountInfo()
		if (userinfo) {
			account.value = userinfo as Account
			islogin.value = true
		} else {
			islogin.value = false
			account.value = undefined
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

	function toUserInfo() {
		console.log("aaaaaaaaaaaaa")
		uni.navigateTo({
			url: "/pages/userInfo/userInfo"
		})
	}
</script>

<style>
	@import url("user.css");
</style>
