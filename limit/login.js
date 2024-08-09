const joi = require('joi')
/* 校验
string值只能为字符串
aLphanum值为a-zA-Zg-9
min是最小长度max是最大长度
required是必填项
pattern是正则 */

// 账号
const account = joi.string().min(2).max(12).required()
// 密码
const password = joi.string().min(6).max(12).required()
//.pattern(/^(?![0-9]+$)[a-z0-9]{1,50}$/)

exports.login_limit ={
	
	body:{
		account,
		password
	}
}