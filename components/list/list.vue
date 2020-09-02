<template>
	<swiper class="home-swiper" :current="activeIndex" @change="change">
		<swiper-item v-for="(item,index) in tab" :key="index" class="swiper-item">
			<list-item :list='listCacheData[index]'></list-item>
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
				// 云函数获取的数据
				list: [],
				// 云函数获取的数据缓存
				listCacheData: {}
			};
		},
		watch: {
			tab(newVal) {
				if (newVal.length === 0)
					return
				this.getList(this.activeIndex)
			}
		},
		// onload 是在页面中,created 是在组件中
		created() {
			// 默认获取后端开发
			// this.getList(0)
		},
		methods: {
			// 选项卡自带滑动事件触发
			change(e) {
				const {
					current
				} = e.detail
				this.getList(current)
				this.$emit('change', current)
			},
			// 获取选项卡内容
			getList(current) {
				this.$api.get_list({
					name: this.tab[current].name
				}).then(res => {
					const {
						data
					} = res
					// 懒加载数据
					this.$set(this.listCacheData,current,data)
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
