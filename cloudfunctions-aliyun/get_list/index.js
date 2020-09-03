'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	const {
		user_id,//新传入，获取当前用户
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
	// 获取用户表
	const userinfo = await db.collection('user').doc(user_id).get()
	// 获取用户表字段
	const article_likes_ids = userinfo.data[0].article_likes_ids
	// 获取文章列表
	const list = await db.collection('article')
		.aggregate()
		.addFields({
			// 添加一个新字段
			is_like: $.in(['$_id',article_likes_ids])
		})
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
