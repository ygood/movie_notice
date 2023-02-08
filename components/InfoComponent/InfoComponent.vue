<template>
	<view class="contnet-info-wapper">
		<view class="content-left">
			<view class="">
				{{props.title}}
			</view>
		</view>
		<view class="content-right">
			<view class="content-right-text">
				<slot name="text"></slot>
			</view>
			<view class="content-right-icon">
				<uni-icons type="right" size="15" color="#A8A8A8" />
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	const props = defineProps({
		title: {
			type: String,
			default: ""
		}
	})
</script>

<style>
	@import url("InfoComponent.css");
</style>
