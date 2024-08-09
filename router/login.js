//路由
const express = require('express')
const router = express.Router()
//导入处理模块
const loginHasndler = require('../router_handle/login.js')
//导入expressJoi
const expressJoi = require('@escook/express-joi')

const{
	login_limit
} = require('../limit/login.js')

//注册
router.post('/register',expressJoi(login_limit),loginHasndler.register)
//登录
router.post('/login',expressJoi(login_limit),loginHasndler.login)

module.exports = router