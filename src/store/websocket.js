export const state = {
    wsRes: {},
    uid: 0,
    status: 0,
    uuid: ''
};
export const actions = {};

export const mutations = {
    setUid(state, newUid) {
        state.uid = newUid
    },
    setWsRes(state, payload) {
        state.wsRes = payload
        state.status = payload.Status
        state.uuid = payload.Uuid
        console.log('state', state)
        if (payload.Uid !== 0) {
            console.log('uid', payload.Uid)
            state.uid = payload.Uid
        }
    },
};
export const getters = {
    getUid: state => state.uid,
    getUuid: state => state.uuid,
    getWsRes: (state) => state.wsRes
};

export default {
    state,
    actions,
    mutations,
    getters,
    namespaced: true,
};