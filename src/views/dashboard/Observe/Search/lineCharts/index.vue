<template>
  <div>
    <div class="header">
      <span> 搜索用户数</span>
      <svg
        t="1691590441099"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="5040"
        width="16"
        height="16"
      >
        <path
          d="M512 981.333333C253.866667 981.333333 42.666667 770.133333 42.666667 512S253.866667 42.666667 512 42.666667s469.333333 211.2 469.333333 469.333333-211.2 469.333333-469.333333 469.333333z m0-844.8c-206.506667 0-375.466667 168.96-375.466667 375.466667 0 206.506667 168.96 375.466667 375.466667 375.466667 206.506667 0 375.466667-168.96 375.466667-375.466667 0-206.506667-168.96-375.466667-375.466667-375.466667z"
          fill="#d4237a"
          p-id="5041"
        ></path>
        <path
          d="M512 796.714667a46.08 46.08 0 0 1-46.933333-46.933334v-269.056c0-26.624 20.352-46.933333 46.933333-46.933333 26.581333 0 46.933333 20.309333 46.933333 46.933333v269.056c0 26.624-20.352 46.933333-46.933333 46.933334zM512 364.928a46.08 46.08 0 0 1-46.933333-46.933333V274.218667c0-26.624 20.352-46.933333 46.933333-46.933334 26.581333 0 46.933333 20.309333 46.933333 46.933334v43.776c0 26.624-21.888 46.933333-46.933333 46.933333z"
          fill="#d4237a"
          p-id="5042"
        ></path>
      </svg>
    </div>
    <div class="main">
      <span style="margin-right: 30px;">12321</span>
      <span style="margin-right: 10px; color: black; font-size: 16px;">17.1</span>
      <svg
        t="1691631968198"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="35086"
        width="16"
        height="16"
      >
        <path
          d="M512 327.68l245.76 368.64H266.24z"
          fill="#d81e06"
          p-id="35087"
        ></path>
      </svg>    
      <div class="charts" ref="charts"></div>
    </div>
    <div class="foot">
       
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";
export default {
  name: "LineChart",
  data() {
    return {
      mycharts: null,
    };
  },
  mounted() {
    this.mycharts = echarts.init(this.$refs.charts);
    this.mycharts.setOption({

      xAxis: {
        type: "category",
        show: false,
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          type: "line",
          data: [135, 99, 65, 82, 139, 240, 236, 188, 156, 231,96, 65, 82, 139, 240, 123],
          smooth: true,
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
                  color: "blue", // 0% 处的颜色
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
      grid:{
        top:0,
        bottom:0,
        left:0,
        right:0
      }
    });
  },
};
</script>
<style scoped>

.header span{
    margin-right: 10px ;
}
.header{
    display: flex;
    align-items: center;
}
.main{
    height: 70px;
    margin: 10px 0;
    color:#d9d9d9;
    font-size: 20px;
}
.charts{
    height: 30px;
}

</style>
