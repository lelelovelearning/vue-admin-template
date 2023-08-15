<template lang="">
  <div>
    <el-table border style="width: 100%" :data="records">
      <el-table-column
        label="序号"
        type="index"
        width="80px"
        align="center"
      ></el-table-column>
      <el-table-column label="名称" prop="skuName"></el-table-column>
      <el-table-column label="描述" prop="skuDesc"></el-table-column>
      <el-table-column label="默认图片">
        <template slot-scope="{ row, $index }">
          <img :src="row.skuDefaultImg" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column
        label="重量"
        prop="weight"
        width="80px"
      ></el-table-column>
      <el-table-column label="价格" prop="price" width="80px"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{ row, $index }">
          <el-button
            type="success"
            icon="el-icon-sort-down"
            size="mini"
            v-if="row.isSale == 0"
            @click="sale(row)"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-sort-up"
            size="mini"
            v-else
            @click="cancel(row)"
          ></el-button>
          <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
          <el-button
            type="info"
            icon="el-icon-info"
            size="mini"
            @click="getSkuInfo(row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="text-align: center"
      :total="total"
      :current-page="page"
      :page-size="limit"
      @current-change="getSkuList"
    ></el-pagination>

    <el-drawer
      size="50%"
      :visible.sync="show"
      :direction="direction"
      :show-close="false"
    >
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuInfo.price }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <el-tag
            type="success"
            v-for="(attr, index) in skuInfo.skuAttrValueList"
            :key="attr.id"
            style="margin: 0 10px 10px 0"
            >{{ attr.attrId }}-{{ attr.valueId }}</el-tag
          >
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品照片</el-col>
        <el-col :span="16">
          <el-carousel trigger="click" height="150px">
            <el-carousel-item v-for="(img,index) in skuInfo.skuImageList" :key="img.id">
             <img :src="img.imgUrl">
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>
<script>
export default {
  name: "Sku",
  data() {
    return {
      total: 0,
      page: 1,
      limit: 10,
      records: [],
      skuInfo: {},
      show: false,
      direction: "rtl",
    };
  },
  mounted() {
    //获取组件列表的方法
    this.getSkuList();
  },
  methods: {
    async getSkuList(pager = 1) {
      this.page = pager;
      const { page, limit } = this;
      let result = await this.$API.sku.reqSkuList1(page, limit);
      if (result.code == 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },
    async sale(sku) {
      let result = await this.$API.sku.reqSale(sku.id);
      if (result.code == 200) {
        //isSale属性，是sku自带的属性，是上下线按钮的条件
        sku.isSale = 1;
        this.$message({ type: "success", message: "上架成功" });
      } else {
        this.$message({ type: "warning", message: "上架失败" });
      }
    },
    async cancel(sku) {
      let result = await this.$API.sku.reqCancelSale(sku.id);
      if (result.code == 200) {
        sku.isSale = 0;
        this.$message({ type: "success", message: "下架成功" });
      } else {
        this.$message({ type: "warning", message: "下架失败" });
      }
    },
    async getSkuInfo(sku) {
      this.show = true;
      let result = await this.$API.sku.reqSkuById(sku.id);
      if (result.code == 200) {
        this.skuInfo = result.data;
      }
    },
  },
};
</script>
<style scoped>
.el-row .el-col-5 {
  font-size: 18px;
  text-align: right;
}
.el-col {
  margin: 10px;
}
>>>.el-carousel__button{
    width: 10px;
    height: 10px;
    background: black;
    border-radius: 50%;
}
</style>
