
<template>
<!-- 基金执行会议 -->
    <div class="travel">
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
                                <Input v-model="postdata.IncoExpe.PayeeAccount"  placeholder="请输入收款账号"></Input>
                            </FormItem>   
                        </Col>

                         <Col span="8">
                             <FormItem label="开户行" prop="phone">
                                <Input v-model="postdata.IncoExpe.PayeeBank"  placeholder="请输入开户行"></Input>
                            </FormItem>   
                        </Col>
                          <Col span="8">
                            <FormItem label="附件张数" prop="phone">
                                <Input v-model="postdata.IncoExpe.InvoicePages"  placeholder="请输入附件张数"></Input>
                            </FormItem>   
                        </Col>
                    </Row>
                   
                </Form>
            </Card>
            <Card class="itemCard" >
                <p slot="title">费用列表</p>
                <Table stripe :columns="columnsCost" :data="dataCost"></Table>
                <Form :label-width="80" style="margin-top:10px;">
                    <Row>
                        <Col span="12">
                            <FormItem label="总计" prop="name">
                                {{postdata.IncoExpe.TotalAmount}}
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="总计" prop="name">
                                 {{postdata.IncoExpe.TotalAmountCN}}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
                 <p >
                    <Button type="primary" style="margin-right:8px;" @click="addCost">增加</Button>
                </p>

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
        <Modal
            v-model="flagMod"
            title="费用详情"
             width="700"
            @on-ok="asyncOK"
            @on-cancel="asyncCancel">
                <Form  :label-width="80">
                    <Row :gutter="8">
                          <Col span="12">
                            <FormItem label="前往日期">
                                <DatePicker :value="dataCost[edictIndex].OccurDate" type="date" @on-change="subOccurDate" show-week-numbers placeholder="请选择前往日期" style="width:100%;"></DatePicker>
                            </FormItem>
                          </Col> 
                          <Col span="12">
                            <FormItem label="返回日期">
                                <DatePicker :value="dataCost[edictIndex].ReturnDate" type="date" @on-change="subReturnDate" show-week-numbers placeholder="请选择返回日期" style="width:100%;"></DatePicker>
                            </FormItem>
                          </Col>  
                        <Col span="12">
                            <FormItem label="出发地">
                                <Input v-model="dataCost[edictIndex].FromCity" placeholder="请输入出发地"></Input>
                            </FormItem>
                          </Col>
                         
                          <Col span="12">
                            <FormItem label="到达地">
                                <Input v-model="dataCost[edictIndex].ToCity"   placeholder="请输入到达地"></Input>
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <FormItem label="天数">
                                <Input type="number" v-model="dataCost[edictIndex].TripDays" placeholder="请输入天数"></Input>
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <FormItem label="机车船费">
                                <Input type="number" v-model="dataCost[edictIndex]['101']" @on-blur="sumCost"   placeholder="请输入机车船费"></Input>
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <FormItem label="接驳费">
                                <Input type="number" v-model="dataCost[edictIndex]['102']" @on-blur="sumCost"  placeholder="请输入接驳费"></Input>
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <FormItem label="市内交通">
                                <Input  type="number" v-model="dataCost[edictIndex]['103']" @on-blur="sumCost" placeholder="请输入市内交通"></Input>
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <FormItem label="住宿费">
                                <Input type="number" v-model="dataCost[edictIndex]['104']" @on-blur="sumCost" placeholder="请输入住宿费"></Input>
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <FormItem label="伙食补助">
                                <Input type="number" v-model="dataCost[edictIndex]['105']" @on-blur="sumCost" placeholder="请输入伙食补助"></Input>
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <FormItem label="交通补助">
                                <Input type="number" v-model="dataCost[edictIndex]['106']" @on-blur="sumCost" placeholder="请输入交通补助"></Input>
                            </FormItem>
                          </Col>
                           <Col span="12">
                            <FormItem label="住宿补助">
                                <Input  type="number" v-model="dataCost[edictIndex]['107']" @on-blur="sumCost"  placeholder="请输入住宿补助"></Input>
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <FormItem label="其他">
                                <Input type="number" v-model="dataCost[edictIndex]['108']" @on-blur="sumCost" placeholder="请输入其他"></Input>
                            </FormItem>
                          </Col>  
                          <Col span="12">
                            <FormItem label="合计">
                                <Input  type="number" disabled v-model="dataCost[edictIndex].total" placeholder="自动计算合计"></Input>
                            </FormItem>
                          </Col>  
                    </Row>
                   
                </Form>


        </Modal>
            <upload-files ref="uploadModal"  @handleUploadFileEvent="handleUploadEvent"></upload-files>
        
    </div>
