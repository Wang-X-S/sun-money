<template>
  <div class="nav">
    <router-link to="/money">
      <svg>
        <use xlink:href="#money" />
      </svg>
      记账</router-link>
    |
    <router-link to="/labels">
      <svg>
        <use xlink:href="#label" />
      </svg>
      标签</router-link>
    |
    <router-link to="/statistics">
      <svg>
        <use xlink:href="#statistics" />
      </svg>
      统计</router-link>
  </div>
</template>

<script>
  import money from '@/assets/icons/money.svg'
  import label from '@/assets/icons/label.svg'
  import statistics from '@/assets/icons/statistics.svg'

  export default {
    name: "Nav"
  }
</script>

<style lang="scss" scoped>
  .nav{
    border:1px solid red
  }
</style>