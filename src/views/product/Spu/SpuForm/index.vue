<template lang="">
  <div>
    <el-form ref="form" label-width="80px" :model="spu">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <!-- value是以后要收集的数据，收集数据的id -->
          <el-option
            :label="item.tmName"
            :value="item.id"
            v-for="(item, index) in TradeMarkList"
            :key="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          rows="3"
          placeholder="SPU描述"
          v-model="spu.description"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          action="dev-api/admin/product/upload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="spuImageList"
          :on-success="handlerSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select
          :placeholder="`还有${unSelectSaleAttr.length}项未选择`"
          v-model="attrIdAndAttrName"
        >
          <el-option
            :label="unSelect.name"
            :value="`${unSelect.id}:${unSelect.name}`"
            v-for="(unSelect, index) in unSelectSaleAttr"
            :key="unSelect.id"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrIdAndAttrName"
          @click="addSaleAttr"
          >添加销售属性</el-button
        >
        <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
          <el-table-column
            type="index"
            label="序号"
            width="80px"
          ></el-table-column>
          <el-table-column label="属性名" prop="saleAttrName"></el-table-column>
          <el-table-column label="属性值名称列表">
            <template slot-scope="{ row, $index }">
              <el-tag
                :key="tag.id"
                v-for="(tag, index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index, 1)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @blur="handleInputConfirm(row)"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="addSaleAttrValue(row)"
                >添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{ row, $index }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="spu.spuSaleAttrList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "SpuForm",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      attrIdAndAttrName: "",
      spu: {
        category3Id: 0,
        description: "",
        id: undefined,
        spuImageList: [],
        spuName: "",
        spuSaleAttrList: [],
        tmId: 0,
      },
      TradeMarkList: [],
      spuImageList: [],
      baseSaleAttrList: [],
    };
  },
  methods: {
    //照片墙删除图片的时候触发，需要收集数据
    handleRemove(file, fileList) {
      //file删除的图片，fileList剩余的图片
      //对于已有的图片【已经显示的图片，有name、url字段】对于服务器来说不需要这两个字段
      this.spuImageList = fileList;
    },
    //照片墙图片预览，对话框显示--不需要收集数据
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handlerSuccess(response, file, fileList) {
      this.spuImageList = fileList;
    },
    async initSpuData(spu) {
      //获取spu信息的接口（id）
      let spuResult = await this.$API.spu.reqSpu(spu.id);
      if (spuResult.code == 200) {
        this.spu = spuResult.data;
      }
      //获取品牌的信息
      let TradeMarkResult = await this.$API.spu.reqTradeMarkList();
      if (TradeMarkResult.code == 200) {
        this.TradeMarkList = TradeMarkResult.data;
      }
      //获取图片的数据
      let spuImageResult = await this.$API.spu.reqSpuImageList(spu.id);
      if (spuImageResult.code == 200) {
        let listArr = spuImageResult.data;
        listArr.forEach((item) => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        this.spuImageList = listArr;
      }
      //平台全部销售属性
      let baseSaleAttrResult = await this.$API.spu.reqBaseSaleAttrList();
      if (baseSaleAttrResult.code == 200) {
        this.baseSaleAttrList = baseSaleAttrResult.data;
      }
    },
    addSaleAttr() {
      //把收集到销售属性数据进行分割
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndAttrName.split(":");
      let newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      };
      this.spu.spuSaleAttrList.push(newSaleAttr);
      this.attrIdAndAttrName = "";
    },
    addSaleAttrValue(row) {
      this.$set(row, "inputVisible", true);
      this.$set(row, "inputValue", "");
    },
    handleInputConfirm(row) {
      const { baseSaleAttrId, inputValue } = row;
      if (inputValue.trim() == "") {
        this.$message("属性值不能为空");
        return;
      }
      let result = row.spuSaleAttrValueList.every(
        (item) => item.saleAttrValueName != inputValue
      );
      if (!result) return;
      row.inputVisible = false;
      let newSaleAttrValue = { baseSaleAttrId, saleAttrValueName: inputValue };
      row.spuSaleAttrValueList.push(newSaleAttrValue);
    },
    async addOrUpdateSpu() {
      //整理参数，整理照片墙的参数，对于图片需要携带imageName和imageUrl字段
      this.spu.spuImageList = this.spuImageList.map((item) => {
        return {
          imageName: item.name,
          imageUrl: (item.response && item.response.data) || item.url,
        };
      });
      let result = await this.$API.spu.reqAddOrUpdateSpu(this.spu);
      if (result.code == 200) {
        this.$message({ type: "success", message: "保存成功" });
        this.$emit("changeScene", {scene:0,flag:this.spu.id?'添加':'修改'});
      }
      Object.assign(this._data,this.$options.data())
    },
    async addSpuData(category3Id) {
      this.spu.category3Id=category3Id
      let TradeMarkResult = await this.$API.spu.reqTradeMarkList();
      if (TradeMarkResult.code == 200) {
        this.TradeMarkList = TradeMarkResult.data;
      }
      let baseSaleAttrResult = await this.$API.spu.reqBaseSaleAttrList();
      if (baseSaleAttrResult.code == 200) {
        this.baseSaleAttrList = baseSaleAttrResult.data;
      }
    },
    cancel(){
      this.$emit('changeScene',{scene:0,flag:''})
      Object.assign(this._data,this.$options.data())
    }
  },
  computed: {
    unSelectSaleAttr() {
      return this.baseSaleAttrList.filter((item) => {
        return this.spu.spuSaleAttrList.every((item1) => {
          return item.name != item1.saleAttrName;
        });
      });
    },
  },
};
</script>
<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
