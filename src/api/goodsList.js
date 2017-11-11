import jsonp from 'common/jsonp'
import {options} from './config'

// 获取商品列表(只有升序、排序)
export function getStoreList(page,sort) {
    const url = 'http://1.rao87wen45yu.applinzi.com/person/php/storeList.php'

    const data = Object.assign({}, {
        pageNum: page,
        sort
    })

  return jsonp(url, data, options)
}

// 增加商品到购物车
export function addStoreCart(uid,pid) {
    const url = 'http://1.rao87wen45yu.applinzi.com/person/php/addGoods.php'

    const data = Object.assign({}, {
        uid: uid,
        pid: pid
    })

    return jsonp(url, data, options)
}

// 获取商品列表(不仅有升序、排序，还包括价格区间)
export function getSortStoreList(page,sort,startNum,endNum) {
    const url = 'http://1.rao87wen45yu.applinzi.com/person/php/sortStoreList.php'

    const data = Object.assign({}, {
        pageNum: page,
        sort,
        startNum,
        endNum
    })

  return jsonp(url, data, options)
}