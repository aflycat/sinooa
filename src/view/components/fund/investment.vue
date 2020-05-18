<template>
    <div class="fund_invest">
         <Card class="itemCard">
                <p slot="title">报送人信息</p>
                <Form :label-width="80">
                    <Row>
                        <Col span="8">
                            <FormItem label="报送人：" prop="name">
                                <b>{{name}}</b>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="联系电话：" prop="phone">
                                <b>{{phone}}</b>
                            </FormItem>   
                        </Col>
                    </Row>
                   
                </Form>
            </Card>
        </Card>
        <Card  class="itemCard">
            <p slot="title">基金信息</p>
                <Form :label-width="120">
                    <Row>
                        <Col span="24">
                            <FormItem label="基金选择">
                                 <Select v-model="postdata.FundInvest.FundID"  filterable   @on-change='getFundDetail' placeholder="请选择基金">
                                    <Option v-for="(item,index) in fundList" :value="item.fundID" :key="index">{{ item.shortName }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="权属平台：" >
                                <b>{{platform}}</b>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="基金全称：">
                                <b>{{Fund.FundName}}</b>
                            </FormItem>   
                        </Col>
                          <Col span="8">
                            <FormItem label="基金简称：">
                                 <b>{{Fund.ShortName}}</b>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="注册日期：">
                                 <b>{{Fund.RegDate}}</b>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="成立日期：" >
                                <b> {{Fund.OpenDate}}</b>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="备案日期：" >
                                <b> {{Fund.RecordDate}}</b>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="终止日期：" >
                                <b> {{Fund.EndDate}}</b>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="基金类型：">
                                <b> {{Fund.RegType}}</b>
                             
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="基金代码：" >
                                <b> {{Fund.FundCode}}</b>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="协会登记编码：" >
                                <b> {{Fund.RegSCode}}</b>
                            </FormItem>   
                        </Col>
                          <Col span="8">
                            <FormItem label="社会统一代码：" >
                                <b> {{Fund.CodsCode}}</b>
                            </FormItem>   
                        </Col>
                      </Row>
                </Form>
        </Card>
        <Card  class="itemCard">
            <p slot="title">投资信息</p>
             <Form :label-width="120">
                    <Row>
                        <Col span="8">
                            <FormItem label="投资类型">
                               <Select v-model="postdata.FundInvest.TargetType"  filterable   placeholder="请选择基金类型">
                                    <Option  value="1" >投资项目</Option>
                                    <Option   value="2" >投资基金</Option>
                                </Select>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="投资对象">
                               <Select v-model="postdata.FundInvest.TargetID"  filterable   placeholder="请选择基金类型">
                                   <template v-if='postdata.FundInvest.TargetType==2'>
                                        <Option v-for="(item,index) in fundList" :value="item.fundID" :key="index">{{ item.shortName }}</Option>
                                   </template>
                                    <template  v-if='postdata.FundInvest.TargetType==1'>
                                        <Option v-for="(item,index) in ProjectData" :value="item.value" :key="index">{{ item.label }}</Option>
                                   </template>
                                </Select>
                            </FormItem>   
                        </Col>
                           <Col span="8">
                            <FormItem label="投资方式">
                               <Select v-model="postdata.FundInvest.InvestWay"  filterable   placeholder="请选择基金类型">
                                    <Option   value="境内未上市" >境内未上市</Option>
                                    <Option   value="未挂牌公司股权投资" >未挂牌公司股权投资</Option>
                                    <Option   value="上市公司定向增发投资" >上市公司定向增发投资</Option>
                                    <Option   value="股票协议转让投资" >股票协议转让投资</Option>
                                    <Option   value="股票大宗交易投资" >股票大宗交易投资</Option>
                                    <Option   value="新三板投资" >新三板投资</Option>
                                    <Option   value="境内债权类投资" >境内债权类投资</Option>
                                    <Option   value="境外股权投资" >境外股权投资</Option>
                                    <Option   value="境外债权投资" >境外债权投资</Option>
                                </Select>
                            </FormItem>   
                        </Col>
                        
                         <Col span="8">
                            <FormItem label="持股比例" >
                                <Input v-model="postdata.FundInvest.ShareRate" type="number" placeholder="请输入持股比例">
                                        <span slot="append">%</span>
                                </Input>
                            </FormItem>   
                        </Col>
                       
                        <Col span="8">
                            <FormItem label="持资认缴资本总额" >
                                <Input v-model="postdata.FundInvest.OrderMoney" placeholder="请输入持资认缴资本总额">
                                    <span slot="append">万元</span>
                                </Input>
                            </FormItem>   
                        </Col>
                        <Col span="8" >
                            <FormItem label="已投资总额" >
                                <Input v-model="postdata.FundInvest.PaidMoney" placeholder="请输入已投资总额">
                                    <span slot="append">万元</span>
                                </Input>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="投资日期" prop="ClientOpenDate">
                                 <DatePicker :value='postdata.FundInvest.InvestDate' @on-change="setDate" type="date" placeholder="请选择投资日期" style="width: 100%;"></DatePicker>
                            </FormItem>   
                        </Col>
                        
                     
                        
                    </Row>
             </Form>
        </Card>
         <Card  class="itemCard">
                <p slot="title">请示信息</p>
                <Form :label-width="80">
                    <FormItem label="事项要点" prop="TaskName">
                        <Input v-model="postdata.TaskName" placeholder="请输入事项要点"></Input>
                    </FormItem>
                    <FormItem label="具体内容" prop="TaskSummary">
                        <Input v-model="postdata.TaskSummary" type="textarea" :autosize="{minRows: 10,maxRows: 15}" placeholder="请输入事项的具体内容"></Input>
                    </FormItem>
                    <FormItem label="文件列表" v-if="fileName.length>0&&showFile">
                                <p class="fileName" v-for="(item,index) in fileName" :key='index'>
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
                        <Button type="primary" @click="handleSubmit()">提交</Button>
                       
                    </FormItem>
                </Form>   

            </Card>
            <upload-files ref="uploadModal"  @handleUploadFileEvent="handleUploadEvent"></upload-files>

    </div>
</template>
<script>
import {geAllPlatformDetail,
        getAllFundList,
        getFundDetail,
        getProjectList,
        addNewFundInvestTask
} from "@/api/data"
import UploadFiles from "@/view/components/upload_file/upload_file"
import {TaskTypeID} from "@/libs/data"

export default {
     components:{
        UploadFiles,
    },
    data(){
        return{
            fileName:[],
            fileWrap:[],//用来保存要上传的文件，方便进行删除操作
            fileForm:new FormData(),
            name:'',
            phone:'',
            fundList:[],
            ProjectData:[],
            Fund:{
                RegDate:'',
                RegDate:'',
                RecordDate:'',
                EndDate:''
            },
            platform:'',
            fundID:'',
            postdata:{
                TaskTypeID:TaskTypeID.fundInvest,
                TaskName:'',
                TaskSummary:'',
                TaskOwner:'',
                FundInvest:{
                    FundID:'',
                    TargetID:'',
                    TargetType:'',
                    InvestWay:'',
                    ShareRate:'',
                    InvestDate:'',
                    OrderMoney:'',
                    PaidMoney:'',
                    Status:1,
                }
               
            }

        }
    },mounted(){
        this.name=JSON.parse(localStorage.getItem('userName'));
        this.postdata.TaskOwner=JSON.parse(localStorage.getItem('userId'));
        this.phone=JSON.parse(localStorage.getItem('phone'))
        this.getAllFundList();
        this.getProjectList();

    },methods:{
        handleSubmit(){
            addNewFundInvestTask(this.postdata).then(res=>{
                if(res.data.code==2410){
                    this.$Message.success({
                        content:'操作成功'
                    })
                }else{
                    this.$Message.error({
                        content:'操作失败:'+res.data.message
                    })
                }
            })

        },
       setDate(value){
           this.postdata.FundInvest.InvestDate=value;
       },
        getAllFundList(){
            getAllFundList({FundStatus:1,USerID:JSON.parse(localStorage.getItem('userId'))}).then(res=>{
                if(res.data.code==2405){
                    this.fundList=res.data.fundList
                }else{
                    this.$Message.error({
                        content:'基金列表加载失败:'+res.data.message
                    })
                }
            })
        },
        getProjectList(){
            getProjectList({"ProjectStatus":2,"USerID":JSON.parse(localStorage.getItem("userId"))}).then(res=>{
                    if(res.data.code==2307){
                        res.data.projectList.forEach(element => {
                            this.ProjectData.push({
                                label:element.clientCode+'--'+element.projectType+'--'+element.projectRole,
                                value:element.projectID
                            })
                        });
                       
                    }else{
                        this.$Message.error({
                            content:'项目列表数据加载失败：'+res.data.message
                        })
                    }
                })
        },
        getFundDetail(){    
            getFundDetail({FundID:this.postdata.FundInvest.FundID}).then(res=>{
                if(res.data.code==2406){
                        this.Fund={
                            FundID:0,
                            PlatformID:res.data.fund.platformID,//
                            FundName:res.data.fund.fundName,//
                            ShortName:res.data.fund.shortName,///
                            FundCode:res.data.fund.fundCode,//基金代码
                            CodsCode:res.data.fund.codsCode,//社会统一
                            RegSCode:res.data.fund.regSCode,//协会登记
                            RegType:res.data.fund.regType,//基金类型
                            Address:res.data.fund.address,//注册地址
                            RegDate:res.data.fund.regDate.substr(0,10),//注册日期
                            OpenDate:res.data.fund.openDate.substr(0,10),//成立日期
                            RecordDate:res.data.fund.recordDate.substr(0,10),//备案日期
                            EndDate:res.data.fund.endDate.substr(0,10),//终止日期
                            LiveStartDate:res.data.fund.liveStartDate,//存续开始日期
                            LiveEndDate:res.data.fund.liveEndDate,//存续结束日期
                            FundStatus:1
                        }
                       
                        this.geAllPlatformDetail(res.data.fund.platformID);
                }else{
                  
                    this.$Message.error({
                        content:'基金信息加载失败:'+res.data.message
                    })
                }
            })
        },geAllPlatformDetail(id){
            geAllPlatformDetail({"PlatformID":id}).then(res=>{
                if(res.data.code==2106){
                    // this.platformList;
                    this.platform=res.data.platform.shortName
                }else{
                     this.$Message.error({
                        content:"权属平台信息加载失败:"+res.data.message
                    })
                }
            })
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