<template>
	<view class="userInfo-wapper">
		<view class="userInfo-contnet">
			<InfoComponent title="头像">
				<template v-slot:text>
					<image :src="account.avatar" class="login-icon"></image>
				</template>
			</InfoComponent>
			<InfoComponent title="昵称">
				<template v-slot:text>
					<text>{{account.name}}</text>
				</template>
			</InfoComponent>
			<InfoComponent title="生日">
				<template v-slot:text>
					<text>{{account.birthday}}</text>
				</template>
			</InfoComponent>
			<InfoComponent title="性别">
				<template v-slot:text>
					<text>{{account.gender === '1' ? '男' : '女'}}</text>
				</template>
			</InfoComponent>
		</view>
		<view class="userInfo-operate">
			<view class="clear-cache-wapper">
				<button @click="cleanCache" class="button" type="default">清除缓存</button>
			</view>
			<view class="logout-wapper">
				<button @click="logout" class="button" type="warn">退出登录</button>
			</view>
			<uni-popup ref="clearRef" type="message">
				<uni-popup-message type="success" message="清除成功" :duration="2000"></uni-popup-message>
			</uni-popup>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { ref, getCurrentInstance } from "vue"
	import { onShow } from '@dcloudio/uni-app'
	import request from "../../utils/request"
	import InfoComponent from "../../components/InfoComponent/InfoComponent.vue"
	import { Account } from "../../entity/interface/Account"
	import { getAccountInfo, removeAccountInfo } from "../../utils/storage"

	const account = ref < Account > ()
	const { proxy } = getCurrentInstance()

	onShow(() => {
		getAccount()
	})

	async function getAccount() {
		const userinfo = getAccountInfo()
		if (userinfo) {
			account.value = userinfo as Account
		} else {
			account.value = undefined
		}
	}

	function cleanCache() {
		const clearRef = proxy.$refs.clearRef as any
		clearRef.open()
	}

	function logout() {
		request < string > ("logout", {}, "POST").then(res => {
			if (res.errCode === 0) {
				const s = removeAccountInfo()
				if (s) {
					uni.switchTab({
						url: "/pages/user/user"
					})
				}
			}
		}).catch(err => {
			console.log(err)
		})
	}
</script>

<style>
	@import url("userInfo.css");
</style>
