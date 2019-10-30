 
<template>
<!-- 项目收入费用-->
    <div class="wage">
            <Card class="itemCard">
                <p slot="title">基本信息</p>
                <Form :label-width="80">
                    <Row>
                        <Col span="8">
                            <FormItem label="标题" prop="name">
                                <Input disabled v-model="postdata.TaskName" placeholder="请输入标题"></Input>
                            </FormItem>
                        </Col> 
                        <Col span="8">
                            <FormItem label="填写人" prop="name">
                                <Input  v-model="name" placeholder="请输入填写人"></Input>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="发放月份" prop="name">
                                <Input  v-model="mon" placeholder="请输入发放月份"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                   
                </Form>
            </Card>
            <Card class="itemCard">
                <p slot="title">人员列表</p>
                <p style="margin:10px 0;">
                    <Button type="primary" style="margin-right:8px;" @click="handleSubmit('formValidate')">导入</Button>
                    <Button type="primary" @click="handleSubmit('formValidate')">模板下载</Button>
                </p>
               

                <Table border ref="selection" :columns="wagecolumns" :data="wagedata"></Table>
                

                <p style="margin-top:20px;"><Button type="primary" @click="handleSubmit('formValidate')">导出</Button></p>
                
            </Card>
           
            <Card  class="itemCard">
                <p slot="title">请示信息</p>
                <Form :label-width="80">
                  
                    <FormItem label="具体内容" prop="TaskSummary">
                        <Input v-model="postdata.TaskSummary" type="textarea" :autosize="{minRows: 10,maxRows: 15}" placeholder="请输入事项的具体内容"></Input>
                    </FormItem>
                     <FormItem>
                        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                    </FormItem>
                </Form>   

            </Card>
    </div>
</template>
<script>
export default {
    data(){
        return{
            name:'',
            phone:'',
            wagecolumns:[
                {type: 'selection',width: 60, align: 'center'},
                {title: '姓名', align: 'center',key:'PayeeName'},
                {title: '基本工资', key: 'PayBase',render:(h,params)=>{
                    return h('div',[
                        h('Input',{
                            style:{
                                width:'100%'
                            },
                            props:{
                                value:params.row.Social_c
                            }
                        })
                    ])
                }},
                {title: '社保-个人', key: 'Social_e',render:(h,params)=>{
                    return h('div',[
                        h('Input',{
                            style:{
                                width:'100%'
                            },
                            props:{
                                value:params.row.Social_c
                            }
                        })
                    ])
                }},
                {title: '社保-单位', key: 'Social_c',render:(h,params)=>{
                    return h('div',[
                        h('Input',{
                            style:{
                                width:'100%'
                            },
                            props:{
                                value:params.row.Social_c
                            }
                        })
                    ])
                }},
                {title: '所得税', key: 'Tax',render:(h,params)=>{
                    return h('div',[
                        h('Input',{
                            style:{
                                width:'100%'
                            },
                            props:{
                                value:params.row.Social_c
                            }
                        })
                    ])
                }},
                {title: '考勤扣款', key: 'Absence',render:(h,params)=>{
                    return h('div',[
                        h('Input',{
                            style:{
                                width:'100%'
                            },
                            props:{
                                value:params.row.Social_c
                            }
                        })
                    ])
                }},
                {title: '实发工资', key: 'PayReal',render:(h,params)=>{
                    return h('div',[
                        h('Input',{
                            style:{
                                width:'100%'
                            },
                            props:{
                                value:params.row.Social_c
                            }
                        })
                    ])
                }},
                {title: '外勤费用', key: 'FieldCost',render:(h,params)=>{
                    return h('div',[
                        h('Input',{
                            style:{
                                width:'100%'
                            },
                            props:{
                                value:params.row.Social_c
                            }
                        })
                    ])
                }},
                {title: '现金工资', key: 'PayCash',render:(h,params)=>{
                    return h('div',[
                        h('Input',{
                            style:{
                                width:'100%'
                            },
                            props:{
                                value:params.row.Social_c
                            }
                        })
                    ])
                }},
                {title: '人力成本', key: 'PayHrcost',render:(h,params)=>{
                    return h('div',[
                        h('Input',{
                            style:{
                                width:'100%'
                            },
                            props:{
                                value:params.row.Social_c
                            }
                        })
                    ])
                }}
                

            ],
            wagedata:[
                {PayeeName:'合计',PayBase:0,Social_e:0,Social_c:0,Tax:0,Absence:0,PayReal:0,FieldCost:0,PayCash:0,PayHrcost:0}
            ],
            postdata:{
                TaskTypeId: '',
                TaskName: '',//任务名（UI中的报销单据要点）
                TaskSummary: '',//任务概要（UI中的备注）
                TaskOwner: '',//任务申请人ID，与User表的UserID对应，取自当前登录用户
                PayDetails: []
            },
            addDataDetail:[{
                ID: 0, //数据ID 0
                TaskID: 0, //任务ID 1
                PayMonth: '1970-01', //发放月份 2
                PayeeID: '', //发放对象ID，与User表的UserID对应 3
                PayeeName: '', //发放对象姓名，与User表的UserName对应 4
                PayBase: 0, //基本工资 5
                PayAttendance: 0, //考勤补贴 6
                Pension_e: 0, //养老保险（个人） 8
                Pension_c: 0, //养老保险（单位） 9
                Housing_e: 0, //住房公积金（个人） 10
                Housing_c: 0, //住房公积金（单位） 11
                Medical_e: 0, //医疗保险（个人） 12
                Medical_c: 0, //医疗保险（单位） 13
                Injury_e: 0, //工伤保险（个人） 14
                Injury_c: 0, //工伤保险（单位） 15
                Unemploy_e: 0, //失业保险（个人） 16
                Unemploy_c: 0, //失业保险（单位） 17
                Maternity_e: 0, //生育保险（个人） 18
                Maternity_c: 0, //生育保险（单位） 19
                Tax: 0, //所得税 20
                Absence: 0, //考勤扣款 21
                PayReal: 0, //实发工资 22
                FieldCost: 0, //外勤费用 23
                PayCash: 0, //现金工资 24
                PayHrcost: 0, //人力成本 7
                Remark: '' //备注 25
            }]
        }
    },
    mounted(){
        this.name=JSON.parse(localStorage.getItem('userName'));
        let date=new Date();
        let year=date.getFullYear();
        let mon=(date.getMonth()+1)>=10?(date.getMonth()+1):('0'+(date.getMonth()+1));
        this.mon=year+'-'+mon;
        this.postdata.TaskName=mon+'月工资发放单据'
    },
    methods:{
         
    }
}
</script>
<style lang='less' scoped>
    .wage{
        width: 100%;
        height:100%;
        .itemCard{
            margin-bottom: 20px;
        }
        
    }
</style>