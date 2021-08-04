<template>
  <div class="tags">
    <header>
      <div class="upHead">
        <div class="left"  @click="goBack">
        <Icon name="left" />
        </div>
        <div>添加标签</div>
        <div class="resolve">完成</div>
      </div>
      <div class="downHead">
        <div class="tagHead">
          <p>选中标签：</p>
          <div class="downHeadIcon-wrapper">
          <Icon name="垃圾桶"/>
          </div>
        </div>
        <div>名称</div>
      </div>
    </header>
    <main>
      <div class="content">
        <div class="live">
          <div class="kind-name">
            生活
          </div>
        </div>
        <div class="live">
          <div class="kind-name">
            娱乐
          </div>
        </div>
        <div class="live">
          <div class="kind-name">
            美食
          </div>
        </div>
        <div class="live">
          <div class="kind-name">
            数码
          </div>
        </div>
        <div class="live">
          <div class="kind-name">
            购物
          </div>
        </div>
        <div class="live">
          <div class="kind-name">
            户外
          </div>
        </div>

      </div>
    </main>

  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class EditTags extends Vue {
  goBack(){
    this.$router.back()
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
      height:50px;
      padding:0 10px;
      color:white;
      font-size: 18px;
      >.left{
        .icon{
          width: 30px;
          height:30px;
        }

      }

    }

    .downHead {
      height:60px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding:5px 10px;

      border-bottom: 1px solid darken(#f2f2f2,8%);
      > .tagHead {
        display: flex;
        flex-direction: row;
        align-items: center;
        >.downHeadIcon-wrapper{
          display: flex;
          align-items: center;
          justify-content: center;
          border:1px solid #18a0fb;
          padding: 5px;
          border-radius: 50%;
          >.icon{

            width: 30px;
            height:30px;
          }
        }

      }
    }
  }
  main{
    .content{
      margin: 10px 20px 0 20px;
      border:1px solid red;
      height:80vh;
    }
  }
</style>