<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6"
        ><el-card
          ><Detail title="总销售额" count="￥22637">
            <template slot="charts">
              <div class="chart1">
                <span>周同比&nbsp;&nbsp;56.67%</span>
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
                &nbsp;&nbsp;
                <span>日同比&nbsp;&nbsp;19.16%</span>
                <svg
                  t="1691632167557"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="5973"
                  width="16"
                  height="16"
                >
                  <path
                    d="M183.9 320.6l698.8-1.8c39.5 1 62.6 42.5 41 73.8l-369.5 435c-21.1 30.5-69.1 28.3-87.1-3.9L137.8 390.4c-17.9-32.2 7.5-70.8 46.1-69.8z"
                    fill="#1afa29"
                    p-id="5974"
                  ></path>
                </svg>
              </div>
            </template>
            <template slot="footer">
              <span>日销售额 ￥1234</span>
            </template>
          </Detail></el-card
        ></el-col
      >
      <el-col :span="6"
        ><el-card
          ><Detail title="访问量" count="2637">
            <template slot="charts">
              <LineChart></LineChart>
            </template>
            <template slot="footer">
              <span>日访问量 2234</span>
            </template>
          </Detail></el-card
        ></el-col
      >
      <el-col :span="6"
        ><el-card
          ><Detail title="支付笔数" count="5457">
            <template slot="footer">
              <span>转化率 65%</span>
            </template>
            <template slot="charts">
               <BarChart></BarChart>
            </template>
          </Detail></el-card
        ></el-col
      >
      <el-col :span="6"
        ><el-card
          ><Detail title="运营活动效果" count="72%">
            <template slot="footer">
              <div>
                <span>周同比&nbsp;&nbsp;56.67%</span>
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
                &nbsp;&nbsp;
                <span>日同比&nbsp;&nbsp;19.16%</span>
                <svg
                  t="1691632167557"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="5973"
                  width="16"
                  height="16"
                >
                  <path
                    d="M183.9 320.6l698.8-1.8c39.5 1 62.6 42.5 41 73.8l-369.5 435c-21.1 30.5-69.1 28.3-87.1-3.9L137.8 390.4c-17.9-32.2 7.5-70.8 46.1-69.8z"
                    fill="#1afa29"
                    p-id="5974"
                  ></path>
                </svg>
              </div>
            </template> 
            <template slot="charts">
               <ProgressChart></ProgressChart>
            </template>
        </Detail></el-card
      ></el-col>
    </el-row>
  </div>
</template>
<script>
import Detail from "@/views/dashboard/Card/Detail";
import LineChart from "@/views/dashboard/Card/lineChart";
import BarChart from "@/views/dashboard/Card/barChart";
import ProgressChart from "@/views/dashboard/Card/progressChart";
export default {
  name: "Card",
  components: { Detail, LineChart,BarChart, ProgressChart},
};
</script>
<style>
</style>
