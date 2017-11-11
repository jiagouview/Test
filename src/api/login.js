import jsonp from 'common/jsonp'
import {options} from './config'

// 登录，验证用户信息
export function getUserMessage(formData) {
    const url = 'http://1.rao87wen45yu.applinzi.com/person/php/user_login.php'

    const data = Object.assign({}, {
        uname: formData.uname,
        upwd: formData.upwd
    })

  return jsonp(url, data, options)
}

// 注册
export function registerUser(formData) {
    const url = 'http://1.rao87wen45yu.applinzi.com/person/php/user_register.php'

    const data = Object.assign({}, {
        uname: formData.uname,
        upwd: formData.upwd,
        phone: formData.phone
    })

  return jsonp(url, data, options)
}


