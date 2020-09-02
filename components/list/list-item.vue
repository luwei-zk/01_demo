<template>
	<list-scroll class="list-scroll">
		<!-- 卡片视图 -->
		<list-card mode="base"></list-card>
		<list-card mode="image"></list-card>
		<list-card mode="column"></list-card>
		<list-card mode="column"></list-card>
		<list-card mode="column"></list-card>
		<list-card mode="column"></list-card>
		<list-card mode="column"></list-card>
		<list-card mode="base"></list-card>
		<list-card mode="column"></list-card>
	</list-scroll>
</template>

<script>
	export default {
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
