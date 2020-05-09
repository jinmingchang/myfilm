import {getMovie} from '../api';
export default{
    namespaced:true,
    state:{
        comemovie:[]
    },
    mutations:{
        setData(state,val){
            state.comemovie=val;
        }
    },
    actions:{
        getData({commit}){
            getMovie(2).then(res=>{
                if(res.status==200){
                    commit("setData",res.data.data.films)
                }
            })
        }
    }
}