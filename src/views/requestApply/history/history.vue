<template>
    <el-row class="requestapply" >
        <div class="hio">
            <!-- 切换table列表 -->

                <el-radio-group v-model="chooseData" @change="radioChange">
                    <el-radio-button label="urlData">二级域名</el-radio-button>
                    <el-radio-button label="luodiData">落地页</el-radio-button>
                </el-radio-group>

            <!-- 搜索框 -->

            <el-col :span="24" class="search_title">
                <input v-model="search"   @keydown.13="searchDown" style="width: 200px;height: 21px;"></input>
                <span class="name">按客户查看:</span>
                <el-select v-model="acountselect" size="mini" placeholder="请选择" @change="acountAcount">
                    <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.advertiser"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-col>

            <!-- 表格数据展示 -->
            <el-col :span="24">
                <el-table
                        v-loading="tableshow"
                        :data="tableData1"
                        class="vue-table"
                        height="550"
                        border >
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
                            <span>{{scope.row.advertiser||"无"}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="帐户" >
                        <template slot-scope="scope">
                            <span>{{scope.row.a_users||"无"}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="true_url"
                            label="域名">
                        <template slot-scope="scope">
                          {{  scope.row.true_url || '无'}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="true_url"
                            v-if="chooseData =='urlData'"
                            label="下载包">
                        <template slot-scope="scope">
                            <a :href=scope.row.zip_link target="_blank"> {{  scope.row.zip_link || '无'}}</a>
                        </template>
                    </el-table-column>
                    <el-table-column
                            v-if="chooseData == 'luodiData'"
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
            <el-dialog title="需求详情" class="his_tan" :visible.sync="jiexiBol"  :close-on-click-modal="false" @close="jiexiBol = false"  >
                <el-row v-for="item in shenheInfor">
                    <el-col :span="24" style="padding: 10px 20px">
                        <el-col :span="24"  class="list">
                            <el-col :span="4" class="title">
                                提交人:
                            </el-col>
                            <el-col :span="20">
                                {{item.name}}
                            </el-col>
                        </el-col>
                        <el-col :span="24"  class="list">
                            <el-col :span="4" class="title">
                                客户:
                            </el-col>
                            <el-col :span="20">
                                {{item.advertiser}}
                            </el-col>
                        </el-col>
                        <el-col :span="24"  class="list">
                            <el-col :span="4"  class="title">
                                账户:
                            </el-col>
                            <el-col :span="20">
                                {{item.a_users}}
                            </el-col>
                        </el-col>
                        <el-col :span="24"  class="list">
                            <el-col :span="4" class="title">
                                解析备注:
                            </el-col>
                            <el-col :span="20">
                                {{item.note}}
                            </el-col>
                        </el-col>
                    </el-col>
                    <el-col :span="24" v-if="role_name != '渠道'">
                        <el-col :span="24" style="width:100%;height: 1px;border: 1px solid #f5f7fa;" v-if="item.audit != 2 && item.is_ultimate_shenhe != 1"></el-col>
                        <el-col :span="24" style="padding: 0 20px"  v-if="item.audit != 2 && item.is_ultimate_shenhe != 1">
                            <el-col :span="24"  class="list">
                                <el-col :span="4" class="title">
                                    审核:
                                </el-col>
                                <el-col :span="20">
                                    <el-radio-group v-model="shenhe_radio" @change="shenheChange">
                                        <el-radio :label="1">通过</el-radio>
                                        <el-radio :label="2">驳回</el-radio>
                                    </el-radio-group>
                                </el-col>
                            </el-col>
                            <el-col :span="24" v-if="chooseData =='urlData'"  >
                                <el-col :span="24" v-if="shenheInfor[0].audit_count == 1 && shenheInfor[0].audit == 1 && shenhe_radio == 1">
                                    <el-col :span="24" class="add_infor" >
                                        <el-col :span="4" class="title">
                                            域名:
                                        </el-col>
                                        <el-col :span="20">
                                            <el-input v-model="yuming_text" size="mini" style="width:200px"></el-input>
                                        </el-col>
                                    </el-col>
                                    <el-col :span="24" class="add_infor">
                                        <el-col :span="4" class="title">
                                            IP:
                                        </el-col>
                                        <el-col :span="20">
                                            <el-input size="mini" v-model="IP_text" style="width:200px"></el-input>
                                        </el-col>
                                    </el-col>
                                </el-col>
                            </el-col>
                            <el-col :span="24" v-if="chooseData =='luodiData'"  >
                                <el-col :span="24" v-if="shenheInfor[0].audit_count == 1 && shenheInfor[0].audit == 1 && shenhe_radio == 1"  class="add_infor">
                                    <el-col :span="4" class="title">
                                        推广链接:
                                    </el-col>
                                    <el-col :span="20">
                                        <el-input
                                                type="textarea"
                                                :rows="2"
                                                style="width: 250px"
                                                placeholder="请输入内容"
                                                v-model="link_text" ></el-input>
                                    </el-col>
                                </el-col>
                            </el-col>
                            <el-col :span="24"  class="add_infor">
                                <el-col :span="4" class="title">
                                    审核备注:
                                </el-col>
                                <el-col :span="20">
                                    <el-input
                                            style="width: 250px;"
                                            type="textarea"
                                            :rows="2"
                                            placeholder="请输入内容"
                                            v-model="textarea_note">
                                    </el-input>
                                </el-col>
                            </el-col>
                        </el-col>
                    </el-col>

                </el-row>
                    <div slot="footer" style="text-align: center" class="dialog-footer" v-if="role_name != '渠道'">
                        <el-button size="mini"@click="jiexiBol = false">取 消</el-button>
                        <el-button size="mini"type="primary" @click="push_shenhe" >确 定</el-button>
                    </div>
            </el-dialog>
        </div>
    </el-row>
</template>
<script>
 import {mapGetters} from 'vuex';
 import {  place_advertiser_list } from '@/api/acount';
import { domain_list,domain_shenhe1,domain_shenhe2,upyumingstatus,page_list,page_shenhe1,page_shenhe2,upyestatus} from '@/api/request';
import search from '../../search/search';
import {  place_to_advertise } from '@/api/acount';
const moment = require('moment');
import state from '../sh_state';
export default {
    data() {
        return{
            role_name:'',
//搜索
            search:'',
            acountselect:'',
            options:[],
// 下拉列表
            place_advertiser_list(){
                place_advertiser_list({
                }).then(response => {
                    response.data.unshift({
                        advertiser:'全部',
                        id:'',
                    })
                    this.options =  response.data;
                }).catch(err => {
                    this.$message.error(err);
                });
            },

            tableData1:[],
            tableshow:false,
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
            link_text:'',
// 分页
            page:'20',
            num:'1',
            pageIndex:1,
            pageSize:20,
            kehuTableLength:0,
//请求二级域名
            domain_list(){
                domain_list({
                    av_id:this.av_id,
                    page:this.page,
                    num:this.num,
                    Search_str:this.search1,
                }).then(response => {
                   this.tableData1 =  response.data;
                    this.tableshow = false;
                    this.kehuTableLength = Number(response.page_data.count)
                }).catch(err => {
                    this.$message.error(err);
                });
            },
// 二级域名审核通过
            domain_shenhe(){
                if(this.shenheInfor[0].audit_count == 1 && this.shenheInfor[0].audit == 0 ){
                    domain_shenhe1({
                        id:this.shenheInfor[0].id,
                        audit:this.shenhe_radio,
                        auditu:this.user.id,
                        note:this.textarea_note,
                    }).then(response => {
                        if(response.code == 200){
                            this.$message({
                                message: '提交成功！',
                                type: 'success'
                            });
                            this.jiexiBol = false;
                            this.domain_list();
                        }else{

                            this.$message.error(response.message);
                        }

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
                        if(response.code == 200){
                            this.$message({
                                message: '提交成功！',
                                type: 'success'
                            });
                            this.jiexiBol = false;
                            this.upyumingstatus()
                        }else{

                            this.$message.error(response.message);
                        }

                    }).catch(err => {
                        this.$message.error(err);
                    });
                }
            },
//请求落地页
            page_list(){
                page_list({
                    av_id:this.av_id,
                    page:this.page,
                    num:this.num,
                    Search_str:this.search1,
                }).then(response => {
                    this.tableData1 =  response.data;
                    this.kehuTableLength = Number(response.page_data.count)
                    this.tableshow = false;
                }).catch(err => {
                    this.$message.error(err);
                });
            },
//落地页审核
            page_shenhe(){
                if(this.shenheInfor[0].audit_count == 1 && this.shenheInfor[0].audit == 0 ){
                    page_shenhe1({
                        id:this.shenheInfor[0].id,
                        audit:this.shenhe_radio,
                        auditu:this.user.id,
                        note:this.textarea_note,
                    }).then(response => {
                        if(response.code == 200){
                            this.$message({
                                message: '提交成功！',
                                type: 'success'
                            });
                            this.jiexiBol = false;
                            this.page_list();
                        }else{

                            this.$message.error(response.message);
                        }

                    }).catch(err => {
                        this.$message.error(err);
                    });
                }else  if(this.shenheInfor[0].audit_count == 1 && this.shenheInfor[0].audit == 1 ){
                    page_shenhe2({
                        id:this.shenheInfor[0].id,
                        audit:this.shenhe_radio,
                        auditu:this.user.id,
                        note:this.textarea_note,
                    }).then(response => {
                        if(response.code == 200){
                            this.$message({
                                message: '提交成功！',
                                type: 'success'
                            });
                            this.jiexiBol = false;
                            this.upyestatus()
                        }else{
                            this.$message.error(response.message);
                        }
                    }).catch(err => {
                        this.$message.error(err);
                    });
                }
            },
//添加二级域名需二审求
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
// 添加落地页需二审求
            upyestatus(){
                upyestatus({
                    id:this.shenheInfor[0].id,
                    link:this.link_text,
                }).then(response => {
                    this.jiexiBol = false;
                    this.page_list();
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
        this.place_advertiser_list();
        this.role_name = Object.keys( this.roleName);

    },
    methods:{
// 切换二级域和落地页
        radioChange(){
            this.page = '20';
            this.search = '';
            this.num = 1;
            this.tableData1 = [];
            this.tableshow = true;
            if(this.chooseData == 'urlData'){
                this.domain_list();
            }else{
                this.page_list();
            }
        },
//历史搜索-搜索
        searchDown(){
            if(this.chooseData == 'urlData'){
                this.tableshow = true;
                this.search1 = this.search;
                this.domain_list();
            }else{
                this.tableshow = true;
                this.search1 = this.search;
                this.page_list();
            }

        },
//历史搜索-下拉
        acountAcount(val){
            if(this.chooseData == 'urlData'){
                this.tableshow = true;
                this.av_id = this.acountselect;
                this.domain_list();
            }else {
                this.tableshow = true;
                this.av_id = this.acountselect;
                this.page_list();
            }

        },


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
            this.yuming_text = '';
             this.IP_text = '';
             this.link_text = '';
             this.textarea_note = '';
            this.shenheInfor.push(val);
            this.jiexiBol = true;
        },
        shenheChange(){
            this.yuming_text = '';
            this.IP_text = '';
            this.link_text = '';
        },
        push_shenhe(){
            this.$message('正在提交，请稍后');
            if(this.chooseData == 'urlData'){
                if(this.shenhe_radio == 1){
                    if(this.yuming_text == ''&& this.IP_text == ''){
                        this.$message.error('域名/ip不能为空');
                    }else{
                        this.domain_shenhe()
                    }
                }else{
                    this.domain_shenhe()
                }

            }else{
                if(this.shenhe_radio == 1){
                    if(this.link_text == ''){
                        this.$message.error('推广链接不能为空');
                    }else{
                        this.page_shenhe();
                    }
                }else{
                    this.page_shenhe();
                }
            }

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
            'roleName'
        ])
    }
}
</script>

<style rel="stylesheet/scss"  lang="scss">
    .his_tan {
        .el-dialog {
            font-size: 14px;
            width:480px;
            .el-dialog__header {
                padding: 0 0 0 20px ;
                height:40px;
                line-height: 40px;
                font-size: 12px;
                position: relative;
                .el-dialog__headerbtn {
                    position: absolute;
                    right:10px;
                    bottom:0;
                    top:0;
                    margin:auto;
                }
            }
            .el-dialog__body {
                padding: 0 0 20px 0;
                .list {
                    height:40px;
                    line-height: 40px;
                }
                .add_infor {
                    margin:5px 0;
                }
            }
            .el-dialog__footer {
                text-align: center;
                padding: 10px 0;
            }
        }
    }
</style>
