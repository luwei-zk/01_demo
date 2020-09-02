'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {
		name
	} = event // 相当于 var name = event.namee
	// 只请求对应栏目的数据
	const list = await db.collection('article')
		// 开始聚合操作
		.aggregate()
		.match({
			// 只返回 classify 是 name 的数据
			classify: name
		})
		// 过滤掉 content 内容
		.project({
			// true 表示只返回这个字段，flase 表示不返回这个字段
			content: 0
		})
		.end()

	return {
		code: 200,
		msg: '数据请求成功',
		data: list.data
	}
};
