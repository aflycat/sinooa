<template>
    <div class="platform_app">
        <Row :gutter="16" style="height:100%;">
            <Col span="7" style="height:100%;overflow:hidden;">
                <Card class="pla_wrap" >
                    <p slot="title">权属平台列表</p>
                     <Menu theme="light" active-name="1" class="pla_menu" @on-select="setPlatform">
                         <MenuGroup  >
                            <MenuItem v-for="item in postData.platList" :key="item.platformID" :name="item.platformID">
                                {{item.platName}}
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
                            {{platformInfor.platform.platName}}
                        </FormItem>
                        <Row>
                            <Col span="12">
                                <FormItem  label="权属平台简称:">
                                    {{platformInfor.platform.shortName}}
                                </FormItem>
                            </Col>
                        
                            <Col span="12">
                                <FormItem label="权属平台代码:">
                                    {{platformInfor.platform.platCode}}
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem  label="统一社会信用代码:">
                                    {{platformInfor.platform.codsCode}}
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="成立日期:">
                                    {{platformInfor.platform.openDate}}
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="注册地址:">
                                    {{platformInfor.platform.address}}
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="注册资本:">
                                    {{platformInfor.platform.registeredCapital}}万元
                                </FormItem>
                            </Col>
                            <Col span="24">
                                <FormItem label="经营范围:">
                                    {{platformInfor.platform.operateScope}}
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
import {geAllPlatformDetail,getPlatform} from "@/api/data"
export default {
    mounted(){
        this.getAllPlatform()
    },
    data(){
        return{
             member:[
                {title:"人员类型",key:"kind"},
                {title:"人员姓名",key:"name"},
                {title:"持股比例(%)",key:"scale"},
                {title:"人员性质",key:"nature"},
                {title:"认缴金额(万元)",key:"money"},
                
            ],
            memberData:[],
            postData:{},
            platformInfor:{
                platform:{
                    platName:"",
                    shortName:"",
                    platCode:"",
                    codsCode:"",
                    openDate:"",
                    address:"",
                    registeredCapital:"",
                    operateScope:""
                }
            }
        }
    },
    methods:{
        getAllPlatform(){
            //获取该账号下的所有的权属平台
            getPlatform({PlatStatus:1,UserID:JSON.parse(localStorage.getItem("userId"))}).then(res=>{
                if(res.data.code==2105){
                    if(res.data.platList.length==0){
                        this.$Message.warning("该账号下没有相关权属平台")
                    }else{
                        this.postData=res.data;
                      
                    }
                }else{
                    this.$Message.error("权属平台列表查询失败:"+res.data.message)
                }
            })
        },
        setPlatform(name){
            //获取选择的平台信息
            this.memberData=[]
            geAllPlatformDetail({PlatformID:name}).then(res=>{
                this.platformInfor=res.data;
                res.data.platform.members.forEach(element => {
                        this.memberData.push(
                            {
                                kind:this.getMemberReturn(element.memberType), 
                                name:element.memberName,
                                scale:this.getMemberTypeReturn(element.status), 
                                nature:element.shareRate,
                                money:element.subscription
                            }
                        )
                });
            })

        },
        getMemberReturn(memberType){
            switch(memberType){
                case 1:
                    return "股东-自然人"
                break;
                case 2:
                    return "股东-机构内部"

                break;
                case 3:
                    return "股东-机构外部"

                break;
                case 4:
                    return "股东-法人代表"

                break;
                case 5:
                    return "股东-董事长"

                break;
                case 6:
                    return "股东-董事"

                break;
                case 7:
                    return "股东-监事"

                break;
                case 8:
                    return "股东-总经理"

                break;
                case 9:
                    return "股东-合伙人"

                break;

            }
        },
        getMemberTypeReturn(status){
            switch(status){
                case 1:
                    return "目前成员"
                break;
                 case 0:
                    return "过往成员"
                break;

            }
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