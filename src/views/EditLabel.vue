<template>
  <div class="wrapper">
    <header>
      <div class="navBar">
        <Icon name="left"  class="left" @click.native="goBack"/>
        <div class="record">
          <Icon :name="`${record.tags.toString()}`" class="middle"/>
          <span class="title">{{record.tags.toString()}}</span>
        </div>
        <span class="right"></span>
      </div>
    </header>
    <main>
      <div class="form-wrapper">
        <InputBox :value="judgmentType(record.type)" field-name="类型"
                  placeholder="在这里输入标签名 "
                  read="readonly"
                  />
        <CalendarInput  @update:date="updateCalender"
          :calender="dayjs(record.createAt).format('YYYY-MM-DDTHH:mm')"
        />

        <InputBox :value="record.notes"
          field-name="备注" placeholder="请在这里输入备注"
          @update:value="updateNotes"
        />

        <InputBox :value="record.amount"
          field-name="金额" placeholder=""
          @update:value="updateAmount"
        />
      </div>
    </main>
    <footer>
      <div class="button-wrapper">
        <button @click="resolve">编辑完成</button>
        <button class="delete" @click="deleteRecord">删除</button>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Notes from '@/components/Money/Notes.vue';
  import InputBox from '@/components/InputBox.vue';
  import dayjs from 'dayjs';
  import CalendarInput from '@/components/CalendarInput.vue';
type RecordItem= {
    id?:string;
    tags: string[];
    notes:string;
    type:string;
    amount:number;
    createAt?:string;
  }

  @Component({
    components: {CalendarInput, InputBox, Notes},

  })
  export default class EditLabel extends Vue {
    dayjs=dayjs
    newRecord:RecordItem={
      tags:[],
      notes:'',
      type:'',
      amount:0,
      createAt:''
    }

    created() {
      const id = this.$route.params.id
      this.$store.commit('fetchRecords')
      this.$store.commit('setCurrentRecord',id)
      this.newRecord = this.record
      if (!this.record) {
        this.$router.replace('/404');
      }
    }

    get record(){
      return this.$store.state.currentRecord;
    }
    beautifyDate(date:string){
      const day = dayjs(date).format('YYYY-MM-DD')
    }
    judgmentType(type:string){
      if(type==='-'){
        return '支出'
      }else{
        return '收入'
      }
    }
    updateCalender(value:string){
      this.newRecord.createAt=value
    }
    updateNotes(value:string){
       this.newRecord.notes= value
    }
    updateAmount(value:number){
        if(value>=0){
          this.newRecord.amount = value
        }else{
          return window.alert('金额必须是大于0的数字')
      }
    }

    deleteRecord() {
      if(this.record){
        this.$store.commit('removeRecord',this.record.id)
        return
      }
    }
    resolve(){
      if(!this.newRecord.createAt){
        window.alert('请选择日期')
        return
      }

      this.$store.commit('updateCurrentRecord',this.newRecord)
      this.$router.back()

    }
    goBack(){
      this.$router.back()
    }
  }
</script>

<style scoped lang="scss">
  @import '~@/assets/style/helper.scss';

  .navBar {
    display: flex;
    justify-content: space-between;
    padding: 8px 16px;
    align-items: center;
    font-size: 18px;
    background: $color-fontBlue;
    color: #ffffff;
    font-weight: 500;
    height:13vh;

    > .record {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

    }

     .middle {
      width: 48px;
      height: 48px;
    }
     .left {
      width: 40px;
      height: 40px;
    }

    > .right {
      width: 40px;
      height: 40px;
    }
  }

  .wrapper {
    position: relative;
    height: 100vh;
  }

  .button-wrapper {
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 100%;
    button {
      border: none;
      box-shadow: 0 0 3px $color-shadow;
      width: 50%;
      height: 10vh;
      background: #ffffff;;
    }

    .delete {
      color: red;
    }
  }



</style>
