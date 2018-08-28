import axios from "axios";

const BASEURL = "https://www.easy-mock.com/mock/5b573c0e9a5ff532038078dd/smile/" // http://127.0.0.1:3000   'http://1109eb7c.nat123.cc:16783'
const LOCALURL = 'http://127.0.0.1:3000'
var instance = axios.create({
    baseURL: LOCALURL,
    timeout: 400000000000000000,
    headers: {'X-Requested-With': 'XMLHttpRequest'},
  });

  // 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
      const token = localStorage.getItem('DON_BLOG_TOKEN');
      debugger
      if (token) {
        // Bearer是JWT的认证头部信息
        config.headers.common['Authorization'] = token;
      }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

  // 添加响应拦截器
instance.interceptors.response.use(function (response) {
  debugger
    // 对响应数据做点什么
    return response;
  }, function (err) {
    debugger
    switch (err.response.status) {
        case 302:
          err.message = '错误请求：找不到url请求（后台过滤）';
          break;
        case 400:
          err.message = '错误请求：字段名称、类型前后台不一致';
          break;
        case 401:
          err.message = '未授权，请重新登录';
          router.replace({path: '/login'});//路由跳转 不会向 history 添加新记录，替换掉当前的 history 记录
          break;
        case 403:
          err.message = '拒绝访问';
          router.replace({path: '/error/401'});
          break;
        case 404:
          err.message = '请求错误,未找到该资源';
          router.replace({path: '/error/404'});
          break;
        case 405:
          err.message = '请求方法未允许,可能是请求类型(get post)不一致';
          break;
        case 408:
          err.message = '请求超时';
          break;
        case 500:
          err.message = '服务器端出错';
          break;
        case 501:
          err.message = '网络未实现';
          break;
        case 502:
          err.message = '网络错误';
          break;
        case 503:
          err.message = '服务不可用';
          break;
        case 504:
          err.message = '网络超时';
          router.replace({path: '/error/404'});
          break;
        case 505:
          err.message = 'http版本不支持该请求';
          break;
        default:
          err.message = `连接错误${err.response.status}`;
      }
    // 对响应错误做点什么
    return Promise.reject(err);
  });
  export default instance;  