<template>
  <div class="x">
    <Layout>
      <Tab :data-source="typeArray" :value.sync="type" class-prefix="type"/>
      <Tab class-prefix="interval" :data-source="dateArray" :value.sync="interval"/>
      <div>
        <ol>
          <li v-for="(group,index) in result" :key="index">
            <ol>
              <li v-for="item in group.items" :key="item.id">
                {{item.amount}}{{item.createAt}}
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

  @Component({
    components: {Tab}
  })
  export default class Statistics extends Vue {

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
      const {recordList} = this;
      type HashTableValue={title:string,items: RecordItem[]}
      const hashTable:{[key:string]: HashTableValue}={}
      for(let i=0;i<recordList.length;i++){
        const [date,time]= recordList[i].createAt!.split('T')
        hashTable[date]=hashTable[date]|| {title:date,items:[]}
        hashTable[date].items.push(recordList[i])
      }
      console.log(hashTable)
      return hashTable
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