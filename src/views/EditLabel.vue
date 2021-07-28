<template>

  <div class="wrapper">
    <header>
    <div class="navBar">
      <Icon name="left" class="left"/>
      <span class="title">编辑标签</span>
      <span class="right"></span>
    </div>
    </header>
    <main>
    <div class="form-wrapper">
      <InputBox :value="tag.name" field-name="标签名" placeholder="在这里输入标签名" @update:value="onUpdateInput"/>
      <InputBox field-name="日期" placeholder="在这里输入备注" @update:value="onUpdateInput"/>
      <InputBox field-name="备注" placeholder="" @update:value="onUpdateInput"/>
      <InputBox field-name="金额" placeholder="" @update:value="onUpdateInput"/>
    </div>
    </main>
    <footer>
    <div class="button-wrapper">
      <button>编辑完成</button>
      <button class="delete">删除</button>
    </div>
    </footer>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import tagListModel from '@/model/tagListModel';
  import Notes from '@/components/Money/Notes.vue';
  import InputBox from '@/components/InputBox.vue';

  @Component({
    components: {InputBox, Notes}
  })
  export default class EditLabel extends Vue {
    tag?:{id:string,name:string} = undefined
    onUpdateInput(value: string) {
      console.log(value);
    }

    created() {
      const id = this.$route.params.id;
      tagListModel.fetch();
      const tags = tagListModel.data;
      const tag = tags.filter(t => t.id === id)[0];
      if (tag) {
        this.tag=tag
      } else {
        this.$router.replace('/404');
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '~@/assets/style/helper.scss';

  .navBar {
    display: flex;
    justify-content: space-between;
    padding: 12px 16px;
    align-items: center;
    font-size: 18px;
    background: $color-fontBlue;
    color: #ffffff;
    font-weight: 500;

    > .left {
      width: 24px;
      height: 24px;
    }

    > .right {
      width: 24px;
      height: 24px;
    }
  }
  .wrapper{
    position: relative;

    height:100vh;
  }
  .button-wrapper{
    position: absolute;
    bottom:0;
    display: flex;
    justify-content:center;
    align-items: center;
    flex-direction: row;

    button{
      border:none;
      box-shadow:0 0 3px $color-shadow;
      width:50vw;
      height:10vh;
      background: #ffffff; ;
    }
    .delete{
      color:red;
    }
  }

</style>
