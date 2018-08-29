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
                        style="width: 230px;margin-right: 10px"
                        :clearable="false"
                        range-separator="-"
                        :picker-options="pickerOptions0"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
                <span style="cursor: pointer" @click="clear"> 清空搜索</span>

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
                            label="渠道"
                            sortable='custom'>
                        <template slot-scope="scope">
                            <span>
                                {{scope.row.a_users||"无"}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="客户">
                        <template slot-scope="scope">
                            <span>{{scope.row.adname||"无"}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="退款帐户" >
                        <template slot-scope="scope">
                            <span>{{scope.row.a_users||"无"}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="true_url"
                            label="退款时间 ">
                        <template slot-scope="scope">
                            {{scope.row.ctime | filterDate}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="实际金额" >
                        <template slot-scope="scope">
                            {{  scope.row.money || '无'}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="账户币" >
                        <template slot-scope="scope">
                            {{  scope.row.show_money || '无'}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="进度" >
                        <template slot-scope="scope">
                                <span v-if="scope.row.is_ultimate_shenhe == 0 &&  scope.row.audit != 2">
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
                            <img src="@/img/duigou.png" style="width: 20px;" v-if="scope.row.is_ultimate_shenhe == 1" alt="">
                            <img src="@/img/dengdai.png" style="width: 20px;" v-if="scope.row.is_ultimate_shenhe == 0 &&  scope.row.audit != 2"  alt="">
                            <img src="@/img/cha.png" style="width: 20px;"  v-if="scope.row.audit == 2 && scope.row.is_ultimate_shenhe == 0" alt="">
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


            <!-- 需求 -->
            <el-dialog title="退款详情"  class="his_tan xuqiuInfor "  :visible.sync="jiexiBol"  :close-on-click-modal="false" @close="jiexiBol = false"  >
                    <div  style="padding: 0 20px" class="infor" v-for="(data,key) in listInfor" :key="key">
                        <div   class="list">
                            <div class="title">
                                退款金额:
                            </div>
                            <div class='right_title'>
                                {{data.money}}
                            </div>
                        </div>
                        <div   class="list">
                            <div  class="title">
                                账户名称:
                            </div>
                            <div class='right_title'>
                                {{data.a_users}}
                            </div>
                        </div>
                        <div   class="list">
                            <div  class="title">
                                产品线:
                            </div>
                            <div class='right_title'>
                                {{data.prlname}}
                            </div>
                        </div>
                        <div   class="list">
                            <div class="title">
                                退款日期:
                            </div>
                            <div class='right_title'>
                                   <span>
                                            {{data.payment_time | filterDate}}
                                   </span>
                            </div>
                        </div>
                        <div   class="list">
                            <div class="title">
                                提交日期:
                            </div>
                            <div class='right_title'>
                                   <span>
                                     {{data.ctime | filterDate}}
                                   </span>
                            </div>
                        </div>
                        <div   class="list">
                            <div class="title">
                                提交人:
                            </div>
                            <div class='right_title'>
                                   <span>
                                     {{data.submitname }}
                                   </span>
                            </div>
                        </div>
                    </div>
                    <div  style="padding: 0 20px"   class="noteInfor"  v-for="(data,key) in listInfor" :key="key">
                        <div   class="list">
                            <div class="title">
                                备注:
                            </div>
                            <div class='right_title'>
                                {{data.note || '空'}}
                            </div>
                        </div>
                    </div>

            </el-dialog>
        </el-col>

    </div>
</template>
<script>
    import {mapGetters} from 'vuex';
    import {  qudao_tuikuanlist } from '@/api/renew';

    const moment = require('moment');
    export default {
        data() {
            return{
                tableshow:true,
//搜索
                search:'',
// 日期
                hisdate:[],
                start_date:'',
                end_date:'',
                tableData1:[],
// 分页
                count:'',
                page:'20',
                num:'1',
                pageIndex:1,
                pageSize:20,
                kehuTableLength:0,

                pickerOptions0: {
                    disabledDate(time){
                        return time.getTime() >= Date.now() ;
                    },
                },
             
//  查看详情
                listInfor:[],
                jiexiBol:false,
  // 续费列表
                qudao_tuikuanlist(){
                    qudao_tuikuanlist({
                        page:this.num,
                        'per-page':this.page,
                        Search_str:this.search,
                        start_date: this.start_date,
                        end_date:this.end_date,
                        shenhe:1,
                    }).then(response => {
                        this.tableData1 =  response.data;
                        this.tableshow = false;
                        this.kehuTableLength = Number(response.totalCount)
                    }).catch(err => {
                        this.$message.error(err);
                    });
                },





//------------------------------------------------------


            }
        },
        created(){

        },
        computed:{
            ...mapGetters([
                'user',
            ])
        },
        methods:{
//
            back_money(){
                this.qudao_tuikuanlist()
            },
// 搜索
            searchDown(){
                this.qudao_tuikuanlist()
            },
//日期
            getDate(){
                this.start_date  = moment(this.hisdate[0]).format('YYYY-MM-DD');
                this.end_date = moment(this.hisdate[1]).format('YYYY-MM-DD');
                this.qudao_tuikuanlist()
            },


//分页
            handleSizeChange(val) {
                this.page = val;
                this.pageSize =val;
                this.loading = true;
                this.qudao_tuikuanlist()
            },
            handleCurrentChange(val) {
                this.num = val;
                this.loading = true;
                this.qudao_tuikuanlist()
            },






//  查看审核----------查看详情
            look_infor(val){
                this.jiexiBol = true;
                this.listInfor = [];
                this.listInfor.push(val);
            },



// 清空
            clear(){
                this.hisdate = [];
                this.start_date = '';
                this.end_date = '';
                this.search = '';
                this.renewlist();
            },
        },
        filters:{
            filterDate: function (val) {
                var time=new Date(parseInt(val) * 1000);
                return   moment(time).format('YYYY-MM-DD')
            },
        },
        props: ['infoedata_ladnpage']
    }
</script>
