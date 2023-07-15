<template lang="">
  <div>
    <el-form :inline="true" class="demo-form-inline" :model="cForm">
      <el-form-item label="一级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category1Id"
          @change="handler1"
        >
          <el-option
            v-for="(c1, index) in category1List"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="二级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category2Id"
          @change="handler2"
        >
          <el-option
            v-for="(c2, index) in category2List"
            :label="c2.name"
            :key="c2.id"
            :value="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="三级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category3Id"
          @change="handler3"
        >
          <el-option
            v-for="(c3, index) in category3List"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "CategorySelect",
  data() {
    return {
      //一级分类列表的数据
      category1List: [],
      //收集选择的三级列表的id
      cForm: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
      //二级分类列表的数据
      category2List: [],
      //三级分类列表的数据
      category3List: [],
    };
  },
  mounted() {
    this.getCategory1List();
  },
  methods: {
    async getCategory1List() {
      let result = await this.$API.attr.reqCategory1List();
      if (result.code == 200) {
        this.category1List = result.data;
      }
    },
    async handler1() {
      //将this.cForm中category1Id解构出来赋给handler1作用域的同名新的category1Id实参
      const { category1Id } = this.cForm;
      this.cForm.category2Id = "";
      //此处清空不能用解构，解构出来的是新值
      let result = await this.$API.attr.reqCategory2List(category1Id);
      if (result.code == 200) {
        this.category2List = result.data;
      }
    },
    async handler2() {
      const { category2Id } = this.cForm;
      this.cForm.category3Id = "";
      let result = await this.$API.attr.reqCategory3List(category2Id);
      if (result.code == 200) {
      this.category3List = result.data;
      }
    },
    handler3() {
      this.$emit("getCategoryId", this.cForm);
    },
  },
};
</script>
<style lang=""></style>
