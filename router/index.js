//路由
const express = require('express')
const { token } = require('morgan');
const morgan = require('morgan');
const UserAgent = require('useragent');
const router = express.Router()
const Token = require('../jwt_config/index')
//处理模块

indexHtml = (req,res) => {
	return  res.sendFile('public/index.html');
}
testCode = (req,res) => {
	const ua = UserAgent.parse(req.get('user-agent') || '');
	return res.send({
    'ip': req.ip,
    'user-agent': ua,
    'os': ua.os,
    'browser': ua.browser,
    'device': {
      'category': ua.device.category || 'unknown',
      'vendor': ua.device.vendor || 'unknown',
      'model': ua.device.model || 'unknown',
      'type': ua.device.type || 'unknown'
    }
  })
}
testiops = (req,res) => {
	return res.send({
		status:200,
		massage:'一切正常',
	})
}
// 获取token
testert = (req, res)=>{
	const id = "6FGK908P1MK"
	const tokenKey = Token.en(id)
	return res.send({
		msg:'获取成功',
		status:200,
		tokenKey
	})
}
// 验证token
tokens = (req, res)=>{
    const token = req.headers['authorization']
	let data = Token.de(token)
	return res.send({
   	msg:'数据正常',
   	status:200,
   	data
   })
}
router.post('/vertify',tokens)

router.post('/test',testert)
//首页
router.get('/',indexHtml)

//用户信息
router.get('/all',testCode)

//前端检测
router.post('/',testiops)

module.exports = router