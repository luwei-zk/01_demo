<template>
	<view class="icons" @click.stop="likeTap">
		<uni-icons size="20" color="#f07373" :type="like?'heart-filled':'heart'"></uni-icons>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		data() {
			return {
				like: false
			};
		},
		methods: {
			likeTap() {
				this.setUpdateLikes()
				console.log('收藏成功')
			},
			setUpdateLikes() {
				this.$api.update_like({
					user_id: '5f45afe33c788800019dfb0b',
					article_id: this.item._id
				}).then(res => {
					console.log(res)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.icons {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 20px;
		height: 20px;
		position: absolute;
		right: 0;
		top: 0;
	}
</style>
