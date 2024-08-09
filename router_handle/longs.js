//导入
const db =require('../db/index.js')

//计入登录日志
exports.longReckon = (req,res)=>{
	const {
		operating_name,
		operating_email,
		operating_content
	} = req.body
	const operating_time = new Date()
	const sql = "insert into logs_login set ?"
	db.query(sql,[{
		operating_name,
		operating_email,
		operating_content,
		operating_time
	}],(err,result)=>{
		if(err) return res.cc(err)
		res.send({
			status:0,
			message:"计入成功"	
		})
	})
}
//获取登录日志
exports.getlongInfo = (req,res) =>{
	const sql ="select * from logs_login ORDER BY operating_time DESC"
	db.query(sql,(err,result)=>{
		if(err) return res.cc(err)
		res.send(result)
	})
}
//清空登录日志
exports.longDelete = (req,res)=>{
	const sql = "DELETE FROM logs_login"
	db.query(sql,(err,result)=>{
		if(err) return res.cc(err)
		res.send({
			status:0,
			message:"删除成功"	
		})
	})
}