const BASEURL = "https://www.easy-mock.com/mock/5b573c0e9a5ff532038078dd/smile/"
const LOCALURL = 'http://127.0.0.1:3000/'
const URL = {
    getShoppingMallInfo:BASEURL+'index',
    getGoodsInfo:BASEURL+'getList',
    registerUser: LOCALURL + 'user/register' 
}
 
module.exports = URL