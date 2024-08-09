const mysql = require('mysql')
const mydb = {
	host:'localhost',//数据库地址
	user:'root',//用户名
	password:'123456',//密码
	database:'back_system'//数据库名称
}
const db =mysql.createPool({
	host:mydb.host,
	user:mydb.user,
	password:mydb.password,
	database:mydb.database
})
/* const dbtest = mysql.createConnection({
	host:mydb.host,
	user:mydb.user,
	password:mydb.password,
	database:mydb.database
})

dbtest.connect((error) => {
	  if (error) {
	    console.error('数据库：连接失败 \n 请前往db/index.js文件配置数据库服务');
	    return;
	  }
	  console.log('数据库：连接成功');
}); */
module.exports = db