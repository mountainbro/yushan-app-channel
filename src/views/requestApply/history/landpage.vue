<template>
        <div class="hio">

            <!-- 搜索框 -->
            <el-col :span="24" >

                <el-col :span="24" class="search_title">
                    <input v-model="search"   @keydown.13="searchDown" style="width: 200px;height: 21px;margin-right: 10px">
                    <el-date-picker
                            v-model="hisdate"
                            type="daterange"
                            size="mini"
                            @change="getDate"
                            style="width: 200px;margin-right: 10px"
                            :clearable="false"
                            range-separator="-"
                            :picker-options="pickerOptions0"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                    <span class="name">客户:</span>
                    <el-select v-model="acountselect" size="mini" placeholder="请选择" style="margin-right: 10px" @change="acountAcount">
                        <el-option
                                v-for="item in options"
                                :key="item.id"
                                :label="item.advertiser"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <span class="name">审核:</span>
                    <el-select v-model="shenhe_state" size="mini"  placeholder="请选择" @change="acountAcount">
                        <el-option
                                v-for="item in shenhe_options"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-col>

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
                                label="进度" >
                            <template slot-scope="scope">
                                <span v-if="scope.row.is_ultimate_shenhe == 0 && scope.row.audit != 2 ">
                                    <i style="width: 5px;height: 5px;background: #a4a4a4;display: inline-block;vertical-align: middle;border-radius: 50%"></i>
                                    处理中</span>
                                <span v-if="scope.row.is_ultimate_shenhe == 1">
                                     <i style="width: 5px;height: 5px;background: #52c41a ;display: inline-block;vertical-align: middle;border-radius: 50%"></i>

                                    已完成</span>
                                <span v-if="scope.row.audit == 2 && scope.row.is_ultimate_shenhe == 0">
                                    <i style="width: 5px;height: 5px;background: #f5222d ;display: inline-block;vertical-align: middle;border-radius: 50%"></i>
                                    驳回</span>
                            </template>
                        </el-table-column>

                        <el-table-column
                                label="审核状态">
                            <template slot-scope="scope">
                                <state :stateData=scope.row ></state>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="true_url"
                                label="下载包">
                            <template slot-scope="scope">
                                <a :href="'http://'+scope.row.zip_link" target="_blank">
                                    <img src="../img/dowm.png" style="width: 20px" alt="">
                                </a>
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
                    <div v-for="(item,index) in shenheInfor" :key="index">
                        <div :span="24" style="padding: 10px 20px">
                            <div   class="list">
                                <div class="title">
                                    提交人:
                                </div>
                                <div class='right_title'>
                                    {{item.name}}
                                </div>
                            </div>
                            <div   class="list">
                                <div class="title">
                                    客户:
                                </div>
                                <div class='right_title'>
                                    {{item.advertiser}}
                                </div>
                            </div>
                            <div   class="list">
                                <div  class="title">
                                    账户:
                                </div>
                                <div class='right_title'>
                                    {{item.a_users}}
                                </div>
                            </div>

                            <div   class="list" v-if="item.link ">
                                <div  class="title">
                                    推广链接:
                                </div>
                                <div class='right_title' >
                                    <span v-for="(i,index) in JSON.parse(item.link)" :key="index">
                                        <a :href=i target="_blank">{{i}}</a><br>
                                    </span>
                                </div>
                            </div>
                            <div   class="list">
                                <div class="title">
                                    解析备注:
                                </div>
                                <div class='right_title'>
                                   <span>
                                       {{item.note}}
                                   </span>
                                </div>
                            </div>
                            <div   class="list" v-if="audit_historyList.length !== 0">
                                <div class="title">
                                    审核备注:
                                </div>
                                <div class='right_title'>
                                    <div  class="shenhe_note" :key="index"  v-for="(data,index) in audit_historyList">
                                        <div class="top_icon"></div>

                                        <div class="box">
                                            <div class="header" style=" color:rgb(163, 165, 167);">
                        <span class="name">
                            {{data.users0.name}}
                        </span>
                                                <span class="date">
                           {{data.catated_at | filterDate }}
                        </span>
                                            </div>
                                            <div class="note">
                                                <div class="left_icon">

                                                    <img src="../img/duigou.png" alt="" style="width: 18px;display: inline-block;vertical-align: middle;"  v-if="data.type != 2">
                                                    <img src="../img/cha.png" alt="" style="width: 18px;display: inline-block;vertical-align: middle;"  v-if="data.type == 2">

                                                </div>
                                                <div class="right_note">
                                                    {{data.note }}
                                                </div>
                                            </div>
                                        </div>
                                    </div >
                                </div>
                            </div>
                        </div>
                        <div  v-if="role_name != '渠道'">
                            <div :span="24" style="width:99%;height: 1px;border: 1px solid #f5f7fa;margin-top: 30px" v-if="item.audit != 2 && item.is_ultimate_shenhe != 1"></div>
                            <div  style="padding: 0 20px"  v-if="item.audit != 2 && item.is_ultimate_shenhe != 1">
                                <div   class="list">
                                    <div class="title">
                                        审核:
                                    </div>
                                    <div class='right_title'>
                                        <el-radio-group v-model="shenhe_radio" @change="shenheChange">
                                            <el-radio :label="1">通过</el-radio>
                                            <el-radio :label="2">驳回</el-radio>
                                        </el-radio-group>
                                    </div>
                                </div>
                                <div  v-if="shenheInfor[0].audit_count == 1 && shenheInfor[0].audit == 1 && shenhe_radio == 1">
                                    <div class="add_infor">
                                        <div  class="title">
                                            推广链接:
                                        </div>
                                        <div class='right_title'>
                                            <el-input
                                                    type="textarea"
                                                    :rows="2"
                                                    style="width: 250px"
                                                    placeholder="请输入内容"
                                                    v-model="link_text" ></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="add_infor">
                                    <div class="title">
                                        审核备注:
                                    </div>
                                    <div class='right_title'>
                                        <el-input
                                                style="width: 250px;"
                                                type="textarea"
                                                :rows="2"
                                                placeholder="请输入内容"
                                                v-model="textarea_note">
                                        </el-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div slot="footer" style="text-align: center;margin-top: 10px" class="dialog-footer" v-if="role_name != '渠道'">
                            <div v-if="item.audit != 2 && item.is_ultimate_shenhe != 1">
                                <el-button size="mini" @click="jiexiBol = false">取 消</el-button>
                                <el-button size="mini" type="primary" @click="push_shenhe" >确 定</el-button>
                            </div>

                        </div>
                    </div>

                </el-dialog>
            </el-col>

        </div>
