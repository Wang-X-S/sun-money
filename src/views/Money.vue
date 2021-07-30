<template>
  <div>
    <Layout class-prefix="layout">
      <Types @update:value="onUpdateType"/>
      <Notes @update:value="onUpdateNotes"/>
      <Tags  @update:value="onUpdateTags"/>
      <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
    </Layout>

  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Types from '@/components/Money/Types.vue';
  import Tags from '@/components/Money/Tags.vue';
  import Notes from '@/components/Money/Notes.vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import {Component} from 'vue-property-decorator';
  import store from '@/store/index2';


  type RecordItem = {
    tags: string[];
    notes: string;
    type: string;
    amount: number;
    createdAt?: Date
  }

  @Component({
    components: {NumberPad, Notes, Tags, Types}
  })

  export default class Money extends Vue {

    recordList = store.recordList;
    record: RecordItem = {
      tags: [], notes: '', type: '-', amount: 0
    };

    saveRecord() {
      store.createRecord(this.record);
    }

    onUpdateAmount(value: string) {
      this.record.amount = parseFloat(value);
    }

    onUpdateNotes(value: string) {
      this.record.notes = value;
    }

    onUpdateType(value: string) {
      this.record.type = value;
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