<template>
  <div class="charts" ref="charts"></div>
</template>
<script>
import * as echarts from "echarts";
export default {
  name: "LineChart",
  mounted() {
    let mycharts = echarts.init(this.$refs.charts);
    mycharts.setOption({
      xAxis: {
        show: false,
        type: "category",
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          type: "line",
          data: [110, 77, 133, 125, 188, 59,166,149,214,163,98,324,322,253],
          smooth: true,
          lineStyle: {
            type: "solid",
            color: "purple",
          },
          itemStyle: {
            opacity: 0,
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "purple", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#fff", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
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
.charts {
  width: 100%;
  height: 100%;
}
</style>
