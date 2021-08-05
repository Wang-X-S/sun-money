<template>
  <div>
    <div class="icon-wrapper">
      <Icon name="打印机"/>
      <span>暂无数据，快去记一账吧</span>
    </div>
    <div class="createTag-wrapper">
      <router-link to="/money">
        <button class="createTag" >立即记账</button>
      </router-link>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class Blank extends Vue {

  }
</script>

<style scoped lang="scss">
  @import '~@/assets/style/helper.scss';
  .icon-wrapper{
    padding-top:100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .icon{
        width:70px;
      height: 70px;
    }
  }
  .createTag{
    border:none;
    background: $color-fontBlue;
    color:white;
    padding:6px 16px;
    border-radius: 12px;
    font-size: 18px;
    &-wrapper{
      margin-top:20px;

      display: flex;
      justify-content: center;
    }
  }
</style>