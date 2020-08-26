export default function $http(options) {
	const {
		// url 为云函数名字
		// data 为客户端传入云函数的参数
		url,
		data
	} = options

	// 新声明一个对象，添加原data数据，增加一条新数据 user_id
	const dataObj = {
		user_id: '5f45afe2a406e90001700306',
		...data
	}

	// 从list.js剪切过来的内容
	return new Promise((resolve, reject) => {
		// 调用云函数
		uniCloud.callFunction({
			name: url,
			data: dataObj
		}).then((res) => {
			if (res.result.code === 200) {
				resolve(res.result)
			} else {
				// catch
				reject(res.result)
			}
		}).catch((err) => {
			reject(err)
		})
	})
}
