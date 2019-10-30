<template>
    <Modal v-model="flags" title="权限列表" @on-ok="handleOk()" @on-cancel="handleCancel()" width="750px">
        <Form :label-width="100">
            <Row :gutter="16">
                <Col span="12">
                    <FormItem label="角色名称">
                        <Input  placeholder="角色名称" v-model="roleName" disabled></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="数据权限">
                        <Select>
                            <Option :value="'查看本人'" :key="1">查看本人</Option>
                            <Option :value="'查看全部'" :key="2">查看全部</Option>
                        </Select>
                        
                    </FormItem>
                </Col>
            </Row> 
        </Form>
        <Table  max-height="400" class="roleTable"  :columns="columnsRole" :data="dataRole"></Table>
       
    </Modal>
</template>
<script>
import {getRolePermission} from "@/api/data"
import {modRolePermission} from "@/api/user"
export default {
    name:"roleManage",
    props:{
        roleName:String,
        roleId:String
    },
    data(){
        return{
           flags:false,
            dataPermission:0,
           columnsRole:[
               {title:"菜单",key:"menu"},
               {title:"查看权限",key:"read",render:(h,params)=>{
                   return h('Checkbox')
               }},
               {title:"修改权限",key:"change",render:(h,params)=>{
                   return h('Checkbox')
               }},
               {title:"审核权限",key:"decision",render:(h,params)=>{
                   return h('Checkbox')
               }},
           ],
           dataRole:[
            {menu:'公司运营'},
            {menu:'总经理会'},
            {menu:'合伙人会'},
            {menu:'股东会'}
           ]

         
        }
    },watch:{
        roleId(){

        }
    },
    methods:{
        getRolePermission(){
            getRolePermission({RoleId:this.roleId}).then(res=>{
                if(res.data.code==0){
                    console.log(res.data)
                    this.dataPermission=res.data.dataPermission;
                    // this.                    res.data.menuPermissionList
                }else{
                    this.$Message.error({
                        content:'角色信息请求失败：'+res.data.message
                    })
                }
            })
        },
        handleOk(){
            
        },
        handleCancel(){

        },
        showModel(flag){
            this.flags=flag;
        }
    }

}
</script>
<style lang="less" >
    .roleTable{
        .ivu-table-overflowX{
            overflow-x: hidden;
        }
    }
</style>