<template>
    <el-row class="header">
        <el-col :span="24">
            <el-col :span="18" class="left_header">
                <span class="header_title">工作台</span>
                <el-menu :default-active="activeIndex"  mode="horizontal" >
                    <template v-for="(item,index) in permissionRoutes" v-if="!item.hidden">
                        <el-menu-item :index="item.path" :key="index"  v-if="item.children.length<=1">
                            <router-link :to="item.path" class="router_class">
                                {{item.meta.title}}
                            </router-link>
                        </el-menu-item>
                        <el-submenu :index="item.path"   v-if="item.children.length>1" :key="index">
                            <template slot="title" >
                                {{item.meta.title}}
                            </template>
                            <router-link
                                    class="header_tan"
                                    v-for="child1 in item.children"
                                    :key="child1.path"
                                    v-if="!child1.hidden"
                                         :to="{name:child1.name}">
                                <el-menu-item :index="child1.name">
                                    {{child1.meta.title}}
                                </el-menu-item>

                            </router-link>
                        </el-submenu>
                    </template>
                </el-menu>
            </el-col>
            <el-col :span="6" class="right_header">
                <!--<el-dropdown class="tishi" trigger="click" >-->
                    <!--<el-badge :value="allval" :max="99" class="item" style="border: none;font-size: 12px">-->
                        <!--<img src="" alt="" style="width: 25px">-->
                    <!--</el-badge>-->
                    <!--<el-dropdown-menu slot="dropdown"  class="header_tishi">-->
                        <!--<el-dropdown-item v-for="(data,key) in daibanAll">-->
                            <!--<div  @click="jump(key)">-->
                                <!--<el-badge :value="data" :max="99" class="item" style="border: none;font-size: 12px;color:white;" v-if="Number(data) != 0" >-->
                                    <!--{{ key | filterName }}-->
                                <!--</el-badge>-->
                            <!--</div>-->

                        <!--</el-dropdown-item>-->
                    <!--</el-dropdown-menu>-->
                <!--</el-dropdown>-->
                <el-dropdown trigger="click">
                      <span class="el-dropdown-link">
                        {{user.name}}
                        <i class="el-icon-caret-bottom"/>
                      </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item divided><span  style="display:block;" @click="go_login">退出登录</span></el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-col>
    </el-row>
</template>

<script>
    import { mapGetters } from 'vuex';
    import permissionRoutes from '@/store/permission';

    export default {
    name: 'SidebarItem',
    data(){
      return {
          activeIndex: '',
          permissionRoutes:[],
          header_router:[],
      }
    },
      computed: {
          ...mapGetters([
              'LogOut',
                'user',
                'permission_routers'
          ])
      },
      watch: {

      },
    methods: {
        go_login(){
            this.$router.push({ name: 'Login' })
        },
    },
    mounted(){
        this.permissionRoutes =  permissionRoutes.getHeaderMenu();
        this.activeIndex =  this.activeNav='/'+this.$route.path.split('/')[1];
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss">
    .header {
        width:100%;
        height:50px;
        background: white;
        z-index: 99;
        .left_header {
            height:50px;
            padding-left: 20px;
            .header_title {
                display: inline-block;
                height:50px;
                line-height: 50px;
                vertical-align: top;
                font-size: 24px;
                font-weight: bold;
                color: #7e7e7e;
                margin-right: 80px;
            }
            ul{
                display: inline-block;
                vertical-align: top;
                li {
                    height:50px;
                    line-height: 50px;
                    padding: 0;
                    .router_class {
                        display: block;
                        width:100%;
                        height:100%;
                        padding: 0 20px;
                    }
                    .el-submenu__title {
                        height:50px;
                        line-height: 50px;
                    }
                }
            }

        }
        .right_header {
            height: 50px;
            line-height: 50px;
            text-align: right;
            padding-right: 20px;
        }
    }
    .header_tan {
        display: block;
        height:40px;
        line-height: 40px;
        text-align: center;
    }
</style>