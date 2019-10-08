
<template>
<!-- 基金执行会议 -->
    <div class="borrow">
            
             <Card class="itemCard">
                <p slot="title">收款人信息</p>
                <Form :label-width="80">
                    <Row>
                        <Col span="8">
                            <FormItem label="申请人" prop="name">
                                <Input  placeholder="请输入收款人姓名"></Input>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="收款账号" prop="phone">
                                <Input  placeholder="请输入收款账号"></Input>
                            </FormItem>   
                        </Col>

                         <Col span="8">
                             <FormItem label="开户行" prop="phone">
                                <Input  placeholder="请输入开户行"></Input>
                            </FormItem>   
                        </Col>
                    </Row>
                   
                </Form>
            </Card>

             <Card class="itemCard">
                <p slot="title">借款信息</p>
                <Form :label-width="80">
                    <Row>
                        <Col span="8">
                            <FormItem label="借款日期" prop="name">
                                <Input   placeholder="请输入借款日期"></Input>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="借款事由" prop="name">
                                <Input   placeholder="请输入借款事由"></Input>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="还款日期" prop="phone">
                                <Input  placeholder="请输入还款日期"></Input>
                            </FormItem>   
                        </Col>

                         <Col span="8">
                             <FormItem label="借款金额" prop="phone">
                                <Input  placeholder="请输入借款金额"></Input>
                            </FormItem>   
                        </Col>
                    </Row>
                   
                </Form>
            </Card>
            
            <Card  class="itemCard">
                <p slot="title">备注</p>
                <Form :label-width="80">
                    
                    <FormItem label="备注" prop="TaskSummary">
                        <Input type="textarea" :autosize="{minRows: 10,maxRows: 15}" placeholder="请输入备注"></Input>
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
         
                    
        }
    },
    methods:{
         filterMethod (value, option) {
             console.log(value,option)
                return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
            }
    }
}
</script>
<style lang='less' scoped>
    .borrow{
        width: 100%;
        height:100%;
        .itemCard{
            margin-bottom: 20px;
        }
    }
</style>