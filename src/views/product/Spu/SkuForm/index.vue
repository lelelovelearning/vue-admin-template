<template lang="">
  <div>
    <el-form ref="form" label-width="100px">
      <el-form-item label="spu名称">{{spu.spuName}}</el-form-item>
      <el-form-item label="sku名称">
        <el-input placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格（元）">
        <el-input placeholder="价格（元）" type="number" v-model="skuInfo.price"></el-input>
      </el-form-item>
      <el-form-item label="重量（千克）">
        <el-input placeholder="重量（千克）" v-model="skuInfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input type="textarea" rows="4" v-model="skuInfo.skuDesc"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true" label-width="80px">
          <el-form-item :label="attr.attrName" v-for="(attr,index) in attrInfoList" :key="attr.id">
            <el-select placeholder="请选择" v-model="attr.attrIdAndValueId">
              <el-option :label="attrValue.valueName" :value="`${attr.id}:${attrValue.id}`" v-for="(attrValue,index) in attr.attrValueList" :key="attrValue.id"></el-option>
            </el-select>
          </el-form-item>
          
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true" label-width="80px">
          <el-form-item :label="saleAttr.saleAttrName " v-for="(saleAttr,index) in spuSaleAttrList" :key="saleAttr.id">
            <el-select placeholder="请选择" v-model="saleAttr.attrIdAndValueId">
              <el-option :value="`${saleAttr.id}:${saleAttrValue.id}`" :label="saleAttrValue.saleAttrValueName" v-for="(saleAttrValue,index) in saleAttr.spuSaleAttrValueList" :key="saleAttrValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table style="width: 100%" border @selection-change="handleSelectionChange" :data="spuImageList">
          <el-table-column
            type="selection"
            label=""
            width="80"
          ></el-table-column>
          <el-table-column label="图片">
            <template slot-scope="{row,$index}">
                <img :src="row.imgUrl" style="width:100px;height:100px">
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{row,$index}">
                <el-button type="primary" v-if="row.isDefault==0" @click="changeDefault(row)" size="mini">设置默认</el-button>
                <el-button v-else size="mini">默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="save">保存</el-button>
        <el-button size="mini" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "SkuForm",
  data() {
    return {
      //存储图片的信息
      spuImageList: [],
      //存储销售属性
      spuSaleAttrList: [],
      //平台属性
      attrInfoList: [],
      skuInfo: {
        //第一类收集的数据：父组件给的数据
        category3Id: 0,
        spuId: 0,
        tmId: 0,

        //第二类收集的数据：需要v-model双向数据绑定收集
        skuName: "",
        price: 0,
        weight: "",
        skuDesc: "",

        //第三类收集的数据：需要自己写代码
        skuImageList: [
        //   {
        //     id: 0,
        //     imgName: "string",
        //     imgUrl: "string",
        //     isDefault: "string",
        //     skuId: 0,
        //     spuImgId: 0,
        //   },
        ],
        //平台属性
        skuAttrValueList: [
        //   {
        //     attrId: 0,
        //     valueId: 0,
        //   },
        ],
        skuDefaultImg: "",
        skuSaleAttrValueList: [
        //   {
        //     id: 0,
        //     saleAttrId: 0,
        //     saleAttrName: "string",
        //     saleAttrValueId: 0,
        //     saleAttrValueName: "string",
        //     skuId: 0,
        //     spuId: 0,
        //   },
        ],
        
      },
      spu:{},
      //收集表格里选中的数据字段
      imageList:[]
    };
  },
  methods: {
    async getData(category1Id, category2Id, spu) {
        //收集父组件给的数据，3个
        this.skuInfo.category3Id=spu.category3Id
        this.skuInfo.spuId=spu.spuId
        this.skuInfo.tmId=spu.tmId
        this.spu=spu
      let result = await this.$API.sku.reqSpuImageList(spu.id);
      if (result.code == 200) {
        result.data.forEach(item=>{
            item.isDefault=0
        })
        this.spuImageList = result.data;
      }
      let result1 = await this.$API.sku.reqSpuSaleAttrList(spu.id);
      console.log(result1);
      if (result1.code == 200) {
        this.spuSaleAttrList = result1.data;
      }
      let result2 = await this.$API.sku.reqAttrInfoList(
        category1Id,
        category2Id,
        spu.category3Id
      );
      console.log(result2);
      if (result2.code == 200) {
        this.attrInfoList = result2.data;
      }
    },
    handleSelectionChange(params){
        //获取到用户选中图片的信息数据，但是当前收集的数据当中，缺少isDefault字段
        this.imageList=params

    },
    changeDefault(row){
        //排他操作 把除了点击设置默认的图片的isDefault设置为0，点击设置默认的图片的isDefault设置为1
        this.spuImageList.forEach(item=>{
            item.isDefault==0
        })
        //设置图片的isDefault为1，收集设置默认的图片到
        row.isDefault=1
        this.skuInfo.skuDefaultImg=row.imgUrl
    },
    cancel(){
        this.$emit('changeScenes',0)
        Object.assign(this._data,this.$options.data())
    },
    async save(){
        //整理数据
        const {attrInfoList,skuInfo,spuSaleAttrList,imageList}=this
      /*   方法一：遍历然后整理
      attrInfoList.forEach(item=>{
            //如果item的attrIdAndValueId--下拉框收集的属性
            if(item.attrIdAndValueId){
               const [attrId,valueId]= item.attrIdAndValueId.split(':')
               skuInfo.skuAttrValueList.push({attrId,valueId})
            }
        }) */
        //方法二：用数组的reduce方法
        skuInfo.skuAttrValueList=attrInfoList.reduce((prev,item)=>{
            if(item.attrIdAndValueId){
                const [attrId,valueId]=item.attrIdAndValueId.split(":")
                prev.push({attrId,valueId})
            }
            return prev
        },[])
        skuInfo.skuSaleAttrValueList=spuSaleAttrList.reduce((prev,item)=>{
         if(item.attrIdAndValueId){
            const [ saleAttrId,saleAttrValueId]=item.attrIdAndValueId.split(":")
            prev.push({saleAttrId,saleAttrValueId})
         }
         return prev
        },[])
        //勾选的图片收集到了imageList里面，但是不能直接赋值给skuInfo.skuImageList。
        //都是data里的数据不能直接赋值，容易undefined
        //先映射成一个新的数组，再赋值过去
        skuInfo.skuImageList=imageList.map(item=>{
            return{
                imgName:item.imgName,
                imgUrl:item.imgUrl,
                isDefault:item.isDefault,
                spiImageId:item.id
            }
        })
        //发请求带给服务器
        let result=await this.$API.sku.reqAddSku(skuInfo)
        if(result.code==200){
            this.$message({type:"success",message:"保存成功"})
            this.$emit('changeScenes',0)
        }
    }
  },
};
</script>
<style lang=""></style>
