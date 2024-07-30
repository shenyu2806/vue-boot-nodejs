const express = require('express');
const app = express()

var bodyparser = require('body-parser')

const cors = require('cors')
const bodyParser = require('body-parser');
const loginRouter =require('./router/login')

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use((req,res,next)=>{
	//成功为0
	res.cc = (err,status=1)=>{
		res.send({
			status,
			message:err instanceof Error ? err.message : err,
		})
	}
	next()
})
const jwtconfig =require('./jwt_config/index.js')
const {expressjwt:jwt} = require('express-jwt')
const Joi = require('joi');
app.use(jwt({
	secret:jwtconfig.jwtSecretKey,algorithms:['ES256']
}).unless({
	path:[/^\/api\//]
}))
app.use('/api',loginRouter)
//不符合joi规则的情况
app.use((req,res,next)=>{
	if(err instanceof Joi.ValidationError) return res.cc(err)
})

app.listen(9090, () => {
	console.log('http://127.0.0.1:9090')
})