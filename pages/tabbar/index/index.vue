<template>
	<view class="home">
		<!-- 导航栏 -->
		<navbar></navbar>
		
		<!-- 栏目导航 -->
		<tab :list='tabList' @tab="tab"></tab>
		
		<list-scroll>
			<!-- 卡片视图 -->
			<list-card mode="base"></list-card>
			<list-card mode="image"></list-card>
			<list-card mode="column"></list-card>
		</list-scroll>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabList: []
			}
		},
		onLoad() {
			this.getLabel()
		},
		methods: {
			getLabel() {
				// console.log(this.$api)
				this.$api.get_label({
					name: 'get_label'
				}).then((res) => {
					const {
						data
					} = res
					this.tabList = data
				})
			},
			// 从 tab传递过来的数据
			tab({ data,index }) {
				// 暂做保留
				console.log(data, index);
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
		border: 1px solid red;
		height: 100%;
	}
</style>
