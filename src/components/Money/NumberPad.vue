<template>
  <div class="numberPad">
    <div class="output">
      <button @click="changeDate"><Icon name="日历" class="dateIcon"/>
    </button>
      {{output ||'0'}}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="empty">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="ok" class="ok">OK</button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component,Prop} from 'vue-property-decorator';
  @Component
  export default class NumberPad extends Vue{
    @Prop() dateType!:boolean
    changeType=false
    output='0';
    inputContent(event:MouseEvent){
      const button = (event.target as HTMLButtonElement)
      const input = button.textContent!;
      if(this.output.length===16){return}
      if(this.output==='0'){
        if('0123456789'.indexOf(input)>=0){
          this.output = input;
        }else{
          this.output+=input
        }
        return
      }
      if(this.output.indexOf('.')>0){
        if(input==='.'){return}
      }
      this.output+=input

    }
    empty(){
      this.output='0'
    }
    remove(){
      this.output=this.output.slice(0,-1)
    }
    changeDate(){
      if(!this.dateType){
        this.changeType=true
      }else{
        this.changeType=false
      }
      this.$emit('update:changeType',this.changeType)
    }
    ok(){
      const number = parseFloat(this.output)
      this.$emit('update:value',number)
      this.$emit('submit',number)
      this.output = '0'
    }
  }
</script>

<style scoped lang="scss">
  @import '~@/assets/style/helper.scss';
  .numberPad {
    .output {
      box-shadow: inset 0 0 3px 1px $color-blue;
      font-size: 30px;
      font-family: Consolas, monospace;
      padding: 6px 16px;
      text-align: right;
      color:$color-orange;
      background: #ffffff;
      max-height: 56.8px;
      position: relative;
      >button{
        height:30px;
        width:30px;
        background: transparent;
        position: absolute;
        left:10px;
        border: none;
      }
    }

    > .buttons {

      @extend %clearFix;

      > button {
        .dateIcon{
          width:30px;
          height:30px;
        }
        background: transparent;
        //border: none;
        width: 25%;
        height: 48px;
        float: left;

        border:1px solid $color-fontBlue;
        border-radius: 4px;
        color:$color-orange;
        font-weight: 700;
        &.ok {
          float: right;
          height: 48*2px;
        }

        &.zero {
          width: 50%;
        }


      $bg: #f2f2f2;

      }

    }
  }
</style>