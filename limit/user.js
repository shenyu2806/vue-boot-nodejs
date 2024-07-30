const joi = require('joi')
/* 校验
string值只能为字符串
aLphanum值为a-zA-Zg-9
min是最小长度max是最大长度
required是必填项
pattern是正则 */

const id = joi.required()
const name = joi.string().pattern(/^[\u4e00-\u9fa5]{2,6}$/).required()
const email = joi.string().pattern(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/).required()
const oldPassword = joi.string().pattern(/^(?![0-9]+$)[a-z0-9]{1,50}$/).min(6).max(12).required()
const newpassword = joi.string().pattern(/^(?![0-9]+$)[a-z0-9]{1,50}$/).min(6).max(12).required()

exports.name_limit ={
	
	body:{
		id,
		name
	}
}
exports.email_limit ={
	
	body:{
		id,
		email
	}
}
exports.password_limit ={
	body:{
		id,
		oldPassword,
		newpassword
	}
}
exports.forgetPassword_limit ={
	body:{
		id,
		newpassword
	}
}