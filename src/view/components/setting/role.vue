
<template>
<!-- 人员管理-->
    <div class="role">
            <Row >
                <Col span="24" style="background:#fff;margin:15px 0;padding:15px 0;">
                    <Button type="primary" style="float:right;margin-right:20px;" @click="showRole()">新增</Button>
                </Col>
            </Row>
             <Card class="itemCard">
                <p slot="title">角色列表</p>
                <Table :columns="columns_mem" :data="data_mem"></Table>
                 <Row >
                    <Col span="24" style="background:#fff;margin:15px 0;padding:15px 0;">
                        <Button type="primary">导出</Button>
                    </Col>
                </Row>    
            </Card >
           
        <role-manage ref="roleManage"></role-manage>
           
           
            
    </div>
</template>
<script>
import roleManage from "@/view/components/template/role_manager"
export default {
    components:{
        roleManage
    },
   
    data(){
        return{
            name:'',
            phone:'',
            data_mem:[
                {id:0,name:"祝福",admin:"查看本人"},
                {id:1,name:"祝福",admin:"全部数据"},
                {id:2,name:"祝福",admin:"查看本人"}
            ],
            columns_mem:[
                {type: 'selection',width: 60, align: 'center'},
                {title: '角色ID', align: 'center',key:'id'},
                {title: '角色名称', key: 'name'},
                {title: '数据权限', key: 'admin'}, 
                {title: '操作', key: 'deal',render:(h,params)=>{
                    // const that=this;
                    return h('div',[
                        h('span',{
                            style:{
                                color:'#3498db',
                                cursor:'pointer',
                                marginRight:'8px'
                            },on:{
                                click:()=>{
                                    this.showRole()
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
                                     const content="是否删除当前角色？" 
                                     this.$Modal.warning({
                                         title:title,
                                         content:content,
                                         onOk(){
                                             console.log(params)
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
    methods:{
         filterMethod (value, option) {
             console.log(value,option)
                return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
            },
            showRole(){
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