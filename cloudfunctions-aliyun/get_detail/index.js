'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	
	const {
		user_id,
		article_id
	} = event

	let user = await db.collection('user').doc(user_id).get()
	user = user.data[0]
	// 当前用户获取文章的同时，动态加载他是否收藏、关注、点赞
	let list = await db.collection('article')
		.aggregate() // 添加三个字段
		.addFields({
			// 是否关注作者
			is_author_like: $.in(['$author.id', user.author_likes_ids]),
			// 是否收藏文章
			is_like: $.in(['$_id', user.article_likes_ids]),
			// 是否点赞
			is_thumbs_up: $.in(['$_id', user.thumbs_up_article_ids])
		})
		// 只返回客户端传入的文章
		.match({
			_id: article_id
		})
		.project({
			// 不返回文章的评论，从其他地方单独获取
			comments: 0
		})
		.end()

	//返回数据给客户端
	return {
		code: 200,
		msg: '数据请求成功',
		data: list.data[0]
	}
};

// 所返回文章所插入的字段
// "id": "302042",
// "is_author_like": false,
// "is_like": true,
// "is_thumbs_up": false,
