 
<template>
<!-- 项目收入费用-->
    <div class="wage">
            <Card class="itemCard">
                <p slot="title">基本信息</p>
                <Form :label-width="80">
                    <Row>
                        <Col span="8">
                            <FormItem label="标题" prop="name">
                                <Input disabled v-model="postdata.TaskName" placeholder="请输入标题"></Input>
                            </FormItem>
                        </Col> 
                        <Col span="8">
                            <FormItem label="填写人" prop="name">
                                {{name}}
                                <!-- <Input  v-model="" placeholder="请输入填写人"></Input> -->
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="发放月份" prop="name">
                                <Input  v-model="mon" placeholder="请输入发放月份"></Input>
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
                <p slot="title">请示信息</p>
                <Form :label-width="80">
                    <FormItem label="具体内容" prop="TaskSummary">
                        <Input v-model="postdata.TaskSummary" type="textarea" :autosize="{minRows: 10,maxRows: 15}" placeholder="请输入事项的具体内容"></Input>
                    </FormItem>
                     <FormItem>
                        <Button type="primary" @click="handleSubmit()">提交</Button>
                    </FormItem>
                </Form>   

            </Card> 
        
    </div>
</template>
<script>
import {TaskTypeID} from "@/libs/data"
import {getuserList,setPayWageTask} from "@/api/data"

export default {
    data(){
        return{
            name:'',
            phone:'',
            addNewMemberInfor:false,
            loadingMember:false,
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
        this.name=JSON.parse(localStorage.getItem('userName'));
        let date=new Date();
        let year=date.getFullYear();
        let mon=(date.getMonth()+1)>=10?(date.getMonth()+1):('0'+(date.getMonth()+1));
        this.mon=year+'-'+mon;
        this.postdata.TaskName=mon+'月工资发放单据';
        this.getuserList();

    },
    methods:{
        getuserList(){
            this.loadingMember=true;
            getuserList({"PageIndex":this.pageIndex,"PageSize":this.pageSize}).then(res=>{
                if(res.data.code==0){
                     this.loadingMember=false;
                    if(res.data.code==0){
                        res.data.userList.forEach(element => {
                            this.wagedata.unshift({
                                PayeeName:element.userName,
                                PayeeNameId:element.userId,
                                PayBase:element.payBase,
                                Pension_e:0,
                                Pension_c:0,
                                Housing_e:0,
                                Housing_c:0,
                                Medical_e:0,
                                PayAttendance:element.payAttendance,
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
                                PayHrcost:element.payHrcost
                            })
                        });

                        this.calculationLie();//列计算综合
                        this.calculationHang();
                    }
                }else{
                    this.loadingMember=false;
                    this.$Message.error({
                        content:'人员信息获取失败:'+res.data.message
                    })
                }
            })
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
        addNewInfor(){

        },handleSubmit(){
            this.postdata.PayDetails=[];
            this.postdata.TaskOwner=JSON.parse(localStorage.getItem("userId")) ;
            this.wagedata.forEach(element=>{
                if(element.PayeeName!="合计"){               
                    this.postdata.PayDetails.push({
                        ID:0,
                        TaskID:'0',
                        PayMonth:this.mon,
                        PayeeID:element.PayeeNameId,
                        PayeeName:element.PayeeName,
                        PayBase:element.PayBase,
                        PayAttendance:element.PayAttendance,
                        PayHrcost:element.PayHrcost,
                        Pension_e:element.Pension_e,
                        Pension_c:element.Pension_c,
                        Housing_e:element.Housing_e,
                        Housing_c:element.Housing_c,
                        Medical_e:element.Medical_e,
                        Medical_c:element.Medical_c,
                        Injury_e:element.Injury_e,
                        Injury_c:element.Injury_c,
                        Unemploy_e:element.Unemploy_e,
                        Unemploy_c:element.Unemploy_c,
                        Maternity_e:element.Maternity_e,
                        Maternity_c:element.Maternity_c,
                        Tax:element.Tax,
                        Absence:element.Absence,
                        PayReal:element.PayReal,
                        FieldCost:element.FieldCost,
                        PayCash:element.PayCash,
                        Remark:'aa'
                    })
                }
            })
            setPayWageTask(this.postdata).then(res=>{
                if(res.data.code==2601){
                    this.$Message.success({
                        content:"操作成功"
                    })
                }else{
                    this.$Message.error({
                        content:"提交失败:"+res.data.message
                    })
                }
            })


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
<style lang='less' >
    .wage{
        width: 100%;
        height:100%;
        .itemCard{
            margin-bottom: 20px;
        }
        .ivu-table-cell{
            padding-left: 9px;
            padding-right: 9px;
        }
        .ivu-table .demo-table-info-row td{
            background-color: #2db7f5;
            color: #000;
        }
        
    }
</style>