'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate // 获取聚合操作符
exports.main = async (event, context) => {
	const {
		user_id,
		type // 判断是获取全部还是获取当前用户的标签,默认不存在,即获取 all 数据
	} = event
	let matchObj = {}
	if (type !== 'all') {
		matchObj = {
			current: true
		}
	}
	// 用户表中获取对应用户数据
	let userinfo = await db.collection('user').doc(user_id).get()
	userinfo = userinfo.data[0]
	// 获取 label 表数据 判断 label_id 是否在 用户表中
	// 如果在 给返回的label数据对应栏目插入 current: true
	let label = await db.collection('label')
		.aggregate()
		.addFields({
			// 用户表中是否有 label_ids 字段,没有则返回空数组
			// 给 article插入 "current": false
			current: $.in(['$_id', $.ifNull([userinfo.label_ids, []])])
		})
		// 判断返回的 label 数据包含了 current:true 的数据
		// 即用户收藏了此标签,则给 label 表添加 current:true
		// 此时可以给user表中对应user_id用户添加一个 字段
		// "label_ids": ["5f45afe2a406e90001700306"]
		// 即表示此用户收藏了此标签,就只返回收藏的标签
		// 否则返回所有标签 并插入 current: false 字段,表示推荐标签
		.match(matchObj)
		.end()

	// 返回数据给客户端
	return {
		code: 200,
		msg: '数据请求成功',
		data: label.data
	}
};

// "data": [{
// 		"_id": "5f45afe2a406e90001700306",
// 		"name": "后端开发",
// 		"user": [],
// 		"current": false
// 	}, {
// 		"_id": "5f45afe2a406e90001700307",
// 		"name": "职场生活",
// 		"user": [],
// 		"current": false
// 	}, {
// 		"_id": "5f45afe2a406e90001700308",
// 		"name": "前端开发",
// 		"user": [],
// 		"current": false
// 	}, {
// 		"_id": "5f45afe2a406e90001700309",
// 		"name": "人工智能",
// 		"user": [],
// 		"current": false
// 	}, {
// 		"_id": "5f45afe2a406e9000170030a",
// 		"name": "移动开发",
// 		"user": [],
// 		"current": false
// 	}, {
// 		"_id": "5f45afe2a406e9000170030b",
// 		"name": "其它",
// 		"user": [],
// 		"current": false
// 	}]
