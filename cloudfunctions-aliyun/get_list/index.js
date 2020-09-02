'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {
		name
	} = event // 相当于 var name = event.name
	let matchObj = {}
	if (name !== '全部') {
		// 如果传递过来的不是全部，则过滤
		matchObj = {
			classify: name
		}
	}
	const list = await db.collection('article')
		.aggregate()
		.match(matchObj)
		.project({
			content: 0
		})
		.end()

	return {
		code: 200,
		msg: '数据请求成功',
		data: list.data
	}
};
