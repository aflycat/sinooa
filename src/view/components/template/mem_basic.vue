<template>
    <Modal v-model="flags" title="人员基本信息" @on-ok="handleOk()" @on-cancel="handleCancel()" width="700px">
        <Form :label-width="100">
            <Row :gutter="16">
                <Col span="12">
                    <FormItem label="姓名">
                        <Input  placeholder="姓名"></Input>
                    </FormItem>
                </Col>
                 <Col span="12">
                    <FormItem label="联系电话">
                        <Input  placeholder="联系电话"></Input>
                    </FormItem>
                </Col>
               <Col span="12">
                    <FormItem label="邮箱">
                        <Input  placeholder="邮箱"></Input>
                    </FormItem>
                </Col>
                 <Col span="12">
                    <FormItem label="性别">
                        <Select placeholder="选择性别">
                            <Option :value="'男'" :key="1">男</Option>
                            <Option :value="'女'" :key="2">女</Option>
                            <Option :value="'保密'" :key="3">保密</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="最高学历">
                        <!-- <Input  placeholder="最高学历"></Input> -->
                        <Select placeholder="最高学历">
                            <Option :value="'博士'" :key="1">博士</Option>
                            <Option :value="'研究生'" :key="2">研究生</Option>
                            <Option :value="'本科'" :key="3">本科</Option>
                            <Option :value="'大专'" :key="4">大专</Option>
                            <Option :value="'其他'" :key="6">其他</Option>
                        </Select>
                    </FormItem>
                </Col>
                 <Col span="12">
                    <FormItem label="专业">
                        <Input  placeholder="专业"></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="电话">
                        <Input  placeholder="电话"></Input>
                    </FormItem>
                </Col>
                 <Col span="12">
                    <FormItem label="邮编">
                        <Input  placeholder="邮编"></Input>
                    </FormItem>
                </Col>
                <Col span="24">
                    <FormItem label="通讯地址">
                        <Input  placeholder="通讯地址"></Input>
                    </FormItem>
                </Col>   
                <Col span="24">
                    <FormItem label="所属角色">
                        <CheckboxGroup >
                            <Row>
                                <Col span="6"><Checkbox label="1"><span>1</span></Checkbox></Col>
                               <Col span="6"><Checkbox label="1"><span>1</span></Checkbox></Col>
                               <Col span="6"><Checkbox label="1"><span>1</span></Checkbox></Col>
                               <Col span="6"><Checkbox label="1"><span>1</span></Checkbox></Col>
                               <Col span="6"><Checkbox label="1"><span>1</span></Checkbox></Col>
                               <Col span="6"><Checkbox label="1"><span>1</span></Checkbox></Col>
                               <Col span="6"><Checkbox label="1"><span>1</span></Checkbox></Col>
                               <Col span="6"><Checkbox label="1"><span>1</span></Checkbox></Col>
                            </Row>
                        </CheckboxGroup>
                    </FormItem>
                </Col>
                <Col span="24">
                    <FormItem class="notice" label="注：" >
                        <p>
                            1、基本工资、考勤补贴根据薪酬级别设定设置有关数据，人力成本为总人力成本数据（即含外勤费用）；
    2、人力成本应根据职员转正或调整决定日起，在当月内完成调整。
                        </p>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="基本工资">
                         <Input  placeholder="基本工资"></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="考勤补贴">
                         <Input  placeholder="考勤补贴"></Input>
                    </FormItem>
                </Col>
                
                <Col span="24">
                    <FormItem label="当前工时标准">
                         <Row type="flex" justify="space-between">
                              <Col span="9">
                                <Select placeholder="选择工时">
                                    <Option :value="20" :key="20">20</Option>
                                    <Option :value="30" :key="30">30</Option>
                                    <Option :value="50" :key="50">50</Option>
                                    <Option :value="70" :key="70">70</Option>
                                    <Option :value="100" :key="100">100</Option>
                                    <Option :value="140" :key="140">140</Option>
                                </Select>
                              </Col>
                               <Col span="14">
                                <Input  placeholder="其他"></Input>
                              </Col>
                         </Row>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="人力成本">
                         <Input  placeholder="人力成本"></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="账号状态">
                        <Select placeholder="选择状态">
                            <Option :value="'正常'" :key="1">正常</Option>
                            <Option :value="'未审批'" :key="2">未审批</Option>
                            <Option :value="'冻结'" :key="3">冻结</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
               
        </Form>
        <div slot="footer">
            <Button  size="large" >取消</Button>
            <Button type="warning"  size="large" >更多信息</Button>
           
            <Button type="primary" size="large" >提交</Button>
        </div>
    </Modal>
</template>
<script>
export default {
    name:"memBasic",
    data(){
        return{
           flags:false,
         
         
        }
    },methods:{
        handleOk(){
            
        },
        handleCancel(){

        },
        showModel(flag){
            this.flags=flag;
        }
    }

}
</script>
<style lang="less" scoped>
    // .notice{
    //     .ivu-form-item-label{
    //         color:#ed4014;
    //     }
    // }
</style>