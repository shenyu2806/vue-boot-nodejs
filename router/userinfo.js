//路由
const express = require('express')
const router = express.Router()

//导入expressJoi
const expressJoi = require('@escook/express-joi')

//导入处理模块
const userinfoHasndler = require('../router_handle/userinfo')

const {
	name_limit,email_limit,password_limit,forgetPassword_limit
} = require('../limit/user.js')

//上传头像
router.post('/uploadAvatar',userinfoHasndler.uploadAvatar)

//绑定账号
router.post('/bindAccount',userinfoHasndler.bindAccount)

//修改用户密码
router.post('/changePassword',expressJoi(password_limit),userinfoHasndler.changePassword)

//获取用户数据
router.post('/getuserInfo',userinfoHasndler.getuserInfo)

//修改姓名
router.post('/changeName',expressJoi(name_limit),userinfoHasndler.changeName)

//修改性别
router.post('/changeSex',userinfoHasndler.changeSex)

//修改邮箱
router.post('/changeEmail',expressJoi(email_limit),userinfoHasndler.changeEmail)

//验证账号与邮箱
router.post('/verifyAccountAndEmail',userinfoHasndler.verifyAccountAndEmail)

//登录页面修改密码
router.post('/changePasswordInLogin',expressJoi(forgetPassword_limit),userinfoHasndler.changePasswordInLogin)

module.exports = router