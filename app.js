const express = require('express');
const app = express()

var bodyparser = require('body-parser')

const cors = require('cors')
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())
app.listen(9090, () => {
	console.log('http://127.0.0.1:9090')
})