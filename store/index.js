// vuex 状态管理
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 声明一个vuex实例
// 初始vuex调用
const store = new Vuex.Store({
	// 数据源
	state: {
		historyLists: []
	},
	// 修改数据源的值
	mutations: {
		// 添加历史记录
		SET_HISTORY_LISTS(state, history) {
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
		set_history({
			commit,
			state
		}, history) {
			let list = state.historyLists
			// 数组前面插入值
			list.unshift(history)
			commit('SET_HISTORY_LISTS', list)
		},
		clearHistory({commit}) {
			commit('CLEAR_HISTORY_LISTS')
		}
	}
})

export default store
