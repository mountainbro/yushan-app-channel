
<template>
    <el-row >
        <el-upload
                    ref="upload"
                    action='http://upload-z0.qiniu.com'

                   :on-success="handleSuccess"
                   :on-error="handleError"
                   :before-upload="beforeUpload"
                   :auto-upload="false"
                   :data='form'>
            <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        <!--<b>选择文件</b>：{{ fileName }}<br/>-->
        <!--<b>上传进度</b>：{{ loaded }} MB / {{ fileSize }} MB, {{ percent }}%<br/>-->
        <!--<b>上传结果</b>：{{ result }}<br/>-->
    </el-row>
</template>

<script>
    import { mapActions } from 'vuex';
    import {  getuptoken } from '@/api/acount';
    export default {
        data() {
            return {
// 上传
                form: {
                    token: '',
                    key: null
                },
//                fileName: '',
//                fileSize: '',
//                loaded: '',
//                percent: '',
// 获取token
                getuptoken(){
                    getuptoken().then(response => {
                        this.form.token = response;
                    }).catch(err => {
                        this.$message.error(err);
                    });
                },
            }
        },
        mounted() {
            this.getuptoken()
        },
        methods: {

// 上传
            beforeUpload (file) {
                this.fileName = file.name;
                this.form.key = file.name
            },
 //文件上传时 的钩子   :on-progress="handleProgress"
//            handleProgress (event) {
//                this.loaded = (event.loaded / 1000000).toFixed(2);
//                this.fileSize = (event.total / 1000000).toFixed(2);
//                this.percent = (event.loaded / event.total * 100).toFixed(2)
//            },
            submitUpload() {
                this.$refs.upload.submit();
            },
            handleSuccess (val) {
                this.$message({
                    message: '文件上传成功',
                    type: 'success'
                });
                 this.$emit('successupload',val);
//                this.result = '上传成功'
            },
            handleError (error) {
//                this.result = error.toString()
                this.$message.error('文件上传失败');
            },
        },
        destroyed() {
            // window.removeEventListener('hashchange', this.afterQRScan);
        }
//        props: ['customer_Data_type']
    }
</script>
<style rel="stylesheet/scss" lang="scss">

</style>
