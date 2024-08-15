export const state = {
    wsRes: {},
    uid: 0,
    status: 0,
    uuid: '',
    gameStatus: 1
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
        state.gameStatus = payload.GameStatus
        if (payload.Uid !== 0) {
            state.uid = payload.Uid
        }
    },
    reset(state) {
        state.wsRes = {}
        state.status = 0
        state.uuid = ''
        state.gameStatus = 1
        state.uid = 9
        console.log('reset', state)
    }
};
export const getters = {
    getUid: (state) => state.uid,
    getUuid: (state) => state.uuid,
    getStatus: (state) => state.status,
    getWsRes: (state) => state.wsRes,
    getGameStatus: (state) => state.gameStatus
};

export default {
    state,
    actions,
    mutations,
    getters,
    namespaced: true,
};