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
				uniCloud.callFunction({
					name:'get_label'
				}).then((res)=>{
					const {result} = res
					this.tabList = result.data
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
