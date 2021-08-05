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
      <router-link to="/labels" class="editButton" @click="createTag">
        <div class="icon-wrapper">
          <Icon name="label"/>
          <p>编辑标签</p>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import {mixins} from 'vue-class-component';
  import TagHelper from '@/mixins/TagHelper';
  import {
    defaultExpendTags,
    defaultIncomeTags,
  } from '@/contants/defaultTag.ts';
  type Tag= {
    id:string;
    name:string;
  }
  @Component({})
  export default class Tags extends mixins(TagHelper) {
    @Prop() tagList!:Tag[]
    defaultExpendTags = defaultExpendTags;
    defaultIncomeTags = defaultIncomeTags;
    selectedTags: string[] = [];



    created() {
      this.$store.commit('fetchTags');
    }

    toggle(tag: string) {
      const index = this.selectedTags.indexOf(tag);

      if (index >= 0) {
        this.selectedTags.splice(index, 1);
      } else {
        this.selectedTags = [];
        this.selectedTags.push(tag);
      }

      this.$emit('update:value', this.selectedTags);
    }
  }

</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";

  .tags::-webkit-scrollbar {
    width: 0 !important
  }

  .editButton {
    height: 12vh;
    width: 33.333%;
    padding: 10px;

    > .icon-wrapper {
      overflow: hidden;
      height: 50px;
      border: 2px solid $color-orange;
      border-radius: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      font-size: 14px;
      font-weight: 600;

      .icon {
        margin-top: 2px;
        background: #fff;
        height: 50px;
        width: 50px;
      }
    }
  }

  .tags {
    flex-grow: 1;
    overflow: auto;
    margin: 5px;

    > .current {
      padding: 0 10px;
      display: flex;
      overflow: auto;
      flex-wrap: wrap;
      align-items: start;

      > li {
        height: 12vh;
        width: 33.333%;
        padding: 10px;


        > .icon-wrapper {
          overflow: hidden;
          height: 50px;
          border: 2px solid $color-orange;
          border-radius: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          font-size: 14px;
          font-weight: 600;

          &.selected {
            color: $color-fontBlue;

            > .icon {
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

  @-webkit-keyframes move {
    0% {
      transform: rotate(50deg);
    }
    33% {
      transform: rotate(20deg);
    }
    66% {
      transform: rotate(-20deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes move {
    0% {
      transform: rotate(0deg);
    }
    33% {
      transform: rotate(20deg);
    }
    66% {
      transform: rotate(-20deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

</style>