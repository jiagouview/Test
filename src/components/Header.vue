<template>
<header class="header">
    <symbol id="icon-cart" viewBox="0 0 38 32">
        <title>cart</title>
        <path class="path1" d="M37.759 0h-4.133c-0.733 0.004-1.337 0.549-1.434 1.255l-0.546 4.342c-0.081 0.484-0.496 0.849-0.997 0.849-0.005 0-0.009-0-0.014-0h-27.604c-0.003 0-0.007-0-0.011-0-1.674 0-3.031 1.357-3.031 3.031 0 0.34 0.056 0.666 0.159 0.971l2.52 8.062c0.385 1.194 1.486 2.043 2.785 2.043 0.126 0 0.25-0.008 0.372-0.023l22.983 0.002c0.515 0.131 0.626 0.768 0.626 1.283 0.005 0.044 0.009 0.095 0.009 0.146 0 0.501-0.294 0.933-0.718 1.134l-22.439 0.003c-0.354 0-0.642 0.287-0.642 0.642s0.287 0.642 0.642 0.642h22.745l0.131-0.071c0.919-0.392 1.551-1.287 1.551-2.33 0-0.058-0.002-0.116-0.006-0.173 0.021-0.108 0.033-0.24 0.033-0.376 0-1.072-0.732-1.973-1.724-2.23l-23.357-0.004c-0.063 0.008-0.135 0.013-0.209 0.013-0.719 0-1.332-0.455-1.566-1.093l-2.53-8.095c-0.048-0.154-0.076-0.332-0.076-0.515 0-0.973 0.782-1.764 1.752-1.778h27.657c1.159-0.004 2.112-0.883 2.232-2.011l0.547-4.345c0.010-0.083 0.078-0.147 0.161-0.152l4.133-0c0.354 0 0.642-0.287 0.642-0.642s-0.287-0.642-0.642-0.642z"></path>
        <path class="path2" d="M31.323 9.69c-0.022-0.003-0.048-0.004-0.074-0.004-0.328 0-0.598 0.248-0.633 0.567l-0.809 7.268c-0.003 0.022-0.004 0.048-0.004 0.074 0 0.328 0.248 0.598 0.567 0.633l0.074 0c0.001 0 0.003 0 0.004 0 0.327 0 0.596-0.246 0.632-0.563l0.809-7.268c0.003-0.022 0.004-0.048 0.004-0.074 0-0.328-0.248-0.598-0.567-0.633z"></path>
        <path class="path3" d="M27.514 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM27.514 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
        <path class="path4" d="M9.599 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM9.599 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
    </symbol>
    <div class="navbar">
        <div class="navbar-left-container">
            <a href="/" style="padding-top: 8px">
                <img class="navbar-brand-logo" src="/static/logo1.jpg">
            </a>
        </div>
        <div class="navbar-right-container" style="display: flex;">
            <div class="navbar-menu-container">
                <!--<a href="/" class="navbar-link">我的账户</a>-->
                <span v-show="userName" class="navbar-link">{{userName}}，欢迎回来</span>
                <a v-show="!userName" href="javascript:void(0)" class="navbar-link" @click="loginIn">登录</a>
                <a v-show="!userName" href="javascript:void(0)" class="navbar-link" @click="registerIn">注册</a>
                <a v-show="userName" href="javascript:void(0)" class="navbar-link" @click="loginOut">退出</a>
                <div class="navbar-cart-container">
                    <span class="navbar-cart-count" v-show="cartCount > 0">{{cartCount}}</span>
                    <a class="navbar-link navbar-cart-link" @click="goCart">
                        <svg class="navbar-cart-logo">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart"></use>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </div>
    <el-form ref="formData" :model="formData" :rules="loginRules" label-width="80px" v-show="showLog">
        <el-form-item style="margin-left:-80px;">
            <h4>登录</h4>
        </el-form-item>
        <el-form-item label="姓名" prop="uname">
            <el-input v-model="formData.uname"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="upwd">
            <el-input v-model="formData.upwd" type="password"></el-input>
        </el-form-item>
        <el-form-item style="margin-left:-80px;">
            <el-button type="primary" @click="onSubmit">登录</el-button>
            <el-button @click="showLog = false">取消</el-button>
        </el-form-item>
    </el-form>
    <el-form ref="registerForm" class="registerForm" :rules="registerRules" :model="registerFormData" label-width="96px" v-show="showRegisterLog">
        <el-form-item style="margin-left:-80px;">
            <h4>注册</h4>
        </el-form-item>
        <el-form-item label="姓名" prop="uname">
            <el-input v-model="registerFormData.uname"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="upwd">
            <el-input v-model="registerFormData.upwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="再次输入密码" prop="otherUpwd">
            <el-input v-model="registerFormData.otherUpwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
            <el-input v-model="registerFormData.phone" type="number"></el-input>
        </el-form-item>
        <el-form-item style="margin-left:-80px;">
            <el-button type="primary" @click="onRegister">注册</el-button>
            <el-button @click="resetForm">取消</el-button>
        </el-form-item>
    </el-form>
    <pop :text="popText" :showDialog="showPop" @closePop="closeChildDialog"></pop>
</header>
</template>

<script>
import './../assets/css/login.css'
import {getUserMessage, registerUser} from 'api/login'
import Pop from 'base/pop'
import {setCookie,delCookie,getCookie} from 'util/util'
import {getCartList} from 'api/cartList'
import axios from 'axios'
import {ERR_OK} from 'api/config'
import {mapState} from 'vuex'

