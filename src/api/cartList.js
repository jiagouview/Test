import jsonp from 'common/jsonp'
import {options} from './config'

// 获取商品列表
export function getCartList(cartId) {
    const url = 'http://1.rao87wen45yu.applinzi.com/person/php/cartList.php'

    const data = Object.assign({}, {
        cartId
    })

  return jsonp(url, data, options)
}

// 从购物车一件一件删除商品
export function deleteGoods(uid,pid) {
    const url = 'http://1.rao87wen45yu.applinzi.com/person/php/deleteGoods.php'

    const data = Object.assign({}, {
        uid: uid,
        pid: pid
    })

    return jsonp(url, data, options)
}

// 从购物车一次性删除商品
export function deleteSingerGoods(uid,pid) {
    const url = 'http://1.rao87wen45yu.applinzi.com/person/php/deleteSingerGoods.php'

    const data = Object.assign({}, {
        uid: uid,
        pid: pid
    })

    return jsonp(url, data, options)
}

// 在购物车中更新商品选中的状态
export function updateStoreCart(uid,pid,checked) {
    const url = 'http://1.rao87wen45yu.applinzi.com/person/php/updateGoods.php'

    const data = Object.assign({}, {
        uid: uid,
        pid: pid,
        checked: checked
    })

    return jsonp(url, data, options)
}
