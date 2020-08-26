// 批量自动导出文件
// 实现import {xxx,xxx} from './xxx.js' 以及 export default get_xxx 的功能
// require.context 方法

const requireApi = require.context(
	// api 目录的相对路径
	'.',
	// 是否查询子目录
	false,
	// 查询文件的一个后缀
	/.js$/
)

let module = {}
// console.log(requireApi.keys());
// ["./index.js", "./list.js"]
requireApi.keys().forEach((Key, index) => {
	if (Key === './index.js') return
	console.log(Key)
	// ./list.js
	// 对象合并
	Object.assign(module, requireApi(Key))
})
// console.log(module)
// {get_label: ƒ}

// 导出模块
export default module
