<template>
  <form >
    <label class="notes">
      <span class="name">日期</span>
      <input type="datetime-local" :value="calender"
              @input="onValueChanged($event.target.value)"
      >
    </label>
  </form>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component,Prop} from 'vue-property-decorator';

  @Component
  export default class CalendarInput extends Vue {
  @Prop()  calender!:string
  onValueChanged(date:string){

      this.$emit('update:date',date)

  }

  }
</script>

<style scoped lang="scss">
  @import '~@/assets/style/helper.scss';
  .notes {
    font-size: 14px;
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    align-items: center;

    >.name {
      display: flex;
      padding-right: 5px;
      justify-content: center;
      width:60px;
      color:#2c3e50;
      font-weight: 500;
      font-size: 16px;
    }

    >input {
      margin:6px 6px 6px 6px;
      box-shadow:0 0 5px $color-shadow;
      border-radius: 8px;
      height: 44px;
      flex-grow: 1;
      background: #ffffff;
      border: none;
      padding-right: 16px;
      padding-left: 16px;
    }
    input:focus{
      box-shadow:0 0 5px $color-fontBlue;
    }
  }
</style>

