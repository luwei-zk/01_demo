<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
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
