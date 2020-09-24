// 测试环境和生产环境的URL
const BASE_URL_DEV = 'https://locahost:8023';
const BASE_URL_PRD = 'https://www.czjdream.com:8081';

// 通过参数判断URL
let HOST_ENV = process.argv.splice(2)[0] || 'prod';
let HOST_URL = HOST_ENV === 'test' ? BASE_URL_DEV : BASE_URL_PRD;

console.log('> Host Env: ' + HOST_ENV);
console.log('> Host Url: ' + HOST_URL);

module.exports = {
  NODE_ENV: '"production"',
  API_HOST:'"https://jsq.noah-dream.com:443/app/"',
  HOST_ENV: '"' + HOST_ENV + '"',
  HOST_URL: '"' + HOST_URL + '"'
};
