<template>
<div>
    <nav-header></nav-header>
    <nav-bread><span slot="bread">商城</span></nav-bread>
    <div class="accessory-result-page accessory-page">
        <div class="container">
            <div class="filter-nav">
                <span class="sortby">价格排序:</span>
                <a href="javascript:void(0)" class="default" :class="{'cur': sortFlag == 0}" @click="sortGoods(0)" >价格升序</a>
                <a href="javascript:void(0)" class="price" :class="{'cur': sortFlag == 1}" @click="sortGoods(1)">
                    价格降序
                    <svg class="icon icon-arrow-short"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-arrow-short"></use></svg>
                </a>
                <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">排序</a>
            </div>
            <div class="accessory-result">
                <!-- filter -->
                <div class="filter stopPop" id="filter" :class="{'filterby-show': filterBy}">
                    <dl class="filter-price">
                        <dt>价格:</dt>
                        <dd @click="setPriceFilter('all')"><a href="javascript:void(0)" :class="{'cur': 'all' == priceChecked}">All</a></dd>
                        <dd v-for="(price, index) in priceFilter" @click="setPriceFilter(index,price)">
                            <a href="javascript:void(0)" :class="{'cur': index == priceChecked}">{{price.startPrice}} - {{price.endPrice}}</a>
                        </dd>
                    </dl>
                </div>
                <!-- search result accessories list -->
                <div class="accessory-list-wrap">
                    <div class="accessory-list col-4">
                        <ul>
                            <li v-for="(item, index) in goodsList">
                                <div class="pic">
                                    <a href="#"><img v-lazy="'/static/'+item.img" alt=""></a>
                                </div>
                                <div class="main">
                                    <div class="name">{{item.name}}</div>
                                    <div class="price">{{item.price}}</div>
                                    <div class="btn-area">
                                    <a href="javascript:;" class="btn btn--m" @click="addGoods(item.did)">加入购物车</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <el-pagination
                            v-show="goodsTotal > 0"
                            layout="prev, pager, next, jumper"
                            :total="goodsTotal"
                            :current-page="currentPage"
                            @current-change="getGoodsList"
                        >
                        </el-pagination>
                    </div>
                    <div class="none-wrap"v-show="goodsTotal == 0">
                        抱歉还没有数据额！
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
    import './../assets/css/base.css'
    import './../assets/css/product.css'
    // import './../assets/css/checkout.css'
    import NavHeader from 'components/Header.vue'
    import NavFooter from 'components/Footer.vue'
    import NavBread from 'components/NavBread.vue'
    import Pop from 'base/pop'
    import {addStoreCart, getSortStoreList} from 'api/goodsList'
    import {getCartList} from 'api/cartList'
    import axios from 'axios'
    import {ERR_OK} from 'api/config'
    import {getCookie} from 'util/util'

    export default{
        data(){
            return {
                goodsList: [],
                goodsTotal: 0,
                currentPage: 1,
                startPrice: 0,
                endPrice: 2000,
                priceFilter: [
                    {
                        startPrice: '0.00',
                        endPrice: '500.00'
                    },
                    {
                        startPrice: '500.00',
                        endPrice: '1000.00'
                    },
                    {
                        startPrice: '1000.00',
                        endPrice: '2000.00'
                    }
                ],
                priceChecked: 'all',
                filterBy: false,
                overLayFlag: false,
                sortFlag: 0,
                showPop: false,
                popText:''
            }
        },
        components: {
            NavHeader,
            NavFooter,
            NavBread,
            Pop
        },
        mounted() {
            this.getGoodsList(1)
        },
        methods: {
            // 获取商品列表
            getGoodsList(page){
                this.currentPage = page;
                let sort = this.sortFlag;
                let startPrice = this.startPrice;
                let endPrice = this.endPrice;
                getSortStoreList(page, sort, startPrice, endPrice).then((res) => {
                    if(res.code == ERR_OK) {
                        this.goodsList = res.data
                        this.goodsTotal = res.recordCount
                    }
                })
            },
            // 添加商品到购物车
            addGoods(pid){
                let uid = getCookie('user_uid');
                addStoreCart(uid,pid).then((res) => {
                    if(res.code == ERR_OK) {
                        this.popText = "加入成功";
                        this.showPop = true;
                        this._getCartList();
                    }
                })
            },
            // 设置当前商品排序
            setPriceFilter(index,item) {
                this.priceChecked = index
                if(this.priceChecked == "all") {
                    this.startPrice = 0;
                    this.endPrice = 2000;
                }else {
                    this.startPrice = item.startPrice;
                    this.endPrice = item.endPrice;
                }
                this.getGoodsList(1);
                this.filterBy = false
                this.overLayFlag = false
            },
            // 设置当前商品排序
            showFilterPop() {
                this.filterBy = true
                this.overLayFlag = true
            },
            // 获取购物车里面的数量
            _getCartList() {
                var userId = getCookie('user_uid');
                getCartList(userId).then((res) => {
                    if(res.code == ERR_OK) {
                        let storeList = res.data;
                        let totalCount = 0;
                        storeList.forEach((item) => {
                            totalCount += parseInt(item.count);
                        })
                        this.$store.commit("initCartCount",totalCount);
                    }
                })
            },
            closePop() {
                this.filterBy = false
                this.overLayFlag = false
            },
            // 商品排序
            sortGoods(value) {
                this.sortFlag = value;
                this.getGoodsList(1);
            },
            // 隐藏弹出信息框
            closeChildDialog() {
                this.showPop = false;
            }
        }
    }
</script>
