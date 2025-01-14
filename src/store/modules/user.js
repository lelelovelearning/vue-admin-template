import { login, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { anyRoutes, resetRouter, asyncRoutes,constantRoutes } from "@/router";
import router from "@/router";
//返回一个对象，实质上就是store，作用是获取token
const getDefaultState = () => {
  return {
    token: getToken(),
    name: "",
    avatar: "",
    //服务器返回的菜单信息【根据不同的角色返回的标记信息，数组里面的元素是字符串】
    routes: [],
    buttons: [],
    roles: [],
    //对比之后【项目中已有的异步路由，与服务器返回的标记信息进行对比最终需要展示的路由】
    resultAsyncRoutes: [],
    resultAllRoutes:[]
  };
};

const state = getDefaultState();

const mutations = {
  //重置state
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  //存储token
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_USERINFO: (state, userInfo) => {
    state.name = userInfo.name;
    state.avatar = userInfo.avatar;
    //菜单权限标记
    state.routes = userInfo.routes;
    //按钮权限按钮的标记
    state.buttons = userInfo.buttons;
    //角色的信息
    state.roles = userInfo.roles;
  },
  SET_RESULTASYNCROUTES: (state, asyncRoutes) => {
    //只是接收了过滤处理后的异步路由
    state.resultAsyncRoutes = asyncRoutes;
    //用户的完整路由，包含：常量路由，异步路由，任意路由。要合并
   state.resultAllRoutes=constantRoutes.concat(state.resultAsyncRoutes,anyRoutes)
   //给路由器添加新的路由
   router.options.routes=state.resultAllRoutes
    router.addRoutes(router.options.routes)
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then((response) => {
          const { data } = response;
          commit("SET_TOKEN", data.token);
          setToken(data.token);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then((response) => {
          const { data } = response;

          if (!data) {
            return reject("Verification failed, please Login again.");
          }
          commit("SET_USERINFO", data);
          commit(
            "SET_RESULTASYNCROUTES",
            computedAsyncRoutes(asyncRoutes, data.routes)
          );
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          removeToken(); // must remove  token  first
          resetRouter();
          commit("RESET_STATE");
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  },
};

const computedAsyncRoutes = (asyncRoutes, routes) => {
  //过滤出当前用户【超级管理员|普通员工】需要展示的异步路由
  return asyncRoutes.filter((item) => {
    //数组当中没有这个元素返回索引值-1，如果有这个元素返回的索引值一定不是-1
    if (routes.indexOf(item.name) !== -1) {
      //递归
      if (item.children && item.children.length) {
        item.children = computedAsyncRoutes(item.children, routes);
      }
      return true;
    }
  });
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
