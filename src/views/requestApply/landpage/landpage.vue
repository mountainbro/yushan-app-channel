<template>
    <el-row class="landpageBox">
        <el-row :gutter="20">
            <el-col :span="10">
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
                        <el-select style="width:300px;" :disabled="urlbol" size="mini" v-model="tuiguang.value2" filterable placeholder="请选择" @change="domainchange()">
                            <el-option
                                    v-for="item in urloptions"
                                    :key="item.id"
                                    :label="item.true_url"
                                    :value="item.iframeurl">
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
                        <upload style="float:left;margin-left:1em;" ref="child" @successupload='successupload'></upload>
                    </div>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="titles">标准合规页面样例</div>
                <div class="redinfo">注：需标准页面执行，否则不予上线</div>
            </el-col>
            <el-col :span="4">
                <!-- <div> {{}}+'dasdads'</div> -->
                <div class="phone">
                    
                    <iframe style="position:absolute; top:23px;width:259px;height:560px;left:0;right:0;margin:0 auto;" :src="tuiguang.value2" frameborder="0"></iframe>
                </div>
                
                <!-- <div class="phone">
                    <img class="logo" src="http://test.myushan.com//logo/black_zhiniao.png" alt="">
                    <div class="rules">
                        <h3>落地页规范</h3>
                        <p>1.严禁自动下载</p>
                        <p>2.严禁全屏下载</p>
                        <p>3.只有按钮点击下载</p>
                        <p>4.logo，版权清晰可见</p>
                    </div>
                    <div class="banquan">北京智鸟科技有限公司版权所有</div>
                </div> -->
            </el-col>
        </el-row>
        <div style="text-align:center;">
            <el-button size="mini" type="primary" @click="goTuiGuang()">确 定</el-button>
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
            tuiguang:{
                value:'',
                value1:'',
                value2:'',
                usrName:'',
                domain:'',
                coment:'',
                key:'',
            },
            companyoptions:[],
            zhanghuoptions:[],
            urloptions:[],
            urlrequest:[''],
            zhanghubol:true,
            urlbol:true,
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
                create_page_task({
                    account:this.tuiguang.value1,
                    domain:this.tuiguang.value1,
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
                    this.$emit('add_landpage');
                }).catch(err => {
                    this.$message.error(err);
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
        landpage_tab(){
            this.place_advertiser_list();
        },
    },
    methods:{
   
        //客户change
        kehuchange(){
            this.tuiguang.value1 = '';
            this.tuiguang.value2 = '';
            this.place_to_advertise()
            this.zhanghubol = false;
            
        },
        //账户change
        zhanghuchange(){
            this.tuiguang.value2 = '';
            this.place_account_domain();
            this.urlbol = false;
        },
        //账户change
        domainchange(){

        },
        //tab切换事件
        handleClick(){

        },
        //上传压缩包
        upsuccess(){

        },
        //上传change触发事件
        handleChange(){

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
            }
            this.zhanghubol = true;
            this.urlbol = true;
        },
        //上线推广
        goTuiGuang(){

            let _this =this;
            if(_this.tuiguang.value1&&_this.tuiguang.value&&_this.tuiguang.value2){
                this.$refs.child.submitUpload();
            }else{
                _this.$message.error('信息没有添加完成');
            }
        },
        successupload(val){
            this.$message('正在提交，请稍后');
            this.tuiguang.key = val.key;
            this.create_page_task()

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

