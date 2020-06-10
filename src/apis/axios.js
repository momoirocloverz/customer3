import axios from 'axios';
import router from './../router/index';
import {
    Message
} from 'element-ui'
require('es6-promise').polyfill();
let baseURL = 'http://test.api.10000rc.com';
// let baseURL = 'http://www.10000rc.com';

if (process.env.NODE_ENV == 'production'){
    if (process.env.VUE_APP_TITLE == 'test') {
        baseURL = 'http://test.api.10000rc.com';
    } else {
        baseURL = 'http://www.10000rc.com';
    }
}

const instance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
//    timeout: 100000,
    headers: {
        'Content-Type': 'application/json',
        'os':'web',
        'version':'1.0',
        'apptype':'web',
        'equipment':'web',
        'equipmentVersion':'web',
        'equipmentType':'web',
        'userType':'2',
    },
});
instance.interceptors.request.use(function (config) {
//    console.log(config)
    let webToken = localStorage.getItem('webToken');
    if( webToken ){
        config.headers['Authorization'] = `Bearer ${webToken}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
//    console.log(response)
    if (response.headers.status == 1) {
        localStorage.setItem("webToken", response.headers.authorization);
    }
    if(response.data.respCode !== 0){
        if(response.data.respCode === -2){
            if(response.data.errorCode === 509){
                Message.error(response.data.errorMsg)
                router.push({name:'login'}).catch(data => { console.log(data) });
                return
            }else{
                return Message.error(response.data.errorMsg)
            }
        }else{
            return Message.error(response.data.errorMsg)
        }
    }
    return response.data;
}, function (error) {
    return Promise.reject(error);
});

export default instance;

