<template>
  <el-card class="box-card" >
    <div slot="header" class="search-header" style="border-bottom: 1px solid #EBEEF5">
        <span>线上热门搜索</span>
      <el-dropdown>
        <span class="el-dropdown-link">
          <i class="el-icon-more"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item disabled>双皮奶</el-dropdown-item>
          <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-row :gutter="10">
      <el-col :span="12">
    <LineChart></LineChart></el-col>
      <el-col :span="12">
        <LineChart></LineChart></el-col>
    </el-row>

    <el-table
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >
    <el-table-column
      label="排名"
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      label="搜索关键字"
      width="100">
    </el-table-column>
    <el-table-column
      label="用户数"
      sortable>
    </el-table-column>
    <el-table-column
      label="周涨率"
      sortable>
    </el-table-column>
  </el-table>
  <el-pagination
  style="float: right;"
    layout="prev, pager, next"
    :total="1000">
  </el-pagination>
  </el-card>
</template>
<script>
import LineChart from "@/views/dashboard/Observe/Search/lineCharts"
export default {
  name: "Search",
  components:{LineChart}
};
</script>
<style scoped>
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .search-header{
    display: flex;
    justify-content: space-between;
    padding-bottom: 5px;
  }

  
  </style>
