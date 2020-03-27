import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        modes: {
            easy: {
                field: 5,
                delay: 2000
            },
            normal: {
                field: 10,
                delay: 1000
            },
            hard: {
                field: 15,
                delay: 800
            },
        },
        mode: {},
        log: [],
        isPlay: false,
        name: null
    },
    mutations: {
        setMode(state, payload) {
            state.mode = payload;
        },
        setPlay(state, payload) {
            state.isPlay = payload;
        },
        setName(state, payload) {
            state.name = payload;
        },
        addWinnerToLog(state, payload) {
            state.log.push(payload);
        }
    }
});

