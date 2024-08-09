const jwt = require('jsonwebtoken')
Token = {
	en(str){
		const tokenKey = jwt.sign(str, 'tuxinwan')
		return tokenKey;
	},
	de(token){
		try{
			const tokenKey = jwt.verify(token, 'tuxinwan',{
			expiresIn:'7h'
		})
		return{
			status:0,
			tokenKey
		}
		}
		catch{
			return{
				status:1
			}
		}
	}
}
module.exports = Token;