<template>
    <div class="department_app">
        <Row :gutter="16" style="height:100%;">
            <Col span="7" style="height:100%;overflow:hidden;">
                <Card class="pla_wrap" >
                    <p slot="title">部门列表</p>
                     <Menu theme="light" active-name="1" class="pla_menu" @on-select="seDepartment">
                         <MenuGroup  >
                            <MenuItem v-for="item in postData.deptList" :key="item.departmentID" :name="item.departmentID">
                               {{item.deptName}}
                            </MenuItem>
                        </MenuGroup>
                         
                     </Menu>
                </Card>
            </Col>
            <Col span="16">
                <Card class="itemCard">
                   <p slot="title">部门信息</p>
                    <Form class="formWrap"  :label-width="120">
                    
                        <FormItem  label="部门全称:">
                            {{depDeatil.department.deptName}}
                        </FormItem>
                        <Row>
                            <Col span="12">
                                <FormItem  label="权属平台:">
                                    {{platformName}}
                                </FormItem>
                            </Col>
                        
                            <Col span="12">
                                <FormItem label="部门代码:">
                                    {{depDeatil.department.deptCode}}
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem  label="部门经理:">
                                    {{mannager}}
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="部门副经理:">
                                {{deputyManager}}
                                </FormItem>
                            </Col>
                            <Col span="24">
                                <FormItem label="部门员工:">
                                    {{member.toString()}}
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
import {getAllDepartment,getDepartmentDetail,geAllPlatformDetail} from "@/api/data"
export default {
    mounted(){
        this.getDepartmentList()
    },
    data(){
        return{
            postData:{},
            depDeatil:{
                department:{
                    deptName:"",
                    platformID:"",
                    deptCode:""
                }
            },
            mannager:"",
            deputyManager:"",
            member:[],
            platformName:""

        }
    },
    methods:{
        getDepartmentList(){
            getAllDepartment({DeptStatus:"1",USerID:JSON.parse(localStorage.getItem("userId"))}).then(res=>{
                if(res.data.code==2205){
                    if(res.data.deptList.length==0){
                        this.$Message.warning("该账号下没有相关部门")
                    }else{
                        this.postData=res.data
                    }
                }else{
                    this.$Message.error("部门列表获取失败:"+res.data.message)
                }
            })
        },
        seDepartment(name){
            this.member=[];
            this.mannager="";
            this.deputyManager="";
            this.platformName="";
            getDepartmentDetail({DepartmentID:name}).then(res=>{
                if(res.data.code==2206){
                    this.depDeatil=res.data;
                    this.getPlatform(this.depDeatil.department.platformID)
                    res.data.department.members.forEach(element => {
                        switch (element.memberType){
                            case 21:
                                //部门经理
                                this.mannager=element.memberName

                            break;
                            case 22:
                                //部门副经理
                                this.deputyManager=element.memberName
                            break;
                            case 23:
                                //成员
                                this.member.push(element.memberName)
                            break;


                        }
                    });
                }else{
                    this.$Message.error("部门信息获取失败:"+res.data.message)
                }
            })
            

        },
        getPlatform(id){
            geAllPlatformDetail({PlatformID:id}).then(res=>{
                
                if(res.data.code==2106){
                    this.platformName=res.data.platform.platName;

                }else{
                    this.$Message.error("权属平台信息查询失败:"+res.data.message)
                }
            })
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