<template>
   <el-row class="acount_box">
       <el-col :span="24" class="acount_title">
           账户列表
       </el-col>
       <search @searchChange="searchChange" @acountChange="acountChange"></search>
       <!--<upload ref="child"></upload>-->
       <el-col :span="24">
           <el-table
                   v-loading="loading"
                   :data="acountTable"
                   class="vue-table"
                   height="730"
                   stripe
                   border
                   style="width: 100%">
               <el-table-column
                       prop="package_name"
                       sortable="custom"
                       label="渠道名称">
                   <template scope="scope">

                       {{ scope.row.qudao_name }}
                   </template>
               </el-table-column>
               <el-table-column
                       label="账户名称">
                   <template
                           scope="scope">
                       {{ scope.row.a_users }}
                   </template>
               </el-table-column>
               <el-table-column
                       label="客户">
                   <template scope="scope">
                       {{ scope.row.advertiser }}
                   </template>
               </el-table-column>
               <el-table-column label="开户时间">
                   <template scope="scope">
                      {{ scope.row.ctime | filterDate}}
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
   </el-row>
</template>
<script>
    import { mapGetters } from 'vuex';
    import {  place_advertiser_list,place_to_advertise } from '@/api/acount';
    //    import upload from '../upload/upload';
        import search from '../search/search';

    const moment = require('moment');
    export default {
        data(){
            return {
                searchText:'',
                loading:true,
//分页
                acountTable:[],
                av_id:'',
                page:'20',
                num:'1',
                pageIndex:1,
                pageSize:20,
                kehuTableLength:0,


// 账户管理表格
                place_to_advertise(){
                    place_to_advertise({
                        av_id:this.av_id,
                        page:this.page,
                        num:this.num,
                        search:this.searchText,
                    }).then(response => {
                        this.loading = false;
                        this.acountTable = response.data.data;
                        this.kehuTableLength = response.data.totalCount;
                    }).catch(err => {
                        this.$message.error(err);
                    });
                },

            }
        },
        components: {
//            upload,
            search
        },

        computed: {
            ...mapGetters([

            ])
        },
        mounted(){

            this.place_to_advertise();

        },
        methods: {
// 调取子组件
//            btn(){
//                this.$refs.child.submitUpload()
//            },
            searchChange(val){
                this.loading = true;
                this.searchText = val;
                this.place_to_advertise();
            },
            acountChange(val){
                this.loading = true;
                this.av_id = val;
                this.place_to_advertise();
            },
//分页
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
        },
        filters: {
            filterDate: function (val) {
                var time=new Date(parseInt(val) * 1000);
                return   moment(time).format('YYYY-MM-DD HH:mm:ss')
            }
        },

    }
</script>
<style rel="stylesheet/scss" lang="scss">
    @import "@/styles/table.scss";
    @import "./css/acount.scss";
</style>