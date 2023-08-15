import request from "@/utils/request";
export const reqSpuImageList=(spuId)=>request({url:`/admin/product/spuImageList/${spuId}`,method:'get'})
export const reqSpuSaleAttrList=(spuId)=>request({url:`/admin/product/spuSaleAttrList/${spuId}`,method:'get'})
export const reqAttrInfoList=(category1Id,category2Id,category3Id)=>request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'get'})
//添加sku
export const reqAddSku=(skuInfo)=>request({url:'/admin/product/saveSkuInfo',method:'post',data:skuInfo})
///admin/product/findBySpuId/{spuId}
export const reqSkuList=(spuId)=>request({url:`/admin/product/findBySpuId/${spuId}`,method:'get'})
/*--------上面用在spu模块的sku数据------------下面用在sku模块的数据--------------------------  */
///admin/product/list/{page}/{limit}
export const reqSkuList1=(page,limit)=>request({url:`/admin/product/list/${page}/${limit}`,method:'get'})
///admin/product/cancelSale/{skuId}    /admin/product/onSale/{skuId}
export const reqSale=(skuId)=>request({url:`/admin/product/onSale/${skuId}`,method:'get'})
export const reqCancelSale=(skuId)=>request({url:`/admin/product/cancelSale/${skuId}`,method:'get'})
///admin/product/getSkuById/{skuId}
export const reqSkuById=(skuId)=>request({url:`/admin/product/getSkuById/${skuId}`,method:'get'})
