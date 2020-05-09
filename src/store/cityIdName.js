export default{
    namespaced:true,
    state:{
        cityId:localStorage.getItem("cityId")||"110100",
        cityName:localStorage.getItem("cityName")||"北京"
    },
    mutations:{
        setId(state,id){
            state.cityId=id;
        },
        setName(state,name){
            state.cityName=name;
        }
    },
    actions:{
    }
}