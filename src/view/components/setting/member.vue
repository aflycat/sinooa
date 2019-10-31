 
<template>
<!-- 人员管理-->
    <div class="member">
            <Row >
                <Col span="24" style="background:#fff;margin:15px 0;padding:15px 0;">
                    <Button type="primary" style="float:right;margin-right:20px;" @click="showMemberModal()">新增</Button>
                </Col>
            </Row>
             <Card class="itemCard">
                <p slot="title">人员列表</p>
                <Table :loading="loading" :columns="columns_mem" :data="data_mem"  class="memTable"></Table>
                 <Page style="margin-top:15px;" :page-size-opts="[5,10,20,30]" :total="pageTotal" @on-change="changePage" @on-page-size-change="changePageSise" show-elevator show-sizer />
                 <Row >
                    <Col span="24" style="background:#fff;margin:15px 0;padding:15px 0;">
                        <Button type="primary">导出</Button>
                    </Col>
                </Row>    
            </Card >       
         <mem-basic :userId="userId" ref="memBasic"></mem-basic>
         <Modal v-model="passWmodal" title="重置密码" @on-ok="changePass">
             <Form :label-width="80">
                    <FormItem label="密码">
                        <Input v-model="passWord" placeholder="请输入密码"></Input>
                    </FormItem>
            </Form>
         </Modal>



    </div>
</template>
<script>
import {getuserList} from "@/api/data"
import {deleteUser,modPassword} from "@/api/user"

import memBasic from "@/view/components/template/mem_basic"
export default {
    components:{
        memBasic
    },
    data(){
        return{
            name:'',
            phone:'',
            data_mem:[ ],
            userId:'',
            columns_mem:[
                {type: 'selection',width: 60, align: 'center'},
                {title: '姓名', align: 'center',key:'userName'},
                {title: '登录账号', key: 'loginId'},
                {title: '部门', key: 'departmentName'},
                {title: '邮箱', key: 'email'},
                {title: '电话', key: 'phone'},
                {title: '用户状态', key: 'status', filters:[
                        {label: '正常', value: '1'},
                        {label: '未审批', value: '0' },
                        {label: '冻结', value: '-1'}
                    ],
                    filterMultiple: true,
                    filterMethod (value, row) {
                        return row.status==parseInt(value);
                    },
                    render:(h,params)=>{
                        if(params.row.status=='1'){
                            return h('span',{
                                style:{
                                    color:'#2d8cf0'
                                }
                            },'正常')
                        }else if(params.row.status=="0"){
                             return h('span',{
                                style:{
                                    color:'#ff9900'
                                }
                            },'未审批')
                        }else{
                             return h('span',{
                                style:{
                                    color:'#ed4014'
                                }
                            },'冻结')
                        }
                    }
                },
                {title: '操作', key: 'deal',render:(h,params)=>{
                    return h('Dropdown',{
                       
                    },[
                        h('a','更多'),
                        h('Icon',{
                                props:{
                                    type:'ios-arrow-down'
                                },
                                style:{
                                    color:"#2D8cF0",
                                    marginLeft:'5px'
                                }
                            }),
                        h('DropdownMenu',{
                            slot:"list",
                            
                            },[
                            h('DropdownItem',{
                                nativeOn:{
                                    'click':(name)=>{
                                        console.log(params.row.userId)

                                    }
                                }
                            },'编辑' ),
                            h('DropdownItem',{
                                nativeOn:{
                                    'click':(name)=>{
                                        // console.log(params)
                                        this.userId=params.row.userId;
                                        this.passWmodal=true;
                                    }
                                }
                            },'重置密码'),
                            h('DropdownItem',{
                                style:{
                                    color:'rgb(237, 64, 20)'
                                },
                                nativeOn:{
                                    'click':()=>{
                                        this.$Modal.confirm({
                                            title:'删除',
                                            content:"确定删除用户"+params.row.userName+"?",
                                            cancelText:'取消',
                                            okText:'确定',
                                            onOk:()=>{
                                                this.deleteUsers(params.row.userId,params.index)
                                            }
                                        })

                                    }
                                }
                            },'删除')
                        ])
                    ])
                }},
              

            ],
            PageIndex:1,
            PageSize:10,
            pageTotal:0,
            loading:true,
            passWmodal:false,
            passWord:''
            
        }
    },
    mounted(){
        this.getUserList()
    },
   
    methods:{
        getUserList(){
            this.data_mem=[];
            getuserList({PageIndex:this.PageIndex,PageSize:this.PageSize}).then(res=>{
                if(res.data.code==0){
                    this.pageTotal=this.PageSize*res.data.pageTotal;
                    res.data.userList.forEach(element => {
                        this.data_mem.push({
                            userName:element.userName,
                            loginId:element.loginId,
                            departmentName:element.departmentName,
                            email:element.email,
                            phone:element.phone,
                            status: element.status,
                            userId:element.userId
                        })
                    });
                }else{
                    this.$Message.error({
                        content:'人员列表数据加载失败：'+res.data.message
                    })
                }
                this.loading=false;
            })  
        },
        deleteUsers(userId,index){
            deleteUser({UserId:userId}).then(res=>{
                if(res.data.code==0){
                    this.$Notice.success({
                        title:'用户删除成功'
                    })
                    this.data_mem.splice(index,1)
                }else{
                    this.$Message.error({
                        content:'用户删除失败：'+res.data.message
                    })
                }
            })
        },
        changePass(){
            modPassword({
                UserId:this.userId,
                OldPassword:'',
                NewPassword:this.passWord
            }).then(res=>{
                console.log(res)
            })
        },
        changePage(value){
            this.PageIndex=value;
            console.log(value)
           this.getUserList()
        },
        changePageSise(value){
            this.PageSize=value;
            this.getUserList()
        },
        showMemberModal(){
            this.$refs["memBasic"].showModel(true)
        }
    }
}
</script>
<style lang='less' scope>
    .member{
        width: 100%;
        height:100%;
        .itemCard{
            margin-bottom: 20px;
             .ivu-table-wrapper{
                overflow: visible;
            }
        }

        
    }
</style>