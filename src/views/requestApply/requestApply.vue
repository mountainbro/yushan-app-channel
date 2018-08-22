<template>
    <el-row class="requestapply" style="background:white;">
        <el-tabs type="card" style="min-width: 900px;" v-model="activeName" @tab-click="handleClick()">
            <el-tab-pane label="二级域名解析" class="tab_top" name="second">
                <div class="menu" >
                    <el-row :gutter="20" class="urljiexi" >
                    <el-col :span="10" style="min-width:370px;">
                        <div class="main"> 
                            
                            <div class="lis" >
                                <span>渠道</span>
                                <el-input  style="min-width:290px;" size="mini" v-model="tuiguang.usrName" placeholder="请输入帐户名"></el-input>
                            </div>
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
                </div>
            </el-tab-pane>
            <el-tab-pane  label="上线推广页面" class="tab_top" name="first">
                <div class="menu">
                    <el-row :gutter="20">
                        <el-col :span="10">
                            <div class="main">
                                <!-- 新增需求 -->
                                <!-- <div class="titles">上传素材</div>    -->
                                <div class="lis" >
                                    <span>选择客户：</span>
                                    <el-select style="width:300px;" size="mini" v-model="tuiguang.value" filterable placeholder="请选择">
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
                                    <el-select style="width:300px;" size="mini" v-model="tuiguang.value" filterable placeholder="请选择">
                                        <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="lis" >
                                    <span>二级域名：</span>
                                    <el-select style="width:300px;" size="mini" v-model="tuiguang.value" filterable placeholder="请选择">
                                        <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="lis" >
                                    <span>详细需求：</span>
                                    <el-input size="mini" v-model="tuiguang.coment" 
                                    type="textarea"
                                    style=""
                                    :autosize="{ minRows: 2, maxRows: 4}"
                                    placeholder="请输入内容"></el-input>
                                </div>
                                <div class="lis" >
                                    <span style="vertical-align: top;">上传素材包：</span>
                                    <el-upload style="display: inline-block;" :on-success="upsuccess" class="upload-demo" action="/demand/uploadF" :on-change="handleChange">
                                        <el-button size="mini" style="margin-left: 15px;" type="primary">选择上传文件</el-button>
                                        <div slot="tip" style="margin-left: 15px;" class="el-upload__tip">只能上传zip文件</div>
                                    </el-upload>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="titles">标准合规页面样例</div>
                            <div class="redinfo">注：需标准页面执行，否则不予上线</div>
                        </el-col>
                        <el-col :span="6">
                            
                            <div class="phone">
                                <img class="logo" src="http://test.myushan.com//logo/black_zhiniao.png" alt="">
                                <div class="rules">
                                    <h3>落地页规范</h3>
                                    <p>1.严禁自动下载</p>
                                    <p>2.严禁全屏下载</p>
                                    <p>3.只有按钮点击下载</p>
                                    <p>4.logo，版权清晰可见</p>

                                </div>
                                <div class="banquan">北京智鸟科技有限公司版权所有</div>
                            </div> 
                        </el-col>
                        
                    </el-row>
                    <div style="text-align:center;position:fixed;bottom:5vh;left:0;right:0;">
                        <el-button size="mini" type="primary" @click="goTuiGuang">确 定</el-button>
                        <el-button size="mini" @click="clear">清空内容</el-button>
                    </div>
                </div>
            </el-tab-pane>
            
            <el-tab-pane label="历史申请" class="tab_top" name="third">
                <div class="menu">
                    <!-- 搜索框 -->
                    <el-input size="mini" style="width: 35%;" v-model="lishi.search1" placeholder="搜索账户名">
                        <el-button size="mini" slot="append" icon="el-icon-search" @click="searchinfo1"></el-button>
                    </el-input>
                    <div class="lis" style="display:inline-block;" >
                        <span>客户：</span>
                        <el-select style="width:300px;" size="mini" v-model="tuiguang.value" filterable placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <el-button size="mini" type="primary" @click="searchHistory">查 询</el-button>
                    <el-button size="mini" @click="reset">重 置</el-button>
        
                    <!-- 表格数据展示 -->
                    <el-table v-loading="tableshow" :data="tableData1" class="vue-table" height="440"  border @sort-change="sortTable"  >
                        <el-table-column prop="id" label="编号" sortable='custom' min-width="80">
                        </el-table-column>
                        <el-table-column  prop="sub_date" label="时间" sortable='custom' min-width="140">
                            <template slot-scope="scope">
                                  {{scope.row.ctime|timeFormat1}}  
                            </template>
                        </el-table-column>
                        <el-table-column label="客户" min-width="180">
                                <template slot-scope="scope">
                                        <span>{{scope.row.advertiser||"空"}}</span>
                                    </template>
                        </el-table-column>
                        <el-table-column  label="帐户" min-width="180">
                                <template slot-scope="scope">
                                        <span>{{scope.row.a_users||"空"}}</span>
                                    </template>
                        </el-table-column>
                        <el-table-column prop="true_url" label="需求类型" min-width="150" 
                            :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
                            :filter-method="filterHandler"
                        >
                            <template slot-scope="scope">
                                <el-alert
                                    :title="scope.row.true_url|requestStatus1"
                                    :type="scope.row.true_url|statuss1"
                                    :closable="false"
                                    style="background-color: transparent;"
                                    show-icon>
                                </el-alert>
                            </template>
                        </el-table-column>
                        <el-table-column  label="进度" min-width="100"
                            :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
                            :filter-method="filterHandler"
                        >
                            <template slot-scope="scope">
                                <span>{{scope.row.prname||'空'}}</span>
                            </template>
                            
                        </el-table-column>
                        <el-table-column  label="审核状态" min-width="100"
                            :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
                            :filter-method="filterHandler"
                        >
                            <template slot-scope="scope">
                                <span>{{scope.row.name||'空'}}</span>
                            </template>
                            
                        </el-table-column>
                        <el-table-column label="操作" style="" min-width="130" >
                            <template>
                                <span style="color:blue;cursor:pointer">查看</span>
                            </template>
                        </el-table-column>
        
                    </el-table>
                    <!-- 表格分页 -->
                    <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :current-page="currentPage1" :page-sizes="[20, 30, 50]"
                         layout="total, sizes, prev, pager, next, jumper" style="text-align: center;margin-top: 10px;"
                        :total="totalnum1">
                    </el-pagination>
                    <!-- 新增需求 -->
                    <!-- <el-dialog title="解析二级域名" :visible.sync="jiexiBol" width="40%" modal="true" lock-scroll="true" close-on-click-modal="true" close-on-press-escape="true">
                        <div  class="lis">
                            <strong><span>客户：</span></strong>
                            {{jiexiInfo.advertiser||'空'}}
                        </div>    
                        <div class="lis">
                            <strong><span>帐户:</span></strong>
                            {{jiexiInfo.a_users||'空'}}
                        </div>
                        <div  class="lis">
                            <strong><span>解析说明:</span></strong>
                            {{jiexiInfo.note||'空'}}
                        </div>
                        <div  class="lis">
                            <strong><span>主域：</span></strong>
                            {{jiexiInfo.url||'空'}}
                        </div>
                        <div  class="lis">
                            <strong><span>二级域名：</span></strong>
                            <el-input style="width: 55%;" v-model="coment1" placeholder="写上解析好的二级域名"></el-input>
                        </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button size="mini"@click="jiexiBol = false">取 消</el-button>
                            <el-button size="mini"type="primary" @click="jiexiEvent">确 定</el-button>
                        </span>
                    </el-dialog> -->
                </div>
            </el-tab-pane>
        </el-tabs>
    </el-row>
