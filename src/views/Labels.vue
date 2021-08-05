<template>
  <Layout>
    <header><span>编辑标签</span></header>
    <div class="tags">
      <div class="tagsLi" v-for="tag in tags" :key="tag.id">
        <Icon :name="`${tag.name}`" class="left"></Icon>
        <span>{{tag.name}}</span>
        <div @click="deleteTag(tag)" class="right">
        <Icon name="垃圾桶"  ></Icon>
        </div>
      </div>
    </div>
    <div class="createTag-wrapper">
      <router-link to="/editTags">
      <button class="createTag" >新建标签</button>
      </router-link>
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
  type Tag= {
    id:string;
    name:string;
  }
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
      this.$store.commit('fetchRecords')
    }
  deleteTag(tag:Tag){
    this.$store.commit('removeTag',tag.id)

  }
  }
</script>

<style scoped lang="scss">
  @import '~@/assets/style/helper.scss';
  header{
    height:50px;
    background: #f7f7f7;
    border-bottom: 1px solid darken(#f7f7f7,10%);
    display: flex;
    align-items: center;
    justify-content: center;
    >span{
      font-weight: 500;
    }
  }
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
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          right:10px;
          .icon{
            width: 20px;
            height:20px;
          }

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