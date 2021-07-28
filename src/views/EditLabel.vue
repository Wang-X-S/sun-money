<template>
  <Layout>
    <div>123</div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import tagListModel from "@/model/tagListModel"

  @Component
  export default class EditLabel extends Vue {
    created() {
      const id = this.$route.params.id;
      console.log(id)
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