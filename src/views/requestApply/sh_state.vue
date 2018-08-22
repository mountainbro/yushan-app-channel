<template>
    <div>
        <div v-for="(item,index) in 2" :key="index" style="display: inline-block;vertical-align: middle;">
            <div v-if="state.audit == 0">

                <div v-if="item < state.audit_count ">
                    <el-tooltip :content="item+'级审核通过'" placement="right" effect="light">
                        <img src="./img/duigou.png"  style="width: 18px;height: 18px;cursor: pointer"  alt="">
                    </el-tooltip>
                </div>
                <div v-if="item == state.audit_count ">
                    <el-tooltip :content="item+'级未审核'" placement="right" effect="light">
                        <img src="./img/dengdai.png"  style="width: 18px;height: 18px;cursor: pointer"  alt="">
                    </el-tooltip>
                </div>
                <div v-if="item > state.audit_count ">
                    <el-tooltip :content="item+'级未审核'" placement="right" effect="light">
                        <img src="./img/dengdai.png"  style="width: 18px;height: 18px;cursor: pointer"  alt="">
                    </el-tooltip>
                </div>
            </div>
            <div v-if="state.audit == 1">
                <div v-if="item < state.audit_count ">
                    <el-tooltip :content="item+'级审核通过'" placement="right" effect="light">
                        <img src="./img/duigou.png"  style="width: 18px;height: 18px;cursor: pointer"  alt="">
                    </el-tooltip>
                </div>
                <div v-if="item == state.audit_count ">
                    <el-tooltip :content="item+'级审核通过'" placement="right" effect="light">
                        <img src="./img/duigou.png"  style="width: 18px;height: 18px;cursor: pointer"  alt="">
                    </el-tooltip>
                </div>
                <div v-if="item > state.audit_count ">
                    <el-tooltip :content="item+'级未审核'" placement="right" effect="light">
                        <img src="./img/dengdai.png"  style="width: 18px;height: 18px;cursor: pointer"  alt="">
                    </el-tooltip>
                </div>
            </div>
            <div v-if="state.audit == 2">
                <div v-if="item < state.audit_count ">
                    <el-tooltip :content="item+'级审核通过'" placement="right" effect="light">
                        <img src="./img/duigou.png"  style="width: 18px;height: 18px;cursor: pointer"  alt="">

                    </el-tooltip>
                </div>
                <div v-if="item == state.audit_count ">

                    <el-tooltip :content="item+'级审未通过'" placement="right" effect="light">
                        <img src="./img/cha.png"  style="width: 18px;height: 18px;cursor: pointer"  alt="">

                    </el-tooltip>
                </div>
                <div v-if="item > state.audit_count ">
                    <el-tooltip :content="item+'级未审核'" placement="right" effect="light">
                        <img src="./img/dengdai.png"  style="width: 18px;height: 18px;cursor: pointer"  alt="">

                    </el-tooltip>
                </div>
            </div>
            <div v-if="state.audit == 3">
                <div v-if="item < state.audit_count ">
                    <el-tooltip :content="item+'级审核通过'" placement="right" effect="light">
                        <img src="./img/duigou.png"  style="width: 18px;height: 18px;cursor: pointer"  alt="">

                    </el-tooltip>
                </div>
                <div v-if="item > state.audit_count ">
                    <el-tooltip :content="item+'级未审核'" placement="right" effect="light">
                        <img src="./img/dengdai.png"  style="width: 18px;height: 18px;cursor: pointer"  alt="">

                    </el-tooltip>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex';
    export default {
        data() {
            return {
                state:{},
            }

        },
        methods:{

        },
        mounted:function(){
            this.state = this.stateData;
        },
        computed: {
            ...mapGetters([
                'user',
            ])
        },
        watch:{
            stateData:function(newValue){
                this.state = newValue;
            },
        },
        props: ['stateData']
    }
</script>
<style rel="stylesheet/scss"  lang="scss">

</style>