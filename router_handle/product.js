//导入
const db =require('../db/index.js')

/* 产品表product字段：
product_id入库编号int
*product_name产品名称varchar
*product_category产品类别varchar
*product_unit产品单位varchar
*product_inwarehouse_number产品入库数量库存int
product_single_price产品入库单价int
*product_all_price产品入库总价int
*product_status库存状态100-300为正常100以下为库存告总300以上为过剩varchar
product_create_person入库操f作人varchar
*product_create_time产品新建时间varchar
*product_update_time产品最新编时间varchar
*in_memo入库备注

产品出库申请product_out字段：
product_id入库编号int
*product_out_id出库id int
*product_out_number出库数量int
product_out_price出库单价int
*product_all_price出库总价int
product_name 产品名称varchar
*product_out_apply_person出库申请人varchar
*product_apply_date申请出库时间varchar
*apply_memo申请备注varchar
*product_out_status出库状态申请出库or同意or否决varchar
*product_audit_time审核时i间varchar
*product_out_audit_person审核人varchar
*apply_memo出库申请备注varchar
*audit_memo出库/审核备注varchar

产品出库outprofuct字段：
product_out_id出库编号int
product_out_number 出库数量int
product_out_price 出库总价int
product_out_apply_perso  申请用户varchar
product_audit_time 出库时间
product_out_audit_persor 出库用户varchar
audt_memo 出库/审核备注 */

//产品入库
exports.createProduct = (req,res) =>{
	const {
		product_id,
		product_name,
		product_category,
		product_unit,
		product_inwarehouse_number,
		product_single_price,
		product_create_person,
		in_memo
	} =req.body
	const product_create_time = new Date()
	const product_all_price = product_single_price * 1 * product_inwarehouse_number * 1
	const sql = "insert into product set ?"
	db.query(sql,{
		product_id,
		product_name,
		product_category,
		product_unit,
		product_inwarehouse_number,
		product_single_price,
		product_create_person,
		product_all_price,
		product_create_time,
		in_memo
	},(err,result)=>{
		if(err) return res.cc(err)
		res.send({
			status:0,
			message:'产品入库成功'
		})
	})
}
//编辑产品信息
exports.editProduct = (req,res) =>{
	const {
		product_id,
		product_name,
		product_category,
		product_unit,
		product_inwarehouse_number,
		product_single_price,
		in_memo
	} =req.body
	const product_update_time = new Date()
	const product_all_price = product_single_price * 1 * product_inwarehouse_number * 1
	const sql = "update product set ? where product_id = ? "
	db.query(sql,[{
			product_name,
			product_category,
			product_unit,
			product_inwarehouse_number,
			product_single_price,
			product_all_price,
			product_update_time,
			in_memo
		},product_id],(err,result)=>{
			if(err) return res.cc(err)
			res.send({
				status:0,
				message:'编辑产品信息成功'
			})
	})
}
//获取产品列表
exports.getProductList = (req,res) =>{
	const sql = "SELECT * FROM product where product_inwarehouse_number > 0"
	db.query(sql,(err,result)=>{
		if(err) return res.cc(err)
		res.send(result)
	})
}
//产品申请出库
exports.applyOutProduct = (req,res) =>{
	const product_out_status = "申请出库"
	const {
		product_id,
		product_out_id,
		product_out_price,
		product_name,
		product_out_number,
		product_out_apply_person,
		apply_memo
	} = req.body
	const product_apply_date = new Date()
	const product_all_price = product_out_price * 1 * product_out_number * 1
	const sql = "insert into product_out set ?"
	db.query(sql,{
		product_id,
		product_name,
		product_out_id,
		product_out_price,
		product_out_number,
		product_out_apply_person,
		product_all_price,
		product_apply_date,
		apply_memo
	},(err,result)=>{
		if(err) return res.cc(err)
			res.send({
				status:0,
				message:'产品申请出库成功'
			})	
	})
}
//更新库存数量 申请出库
exports.updateproduct = (req,res) =>{
	const sql = "SELECT * FROM product where product_id = ? "
	db.query(sql,[req.body.product_id],(err,results)=>{
		if(err) return res.cc(err)
		const number = results[0].product_inwarehouse_number
		if(req.body.product_all_price <= number){
			const product_inwarehouse_number = number - req.body.product_all_price
			const sql1 = "update product set product_inwarehouse_number = ? where product_id = ?"
			db.query(sql1,[product_inwarehouse_number,req.body.product_id],(err,result)=>{
				if(err) return res.cc(err)
				res.send({
					status:0,
					uio:product_inwarehouse_number,
					result:result.product_inwarehouse_number,
					message:'产品库存修改成功'
				})	
			}) 
		}else{
			res.send({
				status:1,
				uio:number,
				message:'产品库存修改失败'
			})	
		}
	})
}
//更新库存数量 取消出库
exports.upopesproduct = (req,res) =>{
	const sql = "SELECT * FROM product where product_id = ? "
	db.query(sql,[req.body.product_id],(err,results)=>{
			if(err) return res.cc(err)
			const number = results[0].product_inwarehouse_number
			const product_inwarehouse_number = number + req.body.product_out_number
			const sql1 = "update product set product_inwarehouse_number = ? where product_id = ?"
			db.query(sql1,[product_inwarehouse_number,req.body.product_id],(err,result)=>{
				if(err) return res.cc(err)
				res.send({
					status:0,
					uio:product_inwarehouse_number,
					result:result.product_inwarehouse_number,
					message:'产品库存修改成功'
				})	
			}) 
	})
}

