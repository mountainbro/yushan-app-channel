<template>
    <div class="hio">

        <!-- 搜索框 -->
        <el-col :span="24" >

            <el-col :span="24" class="search_title">
                <input v-model="search"    @keydown.13="searchDown" style="width: 200px;height: 21px;margin-right: 10px">
                <el-date-picker
                        v-model="hisdate"
                        type="daterange"
                        size="mini"
                        @change="getDate"
                        style="width: 230px;margin-right: 10px"
                        :clearable="false"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
                <span class="name">审核:</span>
                <el-select v-model="shenhe_state" size="mini"  placeholder="请选择" @change="acountAcount">
                    <el-option
                            v-for="item in shenhe_options"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
                <span style="cursor: pointer" @click="clear"> 清空搜索</span>
                <!--<el-button size="mini" style="float: right;width: 80px;margin-left: 10px" type="primary" @click="Excel">导出</el-button>-->
                <el-button size="mini" style="float: right;width: 80px;" type="primary" @click="addxufei">新增续费</el-button>

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
                            label="渠道">
                        <template slot-scope="scope">
                            <span>
                                {{scope.row.a_users||"无"}}
                            </span>
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
                            label="续费时间 ">
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
                            label="进度" >
                        <template slot-scope="scope">
                                <span v-if="scope.row.is_ultimate_shenhe == 0 &&  scope.row.audit != 2">

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
                            <img src="@/img/dengdai.png" style="width: 20px;" v-if="scope.row.is_ultimate_shenhe == 0 &&  scope.row.audit != 2"  alt="">
                            <img src="@/img/duigou.png" style="width: 20px;" v-if="scope.row.is_ultimate_shenhe == 1" alt="">
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

            <el-dialog title="新增续费" class="his_tan" :visible.sync="add_xufei"  :close-on-click-modal="false" @close="add_xufei = false"  >
                <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item
                            label="付款方式"
                            prop="payment_type"
                            style="margin-bottom: 15px"
                    >
                        <el-radio-group size="mini" v-model="numberValidateForm.payment_type">
                            <el-radio :label="1">预付</el-radio>
                            <el-radio :label="2">垫付</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item
                            style="margin-bottom: 15px"
                            label="客户名称"
                            prop="advertiser"
                            :rules="[
                                  { required: true, message: '客户名称不能为空'},
                                ]"
                    >
                        <el-select size="mini" style="width: 300px;"  v-model="numberValidateForm.advertiser" placeholder="请选择" @change="add_kehu">
                            <el-option
                                    v-for="item in kh_options"
                                    :key="item.id"
                                    :label="item.advertiser"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                            style="margin-bottom: 15px"
                            label="账户名称"
                            prop="zh_name"
                            :rules="[
                                  { required: true, message: '服务名称不能为空'},
                                ]"
                    >
                        <el-select size="mini"  :disabled="zhanghubol" style="width: 300px;" v-model="numberValidateForm.zh_name" placeholder="请选择" @change="add_zh">
                            <el-option
                                    v-for="(item,key) in zh_options"
                                    :key="item.id"
                                    :label="item.a_users"
                                    :value="key">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                            style="margin-bottom: 15px;width: 200px"
                            label="续费金额"
                            prop="money"
                            :rules="[
                                  { required: true, message: '金额不能为空'},
                                ]"
                    >
                        <div style="width: 350px">
                            <el-input v-on:input="xufeiNum" :disabled="xf_noney" size="mini"  style="width: 180px;" type="number" v-model="numberValidateForm.money" auto-complete="off"></el-input>
                            <span style="font-size: 12px;margin-left: 10px" v-if="fk_type != 1">账户币:{{numberValidateForm.show_money}}</span>
                        </div>
                        <!--fk_type :1 询价类（不显示账户币）审核添加媒体报价（账户币）-->
                    </el-form-item>
                    <el-form-item
                            style="margin-bottom: 15px"
                            label="选择日期"
                            prop="payment_time">
                        <el-date-picker
                                size="mini"
                                style="width: 300px;"
                                :clearable="false"
                                @change="add_xufei_date"
                                v-model="numberValidateForm.payment_time"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                        <div v-if="show_date" style="height: 20px;line-height: 20px;font-size: 12px;color: red"><i class="el-icon-info" style="margin-right: 10px"></i>当日续费11:00点后提申请的第二天到账</div>
                    </el-form-item>
                    <el-form-item
                            style="margin-bottom: 15px"
                            label="续费备注"
                            prop="note"
                            :rules="[
                                  { required: true, message: '备注不能为空'},
                                ]"
                    >
                        <el-input
                                style="width: 300px;"
                                size="mini"
                                type="textarea"
                                :autosize="{ minRows: 2, maxRows: 4}"
                                placeholder="请输入内容"
                                v-model="numberValidateForm.note">
                        </el-input>
                    </el-form-item>

                    <el-form-item style="text-align: right;margin-right: 80px" >
                        <el-button type="primary" @click="submitForm('numberValidateForm')" size="mini">提交</el-button>
                        <el-button @click="resetForm('numberValidateForm')" size="mini">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>

            <!-- 需求 -->
            <el-dialog title="需求详情"  class="his_tan xuqiuInfor "  :visible.sync="jiexiBol"  :close-on-click-modal="false" @close="jiexiBol = false"  >
                <div  v-for="(data,key) in listInfor" :key="key">
                    <div  style="padding: 0 20px" class="infor">
                        <div   class="list">
                            <div class="title">
                                付款方式:
                            </div>
                            <div class='right_title'>
                                <span v-if="data.payment_type == 1"> 预付</span>
                                <span v-if="data.payment_type == 2"> 垫付</span>
                            </div>
                        </div>
                        <div   class="list list_right">
                            <div class="title">
                                续费金额:
                            </div>
                            <div class='right_title'>
                                {{data.money}}
                            </div>
                        </div>
                        <div   class="list">
                            <div  class="title">
                                客户名称:
                            </div>
                            <div class='right_title'>
                                {{data.advertiser}}
                            </div>
                        </div>
                        <div   class="list list_right">
                            <div class="title">
                                续费日期:
                            </div>
                            <div class='right_title'>
                                   <span>
                                            {{data.payment_time | filterDate}}
                                   </span>
                            </div>
                        </div>
                        <div   class="list">
                            <div class="title">
                                账户名称:
                            </div>
                            <div class='right_title'>
                                   <span>
                                        <el-tooltip :content="data.a_users" placement="top" effect="light">
                                             <span>{{data.a_users}}</span>
                                        </el-tooltip>
                                   </span>
                            </div>
                        </div>
                        <div   class="list list_right">
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
                                     {{data.name }}
                                   </span>
                            </div>
                        </div>
                    </div>
                    <div  style="padding: 0 20px"   class="noteInfor"  >
                        <div   class="list">
                            <div class="title">
                                备注:
                            </div>
                            <div class='right_title'>
                                {{data.note || '无'}}
                            </div>
                        </div>
                    </div>
                    <div  style="width:99%;height: 1px;border-top: 1px solid #f5f7fa;margin-top: 30px" ></div>
                    <div   style="padding: 0 20px" class="shenhe"   v-if="role_name != '渠道'">
                        <div   class="list">
                            <div class="title">
                                审核:
                            </div>
                            <div class='right_title'>
                                <el-radio-group v-model="shenhe_radio" @change="shenheChange" v-if="data.is_ultimate_shenhe == 0 && data.audit == 0">
                                <el-radio :label="1">通过</el-radio>
                                <el-radio :label="2">驳回</el-radio>
                                </el-radio-group>
                                <span v-if="data.is_ultimate_shenhe == 1" >
                                    <img src="@/img/duigou.png" style="width: 15px;margin-right:3px;vertical-align: middle" alt=""><span style="vertical-align: middle;font-size: 12px;color: #999999;">已通过</span>
                                </span>
                                <span v-if="data.audit == 2 && data.is_ultimate_shenhe == 0" >
                                     <img src="@/img/cha.png" style="width: 15px;margin-right:3px;vertical-align: middle;"  alt=""> <span style="vertical-align: middle;color: #999999;">未通过</span>
                                </span>

                            </div>
                        </div>
                        <div   class="list" v-if="shenhe_radio == 1 && look_fk_type == 1 && data.is_ultimate_shenhe != 1 && data.audit == 2 ">
                            <div class="title">
                                媒体报价:
                            </div>
                            <div class='right_title'>
                                <el-input  size="mini"  style="width: 180px;" type="number" v-model="add_show_money" ></el-input>
                            </div>
                        </div>
                        <div   class="list">
                            <div class="title">
                                审核备注:
                            </div>
                            <div class='right_title'>
                                <el-input
                                        v-if="data.is_ultimate_shenhe == 0 && data.audit == 0"
                                        style="width: 426px;"
                                        type="textarea"
                                        :rows="4"
                                        placeholder="请输入内容"
                                        v-model="textarea_note">
                                </el-input>
                                <div v-else v-for="(data,key) in audit_historyList" :key="key">
                                    <div style="color: #999999;font-size: 14px">{{data.catated_at | filterTime }}</div>
                                    <span style="font-size: 12px;color: #999999">
                                    {{data.note || '无'}}
                                </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div slot="footer"  style="text-align: right;margin: 10px 20px 10px 10px" class="dialog-footer"  v-if="role_name != '渠道'">
                        <div v-if="data.audit != 2 && data.is_ultimate_shenhe != 1">
                            <el-button size="mini" @click="jiexiBol = false">取 消</el-button>
                            <el-button size="mini" type="primary" @click="push_shenhe" >确 定</el-button>
                        </div>
                    </div>
                    <div   v-else  style="padding: 0 20px" class="shenhe">
                        <div   class="list">
                            <div class="title">
                                审核进度:
                            </div>
                            <div class='right_title'>
                                <span v-if="data.is_ultimate_shenhe == 0 &&  data.audit != 2">
                                       <img src="@/img/dengdai.png" style="width: 15px;vertical-align: middle;margin-right: 3px"   alt=""> <span style="vertical-align: middle;color: #999999;font-size: 12px">待审核</span>
                                </span>
                                <span  v-if="data.is_ultimate_shenhe == 1" >
                                        <img src="@/img/duigou.png" style="width: 15px;vertical-align: middle;margin-right: 3px" alt=""><span style="vertical-align: middle;color: #999999;font-size: 12px">已通过，正在进行续费处理。大约需要一个工作日，请稍后 </span>
                                </span>
                                <span   v-if="data.audit == 2 && data.is_ultimate_shenhe == 0">
                                    <img src="@/img/cha.png" style="width: 15px;vertical-align: middle;margin-right: 3px"  alt=""><span style="vertical-align: middle;color: #999999;font-size: 12px">未通过，请联系媒介处理 </span>
                                </span>
                            </div>
                        </div>
                        <div   class="list" v-if="data.audit == 2 && data.is_ultimate_shenhe == 0">
                            <div class="title">
                                审核备注:
                            </div>
                            <div class='right_title' v-for="(data,key) in audit_historyList" :key="key">
                                <div >{{data.catated_at | filterTime }}</div>
                                <span >
                                    {{data.note || '无'}}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            </el-dialog>
        </el-col>

    </div>
