<template>
    <el-row class="requestapply" >
        <el-tabs type="card"  v-model="activeName" @tab-click="handleClick()">
            <el-tab-pane label="二级域名解析" class="tab_top" name="second">
                <div class="menu" >
                    <el-row :gutter="20" class="urljiexi" >
                    <el-col :span="10" style="min-width:370px;">
                        <div class="main"> 

                            <div class="lis" >
                                <span>选择客户：</span>
                                <el-select style="min-width:290px;" size="mini" v-model="tuiguang.value" filterable placeholder="请选择">
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
                                <el-select style="min-width:290px;" size="mini" v-model="tuiguang.value" filterable placeholder="请选择">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>

                        </div>
                    </el-col>
                    <el-col :span="14" style="min-width:470px;">
                        <div v-for="(item,index) in urlrequest" :key="index" style="padding: 6px 0;" >
                            
                            <span style="vertical-align:center;">{{index+1}} 解析需求备注：</span>
                            <el-input  size="mini" v-model="tuiguang.coment" 
                            type="textarea"
                            style="margin-left:1em;width:350px;vertical-align:middle;"
                            :autosize="{ minRows: 2, maxRows: 4}"
                            :placeholder="defaultContent">
                            </el-input>
                        </div>
                        <div class="addurl" style="" @click="addurlEvent">
                            <i  style="color: red;
                            font-size: 50px;
                            margin: 5px auto;
                            vertical-align:middle;" 
                            class="el-icon-circle-plus">
                            </i>
                            <span>添加解析数量</span>
                        </div>
                    </el-col>
                    
                </el-row>
                <div style="text-align:center;">
                    <el-button size="mini" type="primary" @click="gojiexi">确 定</el-button>
                    <el-button size="mini" @click="clear">清空内容</el-button>
                </div>
                </div>
            </el-tab-pane>
            <el-tab-pane  label="上线推广页面" class="tab_top" name="first">
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
            </el-tab-pane>
            
            <el-tab-pane label="历史申请" class="tab_top" name="third">
                <div class="hio">
                    <!-- 切换table列表 -->
                    <div>
                        <el-radio-group v-model="chooseData" >
                            <el-radio-button label="urlData">二级域名</el-radio-button>
                            <el-radio-button label="luodiData">落地页</el-radio-button>
                        </el-radio-group>
                    </div>
                    <!-- 搜索框 -->
                    <search @searchChange="searchChange" @acountChange="acountChange"></search>
                    <!-- 表格数据展示 -->
                    <el-col :span="24">
                        <el-table
                                v-loading="tableshow"
                                :data="tableData1"
                                class="vue-table"
                                height="550"
                                border
                                @sort-change="sortTable"  >
                            <el-table-column
                                    prop="sub_date"
                                    label="时间"
                                    sortable='custom'>
                                <template slot-scope="scope">
                                    {{scope.row.ctime | filterDate}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="客户">
                                <template slot-scope="scope">
                                    <span>{{scope.row.advertiser||"空"}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="帐户" >
                                <template slot-scope="scope">
                                    <span>{{scope.row.a_users||"空"}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="true_url"
                                    label="域名">
                                <template slot-scope="scope">
                                    <el-alert
                                            :title="scope.row.true_url"
                                            :type="scope.row.true_url"
                                            :closable="false"
                                            style="background-color: transparent;"
                                            show-icon>
                                    </el-alert>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="进度" >
                                <template slot-scope="scope">
                                    <span v-if="scope.row.is_ultimate_shenhe == 0">处理中...</span>
                                    <span v-if="scope.row.is_ultimate_shenhe == 1">已完成</span>
                                    <span v-if="scope.row.audit == 2 && scope.row.is_ultimate_shenhe == 0">驳回</span>
                                </template>
                            </el-table-column>

                            <el-table-column
                                    label="审核状态">
                                <template slot-scope="scope">
                                    <state :stateData=scope.row ></state>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="操作">
                                <template slot-scope="scope">
                                    <span @click="look_infor(scope.row)">查看</span>
                                </template>
                            </el-table-column>

                        </el-table>
                        <!-- 分页 -->
                        <div class="block">
                            <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="pageIndex"
                                    :page-sizes="[ 20, 30,40]"
                                    :page-size="pageSize"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="kehuTableLength"
                                    style='text-align: right;'>
                            </el-pagination>
                        </div>
                    </el-col>


                    <!-- 新增需求 -->
                    <el-dialog title="需求详情"  :visible.sync="jiexiBol"  :close-on-click-modal="false" @close="jiexiBol = false"  >
                        <el-row v-for="item in shenheInfor">
                            <el-col :span="24" >
                               <el-col :span="4">
                                   提交人:
                               </el-col>
                                <el-col :span="20">
                                    {{item.name}}
                                </el-col>
                            </el-col>
                            <el-col :span="24" >
                                <el-col :span="4">
                                    客户:
                                </el-col>
                                <el-col :span="20">
                                    {{item.advertiser}}
                                </el-col>
                            </el-col>
                            <el-col :span="24" >
                                <el-col :span="4">
                                    账户:
                                </el-col>
                                <el-col :span="20">
                                    {{item.a_users}}
                                </el-col>
                            </el-col>
                            <el-col :span="24" >
                                <el-col :span="4">
                                    解析备注:
                                </el-col>
                                <el-col :span="20">
                                    {{item.note}}
                                </el-col>
                            </el-col>
                            <el-col :span="24" >
                                <el-col :span="4">
                                    审核:
                                </el-col>
                                <el-col :span="20">
                                    <el-radio-group v-model="shenhe_radio">
                                        <el-radio :label="1">通过</el-radio>
                                        <el-radio :label="2">驳回</el-radio>
                                    </el-radio-group>
                                </el-col>
                            </el-col>
                            <el-col :span="24" v-if="shenheInfor[0].audit_count == 1 && shenheInfor[0].audit == 1 && shenhe_radio == 1" >
                                <el-col :span="4">
                                    域名:
                                </el-col>
                                <el-col :span="20">
                                   <el-input v-model="yuming_text" ></el-input>
                                </el-col>
                            </el-col>
                            <el-col :span="24" v-if="shenheInfor[0].audit_count == 1 && shenheInfor[0].audit == 1 && shenhe_radio == 1" >
                                <el-col :span="4">
                                    IP:
                                </el-col>
                                <el-col :span="20">
                                    <el-input v-model="IP_text" ></el-input>
                                </el-col>
                            </el-col>

                            <el-col :span="24">
                                <el-col :span="4">
                                    审核备注:
                                </el-col>
                                <el-col :span="20">
                                    <el-input
                                            type="textarea"
                                            :rows="2"
                                            placeholder="请输入内容"
                                            v-model="textarea_note">
                                    </el-input>
                                </el-col>
                            </el-col>
                        </el-row>

                        <span slot="footer" class="dialog-footer">
                            <el-button size="mini"@click="jiexiBol = false">取 消</el-button>
                            <el-button size="mini"type="primary" @click="push_shenhe">确 定</el-button>
                        </span>
                    </el-dialog>
                </div>
            </el-tab-pane>
        </el-tabs>
    </el-row>
</template>
<script>
 import {mapGetters} from 'vuex';
import { domain_list,domain_shenhe1,domain_shenhe2,upyumingstatus} from '@/api/request';
import search from '../search/search';
import {  place_to_advertise } from '@/api/acount';
const moment = require('moment');
import state from './sh_state';
export default {
    data() {
        return{
            newTask:true,
            tableData:[],
            activeName:'third',
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



// ----------------------------历史申请
            tableData1:[],
            excelurl:'',
            tableshow:false,
            currentPage1:1,
            totalnum1:111,
            search1:'',
            chooseData:'urlData',
            av_id:'',
// 弹窗
            shenheInfor:[],
            jiexiBol:false,
            shenhe_radio:1,
            textarea_note:'',
            yuming_text:'',
            IP_text:'',
// 分页
            page:'20',
            num:'1',
            pageIndex:1,
            pageSize:20,
            kehuTableLength:0,
//请求落地页
            domain_list(){
                domain_list({
                    av_id:this.av_id,
                    page:this.page,
                    num:this.num,
                    Search_str:this.search1,
                }).then(response => {
                   this.tableData1 =  response.data;

                }).catch(err => {
                    this.$message.error(err);
                });
            },
// 审核通过
            domain_shenhe(){
                if(this.shenheInfor[0].audit_count == 1 && this.shenheInfor[0].audit == 0 ){
                    domain_shenhe1({
                        id:this.shenheInfor[0].id,
                        audit:this.shenhe_radio,
                        auditu:this.user.id,
                        note:this.textarea_note,
                    }).then(response => {
                        this.jiexiBol = false;
                        this.domain_list();
                    }).catch(err => {
                        this.$message.error(err);
                    });
                }else  if(this.shenheInfor[0].audit_count == 1 && this.shenheInfor[0].audit == 1 ){
                    domain_shenhe2({
                        id:this.shenheInfor[0].id,
                        audit:this.shenhe_radio,
                        auditu:this.user.id,
                        note:this.textarea_note,
                    }).then(response => {
                        this.jiexiBol = false;
                        this.upyumingstatus()
                    }).catch(err => {
                        this.$message.error(err);
                    });
                }




            },
//添加需二审求
            upyumingstatus(){
                upyumingstatus({
                    id:this.shenheInfor[0].id,
                    true_url:this.yuming_text,
                    ip:this.IP_text,
                }).then(response => {
                    this.jiexiBol = false;
                    this.domain_list();
                }).catch(err => {
                    this.$message.error(err);
                });
            },

        }
    },
    created(){

    },
    components: {
//            upload,
        state,
        search
    },
    mounted(){
        this.domain_list();
    },
    methods:{
        //tab切换事件
        handleClick(){
            if(this.activeName == 'third'){
                this.domain_list();
            }
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
        sortTable(){

        },
//历史搜索-下拉
        searchChange(val){
            this.tableshow = true;
            this.search1 = val;
            this.domain_list();
        },
        acountChange(val){
            this.tableshow = true;
            this.av_id = val;
            this.domain_list();
        },




//--------------------------------------------历史申请--------------------分页
        handleSizeChange(val) {
            this.page = val;
            this.pageSize =val;
            this.loading = true;
            this.place_to_advertise()
        },
        handleCurrentChange(val) {
            this.num = val;
            this.loading = true;
            this.place_to_advertise()
        },
//弹窗
        look_infor(val){
            this.shenheInfor = [];
            this.shenheInfor.push(val);
            this.jiexiBol = true;
        },
        push_shenhe(){
            this.domain_shenhe()
        },




   
        
        
    },
    filters:{
        filterDate: function (val) {
            var time=new Date(parseInt(val) * 1000);
            return   moment(time).format('YYYY-MM-DD HH:mm:ss')
        }
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