</template>
<script>
export default {
    data() {
        return{
            newTask:true,
            tableData:[],
            activeName:'first',
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
            // 历史申请
            tableData1:[],
            excelurl:'',
            tableshow:false,
            currentPage1:1,
            totalnum1:111,
            lishi:{
                search1:'',
                timeChoose1:'',
                valuestatus:'',

            },
            pickerOptions: {
                disabledDate(time){
                    return time.getTime() >= Date.now() ;
                },
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
        }
    },
    created(){

    },
    mounted(){

    },
    methods:{
        //tab切换事件
        handleClick(){
        },
        //上传压缩包
        upsuccess(){

        },
        //上传change触发事件
        handleChange(){

        },
        //清空需求内容
        clear(){

        },
        //上线推广
        goTuiGuang(){

        },
        //添加url解析
        addurlEvent(){
            this.urlrequest.push('');
        },
        /* 二级域名解析 */
        gojiexi(){

        },
        /* 历史申请中用到的 方法 */
        searchinfo1(){

        },
        timeChooseEvent1(){

        },
        statusChange(){

        },
        daochu(){

        },
        sortTable(){

        },
        handleSizeChange1(){

        },
        handleCurrentChange1(){

        },
        filterHandler(value, row, column) {
            const property = column['property'];
            return row[property] === value;
        },
        searchHistory(){

        },
        reset(){

        },
        
        
    },
    filters:{

    },
    computed:{

    }
}
</script>
<style lang="scss" scoped>
    .requestapply {
        padding: 12px 25px;
        .menu{
            padding: 9px 0;
            height: 60vh;
        }
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
        .vue-table{
            margin-top: 30px!important;
        }
    }
</style>

