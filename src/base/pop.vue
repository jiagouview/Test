<template>
    <el-dialog
        title="提示"
        :visible="showDialog"
        size="tiny"
    >
        <span>{{text}}</span>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="closeDialog">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    props: {
        text: '',
        showDialog: false
    },
    methods: {
        closeDialog() {
            // 子组件要想改父组件的数据，1：父组件可以传一个数组，2：mounted拿个数据接到父组件传过来的数据,只是不报错，不能同步,3：$emit
           this.$emit('closePop');
        }
    }
}
</script>


