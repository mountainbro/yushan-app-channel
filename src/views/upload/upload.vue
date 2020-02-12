
<template>
    <el-row style="display:inline-bloack;">
        <el-upload
                    ref="upload"
                    action='http://upload-z1.qiniup.com'
                    :on-progress="handleProgress"
                   :on-success="handleSuccess"
                   :on-error="handleError"
                   :before-upload="beforeUpload"
                   :auto-upload="false"
                   :data='form'>
            <el-button size="small" style="padding: 8px 20px" type="primary">点击上传</el-button>
        </el-upload>
        <b>上传进度</b>：{{ loaded }} MB / {{ fileSize }} MB, {{ percent }}%<br/>
    </el-row>
</template>

<script>
    import {  getuptoken } from '@/api/acount';
    export default {
        data() {
            return {
// 上传
                form: {
                    token: '',
                    key: null
                },
                fileName: '',
                fileSize: '',
                loaded: '',
                percent: '',
                result:'未上传',
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
                this.form.key = (new Date()).getTime() + file.name;
            },
 //文件上传时 的钩子
            handleProgress (event) {
                this.loaded = (event.loaded / 1000000).toFixed(2);
                this.fileSize = (event.total / 1000000).toFixed(2);
                this.percent = (event.loaded / event.total * 100).toFixed(2)
            },
            submitUpload() {
                if(this.$refs.upload.uploadFiles.length  == 0){
                    this.$message('请先上传文件夹');
                    this.$emit('upload');
                }
                this.$refs.upload.submit();
            },
            handleSuccess (val) {
                this.$message({
                    message: '文件上传成功',
                    type: 'success'
                });
                 this.$emit('successupload',val);
                this.$refs.upload.clearFiles();
                this.result = '上传成功'
            },
            handleError (error) {
                this.result = error.toString()
                this.$refs.upload.clearFiles();
                this.$message.error('文件上传失败，请重新提交');
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
