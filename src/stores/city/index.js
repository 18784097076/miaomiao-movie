// 专门维护city组件的store

export default {
    namespaced: true,
    state: {
        nowCity:  localStorage.getItem('nowCity') || '北京',
        nowId: localStorage.getItem('nowId') || 1
    },
    mutations: {
        CITY_INFO(state, payload) {
            state.nowCity = payload.nowCity
            state.nowId = payload.nowId
        }
    },
    actions: {

    }
}