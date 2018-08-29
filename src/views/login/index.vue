
<template>
    <el-row  style="height: 100%;width: 100%; position: absolute;" class="login_Box">
        <img src="./img/web_login_bg.jpg" style="width: 100%;position: absolute;left: 0;right: 0;top: 0;bottom: 0;z-index: -1" alt="">
       <el-col :span="24" style="text-align: center;padding: 100px">
           <div  class="login" >
               <div class="message">
                   渠道管理系统-管理登录
               </div>
               <div id="darkbannerwrap"></div>
               <el-form :model="loginData" :rules="rules2" ref="loginData" label-position="left" label-width="0px" class="demo-ruleForm login-container">

                   <el-form-item prop="account" style=" margin-bottom: 15px;">
                       <el-input type="text" class="textInput" v-model="loginData.username" auto-complete="off" placeholder="账号" @change="acountInput"></el-input>
                   </el-form-item>
                   <el-form-item prop="checkPass" style=" margin-bottom:5px;">
                       <el-input type="password" class="textInput" v-model="loginData.password" auto-complete="off" placeholder="密码"></el-input>
                   </el-form-item>
                   <el-form-item style="width:100%;margin-top: 50px">
                       <el-button type="primary" style="width:100%;padding-top: 20px;padding-bottom: 20px;font-size: 16px" class="loginPull" @click.native.prevent="login"  >立刻登录</el-button>
                   </el-form-item>
               </el-form>
           </div>
       </el-col>
    </el-row>
</template>

<script>
    import { mapActions } from 'vuex';
    export default {
        data() {
            return {
                name:'',
                password:'',
                loginData: {
                    username:'',
                    password: '',
                    checked:true,
                },
                rules2: {
                    username: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                        //{ validator: validaePass }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        //{ validator: validaePass2 }
                    ]
                },
            }
        },
        mounted() {
        },
//        created(){
//            let _this = this;
//            document.onkeydown = function(e){
//                if(e.which == '13'){
//                    _this.login();
//                }
//            }
//        },
        methods: {
            ...mapActions([
                    'getLogin',
            ]),
            acountInput(){
                if(this.loginData.username == ""){
                    this.ruleForm2.password = '';
                }
            },
            login(){
                this.$message('正在登陆...');
                this.getLogin(this.loginData).then(response => {
                    if(response == 'true'){
                        this.$router.push({ name: '/acount' });

                    }else{
                        this.$notify.error({
                            title: '错误',
                            message: '账户或密码错误'
                        });
                    }
                });
            },
        },
        destroyed() {
            // window.removeEventListener('hashchange', this.afterQRScan);
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
.login_Box {
    .login {
        min-height: 420px;
        max-width: 420px;
        padding: 40px;
        background-color: #ffffff;
        margin-left: auto;
        margin-right: auto;
        border-radius: 4px;
        /* overflow-x: hidden; */
        box-sizing: border-box;
        .message {
            margin: 10px 0 0 -58px;
            padding: 18px 10px 18px 60px;
            background: #27A9E3;
            position: relative;
            color: #fff;
            font-size: 16px;
        }
        #darkbannerwrap {
            background: url(./img/aiwrap.png) no-repeat center;
            width: 18px;
            height: 10px;
            margin: 0 0 20px -58px;
            position: relative;
        }
        .textInput {
            margin-bottom: 10px;
            input{
                height: 50px!important;
                line-height: 50px!important;
            }
        }
    }
}
</style>
