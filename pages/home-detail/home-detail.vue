<template>
	<view class="detail">
		<view class="detail-title">
			{{formData.title}}
		</view>
		<view class="detail-header">
			<view class="detail-header_logo">
				<image class="detail-header_logo-img" :src="formData.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="detail-header_content">
				<view class="detail-header_content-title">
					{{formData.author.author_name}}
				</view>
				<view class="listcard-content_info">
					<text class="listcard-content_info-text">{{formData.create_time}}</text>
					<text class="listcard-content_info-text">{{formData.browse_count}}浏览</text>
					<text class="listcard-content_info-text">{{formData.thumbs_up_count}}赞</text>
				</view>
			</view>
		</view>
		<view class="detail-content">
			详情数据
		</view>
		<view class="detail-bottom">
			<view class="detail-bottom_input">
				<text class="detail-bottom_input-text">谈谈你的看法</text>
				<uni-icons type="compose" size="16" color="#F07373"></uni-icons>
			</view>
			<view class="detail-bottom_icons">
				<view class="detail-bottom_icons-box">
					<uni-icons type="chat" size="22" color="#F07373"></uni-icons>
				</view>
				<view class="detail-bottom_icons-box">
					<uni-icons type="heart" size="22" color="#F07373"></uni-icons>
				</view>
				<view class="detail-bottom_icons-box">
					<uni-icons type="hand-thumbsup" size="22" color="#F07373"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// list-card 传递过来的 文章数据
				formData: {}
			}
		},
		// 获取list-card传递过来的文章数据
		onLoad(query) {
			this.formData = JSON.parse(query.params)
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.detail {
		padding: 15px 0;
		padding-bottom: 54px;
	}

	.detail-title {
		padding: 0 15px;
		font-size: 18px;
		font-weight: bold;
		color: #333;
	}

	.detail-header {
		display: flex;
		align-items: center;
		margin-top: 10px;
		padding: 0 15px;

		.detail-header_logo {
			flex-shrink: 0;
			width: 40px;
			height: 40px;
			border-radius: 50%;
			overflow: hidden;

			.detail-header_logo-img {
				width: 100%;
				height: 100%;
			}
		}

		.detail-header_content {
			width: 100%;
			padding-left: 10px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			font-size: 12px;

			.detail-header_content-title {
				font-size: 14px;
				color: #333;
			}

			.listcard-content_info {
				color: #999;

				.listcard-content_info-text {
					margin-right: 10px;
				}
			}
		}
	}

	.detail-content {
		height: 1000px;
		border: 1px solid red;
	}

	.detail-bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		align-items: center;
		width: 100%;
		height: 44px;
		border-top: 1px solid #f5f5f5;
		background-color: #fff;
		box-sizing: border-box;

		.detail-bottom_input {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-left: 10px;
			padding: 0 10px;
			width: 100%;
			height: 30px;
			border: 1px solid #ddd;
			border-radius: 5px;

			.detail-bottom_input-text {
				font-size: 14px;
				color: #999;
			}

		}

		.detail-bottom_icons {
			display: flex;
			flex-shrink: 0;
			padding: 0 10px;

			.detail-bottom_icons-box {
				position: relative;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 44px;
			}
		}
	}
</style>
