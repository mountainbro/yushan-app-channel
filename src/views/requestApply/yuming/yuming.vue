<template>
 <el-row class="menu">
         <el-row :gutter="20" class="urljiexi" >
             <el-col :span="10" style="min-width:370px;">
                 <div class="main">

                     <div class="lis" >
                         <span>选择客户：</span>
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
                         <span>选择账户：</span>
                         <el-select style="min-width:290px;" size="mini" v-model="tuiguang.value1" filterable placeholder="请选择">
                             <el-option
                                     v-for="item in zhanghuoptions"
                                     :key="item.id"
                                     :label="item.a_users"
                                     :value="item.id">
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
             <el-button size="mini" type="primary" @click="gojiexi()">确 定</el-button>
             <el-button size="mini" @click="clear">清空内容</el-button>
         </div>
 </el-row>
</template>
<script>
import {mapGetters} from 'vuex';
import {  place_advertiser_list,place_to_advertise,place_account_domain,add_jiexi_url } from '@/api/acount';
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
                    console.log(response.data)
                   this.zhanghuoptions=response.data.data;
                }).catch(err => {
                    this.$message.error(err);
                });
            },
            add_jiexi_url(){
                add_jiexi_url({
                    account_id:this.tuiguang.value1,
                    note:this.tuiguang.coment,
                    submitusers:this.user.id
                }).then(response => {
                    console.log(response.data)
                    this.tuiguang={
                                    value:'',
                                    value1:'',
                                    usrName:'',
                                    domain:'',
                                    coment:'',
                                },
                    this.$message.success('需求添加成功');
                   this.zhanghuoptions=response.data.data;
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
    },
    mounted(){
        this.place_advertiser_list();
        
    },
    methods:{

        //客户change
        kehuchange(){
            this.place_to_advertise()
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
        },
        //添加url解析
        addurlEvent(){
            this.urlrequest.push('');
        },
        /* 二级域名解析 */
        gojiexi(){
            if(this.tuiguang.value1&&this.tuiguang.value&&this.tuiguang.coment){
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
    }
}
</script>
<style lang="scss" >
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

