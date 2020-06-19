<template>
    <div class="upload_file">
        <Modal v-model="fileModal"   title="上传文件" width="650" @on-ok="closeFile()" @on-cancel="cancleFile()">
            <Form :label-width="100" >
                <FormItem label='文件目录'>
                     <Row :gutter='16'>
                         <Col span="10">
                            <Select  label-in-value  @on-change='getdetailMenu'>
                                <Option v-for="(item,index) in fileTypeList" :key='index' :value='item.typeID' >{{item.typeName}}</Option>
                            </Select>
                         </Col>
                         <Col span="10">
                            <Select v-model="fileTypeID" clearable ref='secondMenu' label-in-value @on-change='getFinallList'>
                                <Option v-for="(item,index) in fileDetail" :key='index' :value='item.typeID' >{{item.typeName}}</Option>
                            </Select>
                         </Col>
                     </Row>
                </FormItem>
                <Card  class="fileList">
                    <Upload
                        multiple
                          type="drag"
                        :before-upload="handleUpload"
                        action="//jsonplaceholder.typicode.com/posts/">
                        <div style="padding: 20px 0">
                            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                            <p>单击或者拖拽文件到此处</p>
                        </div>
                    </Upload>
                    <p class="fileName" v-for="(item,index) in fileName"  :key='index' style="margin-top:10px;">
                        <Row :gutter="16">
                            <Col span="20">
                                <span style="color:#2b85e4;margin-right:8px;">{{item.name}}</span>
                                <span style="color:#808695;font-size:12px;">{{item.file}}</span>
                            </Col>
                            <Col span="4" style="color:#ed4014;cursor:pointer;" >
                               <span @click="deleteFile(index)">删除</span> 
                            
                            </Col>
                        </Row>
                    </p>
                </Card>
            </Form>
        </Modal>
    </div>
</template>
<script>
import {getUploadFileMenuList} from "@/api/data"
export default {
    name:"UploadFile",
    mounted(){
        this.getUploadFileMenuList(1)
    },
    data(){
        return {
            fileName:[],
            fileWrap:[],//用来保存要上传的文件，方便进行删除操作
            fileForm:new FormData(),
            file:null,
            fileTypeList:[],
            fileDetail:[],
            showFile:false,
            fileModal:false,
            fatherName:'',
            childName:'',
            fileTypeID:-1
        }
    },methods:{
        getUploadFileMenuList(FatherTypeID){
            getUploadFileMenuList({FatherTypeID:FatherTypeID}).then(res=>{
                if(res.data.code==2031){
                    this.fileTypeList=res.data.fileTypeList;
                }else{
                    this.$Message.error({
                        content:'文件目录加载失败：'+res.data.message
                    })
                }
            })
        },
        getdetailMenu(res){
            this.fileName=[];
            this.fileWrap=[];
            this.fatherName=res.label;
            this.fileDetail=[];
            this.$refs.secondMenu.clearSingleSelect()
            getUploadFileMenuList({FatherTypeID:res.value}).then(res=>{
                if(res.data.code==2031){
                    this.fileDetail=res.data.fileTypeList;
                }else{
                    this.$Message.error({
                        content:'文件目录加载失败：'+res.data.message
                    })
                }
            })
        },
        getFinallList(res){
           this.childName=res.label;
           this.fileName=[];
           this.fileWrap=[];
        },
        openFile(num,index,name,code){
            this.fileClass=num;
            if(num==2){
                this.road1[0]=name;
                this.fileSecIndex=index;
            }else{
                this.road2=[this.road1[0],name];
                this.fileLastIndex=index;
                this.fileCode=code;
            }

        },
        closeFile(){
            //确定
            this.fileClass=1;
            this.showFile=true;
            this.$emit('handleUploadFileEvent',this.fileModal,this.fileName,this.fileWrap) 
        },
        cancleFile(){
            //取消
            // this.$emit('handleUploadFileEvent',this.fileModal)
        },
        handleUpload(file){
            let nameStr=this.fatherName+'--'+this.childName
            this.fileName.push(
                    {
                        name:file.name,
                        file:nameStr
                    }
                );
            this.fileWrap.push(
                {
                    file:file,
                    type:this.fileTypeID,//文件类型，目录选择的时候确定
                    
                }
            )
            return false;
        },
        deleteFile(index){
            this.fileName.splice(index,1);
            this.fileWrap.splice(index,1);

        },
        showModal(flag){
            this.fileModal=flag;

        }
    }
}
</script>
