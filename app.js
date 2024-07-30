const express = require('express');
const app = express()

var bodyparser = require('body-parser')

// 导入 cors 中间件——支持跨域访问
const cors = require('cors')
const bodyParser = require('body-parser')


app.use(cors())

const multer = require("multer")
const upload = multer({dest:'./public/upload'})
//静态托管
app.use(upload.any())
app.use(express.static("./public"))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
 //一定要在路由之前，封装res.cc函数
app.use(function (req, res, next) {
    // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
    res.cc = function (err, status = 1) {//status默认失败——传参
      res.send({
        // 状态
        status,
        // 状态描述，判断 err 是 错误对象 还是 描述错误字符串
        message: err instanceof Error ? err.message : err,//instanceof是否是Error实例
      })
    }
    next()//流转关系传下去
  })

const jwtconfig =require('./jwt_config/index.js')
const {expressjwt:jwt} = require('express-jwt')
const Joi = require('joi');
/* app.use(jwt({
	secret:jwtconfig.jwtSecretKey,algorithms:['ES256']
}).unless({
	path:[/^\/api\//]
})) */

//路由
const loginRouter =require('./router/login')
app.use('/api',loginRouter)
const userinfoRouter =require('./router/userinfo')
app.use('/user',userinfoRouter)
const setRouter =require('./router/setting')
app.use('/set',setRouter)

//不符合joi规则的情况
app.use((err,req,res,next)=>{
	if(err instanceof Joi.ValidationError) return res.cc(err)
})

app.listen(9090, () => {
	console.log('http://127.0.0.1:9090')
})

//打印错误，防止异常
process.on('uncaughtException', function (err) { 
    //打印出错误 
    console.log(err); 
    //打印出错误的调用栈方便调试 
    console.log(err.stack);
});