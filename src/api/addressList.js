import jsonp from 'common/jsonp'
import {options} from './config'

// 新增地址
export function addShopAddress(userId, peopleName, address, phone) {
    const url = 'http://1.rao87wen45yu.applinzi.com/person/php/addAddress.php'

    const data = Object.assign({}, {
        userId,
        peopleName,
        address,
        phone
    })

  return jsonp(url, data, options)
}

// 获取地址列表
export function getAddressList(userId,loadMore) {
    const url = 'http://1.rao87wen45yu.applinzi.com/person/php/addressList.php'

    const data = Object.assign({}, {
        userId,
        loadMore
    })

  return jsonp(url, data, options)
}

// 设置默认地址
export function setDefaultAddress(userId,aid) {
    const url = 'http://1.rao87wen45yu.applinzi.com/person/php/setDefaultAddress.php'

    const data = Object.assign({}, {
        userId,
        aid
    })

  return jsonp(url, data, options)
}

// 选中当前地址为配送地址
export function selectAddress(userId,aid) {
    const url = 'http://1.rao87wen45yu.applinzi.com/person/php/selectAddress.php'

    const data = Object.assign({}, {
        userId,
        aid
    })

  return jsonp(url, data, options)
}