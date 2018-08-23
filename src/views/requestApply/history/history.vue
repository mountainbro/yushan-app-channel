<template>
    <el-row class="requestapply" >
        <div class="hio">
            <!-- 切换table列表 -->

                <el-radio-group v-model="chooseData" @change="radioChange">
                    <el-radio-button label="urlData">二级域名</el-radio-button>
                    <el-radio-button label="luodiData">落地页</el-radio-button>
                </el-radio-group>

            <!-- 搜索框 -->
            <el-col :span="24" >
                <yuming v-if="chooseData == 'urlData'"></yuming>
                <landpage v-if="chooseData == 'luodiData'"></landpage>
            </el-col>

        </div>
    </el-row>
</template>
<script>
 import {mapGetters} from 'vuex';
 import yuming from './yuming';
 import landpage from './landpage';
 export default {
    data() {
        return{
            chooseData:'urlData',
        }
    },
    created(){

    },
    components: {
        yuming,
        landpage,
    },

    mounted(){


    },

    methods:{
// 切换二级域和落地页
        radioChange(){

        },
    },

}
</script>

<style rel="stylesheet/scss"  lang="scss">
    .his_tan {
        .el-dialog {
            font-size: 14px;
            width:480px;
            .el-dialog__header {
                padding: 0 0 0 20px ;
                height:40px;
                line-height: 40px;
                font-size: 12px;
                position: relative;
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
