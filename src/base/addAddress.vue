<template>
<el-form ref="form" :model="form" :rules="rules" label-width="80px" class="demo-ruleForm" v-show="showAddressForm">
    <el-form-item style="margin-left: -80px">
        <h3>新增地址</h3>
    </el-form-item>
    <el-form-item label="姓名" prop="peopleName">
        <el-input v-model="form.peopleName"></el-input>
    </el-form-item>
    <el-form-item label="配送地址" prop="address">
        <el-input v-model="form.address"></el-input>
    </el-form-item>
    <el-form-item label="电话号码" prop="phone">
        <el-input v-model.number="form.phone"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="submitForm('form')">确认</el-button>
        <el-button type="button" @click="cancel('form')">取消</el-button>
    </el-form-item>
</el-form>
</template>

<script>
import {addShopAddress} from 'api/addressList'
import {getCookie} from 'util/util'
import {ERR_OK} from 'api/config'

export default {
    data() {
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
        return {
            form: {
                peopleName: '',
                address: '',
                phone: ''
            },
            rules: {
                peopleName: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
                ],
                address: [
                    { required: true, message: '请输入地址', trigger: 'blur' },
                    { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur'}
                ],
                phone: [
                    { required: true, message: '电话号码不能为空', validator: checkPhone, trigger: 'blur' }
                ]
            }
        }
    },
    props: {
        showAddressForm: ""
    },
    methods: {
        submitForm(formName) {
            let that = this;
            var userId = getCookie('user_uid');
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    addShopAddress(userId,that.form.peopleName,that.form.address,that.form.phone).then((res) => {
                        if(res.code == ERR_OK) {
                            this.$emit('closeAddress');
                            this.$refs[formName].resetFields();
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        cancel(formName) {
            this.$refs[formName].resetFields();
            this.$emit('closeAddress');
        }
    }
}
</script>
