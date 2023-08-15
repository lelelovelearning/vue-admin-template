<template lang="">
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect
        @getCategoryId="getCategoryId"
        :isShow="scene != 0"
      ></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="scene == 0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="category3Id == ''"
          @click="addSpu"
          >添加SPU</el-button
        >

        <el-table :data="spuList" style="width: 100%">
          <el-table-column
            label="序号"
            type="index"
            align="center"
          ></el-table-column>
          <el-table-column label="spu名称" prop="spuName"></el-table-column>
          <el-table-column label="spu描述" prop="description"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{ row, $index }">
              <HintButton
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加sku"
                @click="addSku(row)"
              ></HintButton>
              <HintButton
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改spu"
                @click="updateSpu(row)"
              ></HintButton>
              <HintButton
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看当前spu的sku列表"
                @click="handler(row)"
              ></HintButton>
              <el-popconfirm
                title="这是一段内容确定删除吗？"
                @onConfirm="deleteSpu(row)"
              >
                <HintButton
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  title="删除spu"
                  slot="reference"
                ></HintButton>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- @current-change="" layout="" -->
        <el-pagination
          style="text-align: center"
          :total="total"
          :current-page="page"
          @current-change="getSpuList"
          :page-size="limit"
        ></el-pagination>
      </div>
      <SpuForm
        v-show="scene == 1"
        @changeScene="changeScene"
        ref="spu"
      ></SpuForm>
      <SkuForm
        @changeScenes="changeScenes"
        v-show="scene == 2"
        ref="sku"
      ></SkuForm>
    </el-card>
    <el-dialog :title="`${spu.spuName}的sku列表`" :visible.sync="dialogTableVisible" :before-close="close">
      <el-table :data="skuList" style="width:100%" border v-loading="loading">
        <el-table-column
          property="skuName"
          label="名称"
        ></el-table-column>
        <el-table-column
          property="price"
          label="价格"
        ></el-table-column>
        <el-table-column
          property="weight"
          label="重量"
        ></el-table-column>
        <el-table-column
          label="默认照片"
        >
        <template slot-scope="{row,$index}">
         <img :src="row.skuDefaultImg" style="width:100px;height:100px" >
        </template>
      </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import SpuForm from "@/views/product/Spu/SpuForm";
import SkuForm from "@/views/product/Spu/SkuForm";
export default {
  name: "Spu",
  components: { SpuForm, SkuForm },
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      limit: 6,
      spuList: [],
      total: 0,
      page: 1,
      scene: 0,
      dialogTableVisible:false,
      spu:{},
      skuList:[],
      loading:true
    };
  },
  methods: {
    getCategoryId(cForm) {
      const { category1Id, category2Id, category3Id } = cForm;
      this.category1Id = category1Id;
      this.category2Id = category2Id;
      this.category3Id = category3Id;
      this.getSpuList();
    },
    async getSpuList(pager = 1) {
      this.page = pager;
      const { page, limit, category3Id } = this;
      let result = await this.$API.spu.reqSpuList(page, limit, category3Id);

      if (result.code == 200) {
        this.spuList = result.data.records;
        this.total = result.data.total;
      }
    },
    changeScene({ scene, flag }) {
      this.scene = scene;
      if (flag == "添加") {
        this.getSpuList(0);
      } else {
        this.getSpuList(this.page);
      }
    },
    updateSpu(row) {
      this.scene = 1;
      this.$refs.spu.initSpuData(row);
    },
    addSpu() {
      this.scene = 1;
      //通知子组件发请求，发两个请求。
      //获取spu子组件
      this.$refs.spu.addSpuData(this.category3Id);
    },
    async deleteSpu(row) {
      let result = await this.$API.spu.reqDeleteSpu(row.id);
      if (result.code == 200) {
        this.$message({ type: "success", message: "删除成功" });
        if (this.page == 1) {
          this.getSpuList(this.page);
        } else {
          this.getSpuList(this.spuList.length > 1 ? this.page : this.page - 1);
        }
      }
    },
    addSku(row) {
      this.scene = 2;
      //父组件调用子组件的方法，让子组件请求数据
      this.$refs.sku.getData(this.category1Id, this.category2Id, row);
    },
    changeScenes(scene) {
      this.scene = scene;
    },
    async handler(spu){
      this.dialogTableVisible = true
      this.spu=spu
      let result=await this.$API.sku.reqSkuList(spu.id)
      if(result.code==200){
        this.loading=false
        this.skuList=result.data
      }
    },
    close(done){
      this.loading=true
      //清除sku列表的数据
      this.skuList=[]
      done()
      //done用于关闭对话框
    }
    },
};
</script>
<style lang=""></style>
