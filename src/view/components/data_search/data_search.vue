<template>
<!-- 附件查询 -->
    <div class="data_search">
        <Card  class="itemCard">
            <P slot="title">任务搜索</P>
           
             <Row type="flex" justify="center" >
                <Col span="12">
                     <Form :label-width="120">
                            
                            <FormItem label="关键字">
                               <Input  placeholder="请输入关键字"  />
                            </FormItem>
                    </Form>
                  
                </Col>
               
            </Row>
           
             <Row type="flex" justify="center" >
                <Col span="12">
                    <Form :label-width="120">
                            <FormItem label="起止时间">
                                 <Row>
                                    <Col span="11">
                                        <DatePicker type="date" placeholder="开始时间" ></DatePicker>
                                    </Col>
                                    <Col span="2" style="text-align: center">-</Col>
                                    <Col span="11">
                                        <DatePicker type="date" placeholder="结束时间" ></DatePicker>
                                    </Col>
                                </Row>
                            </FormItem>
                    </Form>
                </Col>
            </Row>
              <Row type="flex" justify="center" >
                <Col span="12">
                    <Form :label-width="120">
                            <FormItem >
                                <Button type="primary">查询</Button>
                            </FormItem>
                    </Form>
                </Col>
               
            </Row>


        </Card>
        <Card  class="itemCard">
            <P slot="title">搜索结果</P>
            </Row>
                 <Form class="search_item" :label-width="80">
                    <FormItem  label="技术支持:">
                        </Row :gutter="16">
                            <Col :span="4"><Button type="text">基本法律法规</Button></Col>
                             <Col :span="4"><Button type="text">基本市场数据</Button></Col>
                          <Col :span="4"><Button type="text">专题研究资料</Button></Col>
                             <Col :span="4"><Button type="text">其他技术资料</Button></Col>     
                        </Row>
                    </FormItem>
                    <FormItem  label="技术支持:">
                        </Row :gutter="16">
                            <Col :span="3"><Button type="text">项目建议</Button></Col>
                            <Col :span="3"><Button type="text">服务方案</Button></Col>
                            <Col :span="3"><Button type="text">尽职调查</Button></Col>
                            <Col :span="3"><Button type="text">工作备忘</Button></Col> 
                            <Col :span="3"><Button type="text">流程控制</Button></Col>
                            <Col :span="3"><Button type="text">协议模档</Button></Col>
                            <Col :span="3"><Button type="text">业务手册</Button></Col>
                            <Col :span="3"><Button type="text">其他模档</Button></Col>
                            
                            
                        </Row>
                        
                    </FormItem>
                </Form>
            </Row>
            



            <Table max-height="500" stripe  :columns="columnsTask" :data="dataTask"></Table>

             <Page style="margin-top:20px;" :total="100"  show-elevator show-sizer />
        </Card>
    </div>
</template>
<script>
export default {
    data () {
            return {
                
                columnsTask:[
                    {title:'编号',key:'code'},
                    {title:'名称',key:'task'},
                    {title:'查看任务',key:'man'},
                    {title:'操作',key:'deal',render:(h,params)=>{
                        return h('span',{style:{color:"#3498db"}},"查看详情")
                        }
                    },

                ],
                dataTask:[
                    {code:"7895211",task:"测试任务.gif",man:"祝福"},
                    {code:"7895211",task:"测试任务.gif",man:"祝福"},
                    {code:"7895211",task:"测试任务.gif",man:"祝福"},
                    {code:"7895211",task:"测试任务.gif",man:"祝福"},
                    {code:"7895211",task:"测试任务.gif",man:"祝福"},
                    {code:"7895211",task:"测试任务.gif",man:"祝福"},
                     {code:"7895211",task:"测试任务.gif",man:"祝福"},
                    {code:"7895211",task:"测试任务.gif",man:"祝福"},
                    {code:"7895211",task:"测试任务.gif",man:"祝福"},
                    {code:"7895211",task:"测试任务.gif",man:"祝福"},
                    {code:"7895211",task:"测试任务.gif",man:"祝福"},
                    {code:"7895211",task:"测试任务.gif",man:"祝福"},
                     {code:"7895211",task:"测试任务.gif",man:"祝福"},
                    {code:"7895211",task:"测试任务.gif",man:"祝福"},
                    {code:"7895211",task:"测试任务.gif",man:"祝福"},
                    {code:"7895211",task:"测试任务.gif",man:"祝福"},
                    {code:"7895211",task:"测试任务.gif",man:"祝福"},
                    {code:"7895211",task:"测试任务.gif",man:"祝福"}
                ]
            }
        }
}
</script>
<style lang="less" scoped>
    .data_search{
        .itemCard{
            margin-bottom: 25px;
        }
        .search_item{
            margin-bottom: 20px;
            .ivu-form-item{
                margin-bottom: 0px;
            }
        }
    }
</style>