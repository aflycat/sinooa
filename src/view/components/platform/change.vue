<template>
    <div class="platform_change">
        <Card  class="itemCard">
            <p slot="title">报送人信息</p>
             <Form class="formWrap"  :label-width="110">
                <!-- <FormItem  label="请示事项要点">
                    <Input  placeholder="请输入请示事项要点"></Input>
                </FormItem> -->
                <Row>
                    <Col span="12">
                        <FormItem label="报送人">
                            <Input  placeholder="填写报送人"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="联系电话">
                            <Input  placeholder="联系电话"></Input>
                        </FormItem>
                    </Col>
                </Row>
                

            </Form>
        </Card>
        <Card class="itemCard">
            <p slot="title">权属平台信息</p>
            <Form class="formWrap"  :label-width="110">
                <FormItem  label="权属平台选择">
                    <Select v-model="plat_data" filterable >
                        <Option v-for="item in platArr" :value="item.value" :key="item.value">{{item.label}}</Option>
                    </Select>
                   
                </FormItem>
                <FormItem  label="权属平台全称">
                    <Input  placeholder="权属平台全称"></Input>
                </FormItem>
                <Row>
                    <Col span="12">
                        <FormItem  label="权属平台简称">
                            <Input  placeholder="权属平台简称"></Input>
                        </FormItem>
                    </Col>
                
                    <Col span="12">
                        <FormItem label="权属平台代码">
                            <Input  placeholder="权属平台代码"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem  label="统一社会信用代码">
                            <Input  placeholder="统一社会信用代码"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="成立日期">
                            <Input  placeholder="成立日期"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="注册地址">
                            <Input  placeholder="注册地址"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="注册资本">
                            <Input  placeholder="注册资本">
                                <span slot="append">万元</span>
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="经营范围">
                            <Input  placeholder="经营范围"></Input>
                        </FormItem>
                    </Col>
                </Row>
                 </Form>
        </Card>

         <Card class="itemCard">
            <p slot="title">权属平台人员信息</p>
            <Table :columns="member" :data="memberData">
                <template  slot-scope="{row, index}" slot="deal">
                    <span type="text" @click="showEdict(index)"  style="margin-right:5px;color:#3498db;cursor:pointer;">编辑</span>
                    <span type="text" @click="shoeDelete(index)"  style="margin-right:5px;color:#ed4014;cursor:pointer;">删除</span>
                </template>
            </Table>
           
            <Button style="margin-top:20px;" type="primary"  @click="showEdict(-1)">新增人员</Button>
        </Card>

         <Card  class="itemCard">
                <p slot="title">请示信息</p>
                <Form :label-width="80">
                    <FormItem label="事项要点" >
                        <Input  placeholder="请输入事项要点"></Input>
                    </FormItem>
                    <FormItem label="具体内容" >
                        <Input  type="textarea" :autosize="{minRows: 10,maxRows: 15}" placeholder="请输入事项的具体内容"></Input>
                    </FormItem>
                     <FormItem label="文件列表" v-if="fileName.length>0&&showFile">
                                <p class="fileName" v-for="(item,index) in fileName" >
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
                       <Button type="primary" :loading="loading" @click="handleSubmit('formValidate')">

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
export default {
    components:{
        UploadFiles
    },
    data(){
        return{
            fileName:[],
            fileWrap:[],//用来保存要上传的文件，方便进行删除操作
            fileForm:new FormData(),
            loading:false,//提交
            plat_data:'',
            platArr:[
                {value:'平台1',label:'平台1'},
                {value:'平台2',label:'平台2'},
                {value:'平台3',label:'平台3'}
            ],
            member:[
                {title:"人员类型",key:"kind"},
                {title:"人员姓名",key:"name"},
                {title:"持股比例(%)",key:"scale"},
                {title:"认缴金额(万元)",key:"money"},
                { title:"操作",slot:"deal"}
            ],
            memberData:[
                {
                    kind:"股东",
                    name:"祝福",
                    scale:"10",
                    money:"10"
                },
                {
                    kind:"股东",
                    name:"祝福",
                    scale:"10",
                    money:"10"
                }
            ],
            
            
        }
    },methods:{
        showEdict(index){
            console.log(index)
        },
        shoeDelete(index){
            console.log(index)
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
<style scoped lang="less">
   .platform_change{
       
    //    overflow: auto;
       .formWrap{
        width: 95%;
        height: 100%;
        margin: 30px auto;
        

       }
   }
</style>
