'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {
		name,
		page = 1,
		pageSize = 10
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
		// 跳过多少数据
		.skip(pageSize * (page - 1))
		// 每次只取10条数据
		.limit(pageSize)
		.end()

	return {
		code: 200,
		msg: '数据请求成功',
		data: list.data
	}
};
