<template>
  <Layout>
    <Tab :data-source="recordTypeList" :value.sync="type"></Tab>
    <div class="info">
      <div class="calender">
        <div class="year">
          <label>
            <select name="select" v-model="year">
              <option v-for="y in years" :key="y" :value="y">{{y}}</option>
            </select>
          </label>
          <span>年</span>
        </div>
        <div class="month">
          <label>
            <select name="select" v-model="month">
              <option v-for="m in months" :value="m" :key="m">{{m}}</option>
            </select>
          </label>
          <span>月</span>
        </div>
      </div>
    </div>
    <div class="typeData">
      <div class="top">
        <div class="wrapper">
          <div class="expend">
            {{expendAmount}}
          </div>
        </div>
        <div class="wrapper">
          <div class="income">
           {{incomeAmount}}
          </div>
        </div>
      </div>
      <div class="wrapper">
        <div class="total">
          总计{{incomeAmount+expendAmount}}
        </div>
      </div>
    </div>
    <Chart/>
<!--    {{groupTypeList}}-->
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Watch} from 'vue-property-decorator';
  import recordTypeList from '@/contants/recordTypeList';
  import Tab from '@/components/Tab.vue';
  import dayjs from 'dayjs';
  import Chart from '@/components/Chart.vue';
  import clone from '@/lib/clone';
  type RecordItem = {
    tags: string[];
    notes: string;
    type: string;
    amount: number;
    createAt?: string;
  }
  type RootState = {
    recordList: RecordItem[],
    tagList: Tag[],
    currentTag?: Tag
  }
  type Tag = {
    id: string;
    name: string;
  }
  @Component({
    components: {Chart, Tab}
  })
  export default class EchartsPage extends Vue {
    year = window.sessionStorage.getItem('year') || dayjs().year().toString();
    month = window.sessionStorage.getItem('month') || dayjs().month().toString();
    recordTypeList = recordTypeList;
    type='-'

    get recordList() {
      return (this.$store.state as RootState).recordList;
    }
    beforeCreate() {
      this.$store.commit('fetchRecords');
    }
    get groupList(){
      const sortedRecordList = clone<RecordItem[]>(this.recordList)
      .filter(item=>(dayjs(item.createAt).year()===parseInt(this.year))
      &&(dayjs(item.createAt).month()+1===parseInt(this.month)))
      .sort((a,b)=>{
        return dayjs(b.createAt).valueOf()-dayjs(a.createAt).valueOf()
      })
      // for(let i =0;i<sortedRecordList.length;i++){
      //   if(sortedRecordList[i].type===this.type){
      //     result.push(sortedRecordList[i])
      //   }
      // }
      return sortedRecordList
    }
    get groupTypeList(){
      let result =[]
      for(let i = 0;i<this.groupList.length;i++){
        if(this.groupList[i].type===this.type){
          result.push(this.groupList[i])
        }
      }
      return result
    }
    get incomeAmount(){
      let total =0
      for(let i=0;i<this.groupList.length;i++){
        if(this.groupList[i].type==='+'){
          total +=this.groupList[i].amount
        }
      }
      return total
    }
    get expendAmount(){
      let total =0
      for(let i=0;i<this.groupList.length;i++){
        if(this.groupList[i].type==='-'){
          total -=this.groupList[i].amount
        }
      }
      return total
    }
    get years() {
      const endYear = dayjs().year();
      let y = 2000;
      let result: number[] = [];
      while (y < endYear + 1) {
        result.push(y);
        y++;
      }
      result = result.reverse();
      return result;
    }

    get months() {
      let month = 1;
      let result: number[] = [];
      while (month < 13) {
        result.push(month);
        month++;
      }
      return result;
    }
    @Watch('year')
    saveYear(year:string){
      window.sessionStorage.setItem('year',year)
    }
    @Watch('month')
    saveMonth(month:string){
      window.sessionStorage.setItem('month',month)
    }
  }
</script>

<style scoped lang="scss">
  .info {
    margin-top: 5px;

    > .calender {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #929292;
      width: 220px;
      height: 30px;
      margin: 0 auto;

      > .select {
        font-size: 20px;
      }

      > .year {
        color: #929292;
        font-size: 14px;
        padding: 0 3px;
        display: flex;
        align-items: center;

        select {
          font-size: 14px;
          color: #929292;
        }
      }

      > .month {
        color: #929292;
        font-size: 14px;
        padding: 0 3px;
        display: flex;
        align-items: center;

        select {
          font-size: 14px;
          color: #929292;
        }
      }
    }
  }

  .typeData {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 10px;


    .wrapper {
      border-radius: 10px;
      border: 1px solid #929292;
      height: 50px;
      width: 120px;
      margin: 5px;
      text-align: center;
      line-height:50px;
      font-size: 14px;
    }

    .top {
      display: flex;
      flex-direction: row;

      .expend {
        color: #91cc75;
      }

      .income {
        color: #ee6666
      }
    }

    .total {
      color: #ee6666
    }
  }
</style>