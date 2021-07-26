<template>
  <header>
    <ul class="types">
      <li :class="type==='-'&&'selected'" @click="selectType('-')">支出</li>
      <li :class="type==='+'? 'selected':''" @click="selectType('+')">收入</li>
    </ul>
  </header>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  @Component
  export default class Types extends Vue {
    type = '-';

    selectType(type: string) {
      if (type !== '-' && type !== '+') {
        throw new Error('type is unknown');
      }
      this.type = type;
    }
  }
  // export default {
  //   name: "Types",
  //   data(){
  //     return {
  //       type:'-'
  //     }
  //   },
  //   methods:{
  //     selectType(type){
  //       if(type !== '-' && type !=='+'){
  //         throw new Error('type is unknown')
  //       }
  //       this.type = type
  //     }
  //   }
  // }
</script>

<style lang="scss" scoped>

  header{
    background: #f8f8f8;

    display: flex;
    align-items: center;
    justify-content: center;
    background: darken(#ffffff,3%);
  >.types {
    height:50px;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;

    > li {
      height:30px;
      border-radius: 5px;
      padding:3px 35px;
      display: flex;
      font-weight: 700;
      justify-content: center;
      align-items: center;
      color:#18a0fb;
      background: #ffffff;
      box-shadow: inset 0 0 1px 1px #18a0fb;

      &.selected{
        background: #18a0fb;
        color:white;
        box-shadow: inset 0 0 1px 1px #ffffff;
      }
    }
  }
  }
</style>