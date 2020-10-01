<template>
	<view class="home">

		<!-- 导航栏 -->
		<navbar></navbar>

		<!-- 栏目导航 -->
		<tab :list='tabList' :tabIndex="tabIndex" @tab="tab"></tab>

		<!-- 中部滚动视图 -->
		<view class="home-list">
			<list :tab='tabList' :activeIndex="activeIndex" @change="change"></list>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				// 获取的选项卡内容
				tabList: [],
				// list 组件选项卡内容顺序，传递给 tab 下-上联动
				tabIndex: 0,
				// tab 组件传递给 list 组件，上-下联动
				activeIndex: 0
			}
		},
		computed:{
			...mapState(['userinfo'])
		},
		watch:{
			userinfo(newVal){
				this.getLabel()
			}
		},
		onLoad() {
			// 监听 标签页 自定义事件
			uni.$on('labelChange', (res) => {
				// 解决 key 重复的问题
				this.tabList = []
				this.tabIndex = 0
				this.activeIndex = 0
				// 重新发送事件
				this.getLabel()
			})
		},
		methods: {
			getLabel() {
				// console.log(this.$api)
				this.$api.get_label().then((res) => {
					const {
						data
					} = res
					// 给获取到的所有数据前面插入一个空对象
					data.unshift({
						name: '全部'
					})
					this.tabList = data
				})
			},
			// 从 tab传递过来的数据
			tab({
				data,
				index
			}) {
				// 暂做保留
				console.log(data, index);
				this.activeIndex = index
			},
			change(current) {
				// current 当前选项卡内容序号
				this.tabIndex = current
				this.activeIndex = current
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		display: flex;
		height: 100%;
	}

	.home {
		display: flex;
		flex-direction: column;
		flex: 1;
		height: 100%;
		box-sizing: border-box;

		.home-list {
			flex: 1;
		}
	}
</style>
