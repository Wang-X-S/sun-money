<template>
  <div>
    <Layout class-prefix="layout">
      <Tab :data-source="recordTypeList" :value.sync="record.type"/>
      <Notes @update:value="onUpdateNotes"/>
      <Tags  :tag-list="defaultIncomeTags"  v-if="record.type==='+'" @update:value="onUpdateTags"/>
      <Tags  :tag-list="tagList"  v-if="record.type==='-'"
             income-type="income" @update:value="onUpdateTags"/>
      <CalendarInput v-if="dateShow===true" :calender="now.format('YYYY-MM-DDTHH:mm')" @update:date="onUpdateCreateAt"/>
      <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"
                 :dateType="this.dateShow" @update:changeType="changeShowType"/>
    </Layout>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Tags from '@/components/Money/Tags.vue';
  import Notes from '@/components/Money/Notes.vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import {Component} from 'vue-property-decorator';
  import Tab from '@/components/Tab.vue';
  import recordTypeList from '@/contants/recordTypeList'
  import {
    defaultExpendTags,
    defaultIncomeTags,
  } from '@/contants/defaultTag.ts';
  import CalendarInput from '@/components/CalendarInput.vue';
  import dayjs from 'dayjs';

  type RecordItem = {
    tags: string[];
    notes: string;
    type: string;
    amount: number;
    createAt?: string
  }
  type Tag= {
    id:string;
    name:string;
  }
  @Component({
    components: {CalendarInput, Tab, NumberPad, Notes, Tags},
  })

  export default class Money extends Vue {
    defaultExpendTags = defaultExpendTags;
    defaultIncomeTags = defaultIncomeTags;
    recordTypeList = recordTypeList
    dateShow=false
    dayjs=dayjs()
    now=dayjs(new Date)

    get recordList(){
      return this.$store.state.recordList;

    }
    get tagList() :Tag[]{
      return this.$store.state.tagList;

    }

    record: RecordItem = {
      tags: [], notes: '', type: '-', amount: 0,createAt:dayjs(new Date).toISOString()
    };

    created(){
      this.$store.commit('fetchRecords')
      this.$store.commit('fetchTags')
    }
    changeShowType(value:boolean){
      this.dateShow = value
    }
    saveRecord() {
        this.$store.commit('createRecord',this.record);

    }
    onUpdateCreateAt(value:string){
      this.record.createAt= new Date(value).toISOString()
    }
    onUpdateAmount(value: string) {
      this.record.amount = parseFloat(value);
    }

    onUpdateNotes(value: string) {
      this.record.notes = value;
    }

    onUpdateTags(value: string[]) {
      this.record.tags = value;

    }
  }
</script>
<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column;
  }
</style>
<style lang="scss" scoped>
  @import '~@/assets/style/helper.scss';

</style>