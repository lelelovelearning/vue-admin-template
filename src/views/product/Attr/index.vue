<template lang="">
  <div>
    <!-- 放三级联动下拉框的card -->
    <el-card style="margin: 20px 0">
      <!-- //三级联动的可操作性，数据在父亲，应用在儿子身上 -->
      <CategorySelect @getCategoryId="getCategoryId" :isShow="!isShowTable"></CategorySelect>
    </el-card>

    <el-card>
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!this.category3Id ? true : false"
          @click="addAttr"
          >添加属性</el-button
        >
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
                style="margin: 5px 12px"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateAttr(row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>

        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrInfo.attrName"
          @click="attrValue"
          >添加属性值</el-button
        >
        <el-button @click="isShowTable = true">取消</el-button>

        <el-table
          style="width: 100%; margin: 20px 0"
          border
          :data="attrInfo.attrValueList"
        >
          <el-table-column
            align="center"
            type="index"
            label="序号"
            width="80"
          ></el-table-column>
          <el-table-column label="属性值名称" prop="prop">
            <template slot-scope="{ row, $index }">
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性名名称"
                size="mini"
                v-if="row.flag"
                :ref="$index"
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
              ></el-input>
              <span
                v-else
                @click="toEdit(row, $index)"
                style="display: block"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" prop="prop">
            <template slot-scope="{ row, $index }">
              <el-popconfirm
                :title="`确定删除${row.valueName}吗？`"
                @onConfirm="deleteAttrValue($index)"
                ><el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  slot="reference"
                ></el-button
              ></el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="addOrUpdateAttr" :disabled="attrInfo.attrValueList.length<1">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      attrInfoList: [],
      isShowTable: true,
      //收集新增或修改属性名称
      attrInfo: {
        attrName: "",
        attrValueList: [],
        categoryId: 0, //三级分类的id
        categoryLevel: 3,
      },
    };
  },
  methods: {
    getCategoryId(cForm) {
      const { category1Id, category2Id, category3Id } = cForm;
      console.log(cForm);
        this.category1Id = category1Id;
        this.category2Id = category2Id;
        this.category3Id = category3Id;
      this.getAttrInfoList()
      },
    async getAttrInfoList (){
      const { category1Id, category2Id, category3Id } = this;
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
    attrValue() {
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id, //相应属性名的id--新增属性的时候attrInfo.id为undefined，修改属性值新增的时候带相应属性的id
        valueName: "",
        flag: true, //此处用了push所以flag是响应式的，后面修改可以直接给flag赋值，如果不是这样的话，响应式修改要用$set
      });
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    deleteAttrValue(index) {
      this.attrInfo.attrValueList.splice(index, 1);
    },
    addAttr() {
      (this.isShowTable = false),
        (this.attrInfo = {
          attrName: "",
          attrValueList: [],
          categoryId: this.category3Id, //三级分类的id
          categoryLevel: 3,
        });
    },
    updateAttr(row) {
      this.isShowTable = false;
      this.attrInfo = cloneDeep(row);
      //在修改某一个属性的时候将相应的属性值元素添加上flag这个标志
      this.attrInfo.attrValueList.forEach((item) => {
        this.$set(item, "flag", false);
      });
    },
    //失去焦点
    toLook(row) {
      if (!row.valueName.trim()) {
        this.$message("不能输入为空");
        return;
      }
      let isRepeat = this.attrInfo.attrValueList.some((item) => {
        if (item != row) {
          return item.valueName == row.valueName;
        }
      });
      if (isRepeat) {
        return;
      }
      row.flag = false;
    },
    toEdit(row, $index) {
      row.flag = true;
      this.$nextTick(() => {
        this.$refs[$index].focus();
      });
    },
    async addOrUpdateAttr() {
      //整理参数1.不应该提交空数据给服务器，2提交给服务器的数据不应该出现flag字段，flag字段仅用于切换编辑和显示模式
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(
        (item) => {
          if (item.valueName != "") {
            //删除flag属性
            delete item.flag;
            return true;
          }
        }
      );
      //点击保存，发送请求
      try {
        let result = await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo);
        
          this.isShowTable=true
          this.$message({ type: "success", message: "保存成功" });
          //保存成功之后再次获取平台属性进行展示
          this.getAttrInfoList()
      } catch (error) {
        this.$message('保存失败')
        console.log(error);
      }
    },
  },
};
</script>
<style lang=""></style>
