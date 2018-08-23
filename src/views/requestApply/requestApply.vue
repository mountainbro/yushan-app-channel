<template>
    <el-row class="requestapply" >
        <el-tabs type="card"  v-model="activeName" @tab-click="handleClick()">
            <el-tab-pane label="二级域名解析" class="tab_top" name="second">
                <yuming></yuming>
            </el-tab-pane>
            <el-tab-pane  label="上线推广页面" class="tab_top" name="first">
                <landpage></landpage>
            </el-tab-pane>
            
            <el-tab-pane label="历史申请" class="tab_top" name="third">
               <history></history>
            </el-tab-pane>
        </el-tabs>
    </el-row>
</template>
<script>
import {mapGetters} from 'vuex';
import yuming from './yuming/yuming';
import landpage from './landpage/landpage';
import history from './history/history';
export default {
    data() {
        return{
            activeName:'third',

        }
    },
    created(){

    },
    components: {
        yuming,
        landpage,
        history,
    },
    mounted(){

    },
    methods:{
        //tab切换事件
        handleClick(){

        },
    },
    computed:{
        ...mapGetters([
            'user',
        ])
    }
}
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "@/styles/table.scss";
    .requestapply {
       .main{
           .lis{
               padding: 12px 0  ;
               span{
                   display: inline-block;
                //    width: 90px;
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

