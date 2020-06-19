
<template>
<!-- 一般费用 -->
    <div class="general">
            <Card class="itemCard">
                <p slot="title">报销人信息</p>
                <Form :label-width="80">
                    <Row>
                          <Col span="8">
                            <FormItem label="报送人" prop="name">
                                {{name}}
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="联系电话" prop="phone">
                                {{phone}}
                            </FormItem>   
                        </Col>
                         <Col span="8">
                             <FormItem label="承担项目" prop="phone">
                                <Select v-model="postdata.ProjectID" filterable  >
                                    <Option v-for="item in ProjectData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>   
                        </Col>
                      
                    </Row>
                   
                </Form>
            </Card>
             <Card class="itemCard">
                <p slot="title">收款人信息</p>
                <Form :label-width="80">
                    <Row>
                        <Col span="8">
                            <FormItem label="收款人" prop="name">
                                <Select @on-change="setPayeeName" v-model="postdata.IncoExpe.PayeeID" label-in-value placeholder="请输入收款人姓名">
                                    <Option v-for="item in userList" :key="item.value" :value="item.value">{{item.label}}</Option>
                                </Select>                               
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="收款账号" prop="phone">
                                <Input v-model="postdata.IncoExpe.PayeeAccount" placeholder="请输入收款账号"></Input>
                            </FormItem>   
                        </Col>

                         <Col span="8">
                             <FormItem label="开户行" prop="phone">
                                <Input v-model="postdata.IncoExpe.PayeeBank" placeholder="请输入开户行"></Input>
                            </FormItem>   
                        </Col>
                    </Row>
                   
                </Form>
            </Card>
            <Card class="itemCard" >
                <p slot="title">费用详情</p>
                 <Form :label-width="90">
                    <Row>
                        <Col span="8">
                            <FormItem label="时间" prop="phone">
                                <DatePicker :value="postdata.IncoExpe.Details[0].OccurDate" type="date" @on-change="subReturnDate" show-week-numbers placeholder="请选择招待时间" style="width:100%;"></DatePicker>
                                
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="会议费用" prop="name">
                                <Input @on-blur="subTotal" v-model="postdata.IncoExpe.Details[0].Amount" type="number" placeholder="请输入会议费用"></Input>
                            </FormItem>
                        </Col>
                         

                         <Col span="8">
                             <FormItem label="宣传费用" prop="phone">
                                <Input @on-blur="subTotal" v-model="postdata.IncoExpe.Details[1].Amount" type="number" placeholder="请输入宣传费用"></Input>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="通讯费用" prop="phone">
                                <Input @on-blur="subTotal" v-model="postdata.IncoExpe.Details[2].Amount" type="number" placeholder="请输入通讯费用"></Input>
                            </FormItem>   
                        </Col>
                        
                     
                        <Col span="8">
                             <FormItem label="物业费用" prop="phone">
                                <Input @on-blur="subTotal" v-model="postdata.IncoExpe.Details[3].Amount" type="number" placeholder="请输物业管理费"></Input>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="资本支出" prop="phone">
                                <Input @on-blur="subTotal" v-model="postdata.IncoExpe.Details[4].Amount" type="number" placeholder="请输入资本支出"></Input>
                            </FormItem>   
                        </Col>
                      
                         <Col span="8">
                             <FormItem label="行政收费" prop="phone">
                                <Input @on-blur="subTotal" v-model="postdata.IncoExpe.Details[5].Amount" type="number" placeholder="请输入办公费"></Input>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="办公费用" prop="phone">
                                <Input @on-blur="subTotal" v-model="postdata.IncoExpe.Details[6].Amount" type="number" placeholder="请输入交通费"></Input>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="交通邮费" prop="phone">
                                <Input @on-blur="subTotal" v-model="postdata.IncoExpe.Details[7].Amount" type="number" placeholder="请输入交通费"></Input>
                            </FormItem>   
                        </Col>
                    
                         <Col span="8">
                            <FormItem label="其他费用" prop="phone">
                                <Input @on-blur="subTotal" v-model="postdata.IncoExpe.Details[8].Amount" type="number" placeholder="请输入其他费用"></Input>
                            </FormItem>   
                        </Col>
                         <Col span="16">
                            <FormItem label="附件张数" prop="phone">
                                <Input v-model="postdata.IncoExpe.InvoicePages" type="number" placeholder="请输入附件张数"></Input>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="合计" prop="phone">
                                {{postdata.IncoExpe.TotalAmount}}
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="总计(大写)	" prop="phone">
                                {{postdata.IncoExpe.TotalAmountCN}}
                            </FormItem>   
                        </Col>
                       
                    </Row>
                   
                </Form>

              
            </Card>
           <Card  class="itemCard">
                <p slot="title">请示信息</p>
                <Form :label-width="80">
                    <FormItem label="事项要点" >
                        <Input  placeholder="请输入事项要点" v-model="postdata.TaskName"></Input>
                    </FormItem>
                    <FormItem label="具体内容" >
                        <Input  type="textarea" v-model="postdata.TaskSummary" :autosize="{minRows: 10,maxRows: 15}" placeholder="请输入事项的具体内容"></Input>
                    </FormItem>
                     <FormItem label="文件列表" v-if="fileName.length>0&&showFile">
                                <p class="fileName" v-for="(item,index) in fileName" :key="index">
                                    <Row >
                                        <Col span="20">
                                            <span style="color:#2b85e4;margin-right:8px;">{{item.name}}</span>
                                            <span style="color:#808695;font-size:12px;">{{item.file}}</span>
                                        </Col>
                                        <Col span="4" style="color:#ed4014;cursor:pointer;" >
                                        <span @click="deleteFile(index)">删除</span> 
                                        </Col>
                                    </Row>
                                </p>
                    </FormItem>
                     <FormItem>
                        <Button @click="showUploadFile()" style="margin-right: 8px">添加附件</Button>
                       <Button type="primary" :loading="loading" @click="handleSubmit()">

                             <span v-if="!loading">提交</span>
                            <span v-else>提交中...</span>
                            
                        </Button>
                       
                    </FormItem>
                </Form>   

            </Card>
            <upload-files ref="uploadModal"  @handleUploadFileEvent="handleUploadEvent"></upload-files>

    </div>