</template>
<script>
    import {mapGetters} from 'vuex';
    import {  renewlist,qd_addrenew,qd_addrenew_return,qd_renewshenhe1,qd_uprenewshowmoney } from '@/api/renew';
    import { audit_history} from '@/api/request';
    import {  place_advertiser_list,place_to_advertise } from '@/api/acount';
    const moment = require('moment');
    export default {
        data() {
            return{
                role_name:'',
                tableshow:true,
// 审核
                shenhe_state:'',
                av_id:'',
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
//搜索
                search:'',
// 日期
                show_date:true,
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
//弹窗
                add_xufei:false,
                numberValidateForm: {
                    zh_name:'',
                    submituser:'',
                    payment_type: 1,
                    advertiser:'',
                    account_id:'',
                    money:'',
                    payment_time:moment().format('YYYY-MM-DD'),
                    note:'',
                    show_money:'',
                },
                zhanghubol:true,
                xf_noney:true,
                contract_id:'',
                kh_options:[],
                zh_options:[],
                fandian:0,
                fk_type:1,
//  查看详情
                listInfor:[],
                look_fk_type:0,
                add_show_money:'',
                shenhe_radio:1,
                textarea_note:'',
                jiexiBol:false,
                audit_historyList:[],
  // 续费列表
                renewlist(){
                    renewlist({
                        shenhe:this.shenhe_state,
                        page:this.num,
                        'per-page':this.page,
                        Search_str:this.search,
                        start_date: this.start_date,
                        end_date:this.end_date,
                    }).then(response => {
                        this.tableData1 =  response.data;
                        this.tableshow = false;
                        this.kehuTableLength = Number(response.page_data.count)
                    }).catch(err => {
                        this.$message.error(err);
                    });
                },
//  客户名称
                place_advertiser_list(){
                    place_advertiser_list({
                    }).then(response => {
                        this.kh_options=response.data;

                    }).catch(err => {
                        this.$message.error(err);
                    });
                },
//账户名称
                place_to_advertise(){
                    place_to_advertise({
                        av_id:this.numberValidateForm.advertiser
                    }).then(response => {
                        this.zh_options=response.data.data;
                    }).catch(err => {
                        this.$message.error(err);
                    });
                },
//获取返点
                qd_addrenew(){
                    qd_addrenew({
                        id:this.contract_id
                    }).then(response => {
                        this.fandian = response.fandian;
                        this.fk_type = response.fk_type;
                        this.xf_noney = false;
                    }).catch(err => {
                        this.$message.error(err);
                    });
                },
//  新增续费
                qd_addrenew_return(){
                    qd_addrenew_return({
                       data:this.numberValidateForm
                    }).then(response => {
                        if(response.code == '200'){
                            this.$message({
                                message: '提交成功！',
                                type: 'success'
                            });
                            this.renewlist();
                            this.add_xufei = false;
                        }else{
                            this.$message.error('提交失败');
                        }

                    }).catch(err => {
                        this.$message.error(err);
                    });
                },
// 审核
                qd_renewshenhe1(){
                    qd_renewshenhe1({
                        id:this.listInfor[0].id,
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
                            this.renewlist()
                            if(this.shenhe_radio == 1 && this.look_fk_type == 1){
                                this.qd_uprenewshowmoney()
                            }
                        }else{

                            this.$message.error(response.message);
                        }
                    }).catch(err => {
                        this.$message.error(err);
                    });
                },
// 审核备注
                audit_history(){
                    audit_history({
                        id:this.listInfor[0].id,
                        name:'qudao_renew'
                    }).then(response => {
                        this.audit_historyList = response
                    }).catch(err => {
                        this.$message.error(err);
                    });
                },
// 媒体报价
                qd_uprenewshowmoney(){
                    qd_uprenewshowmoney({
                        id:this.listInfor[0].id,
                       show_money:this.add_show_money,
                    }).then(() => {

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
                'roleName'
            ])
        },
        methods:{
//历史搜索-下拉
            acountAcount(){
                this.tableshow = true;
                this.renewlist();
            },
//
            xufei(){
                this.renewlist();
                this.role_name = Object.keys( this.roleName);
                this.numberValidateForm.submituser = this.user.id

            },
// 搜索
            searchDown(){
                this.renewlist()
            },
//日期
            getDate(){

                this.start_date  = moment(this.hisdate[0]).format('YYYY-MM-DD');
                this.end_date = moment(this.hisdate[1]).format('YYYY-MM-DD');
                this.renewlist()
            },
            add_xufei_date(){

                if(moment(this.numberValidateForm.payment_time).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD')){
                    this.show_date = true
                }else{
                    this.show_date = false
                }
            },
//新增续费
            addxufei(){
                this.numberValidateForm =  {
                        zh_name:'',
                        submituser:'',
                        payment_type: 1,
                        advertiser:'',
                        account_id:'',
                        money:'',
                        payment_time:moment().format('YYYY-MM-DD'),
                        note:'',
                        show_money:'',
                };
                this.numberValidateForm.submituser = this.user.id;
                this.add_xufei = true;
                this.place_advertiser_list();

            },

//分页
            handleSizeChange(val) {
                this.page = val;
                this.pageSize =val;
                this.loading = true;
                this.renewlist()
            },
            handleCurrentChange(val) {
                this.num = val;
                this.loading = true;
                this.renewlist()
            },

//导出
            Excel(){
                this.Exceldomain_list()
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
//  弹窗 -- 下拉
            add_kehu(){
                this.numberValidateForm.zh_name = '';
                this.zhanghubol = false;
                this.place_to_advertise();
            },
            add_zh(val){
                this.numberValidateForm.account_id = this.zh_options[val].id;
                this.contract_id = this.zh_options[val].contract_id;
                this.qd_addrenew()
            },
// 返点
            xufeiNum(){
                if(Number(this.numberValidateForm.money)<0){
                    this.numberValidateForm.money = 0;
                }
                this.numberValidateForm.show_money  =  Number(this.numberValidateForm.money)*(1+Number(this.fandian)/100).toFixed(2)
            },
            //提交
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.numberValidateForm.payment_time = moment(this.numberValidateForm.payment_time).format('YYYY-MM-DD');
                        this.$confirm('是否提交?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.qd_addrenew_return();


                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消提交'
                            });
                        });
                    } else {
                        return false;
                    }
                });
            },
            //重置
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.numberValidateForm.show_money = 0;
            },
