<template>
	<list-scroll class="list-scroll" @loadmore="loadmore">
		<!-- 卡片视图 -->
		<list-card mode="base" v-for="item in list" :key="item._id" :item="item"></list-card>
		<uni-load-more v-if="list.length === 0 || list.length > 7" iconType="snow" :status="load.loading || 'loading'"></uni-load-more>
	</list-scroll>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			},
			load: {
				type: Object,
				default () {
					return {
						loading: "loading"
					}
				}
			}
		},
		data() {
			return {

			}
		},
		methods: {
			// list-scroll 发送过来，发送给 list
			loadmore() {
				this.$emit('loadmore')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list-scroll {
		height: 100%;
	}
</style>
