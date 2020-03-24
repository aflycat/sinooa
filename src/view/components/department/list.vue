<template>
    <div class="department_app">
        <Row :gutter="16" style="height:100%;">
            <Col span="7" style="height:100%;overflow:hidden;">
                <Card class="pla_wrap" >
                    <p slot="title">部门列表</p>
                     <Menu theme="light" active-name="1" class="pla_menu" @on-select="seDepartment">
                         <MenuGroup  >
                            <MenuItem name="1">
                               部门1
                            </MenuItem>
                            <MenuItem name="2">
                                部门2
                            </MenuItem>
                             
                        </MenuGroup>
                         
                     </Menu>
                </Card>
            </Col>
            <Col span="16">
                <Card class="itemCard">
                   <p slot="title">部门信息</p>
                    <Form class="formWrap"  :label-width="120">
                    
                        <FormItem  label="部门全称">
                    <Input  placeholder="部门全称"></Input>
                </FormItem>
                <Row>
                    <Col span="12">
                        <FormItem  label="权属平台">
                            <Input  placeholder="权属平台"></Input>
                        </FormItem>
                    </Col>
                
                    <Col span="12">
                        <FormItem label="部门代码">
                            <Input  placeholder="部门代码"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem  label="部门经理">
                            <Input  placeholder="统一社会信用代码"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="部门副经理">
                            <Input  placeholder="成立日期"></Input>
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="部门员工">
                            <Input  placeholder="部门员工"></Input>
                        </FormItem>
                    </Col>
                    
                </Row>
                        </Form>
                </Card>
            </Col>
        </Row>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        seDepartment(name){
            console.log(name)
        }
    }
}
</script>
<style lang="less" >
.department_app{
   width: 100%;
   height: 100%;
   .pla_wrap{
           height: 100%;
           .ivu-card-body{
               height: 100%;
               overflow: auto;
           }
           .ivu-menu-item-group-title{
               display: none;
           }
       }
       .pla_menu{
           width: 100% !important;
       }  
}

</style>