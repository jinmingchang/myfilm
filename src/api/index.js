import axios from './request'       //axios的二次封装
export const getMovie = (type)=>{
    return axios.get("/gateway",{
        params:{
            cityId:310100,
            pageNum:1,
            pageSize:10,
            type:type,
            k:Date.now()
        },
        headers:{
            'X-Host': 'mall.film-ticket.film.list'
        }
    })
}

export const getDetail=(id)=>{
    return axios.get("/gateway",{
        params:{
            filmId:id,
            k:Date.now()
        },
        headers:{
           'X-Host': 'mall.film-ticket.film.info'
        }
    })
}

export const getInfo=()=>{
    return axios.get("/gateway?actId=ElzMZU125260",{
        headers:{
            'X-Host': 'mall.act.static-page.info'
        }
    })
}

export const getCities=()=>{
    return axios.get("/gateway",{
        params:{        
            k:Date.now()
        },
        headers:{
        'X-Host': 'mall.film-ticket.city.list'
        }
    })
}

export const getCinema=(id)=>{
    return axios.get("/gateway",{
        params:{
            cityId:id,
            ticketFlag:1,
            k:Date.now()
        },
        headers:{
            'X-Host': 'mall.film-ticket.cinema.list'
        }
    })
}