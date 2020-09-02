<template>
	<swiper class="home-swiper" :current="activeIndex" @change="change">
		<swiper-item v-for="(item,index) in tab" :key="index" class="swiper-item">
			<list-item :list='listCacheData[index]' @loadmore="loadmore"></list-item>
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
				listCacheData: {},
				// 上拉加载更多
				page: 1,
				pageSize: 5
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
				this.$emit('change', current)
				// 修复重复请求的问题
				if (!this.listCacheData[current] || this.listCacheData[current] === 0) {
					this.getList(current)
				}
			},
			// 获取选项卡内容
			getList(current) {
				this.$api.get_list({
					name: this.tab[current].name,
					page: this.page,
					pageSize: this.pageSize
				}).then(res => {
					const {
						data
					} = res
					// 数组push数据,首次获取之前,listCacheData[current] 为空
					let oldList = this.listCacheData[current] || []
					oldList.push(...data)
					// 懒加载数据
					this.$set(this.listCacheData, current, oldList)
				})
			},
			loadmore() {
				// console.log('触发上拉')
				this.page++
				this.getList(this.activeIndex)
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
