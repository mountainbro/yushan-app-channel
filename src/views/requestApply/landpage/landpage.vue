<template>
    <el-row class="landpageBox">
        <el-row >

            <el-col :span="24">
                <el-col :span="8">
                    <div class="main">
                        <!-- 新增需求 -->
                        <!-- <div class="titles">上传素材</div>    -->
                        <div class="lis" >
                            <span>选择客户：</span>
                            <el-select style="width:300px;" size="mini" v-model="tuiguang.value" filterable placeholder="请选择"  @change="kehuchange">
                                <el-option
                                        v-for="item in companyoptions"
                                        :key="item.id"
                                        :label="item.advertiser"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="lis" >
                            <span>选择账户：</span>
                            <el-select style="width:300px;" :disabled="zhanghubol" size="mini" v-model="tuiguang.value1" filterable placeholder="请选择" @change="zhanghuchange">
                                <el-option
                                        v-for="item in zhanghuoptions"
                                        :key="item.id"
                                        :label="item.a_users"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="lis" >
                            <span>二级域名：</span>
                            <el-select style="width:300px;" :disabled="urlbol" size="mini" v-model="iframeurl" filterable placeholder="请选择" @change="logo_change">
                                <el-option
                                        v-for="(item,key) in urloptions"
                                        :key="item.id"
                                        :label="item.true_url"
                                        :value="key">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="lis" >
                            <span>详细需求：</span>
                            <el-input size="mini" v-model="tuiguang.coment"
                                      type="textarea"
                                      style=""
                                      :autosize="{ minRows: 4, maxRows: 6}"
                                      placeholder="请输入内容"></el-input>
                        </div>
                        <div class="lis" >
                            <span style="float:left;"> 素材包：</span>
                            <upload @upload="upload" style="float:left;margin-left:1em;" ref="child" @successupload='successupload'></upload>
                        </div>
                    </div>
                </el-col>
                <el-col :span="16">
                    <el-col :span="12">
                        <div class="titles">标准合规页面样例</div>
                        <div class="redinfo">注：需标准页面执行，否则不予上线</div>
                        <div class="box_logo" v-if="logo_white !=''">
                            <div>
                                <img style="width: 80px" :src="logo_white" alt="">
                                <p style="font-size: 12px;    word-wrap: break-word; word-break: normal;">
                                    {{ logo_white}}
                                </p>
                            </div>
                            <div>
                                <img style="width: 80px" :src="logo_black" alt="">
                                <p style="font-size: 12px;    word-wrap: break-word; word-break: normal;">
                                    {{ logo_black}}
                                </p>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="12">
                </el-col>

                    <div class="phone">
                        <iframe style="position:absolute; top:23px;width:259px;height:560px;left:0;right:0;margin:0 auto;" :src="tuiguang.value2" frameborder="0"></iframe>
                    </div>
                </el-col>
            </el-col>

        </el-row>
        <div style="text-align:center;">
            <el-button size="mini"  type="primary" @click="goTuiGuang()">确 定</el-button>
            <el-button size="mini" @click="clear">清空内容</el-button>
        </div>
    </el-row>
</template>
<script>
import {mapGetters} from 'vuex';
import {  place_advertiser_list,place_to_advertise,place_account_domain,create_page_task } from '@/api/acount';
       import upload from '../../upload/upload';
