<template>
    <Modal v-model="flags"  title="流程编辑" @on-ok="handleOk()" @on-cancel="handleCancel()" width="750px">
         <Form :label-width="100">
            <Row :gutter="16">
                <Col span="12">
                    <FormItem label="任务流描述">
                        <Input  placeholder="任务流描述" ></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="处理要求">
                        <Select>
                            <Option :value="'要求1'" :key="1">要求1</Option>
                            <Option :value="'要求2'" :key="2">要求2</Option>
                        </Select> 
                    </FormItem>
                </Col>
                 <Col span="12">
                    <FormItem label="时间">
                       <Input  placeholder="时间" ></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="处理人">
                       <Input  placeholder="处理人" ></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="处理组">
                       <Select>
                            <Option :value="'处理组1'" :key="1">处理组1</Option>
                            <Option :value="'处理组2'" :key="2">处理组2</Option>
                        </Select> 
                    </FormItem>
                </Col>
            </Row> 
        </Form>
    </Modal>
</template>
<script>
export default {
    name:"processBasic",
    data(){
        return{
            flags:false
        }
    },methods:{
         handleOk(){
            
        },
        handleCancel(){

        },
        showModal(){
            this.flags=true;
        }
    }
}
</script>
<style lang="less" scoped>

</style>