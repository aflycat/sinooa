<template>
    <div class="department_change">
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
            <p slot="title">部门信息</p>
            <Form class="formWrap"  :label-width="110">
                <FormItem  label="部门选择">
                    <Input  placeholder="部门选择"></Input>
                </FormItem>
                <Row>
                    <Col span="12">
                        <FormItem  label="权属平台">
                            <Input  placeholder="权属平台"></Input>
                        </FormItem>
                    </Col>
                
                    <Col span="12">
                        <FormItem label="部门代码">
                            <Input  placeholder="部门代码"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem  label="部门经理">
                            <Input  placeholder="统一社会信用代码"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="部门副经理">
                            <Input  placeholder="成立日期"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="部门员工">
                            <Input  placeholder="部门员工"></Input>
                        </FormItem>
                    </Col>
                </Row>
                 </Form>
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

        }
    },methods:{
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
<style lang="less" scoped>
.department_change{
    width: 100%;
    height: 100%;
}
</style>