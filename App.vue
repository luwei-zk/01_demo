<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')

			this.$api.get_user({
				user_id: '5f45afe33c788800019dfb0b'
			}).then((res) => {
				// console.log(res);
				const {
					data
				} = res
				this.$store.dispatch('set_userinfo', data)
			})

		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面的公共css*/
	@import url("/components/gaoyia-parse/parse.css");

	page {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
	}
</style>
