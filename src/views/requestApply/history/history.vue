<template>
    <el-row  >
        <div class="hio">
            <!-- 切换table列表 -->

                <el-radio-group v-model="chooseData" @change="radioChange">
                    <el-radio-button label="urlData">二级域名</el-radio-button>
                    <el-radio-button label="luodiData">落地页</el-radio-button>
                </el-radio-group>

            <!-- 搜索框 -->
            <el-col :span="24" >
                <yuming ref="yuming" :infoedata_yuming="infordata" v-if="chooseData == 'urlData'"></yuming>
                <landpage ref="land" :infoedata_ladnpage="infordata_land"  v-if="chooseData == 'luodiData'"></landpage>
            </el-col>

        </div>
    </el-row>
</template>
<script>
 import yuming from './yuming';
 import landpage from './landpage';
 export default {
    data() {
        return{
            chooseData:'urlData',
            infordata:'',
            num:0,
            infordata_land:'',
        }
    },
    created(){

    },
    components: {
        yuming,
        landpage,
    },
     watch:{
         history_tab(){
             this.num++
             if(this.chooseData == 'urlData'){
                 this.$refs.yuming.yumingData();
             }else{
                 this.$refs.land.landData();

             }

         },
     },
    methods:{
// 切换二级域和落地页
        radioChange(){
            this.num++
            if(this.chooseData == 'urlData'){
                this.$refs.yuming.yumingData();
            }else{
                this.$refs.land.landData();
            }
        },
    },
     props: ['history_tab']
}
</script>

<style rel="stylesheet/scss"  lang="scss">
    .his_tan {
        .search_title {
            height:40px;
            line-height: 40px;
            margin-bottom: 5px;
            font-size: 14px;
            .name {
                margin-right: 10px;
            }
        }
        .el-dialog {
            font-size: 14px;
            width:480px;
            .el-dialog__header {
                padding: 0 0 0 20px ;
                height:40px;
                line-height: 40px;
                position: relative;
                border-bottom: 1px solid #f5f7fa;
                .el-dialog__title {
                    font-size: 14px;
                }
                .el-dialog__headerbtn {
                    position: absolute;
                    right:10px;
                    bottom:0;
                    top:0;
                    margin:auto;
                }
            }
            .el-dialog__body {
                padding: 0 0 20px 0;
                .list {
                    margin:8px 0;
                    display: flex;
                    .title{
                        width:85px;
                    }
                    .right_title {
                        width:350px;
                        word-wrap: break-word;
                        word-break: normal;
                        .el-checkbox{
                            margin-left: 10px!important;
                        }
                    }
                }
                .add_infor {
                    margin:5px 0;
                    display: flex;
                    .title{
                        width:85px;
                    }
                    .right_title {
                        width:350px;
                        word-wrap: break-word;
                        word-break: normal;
                    }

                }
            }
            .el-dialog__footer {
                text-align: center;
                padding: 10px 0;
            }
        }
    }
</style>
