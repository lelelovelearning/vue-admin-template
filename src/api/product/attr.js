import request from "@/utils/request"
//一级分类列表
export const reqCategory1List = ()=>request({url:'/admin/product/getCategory1',method:"get"})
//二级分类列表
export const reqCategory2List = (category1Id)=>request({url:`/admin/product/getCategory2/${category1Id}`,method:'get'})
//三级分类列表
export const reqCategory3List = (category2Id)=>request({url:`/admin/product/getCategory3/${category2Id}`,method:'get'})
//根据1 2 3 级分类获取数据
export const reqAttrInfoList=(category1Id,category2Id,category3Id)=>request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'get'})
//添加属性和属性值接口
export const reqAddOrUpdateAttr=(data)=>request({url:'/admin/product/saveAttrInfo',method:"post",data})  
