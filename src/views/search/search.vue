
<template>
    <el-row >

        <el-col :span="24" class="search_title">
            <input v-model="search"   @keydown.13="searchDown" style="width: 200px;height: 21px;margin-right: 20px">
            <span class="name">客户:</span>
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
        mounted() {
            this.place_advertiser_list();
        },
        watch:{

        },
        methods: {
            searchDown(){
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
            margin-right: 10px;
        }
    }
</style>