export default {
    data() {
        return{
            logo_white:'',
            logo_black:'',
            tuiguang:{
                value:'',
                value1:'',
                value2:'',
                usrName:'',
                domain:'',
                coment:'',
                key:'',
            },
            iframeurl:'',
            companyoptions:[],
            zhanghuoptions:[],
            urloptions:[],
            urlrequest:[''],
            zhanghubol:true,
            urlbol:true,
            bol:false,
            defaultContent:'解析格式：\n产品名；前缀；主域；投放方式；客户ip地址',
            place_advertiser_list(){
                place_advertiser_list({
                }).then(response => {
                   this.companyoptions=response.data;
                   
                }).catch(err => {
                    this.$message.error(err);
                });
            },
            place_to_advertise(){
                place_to_advertise({
                    av_id:this.tuiguang.value
                }).then(response => {
                   this.zhanghuoptions=response.data.data;
                }).catch(err => {
                    this.$message.error(err);
                });
            },
            place_account_domain(){
                place_account_domain({
                    id:this.tuiguang.value1
                }).then(response => {
                   this.urloptions=response.data;
                }).catch(err => {
                    this.$message.error(err);
                });
            },
            create_page_task(){
                this.bol = true;
                create_page_task({
                    account:this.tuiguang.value1,
                    domain:this.tuiguang.domain,
                    zip_link:this.tuiguang.key,
                    submitusers:this.user.id,
                    note:this.tuiguang.coment,
                }).then(() => {
                    this.tuiguang ={
                        value:'',
                        value1:'',
                        value2:'',
                        usrName:'',
                        domain:'',
                        coment:'',
                        key:'',
                    }
                    this.$message.success('添加需求成功');
                    this.iframeurl = '';
                    this.$emit('add_landpage');
                    this.bol = false;
                }).catch(err => {
                    this.$message.error(err);
                    this.bol = false;
                });
            },
        }
    },
    created(){

    },
    components: {
           upload,

    },
    watch:{
        
    },
    methods:{
// 获取logo
        logo_change(val){
            if(this.urloptions[val].logourl[0]){
                this.logo_white = this.urloptions[val].logourl[0];
                this.logo_black = this.urloptions[val].logourl[1];
            }
            this.tuiguang.domain = this.urloptions[val].id;
            this.tuiguang.value2 = this.urloptions[val].iframeurl
        },
        //客户change
        kehuchange(){
            this.tuiguang.value1 = '';
            this.iframeurl = '';
            this.place_to_advertise()
            this.zhanghubol = false;
            
        },
        //账户change
        zhanghuchange(){
            this.iframeurl = '';
            this.place_account_domain();
            this.urlbol = false;
        },
        //清空需求内容
        clear(){
            this.tuiguang ={
                value:'',
                value1:'',
                value2:'',
                usrName:'',
                domain:'',
                coment:'',
                key:''
            }
            this.zhanghubol = true;
            this.urlbol = true;
            this.iframeurl = '';
            this.logo_white = '';
            this.logo_black = '';
        },
        //上线推广
        goTuiGuang(){
            this.bol = true;
            let _this =this;
            if(_this.tuiguang.value1&&_this.tuiguang.value&&_this.tuiguang.value2){
                this.$refs.child.submitUpload();
                
            }else{
                _this.$message.error('信息没有添加完成');
                this.bol = false;
            }
        },
        upload(){
            this.bol = false;
        },
        successupload(val){
            this.$message('正在提交，请稍后');
            this.tuiguang.key = val.key;
            this.create_page_task();
            this.bol = false;

        },
        //添加url解析
        addurlEvent(){
            this.urlrequest.push('');
        },
        /* 二级域名解析 */
        gojiexi(){

        },
        /* 历史申请中用到的 方法 */
        searchinfo1(){

        },
    },
    computed:{
        ...mapGetters([
            'user',
        ])
    },
    props: ['landpage_tab']
}
</script>
<style lang="scss" scoped>
    @import "@/styles/table.scss";
    .landpageBox {
        .titles{
            font-weight: 600;
            color: black;
        }
        .redinfo{
            font-size: 12px;
            color: #F56C6C;
        }
        .box_logo {
            width:100%;
            border:1px dashed orangered;
            background: #bac6d8;
            margin-top: 50px;
            border-radius: 15px;
            padding: 20px;
        }
        .main{
            .lis{
                padding: 12px 0  ;
                span{
                    display: inline-block;
                    //    width: 90px;
                    font-size: 14px;
                }
                .el-input,.el-textarea{
                    vertical-align: top!important;
                    display: inline-block;
                    width:290px!important;
                }

                .el-select__caret{
                    line-height: 28px!important;
                }

            }

        }
        .phone{
            position: relative;
            width: 300px;
            height: 610px;
            background:  url(http://test.myushan.com/8231phones.png) no-repeat ;
            background-size: 100% 100%;
            float: right;
            .logo{
                position: absolute;
                width: 10%;
                top: 7vh;
                left: 6vw;
            }
            .banquan{
                position: absolute;
                left: 0;
                right: 0;
                font-size: 12px;
                /* text-align: center; */
                bottom: 18vh;
                transform: scale(0.7);
                -webkit-transform: scale(0.7);
                margin-left: 3vw;
            }
            .rules{
                width: 12vw;
                padding-left:6vw;
                padding-top: 9vh;
                font-size: 12px;
                line-height: 19px;
                letter-spacing: 1px;
            }
        }
    }
</style>

