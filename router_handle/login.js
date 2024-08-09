//导入
const db = require('../db/index.js')
const bcrypt = require('bcryptjs')
const Token = require('../jwt_config/index')

exports.register = (req, res) => {
	const reginfo = req.body
	if (!reginfo.account || !reginfo.password) {
		return res.send({
			status: 1,
			massage: '账号或密码不能为空'
		})
	}
	const sql = 'select * from users where account = ?'
	db.query(sql, reginfo.account, (err, results) => {
		if (results.length > 0) {
			return res.send({
				status: 1,
				massage: '账号已存在'
			})
		}
		reginfo.password = bcrypt.hashSync(reginfo.password, 10)
		const sql1 = 'insert into users set ?'
		const identity = "用户"
		const create_time = new Date()
		db.query(sql1, {
			account: reginfo.account,
			password: reginfo.password,
			identity,
			create_time,
			status: 0, //0为未冻结
		}, (err, results) => {
			if (results.affectedRows !== 1) {
				return res.send({
					status: 1,
					massage: '注册账号失败'
				})
			}
			return res.send({
				statusl: 1,
				massage: '注册账号成功'
			})
		})
	})
}
exports.login = (req, res) => {
	const loginfo = req.body
	const sql = 'select * from users where account = ?'
	db.query(sql, loginfo.account, (err, results) => {
		if (err) return res.cc(err)
		if (results.length !== 1) {
			return res.cc('登录失败')
		}
		const compareResult = bcrypt.compareSync(loginfo.password, results[0].password)
		if (!compareResult) {
			return res.cc('登录失败')
		}
		if (!results[0].status == 1) {
			return res.cc('账号被冻结')
		}
		const user = {
			...results[0],
			password: '',
			identity: '',
			create_time: '',
			update_time: '',
		}
		const tokenKey = Token.en(user)
		res.send({
			results: results[0],
			status: 0,
			message: '登录成功',
			token:tokenKey,
			})
	})
}
//动态路由
const superAdminRouter = [
	{
		name: 'home',
		path: '/home',
		component: 'home/index',
	},
	{
		name: 'set',
		path: '/set',
		component: 'set/index'
	},
	{
		name: 'overview',
		path: '/overview',
		component: 'overview/index'
	},
	{
		name: 'user_product_manage',
		path: '/user/user_product_manage',
		component: 'user_manage/product_manage/index'
	},
	{
		name: 'message_manage',
		path: '/user/message_manage',
		component:'user_manage/message_manage/index'
	},
	{
		name: 'users_list',
		path: '/user/users_list',
		component:'user_manage/users_list/index'
	},
	{
		name: 'users_manage',
		path: '/user/users_manage',
		component:'user_manage/users_manage/index'
	},
	{
		name: 'product_manage',
		path: '/product/product_manage',
		component:'produc/produc_manage/index'
	},
	{
		name: 'out_produc_manage',
		path: '/product/out_produc_manage',
		component:'produc/out_produc_manage/index'
	},
	{
		name: 'longs_long',
		path: '/longs/longs_long',
		component:'longs/login/index'
	},
	{
		name: '403',
		path: '/403',
		component:'err/403'
	},
]

exports.returnMenuList = (req, res) => {
	const sql = 'select identity from users where id = ?'
	db.query(sql, req.body.id, (err, result) => {
		if (err) return res.cc(err)
		let menu = []
		if (result[0].identity == "超级管理员") {
			menu = superAdminRouter
		}
		if (result[0].identity == "管理员") {
			menu = superAdminRouter
		}
		res.send(menu)
	})
}