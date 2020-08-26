<template>
	<view>
		<!-- 导航栏 -->
		<navbar></navbar>
		<!-- 选项卡 -->
		<tab :list='tabList' @tab="tab"></tab>
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
			// 从tab.vue 传递过来的选项卡点击事件数据
			tab({
				data,
				index
			}) {
				// 暂做保留
				console.log(data, index);
			},
		}
	}
</script>

<style lang="scss" scoped>
</style>
