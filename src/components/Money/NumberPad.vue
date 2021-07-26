<template>
  <div class="numberPad">
    <div class="output">100</div>
    <div class="buttons">
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>删除</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>清空</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button class="ok">OK</button>
      <button class="zero">0</button>
      <button>.</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NumberPad"
  }
</script>

<style scoped lang="scss">
  @import '~@/assets/style/helper.scss';
  .numberPad {
    .output {
      box-shadow: inset 0 0 3px 1px $color-blue;
      font-size: 30px;
      font-family: Consolas, monospace;
      padding: 6px 16px;
      text-align: right;
      color:$color-orange;
      background: #ffffff;
    }

    > .buttons {

      @extend %clearFix;

      > button {
        background: transparent;
        //border: none;
        width: 25%;
        height: 48px;
        float: left;

        border:1px solid $color-fontBlue;
        border-radius: 4px;
        color:$color-orange;
        font-weight: 700;
        &.ok {
          float: right;
          height: 48*2px;
        }

        &.zero {
          width: 50%;
        }


      $bg: #f2f2f2;

      }

    }
  }
</style>