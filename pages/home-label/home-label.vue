<template>
	<view class="label">
		<!-- 标签管理 -->
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">我的标签</view>
				<view class="label-edit" @click="editLabel">{{is_edit?'完成':'编辑'}}</view>
			</view>
			<view class="label-content">
				<view class="label-content_item" v-for="(item,index) in labelList" :key="item._id">
					{{item.name}}
					<uni-icons class="icons-close" v-if="is_edit" type="clear" size="20" color="red" @click="del(index)"></uni-icons>
				</view>
			</view>
		</view>
		<!-- 标签推荐 -->
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">标签推荐</view>
			</view>
			<view class="label-content">
				<view class="label-content_item" v-for="(item,index) in list" :key="item._id" @click="add(index)">{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				is_edit: false,
				// 收藏的标签
				labelList: [],
				// 未收藏的标签
				list: []
			}
		},
		onLoad() {
			this.getLabel()
		},
		methods: {
			// 编辑 标签点击事件
			editLabel() {
				// this.is_edit = !this.is_edit
				// true 正在编辑
				if (this.is_edit) {
					this.is_edit = false
				} else {
					this.is_edit = true
				}
			},
			// 标签上移
			add(index) {
				if (!this.is_edit) return
				this.labelList.push(this.list[index])
				this.list.splice(index, 1)
			},
			// 标签下移
			del(index) {
				this.list.push(this.labelList[index])
				this.labelList.splice(index, 1)
			},
			// 调用云函数获取标签
			getLabel() {
				this.$api.get_label({
					type: "all"
				}).then((res) => {
					const {
						data
					} = res
					// 只取 current: true 的数据
					this.labelList = data.filter(item => item.current)
					// 只取 current: false 的数据
					this.list = data.filter(item => !item.current)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #f5f5f5;
	}

	.label {
		.label-box {
			background-color: #fff;
			margin-bottom: 10px;

			.label-header {
				display: flex;
				justify-content: space-between;
				padding: 10px 15px;
				font-size: 14px;
				color: #666;
				border-bottom: 1px #f5f5f5 solid;

				.label-edit {
					color: #30b33a;
					font-weight: bold;
				}
			}

			.label-content {
				display: flex;
				flex-wrap: wrap;
				padding: 15px;
				padding-top: 0;

				.label-content_item {
					position: relative;
					padding: 2px 5px;
					margin-top: 12px;
					margin-right: 10px;
					border-radius: 5px;
					border: 1px #666 solid;
					font-size: 14px;
					color: #666;

					.icons-close {
						position: absolute;
						right: -8px;
						top: -8px;
						background-color: #fff;
						border-radius: 50%;
					}
				}
			}
		}
	}

	.no-data {
		width: 100%;
		text-align: center;
		padding: 50px 0;
		color: #999;
		font-size: 14px;
	}
</style>
