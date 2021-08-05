<template>
  <ul class="tags">
    <li class="tags-item"
        v-for="(tag,id) in tagList" :key="id"
        @click="selected(tag)">
      <div class="tags-item-icon" :class="{'selected':tag.name===selectedTag.name}" >
        <Icon :name="tag.name"/>
      </div>
      <span>{{tag.name}}</span>
    </li>
  </ul>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component,Prop} from 'vue-property-decorator';
  type Tag= {
    id:string;
    name:string;
  }
  @Component
  export default class TagList extends Vue {
    @Prop() tagList!: Tag[];
    @Prop() selectedTag!: Tag;

    selected(tag:Tag){
      this.$emit('update:selectedTag',tag)

    }
  }
</script>

<style scoped lang="scss">
.tags{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  overflow: auto;
  &-item{
    width:25%;
    padding:12px 0;
    align-items: center;
    display: flex;
    flex-direction: column;
    &-icon{
      width: 50px;
      height:50px;
      display: flex;
      justify-content: center;
      &.selected{
        animation: move 2s infinite
      }
      border-radius: 50%;
      align-items: center;
      >.icon{
        width: 40px;
        height:40px;
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