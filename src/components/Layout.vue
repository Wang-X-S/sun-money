<template>
  <div class="layout-wrapper">
    <div class="content" :class="classPrefix && `${classPrefix}-content`">
     <slot/>
    </div>
    <Nav/>
  </div>
</template>

<script>
  export default {
    name: "Layout",
    props:['classPrefix']
  }
</script>


<style scoped>
  .layout-wrapper{
    display:flex;
    flex-direction: column;
    height:100vh;
  }
  .content{

    flex-grow:1;
    overflow: auto;
  }
</style>