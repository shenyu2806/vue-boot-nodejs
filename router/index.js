//路由
const express = require('express')
const router = express.Router()
//处理模块
testCode = (req,res) => {
	return res.send({
		status:200,
		massage:'一切正常',
	})
}
//测试
router.get('/',testCode)

module.exports = router