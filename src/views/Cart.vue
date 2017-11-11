<template>
  <div>
    <nav-header></nav-header>
    <nav-bread><span slot="bread">我的购物车</span></nav-bread>
    <div class="container">
      <div class="cart">
        <div class="page-title-normal">
          <h2 class="page-title-h2"><span>我的购物车</span></h2>
        </div>
        <div class="item-list-wrap">
          <div class="cart-item">
            <div class="cart-item-head">
              <ul>
                <li>商品</li>
                <li>价格</li>
                <li>数量</li>
                <li>总金额</li>
                <li>编辑</li>
              </ul>
            </div>
            <ul class="cart-item-list">
              <li v-for="(item, index) in cartList">
                <div class="cart-tab-1">
                  <div class="cart-item-check">
                    <a @click="checkGoods(item)" href="javaScript:;" class="checkbox-btn item-check-btn" :class="{'check':item.checked == 1}">
                      <svg class="icon icon-ok">
                        <use xlink:href="#icon-ok"></use>
                      </svg>
                    </a>
                  </div>
                  <div class="cart-item-pic">
                    <img v-lazy="'../assets/'+item.products[0].img">
                  </div>
                  <div class="cart-item-title">
                    <div class="item-name">{{item.products[0].name}}</div>
                  </div>
                </div>
                <div class="cart-tab-2">
                  <div class="item-price">{{item.products[0].price}}</div>
                </div>
                <div class="cart-tab-3">
                  <div class="item-quantity">
                    <div class="select-self select-self-open">
                      <div class="select-self-area">
                        <a class="input-sub" @click="_deleteGoods(item.productId)">-</a>
                        <span class="select-ipt">{{item.count}}</span>
                        <a class="input-add" @click="addGoods(item.productId)">+</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="cart-tab-4">
                  <div class="item-price-total">{{item.products[0].price * item.count}}</div>
                </div>
                <div class="cart-tab-5">
                  <div class="cart-item-opration">
                    <a href="javascript:;" class="item-edit-btn" @click="_deleteSingerGoods(item.productId)">
                        删除
                      <!-- <svg class="icon icon-del">
                        <use xlink:href="#icon-del"></use>
                      </svg> -->
                    </a>
                  </div>
                </div>
              </li>
            </ul>
            <!-- <el-pagination
                layout="prev, pager, next, jumper"
                :total="goodsTotal"
                :current-page="currentPage"
                :page-size="pageSize"
                @current-change="_getCartList"
            >
            </el-pagination> -->
            <div class="none-wrap"v-show="goodsTotal == 0">
                抱歉还没有数据额！
            </div>
          </div>
        </div>
        <div class="cart-foot-wrap">
          <div class="cart-foot-inner">
            <div class="cart-foot-l">
              <div class="item-all-check">
                <a href="javascript:;" @click="checkAllGoods()">
                  <span class="checkbox-btn item-check-btn" :class="{'check':checkAll == true}">
                      <svg class="icon icon-ok"><use xlink:href="#icon-ok"/></svg>
                  </span>
                  <span>选择所有</span>
                </a>
              </div>
            </div>
            <div class="cart-foot-r">
              <div class="item-total">
                总价: <span class="total-price">{{totalMoney}}</span>
              </div>
              <div class="btn-wrap">
                <a class="btn btn--red" @click="_addOrder">确  定</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <pop :text="popText" :showDialog="showPop" @closePop="closeChildDialog"></pop>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
    import './../assets/css/checkout.css'
    import NavHeader from '@/components/Header.vue'
    import NavFooter from '@/components/Footer.vue'
    import NavBread from '@/components/NavBread.vue'
    import Pop from 'base/pop'
    import {getCartList, deleteGoods, updateStoreCart, deleteSingerGoods} from 'api/cartList'
    import {addStoreCart} from 'api/goodsList'
    import {addOrder} from 'api/orderList'
    import {getCookie} from 'util/util'
    import {ERR_OK} from 'api/config'

    export default{
        data(){
            return{
                cartList: [],
                popText: '',
                showPop: false,
                goodsTotal: 0,
                currentPage: 1,
                pageSize: 10,
                checkAll: true,
                userId: ''
            }
        },
        computed: {
            totalMoney() {
                let total = 0;
                this.cartList.forEach(function(item){
                    if(item.checked == 1) {
                        total += item.products[0].price * item.count
                    }
                })
                return total
            }
        },
        mounted(){
            this._getCartList()
        },
        methods: {
            // 跳转到地址页
            checkOut() {
                this.$router.push({
                    path:'/address'
                })
            },
            // 获取购物车列表
            _getCartList() {
                // 获取userId
                this.userId = getCookie('user_uid');
                getCartList(this.userId).then((res) => {
                    if(res.code == ERR_OK) {
                        this.cartList = res.data;
                        this.goodsTotal = res.recordCount;
                        // this.pageSize = res.pageSize;
                        // 获取选中状态
                        let showCheckAll = 0;
                        this.cartList.forEach(function(item){
                            if(item.checked == 1) {
                                showCheckAll++;
                            }
                        })
                        if(showCheckAll == this.goodsTotal) {
                            this.checkAll = true;
                        }else {
                            this.checkAll = false;
                        }
                        // 获取商品新数量
                        let storeList = res.data;
                        let totalCount = 0;
                        storeList.forEach((item) => {
                            totalCount += parseInt(item.count);
                        })
                        this.$store.commit("initCartCount",totalCount);
                    }
                })
            },
            // 添加商品到购物车
            addGoods(pid){
                addStoreCart(this.userId,pid).then((res) => {
                    if(res.code == ERR_OK) {
                        this._getCartList();
                        // this.$store.commit("updateCartCount", 1);
                    }
                })
            },
            // 从购物车一件一件删除商品
            _deleteGoods(pid){
                deleteGoods(this.userId,pid).then((res) => {
                    if(res.code == ERR_OK) {
                        this._getCartList()
                        // this.$store.commit("updateCartCount", -1);
                    }
                })
            },
            // 一次性删除商品
            _deleteSingerGoods(pid) {
                deleteSingerGoods(this.userId,pid).then((res) => {
                    if(res.code == ERR_OK) {
                        this._getCartList()
                    }
                }) 
            },
            // 点击更改商品状态
            checkGoods(item) {
                if(item.checked == 1) {
                    item.checked = 0
                }else {
                    item.checked = 1
                }
                updateStoreCart(this.userId,item.productId,item.checked).then((res) => {
                    if(res.code == ERR_OK) {
                        this._getCartList()
                    }
                })
            },
            // 更换所有商品状态选中
            checkAllGoods() {
                let that = this
                if(this.checkAll == true) {
                    this.checkAll = false;
                    this.cartList.forEach(function(item){
                        updateStoreCart(this.userId,item.productId,0).then((res) => {
                            if(res.code == ERR_OK) {
                                that._getCartList()
                            }
                        })
                    })
                }else {
                    this.checkAll = true;
                    this.cartList.forEach(function(item){
                        updateStoreCart(this.userId,item.productId,1).then((res) => {
                            if(res.code == ERR_OK) {
                                that._getCartList()
                            }
                        })
                    })
                }
                
            },
            // 确认订单
            _addOrder() {
                let userId = this.userId
                this.cartList.forEach(function(item){
                    if(item.checked == 1) {
                        addOrder(userId,item.productId,item.count).then((res) => {
                            if(res.code == ERR_OK) {
                                // 什么都不做
                            }
                        })
                    }
                })
                // 跳转到地址详情页
                this.$router.push({
                    path:'/address'
                })
            },
            closeChildDialog() {
                this.showPop = false
            }
        },
        components: {
            NavHeader,
            NavFooter,
            NavBread,
            Pop
        }
    }
</script>

<style>
  .input-sub,.input-add{
    min-width: 40px;
    height: 100%;
    border: 0;
    color: #605F5F;
    text-align: center;
    font-size: 16px;
    overflow: hidden;
    display: inline-block;
    background: #f0f0f0;
  }
  .item-quantity .select-self-area{
    background:none;
    border: 1px solid #f0f0f0;
  }
  .item-quantity .select-self-area .select-ipt{
    display: inline-block;
    padding:0 3px;
    width: 30px;
    min-width: 30px;
    text-align: center;
  }
</style>