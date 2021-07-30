<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
  import oldStore from "@/store/index2"
  export default {
    data(){
      return {
        oldStore
      }
    }
  }
</script>

<style lang="scss">
  @import "~@/assets/style/reset.scss";
  @import "~@/assets/style/helper.scss";

body{
  line-height:1.5;
  font-family:$font-hei;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color:#333;
  font-size: 16px;
}

</style>
