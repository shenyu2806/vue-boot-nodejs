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
	const sql='update users set password = ? where id = ?'
	db.query(sql,[user.newpassword,user.id],(err,result)=>{
		if(err) return res.cc(err)
		res.send({
			status:0,
			message:'更新成功'
		})
	})
}

//------------------------------用户管理
//添加管理员
exports.createAdmin = (req,res)=>{
	const {
		account,password,name,sex,department,email,identity
	}=req.body
	const sql = 'select * from users where account = ?'
	db.query(sql,account,(err,result)=>{
		if(err) return res.cc(err)
		if(result.length>0){
			res.send({
			status:1,
			message:'账号已经存在',
			})
		}else{
			const hashpassword = bcrypt.hashSync(password,10)
			const sql1='insert into users set ?'
			const create_time = new Date()
			db.query(sql1,{
					account,
					password:hashpassword,
					name,
					sex,
					department,
					email,
					identity,
					create_time,
					status:0,//0为未冻结
				},(err,results)=>{
					if(results.affectedRows !==1){
						return res.send({
							status:1,
							massage:'添加账号失败'
						})
					}
					return res.send({
						status:0,
						massage:'添加账号成功'
					})
			})
		}
	})
}

//获取管理员列表
exports.getAdminList = (req,res) =>{
	const sql ='select * from users where identity = ?'
	db.query(sql,req.body.identity,(err,result)=>{
		if(err) return res.cc(err)
		if(req.body.identity=="用户"){
			result.forEach((e)=>{
				e.password = ""
				e.image_url = ""
			})
		}else{
		result.forEach((e)=>{
			e.password = ""
			e.create_time = ""
			e.image_url = ""
		})
		}
		res.send(result)
	})
}
//通过部门获取用户数据 接收department
exports.searchDepartment = (req,res) =>{
	const sql ="select * from users where department = ?"
	db.query(sql,req.body.department,(err,result)=>{
		if(err) return res.cc(err)
		result.forEach((e)=>{
			e.password = ""
			e.create_time = ""
			e.image_url = ""
		})
		res.send(result)
	})
}

//编辑管理员列表
exports.editAdmin= (req,res) =>{
	const {
		id,name,image_url,sex,department,email
	} = req.body
	const date = new Date()
	const updateContent = {
		id,
		name,
		image_url,
		sex,
		email,
		department,
		update_time:date,
	}
	const sql = 'update users set ? where id = ?'
	db.query(sql,[updateContent,updateContent.id],(err,result)=>{
		if(err) return res.cc(err)
		res.send({
		status:0,
		message:'修改成功',
		})
	})
}

//对管理员降级
exports.changeIdentityToUser = (req,res) =>{
	const identity = "用户"
	const date = new Date()
	const sql = 'update users set identity = ? ,update_time = ? where id = ?'
	db.query(sql,[identity,date,req.body.id],(err,result)=>{
		if(err) return res.cc(err)
		res.send({
		status:0,
		message:'降级成功',
		})
	})
}

//对用户赋权 identity id
exports.changeIdentityToAdmin = (req,res) =>{
	const date = new Date()
	const sql = 'update users set identity = ? ,update_time = ? where id = ?'
	db.query(sql,[req.body.identity,date,req.body.id],(err,result)=>{
		if(err) return res.cc(err)
		res.send({
		status:0,
		message:'赋权'+req.body.identity+'成功',
		})
	})
}

//对用户搜索 account
exports.searchUser = (req,res) =>{
	 let account = "%"+req.body.account+"%"
	if(req.body.identity!=null){
		const sql="select * from users where account like ? and identity = ? "
		db.query(sql,[account,req.body.identity],(err,result)=>{
			if(err) return res.cc(err)
			if(req.body.identity=="用户"){
				result.forEach((e)=>{
					e.password = ""
					e.image_url = ""
				})
			}else{
				result.forEach((e)=>{
				e.password = ""
				e.create_time = ""
				e.image_url = ""
				})	
			}
			
				res.send(result)
		})
	}else{
		const sql="select * from users where account like ?"
		db.query(sql,account,(err,result)=>{
		if(err) return res.cc(err)
		result.forEach((e)=>{
			e.password = ""
			e.create_time = ""
			e.image_url = ""
		})
			res.send(result)
		})
	}
}

//冻结用户 把status = 1
exports.banUser = (req,res) =>{
	const date = new Date()
	const status = 1
	const sql='update users set status = ?,update_time = ? where id = ?'
	db.query(sql,[status,date,req.body.id],(err,result)=>{
		if(err) return res.cc(err)
			res.send({
			status:0,
			message:'冻结成功',
			})
	})
}

//解冻用户 把status = 0
exports.hotUser = (req,res) =>{
	const date = new Date()
	const status = 0
	const sql='update users set status = ? ,update_time = ? where id = ?'
	db.query(sql,[status,date,req.body.id],(err,result)=>{
		if(err) return res.cc(err)
			res.send({
			status:0,
			message:'解冻成功',
			})
	})
}

//获取冻结用户
exports.getBanList = (req,res) =>{
	const sql ="select * from users ,update_time = ? where status = '1'"
	db.query(sql,(err,result)=>{
		if(err) return res.cc(err)
			res.send(result)
	})
}

//删除用户 id account
exports.deleteUser = (req,res) =>{
	const sql ='delete from users where id = ? and account = ?'
	db.query(sql,[req.body.id,req.body.account],(err,result)=>{
			if(err) return res.cc(err)
			res.send({
			status:0,
			message:'删除'+req.body.account+'成功',
			})
	})
}
//获取对应身份的人数 identity
exports.getAdmingListLength = (req,res) =>{
	const sql ="select * from users where identity = ?"
	db.query(sql,req.body.identity,(err,result)=>{
		if(err) return res.cc(err)
		res.send({
			length:result.length
		})
	})
}
//监听换页 pager identity
exports.returnListData = (req,res) =>{
	const sql =`select * from users where identity = ? and id >= ${req.body.zhid} limit 10 offset ${req.body.pager}`
	db.query(sql,req.body.identity,(err,result)=>{
		if(err) return res.cc(err)
		res.send({
			oid:result.length - 1,
			result
		})
	})
}
//获取全部用户
exports.getUsersList = (req,res) =>{
	const number = req.body.pager
	const sql ='select * from users'
	db.query(sql,req.body.identity,(err,result)=>{
		if(err) return res.cc(err)
		res.send(result)
	})
}