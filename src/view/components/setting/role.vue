
<template>
<!-- 人员管理-->
    <div class="role">
            <Row >
                <Col span="24" style="background:#fff;margin:15px 0;padding:15px 0;">
                    <Button type="primary" style="float:right;margin-right:20px;" @click="showRoleAdd()">新增</Button>
                </Col>
            </Row>
             <Card class="itemCard">
                <p slot="title">角色列表</p>
                <Table :loading="loading" :max-height='600' :columns="columns_mem" :data="data_mem"></Table>
                <Page style="margin-top:15px;" :total="pageTotal" :page-size-opts="[5,10,20,30]"  show-elevator show-sizer @on-page-size-change="changePageSize" @on-change="changePageIndex"/>
                <Row >
                    <Col span="24" style="background:#fff;margin:15px 0;padding:15px 0;">
                        <Button type="primary">导出</Button>
                    </Col>
                </Row>    
            </Card >
           
        <role-manage ref="roleManage"  :edictId="edictId" :roleName="roleName"></role-manage>
        <role-add @loadRole="getRoleList" ref="roleAdd"></role-add>   
           
            
    </div>
</template>
<script>
import {getRoleList} from "@/api/data"
import {delRole} from "@/api/user"
import roleManage from "@/view/components/template/role_manager"
import roleAdd from "@/view/components/template/role_add"
export default {
    components:{
        roleManage,
        roleAdd
    },
    data(){
        return{
            name:'',
            phone:'',
            loading:false,
            showAuth:false,
            pageTotal:0,
            PageIndex:1,
            PageSize:10,
            edictId:0,
            roleName:'',
            data_mem:[],
            columns_mem:[
                {title: '角色ID', align: 'center',key:'roleId'},
                {title: '角色名称', key: 'roleName'}, 
                {title: '操作', key: 'deal',render:(h,params)=>{
                    return h('div',[
                        h('span',{
                            style:{
                                color:'#3498db',
                                cursor:'pointer',
                                marginRight:'8px'
                            },on:{
                                click:()=>{
                                    this.edictId=params.row.roleId;
                                    this.roleName=params.row.roleName;
                                    this.showRoleManage();
                                    
                                }
                            }
                        },'编辑'),
                         h('span',{
                            style:{
                                color:'#ed4014',
                                cursor:'pointer'
                            },on:{
                                click:()=>{
                                     const title='删除角色';
                                     const content="是否删除"+params.row.roleName+"？" 
                                     this.$Modal.confirm({
                                         title:title,
                                         content:content,
                                         cancelText:'取消',
                                         onOk:()=>{
                                             this.deleteRole(params.row.roleId,params.index);
                                         }
                                     })
                                }
                            }
                        },'删除')
                    ])
                }},
            ],
        }
    },
    mounted(){
        this.getRoleList()
    },
    methods:{
       
        getRoleList(){
            this.loading=true;
            this.data_mem=[];
            getRoleList({PageIndex:this.PageIndex ,PageSize:this.PageSize}).then(res=>{
                this.loading=false;
                if(res.data.code==0){
                    this.pageTotal=res.data.pageSize*res.data.pageTotal;
                    res.data.roleList.forEach(element => {
                        this.data_mem.push({
                            roleId:element.roleId,
                            roleName:element.roleName
                        })
                    });
                }else{
                    this.$Message.error({
                        content:"角色数据加载失败："+res.data.message
                    })
                }
            })
        },
        deleteRole(id,index){
            delRole({RoleId:id}).then(res=>{
                if(res.data.code==0){
                    this.$Message.success({
                        content:'删除成功'
                    })
                    this.data_mem.splice(index,1)
                }else{
                     this.$Message.error({
                        content:'删除失败'
                    })
                }
            })
        },
        changePageSize(value){
            this.PageSize=value;
            this.getRoleList()
        },
        changePageIndex(value){
            this.PageIndex=value;
            this.getRoleList()
        },
        showRoleAdd(){
            this.$refs["roleAdd"].showModel(true)
        },
        showRoleManage(){
            this.$refs["roleManage"].showModel(true)

        }
    }
}
</script>
<style lang='less' scoped>
    .role{
        width: 100%;
        height:100%;
        .itemCard{
            margin-bottom: 20px;
        }
        
    }
</style>