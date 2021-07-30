<template>
  <div class="tags">
    <ul class="current">
      <li v-for="tag in tagList " :key="tag.id">
        <div class="icon-wrapper"
             @click="toggle(tag.name)"
             :class="{selected: selectedTags.indexOf(tag.name)>-1}">
          <Icon :name="`${tag.name}`"/>
          <p>{{tag.name}}</p>
        </div>
      </li>

      <li class="newButton" @click="create">
        <div class="icon-wrapper">
          <Icon name="label"/>
          <p>新建标签</p>
        </div>
      </li>
    </ul>

  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'vue-property-decorator'

  @Component({
    computed:{
      tagList(){
        return this.$store.state.tagList
      }
    }
  })
  export default class Tags extends Vue{
  created(){
    this.$store.commit('fetchTags')
  }
  selectedTags:string[]=[]
  toggle(tag:string){
    const index = this.selectedTags.indexOf(tag);
    if(index>=0){
      this.selectedTags.splice(index,1)
    }else{
    this.selectedTags.push(tag)
    }
    this.$emit('update:value',this.selectedTags)
  }
  create(){
    const name =window.prompt('请输入标签名');
    if(!name){
      window.alert("标签名不能为空")
    }else{
      this.$store.commit('createTag',name)
    }
    }

  }

</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  .tags::-webkit-scrollbar {
    width: 0 !important
  }

  .tags {
    flex-grow: 1;
    overflow: auto;
    margin:5px;

    > .current {
      padding: 0 10px;
      display: flex;
      overflow: auto;
      flex-wrap: wrap;
      align-items: start;

      > li {
        height:12vh;
        width: 33.333%;
        padding:10px;


        >.icon-wrapper{
          overflow: hidden;
          height: 50px;
          border: 2px solid $color-orange;
          border-radius: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          font-size: 14px;
          &.selected{
            color:$color-blue;
            >.icon{
              animation: move 2s infinite;
              -webkit-animation: move 2s infinite;

            }
          }
          .icon {
            margin-top: 2px;
            background: #fff;
            height: 50px;
            width: 50px;
          }
        }

      }
    }
  }
  @-webkit-keyframes move{
    0%{
      transform:rotate(50deg);
    }
    33%{
      transform:rotate(20deg);
    }
    66%{
      transform:rotate(-20deg);
    }
    100%{
      transform:rotate(0deg);
    }
  }
  @keyframes move{
    0%{
      transform:rotate(0deg);
    }
    33%{
      transform:rotate(20deg);
    }
    66%{
      transform:rotate(-20deg);
    }
    100%{
      transform:rotate(0deg);
    }
  }

</style>