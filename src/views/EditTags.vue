<template>
  <div class="tags">
      <header>
        <div class="upHead">
          <div class="left" @click="goBack">
            <Icon name="left" />
          </div>
          <div>添加标签</div>
          <div class="resolve" @click="resolve">完成</div>
        </div>
        <div class="downHead">
          <div class="tagHead">
            <p>选中标签：</p>
            <div class="downHeadIcon-wrapper">
              <Icon :name="tag.name" />
            </div>
          </div>
          <div>{{tag.name}}</div>
        </div>
      </header>
    <main>
      <div class="content">
        <div class="live">
          <div class="kind-name">
            生活
          </div>
          <TagList :tag-list="liveTag" :selected-tag.sync="tag"/>

        </div>
        <div class="live">
          <div class="kind-name">
            娱乐
          </div>
          <TagList :tag-list="amusement" :selected-tag.sync="tag"/>
        </div>
        <div class="live">
          <div class="kind-name">
            美食
          </div>
          <TagList :tag-list="cate" :selected-tag.sync="tag"/>

        </div>
        <div class="live">
          <div class="kind-name">
            数码
          </div>
          <TagList :tag-list="digit" :selected-tag.sync="tag"/>

        </div>
        <div class="live">
          <div class="kind-name">
            购物
          </div>
          <TagList :tag-list="shopping" :selected-tag.sync="tag"/>

        </div>
        <div class="live">
          <div class="kind-name">
            户外
          </div>
          <TagList :tag-list="outdoors" :selected-tag.sync="tag"/>

        </div>
      </div>
    </main>

  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import {
    defaultExpendTags,
    defaultIncomeTags,
    liveTag,
    amusement,
    cate,
    digit,
    outdoors,
    shopping
  } from '@/contants/defaultTag.ts';
  import TagList from '@/components/TagList.vue';
  type Tag= {
    id:string;
    name:string;
  }
  @Component({
    components: {TagList}
  })
  export default class EditTags extends Vue {
    tag:Tag={id:'1',name:'宠物'}
    defaultExpendTags = defaultExpendTags;
    defaultIncomeTags = defaultIncomeTags;
    liveTag = liveTag;
    amusement = amusement;
    cate = cate;
    digit = digit;
    outdoors = outdoors;
    shopping = shopping;
    updated(){
      console.log(this.tag);
    }
    goBack() {
      this.$router.back();
    }
    resolve(){
      console.log('ok');
    }
  }
</script>

<style scoped lang="scss">

  header {

    height: 100px;

    display: flex;
    flex-direction: column;

    .upHead {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      background: #18a0fb;
      height: 50px;
      padding: 0 10px;
      color: white;
      font-size: 18px;

      > .left {
        .icon {
          width: 30px;
          height: 30px;
        }

      }

    }

    .downHead {
      height: 60px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 5px 10px;

      border-bottom: 1px solid darken(#f2f2f2, 8%);

      > .tagHead {
        display: flex;
        flex-direction: row;
        align-items: center;

        > .downHeadIcon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          background: darken(#f2f2f2,8%);
          padding: 5px;
          border-radius: 50%;

          > .icon {

            width: 30px;
            height: 30px;
          }
        }

      }
    }
  }
  main::-webkit-scrollbar{
    width: 0!important;
  }
  main {
    margin-top: 10px;
    overflow: auto;
    .content {
      padding: 0 20px 0 20px;
      height: 80vh;
    }

    .kind-name {
      display: flex;
      justify-content: center;
      font-size: 14px;
      color:#999999;
    }
  }
</style>