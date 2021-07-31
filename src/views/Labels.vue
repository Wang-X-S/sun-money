<template>
  <Layout>
    <Types/>
<!--    暂时使用Types-->
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
  import Types from "@/components/Money/Types.vue";
  import {Component} from 'vue-property-decorator';
  import {mixins} from 'vue-class-component';
  import TagHelper from '@/mixins/TagHelper';


  @Component({
    components:{Types},
  })
  export default class Labels extends mixins(TagHelper){
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
        >.icon{
        width: 24px;
        height:24px;
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