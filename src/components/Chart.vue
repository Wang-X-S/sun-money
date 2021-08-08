<template>
  <div class="wrapper" ref="wrapper"></div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop, Watch} from 'vue-property-decorator';
  import 'echarts';
  import {EChartsOption,ECharts} from 'echarts';
  import * as echarts from 'echarts'

  @Component({
    components:{}
  })

  export default class Chart extends Vue {
    @Prop() options?: EChartsOption
    chart?:ECharts
    mounted(){
      if(this.options===undefined){
        return
      }
      this.chart = echarts.init(this.$refs.wrapper as HTMLDivElement)
      this.chart.setOption(this.options)
    }
    @Watch ('options')
    updateOptions(newValue:EChartsOption){
      this.chart!.setOption(newValue)
    }
  }
</script>

<style scoped>
  .wrapper{
    height:350px;
    width: 100%;
  }
</style>