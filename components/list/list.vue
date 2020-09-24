<template>
	<swiper class="home-swiper" :current="activeIndex" @change="change">
		<swiper-item v-for="(item,index) in tab" :key="index" class="swiper-item">
			<list-item :list='listCacheData[index]' :load="load[index]" @loadmore="loadmore"></list-item>
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
				load: {}, //装载page 和 loading
				pageSize: 10
			};
		},
		watch: {
			tab(newVal) {
				if (newVal.length === 0) return
				// 解决 key 重复的问题
				this.listCacheData = {}
				this.load = {}
				// 只有在 newVal 不为空时,才请求数据
				this.getList(this.activeIndex)
			}
		},
		// onload 是在页面中,created 是在组件中
		created() {
			// 接收监听的从home-detail传递过来的自定义事件
			// 同步更新首页文章收藏状态
			uni.$on('update_article', () => {
				// 防止key重复
				this.listCacheData = {}
				this.load = {}
				this.getList(this.activeIndex)
			})
		},
		methods: {
			loadmore() {
				if (this.load[this.activeIndex].loading === 'noMore') return
				this.load[this.activeIndex].page++
				this.getList(this.activeIndex)
			},
			// 选项卡自带滑动事件触发
			change(e) {
				const {
					current
				} = e.detail
				this.$emit('change', current)
				// 修复重复请求的问题
				if (!this.listCacheData[current] || this.listCacheData[current].length === 0) {
					this.getList(current)
				}
			},
			// 获取选项卡内容
			getList(current) {
				// 初始化或者切换tab时，云函数获取第一页，显示loading状态
				if (!this.load[current]) {
					this.load[current] = {
						page: 1,
						loading: 'loading'
					}
				}
				this.$api.get_list({
					name: this.tab[current].name,
					page: this.load[current].page,
					pageSize: this.pageSize
				}).then(res => {
					// 每次获取最新的数据到 data 里
					const {
						data
					} = res
					if (data.length === 0) {
						let oldLoad = {}
						// data 数据为空时，page 是不存在的
						oldLoad.loading = 'noMore'
						oldLoad.page = this.load[current].page
						// 刷新对象
						this.$set(this.load, current, oldLoad)
						// 强制刷新页面
						this.$forceUpdate()
						return
					}
					// 数组push数据,首次获取之前,listCacheData[current] 为空
					let oldList = this.listCacheData[current] || []
					oldList.push(...data)
					// 懒加载数据
					this.$set(this.listCacheData, current, oldList)
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
