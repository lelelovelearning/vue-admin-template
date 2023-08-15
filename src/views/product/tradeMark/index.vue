<template lang="">
  <div>
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0" @click="showDialog"
      >添加</el-button
    >
    <el-table style="width: 100%" border :data="list"> 
      <el-table-column
        label="序号"
        width="80px"
        align="center"
        type="index"
      ></el-table-column>
      <el-table-column
        label="品牌名称"
        width="width"
        prop="tmName"
      ></el-table-column>
      <el-table-column label="品牌logo" width="width">
        <template slot-scope="{ row, $index }">
          <img :src="row.logoUrl" alt="" style="width: 100px; heiget: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="width">
        <template slot-scope="{row,$index}">
            <el-button type="warning" icon="el-icon-edit" size="mini" round  @click="updateTradeMark(row)"
          >修改</el-button
        >
        <el-button type="danger" icon="el-icon-delete" size="mini" round @click="deleteTradeMark(row)"
          >删除</el-button
        > 
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="page"
      :page-sizes="[10, 20, 50]"
      :page-size="limit"
      layout="prev,pager,next,jumper,->,total,sizes"
      :total="total"
      style="margin-top: 20px; textAlign: center"
      @current-change="getPageList"
      @size-change="changePageSize"
    ></el-pagination>

    <el-dialog :title="tmForm.id?'修改品牌':'添加品牌'" :visible.sync="dialogFormVisible"  >
        <!-- form表单 ：model属性 这个属性的作用是把数据收集到一个对象的身上 表单验证时也需要这个参数 -->
      <el-form style="width:80%" :model="tmForm" ref="ruleForm" :rules="rules">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tmForm.tmName" ></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
            <el-upload
          class="avatar-uploader"
          action="dev-api/admin/product/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark"
          >确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "tradeMark",
  data() {
    return {
      //当前分页器第几页
      page: 1,
      limit: 3,
      total: 0,
      //当前页的数据
      list: [],
      dialogFormVisible: false,
      //表单收集的数据名tmName和logoUrl要和后台一致
      tmForm:{
        tmName:'',
        logoUrl :''
      },
      rules:{
        tmName: [
            { required: true, message: '请输入品牌名称', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符' , trigger: 'change' }
          ],
          logoUrl: [
            { required: true, message: '请选择图片' }
          ],
      }
    };
  },
  mounted() {
    this.getPageList();
  },
  methods: {
    async getPageList(pager = 1) {
      this.page = pager;
      const { page, limit } = this;
      let result = await this.$API.tradeMark.reqTradeMark(page, limit);
      if (result.code == 200) {
        this.total = result.data.total;
        this.list = result.data.records;
      }
    },
    showDialog(){
        this.dialogFormVisible=true
        this.tmForm={tmName:'',logoUrl:''}
       //对话框打开清除表单验证 
        this.$nextTick(()=>{
            this.$refs.ruleForm.clearValidate()
        }
        )
        
    },
    changePageSize(limit) {
      this.limit = limit;
      this.getPageList();
    },
    //图片上传成功
    handleAvatarSuccess(res, file) {
        // this.imageUrl = URL.createObjectURL(file.raw);
        //res.data是图片上传后在服务器上的真实地址
        this.tmForm.logoUrl=res.data
        
        //validateField对表单部分字段进行校验
        this.$refs.ruleForm.validateField('logoUrl')
      },
    //图片上传之前
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
       addOrUpdateTradeMark(){
        this.$refs["ruleForm"].validate(async (valid) => {
          if (valid) {
            this.dialogFormVisible = false
            let result= await this.$API.tradeMark.reqAddOrUpdateTradeMark(this.tmForm)
        if(result.code==200){
            this.$message(this.tmForm.id?{message:'修改品牌成功'}:{message:'添加品牌成功',type:'success'})
            this.getPageList(this.tmForm.id?this.page:1)
        }else{
            this.$message.error({message:this.tmForm.id?'修改品牌失败':'添加品牌失败'});
        }
          } else {
            return false;
          }
        });
       
      },
      updateTradeMark(row){
        this.dialogFormVisible=true
        this.tmForm={...row}
      },
      deleteTradeMark(row){
        this.$confirm(`您确定删除${row.tmName}吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).then(async() => {
        let result=await this.$API.tradeMark.reqDeleteTradeMark(row.id)
        if(result.code==200){
            this.$message({
            type: 'success',
            message: '删除成功!'
          });
          //停留在当前页没错，但是当前页如果没数据的话应该去上一页
            this.getPageList(this.list.length>1?this.page:this.page-1)
        }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    }
  
};
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }</style>
