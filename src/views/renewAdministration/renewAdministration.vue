<template>
    <el-row class="renew_all" >
        <el-tabs type="card"  v-model="activeName" @tab-click="handleClick()">
            <el-tab-pane label="续费列表" class="tab_top" name="xufei">
                <renew_list ref="xufei" ></renew_list>
            </el-tab-pane>
            <el-tab-pane label="退款列表" class="tab_top" name="tuikuan">
                <tuikuan_list ref="tuikuan" ></tuikuan_list>
            </el-tab-pane>
            <el-tab-pane label="回款列表" class="tab_top" name="huikuan">
                <huikuan_list ref="huikuan" ></huikuan_list>
            </el-tab-pane>
        </el-tabs>
    </el-row>
</template>
<script>
    import {mapGetters} from 'vuex';
    import renew_list from './renew/renew_list.vue';
    import tuikuan_list from './tuikuan/tuikuan_list.vue';
    import huikuan_list from './huikuan/huikuan_list.vue';


    export default {
        data() {
            return{
                activeName:'xufei',
            }
        },
        components:{
            renew_list,
            tuikuan_list,
            huikuan_list
        },
        mounted(){
            this.$refs.xufei.xufei();
        },
        methods:{
            handleClick(){
                if(this.activeName == 'xufei'){
                    this.$refs.xufei.xufei();
                }else if(this.activeName == 'tuikuan'){
                    this.$refs.tuikuan.back_money();
                }else if(this.activeName == 'huikuan'){
                    this.$refs.huikuan.huikuan_money();
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

    .renew_all {

        width:100%;
        height:800px;
        background: white;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        padding:20px;
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
                width:500px;
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
                    .infor {
                        .list {
                            width:50%;
                            display: inline-block;
                            .title{
                                width:85px;
                                display: inline-block;
                            }
                            .right_title {
                                width:200px;
                                display: inline-block;
                                word-wrap: break-word;
                                word-break: normal;
                            }
                        }
                    }
                    .noteInfor {
                        .list{
                            width:100%;
                        }
                    }
                    .shenhe {
                        .list {
                            width:100%;
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
                }
                .el-dialog__footer {
                    text-align: center;
                    padding: 10px 0;
                }
            }
        }
        .xuqiuInfor {
            .el-dialog {
                width: 650px;
            }
        }
    }
</style>

