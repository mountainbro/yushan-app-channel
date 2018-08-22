<template>
 <el-row class="menu">
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
 </el-row>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
    data() {
        return{
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



        }
    },
    created(){

    },
    components: {
//            upload,
    },
    mounted(){

    },
    methods:{


        //清空需求内容
        clear(){

        },
        //添加url解析
        addurlEvent(){
            this.urlrequest.push('');
        },
        /* 二级域名解析 */
        gojiexi(){

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

