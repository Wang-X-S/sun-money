<template>
  <div class="tags">
    <ul class="current">
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
    </ul>
    <div class="new">
      <button>新增标签</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Tags"
  }
</script>

<style lang="scss" scoped>
  .tags {
    font-size: 14px;
    padding: 16px;
    flex-grow: 1;

    > .current {
      display: flex;
      overflow: auto;
      height: 64px;

      > li {
        background: #d9d9d9;
        height: 24px;
        line-height: 24px;
        border-radius: 12px;
        padding: 0 16px;
        margin-right: 12px;
      }
    }

    > .current::-webkit-scrollbar {
      width: 0 !important
    }

    > .new {

      padding-top: 16px;
      position: relative;

      > button {
        position: absolute;
        background: transparent;
        border: none;
        color: #999;
        padding: 0 3px;
      }
    }
  }
</style>