<template>
	<view class="home">
		<navbar :isSearch="true" @input="change"></navbar>
		<view class="home-list">
			<!-- 是显示搜索结果还是搜索历史 -->
			<view v-if="is_history" class="label-box">
				<!-- 第一行 -->
				<view class="label-header">
					<text class="label-title">搜索历史</text>
					<text class="label-clear">清空</text>
				</view>
				<!-- 搜索历史 -->
				<view v-if="historyLists.length > 0" class="label-content">
					<view class="label-content_item" v-for="(item,index) in  historyLists"  :key="index">
					{{item.name}}
					</view>
				</view>
				
				
				<view v-else class="no-data">
					没有历史记录
				</view>
			</view>
			<!-- 显示搜索结果 -->
			<list-scroll v-else class="list-scroll">
				<list-card :item="item" v-for="item in searchList" :key="item._id"></list-card>
			</list-scroll>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				// 显示搜索历史还是搜索结果
				is_history: true,
				searchList: []
			}
		},
		computed: {
			// 实时接收状态的变化
			...mapState(['historyLists'])
		},
		onLoad() {},
		methods: {
			// 从首页搜索框传递过来
			change(value) {
				console.log('请求的数据是:',value)
				
				if (!value) {
					clearTimeout(this.timer)
					this.mark = false
					this.getSearch(value)
					return
				}
				
				// 做标记，实现一秒请求一次
				if (!this.mark) {
					this.mark = true
					this.timer = setTimeout(() => {
						this.mark = false
						this.getSearch(value)
					}, 1000)
				}
			},
			// testBtn() {
			// 	this.$store.dispatch('set_history', {
			// 		name: 'test'
			// 	})
			// }
			getSearch(value) {
				// 搜索内容为空
				if (!value) {
					this.searchList = []
					this.is_history = true
					return
				}
				this.is_history = false
				this.$api.get_search({
					value,
				}).then(res => {
					// 每次获取新的数据到 data 里
					const {
						data
					} = res
					console.log(res)
					this.searchList = data
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
		background-color: #f5f5f5;
	}

	.home {
		display: flex;
		flex-direction: column;
		flex: 1;

		.label-box {
			background-color: #fff;
			margin-bottom: 10px;

			.label-header {
				display: flex;
				justify-content: space-between;
				font-size: 14px;
				color: #666;
				padding: 10px 15px;
				border-bottom: 1px #f5f5f5 solid;

				.label-title {
					color: $mk-base-color;
				}

				.label-clear {
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
					padding: 2px 10px;
					margin-top: 12px;
					margin-right: 10px;
					border-radius: 5px;
					border: 1px #666 solid;
					font-size: 14px;
					color: #666;
				}
			}
		}
	}

	.no-data {
		height: 200px;
		line-height: 200px;
		width: 100%;
		text-align: center;
		font-size: 12px;
		color: #666;
	}
</style>
