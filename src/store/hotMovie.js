import {getMovie} from '../api'
export default{
  namespaced:true,
  state: {
    list:[],   //正在热映
    id:0
  },
  mutations: {
    setList(state,data){
      state.list = data;
    },
    setId(state,id){
      state.id=id;
    }
  },
  actions:{
    getList({commit}){
      getMovie(1).then(res=>{
        if(res.status==200){
          commit("setList",res.data.data.films)
        }
      })
    }
  },
}
