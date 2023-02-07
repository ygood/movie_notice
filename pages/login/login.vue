<template>
	<view class="page">
		<view class="login-page-wapper">
			<uni-icons type="contact" size="100" color="#A2DAF0" class="unlogin-icon" />
			<uni-forms ref="form" v-model="formData" :rules="rules">
				<uni-forms-item label="账号" name="name" style="border-bottom: 1px #eee solid;">
					<uni-easyinput type="text" v-model="formData.name" placeholder="请输入用户名" :inputBorder="false" />
				</uni-forms-item>
				<uni-forms-item label="密码" name="password" style="border-bottom: 1px #eee solid;">
					<uni-easyinput type="password" v-model="formData.password" placeholder="请输入密码"
						:inputBorder="false" />
				</uni-forms-item>
			</uni-forms>
			<button @click="submitForm" class="button" type="primary">注册/登录</button>
		</view>
		<view>
			<!-- 提示窗示例 -->
			<uni-popup ref="alertDialog" type="dialog">
				<uni-popup-dialog type="error" cancelText="关闭" confirmText="" title="登录错误" content="用户名或密码错误,请重新输入">
				</uni-popup-dialog>
			</uni-popup>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { reactive, getCurrentInstance } from "vue"
	import { onUnload } from '@dcloudio/uni-app'
	import request from "../../utils/request"
	import { responseStatus } from "../../utils/enum"
	import { Account } from "../../entity/interface/Account"
	import { setAccountInfo } from "../../utils/storage"

	const { proxy } = getCurrentInstance()

	const formData = reactive({
		name: "",
		password: ""
	})

	// 表单校验规则
	const rules = reactive({
		name: {
			rules: [{
				required: true,
				errorMessage: '请输入用户名',
			}]
		},
		password: {
			rules: [{
				required: true,
				errorMessage: '请输入密碼',
			}]
		}
	})

	onUnload(() => {
		formData.name = ""
		formData.password = ""
	})

	// 提交表单
	function submitForm() {
		const formref = proxy.$refs.form as any
		formref.validate().then(res => {
			login(res)
		}).catch(err => {
			console.error('表单错误信息：', err);
		})
	}

	// 登錄
	async function login(res: any) {
		const alertref = proxy.$refs.alertDialog as any
		const result = await request < Account > ("login", res, "POST").catch(() => {
			alertref.open()
		})
		// 登錄成功
		if (result.errCode === responseStatus.OK) {
			setAccountInfo(result.data)
			uni.switchTab({
				url: "/pages/user/user"
			})
			return
		}
		// 登錄錯誤
		alertref.open()
	}
</script>

<style>
	@import url("login.css");
</style>
