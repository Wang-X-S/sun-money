<template>
  <div>
  <v-chart class="chart" :option="option"/>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {Component,Prop} from 'vue-property-decorator';
  import 'echarts';
  import {use} from 'echarts/core';
  import {CanvasRenderer} from 'echarts/renderers';
  import {PieChart} from 'echarts/charts';
  import {
    TitleComponent,
    TooltipComponent,
    LegendComponent
  } from 'echarts/components';
  import VChart, {THEME_KEY} from 'vue-echarts';
  use([
    CanvasRenderer,
    PieChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent
  ]);

  @Component({
    components:{VChart,}
  })

  export default class Chart extends Vue {
    @Prop() chartData

    created(){
      console.log(this.chartData)
      console.log('mydata')
      console.log(this.mydata)
    }
    mydata=[
      {value: 33, name: "交通"},
      {value: 121, name: "美食"},
      {value: 780, name: "房租"}
    ]
    option={
      title: {
        text: "Traffic Sources",
        left: "center"
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        left: "left",
        data: [
          "Direct",
          "Email",
          "Ad Networks",
          "Video Ads",
          "Search Engines"
        ]
      },
      series: [
        {
          name: "Traffic Sources",
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: this.mydata,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    }
  }
</script>

<style scoped>
  .chart{

    width: 100%;
  }
</style>