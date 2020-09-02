'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	// 获取数据表
	const list = await db.collection('article')
	// 过滤掉 content 内容
	.field({
		// true 表示只返回这个字段，flase 表示不返回这个字段
		content: false
	})
	.get()
	
	return {
		code: 200,
		msg: '数据请求成功',
		data: list.data
	}
};
