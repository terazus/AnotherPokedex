export const actions = {
    async nuxtServerInit({ dispatch }) {
        await dispatch('filters/getData')
    }
}

export default {
    namespaced: true,
    actions
}
