<template>
  <div>
    <ul class="types">
      <li class="selected">支出</li>
      <li>收入</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "Types"
  }
</script>

<style lang="scss" scoped>
  .types {
    background: #c4c4c4;
    display: flex;
    font-size: 24px;
    text-align: center;

    > li {
      height: 64px;
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      &.selected::after {
        content: '';
        background: #333;
        width: 100%;
        height: 4px;
        position: absolute;
        bottom: 0;
        left: 0;
      }
    }
  }
</style>