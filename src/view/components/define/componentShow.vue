<template>

    <div class="component" style="float:left;" :style="'width:'+obj.width+'%'"  @click="returnIndex()">
        <Form v-if="obj.type=='input'" :label-width="80">
                <FormItem :label="obj.label">
                    <Input v-model="obj.value" :disabled="obj.disabled" :readonly="obj.readonly" :maxlength="obj.maxlength" :placeholder="obj.placholder" :type="obj.props" ></Input>
                </FormItem>
        </Form>
         <Form v-else-if="obj.type=='textarea'" :label-width="80">
            <FormItem :label="obj.label">
                <Input  v-model="obj.value" :rows="obj.rows" :disabled="obj.disabled" :readonly="obj.readonly" :maxlength="obj.maxlength" :placeholder="obj.placholder" :type="obj.props" ></Input>
            </FormItem>
        </Form>
         <Form v-else-if="obj.type=='email'" :label-width="80">
            <FormItem  :label="obj.label">
                <Input  v-model="obj.value" :disabled="obj.disabled" :readonly="obj.readonly" :maxlength="obj.maxlength" :placeholder="obj.placholder" :type="obj.props" ></Input>
            </FormItem>
        </Form>
        <Form v-else-if="obj.type=='number'" :label-width="80">
            <FormItem :label="obj.label">
                <Input  v-model="obj.value"  :disabled="obj.disabled" :readonly="obj.readonly" :maxlength="obj.maxlength" :placeholder="obj.placholder" :type="obj.props" ></Input>
            </FormItem>
        </Form>
         <Form v-else-if="obj.type=='radio'" :label-width="80">
            <FormItem :label="obj.label">
                <RadioGroup v-model="obj.value">
                    <Radio :label="item.label"  v-for="(item,index) in obj.items" :key='index'>{{item.label}}</Radio>
                </RadioGroup> 
            </FormItem>
        </Form>
         <Form v-else-if="obj.type=='checkbox'" :label-width="80">
            <FormItem :label="obj.label">
                <CheckboxGroup v-model="obj.value">
                    <Checkbox v-for="(item,index) in obj.items" :label="item.label" :key='index'>{{item.label}}</Checkbox> 
                </CheckboxGroup>
            </FormItem>
        </Form>
        <Form v-else-if="obj.type=='select'" :label-width="80">
            <FormItem :label="obj.label">
                <Select v-model="obj.value" :multiple="obj.multiple">
                    <Option v-for="item in obj.items" :value="item.label" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
        </Form>
        <Form v-else-if="obj.type=='select'" :label-width="80">
            <FormItem :label="obj.label">
                <Select v-model="obj.value" :multiple="obj.multiple">
                    <Option v-for="item in obj.items" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
        </Form>
        <Form v-else-if="obj.type=='timepicker'" :label-width="80">
            <FormItem :label="obj.label">
               <DatePicker @on-change="selectTime" :value="obj.value" :type="obj.minCompany" :placeholder="obj.placeholder" ></DatePicker>
            </FormItem>
        </Form>

         <Form v-else-if="obj.type=='platform'" :label-width="80">
            <FormItem :label="obj.label">
                <Select v-model="obj.value"  filterable   placeholder="请选择权属平台">
                   <Option v-for="(item,index) in platformList" :value="item.platformID" :key="index">{{ item.shortName }}</Option>
                </Select>
            </FormItem>
        </Form>

         <Form v-else-if="obj.type=='depart'" :label-width="80">
            <FormItem :label="obj.label">
                 <Select v-model="obj.value"  filterable   placeholder="请选择所属部门">
                    <Option v-for="item in deptList" :value="item.deptName" :key="item.departmentID">{{item.deptName}}</Option>

                </Select>
            </FormItem>
        </Form>

         <Form v-else-if="obj.type=='fund'" :label-width="80">
            <FormItem :label="obj.label">
                 <Select v-model="obj.value"  filterable   placeholder="请选择所属基金">
                    <Option v-for="(item,index) in fundList" :value="item.shortName" :key="index">{{ item.shortName }}</Option>

                </Select>
            </FormItem>
        </Form>

         <Form v-else-if="obj.type=='program'" :label-width="80">
            <FormItem :label="obj.label">
                 <Select v-model="obj.value"  filterable   placeholder="请选择所属项目">
                    <Option v-for="item in ProjectList" :value="item.label" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
        </Form>

         <Form v-else-if="obj.type=='member'" :label-width="80">
            <FormItem :label="obj.label">
                 <Select v-model="obj.value"  :multiple="obj.multiple" filterable   placeholder="请选择人员">
                        <Option v-for="item in memberList" :value="item.label" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
        </Form>

        
    </div>
</template>
<script>
import {getPlatform,getAllDepartment,getAllFundList,getProjectList,getAllUserList} from "@/api/data"
export default {
    name:'formComponent',
    props:{
        obj:Object,
        index:Number
    },
   
    data(){
        return{
            platformList:[],
            deptList:[],
            fundList:[],
            ProjectList:[],
            memberList:[],
        }
    },mounted(){
        this.getPlatform();
        this.getDepartmentList();
        this.getAllFundList();
        this.getProList();
        this.getAllUserList();
    },
    methods:{
        selectTime(value){
            this.obj.value=value;
        },
        returnIndex(){
            this.$emit("getIndex",this.index)
        },
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
                    }
                }else{
                    this.$Message.error("部门列表获取失败:"+res.data.message)
                }
            })
        },
    }
}
</script>
<style lang="less" scoped>
    .component{
         padding: 8px;
    }
</style>