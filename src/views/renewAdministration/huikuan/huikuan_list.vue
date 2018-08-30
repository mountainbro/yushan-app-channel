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
                            label="客户">
                        <template slot-scope="scope">
                            <span>{{scope.row.adname||"无"}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="true_url"
                            label="回款时间 ">
                        <template slot-scope="scope">
                            {{scope.row.ctime | filterDate}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="金额" >
                        <template slot-scope="scope">
                            {{  scope.row.b_money || '无'}}
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
                                回款金额:
                            </div>
                            <div class='right_title'>
                                {{data.b_money}}
                            </div>
                        </div>
                        <div   class="list list_right">
                            <div class="title">
                                回款日期:
                            </div>
                            <div class='right_title'>
                                   <span>
                                            {{data.b_time | filterDate}}
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
                        <div   class="list list_right">
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
                                {{data.note || '无'}}
                            </div>
                        </div>
                    </div>

            </el-dialog>
        </el-col>

    </div>
</template>
<script>
    import {mapGetters} from 'vuex';
    import {  qudao_backmoneylist } from '@/api/renew';

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
                qudao_backmoneylist(){
                    qudao_backmoneylist({
                        page:this.num,
                        'per-page':this.page,
                        Search_str:this.search,
                        start_date: this.start_date,
                        end_date:this.end_date,
                        shenhe:1,
                        qudao:1,
                    }).then(response => {
                        this.tableData1 =  response.data.data;
                        this.tableshow = false;
                        this.kehuTableLength = Number(response.data.totalCount)
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
            huikuan_money(){
                this.qudao_backmoneylist()
            },
// 搜索
            searchDown(){
                this.qudao_backmoneylist()
            },
//日期
            getDate(){
                this.start_date  = moment(this.hisdate[0]).format('YYYY-MM-DD');
                this.end_date = moment(this.hisdate[1]).format('YYYY-MM-DD');
                this.qudao_backmoneylist()
            },


//分页
            handleSizeChange(val) {

                this.page = val;
                this.pageSize =val;
                this.loading = true;
                this.qudao_backmoneylist()
            },
            handleCurrentChange(val) {
                this.num = val;
                this.loading = true;
                this.qudao_backmoneylist()
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
