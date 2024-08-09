//路由
const express = require('express')
const router = express.Router()
//导入处理模块
const logHasndler = require('../router_handle/longs.js')

//计入登录日志
router.post('/longReckon',logHasndler.longReckon)

//获取登录日志
router.post('/getlongInfo',logHasndler.getlongInfo)

//清空登录日志
router.post('/longDelete',logHasndler.longDelete)

module.exports = router