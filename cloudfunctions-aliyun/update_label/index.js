'use strict';
const db = uniCloud.database()

exports.main = async (event, context) => {
	const {
		user_id,
		label = [] //暂时为空,将来从页面发过来
	} = event
	// 更新 user 表
	await db.collection('user').doc(user_id).update({
		// 对一个字段内容全部替换 不存在则添加
		label_ids: label
	})

	//返回数据给客户端
	return {
		code: 200,
		msg: '数据更新成功'
	};
}
