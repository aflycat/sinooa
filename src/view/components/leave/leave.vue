<template>
    <div class="leave">
        <Card   class="itemCard">
            <p slot="title">请假信息</p>
            <Form  :label-width="80">
                <Row>
                    <Col span="8">
                        <FormItem label="请假人">
                            <Input  placeholder="请输入请假人"></Input>
                        </FormItem>
                    </Col>
                     <Col span="8">
                        <FormItem label="部门">
                            <Input  placeholder="请输入部门"></Input>
                        </FormItem>
                    </Col>
                     <Col span="8">
                        <FormItem label="请假时间">
                            <Input  placeholder="请输入请假时间"></Input>
                        </FormItem>
                    </Col>
                      <Col span="8">
                        <FormItem label="请假类型">
                            <Input  placeholder="请输入类型"></Input>
                        </FormItem>
                    </Col>
                </Row>
                
                
            </Form>
        </Card>
        <Card  class="itemCard">
                <p slot="title">备注</p>
                <Form :label-width="80">
                    
                    <FormItem label="备注" prop="TaskSummary">
                        <Input  type="textarea" :autosize="{minRows: 10,maxRows: 15}" placeholder="请输入备注"></Input>
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
    }
}
</script>
<style lang="less" scoped>
    .leave {
        width: 100%;
        height: 100%;
        .itemCard{
            margin-top: 25px;
        }
    }
</style>