'use strict';
const db = uniCloud.database()

exports.main = async (event, context) => {

	console.log('event : ' + event)
	const {
		user_id = ''
	} = event

	if (!user_id) {
		return {
			code: 201,
			msg: '获取用户信息失败'
		}
	}

	const userinfo = await db.collection('user').doc(user_id).get()

	return {
		code: 200,
		msg: '获取数据成功',
		data: userinfo.data[0]
	}
};
