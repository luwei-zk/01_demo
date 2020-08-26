<template>
	<view class="scroll">
		<scroll-view class="list-scroll" scroll-y>
			<view>
				<view v-for="(item,index) in 100" :key="index">
					{{item}}
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.scroll {
		flex: 1;
		overflow: hidden;
		box-sizing: border-box;

		.list-scroll {
			height: 100%;
			display: flex;
			flex-direction: column;
		}
	}
</style>
