import Vue from 'vue'
//  定义全局过滤器 
Vue.filter("formatDate",(v)=>{
    return new Date(v*1000).toLocaleDateString().split(" ")[0]+"上映";
})