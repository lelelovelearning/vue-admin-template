<template>
    <div class="barchart" ref="barchart"></div>
</template>
<script>
import * as echarts from 'echarts'
export default {
    name:'BarChart',
    mounted(){
    let mycharts=echarts.init(this.$refs.barchart)
mycharts.setOption({
    xAxis:{
        show:false,type: "category",
    },
    yAxis:{
        show:false
    },
    series:[
        {
            type:'bar',
            data:[135,99,65,82,139,240,566,188,156,231,391,343,65,342,88]
        }
    ],
    grid: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
})
}
}

</script>
<style scoped>
    .barchart{
        width: 100%;
        height: 100%;
    }
</style>