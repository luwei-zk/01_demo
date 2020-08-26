import $http from '../http.js'

// export 导出
export const get_label = (data) => {
	// data 为云函数的入参
	return $http({
		url: 'get_label',
		data
	})
}

export const get_list = (data) => {
	// data 为云函数的入参
	return $http({
		url: 'get_list',
		data
	})
}

export const update_like = (data) => {
	// data 为云函数的入参
	return $http({
		url: 'update_like',
		data
	})
}

export const get_search = (data) => {
	// data 为云函数的入参
	return $http({
		url: 'get_search',
		data
	})
}

export const update_label = (data) => {
	// data 为云函数的入参
	return $http({
		url: 'update_label',
		data
	})
}
