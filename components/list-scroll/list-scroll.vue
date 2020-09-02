<template>
	<view class="scroll">
		<scroll-view class="list-scroll" scroll-y enable-flex @scrolltolower="loadMore">
			<view>
				<slot></slot>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods:{
			loadMore() {
				// console.log('触发上拉加载更多')
				// 发送给 list-item
				this.$emit('loadmore')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.scroll {
		flex: 1;
		height: 100%;
		overflow: hidden;
		box-sizing: border-box;
		.list-scroll {
			height: 100%;
			display: flex;
			flex-direction: column;
		}
	}
</style>
