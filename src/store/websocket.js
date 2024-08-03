export const state = {
    wsRes: {},
    uid: 0,
    status: 0,
};
export const actions = {};

export const mutations = {
    setUid(state, newUid) {
        state.uid = newUid
    },
    setWsRes(state, payload) {
        console.log('payload', payload)
        state.wsRes = payload
        state.status = payload.Status
        if (payload.Uid !== 0) {
            console.log('uid', payload.Uid)
            state.uid = payload.Uid
        }
    },
};
export const getters = {
    getUid: state => state.uid,
    getWsRes: (state) => state.wsRes
};

export default {
    state,
    actions,
    mutations,
    getters,
    namespaced: true,
};