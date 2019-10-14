<template>
    <div class="weekly">
        <Card class="itemCard">
           <p slot="title">基本信息</p>
           <Form :label-width="100">
               <Row>
                   <Col :span="16">
                        <FormItem label="标题">
                             <Input v-model="postData.Title"   disabled placeholder="请输入周报标题"></Input>
                        </FormItem>
                   </Col>
                  
               </Row>
                <Row>
                   <Col :span="8">
                        <FormItem label="填写人">
                             <Input v-model="name" disabled placeholder="请输入填写人"></Input>
                        </FormItem>
                   </Col>
                   <!-- <Col :span="8">
                        <FormItem label="级别">
                             <Input  placeholder="请输入级别"></Input>
                        </FormItem>
                   </Col> -->
                   <Col :span="8">
                        <FormItem label="周报期间">
                            <Select @on-change="changeTime" label-in-value v-model="selectModel">
                                <Option v-for="item in timeList" :value="item.value" :key="item.value">{{item.label}}</Option>
                            </Select>
                        </FormItem>
                   </Col>
               </Row>
            </Form>  
        </Card>
        <weekly-com :postData="showData" v-if="!showSubmit"></weekly-com>

        <Card  class="itemCard" v-if="showSubmit">
            <p slot="title">本周工作</p>
            <Form :label-width="100" :model="postData" :rules="ruleValidate"  ref="postData1" >
                    <FormItem label="本周工作"  prop="ThisEffect">
                            <Input v-model="postData.ThisEffect"  placeholder="请输入本周工作" type="textarea" :autosize="{minRows:5,maxRows: 15}"></Input>
                    </FormItem>
            </Form>  
        </Card> 
        <Card  class="itemCard" v-if="showSubmit">
            <p slot="title">下周工作</p>
            <Form :label-width="100" :model="postData" :rules="ruleValidate" ref="postData2" >
                    <FormItem label="下周工作" prop="NextPlan">
                            <Input  v-model="postData.NextPlan" placeholder="请输入下周工作" type="textarea" :autosize="{minRows:5,maxRows: 15}"></Input>
                </FormItem>
            </Form>  
        </Card> 
         <Card  class="itemCard" v-if="showSubmit">
            <p slot="title">
                工时填报 <span style="color:#ed4014;font-size:12px;" >(具体工时请填写整数)</span>
            </p>
            <a href="#" slot="extra" @click.prevent="exampleStandard">
               标准工时参考
            </a>
            <Table stripe :columns="columnsWork" :data="dataWork"></Table>
            <Form  style="margin-top:20px;">
                 <FormItem>
                    <Button type="success" style="margin-right:8px;" @click="addNewLine()">新增</Button>
                                  
                </FormItem>
            </Form>
             <Form  style="margin-top:20px;">
                 <FormItem>
                    <Button type="primary" :loading="loading2" style="margin-right:8px;" @click="submit(2)">
                        <span v-if="!loading2">提交</span>
                        <span v-else>提交...</span>
                    </Button>
                    <Button type="default" :loading="loading1" @click="submit(1)">
                        <span v-if="!loading1">存为草稿</span>
                        <span v-else>储存中...</span> 
                    </Button> 
                </FormItem>
            </Form>
        </Card> 
        <hours-standard ref="hoursModal"></hours-standard>
    </div>
</template>
<script>
import store from '@/store'
import {getProjectList,getworkWeekHistory} from "@/api/data"
import {workWeekSubmit} from "@/api/user"
import weeklyCom from "@/view/components/template/weekly.vue"
import hoursStandard from "@/view/components/template/work_hours_stanard.vue"

