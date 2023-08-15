<template>
  <el-card class="box-card" style="margin: 10px 0">
    <!-- 头部 -->
    <div slot="header" class="clearfix">
      <el-tabs class="tabs"  v-model="activeName" @tab-click="tabClick">
        <el-tab-pane label="销售额" name="first"></el-tab-pane>
        <el-tab-pane label="访问量" name="second"></el-tab-pane>
      </el-tabs>
      <div class="right">
        <span @click="setDay">今日</span>
        <span @click="setWeek">本周</span>
        <span @click="setMonth">本月</span>
        <span @click="setYear">本年</span>
        <el-date-picker
        v-model="date"
          class="date"
          size="mini"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
    </div>
    <!-- 头部 end-->
    <!--grid 栅格分两栏 图表+销售额排名 -->
    <div>
      <el-row :gutter="10" >
        <el-col :span="16">
          <div class="charts" ref="charts"></div>
        </el-col>
        <el-col :span="8">
          <div class="rightbox">
            <h3>门店{{title}}排名</h3>
            <ul>
              <li>
                <span class="rindex">1</span><span>肯德基</span><span class="rvalue">999</span>
              </li>
              <li>
                <span class="rindex">2</span><span>肯德基</span><span class="rvalue">999</span>
              </li>
              <li>
                <span class="rindex">3</span><span>肯德基</span><span class="rvalue">999</span>
              </li>
              <li><span>4</span><span>肯德基</span><span class="rvalue">999</span></li>
              <li><span>5</span><span>肯德基</span><span class="rvalue">999</span></li>
              <li>
                <span>6</span>
                <span>肯德基</span>
                <span class="rvalue">999</span>
              </li>
              <li>
                <span>7</span>
                <span>肯德基</span>
                <span class="rvalue">999</span>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>
<script>
import * as echarts from "echarts";
import dayjs from 'dayjs'
export default {
  name: "Sale",
  data() {
    return {
      activeName: "first",
      mycharts:null,
      title:'销售额',
      date:[]
    };
  },
  methods: {
    tabClick(tab){
    this.title=(tab.name=="first")?"销售额":"访问量"
    this.mycharts.setOption({
            title:{
                text:this.title+'趋势'
            }
        })
        console.log(tab);
    },
    setDay(){
        this.date=[dayjs().format('YYYY-MM-DD'),dayjs().format('YYYY-MM-DD')]
    },
    setWeek(){
        const start=dayjs().day(1).format('YYYY-MM-DD')
        const end=dayjs().day(7).format('YYYY-MM-DD')
        this.date=[start,end]
    },
    setMonth(){
        const start=dayjs().startOf('month').format('YYYY-MM-DD')
       const end=dayjs().endOf('month').format('YYYY-MM-DD')
       this.date=[start,end]
    },
    setYear(){
        const start=dayjs().startOf('year').format('YYYY-MM-DD')
       const end=dayjs().endOf('year').format('YYYY-MM-DD')
       this.date=[start,end]
    }
  },
  mounted() {
    this.mycharts = echarts.init(this.$refs.charts);
    this.mycharts.setOption({
      title: {
        text: "销售额趋势",
        top: "18.720",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "0",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "30%",
          data: [10, 52, 200, 334, 390, 330, 220, 345, 621, 321, 99, 142],
          color: "skyblue",
        },
      ],
    });
  },
};
</script>
<style scoped>
.text {
  font-size: 14px;
}
.clearfix {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.tabs {
  width: 100%;
}
.right {
  justify-self: right;
  position: absolute;
  right: 10px;
}
.date {
  width: 230px;
  margin: 0 20px;
}
.right span {
  margin: 0 10px;
}
.charts {
  width: 100%;
  height: 300px;
}
ul {
  padding: 0;
  list-style: none;
  width: 100%;
  height: 300px;
}
ul li {
  height: 12%;
  
}
.rightbox span{
    margin: 0 10px;
}
ul li span:first-child{
    display: inline-block;
    width: 20px;
    height: 20px;
    text-align: center;
}
.rindex {
  border-radius: 50%;
  background-color: rgb(0, 0, 0);
  color: #fff;
  text-align: center;
}
.rvalue{
    float: right;
}
</style>
