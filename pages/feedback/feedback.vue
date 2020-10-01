<template>
	<view>
		<view class="feedback-title">意见反馈：</view>
		<view class="feedback-content">
			<textarea class="feedback-textarea" v-model="content" placeholder="请输入您要反馈的问题" />
			</view>
		<view class="feedback-title">反馈图片：</view>
		<view class="feedback-image-box">
			<view class="feedback-image-item" v-for="(item,index) in imageLists" :key="index">
				<view class="close-icon" @click="del(index)">
					<uni-icons type="closeempty" size="18" color="#fff"></uni-icons>
				</view>
				<view class="image-box">
					<image :src="item.url" mode="aspectFill"></image>
				</view>
			</view>
			<view v-if="imageLists.length < 5" class="feedback-image-item" @click="addImage">
				<view class="image-box">
					<uni-icons type="plusempty" size="50" color="#eee"></uni-icons>
				</view>
			</view>
		</view>
		<button class="feedback-button" type="primary" @click="submit">提交反馈意见</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content:'',
				imageLists:[]
			}
		},
		methods: {
			// 删除图片
			del(index){
				this.imageLists.splice(index,1)
			},
			// 添加图片
			addImage(){
				const count = 5 - this.imageLists.length
				uni.chooseImage({
					count:count, // h5页面，此字段是不生效的
					success:(res)=> { // 注意此处的箭头，否则 this将指向uni.chooseImage
						const tempfilepaths = res.tempFilePaths
						tempfilepaths.forEach((item,index)=>{
							// 处理 h5 多选的状况
							if(index<count){
								this.imageLists.push({
									url:item
								})
							}
						})
					}
				})
			},
			async submit(){
				// 存放已经上传的图片的网络路径
				let imagesPath = []
				uni.showLoading()
				// 不支持多图上传，一次上传一张
				// 不能使用 forEach 异步的方法，要不然不知道将来上传的是哪一张
				for(let i = 0 ; i < this.imageLists.length;i++){
					const filePath = this.imageLists[i].url
					filePath =  await this.uploadFiles(filePath,i) // 调用下面的函数
					imagesPath.push(filePath) // 存放已经上传的图片的网络路径
				}
				// console.log(imagesPath);
				// 图片上传成功后，更新图片的网络地址到 feedback 数据库 (手动创建)
				this.updateFeedback({
					content:this.content,
					feedbackImages:imagesPath
				})
			},
			// 上传图片
			async uploadFiles(filePath,i){
				const result = await uniCloud.uploadFile({
					filePath:filePath,
					cloudPath: i + '.jpg' // 云文件名
				})
				// console.log(result);
				return result.fileID // fileID 文件上传成功后的网络路径
			},
			// 更新网络图片地址到数据库
			updateFeedback({content,feedbackImages}){
				this.$api.update_feedback({content,feedbackImages}).then(res=>{
					uni.hideLoading()
					uni.showToast({
						title:"反馈提交成功",
						icon:'none'
					})
					setTimeout(()=>{
						uni.switchTab({
							url:'/pages/tabbar/my/my'
						})
					},2000)
				}).catch(()=>{
					uni.hideLoading()
					uni.showToast({
						title:"反馈提交失败 ",
						icon:"none"
					})
				})
			}
		}
	}
</script>

<style lang="scss">
.feedback-title {
	margin: 15px;
	margin-bottom: 0;
	font-size: 14px;
	color: #666;
	
}

.feedback-content {
	margin: 15px;
	padding: 10px;
	box-sizing: border-box;
	border: 1px #eee solid;
	.feedback-textarea {
		font-size: 12px;
		width: 100%;
		height: 100px;
	}
}
.feedback-image-box {
	display: flex;
	flex-wrap: wrap;
	padding: 10px;
	.feedback-image-item {
		position: relative;
		width: 33.33%;
		height: 0;
		padding-top: 33.33%;
		box-sizing: border-box;
		.close-icon {
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			right: 0;
			top: 0;
			width: 22px;
			height: 22px;
			border-radius: 50%;
			background-color: #ff5a5f;
			z-index: 2;
		}
		.image-box  {
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			top: 5px;
			right: 5px;
			bottom: 5px;
			left: 5px;
			border: 1px #eee solid;
			border-radius: 5px;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
		}
	}
}
.feedback-button {
	margin: 0 15px;
	background-color: $mk-base-color;
}
</style>
