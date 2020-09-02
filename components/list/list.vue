<template>
	<swiper class="home-swiper" :current="activeIndex" @change="change">
		<swiper-item v-for="(item,index) in tab" :key="index" class="swiper-item">
			<list-item :list='list'></list-item>
		</swiper-item>
	</swiper>
</template>

<script>
	import listItem from './list-item.vue'
	export default {
		components: {
			listItem
		},
		props: {
			tab: {
				type: Array,
				default () {
					return []
				}
			},
			activeIndex: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				list: []
			};
		},
		// onload 是在页面中,created 是在组件中
		created() {
			this.getList()
		},
		methods: {
			// 选项卡自带滑动事件触发
			change(e) {
				const {
					current
				} = e.detail
				this.$emit('change', current)
			},
			// 获取选项卡内容
			getList() {
				this.$api.get_list().then(res=>{
					const {data} = res
					this.list = data
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home-swiper {
		height: 100%;

		.swiper-item {
			height: 100%;
			overflow: hidden;
		}
	}
</style>
