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
				<view class="detail-header_content-info">
					<text class="detail-header_content-info-text">{{formData.create_time}}</text>
					<text class="detail-header_content-info-text">{{formData.browse_count}}浏览</text>
					<text class="detail-header_content-info-text">{{formData.thumbs_up_count}}赞</text>
				</view>
			</view>
			<button class="detail-header_button" type="default" @click="follow(formData.author.id)">{{formData.is_author_like?'取消关注':'关注'}}</button>
		</view>
		<view class="detail-content">
			<view class="detail-html">
				<!-- <u-parse :content="formData.content" :noData="noData"></u-parse> -->
				内容
			</view>
			<view class="detail-comment">
				<view class="comment-title">最新评论</view>
				<view class="comment-content" v-for="item in commentsList" :key="item.comment_id">
					<comments-box :comments="item" @reply='reply'></comments-box>
				</view>
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
				<view class="detail-bottom_icons-box" @click="likeTap(formData._id)">
					<uni-icons :type="formData.is_like?'heart-filled':'heart'" size="22" color="#F07373"></uni-icons>
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
				commentsValue:'',
				// 获取的评论列表
				commentsList: [],
				// 评论的回复
				replyFormData: {}
			}
		},
		// 页面所有节点渲染完成后
		onReady() {},
		onLoad(query) {
			// 获取list-card传递过来的文章数据
			this.formData = JSON.parse(query.params)
			this.getDetail()
			this.getComments()
		},
		methods: {
			// 收藏文章
			likeTap(article_id){
				console.log('收藏文章');
				this.setUpadteLike(article_id)
			},
			// 关注作者
			follow(author_id) {
				console.log('关注')
				this.setUpdateAuthor(author_id)
			},
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
				if (!this.commentsValue) {
					uni.showToast({
						title:'请出入评论内容',
						icon:'none'
					})
					return
				}
				// 更新评论到数据库
				this.setUpdateComment({content:this.commentsValue,...this.replyFormData})
			},
			// 对评论的评论
			reply(e){
				this.replyFormData = {
					"comment_id":e.comments.comment_id,
					"is_reply": e.is_reply
				}
				if(e.comments.reply_id){
					this.replyFormData.reply_id = e.comments.reply_id
				}
				console.log(this.replyFormData);
				this.openComment()
			},
			// 发布评论
			setUpdateComment(content) {
				// 处理二次评论
				const formdata = {
					article_id: this.formData._id,
					...content
				}
				// console.log(formdata)
				// return // 暂时return，调试云函数
				uni.showLoading()
				this.$api.update_comment(formdata).then((res) => {
					console.log(res)
					uni.hideLoading()
					uni.showToast({
						title: '评论发布成功'
					})
					// 评论成功之后重新请求刷新页面
					this.getComments()
					// 关闭弹窗
					this.close()
					// 防止正常的评论与二次评论冲突
					this.replyFormData = {}
					// 评论之后清空输入框
					this.commentsValue = ''
				})
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
				})
			},
			// 请求评论内容
			getComments() {
				this.$api.get_comments({
					article_id: this.formData._id
				}).then((res) => {
					// console.log(res)
					const {data} = res // [ {},{},...]
					this.commentsList = data
				})
			},
			// 关注作者
			setUpdateAuthor(author_id){
				uni.showLoading()
				this.$api.update_author({
					author_id
				}).then(res=>{
					uni.hideLoading()
					this.formData.is_author_like = !this.formData.is_author_like
					uni.showToast({
						title:this.formData.is_author_like?'关注作者成功':'取消关注作者',
						icon:'none'
					})
				})
			},
			// 收藏文章
			setUpadteLike(article_id){
				uni.showLoading()
				this.$api.update_like({
					article_id
				}).then(res=>{
					uni.hideLoading()
					this.formData.is_like = !this.formData.is_like
					uni.showToast({
						title:this.formData.is_like ?'收藏成功':'取消收藏',
						icon:'none'
					})
					console.log('收藏成功');
				})
			}
		}
	}
</script>

<style lang="scss">
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

			image {
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

			.detail-header_content-info {
				color: #999;

				.detail-header_content-info-text {
					margin-right: 10px;
				}
			}
		}
		.detail-header_button {
			padding: 0 15px;
			flex-shrink: 0;
			height: 30px;
			line-height: 30px;
			border-radius: 5px;
			font-size: 12px;
			color: #fff;
			background-color: $mk-base-color;
		}
	}

	.detail-content {
		margin-top: 20px;
		min-height: 500px;
		.detail-html {
			padding:0 15px;
		}
		.detail-comment {
			margin-top: 30px;
			.comment-title {
				padding: 10px 15px;
				font-size: 14px;
				color: #666;
				border-bottom: 1px #f5f5ff solid;
			}
			.comment-content {
				padding: 0 15px;
				border-top: 1px #eee solid;
			}
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
		border-top: 1px #f5f5f5 solid;
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
			border: 1px #ddd solid;
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
				.popup-header__item {
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
