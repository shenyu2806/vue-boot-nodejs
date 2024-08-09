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

//----------用户管理

//添加管理员
router.post('/createAdmin',userinfoHasndler.createAdmin)

//获取管理员列表
router.post('/getAdminList',userinfoHasndler.getAdminList)

//编辑管理员列表
router.post('/editAdmin',userinfoHasndler.editAdmin)

//对管理员取消
router.post('/changeIdentityToUser',userinfoHasndler.changeIdentityToUser)

//对用户赋权
router.post('/changeIdentityToAdmin',userinfoHasndler.changeIdentityToAdmin)

//通过部门获取用户数据
router.post('/searchDepartment',userinfoHasndler.searchDepartment)

//对用户搜索
router.post('/searchUser',userinfoHasndler.searchUser)

//冻结用户
router.post('/banUser',userinfoHasndler.banUser)

//解冻用户
router.post('/hotUser',userinfoHasndler.hotUser)

//获取冻结用户
router.post('/getBanList',userinfoHasndler.getBanList)

//删除用户
router.post('/deleteUser',userinfoHasndler.deleteUser)

//获取对应身份的人数
router.post('/getAdmingListLength',userinfoHasndler.getAdmingListLength)

//监听换页
router.post('/returnListData',userinfoHasndler.returnListData)

//获取全部用户
router.post('/getUsersList',userinfoHasndler.getUsersList)

module.exports = router