<template>
  <header>
    <ul class="types" :class="{[classPrefix+'-ul']:classPrefix}">
      <li v-for="item in dataSource" :key="item.value"
          @click="select(item)"
          :class="{[classPrefix+'-item']:classPrefix,
          selected:item.value === value}"
      >{{item.text}}
      </li>
    </ul>
  </header>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  @Component
  export default class Types extends Vue {
    @Prop({required:true,type:Array})
    dataSource!:{text:string,value:string}
    @Prop(String)
    value!:string;
    @Prop(String)
    classPrefix?: string;


    select(item:{text:string,value:string}){
      this.$emit('update:value',item.value)
    }

  }

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