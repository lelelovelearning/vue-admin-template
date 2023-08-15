<template>
  <el-card>
    <div slot="header">
      <div class="category-header">
        <span>销售额类别占比</span>
        <el-radio-group v-model="radio" size="mini">
          <el-radio-button label="全部渠道"></el-radio-button>
          <el-radio-button label="线上"></el-radio-button>
          <el-radio-button label="门店"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div>
      <div class="charts" ref="charts" style="height: 300px; width: 100%"></div>
    </div>
  </el-card>
</template>
<script>
import * as echarts from "echarts";
export default {
  name: "Category",
  data() {
    return {
      radio: "全部渠道",
    };
  },
  mounted() {
    let mycharts = echarts.init(this.$refs.charts);
    mycharts.setOption( {
        title:{
            text:'Search Engine',
            subtext:'1048',
            top:'center',
            left:'center'
        },
  tooltip: {
    trigger: 'item'
  },
  series: [
    {
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: true,
        position: 'outside'
      },
      labelLine: {
        show:true
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ]
    }
  ]
});
mycharts.on('mouseover', (params)=>{
    mycharts.setOption({
        title:{
            text:params.data.name,
            subtext:params.data.value
        }
    })
});
  }
}
</script>
<style scoped>
.category-header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ebeef5;
}
</style>
