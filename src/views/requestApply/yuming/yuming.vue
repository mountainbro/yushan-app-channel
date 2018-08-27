<template>
 <el-row class="menu">
         <el-row :gutter="20" class="urljiexi" >
             <el-col :span="10" style="min-width:370px;">
                 <div class="main">
                     <div class="lis" >
                         <span class="lis_span">选择客户：</span>
                         <el-select style="min-width:290px;" size="mini" v-model="tuiguang.value" filterable placeholder="请选择" @change="kehuchange">
                             <el-option
                                     v-for="item in companyoptions"
                                     :key="item.id"
                                     :label="item.advertiser"
                                     :value="item.id">
                             </el-option>
                         </el-select>
                     </div>
                     <div class="lis" >
                         <span class="lis_span">选择账户：</span>
                         <el-select style="min-width:290px;" size="mini" :disabled="zhanghubol" v-model="tuiguang.value1" filterable placeholder="请选择">
                             <el-option
                                     v-for="item in zhanghuoptions"
                                     :key="item.id"
                                     :label="item.a_users"
                                     :value="item.id">
                             </el-option>
                         </el-select>
                     </div>
                     <div class="lis" >
                         <span class="lis_span">解析需求备注</span>
                         
                     </div>
                     <div v-for="(item,index) in urlrequest" :key="index" style="padding: 6px 0;" >

                        <span class="lis_span" 
                            style="font-size: 14px;
                            display: inline-block;
                            width: 90px;"> 
                            解析 {{index+1}}：
                     </span>
                        <el-input  size="mini" v-model="urlrequest[index]"
                                    type="textarea"
                                    style="width:290px;vertical-align:middle;"
                                    :autosize="{ minRows: 3, maxRows: 6}"
                                    :placeholder="defaultContent">
                        </el-input>
                    </div>
                    <div class="addurl" style="" @click="addurlEvent">
                        <i  style="
                                
                                font-size: 14px;
                                margin: 5px auto;
                                vertical-align:middle;"
                            class="el-icon-circle-plus-outline">
                        </i>
                        <span style="font-size: 12px;">添加</span>
                    </div>

                 </div>
                 <div style="text-align:center;">
                    <el-button size="mini" :disabled="bol" :loading="bol" type="primary" @click="gojiexi()">确 定</el-button>
                    <el-button size="mini" @click="clear">清空内容</el-button>
                </div>
             </el-col>


         </el-row>
 </el-row>
</template>
<script>
import {mapGetters} from 'vuex';
import {  place_advertiser_list,place_to_advertise,add_jiexi_url } from '@/api/acount';
export default {
    data() {
        return{
            tuiguang:{
                value:'',
                value1:'',
                usrName:'',
                domain:'',
                coment:'',
            },
            companyoptions:[],
            zhanghuoptions:[],
            urlrequest:[''],
            bol:false,
            zhanghubol:true,
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
            add_jiexi_url(){
                this.bol = true;
                add_jiexi_url({
                    account_id:this.tuiguang.value1,
                    note:this.urlrequest,
                    submitusers:this.user.id
                }).then(response => {
                    this.$message.success('需求添加成功');
                    this.tuiguang={
                        value:'',
                        value1:'',
                        usrName:'',
                        domain:'',
                        coment:'',
                    },
                    this.bol = false;
                    this.urlrequest = [''];
                   this.zhanghuoptions=response.data.data;

                    this.$emit('add_url');
                }).catch(err => {
                    this.$message.error(err);
                    this.bol = false;
                });
            },


        }
    },
    created(){

    },
    components: {
//            upload,
    },
    mounted(){

        
    },
    watch:{
        yuming_tab(){
            this.place_advertiser_list();
        },
    },
    methods:{

        //客户change
        kehuchange(){
            this.place_to_advertise()
            this.tuiguang.value1 = '';
            this.zhanghubol = false;
        },
        //清空需求内容
        clear(){
            this.tuiguang={
                value:'',
                value1:'',
                usrName:'',
                domain:'',
                coment:'',
            }
            this.urlrequest = [''];
            this.zhanghubol = true;
        },
        //添加url解析
        addurlEvent(){
            this.urlrequest.push('');
        },
        /* 二级域名解析 */
        gojiexi(){
            if(this.tuiguang.value1&&this.tuiguang.value&&this.urlrequest[0]){
                this.$message('正在提交，请稍后');
                this.add_jiexi_url();
            }else{
                 this.$message.error('信息没有添加完成');
            }
            
        },
    },
    computed:{
        ...mapGetters([
            'user',
        ])
    },
//
    props: ['yuming_tab']
}
</script>
<style lang="scss" >
    @import "@/styles/table.scss";
    .requestapply {
       .main{
           .lis{
               padding: 12px 0  ;
               .lis_span{
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
        .urljiexi{
            .addurl{
                text-align:left;
                cursor: pointer;
            }
        }
    }
</style>

