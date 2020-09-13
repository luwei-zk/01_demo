'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	const {
		user_id,
		article_id,
	} = event

	const list = await db.collection('article')
		.aggregate()
		.match({
			_id: article_id
		})
		// 拆分数组中的每个文档为多个
		.unwind('$comments')
		.project({
			_id: 0,
			// 只返回 comments
			comments: 1
		})
		// 指定字段作为根节点
		.replaceRoot({
			newRoot: '$comments'
		})
		.end()
	//返回数据给客户端
	return {
		code: 200,
		msg: '数据请求成功',
		data: list.data
	}
};

// data[0] 是一个对象，把对象替换掉，内容为原对象value值（数组)里的每一项

// 未拆分之前返回结果
// {
// 	"code": 200,
// 	"data": [{
// 		"comments": [{
// 			"author": {
// 				"author_id": "5f45afe33c788800019dfb0b",
// 				"author_name": "Java架构师讲师团",
// 				"avatar": "//img2.sycdn.imooc.com/5dafce1a00013fd501400140-160-160.jpg",
// 				"professional": "架构师"
// 			},
// 			"comment_content": "评论2",
// 			"comment_id": "4y4z5caxzwk0",
// 			"create_time": 1599608617064,
// 			"replys": []
// 		}, {
// 			"author": {
// 				"author_id": "5f45afe33c788800019dfb0b",
// 				"author_name": "Java架构师讲师团",
// 				"avatar": "//img2.sycdn.imooc.com/5dafce1a00013fd501400140-160-160.jpg",
// 				"professional": "架构师"
// 			},
// 			"comment_content": "评论1",
// 			"comment_id": "1uv9hscv45kw",
// 			"create_time": 1599608595513,
// 			"replys": []
// 		}, {
// 			"author": {
// 				"author_id": "5f45afe33c788800019dfb0b",
// 				"author_name": "Java架构师讲师团",
// 				"avatar": "//img2.sycdn.imooc.com/5dafce1a00013fd501400140-160-160.jpg",
// 				"professional": "架构师"
// 			},
// 			"comment_content": "评论成功",
// 			"comment_id": "5156s0kekqk0",
// 			"create_time": 1599524585856,
// 			"replys": []
// 		}]
// 	}],
// 	"msg": "数据请求成功"
// }

// 拆分之后
// {
// 	"code": 200,
// 	"msg": "数据请求成功",
// 	"data": [{
// 		"comment_id": "4y4z5caxzwk0",
// 		"comment_content": "评论2",
// 		"create_time": 1599608617064,
// 		"author": {
// 			"author_id": "5f45afe33c788800019dfb0b",
// 			"author_name": "Java架构师讲师团",
// 			"avatar": "//img2.sycdn.imooc.com/5dafce1a00013fd501400140-160-160.jpg",
// 			"professional": "架构师"
// 		},
// 		"replys": []
// 	}, {
// 		"comment_id": "1uv9hscv45kw",
// 		"comment_content": "评论1",
// 		"create_time": 1599608595513,
// 		"author": {
// 			"author_id": "5f45afe33c788800019dfb0b",
// 			"author_name": "Java架构师讲师团",
// 			"avatar": "//img2.sycdn.imooc.com/5dafce1a00013fd501400140-160-160.jpg",
// 			"professional": "架构师"
// 		},
// 		"replys": []
// 	}, {
// 		"comment_id": "5156s0kekqk0",
// 		"comment_content": "评论成功",
// 		"create_time": 1599524585856,
// 		"author": {
// 			"author_id": "5f45afe33c788800019dfb0b",
// 			"author_name": "Java架构师讲师团",
// 			"avatar": "//img2.sycdn.imooc.com/5dafce1a00013fd501400140-160-160.jpg",
// 			"professional": "架构师"
// 		},
// 		"replys": []
// 	}]
// }