//  查看审核----------查看详情
            look_infor(val){
                this.jiexiBol = true;
                this.listInfor = [];
                this.look_fk_type = val.fk_type;
                this.listInfor.push(val);
                if(val.audit == 2 && val.is_ultimate_shenhe == 0){
                    this.audit_history();
                }

                this.add_show_money == '';
                this.textarea_note == ''
            },
            shenheChange(){
                if(this.shenhe_radio == 2){
                    this.add_show_money == ''
                }
            },
            thisTan(){
                this.$confirm('是否提交?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.qd_renewshenhe1();


                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消提交'
                    });
                });
            },
// 提交详情
            push_shenhe(){
                if(this.shenhe_radio == 1 && this.look_fk_type == 1){
                    if(this.add_show_money == ''){
                        this.$message({
                            type: 'info',
                            message: '媒体报价不能为空'
                        });
                    }else{
                            this.thisTan()
                    }
                }else if(this.shenhe_radio != 1 && this.look_fk_type == 1){
                    if(this.textarea_note == ''){
                        this.$message({
                            type: 'info',
                            message: '审核备注不能为空'
                        });
                    }else{
                        this.thisTan()
                    }
                }  else if( this.look_fk_type != 1 && this.shenhe_radio != 1 ){
                    if(this.textarea_note == ''){
                        this.$message({
                            type: 'info',
                            message: '审核备注不能为空'
                        });
                    }else{
                        this.thisTan()
                    }

                }else {
                    this.thisTan()
                }

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
            filterTime: function (val) {
                var time=new Date(parseInt(val) * 1000);
                return   moment(time).format('YYYY-MM-DD HH:mm:ss')
            },
        },
        props: ['infoedata_ladnpage']
    }
</script>
