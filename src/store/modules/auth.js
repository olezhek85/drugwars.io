import Vue from 'vue';
import sc from '@/helpers/steemconnect';
import client from '@/helpers/client';

const state = {
  username: null,
  account: null,
};

const mutations = {
  saveUsername(_state, payload) {
    Vue.set(_state, 'username', payload);
  },
  saveAccount(_state, payload) {
    Vue.set(_state, 'account', payload);
  },
  logout(_state) {
    Vue.set(_state, 'username', null);
  },
};

const actions = {
  login: async ({ commit }, accessToken = localStorage.getItem('drugwars_token')) =>
    new Promise(resolve => {
      if (accessToken) {
        sc.setAccessToken(accessToken);
        client
          .requestAsync('login', accessToken)
          .then(result => {
            localStorage.setItem('drugwars_token', accessToken);
            commit('saveUsername', result.name);
            commit('saveAccount', result.account);
            resolve();
          })
          .catch(() => {
            resolve();
          });
      } else {
        resolve();
      }
    }),
  logout: () => {
    localStorage.removeItem('drugwars_token');
    window.location = '/';
  },
};

export default {
  state,
  mutations,
  actions,
};
