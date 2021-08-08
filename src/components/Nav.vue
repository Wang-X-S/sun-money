<template>
  <nav class="nav">
    <router-link to="/money" class="item" active-class="selected">
      <Icon name="money"/>
      记账</router-link>

    <router-link to="/echarts" class="item" active-class="selected">
      <Icon name="label"/>
      标签</router-link>

    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="statistics" />
      统计</router-link>
  </nav>
</template>

<script lang="ts">
  let importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
  try {importAll(require.context('../assets/icons', true, /\.svg$/));} catch (error) {console.log(error);}
  export default {
    name: "Nav",
    components:{}
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  nav {
    @extend %outShadow;
    display:flex;
    flex-direction: row;
    > .item {
      padding:2px 0;
      width:33.3333%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      opacity: 0.5;
      font-weight: 600;
      .icon{
        width:32px;
        height:32px;
  }
    }
    > .item.selected{
      color:$color-fontBlue;
      opacity:1;
    }
  }

</style>