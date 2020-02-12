<template>
    <el-row class="requestapply" >
        <el-tabs type="card"  v-model="activeName" @tab-click="handleClick()">
            <el-tab-pane label="二级域名解析" class="tab_top" name="second">
                <yuming ref="yuming" :yuming_tab="infordata_yuming" @add_url="add_url"></yuming>
            </el-tab-pane>
            <el-tab-pane  label="上线推广页面" class="tab_top" name="first">
                <landpage ref="landpage" :landpage_tab="infordata_landpage" @add_landpage="add_landpage"></landpage>
            </el-tab-pane>
            <el-tab-pane label="历史申请" class="tab_top" name="third">
               <history :history_tab="infordata_his" ></history>
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
            activeName:'second',
            num:0,
            infordata_yuming:'',
            infordata_landpage:'',
            infordata_his:'',
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
        this.$refs.yuming.place_advertiser_list();
    },
    methods:{
        add_url(){
          this.activeName = 'third';
            this.infordata_his = this.activeName+ this.num
        },
        add_landpage(){
            this.activeName = 'third';
            this.infordata_his = this.activeName+ this.num
        },
        //tab切换事件
        handleClick(){
            this.num++;
            if(this.activeName == 'second'){
                this.$refs.yuming.clear();
                this.$refs.yuming.place_advertiser_list();
            }else if(this.activeName =='first'){
                this.$refs.landpage.clear();
                this.$refs.landpage.place_advertiser_list();
            }else{
                this.infordata_his = this.activeName+ this.num
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
<style rel="stylesheet/scss"  lang="scss">
    @import "@/styles/table.scss";

    .requestapply {

        width:100%;
        height:800px;
        background: white;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        padding:20px;

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
            background:  url(http://img.zntec.mobi/821phone.png) no-repeat ;
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

