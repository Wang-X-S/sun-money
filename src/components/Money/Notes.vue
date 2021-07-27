<template>
  <div>
    <label class="notes">
      <Icon name="sunny"/>
      <span class="name">记 录</span>
      <input type="text"
             placeholder="在这里输入备注"
             v-model="value"
      >
    </label>
  </div>
</template>

<script lang="ts">

  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  @Component
  export default class Notes extends Vue{
    value='';

  }
</script>

<style scoped lang="scss">
  @import '~@/assets/style/helper.scss';
  @-webkit-keyframes spin {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .notes {
    font-size: 14px;
    background: $color-fontBlue;
    padding-left: 10px;
    display: flex;
    align-items: center;
    .icon{
      width:40px;
      height:40px;
      animation: spin 1s infinite;
      -webkit-animation: spin 10s infinite linear;
    }

    .name {
      padding-right: 16px;
      color:#ffffff;
      font-weight: 600;
      font-size: 18px;
    }

    input {
      margin:6px 6px 6px 6px;
      border-radius: 8px;
      height: 44px;
      flex-grow: 1;
      background: #ffffff;
      border: none;
      padding-right: 16px;
      padding-left: 16px;


    }
  }
</style>