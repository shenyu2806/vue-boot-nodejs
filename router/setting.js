//系统设置路由
const express = require('express')
const router = express.Router()
//导入处理模块
const setHasndler = require('../router_handle/setting.js')

//是否允许注册
router.post('/getReatCode',setHasndler.getReatCode)

//修改是否允许注册 0为允许
router.post('/changeReatCode',setHasndler.changeReatCode)

//上传轮播图
router.post('/uploadSwiper',setHasndler.uploadSwiper)

//获取轮播图
router.post('/getAllSwiper',setHasndler.getAllSwiper)

//获取公司名称
router.post('/getCompanyName',setHasndler.getCompanyName)

//修改公司名称
router.post('/changeCompanyName',setHasndler.changeCompanyName)

//编辑公司介绍
router.post('/changeCompanyintroduce',setHasndler.changeCompanyintroduce)

//获取公司介绍
router.post('/getCompanyintroduce',setHasndler.getCompanyintroduce)

//获取所有公司信息
router.post('/getAllCompanyintroduce',setHasndler.getAllCompanyintroduce)

//部门设置
router.post('/setDepartment',setHasndler.setDepartment)

//获取部门
router.post('/getDepartment',setHasndler.getDepartment)

module.exports = router