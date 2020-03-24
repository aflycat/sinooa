<template>
    <div class="platform_app">
        <Row :gutter="16" style="height:100%;">
            <Col span="7" style="height:100%;overflow:hidden;">
                <Card class="pla_wrap" >
                    <p slot="title">权属平台列表</p>
                     <Menu theme="light" active-name="1" class="pla_menu" @on-select="sePlatform">
                         <MenuGroup  >
                            <MenuItem name="1">
                                权属平台1
                            </MenuItem>
                            <MenuItem name="2">
                                权属平台2
                            </MenuItem>
                            

                        </MenuGroup>
                         
                     </Menu>
                </Card>
            </Col>
            <Col span="16">
                <Card class="itemCard">
                    <p slot="title">权属平台信息</p>
                    <Form class="formWrap"  :label-width="120">
                    
                        <FormItem  label="权属平台全称:">
                        </FormItem>
                        <Row>
                            <Col span="12">
                                <FormItem  label="权属平台简称:">
                                </FormItem>
                            </Col>
                        
                            <Col span="12">
                                <FormItem label="权属平台代码:">
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem  label="统一社会信用代码:">
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="成立日期:">
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="注册地址:">
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="注册资本:">
                                    
                                </FormItem>
                            </Col>
                            <Col span="24">
                                <FormItem label="经营范围:">
                                </FormItem>
                            </Col>
                        </Row>
                        </Form>
                </Card>
                

         <Card class="itemCard">
            <p slot="title">权属平台人员信息</p>
            <Table :columns="member" :data="memberData">
               
            </Table>
        </Card>
            </Col>
        </Row>
    </div>
</template>
<script>
export default {
    data(){
        return{
             member:[
                {title:"人员类型",key:"kind"},
                {title:"人员姓名",key:"name"},
                {title:"持股比例(%)",key:"scale"},
                {title:"认缴金额(万元)",key:"money"},
                
            ],
            memberData:[
                {
                    kind:"股东",
                    name:"祝福",
                    scale:"10",
                    money:"10"
                },
                {
                    kind:"股东",
                    name:"祝福",
                    scale:"10",
                    money:"10"
                }
            ],
        }
    },
    methods:{
        sePlatform(name){
            console.log(name)
        }
        
    }
}
</script>
<style lang="less" >
    .platform_app{
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