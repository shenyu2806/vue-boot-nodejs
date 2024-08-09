//路由
const express = require('express')
const router = express.Router()
//导入处理模块
const trueHasndler = require('../router_handle/tury.js')

//圆饼图
router.post('/setuerse',trueHasndler.setuerse)

module.exports = router