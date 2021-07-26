<template>
  <div>
    <label class="notes">
      <span class="name">记 录</span>
      <input type="text" placeholder="在这里输入备注">
    </label>
  </div>
</template>

<script>

  export default {

    name: "Notes"
  }
</script>

<style scoped lang="scss">
  @import '~@/assets/style/helper.scss';
  .notes {
    font-size: 14px;
    background: $color-fontBlue;
    padding-left: 16px;
    display: flex;
    align-items: center;

    .name {
      padding-right: 16px;
      color:#ffffff;
      font-weight: 600;
      font-size: 18px;
    }

    input {
      margin:6px 6px 6px 6px;
      border-radius: 8px;
      height: 44px;
      flex-grow: 1;
      background: #ffffff;
      border: none;
      padding-right: 16px;
      padding-left: 16px;


    }
  }
</style>