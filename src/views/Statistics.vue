<template>
  <div class="x">
    <Layout>
      <Tab :data-source="typeArray" :value.sync="type" class-prefix="type"/>
      <Tab class-prefix="interval" :data-source="dateArray" :value.sync="interval"/>
      <div class="listing">
        <ol>
          <li v-for="(group,index) in result" :key="index">
            <h3 class="title">{{beautify(group.title)}}</h3>
            <ol>
              <li v-for="item in group.items" :key="item.id"
                class="record"
              >
                <div>
                  <Icon :name="item.tags"></Icon>
                  <span>{{tagString(item.tags)}}</span>
                </div>
                <span class="notes">{{item.notes}}</span>
                <span>￥{{item.amount}}</span>
              </li>
            </ol>

          </li>
        </ol>
      </div>
    </Layout>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tab from '@/components/Tab.vue';
  import recordTypeList from '@/contants/recordTypeList';
  import intervalList from '@/contants/intervalList';
  // noinspection TypeScriptCheckImport
  import dayjs from 'dayjs'
  import clone from '@/lib/clone';
  @Component({
    components: {Tab}
  })
  export default class Statistics extends Vue {
    tagString(tags: string[]){
      return tags.length===0?'无': tags.join(',')
    }
    beautify(string:string){
      const day = dayjs(string)
      const now = dayjs()
      if(day.isSame(now,'day')){
        return '今天'
      }else if(day.isSame(now.subtract(1,'day'),'day')){
        return '昨天'
      }else if(day.isSame(now.subtract(2,'day'),'day')){
        return '前天'
      }else{
        return day.format('YYYY年MM月DD日')
      }
    }
    get recordList() {
      type RootState={
        recordList:RecordItem[],
        tagList: Tag[],
        currentTag ?:Tag
      }
      type Tag ={
        id:string;
        name:string;
      }
      type RecordItem ={
        tags: string[];
        notes:string;
        type:string;
        amount:number;
        createAt?: string;
      }
      return (this.$store.state as RootState).recordList;
    }

    get result() {
      type RecordItem ={
        tags: string[];
        notes:string;
        type:string;
        amount:number;
        createAt?: string;
      }
      type HashTableValue = { title: string, items: RecordItem[] }
      const {recordList} = this;
      if(recordList.length===0){return []}


      const newList = clone(recordList).sort((a,b)=>dayjs(b.createAt).valueOf()-dayjs(a.createAt).valueOf())
      const result = [{title:dayjs(newList[0].createAt).format('YYYY-MM-DD'),items:[newList[0]]}]
      for(let i = 0 ;i<newList.length;i++){
        const current=newList[i]
        const last = result[result.length-1]
        if(dayjs(last.title).isSame(dayjs(current.createAt),'day')){
          last.items.push(current)
        }else{
          result.push({title:dayjs(current.createAt).format('YYYY-MM-DD'),items:[current]})
        }
      }
      //   const hashTable: { [key: string]: HashTableValue } = {};
      // for (let i = 0; i < recordList.length; i++) {
      //   const [date] = recordList[i].createAt!.split('T');
      //   hashTable[date] = hashTable[date] || {title: date, items: []};
      //   hashTable[date].items.push(recordList[i]);
      // }
      return result;
    }

    created() {
      this.$store.commit('fetchRecords');
    }

    interval = 'day';
    type = '-';
    typeArray = recordTypeList;
    dateArray = intervalList;
  }
</script>

<style scoped lang="scss">
  .listing{
    overflow: auto;
    height: 78vh;
  }
  .listing::-webkit-scrollbar{
    width:0!important
  }
  %item {
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
  .title {
    @extend %item;
  }
  .record {
    background: white;
    @extend %item;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.2)
  }
  .notes {
    margin-right: auto;
    margin-left: 16px;
    color: #999;
  }
  ::v-deep li.interval-item {

    width: 33.33vw;
    padding: 0 !important;
    border-radius: 0 !important;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.25) !important;

    &.selected {
      box-shadow: inset 0 0 0 0 transparent !important;
    }
  }

  ::v-deep .interval-ul {
    height: 30px !important;
  }
</style>