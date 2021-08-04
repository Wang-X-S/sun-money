<template>
  <Layout>
    <Tab :value.sync="type" :data-source="recordTypeList"/>
    <div class="tags">
      <router-link class="tagsLi" v-for="tag in tags" :key="tag.id"
                   :to="`/labels/edit/${tag.id}`">
        <Icon :name="`${tag.name}`" class="left"></Icon>
        <span>{{tag.name}}</span>
        <Icon name="right" class="right"></Icon>
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <button class="createTag" @click="createTag">新建标签</button>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'vue-property-decorator';
  import {mixins} from 'vue-class-component';
  import TagHelper from '@/mixins/TagHelper';
  import Tab from '@/components/Tab.vue';
  import recordTypeList from '@/contants/recordTypeList'

  @Component({
    components:{Tab},
  })
  export default class Labels extends mixins(TagHelper){
    type='-'
    recordTypeList=recordTypeList
    get tags(){
      return this.$store.state.tagList
    }

    beforeCreate(){
      this.$store.commit('fetchTags')
    }
  }
</script>

<style scoped lang="scss">
  @import '~@/assets/style/helper.scss';
  .tags::-webkit-scrollbar {
    width: 0 !important
  }
    .tags{
      overflow: auto;
      height:70vh;
      background:white ;
      font-size: 16px;
      padding-left:16px;
      padding-right: 16px;
      >.tagsLi{
        min-height:44px;
        display:flex;
        align-items: center;
        border-bottom:1px solid $color-shadow;
        position: relative;
        >.left{

            background:  darken(#f2f2f2,10%);
            width: 30px;
            height: 30px;
            padding: 4px;
            border-radius: 50%;
            margin-right: 16px;

      }
        >.right{
          position: absolute;
          right:10px;
          width: 20px;
          height:20px;
        }
      }
    }
  .createTag{
    border:none;
    background: $color-fontBlue;
    color:white;
    padding:6px 16px;
    border-radius: 12px;
    font-size: 18px;
    &-wrapper{
      margin-top:20px;

      display: flex;
      justify-content: center;
    }
  }
</style>