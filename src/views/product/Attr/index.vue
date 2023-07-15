<template lang="">
  <div>
    <!-- 放三级联动下拉框的card -->
    <el-card style="margin: 20px 0">
      <CategorySelect @getCategoryId="getAttrInfoList"></CategorySelect>
    </el-card>

    <el-card>
      <el-button type="primary" icon="el-icon-plus" :disabled="this.attrInfoList.length==0?true:false">添加属性</el-button>
      <el-table :data="attrInfoList" border style="width: 100%">
        <el-table-column type="index" label="序号" width="80" align="center">
        </el-table-column>
        <el-table-column prop="attrName" label="属性姓名" width="180">
        </el-table-column>
        <el-table-column label="属性值列表">
          <template slot-scope="{ row, $index }">
            <el-tag
              type="success"
              v-for="(attrValue, index) in row.attrValueList"
              :key="attrValue.id"
              style="margin:5px 12px"
              >{{ attrValue.valueName }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
        <template slot-scope="{row,$index}">
            <el-button type="warning" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" ></el-button>
        </template>    
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "Attr",
  data() {
    return {
      attrInfoList: [],
    };
  },
  methods: {
    async getAttrInfoList(cForm) {
      const { category1Id, category2Id, category3Id } = cForm;
      let result = await this.$API.attr.reqAttrInfoList(
        category1Id,
        category2Id,
        category3Id
      );
      if (result.code == 200) {
        console.log(result);
        this.attrInfoList = result.data;
      }
    },
  },
};
</script>
<style lang=""></style>
