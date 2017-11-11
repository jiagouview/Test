import jsonp from 'common/jsonp'
import {options} from './config'

// 获取订单列表
export function getCartList(page, cartId) {
    const url = 'http://1.rao87wen45yu.applinzi.com/person/php/cartList.php'

    const data = Object.assign({}, {
        pageNum: page,
        cartId: cartId
    })

  return jsonp(url, data, options)
}

// 增加订单编号（获取订单编号）
export function addOrder(userId,productId,count) {
    const url = 'http://1.rao87wen45yu.applinzi.com/person/php/addOrder.php'

    const data = Object.assign({}, {
        userId,
        productId,
        count
    })

    return jsonp(url, data, options)
}

// 从购物车删除商品
export function deleteGoods(uid,pid) {
    const url = 'http://1.rao87wen45yu.applinzi.com/person/php/deleteGoods.php'

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

// 获取在购物车中选中的商品列表
export function getSelectGoods(userId) {
    const url = 'http://1.rao87wen45yu.applinzi.com/person/php/orderList.php'

    const data = Object.assign({}, {
        userId
    })

    return jsonp(url, data, options)
}

// 订单完成时，删除商品
export function deleteSelectGoods(userId,productId) {
    const url = 'http://1.rao87wen45yu.applinzi.com/person/php/checkOrder.php'

    const data = Object.assign({}, {
        userId,
        productId
    })

    return jsonp(url, data, options)
}

// 订单完成时，获取订单编号
export function getOrderNum(userId,money) {
    const url = 'http://1.rao87wen45yu.applinzi.com/person/php/addSuccessOrder.php'

    const data = Object.assign({}, {
        userId,
        money
    })

    return jsonp(url, data, options)
}