export default {
    components:{
        weeklyCom,
        hoursStandard
    },
    data (){
        return{
            selectModel:'1',
            loading1:false,
            loading2:false,
            columnsWork:[
                {title:"工作事项",key:"Describe",width:200,render:(h,params)=>{
                    if(params.row.Describe=="合计"){
                        return h('div',[
                            h('span',{
                                style:{
                                    color:"#2b85e4"
                                }
                            },'合计')
                        ])
                    }else{
                        return h('div',[
                            h('Input',{
                                props:{
                                    value:this.dataWork[params.index].Describe
                                    // params.row.Describe
                                },
                                on:{
                                    'on-blur':(event)=>{
                                        this.dataWork[params.index].Describe=event.target.value;
                                    }
                                }
                            })
                        ])
                    }
                  
                }},
                {title:"周一",key:"Time1",render:(h,params)=>{
                    
                    if(params.row.Describe!="合计"){
                        return h('div',[
                            h('Input',{
                                props:{
                                    type:"number",
                                    value:this.dataWork[params.index].Time1
                            
                                },
                                on:{
                                    'on-blur':(value)=>{
                                        this.calcSum(value.target.value,'Time1',params)
                                    }
                                }
                            })
                        ])
                    }else{
                        return h('span',params.row.Time1)
                        
                    }
                }},
                {title:"周二",key:"Time2",render:(h,params)=>{
                      if(params.row.Describe!="合计"){
                        return h('div',[
                            h('Input',{
                                props:{
                                    type:"number",
                                    value:this.dataWork[params.index].Time2
                                },
                                    on:{
                                        'on-blur':(value)=>{
                                            this.calcSum(value.target.value,'Time2',params)
                                        }
                                    }
                            })
                        ])
                    }else{
                        return h('span',params.row.Time2)
                        
                    }
                }},
                {title:"周三",key:"Time3",render:(h,params)=>{
                      if(params.row.Describe!="合计"){
                        return h('div',[
                            h('Input',{
                                props:{
                                    type:"number",
                                    value:this.dataWork[params.index].Time3
                                },
                                    on:{
                                        'on-blur':(value)=>{
                                            this.calcSum(value.target.value,'Time3',params)
                                        }
                                    }
                            })
                        ])
                        }else{
                            return h('span',params.row.Time3)
                        
                    }
                }},
                {title:"周四",key:"Time4",render:(h,params)=>{
                      if(params.row.Describe!="合计"){
                        return h('div',[
                            h('Input',{
                                props:{
                                    type:"number",
                                    value:this.dataWork[params.index].Time4
                                },
                                    on:{
                                        'on-blur':(value)=>{
                                            this.calcSum(value.target.value,'Time4',params)
                                        }
                                    }
                            })
                        ])
                        }else{
                        return h('span',params.row.Time4)
                        
                    }
                }},
                {title:"周五",key:"Time5",render:(h,params)=>{
                      if(params.row.Describe!="合计"){
                        return h('div',[
                            h('Input',{
                                props:{
                                    type:"number",
                                    value:this.dataWork[params.index].Time5
                                },
                                    on:{
                                        'on-blur':(value)=>{
                                            this.calcSum(value.target.value,'Time5',params)
                                        }
                                    }
                            })
                        ])
                        }else{
                        return h('span',params.row.Time5)
                        
                    }
                }},
                {title:"周六",key:"Time6",render:(h,params)=>{
                      if(params.row.Describe!="合计"){
                        return h('div',[
                            h('Input',{
                                props:{
                                    type:"number",
                                    value:this.dataWork[params.index].Time6
                                },
                                    on:{
                                        'on-blur':(value)=>{
                                            this.calcSum(value.target.value,'Time6',params)
                                        }
                                    }
                            })
                        ])
                        }else{
                        return h('span',params.row.Time6)
                        
                    }
                }},
                {title:"周日",key:"Time7",render:(h,params)=>{
                      if(params.row.Describe!="合计"){
                        return h('div',[
                            h('Input',{
                                props:{
                                    type:"number",
                                    value:this.dataWork[params.index].Time7
                                },
                                    on:{
                                        'on-blur':(value)=>{
                                            this.calcSum(value.target.value,'Time7',params)
                                        }
                                    }
                            })
                        ])
                        }else{
                        return h('span',params.row.Time7)
                        
                    }
                }},
                {title:"合计",key:"TimeSum",render:(h,params)=>{
                      if(params.row.Describe!="合计"){
                            return h('div',[
                                h('span',params.row.TimeSum)
                            ])
                        }else{
                            return h('span',params.row.TimeSum)
                        }
                }},
                {title:"工时费用",key:"Fee",render:(h,params)=>{
                    if(params.row.Describe!="合计"){
                        return h('div',[
                            h('Input',{
                                props:{
                                    type:"number",
                                    value:this.dataWork[params.index].Fee
                                },
                                on:{
                                    'on-blur':(e)=>{
                                        this.dataWork[params.index].Fee=e.target.value;
                                    }
                                }
                            })
                        ])
                    }
                }},

                {title:"客户简称",key:"ProjectId",width:200,render:(h,params)=>{

                    if(params.row.Describe!="合计"){
                        return h('Select', {
                            props: {
                                value: params.row.ProjectId, // 获取选择的下拉框的值
                                
                            },
                            on: {
                                'on-change': e => {
                                    params.row.ProjectId = e // 改变下拉框赋值
                                    this.dataWork[params.index].ProjectId=e
                                }
                            }
                            }, this.proList.map((item) => { 
                                return h('Option', { // 下拉框的值
                                    props: {
                                        value: item.value,
                                         label: item.label
                                    }
                                })
                        }))


                    }
                   
                    }
                },

                {title:"操作",key:"deal",render:(h,params)=>{
                    if(params.row.Describe!="合计"){
                        return h('div',[
                            h('span',{
                                style:{
                                    color:"#ed4014",
                                    cursor:"pointer"
                                },on:{
                                    click:()=>{
                                        this.dataWork.splice(params.index,1);
                                        let num= this.dataWork[this.dataWork.length-1];
                                        for (const key in this.dataWork[0]) {
                                            if (this.dataWork[0].hasOwnProperty(key)&&key!="thing"&&key!="Fee") {
                                                 num[key]= (num[key]-params.row[key])
                                            }
                                        }
                                    }
                                }
                            },'删除')
                        ])
                    }
                }},
            ],
            dataWork:[ 
                {Describe:"合计",Time1:0,Time2:0,Time3:0,Time4:0,Time5:0,Time6:0,Time7:0,TimeSum:0,Fee:0,ProjectId:""}
            ],
            now:null,
            nowDayOfWeek:null,
            nowDay:null,
            nowMonth:null,
            nowYear:null,
            timeList:[],
            proList:[],
            ruleValidate:{
                NextPlan:[ {required: true, message: '内容不能为空', trigger: 'blur'}],
                ThisEffect:[ {required: true, message: '内容不能为空', trigger: 'blur'}]
            },
            name:'',
            count:0,
            postData:{
                EndTime: "",//结束时间
                Items: [],
                NextPlan: "",//下周计划
                StartTime: "",//开始时间
                State: 1,//1草稿2已提交3已审核
                TaskTypeId: 23,//任务id
                ThisEffect: "",//本周成果
                Title: "",//标题
                UserId: "",//用户id
                UserLevel: ""//用户职级,
            },
            showData:null,
            showSubmit:true
        }
    },beforeMount(){
        this.getProList()
    },
    mounted(){
        this.now=new Date();
        this.nowDayOfWeek=this.now.getDay();
        this.nowDay=this.now.getDate();
        this.nowMonth=this.now.getMonth();
        this.nowYear=this.now.getYear();
        this.nowYear += (this.nowYear < 2000) ? 1900 : 0;
        this.timeList=[
            {
                label:this.getWeekStartDate()+'至'+this.getWeekEndDate(),
                value:"1"
            },
             {
                label:this.getLastWeekStartDate()+'至'+this.getLastWeekEndDate(),
                value:"2"
            },
             {
                label:this.getLast2WeekStartDate()+'至'+this.getLast2WeekEndDate(),
                value:"3"
            }
        ]

        this.postData.Title=JSON.parse(localStorage.getItem("userName"))+'-工时周报('+this.timeList[0].label+')';
        this.postData.StartTime=this.getWeekStartDate();
        this.postData.EndTime=this.getWeekEndDate();

        this.postData.UserId=JSON.parse(localStorage.getItem("userId"));
        this.name=JSON.parse(localStorage.getItem("userName"));

        this.getworkWeekHistory()
    },
    methods:{
           //bug新添加一项事项数组首项添加数组，数据为0，但是
        calcSum(value,key,params){
            
            this.dataWork[params.index][key]=value
            //计算纵向的和
            let all=0;
            this.dataWork.forEach(element => {
                if(element.thing!="合计"){
                    all+=parseInt(element[key])||0
                }
            });
            this.dataWork[this.dataWork.length-1][key]=all;
            //计算横向的和
            this.dataWork.forEach((element,index) => {
                 var sum=0
                for (const key in element) {
                    if (element.hasOwnProperty(key)&&key!="Describe"&&key!="Fee"&&key!="TimeSum"){
                        sum+=parseInt(element[key])||0;
                    }
                }
                this.dataWork[index].TimeSum=sum;
            });
        },
        changeTime(value){
            this.postData.StartTime=value.label.split("至")[0]
            this.postData.EndTime=value.label.split("至")[1]
            this.postData.Title=JSON.parse(localStorage.getItem("userName"))+'-工时周报('+value.label+')';
            this.getworkWeekHistory();
        },
        addNewLine(){
            this.count++;
            this.dataWork.unshift(
                {Describe:"",Time1:0.00,Time2:0.00,Time3:0.00,Time4:0.00,Time5:0.00,Time6:0.00,Time7:0.00,TimeSum:0.00,Fee:0.00,ProjectId:""}
            )
    
        },submit(type){
            this.postData.State=type;
            this.dataWork.forEach(element=>{
                if(element.Describe!="合计"){
                    this.postData.Items.push({
                        Describe:element.Describe,
                        Time1:element.Time1,
                        Time2:element.Time2,
                        Time3:element.Time3,
                        Time4:element.Time4,
                        Time5:element.Time5,
                        Time6:element.Time6,
                        Time7:element.Time7,
                        TimeSum:element.TimeSum,
                        Fee:element.Fee,
                        ProjectId:element.ProjectId
                    })
                }
            })
            this.$refs["postData1"].validate((val)=>{
              if(val){  
                this.$refs["postData2"].validate((val)=>{
                    if(val){
                        workWeekSubmit(this.postData).then(val=>{
                            type==1?this.loading1=true:this.loading2=true;
                             setTimeout(()=>{
                                 this.loading1=false
                                  this.loading2=false
                             },2000)
                             if(val.data.code==0){
                                this.$Notice.success({
                                        title: '操作成功',
                                    });
                                }else{
                                 this.$Notice.error({
                                        title: '操作失败：',
                                        desc:res.data.message
                                });
                                
                             }
                        })

                    }else{
                        this.$Message.warning('请按要求填写数据!');
                    }
                })
              }else{
                  this.$Message.warning('请按要求填写数据!');
              }
            })


        },getWeekStartDate(){
            //本周开始
             var weekStartDate = new Date(this.nowYear, this.nowMonth, this.nowDay - this.nowDayOfWeek+1);
             return this.formatDate(weekStartDate);
        },getWeekEndDate(){
            //本周结束=1
            var weekEndDate = new Date(this.nowYear, this.nowMonth, this.nowDay + (6 - this.nowDayOfWeek)+1);
            return this.formatDate(weekEndDate);
        },getLastWeekStartDate(){
            //上周开始
            var weekStartDate = new Date(this.nowYear, this.nowMonth, this.nowDay - this.nowDayOfWeek - 6);
            return this.formatDate(weekStartDate);
        },getLastWeekEndDate(){
            //上周结束
            var weekEndDate = new Date(this.nowYear, this.nowMonth, this.nowDay - this.nowDayOfWeek);
            return this.formatDate(weekEndDate);
        },getLast2WeekStartDate(){
            //上上周开始
            var weekStartDate = new Date(this.nowYear, this.nowMonth, this.nowDay - this.nowDayOfWeek - 13);
            return this.formatDate(weekStartDate);
        },getLast2WeekEndDate(){
            //上上周结束
              var weekEndDate = new Date(this.nowYear, this.nowMonth, this.nowDay - this.nowDayOfWeek-7);
            return this.formatDate(weekEndDate);
        },formatDate(date){
            var myyear = date.getFullYear();
            var mymonth = date.getMonth() + 1;
            var myweekday = date.getDate();
            if (mymonth < 10) {
                mymonth = "0" + mymonth;
            }
            if (myweekday < 10) {
                myweekday = "0" + myweekday;
            }
            return (myyear + "-" + mymonth + "-" + myweekday);
        },getProList(){
            getProjectList({"ProjectStatus":2,"USerID":JSON.parse(localStorage.getItem("userId"))}).then(res=>{
            
                res.data.projectList.forEach((element)=>{  
                    this.proList.push({
                        label:element.projectSource,
                        value:element.projectID
                    })
                })
                
                
            })
        },getworkWeekHistory(){
            getworkWeekHistory({
                UserId:this.postData.UserId,
                StartTime:this.postData.StartTime,
                EndTime:this.postData.EndTime,
            }).then(val=>{
                if(val.data.code==0){
                    this.showSubmit=false;
                    this.$Notice.success({
                        title: '所选周期周报已经提交',
                    });
                     this.showData=val.data;

                }else{
                    this.showSubmit=true;
                    
                }
               
            })
        },exampleStandard(){
            
            this.$refs['hoursModal'].showModal(true)

        }
    }
}
</script>
<style lang="less" scoped>
    .weekly{
        width: 100%;
        height: 100%;
        .ivu-table-wrapper{
            overflow: visible;
        }
        
    }
</style>