module.exports={
    devServer:{
        'proxy':{
            "/mz":{
                'target':"http://m.maizuo.com",
                    'changeOrigin':true,
                    'pathRewrite':{
                        "^/mz":"/"
                    }
            },
            "/lg":{
                'target':"https://m.lagou.com",
                    'changeOrigin':true,
                    'pathRewrite':{
                        "^/lg":"/"
                    }
            }  
        }
    }
}