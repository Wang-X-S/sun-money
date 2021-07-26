<template>
  <div class="tags">
    <ul class="current">
      <li>
        <div class="icon-wrapper">
          <Icon name="money"/>
          <p>衣</p>
        </div>
      </li>
      <li>
        <div class="icon-wrapper">
          <Icon name="money"/>
          <p>衣</p>
        </div>
      </li>
      <li>
        <div class="icon-wrapper">
          <Icon name="money"/>
          <p>衣</p>
        </div>
      </li>
      <li>
        <div class="icon-wrapper">
          <Icon name="money"/>
          <p>衣</p>
        </div>
      </li>
      <li>
        <div class="icon-wrapper">
          <Icon name="money"/>
          <p>衣</p>
        </div>
      </li>
      <li>
        <div class="icon-wrapper">
          <Icon name="money"/>
          <p>衣</p>
        </div>
      </li>
      <li>
        <div class="icon-wrapper">
          <Icon name="money"/>
          <p>衣</p>
        </div>
      </li>
      <li>
        <div class="icon-wrapper">
          <Icon name="money"/>
          <p>衣</p>
        </div>
      </li>
      <li>
        <div class="icon-wrapper">
          <Icon name="money"/>
          <p>衣</p>
        </div>
      </li>
      <li>
        <div class="icon-wrapper">
          <Icon name="money"/>
          <p>衣</p>
        </div>
      </li><li>
      <div class="icon-wrapper">
        <Icon name="money"/>
        <p>衣</p>
      </div>
    </li>
      <li>
        <div class="icon-wrapper">
          <Icon name="money"/>
          <p>衣</p>
        </div>
      </li>
      <li>
        <div class="icon-wrapper">
          <Icon name="money"/>
          <p>衣</p>
        </div>
      </li>
      <li>
        <div class="icon-wrapper">
          <Icon name="money"/>
          <p>衣</p>
        </div>
      </li>


      <li class="newButton">
        <div class="icon-wrapper">
          <Icon name="label"/>
          <p>新建标签</p>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
  export default {
    name: "Tags"
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  .tags::-webkit-scrollbar {
    width: 0 !important
  }

  .tags {
    flex-grow: 1;
    overflow: auto;
    margin:5px;

    > .current {
      padding: 0 10px;
      display: flex;
      overflow: auto;
      flex-wrap: wrap;
      align-items: start;

      > li {
        height:12vh;
        width: 33.333%;
        padding:10px;


        >.icon-wrapper{
          height: 50px;
          border: 2px solid $color-orange;
          border-radius: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          font-size: 14px;
          .icon {
            margin-top: 2px;
            height: 50px;
            width: 50px;
          }
        }

      }
    }
  }
</style>