<template>
	<list-scroll class="list-scroll">
		<!-- 卡片视图 -->
		<list-card mode="base" v-for="item in list" :key="item._id" :item="item"></list-card>
		
	</list-scroll>
</template>

<script>
	export default {
		props:{
			list: {
				type: Array,
				default() {
					return []
				}
			}
		},
		data() {
			return {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.list-scroll {
		height: 100%;
	}
</style>
