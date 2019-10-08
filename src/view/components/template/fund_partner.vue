<template>
    <Modal v-model="flags" title="基金合伙人信息" @on-ok="handleOk()" @on-cancel="handleCancel()" width="600px">
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
                    <FormItem label="出资比例">
                        <Input  placeholder="出资比例"></Input>
                    </FormItem>
                </Col>
                 <Col span="12">
                    <FormItem label="出资金额">
                        <Input  placeholder="出资金额"></Input>
                    </FormItem>
                </Col>
                 <Col span="24">
                    <FormItem label="联系邮箱">
                        <Input  placeholder="联系邮箱"></Input>
                    </FormItem>
                </Col>
                 
               
                 <Col span="24">
                    <FormItem label="证件号码">
                         <Row type="flex" justify="space-between">
                              <Col span="9">
                                <Input  placeholder="证件类型"></Input>
                              </Col>
                               <Col span="14">
                                <Input  placeholder="证件号码"></Input>
                              </Col>
                         </Row>
                    </FormItem>
                </Col>
                 <Col span="24">
                    <FormItem label="地址">
                         <Row type="flex" justify="space-between">
                              <Col span="9">
                                <Select v-model="addr" placeholder="地址类型">
                                    <Option v-for="item in addrList" :value="item.value" :key="item.value">{{item.label}}</Option>
                                </Select>
                               
                              </Col>
                               <Col span="14">
                                <Input  placeholder="详细地址"></Input>
                              </Col>
                         </Row>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="联系人姓名">
                        <Input  placeholder="联系人姓名"></Input>
                    </FormItem>
                </Col>
                 <Col span="12">
                    <FormItem label="联系人电话">
                        <Input  placeholder="联系人电话"></Input>
                    </FormItem>
                </Col>
                 <Col span="24">
                    <FormItem label="联系人邮箱">
                        <Input  placeholder="出资联系人邮箱金额"></Input>
                    </FormItem>
                </Col>
            </Row>
               
        </Form>
    </Modal>
</template>
<script>
export default {
    name:"fundPartner",
    data(){
        return{
           flags:false,
           addr:'',
           addrList:[
            {value:"1",label:"注册地址"},
            {value:"2",label:"家庭住址"},
            {value:"3",label:"联系地址"}
           ]
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

</style>