</template>
<script>
import UploadFiles from "@/view/components/upload_file/upload_file"
import {getProjectList,getAllUserList,setIncoexpeTask,getprogectType,getprogectRole} from "@/api/data"
import {digitUppercase} from "@/libs/tools"
import {TaskTypeID} from "@/libs/data"
export default {
    components:{
        UploadFiles
    },
    data(){
        return{
            fileName:[],
            fileWrap:[],//用来保存要上传的文件，方便进行删除操作
            fileForm:new FormData(),
            name:'',
            phone:'',
            ProjectData:[],
            userList:[],
            loading:false,
            postdata:{
                TaskTypeID: TaskTypeID.GeneralExpenses,
                TaskName: '',//任务名（UI中的报销单据要点）
                TaskSummary: '',//任务概要（UI中的备注）
                TaskOwner:'',//任务申请人ID，与User表的UserID对应，取自当前登录用户
                ProjectID: 0,//项目ID 
                IncoExpe: {//费用收入信息
                    IncoExpeID:0,//费用收入信息ID
                    IncoExpeType:300,//费用收入类别，100差旅费/200招待费/300一般费用/400外勤费用/500项目收入
                    PayeeID: '',//收款人ID，与用户表UserID对应，项目收入报告时为空
                    PayeeName: '',//收款人姓名（根据所选收款人自动获取）/收款单位（项目收入报告时使用）
                    PayeeBank: '',//收款银行（项目收入报告时使用）
                    PayeeAccount: '',//收款账号
                    TotalAmount: 0,//费用收入总金额
                    TotalAmountCN: '零',//费用收入总金额的中文表述
                    InvoicePages: 0,//单据附件张数
                    Details: [
                        { "ID":0,"IncoExpeID":"0","Type":301,"OccurDate":"","Amount":0 } ,//会议费用
                        { "ID":0,"IncoExpeID":"0","Type":302,"OccurDate":"","Amount":0 } ,//宣传费用
                        { "ID":0,"IncoExpeID":"0","Type":303,"OccurDate":"","Amount":0 } ,//通讯费用
                        { "ID":0,"IncoExpeID":"0","Type":304,"OccurDate":"","Amount":0 } ,//物业费用
                        { "ID":0,"IncoExpeID":"0","Type":305,"OccurDate":"","Amount":0 } ,//资本支出
                        { "ID":0,"IncoExpeID":"0","Type":306,"OccurDate":"","Amount":0 } ,//行政收费
                        { "ID":0,"IncoExpeID":"0","Type":307,"OccurDate":"","Amount":0 } ,//办公费用
                        { "ID":0,"IncoExpeID":"0","Type":308,"OccurDate":"","Amount":0 } ,//交通邮政
                        { "ID":0,"IncoExpeID":"0","Type":309,"OccurDate":"","Amount":0 }//其他费用
                    ]
                }
            },
             RoleDataObj:{},
            TypeDataObj:{},
        }
        
    },
     mounted(){
        this.name=JSON.parse(localStorage.getItem("userName"));
        this.phone=JSON.parse(localStorage.getItem("phone"));
        this.postdata.TaskOwner=JSON.parse(localStorage.getItem("userId"));
          this.getprogectType();
        this.getprogectRole();
        this.getProList();
        this.getAllUserList();
    },
    methods:{
        getProList(){
            //获取项目列表
            getProjectList({"ProjectStatus":2,"USerID":JSON.parse(localStorage.getItem("userId"))}).then(res=>{
                if(res.data.code==2307){
                   res.data.projectList.forEach(element => {
                            this.ProjectData.push({
                                label:element.clientCode+'--'+this.TypeDataObj[element.projectType]+'--'+this.RoleDataObj[element.projectRole],
                                value:element.projectID
                            })
                        });
                    
                }else{
                    this.$Message.error({
                        content:'项目列表数据加载失败：'+res.data.message
                    })
                }
            })
        }, getprogectType(){
            getprogectType({"PageIndex":1,"PageSize":1000}).then(res=>{
                 if(res.data.code==0){
                    res.data.projectTypeList.forEach(element => {
                     
                         this.TypeDataObj[element.projectTypeId]=element.projectTypeName
                    });
                }else{
                    this.$Message.error({
                        content:"项目品种信息加载失败:"+res.data.message
                    })
                }
            })
        },
        getprogectRole(){
            getprogectRole({"PageIndex":1,"PageSize":1000}).then(res=>{
                 if(res.data.code==0){
                    res.data.projectRoleList.forEach(element => {
                        
                        this.RoleDataObj[element.projectRoleId]=element.projectRoleName;
                        
                    });

                }else{
                    this.$Message.error({
                        content:"项目角色信息加载失败:"+res.data.message
                    })
                }
            })
        },
        getAllUserList(){
            getAllUserList({"Status":1}).then(res=>{
                if(res.data.code==0){
                    res.data.userList.forEach(element=>{
                        this.userList.push({
                            value:element.userId,
                            label:element.userName
                        })
                    })
                }else{
                    this.$Message.error({
                        content:"收款人信息查询失败:"+res.data.message
                    })
                }
            })
        },
        handleSubmit(){
            setIncoexpeTask(this.postdata).then(res=>{
                if(res.data.code==2501){
                    this.$Message.success({
                        content:"操作成功"
                    })
                }else{
                    this.$Message.error({
                        content:"操作失败:"+res.data.message
                    })
                }
            })
        },
        subTotal(){
            this.postdata.IncoExpe.TotalAmount=0;
            this.postdata.IncoExpe.Details.forEach(
                element=>{
                    this.postdata.IncoExpe.TotalAmount+=parseFloat(element.Amount)
                }
            )
            this.postdata.IncoExpe.TotalAmountCN=digitUppercase(this.postdata.IncoExpe.TotalAmount);

        },
        subReturnDate(value){
               this.postdata.IncoExpe.Details.forEach(element=>{
                element.OccurDate=value;
            })
          
        },setPayeeName(val){
            this.postdata.IncoExpe.PayeeID=val.value;
            this.postdata.IncoExpe.PayeeName=val.label;
        },deleteFile(index){
            this.fileName.splice(index,1);
            this.fileWrap.splice(index,1);

        },
        handleUploadEvent(flag,filename,fileWrap){
            this.fileModal=flag;
            if(filename){
                    this.fileName=filename;
            }
            if(fileWrap){
                this.fileWrap=fileWrap;
            }
            this.showFile=true;
        },showUploadFile(){
            //显示modal
            this.$refs["uploadModal"].showModal(true);
        }
    }
}
</script>
<style lang='less' scoped>
    .general{
        width: 100%;
        height:100%;
        .itemCard{
            margin-bottom: 20px;
        }
    }
</style>