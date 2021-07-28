<template>
  <Layout>
    <div>
      <Icon name="left"/>
      <span>编辑标签</span>
    </div>
    <InputBox field-name="标签名" placeholder="在这里输入标签名" @update:value="onUpdateInput" />
    <InputBox field-name="日期" placeholder="在这里输入备注" @update:value="onUpdateInput"/>
    <InputBox field-name="备注" placeholder="" @update:value="onUpdateInput"/>
    <InputBox field-name="金额" placeholder="" @update:value="onUpdateInput"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import tagListModel from "@/model/tagListModel"
  import Notes from '@/components/Money/Notes.vue';
  import InputBox from '@/components/InputBox.vue';
  @Component({
    components: {InputBox, Notes}
  })
  export default class EditLabel extends Vue {
    onUpdateInput(value:string){
      console.log(value)
    }
    created() {
      const id = this.$route.params.id;
      tagListModel.fetch()
      const tags = tagListModel.data
      const tag = tags.filter(t =>t.id === id)[0]
      console.log(tag)
       if(tag){
         console.log(tag)
      }else{
        this.$router.replace('/404')
      }
    }
  }
</script>

<style scoped>

</style>
