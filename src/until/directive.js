import Vue from 'vue'
Vue.directive("scrolling",(el)=>{
    window.addEventListener("scroll",()=>{
        if(document.documentElement.scrollTop>=el.offsetHeight){
            // el.style.position=binding;
            el.style.display="block";
        }else{
            el.style.display="none";
        }
    })
})