//产品全部数据列表
exports.ProductAllList = (req,res) =>{
	const sql = "SELECT * FROM product RIGHT JOIN product_out ON product.product_id = product_out.product_id"
	db.query(sql,(err,result)=>{
		if(err) return res.cc(err)
		res.send(result)
	})
}
//产品审核列表
exports.applyProductList = (req,res) =>{
	const sql = "SELECT * FROM product_out where product_out.product_out_status not in ('同意')"
	db.query(sql,(err,result)=>{
		if(err) return res.cc(err)
		res.send(result)
	})
}

//产品审核
exports.auditProduct = (req,res) =>{
	const {
		product_out_id,
		product_out_status,
		audit_memo,
		product_out_audit_person,
		product_out_price,
		product_out_apply_person,
		product_out_number
	} = req.body
	if(product_out_status == "同意"){
		const product_audit_time = new Date()
		//单价
		const product_all_price = product_out_price * 1 * product_out_number * 1
		const sql = "insert into outprofuct set ?"
		db.query(sql,{
			product_out_id,
			product_out_number,
			product_out_price,
			product_all_price,
			product_out_audit_person,
			product_out_apply_person,
			 product_audit_time,
			audit_memo
		},(err,result)=>{
		if(err) return res.cc(err)
		const sql1 = "update product_out set apply_memo = '审核通过' where product_out_id = ?"
		db.query(sql1,product_out_id,(err,result)=>{
			res.send({
				status:0,
				message:'产品出库成功'
			})	
		})
	})
}
if(product_out_status == "否决"){
	const sql = "update product set in_memo = ?,product_status = '' where product_out_id = ?"
	db.query(sql,[audit_memo,product_out_id],(err,result)=>{
		if(err) return res.cc(err)
		res.send({
			status:0,
			message:'产品被否决'
		})
	})
}
}
//通过入库编号获取数据 接收product_id
exports.searchProductForId = (req,res) =>{
	const sql ="SELECT * FROM product where product_id = ?"
	db.query(sql,req.body.product_id,(err,result)=>{
		if(err) return res.cc(err)
		res.send(result)
	})
}

