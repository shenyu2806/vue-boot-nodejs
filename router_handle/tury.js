//导入
const { json } = require('body-parser')
const db = require('../db/index.js')

exports.setuerse = (req, res) => {
	const sql = "SELECT identity, COUNT(*) AS value FROM users GROUP BY identity"
		db.query(sql,(err,result)=>{
		if(err) return res.cc(err)
		result.forEach((e)=>{
			e.name = e.identity
			delete e.identity
		})
		res.json(result)
	})
}