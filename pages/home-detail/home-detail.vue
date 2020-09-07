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
			<view class="detail-html">
				<u-parse :content="formData.content" :noData="noData"></u-parse>
			</view>
		</view>
		<view class="detail-bottom">
			<view class="detail-bottom_input" @click="openComment">
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
		<!-- ref 只能在组件中用，不能在view中用 -->
		<!-- :maskClick="false" 蒙版点击是否关闭弹窗 -->
		<uni-popup ref="popup" type="bottom" :maskClick="false">
			<view class="popup-wrap">
				<view class="popup-header">
					<text class="popup-header_item" @click="close">取消</text>
					<text class="popup-header_item" @click="submit">发布</text>
				</view>
				<view class="popup-content">
					<textarea class="popup-textarea" v-model="commentsValue" maxlength="200" fixed placeholder="请输入评论内容" />
					<view class="popup-count">{{commentsValue.length}}/200</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	export default {
		components: {
			uParse
		},
		data() {
			return {
				// list-card 传递过来的 文章数据
				formData: {},
				// 未获取到文章之前显示
				noData: '<p style="text-align:center;color:#666">详情加载中...</p>',
				// 评论内容
				commentsValue:''
			}
		},
		// 页面所有节点渲染完成后
		onReady() {},
		onLoad(query) {
			// 获取list-card传递过来的文章数据
			this.formData = JSON.parse(query.params)
			this.getDetail()

		},
		methods: {
			// 打开发布评论窗口
			openComment() {
				// this.$refs.popup 拿到自定义组件的实例 自带一个 open 方法
				this.$refs.popup.open()
			},
			// 关闭弹窗
			close() {
				this.$refs.popup.close()
			},
			// 发布评论
			submit() {
				console.log('发布')
				this.$refs.popup.close()
			},
			// 获取详情信息
			getDetail() {
				this.$api.get_detail({
					article_id: this.formData._id
				}).then((res) => {
					const {
						data
					} = res
					this.formData = data
					// console.log(res)
				})
			}
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
		margin-top: 20px;
		min-height: 500px;

		// border: 1px solid red;
		.detail-html {
			padding: 0 15px;
		}

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
	.popup-wrap {
		background-color: #fff;
		.popup-header {
			display: flex;
			justify-content: space-between;
			font-size: 14px;
			color: #666;
			border-bottom: 1px #F5F5F5 solid;
			.popup-header_item {
				height: 50px;
				line-height: 50px;
				padding: 0 15px;
			}
		}
		.popup-content {
			width: 100%;
			padding: 15px;
			box-sizing: border-box;
			.popup-textarea {
				width: 100%;
				height: 200px;
			}
			.popup-count {
				display: flex;
				justify-content: flex-end;
				font-size: 12px;
				color: #999;
			}
		}
	}
</style>
