<template>
    <el-row class="requestapply" >
        <div class="hio">
            <!-- 切换table列表 -->

                <el-radio-group v-model="chooseData" @change="radioChange">
                    <el-radio-button label="urlData">二级域名</el-radio-button>
                    <el-radio-button label="luodiData">落地页</el-radio-button>
                </el-radio-group>

            <!-- 搜索框 -->
            <search @searchChange="searchChange" @acountChange="acountChange"></search>
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
    </el-row>
</template>
<script>
 import {mapGetters} from 'vuex';
import { domain_list,domain_shenhe1,domain_shenhe2,upyumingstatus,page_list} from '@/api/request';
import search from '../../search/search';
import {  place_to_advertise } from '@/api/acount';
const moment = require('moment');
import state from '../sh_state';
export default {
    data() {
        return{

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
//请求落地页
            page_list(){
                page_list({
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
// 切换二级域和落地页
        radioChange(){
            if(this.chooseData == 'urlData'){
                this.domain_list();
            }else{

            }
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


