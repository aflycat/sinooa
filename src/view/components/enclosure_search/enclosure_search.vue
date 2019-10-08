<template>
<!-- 附件查询 -->
    <div class="encloseure_search">
        <Card  class="itemCard">
            <P slot="title">任务搜索</P>
            <Row type="flex" justify="center" >
                <Col span="12">
                     <Form :label-width="120">
                            
                            <FormItem label="项目查询">
                               
                                 <Select placeholder="请选择项目">
                                    <Option>编号</Option>
                                    <Option>项目</Option>
                                    <Option>关键字</Option>
                                </Select>
                            </FormItem>
                    </Form>
                  
                </Col>
               
            </Row>
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
            <Table stripe  :columns="columnsTask" :data="dataTask"></Table>

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
                      {code:"7895211",task:"测试任务.gif",man:"祝福"}
                ]
            }
        }
}
</script>
<style lang="less" scoped>
    .encloseure_search{
        .itemCard{
            margin-bottom: 25px;
        }
    }
</style>