<template>
  <div class="progresschart" ref="progresschart"></div>
</template>
<script>
import * as echarts from "echarts";
export default {
  name: "ProgressChart",
  mounted() {
    let mycharts = echarts.init(this.$refs.progresschart);
    mycharts.setOption({
      xAxis: {
        show: false,
        min: 0,
        max: 100,
      },
      yAxis: {
        show: false,
        type: "category",
        inverse: true,
      },
      series: [
        {
          name: "X",
          type: "bar",
          data: [72],
          barWidth: 15,
          color: "yellowgreen",
          showBackground: true,
          backgroundStyle: {
            color: "rgba(180, 180, 180, 0.2)",
          },
          label:{
            show:true,
            formatter:'|',
            position:'right'
          }
        },
      ],
      grid: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    });
  },
};
</script>
<style scoped>
.progresschart {
  width: 100%;
  height: 100%;
}
</style>
