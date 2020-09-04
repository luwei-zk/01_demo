// vuex 状态管理
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 声明一个vuex实例
// 初始vuex调用
const store = new Vuex.Store({
	// 数据源
	state: {
		// historyLists: []
		// 从本地缓存中去读，不存在返回空数组
		historyLists: uni.getStorageSync("__history") || []
	},
	// 修改数据源的值
	mutations: {
		// 添加历史记录
		SET_HISTORY_LISTS(state, history) {
			// 把所有的历史记录都添加上来了，不是一条
			// history [ {name:'前端'},{name:'前端'} ]
			state.historyLists = history
		},
		// 清空历史记录
		CLEAR_HISTORY_LISTS(state) {
			state.historyLists = []
		}
	},
	actions: {
		// 添加历史记录 history 从客户端传进来的
		// 页面调用 此方法，该方法的commit调用SET_HISTORY_LISTS修改historyLists
		set_history({commit,state}, history) {
			// history: {name: '前端'} 只是一条
			// list: [ {name:'前端'},{name:'前端'} ]
			let list = state.historyLists
			// 自己添加 去重
			for (var i = 0; i < list.length; i++) {
				if (list[i].name === history.name) {
					return
				}
			}
			// 数组前面插入值
			list.unshift(history)
			// 将最新的 list 设置为缓存
			uni.setStorageSync('__history', list)
			commit('SET_HISTORY_LISTS', list)
		},
		clearHistory({commit}) {
			// 将本地缓存置空
			// uni.setStorageSync('__history', []) 这个也行
			uni.removeStorageSync('__history')
			commit('CLEAR_HISTORY_LISTS')
		}
	}
})

export default store
