//导入
const db =require('../db/index.js')
const bcrypt =require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtconfig = require('../jwt_config/index.js')

exports.csmk = (req,res) => {
	const reginfo = req.body
// 测试 mysql 模块是否能正常工作（这段代码没有实质性功能只用于测试此模块）
db.query('select 1', (err, results) => {
    // mysql 模块工作期间报错了
    if(err) return console.log(err.message);
    // 能够正常执行 SQL 语句
	return res.send({
		status:1,
		massage:results
	})
    // console.log(results);
})
// 注：终端执行后打印的结果是“[ RowDataPacket { '1': 1 } ]”则表示数据库连接正常
}
exports.register = (req,res) => {
	const reginfo = req.body
	if(!reginfo.account||!reginfo.password){
		return res.send({
			status:1,
			massage:'账号或密码不能为空'
		})
	}
	const sql='select * from users where account = ?'
	db.query(sql,reginfo.account,(err,results) => {
		if(results.length>0){
			return res.send({
				status:1,
				massage:'账号已存在'
			})
		}
		reginfo.password = bcrypt.hashSync(reginfo.password,10)
		const sql1='insert into users set ?'
		const identity ="用户"
		const create_time = new Date()
		db.query(sql1,{
			account:reginfo.account,
			password:reginfo.password,
			identity,
			create_time,
			status:0,//0为未冻结
		},(err,results)=>{
			if(results.affectedRows !==1){
				return res.send({
					status:1,
					massage:'注册账号失败'
				})
			}
			return res.send({
				statusl:1,
				massage:'注册账号成功'
			})
		})
	})
}
exports.login = (req,res)=>{
	const loginfo = req.body
	const sql='select * from users where account = ?'
	db.query(sql,loginfo.account,(err,results) => {
		if(err) return res.cc(err)
		if(results.length!==1){
			return res.cc('登录失败')	
		}
		const compareResult = bcrypt.compareSync(loginfo.password,results[0].password)
		if(!compareResult){
			return res.cc('登录失败')
		}
		if(!results[0].status==1){
			return res.cc('账号被冻结')
		}
		const user ={
			...results[0],
			password:'',
			identity:'',
			create_time:'',
			update_time:'',
		}
		const tokenStr = jwt.sign(user,jwtconfig.jwtSecretKey,{
			expiresIn:'7h'
		})
		res.send({
			results:results[0],
			status:0,
			message:'登录成功',
			token:'Bearer'+tokenStr,
		})
	})
}