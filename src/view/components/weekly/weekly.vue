<template>
    <div class="weekly">
        <Card class="itemCard">
           <p slot="title">基本信息</p>
           <Form :label-width="100">
               <Row>
                   <Col :span="8">
                        <FormItem label="标题">
                             <Input  placeholder="请输入周报标题"></Input>
                        </FormItem>
                   </Col>
                  
               </Row>
                <Row>
                   <Col :span="8">
                        <FormItem label="填写人">
                             <Input  placeholder="请输入填写人"></Input>
                        </FormItem>
                   </Col>
                   <Col :span="8">
                        <FormItem label="级别">
                             <Input  placeholder="请输入级别"></Input>
                        </FormItem>
                   </Col>
                   <Col :span="8">
                        <FormItem label="周报期间">
                             <Input  placeholder="请输入周报期间"></Input>
                        </FormItem>
                   </Col>
               </Row>
            </Form>  
        </Card>
        
        <Card  class="itemCard">
            <p slot="title">本周工作</p>
            <Form :label-width="100">
                    <FormItem label="本周工作">
                            <Input  placeholder="请输入本周工作" type="textarea" :autosize="{minRows:5,maxRows: 15}"></Input>
                    </FormItem>
            </Form>  
        </Card> 
        <Card  class="itemCard">
            <p slot="title">下周工作</p>
            <Form :label-width="100">
                    <FormItem label="下周工作">
                            <Input  placeholder="请输入下周工作" type="textarea" :autosize="{minRows:5,maxRows: 15}"></Input>
                </FormItem>
            </Form>  
        </Card> 
         <Card  class="itemCard">
            <p slot="title">工时填报</p>
            
            <Table stripe :columns="columnsWork" :data="dataWork"></Table>
            <Form  style="margin-top:20px;">
                 <FormItem>
                    <Button type="success" style="margin-right:8px;" @click="addNewLine()">新增</Button>
                                  
                </FormItem>
            </Form>
             <Form  style="margin-top:20px;">
                 <FormItem>
                    <Button type="primary" style="margin-right:8px;">提交</Button>
                    <Button type="default">存为草稿</Button> 
                </FormItem>
            </Form>
        </Card> 




           
           
           
       
    </div>
</template>
<script>
export default {
    data (){
        return{
            columnsWork:[
                {title:"工作事项",key:"thing",render:(h,params)=>{
                    if(params.row.thing=="合计"){
                        return h('div',[
                            h('span',{
                                style:{
                                    color:"#2b85e4"
                                }
                            },'合计')
                        ])
                    }else{
                        return h('div',[
                            h('Input',{
                                props:{
                                    value:params.row.thing
                                }
                            })
                        ])
                    }
                  
                }},
                {title:"周一",key:"mon",render:(h,params)=>{
                    return h('div',[
                        h('Input')
                    ])
                }},
                {title:"周二",key:"tue",render:(h,params)=>{
                    return h('div',[
                        h('Input')
                    ])
                }},
                {title:"周三",key:"wed",render:(h,params)=>{
                    return h('div',[
                        h('Input')
                    ])
                }},
                {title:"周四",key:"thu",render:(h,params)=>{
                    return h('div',[
                        h('Input')
                    ])
                }},
                {title:"周五",key:"fri",render:(h,params)=>{
                    return h('div',[
                        h('Input')
                    ])
                }},
                {title:"周六",key:"sat",render:(h,params)=>{
                    return h('div',[
                        h('Input')
                    ])
                }},
                {title:"周日",key:"sun",render:(h,params)=>{
                    return h('div',[
                        h('Input')
                    ])
                }},
                {title:"合计",key:"all",render:(h,params)=>{
                    return h('div',[
                        h('Input')
                    ])
                }},
                {title:"工时费用",key:"cost",render:(h,params)=>{
                    return h('div',[
                        h('Input')
                    ])
                }},

                {title:"客户简称",key:"custom",render:(h,params)=>{
                    return h('Select',{
                        
                    },[
                        h('Option',{
                            props: {
                                value: '1'
                            }
                        },'option1'),
                        h('Option',{
                            props: {
                                value: '2'
                            }
                        },'option2')
                    ]
                    )}
                },

                {title:"操作",key:"deal",render:(h,params)=>{
                    return h('div',[
                        h('span',{
                            style:{
                                color:"#ed4014",
                                cursor:"pointer"
                            }
                        },'删除')
                    ])
                }},
            ],
            dataWork:[
                
                {thing:"合计",mon:"",tue:"",wed:"",thu:"",fri:"",sat:"",sun:"",all:"",cost:""}
            ]
        }
    },methods:{
        addNewLine(){
            this.dataWork.shift(
                {thing:"",mon:"",tue:"",wed:"",thu:"",fri:"",sat:"",sun:"",all:"",cost:""}
            )
        }
    }
}
</script>
<style lang="less" scoped>
    .weekly{
        width: 100%;
        height: 100%;
        .ivu-table-wrapper{
            overflow: visible;
        }
        .itemCard{
            margin-bottom: 25px;

        }
    }
</style>