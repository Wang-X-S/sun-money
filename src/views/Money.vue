<template>
  <div>
    <Layout class-prefix="layout">
      <Tab :data-source="recordTypeList" :value.sync="record.type"/>
      <Notes @update:value="onUpdateNotes"/>
      <Tags  @update:value="onUpdateTags"/>
      <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
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


  type RecordItem = {
    tags: string[];
    notes: string;
    type: string;
    amount: number;
    createdAt?: string
  }

  @Component({
    components: {Tab, NumberPad, Notes, Tags},
  })

  export default class Money extends Vue {
    recordTypeList = recordTypeList
    get recordList(){
      return this.$store.state.recordList;
    }

    record: RecordItem = {
      tags: [], notes: '', type: '-', amount: 0
    };
    created(){
      this.$store.commit('fetchRecords')
    }

    saveRecord() {
        this.$store.commit('createRecord',this.record);
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