
<template>
    <el-row >
        <el-col :span="24" class="search_title">
            <el-input v-model="search" size="mini" style="width: 200px"></el-input>
            <span class="name">按客户查看:</span>
            <el-select v-model="acountselect" size="mini" placeholder="请选择" @change="acountAcount">
                <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.advertiser"
                        :value="item.id">
                </el-option>
            </el-select>
        </el-col>
    </el-row>
</template>

<script>
    import { mapActions } from 'vuex';
    import {  place_advertiser_list } from '@/api/acount';
    export default {
        data() {
            return {
                search:'',
                acountselect:'',
                options:[],
// 下拉列表
                place_advertiser_list(){
                    place_advertiser_list({
                    }).then(response => {
                       response.data.unshift({
                            advertiser:'全部',
                            id:'',
                        })
                        this.options =  response.data;
                    }).catch(err => {
                        this.$message.error(err);
                    });
                },
            }
        },
        created(){
            let _this = this;
            document.onkeydown = function(e){
                if(e.which == '13'){
                    _this.search_change();
                }
            }
        },
        mounted() {
            this.place_advertiser_list();
        },
        watch:{

        },
        methods: {
            search_change(){
                this.$emit('searchChange',this.search);
            },
            acountAcount(){

                this.$emit('acountChange',this.acountselect);



            },
        },
        destroyed() {

        }
//        props: ['customer_Data_type']
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    .search_title {
        height:40px;
        line-height: 40px;
        margin-bottom: 5px;
        font-size: 14px;
        .name {
            margin-left: 20px;
            margin-right: 10px;
        }
    }
</style>
