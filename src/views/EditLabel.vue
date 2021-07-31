<template>

  <div class="wrapper">
    <header>
      <div class="navBar">
        <Icon name="left"  class="left" @click.native="goBack"/>
        <div class="tag">
          <Icon :name="`${tag.name}`" class="middle"/>
          <span class="title">{{tag.name}}</span>
        </div>
        <span class="right"></span>
      </div>
    </header>
    <main>
      <div class="form-wrapper">
        <InputBox :value="tag.name" field-name="标签名"
                  placeholder="在这里输入标签名"
                  @update:value="updateLabelName"/>
        <InputBox field-name="日期" placeholder="在这里输入备注"/>
        <InputBox field-name="备注" placeholder=""/>
        <InputBox field-name="金额" placeholder=""/>
      </div>
    </main>
    <footer>
      <div class="button-wrapper">
        <button @click="resolve">编辑完成</button>
        <button class="delete" @click="deleteTag">删除</button>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Notes from '@/components/Money/Notes.vue';
  import InputBox from '@/components/InputBox.vue';


  @Component({
    components: {InputBox, Notes},

  })
  export default class EditLabel extends Vue {
    get tag(){
      return this.$store.state.currentTag;
    }
    created() {
      const id = this.$route.params.id
      this.$store.commit('fetchTags',id)
      this.$store.commit('setCurrentTag',id)
      if (!this.tag) {
        this.$router.replace('/404');
      }
    }
    updateLabelName(name: string) {
      if (this.tag) {
        this.$store.commit('updateTagName',{id:this.tag.id,name})
        //TODO
        //oldStore.updateTagName(this.tag.id,name)
      }
    }
    deleteTag() {
      if(this.tag){
        this.$store.commit('removeTag',this.tag.id)
        //TODO
        return
        // if(oldStore.removeTag(this.tag.id)){
        //   this.$router.back()
        // }else{
        //   window.alert('删除失败')
        // }
      }
    }
    resolve(){
      console.log('未完成')
    }
    goBack(){
      this.$router.replace('/labels')
    }
  }
</script>

<style scoped lang="scss">
  @import '~@/assets/style/helper.scss';

  .navBar {
    display: flex;
    justify-content: space-between;
    padding: 8px 16px;
    align-items: center;
    font-size: 18px;
    background: $color-fontBlue;
    color: #ffffff;
    font-weight: 500;
    height:12vh;

    > .tag {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

    }

     .middle {
      width: 48px;
      height: 48px;
    }
     .left {
      width: 40px;
      height: 40px;
    }

    > .right {
      width: 40px;
      height: 40px;
    }
  }

  .wrapper {
    position: relative;
    height: 100vh;
  }

  .button-wrapper {
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;

    button {
      border: none;
      box-shadow: 0 0 3px $color-shadow;
      width: 50vw;
      height: 10vh;
      background: #ffffff;;
    }

    .delete {
      color: red;
    }
  }

</style>
