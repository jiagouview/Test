<template>
    <div>
      <nav-header></nav-header>
      <div class="container">
        <div class="page-title-normal">
          <h2 class="page-title-h2"><span>提交成功</span></h2>
        </div>
        <!-- 进度条 -->
        <div class="check-step">
          <ul>
              <li class="cur"><span>确认地址</span></li>
              <li class="cur"><span>查看您的订单</span></li>
              <li class="cur"><span>付款</span></li>
              <li class="cur"><span>提交订单</span></li>
          </ul>
        </div>

        <div class="order-create">
          <div class="order-create-pic"><img src="../assets/ok-2.png" alt=""></div>
          <div class="order-create-main">
            <h3>恭喜! <br>您的订单正在处理中!</h3>
            <p>
              <span>订单编号：6200000000{{orderId}}</span>
              <span>订单总额：{{money}}</span>
            </p>
            <div class="order-create-btn-wrap">
              <div class="btn-l-wrap">
                <a class="btn btn--m" @click="back">购物车列表</a>
              </div>
              <div class="btn-r-wrap">
                <a class="btn btn--m" @click="goHomePage">商品列表</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav-footer></nav-footer>
    </div>
</template>
<script>
import NavHeader from '@/components/Header.vue'
import NavFooter from '@/components/Footer.vue'

export default{
    data(){
        return{
            orderId: '',
            money: ''
        }
    },
    mounted() {
        this.getStateParams()
    },
    methods: {
        getStateParams() {
            this.orderId = this.$route.params.orderId;
            this.money = this.$route.params.money;
        },
        back() {
            this.$router.push({
                path:'/cart'
            })
        },
        goHomePage() {
            this.$router.push({
                path:'/'
            })
        }
    },
    components: {
        NavHeader,
        NavFooter
    }
}
</script>
