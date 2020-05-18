<template>
    <div class="attr">
        
        <Form  :label-width="60">
            <FormItem label="标题">
                <Input v-model="setAttrData.label"></Input>
            </FormItem>

            <FormItem v-if="setAttrData.type=='input'||setAttrData.type=='email'||setAttrData.type=='textarea'" label="内容">
                <Input v-model="setAttrData.value"></Input>
            </FormItem>
            <FormItem v-if="setAttrData.type=='number'" label="内容">
                <Input v-model="setAttrData.value" type="number"></Input>
            </FormItem>
            <FormItem v-if="setAttrData.type=='input'||setAttrData.type=='textarea'||setAttrData.type=='number'" label="最大长度">
                <Input  v-model="setAttrData.maxlength" type="number"></Input>
            </FormItem>

            <FormItem label="宽度">
                <Input   v-model="setAttrData.width"></Input>
            </FormItem>

            <FormItem v-if="setAttrData.type=='radio'||setAttrData.type=='checkbox'||setAttrData.type=='select'" label="选项">
                <Input style="margin-top:8px;" type="text" v-for="(item,index) in setAttrData.items" :key='index' v-model="item.label" @on-focus="getIndex(index)"></Input>                
                <Button style="margin-top:8px;" @click="addNewItem()">添加</Button>
                <Button type="error" style="margin-top:8px;margin-left:8px;" v-if="setAttrData.items.length>0" @click="deleteItem()">删除</Button>
            </FormItem>
            
            <FormItem v-if="setAttrData.type=='radio'" label="默认选中">
                 <Input type="text" v-model="setAttrData.value"></Input>   
            </FormItem>
             
            <FormItem v-if="setAttrData.type=='select'||setAttrData.type=='member'" label="属性">
                 <Checkbox v-model="setAttrData.multiple">多选</Checkbox>
            </FormItem>


             <FormItem v-if="setAttrData.type=='select'" label="默认选中">
                  <Select v-model="setAttrData.value" :multiple="setAttrData.multiple" >
                      <Option v-for="item in setAttrData.items" :value="item.label" :key="item.value">{{item.label}}</Option>
                  </Select>   
            </FormItem>

            <FormItem v-if="setAttrData.type=='checkbox'" label="默认选中">
                  <Select v-model="setAttrData.value" multiple >
                      <Option v-for="item in setAttrData.items" :value="item.label" :key="item.value">{{item.label}}</Option>
                  </Select>   
            </FormItem>

            <FormItem v-if="setAttrData.type=='textarea'" label="行数">
                <Input  v-model="setAttrData.rows"></Input>
            </FormItem>

            <FormItem v-if="setAttrData.type=='input'||setAttrData.type=='email'||setAttrData.type=='number'" label="属性">
                <Checkbox v-model="setAttrData.readonly">只读</Checkbox>
                <Checkbox v-model="setAttrData.disabled">禁用</Checkbox>
            </FormItem>

            <FormItem v-if="setAttrData.type=='timepicker'" label="默认日期">
                 <Input v-model="setAttrData.value"></Input>
            </FormItem>

            <FormItem v-if="setAttrData.type=='timepicker'" label="形式">
                <Select v-model="setAttrData.minCompany">
                    <Option v-for="item in timeType" :value="item.value" :key="item.value">{{item.label}}</Option>
                </Select>
            </FormItem>


             <FormItem v-if="setAttrData.type=='platform'" label="现有平台">
                <Select v-model="setAttrData.value">
                   <Option v-for="(item,index) in platformList" :value="item.platformID" :key="index">{{ item.shortName }}</Option>
                </Select>
            </FormItem>

             <FormItem v-if="setAttrData.type=='depart'" label="现有部门">
                <Select v-model="setAttrData.value">
                    <Option v-for="item in deptList" :value="item.departmentID" :key="item.departmentID">{{item.deptName}}</Option>
                </Select>
            </FormItem>
            
             <FormItem v-if="setAttrData.type=='fund'" label="现有基金">
                <Select v-model="setAttrData.value">
                    <Option v-for="(item,index) in fundList" :value="item.fundID" :key="index">{{ item.shortName }}</Option>
                </Select>
            </FormItem>

             <FormItem v-if="setAttrData.type=='program'" label="现有项目">
                <Select v-model="setAttrData.value">
                    <Option v-for="item in ProjectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>

            <FormItem v-if="setAttrData.type=='member'" label="现有人员">
                <Select v-model="setAttrData.value" :multiple="setAttrData.multiple">
                    <Option v-for="item in memberList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>

            <FormItem label="操作">
               <Button type="error" @click="deleThisItem()">删除</Button>
            </FormItem>
            
        </Form>
    </div>
</template>
<script>
import {getPlatform,getAllDepartment,getAllFundList,getProjectList,getAllUserList} from "@/api/data"

export default {
    props:{
        setAttrData:Object,
        indexCom:Number
    },
    data(){
        return{
            time:'',
            index:0,
            platformList:[],
            deptList:[],
            fundList:[],
            ProjectList:[],
            memberList:[],
            timeType:[
                {
                    value: 'year',
                    label: '年'
                },
                {
                    value: 'month',
                    label: '年月'
                },
                {
                    value: 'date',
                    label: '年月日'
                },
                {
                    value: 'daterange',
                    label: '日期段'
                },
                {
                    value: 'datetime',
                    label: '日期和时间'
                },
                {
                    value: 'datetimerange',
                    label: '时间段'
                }
                
            ]
        }
    },mounted(){
        this.getPlatform();
        this.getDepartmentList();
        this.getAllFundList();
        this.getProList();
        this.getAllUserList();
    },
    methods:{
            getAllUserList(){
                getAllUserList({"Status":1}).then(res=>{
                    if(res.data.code==0){
                        res.data.userList.forEach(element => {
                            this.memberList.push({
                                value:element.userId,
                                label:element.userName
                            })
                        });
                       
                    }else{
                        this.$Message.error({
                            content:'项目列表数据加载失败：'+res.data.message
                        })
                    }
                })
            },
          getProList(status){
                //获取项目列表
                getProjectList({"ProjectStatus":2,"USerID":JSON.parse(localStorage.getItem("userId"))}).then(res=>{
                    if(res.data.code==2307){
                        res.data.projectList.forEach(element => {
                            this.ProjectList.push({
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
         getPlatform(){
            getPlatform({'PlatStatus':1,'USerID':JSON.parse(localStorage.getItem("userId"))}).then(res=>{
                if(res.data.code==2105){
                    this.platformList=res.data.platList;
                }else{
                     this.$Message.error({
                        content:"权属平台信息加载失败:"+res.data.message
                    })
                }
            })
        },
    getDepartmentList(){
            getAllDepartment({DeptStatus:"1",USerID:JSON.parse(localStorage.getItem("userId"))}).then(res=>{
                if(res.data.code==2205){
                    if(res.data.deptList.length==0){
                        this.$Message.warning("该账号下没有相关部门")
                    }else{
                        this.deptList=res.data.deptList
                        console.log(this.deptList)
                    }
                }else{
                    this.$Message.error("部门列表获取失败:"+res.data.message)
                }
            })
        },
        getIndex(index){
            this.index=index;
        },
        addNewItem(){
            this.setAttrData.items.push({
                label:"名称",
                value:this.setAttrData.items.length
            })
        },
        deleteItem(){
            this.setAttrData.items.splice(this.index,1)
        },
        deleThisItem(){
            this.$emit("deleteCom",this.indexCom)
        }
    }
}
</script>
<style lang="less" scoped>

</style>