export default {
    data() {
        // 用户名验证规则
        var checkName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('姓名不能为空'));
            }else {
                callback();
            }
        };
        // 电话号码验证规则
        var checkPhone = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('电话号码不能为空'));
            }
            setTimeout(() => {
                value = parseInt(value)
                if (!Number.isInteger(value)) {
                    callback(new Error('请输入数字值'));
                } else {
                    // 获取电话号码的长度
                    let num = value.toString();
                    if (num.length != 11) {
                        callback(new Error('请输入11位电话号码'));
                    } else {
                        callback();
                    }
                }
            }, 1000);
        };
        // 注册时密码验证规则
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else if(this.registerFormData.upwd.length < 6 || this.registerFormData.upwd.length > 18) {
                callback(new Error('密码在6-18位之间'));
            }else {
                callback();
            }
        };
        // 注册时重复密码验证规则
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.registerFormData.upwd) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        // 登录时密码验证规则
        var validateLoginPass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else if(this.formData.upwd.length < 6 || this.formData.upwd.length > 18) {
                callback(new Error('密码在6-18位之间'));
            }else {
                callback();
            }
        };
        return {
            formData: {
                uname: '',
                upwd: ''
            },
            registerFormData: {
                uname: '',
                upwd: '',
                otherUpwd: '',
                phone: ''
            },
            showLog: false,
            showPop: false,
            showRegisterLog: false,
            popText: '您输入的用户名或密码不正确',
            registerRules: {
                uname: [
                    { validator: checkName, trigger: 'blur' }
                ],
                upwd: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                otherUpwd: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                phone: [
                    { validator: checkPhone, trigger: 'blur' }
                ]
            },
            loginRules: {
                uname: [
                    { validator: checkName, trigger: 'blur' }
                ],
                upwd: [
                    { validator: validateLoginPass, trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        // 相当于下面2个语句
        ...mapState(['userName','cartCount'])
        // userName() {
        //     return this.$store.state.userName;
        // },
        // cartCount() {
        //     return this.$store.state.cartCount
        // }
    },
    mounted() {
        this._getCartList()
    },
    methods: {
        // 登录
        onSubmit() {
            this.$refs.formData.validate((valid) => {
                if (valid) {
                    getUserMessage(this.formData).then((res) => {
                        this.showLog = false;
                        if(res.code == ERR_OK) {
                            this.$store.commit("updateUserInfo",this.formData.uname);
                            delCookie('user_name');
                            delCookie('user_upwd');
                            delCookie('user_uid');
                            setCookie('user_name',this.formData.uname,1);
                            setCookie('user_upwd',this.formData.upwd,1);
                            setCookie('user_uid',res.uid,1);
                            this._getCartList();
                            this.popText = '登录成功';
                            this.$router.push({
                                path:'/'
                            })
                        }else {
                            this.popText = '您输入的用户名或密码不正确';
                        }
                        this.showPop = true;
                    })
                } else {
                    console.log('error submit!!');
                }
            });
        },
        // 跳转到购物车
        goCart() {
            var userId = getCookie('user_uid');
            if(userId == "" || userId == undefined) {
                this.popText = '请登录';
                this.showPop = true;
                return
            }
            this.$router.push({
                path:'/cart'
            })
        },
        // 隐藏弹出信息框
        closeChildDialog() {
            this.showPop = false;
        },
        // 弹出登录框
        loginIn() {
            this.showLog = true;
        },
        // 退出登录
        loginOut() {
            delCookie('user_name');
            delCookie('user_upwd');
            delCookie('user_uid');
            this.$store.commit("updateUserInfo","");
            this.$store.commit("initCartCount",0);
            this.popText = '退出成功';
            this.showPop = true;
            this.$router.push({
                path:'/'
            })
        },
        // 弹出注册框
        registerIn() {
            this.showRegisterLog = true;
        },
        // 注册
        onRegister() {
            this.$refs.registerForm.validate((valid) => {
                if (valid) {
                    registerUser(this.registerFormData).then((res) => {
                        this.showRegisterLog = false;
                        if(res.code == ERR_OK) {
                            // 清空表单数据
                            this.$refs.registerForm.resetFields();
                            this.$store.commit("updateUserInfo",this.registerFormData.uname);
                            delCookie('user_name');
                            delCookie('user_upwd');
                            delCookie('user_uid');
                            setCookie('user_name',this.registerFormData.uname,1);
                            setCookie('user_upwd',this.registerFormData.upwd,1);
                            setCookie('user_uid',res.uid,1);
                            this.popText = '注册成功';
                        }else if(res.code == 1) {
                            this.popText = '您已经注册,请直接登录,用户名为：'+res.data;
                            this.$refs.registerForm.resetFields();
                        }else {
                            this.popText = '注册失败';
                        }
                        this.showPop = true;
                    })
                } else {
                    console.log('error submit!!');
                }
            });
        },
        resetForm() {
            // 清空表单数据
            this.$refs.registerForm.resetFields();
            this.showRegisterLog = false;
        },
        // 获取购物车里面的数量以及用户姓名
        _getCartList() {
            var userId = getCookie('user_uid');
            var userName = getCookie('user_name');
            this.$store.commit("updateUserInfo",userName);
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
        }
    },
    components: {
        Pop
    }
}
</script>

<style>

</style>
