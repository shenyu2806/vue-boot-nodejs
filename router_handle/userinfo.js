//导入
const db =require('../db/index.js')
const bcrypt =require('bcryptjs')
const crypto = require('crypto')
//处理文件
const fs = require('fs')

//上传头像
exports.uploadAvatar = (req,res) =>{
	const onlyid = crypto.randomUUID()
	let oldName = req.files[0].filename
	let newName = Buffer.from(req.files[0].originalname,'latin1').toString('utf8')
	fs.renameSync('./public/upload/'+ oldName,'./public/upload/'+ newName)
	const sql ='insert into image set ?'
	db.query(sql,{
		image_url:`http://127.0.0.1:9090/upload/${newName}`,
		onlyid
	},(err,results) => {
		if(err) return res.cc(err)
		res.send({
			onlyid,
			status:0,
			url:'http://127.0.0.1:9090/upload/'+newName
		})
	})
}
//绑定账号
exports.bindAccount = (req,res) =>{
	const{
		account,
		onlyid,
		url
	} = req.body
	const sql ="update image set account = ? where onlyid = ?"
	db.query(sql,[account,onlyid],(err,result)=>{
		if(err) return res.cc(err)
		if(result.affectedRows ==1){
			const sql1 ="update users set image_url = ? where account = ?"
			db.query(sql1,[url,account],(err,result)=>{
				if(err) return res.cc(err)
				res.send({
					status:0,
					message:'修改成功'
				})
			})
		}
	})
}

//修改用户密码 接收id oldPassword 新newpassword
exports.changePassword = (req,res) =>{
	const sql ="select password from users where id = ?"
	db.query(sql,req.body.id,(err,result)=>{
		if(err) return res.cc(err)
		const compareResult = bcrypt.compareSync(req.body.oldPassword,result[0].password)
		if(!compareResult){
			res.send({
				status:1,
				message:'原密码错误'
			})
		}
		req.body.newpassword = bcrypt.hashSync(req.body.newpassword,10)
		const sql1 ='update users set password = ? where id = ?'
		db.query(sql1,[req.body.newpassword,req.body.id],(err,result)=>{
			if(err) return res.cc(err)
			res.send({
				status:0,
				message:'修改成功'
			})
		})
	})
}

//获取用户数据 接收id
exports.getuserInfo = (req,res) =>{
	const sql ="select * from users where id = ?"
	db.query(sql,req.body.id,(err,result)=>{
		if(err) return res.cc(err)
		result[0].password=""
		res.send(result[0])
	})
}

//修改姓名 接收id name
exports.changeName = (req,res) =>{
	const {id,name} =req.body
	const sql ="update users set name = ? where id = ?"
	db.query(sql,[name,id],(err,result)=>{
		if(err) return res.cc(err)
		res.send({
			status:0,
			message:'修改成功'
		})
	})
}

//修改性别 接收id sex
exports.changeSex = (req,res) =>{
	const {id,sex} =req.body
	const sql ="update users set sex = ? where id = ?"
	db.query(sql,[sex,id],(err,result)=>{
		if(err) return res.cc(err)
		res.send({
			status:0,
			message:'修改成功'
		})
	})
}

//修改邮箱 接收id email
exports.changeEmail = (req,res) =>{
	const {id,email} =req.body
	const sql ="update users set email = ? where id = ?"
	db.query(sql,[email,id],(err,result)=>{
		if(err) return res.cc(err)
		res.send({
			status:0,
			message:'修改成功'
		})
	})
}

//验证账号与邮箱
exports.verifyAccountAndEmail = (req,res) =>{
	const { account,email} = req.body
	const sql ='select email,id from users where account = ?'
	db.query(sql,account,(err,result)=>{
		if(err) return res.cc(err)
		// res.send(result[0])
		if(email==result[0].email){
			res.send({
				status:0,
				message:'一切正常',
				id:result[0].id
			})
		}else{
			res.send({
				status:1,
				message:'遇到错误'
			})
		}
	})
}

//登录页面修改密码 id newpassword
exports.changePasswordInLogin = (req,res)=>{
	const user =req.body
	req.body.newpassword = bcrypt.hashSync(req.body.newpassword,10)
	const sql='select password from users where id = ?'
	db.query(sql,[user.newpassword,user.id],(err,result)=>{
		if(err) return res.cc('错误')
		res.send({
			status:0,
			message:'更新成功'
		})
	})
}