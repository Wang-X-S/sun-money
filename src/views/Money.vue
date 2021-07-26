<template>
  <div>
    <Layout class-prefix="layout">
      <Types/>
      <Notes/>
      <Tags/>

      <NumberPad/>


    </Layout>

  </div>
</template>

<script>

  import Types from "@/components/Money/Types"
  import Tags from "@/components/Money/Tags"
  import Notes from "@/components/Money/Notes"
  import NumberPad from "@/components/Money/NumberPad"
  export default {
    name: "Money",
    components: {NumberPad, Notes, Tags, Types}
  }
</script>
<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column;
  }
</style>
<style lang="scss" scoped>
  @import '~@/assets/style/helper.scss';









</style>