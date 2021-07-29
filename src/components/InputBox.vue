<template>
  <div>
    <label class="notes">
      <span class="name">{{this.fieldName}}</span>
      <input type="text"
             :placeholder="placeholder"
             :value="value"
              @input="onValueChanged($event.target.value)"
      />
    </label>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component,Watch,Prop} from 'vue-property-decorator';

  @Component
  export default class inputBox extends Vue {
    @Prop({required:true}) fieldName!:string
    @Prop()placeholder?: string
    @Prop({default:''}) readonly value!:string;

    onValueChanged(value:string){
      this.$emit('update:value',value)
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