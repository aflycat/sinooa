<template>
    <div class="cost_wage">
           <Card  class="itemCard">
            <p slot="title">任务明细</p>
            <Form :label-width="80">
                <Row>
                     <Col span="12">
                        <FormItem label="任务编号：">
                            <b> {{postdata.TaskNumber}}</b>
                        </FormItem>
                    </Col>
                     <Col span="12">
                        <FormItem label="发放月份：" >
                           <b>{{postdata.PayDetails[0].payMonth.substr(0,7)||''}}</b>
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="事项要点：">
                            <b>{{postdata.TaskName}}</b>
                        </FormItem>
                    </Col>
                   
                    <Col span="12">
                        <FormItem label="报送人：">
                            <b>{{postdata.TaskOwnerName}}</b>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="联系电话：">
                           <b>{{ postdata.TaskOwnerPhone}}</b>
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="报送内容：">
                           <b> {{postdata.TaskSummary}}</b>
                        </FormItem>
                    </Col>
                    
                </Row>
                 </Form>    
        </Card>
            <Card class="itemCard">
                <p slot="title">人员列表</p>
                <Table border stripe :row-class-name="rowClassName"  height="600" ref="selection"  :loading="loadingMember" :columns="wagecolumns" :data="wagedata"></Table>
                <p style="margin-top:20px;">
                    <Button type="primary" style="margin-right:15px;" @click="downloadWageTable()">导出</Button>
                </p>
                
            </Card>
            <Card  class="itemCard">
                <p slot="title">审批进度</p>
                    <Form :label-width="80">
                        <Timeline>
                            <template v-for="(item,index) in postdata.TaskFlows">

                                <TimelineItem  :color="item.flowStatus==1?'#19be6b':'#515a6e'"  :key="index">
                                    <p >{{item.flowDoneDate.replace("T"," ").substr(0,16)}}   <Divider type="vertical" />
                                        {{item.flowSummary}}  <Divider type="vertical" />
                                        {{item.flowOwnerName}} <Divider type="vertical" />
                                        {{item.flowEmail}}
                                    </p>
                                    <p class="content">{{item.flowComment||''}}</p>
                                </TimelineItem>
                            </template>
                        </Timeline>
                    </Form>    
            </Card>
             <Card  class="itemCard">
                <p slot="title">审批意见</p>
                <Form :label-width="80">
                    <FormItem label="具体内容" >
                        <Input  type="textarea" v-model="postdata.TaskSummary" :autosize="{minRows: 10,maxRows: 15}" placeholder="请输入事项的具体内容"></Input>
                    </FormItem>
                    
                     <FormItem>
                        <Button style="margin-right: 8px" type="primary" :loading="loading"  @click="handleSubmitAgree()">
                            <span v-if="!loading">同意</span>
                            <span v-else>提交中...</span>
                        </Button> 
                        <Button :loading="loading2" @click="handleSubmitDisgree()"  style="margin-right: 8px" type="error">
                            <span v-if="!loading">不同意</span>
                            <span v-else>提交中...</span>
                        </Button>     
                    </FormItem>
                </Form>   

            </Card>
            

    </div>
</template>
<script>
import {TaskTypeID} from "@/libs/data"
import {getuserList,setPayWageTask,getPayDetail} from "@/api/data"

