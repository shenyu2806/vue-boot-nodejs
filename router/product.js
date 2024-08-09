//路由
const express = require('express')
const router = express.Router()
//导入处理模块
const proHasndler = require('../router_handle/product.js')

//产品入库
router.post('/createProduct',proHasndler.createProduct)

//编辑产品信息
router.post('/editProduct',proHasndler.editProduct)

//修改状态码 300
router.post('/setad300',proHasndler.setad300)

//修改状态码 null
router.post('/setadnull',proHasndler.setadnull)

//获取产品列表
router.post('/getProductList',proHasndler.getProductList)

//产品全部数据列表
router.post('/ProductAllList',proHasndler.ProductAllList)

//产品申请出库
router.post('/applyOutProduct',proHasndler.applyOutProduct)

//更新库存数量 申请出库
router.post('/updateproduct',proHasndler.updateproduct)

//更新库存数量 取消出库
router.post('/upopesproduct',proHasndler.upopesproduct)

//产品审核列表
router.post('/applyProductList',proHasndler.applyProductList)

//产品审核
router.post('/auditProduct',proHasndler.auditProduct)

//撤回产品出库申请
router.post('/WithdrawApplyProduct',proHasndler.WithdrawApplyProduct)

//通过入库编号获取数据
router.post('/searchProductForId',proHasndler.searchProductForId)

//通过出库编号获取数据
router.post('/searchProductOutId',proHasndler.searchProductForId)

//删除入库产品
router.post('/deletProductForId',proHasndler.deletProductForId)

//删除 申请出库产品
router.post('/deletProductOutId',proHasndler.deletProductOutId)

//删除 出库产品
router.post('/deletProductfopsForId',proHasndler.deletProductfopsForId)

//获取 库存产品总数
router.post('/getProductListLength',proHasndler.getProductListLength)

//获取 申请出库产品总数
router.post('/getApplyProdcutListLength',proHasndler.getApplyProdcutListLength)

//获取 出库产品总数
router.post('/getoutprofuctListLength',proHasndler.getoutprofuctListLength)

//监听换页 库存产品
router.post('/returnProdcutListData',proHasndler.returnProdcutListData)

//监听换页 申请出库产品
router.post('/returnApplyProdcutListData',proHasndler.returnApplyProdcutListData)

//监听换页 出库产品
router.post('/returnoutprofuctListData',proHasndler.returnoutprofuctListData)

module.exports = router