</template>
<script>
import UploadFiles from "@/view/components/upload_file/upload_file"
import {getProjectList,getAllUserList,setIncoexpeTask,getprogectType,getprogectRole} from "@/api/data"
import {digitUppercase} from "@/libs/tools"
// import changeTap from "@/view/components/template/change_tap.vue"
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
            flagMod:false,
            loading:false,
            flag:false,
            name:'',
            phone:'',
            ProjectID:'',
            edictIndex:0,
            userList:[],
            ProjectData:[],
            columnsCost:[
                {title: '前往日期', key: 'OccurDate',width:100},
                {title: '返回日期', key: 'ReturnDate',width:100},
                {title: '出发地', key: 'FromCity'},
                {title: '到达地', key: 'ToCity'},
                {title: '天数', key: 'TripDays'},
                {title: '机车船费', key: '101'},
                {title: '接驳费', key: '102'},
                {title: '市内交通', key: '103'},
                {title: '住宿费', key: '104'},
                {title: '伙食补助', key: '105'},
                {title: '交通补助', key: '106'},
                {title: '住宿补助', key: '107'},
                {title: '其他', key: '108'},
                {title: '合计', key: 'total',render:(h,params)=>{
                    if(params.row.FromCity=="合计"){
                        return h('')
                    }else{
                        return h('span',params.row['total'])
                    }
                }},
                {title: '操作', key: 'deal',render:(h,params)=>{
                        if(params.row.FromCity=="合计"){
                            return h('')
                        }else{
                            return h('div',[
                            h('span',{
                                    style:{color:"#2d8cf0",cursor:"pointer",marginRight:"8px"},
                                    on:{
                                        click:()=>{
                                            this.flagMod=true;
                                            this.edictIndex=params.index;
                                           
                                        }
                                    }
                                },'编辑'),
                                h('span',{
                                    style:{color:"#ed4014",cursor:"pointer"},
                                    on:{
                                        click:()=>{
                                            console.log(params);
                                            this.$Modal.warning({
                                                title:"删除",
                                                content:"确定删除此项？",
                                                onOk:()=>{
                                                    this.dataCost.splice(params.index,1)
                                                    let arr=this.dataCost[this.dataCost.length-1];
                                                    let lg=this.dataCost.length;

                                                    for (const key in arr) {
                                                        if (arr.hasOwnProperty(key)&&key!="OccurDate"&&key!="ReturnDate"&&key!="FromCity"&&key!="ToCity"&&key!="TripDays") {
                                                           arr[key]-=params.row[key]
                                                            
                                                        }
                                                    }
                                                    this.postdata.IncoExpe.TotalAmount=arr['total'];
                                                    this.postdata.IncoExpe.TotalAmountCN=digitUppercase(arr['total'])
                                                }
                                            })
                                            
                                        }
                                    }
                                },'删除')
                            ])
                        }
                    }
                },

            ],
     
            dataCost:[
                {OccurDate:'', ReturnDate:'',FromCity:'合计',ToCity:'',TripDays:'','101':0,'102':0,'103':0,'104':0,'105':0,'106':0,'107':0,'108':0,total:0}
           
            ],
            postdata:{
                TaskTypeId: TaskTypeID.TravelExpensesReport,
                TaskName: '',//任务名（UI中的报销单据要点）
                TaskSummary: '',//任务概要（UI中的备注）
                TaskOwner: '',//任务申请人ID，与User表的UserID对应，取自当前登录用户
                ProjectID: 0,//项目ID 
                IncoExpe: {//费用收入信息
                    IncoExpeID:0,//费用收入信息ID
                    IncoExpeType:100,//费用收入类别，100差旅费/200招待费/300一般费用/400外勤费用/500项目收入
                    PayeeID: '',//收款人ID，与用户表UserID对应，项目收入报告时为空
                    PayeeName: '',//收款人姓名（根据所选收款人自动获取）/收款单位（项目收入报告时使用）
                    PayeeBank: '',//收款银行（项目收入报告时使用）
                    PayeeAccount: '',//收款账号
                    TotalAmount: 0,//费用收入总金额
                    TotalAmountCN: '零',//费用收入总金额的中文表述
                    InvoicePages: 0,//单据附件张数
                    Details: [
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
        this.getAllUserList()
    },
    methods:{
        handleSubmit(){
            this.dataCost.forEach((element,index)=>{
                if(index!=this.dataCost.length-1){
                    this.postdata.IncoExpe.Details.push(
                        { "ID":"0","IncoExpeID":"0","Type":"101","OccurDate":element.OccurDate,"ReturnDate":element.ReturnDate,"FromCity":element.FromCity,"ToCity":element.ToCity,"TripDays":element.TripDays,"Amount":element['101']} ,//机车船费
                        { "ID":"0","IncoExpeID":"0","Type":"102","OccurDate":element.OccurDate,"ReturnDate":element.ReturnDate,"FromCity":element.FromCity,"ToCity":element.ToCity,"TripDays":element.TripDays,"Amount":element['102'] } ,//机场/码头/火车站往返费
                        { "ID":"0","IncoExpeID":"0","Type":"103","OccurDate":element.OccurDate,"ReturnDate":element.ReturnDate,"FromCity":element.FromCity,"ToCity":element.ToCity,"TripDays":element.TripDays,"Amount":element['103'] } ,//市内交通
                        { "ID":"0","IncoExpeID":"0","Type":"104","OccurDate":element.OccurDate,"ReturnDate":element.ReturnDate,"FromCity":element.FromCity,"ToCity":element.ToCity,"TripDays":element.TripDays,"Amount":element['104'] } ,//住宿费
                        { "ID":"0","IncoExpeID":"0","Type":"105","OccurDate":element.OccurDate,"ReturnDate":element.ReturnDate,"FromCity":element.FromCity,"ToCity":element.ToCity,"TripDays":element.TripDays,"Amount":element['105'] } ,//伙食补助
                        { "ID":"0","IncoExpeID":"0","Type":"106","OccurDate":element.OccurDate,"ReturnDate":element.ReturnDate,"FromCity":element.FromCity,"ToCity":element.ToCity,"TripDays":element.TripDays,"Amount":element['106'] } ,//交通补助
                        { "ID":"0","IncoExpeID":"0","Type":"107","OccurDate":element.OccurDate,"ReturnDate":element.ReturnDate,"FromCity":element.FromCity,"ToCity":element.ToCity,"TripDays":element.TripDays,"Amount":element['107'] } ,//住宿补助
                        { "ID":"0","IncoExpeID":"0","Type":"108","OccurDate":element.OccurDate,"ReturnDate":element.ReturnDate,"FromCity":element.FromCity,"ToCity":element.ToCity,"TripDays":element.TripDays,"Amount":element['108'] } ,//其他
                    )
                }
            })
            console.log(this.postdata)
            //未提交文件接口
            setIncoexpeTask(this.postdata).then(res=>{
                if(res.data.code=2501){
                    this.$Message.success({
                        content:"提交成功"
                    })
                }else{
                    this.$Message.error({
                        content:"操作失败:"+res.data.message
                    })
                }
            })
        },
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
        },getprogectType(){
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
        addCost(){
            this.flagMod=true;
            this.flag=true;
            this.dataCost.unshift({OccurDate:'', ReturnDate:'',FromCity:'',ToCity:'',TripDays:'','101':0,'102':0,'103':0,'104':0,'105':0,'106':0,'107':0,'108':0,total:0})
     
        },
        asyncCancel(){
            if(this.flag){
                this.dataCost.splice(0,1);
                this.flag=false
            }
        },
        sumCost(){
            var num=0;
            let obj= this.dataCost[this.edictIndex];
            obj.total=0;
            for (const key in obj) {
                if (obj.hasOwnProperty(key)&&key!="OccurDate"&&key!="ReturnDate"&&key!="FromCity"&&key!="ToCity"&&key!="TripDays"&&key!="total") {
                    obj[key]=parseFloat(obj[key])
                   obj.total+=parseFloat(obj[key])||0
                    
                }
            }
     
        },
        subOccurDate(value){
            this.dataCost[this.edictIndex].OccurDate=value;
        },
        subReturnDate(value){
            this.dataCost[this.edictIndex].ReturnDate=value;
        },
        asyncOK(){
            this.flag=false;
            var lg=this.dataCost.length;
            var arr=this.dataCost[lg-1];

            for (const key in arr) {
                if (arr.hasOwnProperty(key)&&key!="OccurDate"&&key!="ReturnDate"&&key!="FromCity"&&key!="ToCity"&&key!="TripDays") {
                    arr[key]=0;
                    this.dataCost.forEach((element,index)=>{
                        if(index!=lg-1){
                            arr[key]+=parseFloat(element[key])||0
                        }
                    })
                    
                }
            }
            this.postdata.IncoExpe.TotalAmount=arr['total'];
            this.postdata.IncoExpe.TotalAmountCN=digitUppercase(arr['total'])

        },setPayeeName(val){
            this.postdata.IncoExpe.PayeeID=val.value;
            this.postdata.IncoExpe.PayeeName=val.label;
        },
        deleteFile(index){
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
    .travel{
        width: 100%;
        height:100%;
        .itemCard{
            margin-bottom: 20px;
        }
    }
</style>