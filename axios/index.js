const axios = require('axios');
const package = require('../package');
const port = package.port
//获取公网IP 
exports.getipcode = async function() {
	  try {
	    const response = await axios.get('https://api.ipify.org?format=json');
	    console.log('公网：http://'+response.data.ip+`:${port}`);
	  } catch (error) {
	  }
	  console.log('内网：http://'+getInternalIp()+`:${port}`);
	  console.log(`本地：http://localhost:${port}`)
}
//获取内网IP 
const os = require('os');
const networkInterfaces = os.networkInterfaces();
function getInternalIp() {
  for (const iface of Object.values(networkInterfaces)) {
    for (const config of iface) {
      if (config.family === 'IPv4' && !config.internal) {
        return config.address;
      }
    }
  }
  return '127.0.0.1'; // 如果没有找到，返回本地回环地址
}