<template>
    <el-row class="requestapply" >
        <el-row :gutter="20">
            <el-col :span="10">
                <div class="main">
                    <!-- 新增需求 -->
                    <!-- <div class="titles">上传素材</div>    -->
                    <div class="lis" >
                        <span>选择客户：</span>
                        <el-select style="width:300px;" size="mini" v-model="tuiguang.value" filterable placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="lis" >
                        <span>选择账户：</span>
                        <el-select style="width:300px;" size="mini" v-model="tuiguang.value" filterable placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="lis" >
                        <span>二级域名：</span>
                        <el-select style="width:300px;" size="mini" v-model="tuiguang.value" filterable placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="lis" >
                        <span>详细需求：</span>
                        <el-input size="mini" v-model="tuiguang.coment"
                                  type="textarea"
                                  style=""
                                  :autosize="{ minRows: 2, maxRows: 4}"
                                  placeholder="请输入内容"></el-input>
                    </div>
                    <div class="lis" >
                        <span style="vertical-align: top;">上传素材包：</span>
                        <el-upload style="display: inline-block;" :on-success="upsuccess" class="upload-demo" action="/demand/uploadF" :on-change="handleChange">
                            <el-button size="mini" style="margin-left: 15px;" type="primary">选择上传文件</el-button>
                            <div slot="tip" style="margin-left: 15px;" class="el-upload__tip">只能上传zip文件</div>
                        </el-upload>
                    </div>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="titles">标准合规页面样例</div>
                <div class="redinfo">注：需标准页面执行，否则不予上线</div>
            </el-col>
            <el-col :span="4">

                <div class="phone">
                    <img class="logo" src="http://test.myushan.com//logo/black_zhiniao.png" alt="">
                    <div class="rules">
                        <h3>落地页规范</h3>
                        <p>1.严禁自动下载</p>
                        <p>2.严禁全屏下载</p>
                        <p>3.只有按钮点击下载</p>
                        <p>4.logo，版权清晰可见</p>

                    </div>
                    <div class="banquan">北京智鸟科技有限公司版权所有</div>
                </div>
            </el-col>

        </el-row>
        <div style="text-align:center;position:fixed;left:0;right:0;">
            <el-button size="mini" type="primary" @click="goTuiGuang">确 定</el-button>
            <el-button size="mini" @click="clear">清空内容</el-button>
        </div>
    </el-row>
</template>
<script>
import {mapGetters} from 'vuex';


export default {
    data() {
        return{
            tuiguang:{
                value:'',
                usrName:'',
                domain:'',
                coment:'',
            },
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            urlrequest:[''],
            defaultContent:'解析格式：\n产品名；前缀；主域；投放方式；客户ip地址',
        }
    },
    created(){

    },
    components: {
//            upload,

    },
    mounted(){

    },
    methods:{
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

        },
        //上线推广
        goTuiGuang(){

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
    }
}
</script>
<style lang="scss" scoped>
    @import "@/styles/table.scss";
    .requestapply {
       .main{
           .lis{
               padding: 12px 0  ;
               span{
                   display: inline-block;
                   width: 90px;
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
            width: 33vw;
            height: 59vh;
            background:  url(http://test.myushan.com/821phone.png) no-repeat ;
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
                padding-left:6vw;
                padding-top: 9vh;
                font-size: 14px;
            }
        }
        .titles{
            font-weight: 600;
            color: black;
        }
        .redinfo{
            font-size: 12px;
            color: #F56C6C;
        }
        .urljiexi{
            .addurl{
                text-align:left;
                cursor: pointer;
            }
        }
    }
</style>

