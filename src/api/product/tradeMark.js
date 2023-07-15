import request from '@/utils/request'
export const reqTradeMark=(page,limit)=>request({url:`/admin/product/baseTrademark/${page}/${limit}`,method:"get"})
//添加或修改品牌
export const reqAddOrUpdateTradeMark=(tradeMark)=>{
    if(tradeMark.id){
        //有id是修改，put是修改
        return request({url:'/admin/product/baseTrademark/update',method:'put',data:tradeMark})
    }else{
        //没有id是新增，post
      return request({url:'/admin/product/baseTrademark/save',method:"post",data:tradeMark})
    }
}
export const reqDeleteTradeMark=(id)=>request({
    url:`/admin/product/baseTrademark/remove/${id}`,
    method:'DELETE'    
})