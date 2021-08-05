<template>
  <Layout>
    <header class="header">
      <div class="logo">
        <Icon name="sun-2"></Icon>
      </div>
      <div class="info">
        <div class="calender">
          <div class="year">
          <select v-model="year" class="select">
            <option v-for="y in years" :key="y" :value="y">{{y}}</option>
          </select>
          <span>年</span>
          </div>
          <div class="mouth">
            <select v-model="month" class="select">
              <option v-for="m in 12" :key="m" :value="m">{{beautifyMonth(m)}}</option>
            </select>
            <span>月</span>
          </div>
        </div>
        <div class="total">
          <div class="label-value">
            <div class="label">收入</div>
            <div class="value">
              <span>￥{{this.totalIncome.toString()}}</span>
            </div>
          </div>
          <div class="label-value">
            <div class="label">支出</div>
            <div class="value">
              <span>￥{{this.totalExpense.toString()}}</span>

            </div>
          </div>
          <div></div>
        </div>
      </div>
    </header>
    <ul class="record">
      <li v-for="(group,index) in groupList" :key="index">
        <div class="title">
          <span>{{getTitle(group)}}</span>
          <span>{{getTotal(group)}}</span>
        </div>
        <div class="items">
          <router-link class="item" v-for="(item,index) in group.items" :key="index"
                       :to="`/record/edit/${item.id}`">
            <div class="tag">
              <Icon :name="item.tags" class="icon"></Icon>
              <span>{{item.tags.toString()}}</span>
              <p v-if="item.notes" class="notes">{{'（ '+item.notes+' ）'}}</p>
            </div>
            <span>{{getAmount(item)}}</span>
          </router-link>
        </div>
      </li>
    </ul>
    <Blank v-if="groupList.length===0"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component,Watch} from 'vue-property-decorator';
  import dayjs from 'dayjs'
  import clone from '@/lib/clone';
  import Blank from '@/components/Blank.vue';

  type Group={
    name:string;
    items:RecordItem[]
  }
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
    components: {Blank}
  })
  export default class Statistics extends Vue {
    year = window.sessionStorage.getItem('year') || dayjs().year().toString();
    month = window.sessionStorage.getItem('month') || (dayjs().month() + 1).toString();


    created() {
      this.$store.commit('fetchRecords');

    }
    updated() {
      this.$store.commit('fetchRecords');
    }
    get recordList() {
      return (this.$store.state as RootState).recordList;

    }
    get groupList() {
      const result: Group[] = [];
      const names: string[] = [];
      // 对记录排序
      const sortedRecordList = clone<RecordItem[]>(this.recordList)
        .filter(item => (dayjs(item.createAt).year() === parseInt(this.year))
          && (dayjs(item.createAt).month() + 1 === parseInt(this.month)))
        .sort((b, a) => {
          return dayjs(a.createAt).valueOf() - dayjs(b.createAt).valueOf();
        });
      let record: RecordItem;
      for (record of sortedRecordList) {
        let date: string;
        if (this.year === dayjs().year().toString()) {
          // 今年的数据按天分组
          date = dayjs(record.createAt).toISOString().split('T')[0];
        } else {
          // 以前的数据按月分组
          date = dayjs(record.createAt).format('YYYY-MM');
        }
        const index = names.indexOf(date);
        if (index < 0) {
          names.push(date);
          result.push({name: date, items: [record]});
        } else {
          result[index].items.push(record);
        }
      }
      return result;

    }
    get years(){

      const endYear = dayjs().year()
      let y =2000
      let result:number[]=[]
      while(y<endYear+1){
        result.push(y)
        y++
      }
      result=result.reverse()
      return result
    }
    get totalIncome(){
      let total = 0;
      let group:Group;
      for(group of this.groupList){
        let record :RecordItem
        for(record of group.items){
          if(record.type ==='+'){
            const amount = record.amount
            total -= amount
          }else{
            continue;
          }
        }
      }
      return -total
    }
    get totalExpense(){
      let total = 0;
      let group:Group;
      for(group of this.groupList){
        let record: RecordItem;
        for(record of group.items){
          if(record.type ==='-'){
            total -= record.amount
          }else{
            continue;
          }
        }
      }
      return total
    }
    getTotal(group:Group){
      let expendTotal = 0;
      let incomeTotal = 0
      let total = 0
      let item:RecordItem;
      for(item of group.items){
        if(item.type==='-'){
          expendTotal -= item.amount
        }else if(item.type === '+'){
          incomeTotal +=Number(item.amount)
        }
      }
      total = expendTotal+incomeTotal

      if(total<=0){
        return `支出:￥${Math.abs(total)}`
      }else{
        return `收入:￥${Math.abs(total)}`
      }
    }
    beautifyMonth(m:number){
      return m<10 ?'0'+m.toString() :m.toString()
    }
    toWeekday(value:number){
      if(value>=0&&value<=6){
        return [
          '星期天',
          '星期一',
          '星期二',
          '星期三',
          '星期四',
          '星期五',
          '星期六'
        ][value]
      }
    }
    getTitle(group:Group){
      const day = dayjs(group.name)
      const now =dayjs();
      if(day.isSame(now,'day')){
        return `今天 ${this.toWeekday(day.day())}`
      }else if(day.isSame(now.subtract(1,'day'),'day')){
        return `昨天 ${this.toWeekday(day.day())}`
      }else if(day.isSame(now.subtract(2,'day'),'day')){
        return `前天 ${this.toWeekday(day.day())}`
      }else if(day.isSame(now,'year')){
        return `${day.format('M月D日')} ${this.toWeekday(day.day())}`
      }else{
        return `${day.format('YYYY年M月')}`
      }
    }

    getAmount(record:RecordItem){
      if(record.type==='+'){
        return '+'+record.amount
      }else{
        return -record.amount
      }
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
  .notes{
    font-size: 12px;
    margin-left: 10px;
    color: #999999;
  }
.header{
  height:13vh;
  background: #18a0fb ;
  .logo{
    display: flex;
    justify-content: center;
    position: relative;
    height:20px;
    .icon{
      position: absolute;
      background: #f5f5f5;
      top:10px;
      width: 40px;
      height: 40px;
      padding: 4px;
      border-radius: 50%;
      margin-right: 16px;
    }

  }
  .info{
    display: flex;
    align-items: center;
    padding:4px 0;
    .label-value{
      width:25vw;
      .label{
        display: flex;
        justify-content: left;
        font-size:14px;
        color: #ffffff;
        margin-bottom: 4px;
      }
      .value{
        span {
          font-size: 16px;
        }
        color:white;
        font-size: 12px;
      }
    }

    .calender{
      color:white;
      position:relative;
      padding:0 16px;
      display: flex;
      flex-direction: column;
      align-items:center;
      .select{
        color:#ffffff;
        option{

          color:black;
        }
      }
      .year{
        font-size: 12px;
        color:#ffffff;
        padding:0 3px;
        margin-bottom:5px;

      }
      .mouth{
        color:#ffffff;
        font-size: 12px;
        padding: 0 3px;
        display: flex;
        align-items: center;
        select {

          font-size: 20px;
        }
      }
      &::after{
        content:'';
        width:1px;
        height:24px;
        background:#ffffff;
        position: absolute;
        display: block;
        top:50%;
        right:0;
        transform: translateY(-50%);
      }
    }
  }
  .total{
    display: flex;
    flex-grow:1;
    justify-content: space-between;
    padding:4px 16px;
  }
}
  .record{
    > li {
      .title {
        font-size: 12px;
        color: #999999;
        display: flex;
        justify-content: space-between;
        padding: 4px 16px;
        border-bottom: 1px solid #dddddd;
      }

      .items {
        display: flex;
        flex-direction: column;
        padding: 12px 16px;

        .item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          box-shadow: inset 0 -0.5px 0.5px -0.5px rgba(0, 0, 0, 0.2);

          .tag {
            display: flex;
            align-items: center;

            .icon {
              background:  darken(#f2f2f2,10%);
              width: 30px;
              height: 30px;
              padding: 4px;
              border-radius: 50%;
              margin-right: 16px;
            }
          }
        }
      }
    }
  }
</style>