export default {
     props:{
       taskFlowID:String,
        taskID:String,
        taskTypeID:String
    },
    data(){
        return{
            name:'',
            phone:'',
            addNewMemberInfor:false,
            loadingMember:false,
            loading:false,
            loading2:false,
            wagecolumns:[
                // {type: 'selection',width: 60, align: 'center',fixed:'left'},
                {title: '姓名', align: 'center',key:'PayeeName',fixed:'left',width:100},
                {title: '基本工资', key: 'PayBase',fixed:'left',width:85},
                {title: '考勤补贴', key: 'PayAttendance',fixed:'left',width:85},
                {title: '养老-个人', key: 'Pension_e',width:85,render:(h,params)=>{
                    if(params.row.PayeeName=='合计'){
                        return h('div',[
                            h('span',params.row.Pension_e)
                        ])
                    }else{
                        return h('div',[
                            h('Input',{
                                style:{
                                    width:'100%'
                                },
                                props:{
                                    value:params.row.Pension_e
                                },
                                on:{
                                    'on-blur':(val)=>{
                                        this.wagedata[params.index].Pension_e=parseFloat(val.target.value);
                                        this.calculationHang();//行综合计算
                                        // this.calculationLie();//列计算综合
                                    }
                                }
                            })
                        ])
                    }
                }},
                {title: '养老-单位', key: 'Pension_c',width:85,render:(h,params)=>{
                      if(params.row.PayeeName=='合计'){
                        return h('div',[
                            h('span',params.row.Pension_c)
                        ])
                    }else{

                        return h('div',[
                            h('Input',{
                                style:{
                                    width:'100%'
                                },
                                props:{
                                    value:params.row.Pension_c
                                },
                                on:{
                                    'on-blur':(val)=>{
                                        this.wagedata[params.index].Pension_c=parseFloat(val.target.value);
                                        this.calculationHang();//行综合计算
                                        // this.calculationLie();//列计算综合

                                    }
                                }
                            })
                        ])
                    }
                }}, {title: '住房-个人', key: 'Housing_e',width:85,render:(h,params)=>{
                      if(params.row.PayeeName=='合计'){
                        return h('div',[
                            h('span',params.row.Housing_e)
                        ])
                    }else{
                        return h('div',[
                            h('Input',{
                                style:{
                                    width:'100%'
                                },
                                props:{
                                    value:params.row.Housing_e
                                },
                                on:{
                                    'on-blur':(val)=>{
                                        this.wagedata[params.index].Housing_e=parseFloat(val.target.value);
                                        this.calculationHang();//行综合计算
                                        // this.calculationLie();//列计算综合

                                    }
                                }
                            })
                        ])
                    }
                }},
                {title: '住房-单位', key: 'Housing_c',width:85,render:(h,params)=>{
                      if(params.row.PayeeName=='合计'){
                        return h('div',[
                            h('span',params.row.Housing_c)
                        ])
                    }else{
                        return h('div',[
                            h('Input',{
                                style:{
                                    width:'100%'
                                },
                                props:{
                                    value:params.row.Housing_c
                                },
                                on:{
                                    'on-blur':(val)=>{
                                        this.wagedata[params.index].Housing_c=parseFloat(val.target.value);
                                        this.calculationHang();//行综合计算
                                        // this.calculationLie();//列计算综合

                                    }
                                }
                            })
                        ])
                    }
                }}, {title: '医疗-个人', key: 'Medical_e',width:85,render:(h,params)=>{
                      if(params.row.PayeeName=='合计'){
                        return h('div',[
                            h('span',params.row.Medical_e)
                        ])
                    }else{
                        return h('div',[
                            h('Input',{
                                style:{
                                    width:'100%'
                                },
                                props:{
                                    value:params.row.Medical_e
                                },
                                on:{
                                    'on-blur':(val)=>{
                                        this.wagedata[params.index].Medical_e=parseFloat(val.target.value);
                                        this.calculationHang();//行综合计算
                                        // this.calculationLie();//列计算综合

                                    }
                                }
                            })
                        ])
                    }
                }},
                {title: '医疗-单位', key: 'Medical_c',width:85,render:(h,params)=>{
                      if(params.row.PayeeName=='合计'){
                        return h('div',[
                            h('span',params.row.Medical_c)
                        ])
                    }else{
                        return h('div',[
                            h('Input',{
                                style:{
                                    width:'100%'
                                },
                                props:{
                                    value:params.row.Medical_c
                                },
                                on:{
                                    'on-blur':(val)=>{
                                        this.wagedata[params.index].Medical_c=parseFloat(val.target.value);
                                        this.calculationHang();//行综合计算
                                        // this.calculationLie();//列计算综合

                                    }
                                }
                            })
                        ])
                    }
                }}, {title: '工伤-个人', key: 'Injury_e',width:85,render:(h,params)=>{
                    if(params.row.PayeeName=='合计'){
                        return h('div',[
                            h('span',params.row.Injury_e)
                        ])
                    }else{
                        return h('div',[
                            h('Input',{
                                style:{
                                    width:'100%'
                                },
                                props:{
                                    value:params.row.Injury_e
                                },
                                on:{
                                    'on-blur':(val)=>{
                                        this.wagedata[params.index].Injury_e=parseFloat(val.target.value);
                                        this.calculationHang();//行综合计算
                                        // this.calculationLie();//列计算综合

                                    }
                                }
                            })
                        ])
                    }
                }},
                {title: '工伤-单位', key: 'Injury_c',width:85,render:(h,params)=>{
                      if(params.row.PayeeName=='合计'){
                        return h('div',[
                            h('span',params.row.Injury_c)
                        ])
                    }else{
                        return h('div',[
                            h('Input',{
                                style:{
                                    width:'100%'
                                },
                                props:{
                                    value:params.row.Injury_c
                                },
                                on:{
                                    'on-blur':(val)=>{
                                        this.wagedata[params.index].Injury_c=parseFloat(val.target.value);
                                        this.calculationHang();//行综合计算
                                        // this.calculationLie();//列计算综合

                                    }
                                }
                            })
                        ])
                    }
                }}, {title: '失业-个人', key: 'Unemploy_e',width:85,render:(h,params)=>{
                      if(params.row.PayeeName=='合计'){
                        return h('div',[
                            h('span',params.row.Unemploy_e)
                        ])
                    }else{
                        return h('div',[
                            h('Input',{
                                style:{
                                    width:'100%'
                                },
                                props:{
                                    value:params.row.Unemploy_e
                                },
                                on:{
                                    'on-blur':(val)=>{
                                        this.wagedata[params.index].Unemploy_e=parseFloat(val.target.value);
                                        this.calculationHang();//行综合计算
                                        // this.calculationLie();//列计算综合

                                    }
                                }
                            })
                        ])
                    }
                }},
                {title: '失业-单位', key: 'Unemploy_c',width:85,render:(h,params)=>{
                      if(params.row.PayeeName=='合计'){
                        return h('div',[
                            h('span',params.row.Unemploy_c)
                        ])
                    }else{
                        return h('div',[
                            h('Input',{
                                style:{
                                    width:'100%'
                                },
                                props:{
                                    value:params.row.Unemploy_c
                                },
                                on:{
                                    'on-blur':(val)=>{
                                        this.wagedata[params.index].Unemploy_c=parseFloat(val.target.value);
                                        this.calculationHang();//行综合计算
                                        // this.calculationLie();//列计算综合

                                    }
                                }
                            })
                        ])
                    }
                }}, {title: '生育-个人', key: 'Maternity_e',width:85,render:(h,params)=>{
                      if(params.row.PayeeName=='合计'){
                        return h('div',[
                            h('span',params.row.Maternity_e)
                        ])
                    }else{
                        return h('div',[
                            h('Input',{
                                style:{
                                    width:'100%'
                                },
                                props:{
                                    value:params.row.Maternity_e
                                },
                                on:{
                                    'on-blur':(val)=>{
                                        this.wagedata[params.index].Maternity_e=parseFloat(val.target.value);
                                        this.calculationHang();//行综合计算
                                        // this.calculationLie();//列计算综合

                                    }
                                }
                            })
                        ])
                    }
                }},
                {title: '生育-单位', key: 'Maternity_c',width:85,render:(h,params)=>{
                      if(params.row.PayeeName=='合计'){
                        return h('div',[
                            h('span',params.row.Maternity_c)
                        ])
                    }else{
                        return h('div',[
                            h('Input',{
                                style:{
                                    width:'100%'
                                },
                                props:{
                                    value:params.row.Maternity_c
                                },
                                on:{
                                    'on-blur':(val)=>{
                                        this.wagedata[params.index].Maternity_c=parseFloat(val.target.value);
                                        this.calculationHang();//行综合计算
                                        // this.calculationLie();//列计算综合

                                    }
                                }
                            })
                        ])
                    }
                }},
                {title: '所得税', key: 'Tax',width:85,render:(h,params)=>{
                      if(params.row.PayeeName=='合计'){
                        return h('div',[
                            h('span',params.row.Tax)
                        ])
                    }else{
                        return h('div',[
                            h('Input',{
                                style:{
                                    width:'100%'
                                },
                                props:{
                                    value:params.row.Tax
                                },
                                on:{
                                    'on-blur':(val)=>{
                                        this.wagedata[params.index].Tax=parseFloat(val.target.value);
                                        this.calculationHang();//行综合计算
                                        // this.calculationLie();//列计算综合

                                    }
                                }
                            })
                        ])
                    }
                }},
                {title: '考勤扣款', key: 'Absence',width:85,fixed:'right',render:(h,params)=>{
                      if(params.row.PayeeName=='合计'){
                        return h('div',[
                            h('span',params.row.Absence)
                        ])
                    }else{
                        return h('div',[
                            h('Input',{
                                style:{
                                    width:'100%'
                                },
                                props:{
                                    value:params.row.Absence
                                },
                                on:{
                                    'on-blur':(val)=>{
                                        this.wagedata[params.index].Absence=parseFloat(val.target.value);
                                        this.calculationHang();//行综合计算
                                        // this.calculationLie();//列计算综合

                                    }
                                }
                            })
                        ])
                    }
                }},
                {title: '实发工资', key: 'PayReal',width:85,fixed:'right'},
                {title: '外勤费用', key: 'FieldCost',width:85,fixed:'right'},
                {title: '现金工资', key: 'PayCash',width:85,fixed:'right'},
                {title: '人力成本', key: 'PayHrcost',width:85,fixed:'right'}
                

            ],
            wagedata:[
                {
                    PayeeName:'合计',PayBase:0,Pension_e:0,Pension_c:0,Housing_e:0,Housing_c:0,
                    Medical_e:0,PayAttendance:0,Medical_c:0,Injury_e:0,Injury_c:0, Unemploy_e:0,
                    Unemploy_c:0,Maternity_e:0,Maternity_c:0,Tax:0,Absence:0,PayReal:0,FieldCost:0,
                    PayCash:0,PayHrcost:0,
                }
            ],
            postdata:{
                TaskTypeID: TaskTypeID.WageExpenses,
                TaskName: '',//任务名（UI中的报销单据要点）
                TaskSummary: '',//任务概要（UI中的备注）
                TaskOwner: '',//任务申请人ID，与User表的UserID对应，取自当前登录用户
                PayDetails: [

                ]
            },
            newWageInfor:{
                PayeeName:'',
                PayeeNameId:'',
                PayBase:0,
                Pension_e:0,
                Pension_c:0,
                Housing_e:0,
                Housing_c:0,
                Medical_e:0,
                PayAttendance:0,
                Medical_c:0,
                Injury_e:0,
                Injury_c:0,
                Unemploy_e:0,
                Unemploy_c:0,
                Maternity_e:0,
                Maternity_c:0,
                Tax:0,
                Absence:0,
                PayReal:0,
                FieldCost:0,
                PayCash:0,
                PayHrcost:0
            },
            dataOrigin:[],
            mon:'',
            pageIndex:1,
            pageSize:100
        }
    },
    mounted(){
       
        let date=new Date();
        let year=date.getFullYear();
        let mon=(date.getMonth()+1)>=10?(date.getMonth()+1):('0'+(date.getMonth()+1));
        this.mon=year+'-'+mon;
        // this.getuserList();
        this.getTaskDetail()

    },
    methods:{
        getTaskDetail(){
             getPayDetail({TaskID:this.taskID}).then(res=>{
                 if(res.data.code==2602){
                    this.postdata={
                        TaskTypeId: res.data.taskTypeID,
                        TaskName: res.data.taskName,//任务名（UI中的报销单据要点）
                        TaskSummary: res.data.taskSummary,//任务概要（UI中的备注）
                        TaskOwner: res.data.taskOwner,//任务申请人ID，与User表的UserID对应，取自当前登录用户
                        TaskFlows: res.data.taskFlows,
                        TaskFiles: res.data.taskFiles,
                        TaskNumber: res.data.taskNumber,
                        TaskOwnerName: res.data.taskOwnerName,
                        TaskOwnerPhone:res.data.taskOwnerPhone,
                        PayDetails:res.data.payDetails
                    }
                    this.loadTableData(res.data.payDetails)
                 }else{
                     this.$Message.error({
                        content:'获取任务信息失败：'+res.data.message
                     })
                 }
             })
        },
         loadTableData(dat){
            let temp=this.wagedata[this.wagedata.length-1];
            dat.forEach(element => {
                let obj={
                    PayeeName:element.payeeName,
                    PayBase:element.payBase,
                    PayAttendance:element.payAttendance,
                    Pension_e:element.pension_e,
                    Pension_c:element.pension_c,
                    Housing_e:element.housing_e,
                    Housing_c:element.housing_c,
                    Medical_e:element.medical_e,
                    Medical_c:element.medical_c,
                    Injury_e:element.injury_e,
                    Injury_c:element.injury_c,
                    Unemploy_e:element.unemploy_e,
                    Unemploy_c:element.unemploy_c,
                    Maternity_e:element.maternity_e,
                    Maternity_c:element.maternity_c,
                    Tax:element.tax,
                    Absence:element.absence,
                    PayReal:element.payReal,
                    FieldCost:element.fieldCost,
                    PayCash:element.payCash,
                    PayHrcost:element.payHrcost
                }
                this.wagedata.unshift(obj)
            });
             this.calculationHang();
        },
       
        calculationHang(){
            this.wagedata.forEach(element=>{
                if(element.PayeeName!="合计"){
                    //社保个人
                    let socialPersonal=element.Pension_e+element.Housing_e+element.Medical_e+element.Injury_e+element.Unemploy_e+element.Maternity_e;

                    //社保公司
                    let socialCompany=element.Pension_c+element.Housing_c+element.Medical_c+element.Injury_c+element.Unemploy_c+element.Maternity_c;

                    //实发工资=基本工资+考勤补贴-五险一金中的个人-所得税-考勤扣款
                    let PayReal=element.PayReal=element.PayBase+element.PayAttendance-socialPersonal-element.Tax-Math.abs(element.Absence);

                    //外勤费用=人力成本-实发工资-单位和个人社保-所得税-考勤扣款
                    let FieldCost=element.FieldCost=element.PayHrcost-PayReal-socialPersonal-socialCompany-element.Tax-Math.abs(element.Absence);

                    //现金工资=实发+外勤
                    let PayCash=element.PayCash=PayReal+FieldCost;
                }
            })
            this.calculationLie();//列计算综合
            
        }, calculationLie(){
            //计算表格的列数据综合，最后一行是总计
            let all=this.wagedata;
            var calCulationResult=this.wagedata[this.wagedata.length-1];
            for (const key in this.newWageInfor) {
                if (key!='PayeeNameId'&&key!='PayeeName') {
                    calCulationResult[key]=0;
                    for(var i=0;i<=(this.wagedata.length-2);i++){                      
                        calCulationResult[key]+=this.wagedata[i][key];
                   }
                }
           }
        },
        handleSubmit(){
            // this.postdata.PayDetails=[];
            // this.postdata.TaskOwner=JSON.parse(localStorage.getItem("userId")) ;
            // this.wagedata.forEach(element=>{
            //     if(element.PayeeName!="合计"){               
            //         this.postdata.PayDetails.push({
            //             ID:0,
            //             TaskID:'0',
            //             PayMonth:this.mon,
            //             PayeeID:element.PayeeNameId,
            //             PayeeName:element.PayeeName,
            //             PayBase:element.PayBase,
            //             PayAttendance:element.PayAttendance,
            //             PayHrcost:element.PayHrcost,
            //             Pension_e:element.Pension_e,
            //             Pension_c:element.Pension_c,
            //             Housing_e:element.Housing_e,
            //             Housing_c:element.Housing_c,
            //             Medical_e:element.Medical_e,
            //             Medical_c:element.Medical_c,
            //             Injury_e:element.Injury_e,
            //             Injury_c:element.Injury_c,
            //             Unemploy_e:element.Unemploy_e,
            //             Unemploy_c:element.Unemploy_c,
            //             Maternity_e:element.Maternity_e,
            //             Maternity_c:element.Maternity_c,
            //             Tax:element.Tax,
            //             Absence:element.Absence,
            //             PayReal:element.PayReal,
            //             FieldCost:element.FieldCost,
            //             PayCash:element.PayCash,
            //             Remark:' '
            //         })
            //     }
            // })
            // setPayWageTask(this.postdata).then(res=>{
            //     if(res.data.code==2601){
            //         this.$Message.success({
            //             content:"操作成功"
            //         })
            //     }else{
            //         this.$Message.error({
            //             content:"提交失败:"+res.data.message
            //         })
            //     }
            // })


        },
        deleteWageMember(){
            let dat=this.$refs['selection'].getSelection(); 
        },
        downloadWageTable(){
            //导出表格
            this.$refs.selection.exportCsv({
                filename:this.mon+"工资表格导出",

            })
        },
        addNewWageModal(){
            //显示新增人员数据modal
            this.addNewMemberInfor=true;
        },rowClassName(row,index){
            // console.log(row)
            if(row.PayeeName=="合计"){
                 return 'demo-table-info-row';
            }
        }
    }
}
</script>
