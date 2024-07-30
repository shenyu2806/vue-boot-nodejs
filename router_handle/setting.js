//导入
const db =require('../db/index.js')
//处理文件
const fs = require('fs')

//上传轮播图
exports.uploadSwiper = (req,res) =>{
	let oldName = req.files[0].filename
	let newName = Buffer.from(req.files[0].originalname,'latin1').toString('utf8')
	fs.renameSync('./public/upload/'+ oldName,'./public/upload/'+ newName)
	const sql ='update setting set set_value = ? where set_name = ?'
	db.query(sql,[`http://127.0.0.1:9090/upload/${newName}`,req.body.set_name],(err,results) => {
		if(err) return res.cc(err)
		res.send({
			status:0,
			message:'上传轮播图成功'
		})
	})
}
//获取全部轮播图数据
exports.getAllSwiper = (req,res) =>{
	const sql ="select * from setting where set_name like 'swiper%'"
	db.query(sql,(err,result)=>{
		let array = []
		if(err) return res.cc(err)
		result.forEach((e)=>{
			array.push(e.set_value)
		})
		res.send({
			status:0,
			array
			})
	})
}
//获取公司名称
exports.getCompanyName = (req,res) =>{
	const sql ='select * from setting where set_name = "公司名称" '
	db.query(sql,(err,result)=>{
		if(err) return res.cc(err)
		res.send(result[0].set_value)
	})
}
//修改公司名称 set_value
exports.changeCompanyName = (req,res) =>{
	const sql ='update setting set set_value = ? where set_name = "公司名称" '
	db.query(sql,req.body.set_value,(err,result)=>{
		if(err) return res.cc(err)
		res.send({
			status:0,
			message:'修改公司名称成功'
		})
	})
}
//编辑公司介绍 set_text set_name
exports.changeCompanyintroduce = (req,res) =>{
	const date = req.body
	const sql ='update setting set set_text = ? where set_name = ?'
	db.query(sql,[date.set_text,date.set_name],(err,result)=>{
		if(err) return res.cc(err)
		res.send({
			status:0,
			message:'修改'+date.set_name+'成功'
		})
	})
}
//获取公司介绍 set_name
exports.getCompanyintroduce = (req,res) =>{
	const date = req.body
	const sql ='select * from setting where set_name = ?'
	db.query(sql,date.set_name,(err,result)=>{
		if(err) return res.cc(err)
		res.send(result[0].set_text)
	})
}

//获取所有公司信息
exports.getAllCompanyintroduce = (req,res) =>{
	const date = req.body
	const sql ="select * from setting where set_name like '公司%'"
	db.query(sql,(err,result)=>{
		if(err) return res.cc(err)
		res.send({
			status:0,
			result
		})
	})
}