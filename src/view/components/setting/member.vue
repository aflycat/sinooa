 
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
                <Table :columns="columns_mem" :data="data_mem" class="memTable"></Table>
                 <Row >
                    <Col span="24" style="background:#fff;margin:15px 0;padding:15px 0;">
                        <Button type="primary">导出</Button>
                    </Col>
                </Row>    
            </Card >       
         <mem-basic ref="memBasic"></mem-basic>


    </div>
</template>
<script>
import {getuserList,deleteUser} from "@/api/data"
import memBasic from "@/view/components/template/mem_basic"
export default {
    components:{
        memBasic
    },
    data(){
        return{
            name:'',
            phone:'',
            data_mem:[
                {user:0,username:"祝福",dep:"运营",sedep:"前端",phone:"17620455702",states:"正常"},
                {user:0,username:"祝福",dep:"运营",sedep:"前端",phone:"17620455702",states:"冻结"},
                {user:0,username:"祝福",dep:"运营",sedep:"前端",phone:"17620455702",states:"未审批"}
            ],
            columns_mem:[
                {type: 'selection',width: 60, align: 'center'},
                {title: '姓名', align: 'center',key:'user'},
                {title: '登录账号', key: 'username'},
                {title: '部门', key: 'dep'},
                {title: '邮箱', key: 'sedep'},
                {title: '电话', key: 'phone'},
                {title: '用户状态', key: 'states', filters:[
                        {
                            label: '正常',
                            value: '正常'
                        },
                        {
                            label: '未审批',
                            value: '未审批'
                        },
                        {
                            label: '冻结',
                            value: '冻结'
                        }
                    ],
                    filterMultiple: true,
                    filterMethod (value, row) {
                        console.log(value)  
                         return row.states.indexOf(value) > -1;
                    },
                    render:(h,params)=>{
                        if(params.row.states=="正常"){
                            return h('span',{
                                style:{
                                    color:'#2d8cf0'
                                }
                            },'正常')
                        }else if(params.row.states=="未审批"){
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
                                        console.log(params)

                                    }
                                }
                            },'编辑' ),
                            h('DropdownItem',{
                                nativeOn:{
                                    'click':(name)=>{
                                        console.log(params)

                                    }
                                }
                            },'重置密码'),
                            h('DropdownItem',{
                                style:{
                                    color:'rgb(237, 64, 20)'
                                },
                                nativeOn:{
                                    'click':(name)=>{
                                        console.log(params)

                                    }
                                }
                            },'删除')
                        ])
                    ])

                       

                    // return h('div',[
                    //     h('span',{
                    //         style:{
                    //             color:'#3498db',
                    //             cursor:'pointer',
                    //             marginRight:'8px'

                    //         }
                    //     },'编辑'),
                    //      h('span',{
                    //         style:{
                    //             color:'#5cadff',
                    //             cursor:'pointer',
                    //             marginRight:'8px'

                    //         },on:{
                    //             click:()=>{
                    //                 const title = '重置密码';
                    //                 const content = '<p>确定重置当前账号的密码？</p>';   
                    //                 this.$Modal.warning({
                    //                     title: title,
                    //                     content: content,
                    //                     onOk(){
                    //                         console.log('确定')
                    //                     }
                    //                 });
                    //             }
                    //         }
                    //     },'重置密码'),
                    //      h('span',{
                    //         style:{
                    //             color:'#ed4014',
                    //             cursor:'pointer'
                    //         },on:{
                    //             click:()=>{
                    //                 const title = '删除账号';
                    //                 const content = '<p>确定删除当前账号？</p>';   
                    //                 this.$Modal.warning({
                    //                     title: title,
                    //                     content: content,
                    //                     onOk(){
                    //                         console.log('确定')
                    //                     }
                    //                 });
                    //             }
                    //         }
                    //     },'删除')
                    // ])
                }},
              

            ],
           
            
        }
    },
    methods:{
         filterMethod (value, option) {
             console.log(value,option)
                return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
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