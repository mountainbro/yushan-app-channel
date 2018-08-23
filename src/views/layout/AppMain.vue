<template>
    <section class="app-main box_qd" >
        <transition name="fade" mode="out-in" >
            <router-view :key="key"></router-view>
        </transition>
    </section>
</template>

<script>
    export default {
      name: 'AppMain',
      computed: {
        key() {
          return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
        }
      }
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    .components-container{
        margin-top: 0;

    }
    .box_qd {
        width:100%;
        height:100%;
        position: absolute;
        left:0;
        bottom: 0;
        background: #eceef3;
        padding: 70px 20px 20px 20px;
        box-sizing: border-box;
        overflow-x: hidden;
    }
</style>