//通过出库编号获取数据 接收product_id
exports.searchProductOutId = (req,res) =>{
	const sql ="SELECT * FROM outprofuct where product_out_id = ?"
	db.query(sql,req.body.product_out_id,(err,result)=>{
		if(err) return res.cc(err)
		res.send(result)
	})
}

//删除入库产品
exports.deletProductForId = (req,res) =>{
	const sql = "delete from product where product_id = ?"
	db.query(sql,req.body.product_id,(err,result)=>{
		if(err) return res.cc(err)
			res.send({
				status:0,
				message:'库存产品删除成功'
			})
	})
}

//删除 申请出库产品
exports.deletProductOutId = (req,res) =>{
	const sql = "delete from product_out where product_out_id = ?"
	db.query(sql,req.body.product_out_id,(err,result)=>{
		if(err) return res.cc(err)
			res.send({
				status:0,
				message:'出库产品删除成功'
			})
	})
}

//删除 出库产品
exports.deletProductfopsForId = (req,res) =>{
	const sql = "delete from outprofuct where product_out_id = ?"
	db.query(sql,req.body.product_out_id,(err,result)=>{
		if(err) return res.cc(err)
			res.send({
				status:0,
				message:'库存产品删除成功'
			})
	})
}

//撤回产品出库申请
exports.WithdrawApplyProduct = (req,res) =>{
	const sql = "delete from product_out where product_out_id = ?"
	db.query(sql,[req.body.product_out_id],(err,result)=>{
		if(err) return res.cc(err)
		res.send({
			status:0,
			message:'产品撤回申请成功'
		})
	})
}

//获取 库存产品总数
exports.getProductListLength = (req,res) =>{
	const sql ="select * from product"
	db.query(sql,(err,result)=>{
		if(err) return res.cc(err)
		res.send({
			length:result.length
		})
	})
}

//获取 申请出库产品总数
exports.getApplyProdcutListLength = (req,res) =>{
	const sql ="select * from product_out"
	db.query(sql,(err,result)=>{
		if(err) return res.cc(err)
		res.send({
			length:result.length
		})
	})
}
//修改状态码 300
exports.setad300 = (req,res) =>{
	const sql1 = "update product set product_status = 300 where product_id = ?"
	db.query(sql1,req.body.product_id,(err,result)=>{
		if(err) return res.cc(err)
		res.send({
		status:0,
		message:'状态修改成功'
		})	
	})
}
//修改状态码 null
exports.setadnull = (req,res) =>{
	const sql1 = "update product set product_status = '' where product_id = ?"
	db.query(sql1,req.body.product_id,(err,result)=>{
		if(err) return res.cc(err)
		res.send({
		status:0,
		message:'状态修改成功'
		})	
	})
}
//获取 出库产品总数
exports.getoutprofuctListLength = (req,res) =>{
	const sql ='select * from outprofuct'
	db.query(sql,(err,result)=>{
		if(err) return res.cc(err)
		res.send({
			length:result.length
		})
	})
}

//监听换页 库存产品
exports.returnProdcutListData = (req,res) =>{
	const sql =`select * from product where product_id >= ${req.body.zhid} limit 10 offset ${req.body.pager}`
	db.query(sql,(err,result)=>{
		if(err) return res.cc(err)
		res.send({
			oid:result.length - 1,
			result
		})
	})
}
//监听换页 申请出库产品
exports.returnApplyProdcutListData = (req,res) =>{
	const sql =`select * from product_out where product_out_id >= ${req.body.zhid} limit 10 offset ${req.body.pager}`
	db.query(sql,(err,result)=>{
		if(err) return res.cc(err)
		res.send({
			oid:result.length - 1,
			result
		})
	})
}
//监听换页 出库产品
exports.returnoutprofuctListData = (req,res) =>{
	const sql =`select * from outprofuct where product_out_id >= ${req.body.zhid} limit 10 offset ${req.body.pager}`
	db.query(sql,(err,result)=>{
		if(err) return res.cc(err)
		res.send({
			oid:result.length - 1,
			result
		})
	})
}