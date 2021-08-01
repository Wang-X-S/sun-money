<template>
  <div class="x" >
    <Layout>
      <Tab  :data-source="typeArray"
            :value.sync="type"
            class-prefix="type"
      />
      <Tab   class-prefix="interval"
             :data-source="dateArray"
             :value.sync="interval"
      />
    </Layout>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {Component} from 'vue-property-decorator'
  import Tab from "@/components/Tab"
  import Types from "@/components/Money/Types"
  import recordTypeList from "@/contants/recordTypeList"
  import intervalList from "@/contants/intervalList"
  @Component({
    components:{Types, Tab}
  })
  export default class Statistics extends Vue{
    interval='day'
    type='-'
    typeArray=recordTypeList
    dateArray=intervalList
  }
</script>

<style scoped lang="scss">
   ::v-deep li.interval-item{

     width:33.33vw;
     padding:0!important;
     border-radius: 0!important;
     box-shadow:0 0 3px rgba(0,0,0,0.25) !important;
     &.selected{
       box-shadow: inset 0 0 0 0 transparent !important;
     }
  }
  ::v-deep .interval-ul{
    height:30px !important;
  }
</style>