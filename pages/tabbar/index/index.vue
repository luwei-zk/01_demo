<template>
	<view>
		<!-- 导航栏 -->
		<navbar></navbar>
		<!-- 选项卡 -->
		<tab :list='tabList'></tab>
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
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
