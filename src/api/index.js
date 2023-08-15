//将四个模块请求的接口函数统一暴露
import *as tradeMark from '@/api/product/tradeMark'
import *as attr from '@/api/product/attr'
import *as sku from '@/api/product/sku'
import *as spu from '@/api/product/spu'
import *as user from '@/api/acl/user'
import role from '@/api/acl/role'
import permission from '@/api/acl/permission'
//统一暴露 然后挂在vue原型上，任何组件都能使用，类似于$bus全局事件总线
export default{tradeMark,attr,sku,spu,user,role,permission}