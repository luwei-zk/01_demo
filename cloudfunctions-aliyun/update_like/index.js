'use strict';
const db = uniCloud.database()
// 数据库操作符，对数组、字符串、数字进行操作
const dbCmd = db.command

exports.main = async (event, context) => {
	const {
		user_id,// 哪个用户 
		article_id // 收藏了什么文章
	} = event
    
	// 获取用户表
	const userinfo = await db.collection('user').doc(user_id).get()
	// 获取用户表中 article_likes_ids 列表
	const article_id_ids = userinfo.data[0].article_likes_ids
	let dbCmdFuns = null
	if (article_id_ids.includes(article_id)) {
		// 存在则删除
		dbCmdFuns = dbCmd.pull(article_id)
	} else {
		// 不存在则添加
		dbCmdFuns = dbCmd.addToSet(article_id)
	}

    // 同步更新 article_likes_ids 字段
	await db.collection('user').doc(user_id).update({
		article_likes_ids: dbCmdFuns
	})
	//event为客户端上传的参数
	console.log('event : ' + event)

	return {
		code: 200,
		msg: '数据请求成功',
		data: userinfo.data[0]
	}
};
