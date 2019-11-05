 
<template>
<!-- 项目收入费用-->
    <div class="information">
        <Row :gutter="16">
            <Col span="6">
                <Card class="itemCard preview">
                    <h3>祝福</h3>
                    <p><Icon class="icon" type="ios-call-outline" />17620455702</p>
                    <Divider />
                    <p><Icon class="icon"  type="ios-briefcase-outline" />前端工程师</p>
                    <p><Icon class="icon"  type="ios-git-network" />运营部</p>
                    <p><Icon class="icon"  type="ios-pin-outline" />深圳市</p>
                </Card>
            </Col>
            
           <!-- <Col span="16" offset="2">
                <Card class="itemCard">
                    <p slot="title">个人设置</p>
                    <Form :label-width="80">
                        <Row>
                            <Col span="8">
                                <FormItem label="姓名" prop="name">
                                    <Input   placeholder="请输入姓名"></Input>
                                </FormItem>
                            </Col>
                             <Col span="8">
                                <FormItem label="性别" prop="name">
                                    <Input   placeholder="请输入性别"></Input>
                                </FormItem>
                            </Col>
                             <Col span="8">
                                <FormItem label="出生年月" prop="name">
                                    <Input   placeholder="请输入出生年月"></Input>
                                </FormItem>
                            </Col>
                             <Col span="8">
                                <FormItem label="生日" prop="name">
                                    <Input   placeholder="请输入生日"></Input>
                                </FormItem>
                            </Col>
                             <Col span="8">
                                <FormItem label="年龄" prop="name">
                                    <Input   placeholder="请输入年龄"></Input>
                                </FormItem>
                            </Col>
                             <Col span="8">
                                <FormItem label="民族" prop="name">
                                    <Input   placeholder="请输入民族"></Input>
                                </FormItem>
                            </Col>
                             <Col span="8">
                                <FormItem label="政治面貌" prop="name">
                                    <Input   placeholder="请输入政治面貌"></Input>
                                </FormItem>
                            </Col>
                             <Col span="8">
                                <FormItem label="婚姻状况" prop="name">
                                    <Input   placeholder="请输入婚姻状况"></Input>
                                </FormItem>
                            </Col>
                             <Col span="8">
                                <FormItem label="籍贯" prop="name">
                                    <Input   placeholder="请输入籍贯"></Input>
                                </FormItem>
                            </Col>
                             <Col span="8">
                                <FormItem label="户口性质" prop="name">
                                    <Input   placeholder="请输入户口性质"></Input>
                                </FormItem>
                            </Col>
                             <Col span="8">
                                <FormItem label="现住址" prop="name">
                                    <Input   placeholder="请输入现住址"></Input>
                                </FormItem>
                            </Col>
                             <Col span="8">
                                <FormItem label="身份证地址" prop="name">
                                    <Input   placeholder="请输入身份证地址"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Card>
           </Col> -->
           <Col span="16" offset="2">
                <Card class="itemCard">
                    <p slot="title">个人设置</p>
                    <Form :label-width="80">
                        <Row>
                           <Col span="12">
                                <FormItem label="姓名:">
                                </FormItem>
                            </Col>
                             <Col span="12">
                                    <FormItem label="性别:">
                                       
                                    </FormItem>
                                </Col>
                              <Col span="12">
                                    <FormItem label="最高学历:" >
                                        
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="专业:">
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="电话:">
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="邮编:">
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="通讯地址:">
                                    </FormItem>
                                </Col>     
                                        </Row>
                                    </Form>
                            </Card>
                        </Col>
            </Row>
            <Card class="itemCard">
                <p slot="title">公司信息</p>
                <Form :label-width="100">
                    <Row>
                    <Col span="8">
                        <FormItem label="所属公司:">
                            
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="所属部门:">
                        
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="邮箱:">
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="所属角色:">
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="基本工资:">
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="考勤补贴:">
                        </FormItem>
                    </Col>
                    
                    <Col span="8">
                        <FormItem label="当前工时标准:">
                            
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="人力成本:">
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="账号状态:">
                            
                        </FormItem>
                    </Col>
                        </Row>
                </Form>
            </Card>
             <Card class="itemCard">
                    <p slot="title">账户设置 </p>
                    <Form :label-width="100">
                        <Row>
                            <Col span="8">
                                <FormItem label="用户名:">
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem label="密码:">
                                         <Button type="text" style="color:#2d8cf0;" @click="passWmodal=true">修改密码</Button>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                    <div>
                       
                    </div>
                </Card>
        <!-- <Row>
            <Card class="itemCard">
                    <p slot="title">账户设置 </p>
                     <Form :label-width="100">
                    <Row>
                            <Col span="8">
                                <FormItem label="登录名" prop="name">
                                    <Input  placeholder="请输入登录名"></Input>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem label="密码" prop="name">
                                    <Input   placeholder="请输入密码"></Input>
                                </FormItem>
                            </Col>
                            
                        </Row>
                    </Form>
                </Card>
        </Row>
        <Row>
            <Card class="itemCard">
                    <p slot="title">最高学历学位信息</p>
                    <Form :label-width="100">
                    <Row>
                            <Col span="8">
                                <FormItem label="毕业院校" prop="name">
                                    <Input  placeholder="请输入毕业院校"></Input>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem label="毕业时间" prop="name">
                                    <Input   placeholder="请输入毕业时间"></Input>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem label="专业" prop="name">
                                    <Input  placeholder="请输入专业"></Input>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem label="学历" prop="name">
                                    <Input   placeholder="请输入学历"></Input>
                                </FormItem>
                            </Col>
                            
                        </Row>
                    </Form>
                </Card>
        </Row>
        <Row>
            <Card class="itemCard">
                    <p slot="title">安全设置</p>
                     <Form :label-width="120">
                    <Row>
                            <Col span="8">
                                <FormItem label="紧急联系人" prop="name">
                                    <Input   placeholder="请输入紧急联系人"></Input>
                                </FormItem>
                            </Col>
                             <Col span="8">
                                <FormItem label="紧急联系人电话" prop="name">
                                    <Input   placeholder="请输入紧急联系人电话"></Input>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem label="招行卡号" prop="name">
                                    <Input  placeholder="请输入招行卡号"></Input>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem label="公积金卡号" prop="name">
                                    <Input   placeholder="请输入公积金卡号"></Input>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem label="社保电脑号" prop="name">
                                    <Input   placeholder="请输入社保电脑号"></Input>
                                </FormItem>
                            </Col>
                             <Col span="8">
                                <FormItem label="联系电话" prop="name">
                                    <Input   placeholder="请输入联系电话"></Input>
                                </FormItem>
                            </Col>
                             <Col span="8">
                                <FormItem label="证件号码" prop="name">
                                    <Input  placeholder="请输入证件号码"></Input>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem label="港澳通行证" prop="name">
                                    <Input   placeholder="请输入港澳通行证"></Input>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem label="通行证有效期" prop="name">
                                    <Input   placeholder="请输入通行证有效期"></Input>
                                </FormItem>
                            </Col>
                             <Col span="8">
                                <FormItem label="护照" prop="name">
                                    <Input   placeholder="请输入护照"></Input>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem label="护照有效期" prop="name">
                                    <Input   placeholder="请输入护照有效期"></Input>
                                </FormItem>
                            </Col>
                           
                        </Row>
                    </Form>
                </Card>
        </Row>   
        <Row>
            <Card class="itemCard">
                    <p slot="title">工作信息</p>
                     <Form :label-width="120">
                    <Row>
                            <Col span="8">
                                <FormItem label="部门" prop="name">
                                    <Input  placeholder="请输入部门"></Input>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem label="二级部门" prop="name">
                                    <Input   placeholder="请输入二级部门"></Input>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem label="岗位名称" prop="name">
                                    <Input   placeholder="请输入岗位名称"></Input>
                                </FormItem>
                            </Col>
                             <Col span="8">
                                <FormItem label="入职日期" prop="name">
                                    <Input   placeholder="请输入入职日期"></Input>
                                </FormItem>
                            </Col>
                             <Col span="8">
                                <FormItem label="司龄" prop="name">
                                    <Input  placeholder="请输入司龄"></Input>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem label="首次签合同日期" prop="name">
                                    <Input   placeholder="请输入首次签合同日期"></Input>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem label="开始日期" prop="name">
                                    <Input   placeholder="请输入开始日期"></Input>
                                </FormItem>
                            </Col>
                             <Col span="8">
                                <FormItem label="试用期终止日期" prop="name">
                                    <Input   placeholder="请输入试用期终止日期"></Input>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem label="合同终止日期" prop="name">
                                    <Input   placeholder="请输入合同终止日期"></Input>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem label="开始日期" prop="name">
                                    <Input   placeholder="请输入开始日期"></Input>
                                </FormItem>
                            </Col>
                             <Col span="8">
                                <FormItem label="试用期终止日期" prop="name">
                                    <Input   placeholder="请输入试用期终止日期"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Card>
        </Row>
         <Row>
            <Card class="itemCard">
                <p slot="title">工作经历</p>
                <Table :columns="columns_work" :data="data_work"></Table>    
            </Card>
        </Row> 
        <Row>
            <Card class="itemCard">
                <p slot="title">评先记录</p>
                <Table :columns="columns_examination " :data="data_examination "></Table>    
            </Card>
        </Row> 
        <Row>
            <Card class="itemCard">
                <p slot="title">惩罚记录</p>
                <Table :columns="columns_examination " :data="data_punish"></Table>    
            </Card>
        </Row> 
        <Row>
            <Card class="itemCard">
                <p slot="title">调动记录</p>
                <Table :columns="columns_change" :data="data_change"></Table>   
            </Card>
        </Row> 
        <Card  class="itemCard">
            <p slot="title">其他信息</p>
            <Form :label-width="80">
                
                    <FormItem label="备注" prop="TaskSummary">
                        <Input  type="textarea" :autosize="{minRows: 10,maxRows: 15}" placeholder="请输入备注"></Input>
                    </FormItem>
                     <FormItem>
                        
                        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                       
                    </FormItem>
                </Form>   

        </Card>   -->
          <Modal v-model="passWmodal" title="重置密码" @on-ok="changePass">
             <Form :label-width="90">
                    <FormItem label="新密码">
                        <Input v-model="passWord" placeholder="请输入新密码"></Input>
                    </FormItem>
                     <FormItem label="确认密码">
                        <Input v-model="passWordAgain" placeholder="请确认密码"></Input>
                    </FormItem>
            </Form>
         </Modal> 
    </div>