</template>
<script>
 import {mapGetters} from 'vuex';
 import {  place_advertiser_list } from '@/api/acount';
import { audit_history,page_list,page_shenhe1,page_shenhe2,upyestatus} from '@/api/request';
import search from '../../search/search';
const moment = require('moment');
import state from '../sh_state';
export default {
    data() {
        return{
            role_name:'',
//搜索
            search:'',
            acountselect:'',
            options:[moment().format('YYYY-MM-01'),moment().format('YYYY-MM-01')],
            hisdate:[],
            shenhe_state:'',
            shenhe_options:[{
                name:'全部',
                id:''
            },{
                name:'已审核',
                id:'1'
            },{
                name:'未审核',
                id:'0'
            },{
                name:'已驳回',
                id:'2'
            }],
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() > Date.now() - 8.64e7;
                }
            },
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
            tableshow:true,
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
            audit_historyList:[],
// 分页
            page:'20',
            num:'1',
            pageIndex:1,
            pageSize:20,
            kehuTableLength:0,
//请求落地页
            page_list(){
                page_list({
                    av_id:this.av_id,
                    'per-page':this.page,
                    page:this.num,
                    Search_str:this.search1,
                    start_date: moment(this.hisdate[0]).format('YYYY-MM-DD'),
                    end_date:moment(this.hisdate[1]).format('YYYY-MM-DD'),
                    shenhe:this.shenhe_state,
                }).then(response => {
                    this.tableData1 =  response.data;
                    this.kehuTableLength = Number(response.page_data.count)
                    this.tableshow = false;
                }).catch(err => {
                    this.$message.error(err);
                });
            },
            audit_history(){
                audit_history({
                    id:this.shenheInfor[0].id,
                    name:'demand'
                }).then(response => {
                    this.audit_historyList = response
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
// 添加落地页需二审求
            upyestatus(){
                this.link_text = JSON.stringify(this.link_text.split(/\s+/))
                upyestatus({
                    id:this.shenheInfor[0].id,
                    link:this.link_text,
                }).then(() => {
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
    computed:{
        ...mapGetters([
            'user',
            'roleName'
        ])
    },
    watch:{
        infoedata_ladnpage(){
            this.page_list();
            this.place_advertiser_list();
            this.role_name = Object.keys( this.roleName);
        },
    },
    methods:{

//历史搜索-搜索
        searchDown(){
            this.tableshow = true;
            this.search1 = this.search;
            this.page_list();
        },
//历史搜索-下拉
        acountAcount(){
            this.tableshow = true;
            this.av_id = this.acountselect;
            this.page_list();
        },
        getDate(){
            this.tableshow = true;
            this.page_list();
        },
        handleSizeChange(val) {
            this.page = val;
            this.pageSize =val;
            this.loading = true;
            this.page_list()
        },
        handleCurrentChange(val) {
            this.num = val;
            this.loading = true;
            this.page_list()
        },
//弹窗
        look_infor(val){
            this.shenheInfor = [];
            this.yuming_text = '';
             this.IP_text = '';
             this.link_text = '';
             this.textarea_note = '';

            this.shenheInfor.push(val);
            this.audit_historyList = [];
            this.audit_history();
            this.jiexiBol = true;
        },
        shenheChange(){
            this.yuming_text = '';
            this.IP_text = '';
            this.link_text = '';
        },
        push_shenhe(){
            this.$message('正在提交，请稍后');
            if(this.shenhe_radio == 1){
                if(this.shenheInfor[0].audit_count == 1 && this.shenheInfor[0].audit == 0 ){
                    this.page_shenhe()
                }else  if(this.shenheInfor[0].audit_count == 1 && this.shenheInfor[0].audit == 1 ){
                    if(this.link_text == ''){
                        this.$message.error('推广链接不能为空');
                    }else{
                        this.page_shenhe();
                    }
                }
            }else{
                this.page_shenhe();
            }

        },
    },
    filters:{
        filterDate: function (val) {
            var time=new Date(parseInt(val) * 1000);
            return   moment(time).format('YYYY-MM-DD HH:mm:ss')
        },
    },
    props: ['infoedata_ladnpage']
}
</script>