</template>
<script>
export default {
    data(){
        return{
             passWmodal:false,
             postdata:{
                UserName:'',//用户姓名
                LoginId:'',//登录名
                Password:'',//密码，复杂度要求：大写字母、小写字母、数字、特殊符号任选二类
                CompanyId:'',//所属公司
                DepartmentId:'',//所属部门
                Email:'',//满足email格式要求
                Sex:'',//性别，下拉框，保密|男|女
                Degree:'',//学历，下拉框，保密|学士|硕士|博士|
                Speciality:'',//专业
                Phone:'',//电话
                Zip:'',//邮编
                Address:'',//通讯地址
                Roles:[],//角色，可多选,每个元素是RoleId
                PayHour:0,//工时标准
                PayBase:0,//基本工资`
                PayAttendace:0,//考勤补贴
                PayHrcost:0,//人力成本
                Status:1//状态
           },
           passWord:'',
           passWordAgain:''
        //   columns_work:[
        //     {title: '入职时间',key: 'time'},
        //     {title: '公司名称',key: 'name'},
        //     {title: '职位',key: 'job'},
        //     {title: '离职时间',key: 'leaveTime'},
        //     {title: '备注',key: 'mark'},
        //   ],
        //   data_work:[],
        //   columns_examination:[
        //     {title: '时间',key: 'time'},
        //     {title: '名称',key: 'name'},
        //     {title: '等级',key: 'job'},            
        //     {title: '备注',key: 'mark'},
        //   ],
        //   data_examination:[],
        //   data_punish:[
              
        //   ],
        //   columns_change:[
        //     {title: '时间',key: 'time'},
        //     {title: '原岗位',key: 'name'},
        //     {title: '现岗位',key: 'job'},   
        //     {title: '调动原因',key: 'job'},          
        //     {title: '备注',key: 'mark'},
        //     ],
        //   data_change:[]
        }
    },
    methods:{
       changePass(){

       }
    }
}
</script>
<style lang='less' scoped>
    .information{
        width: 100%;
        height:100%;
        .itemCard{
            margin-bottom: 20px;
        }
        .preview{
            p{
                padding: 10px 0;
                .icon{
                    margin-right: 8px;
                }
            }
        }
        
    }
</style>