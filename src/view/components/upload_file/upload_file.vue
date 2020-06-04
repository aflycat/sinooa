<template>
    <div class="upload_file">
        <Modal v-model="fileModal"   title="上传文件" width="650" @on-ok="closeFile()" @on-cancel="cancleFile()">
            <Row :gutter="16" v-if="fileClass==1">
                <Col span="6" v-for="(item,index) in fileTypeList" :key='index'>
                    <Card  class="fileList">
                        <div style="text-align:center;"  @dblclick="openFile(2,index,item.name)" >
                            <img :src="fileImg" style="width:80px;height:auto;">
                            <p>{{item.name}}</p>
                        </div>
                    </Card>
                </Col>
                
            </Row>
            <Row :gutter="16" v-if="fileClass==2" >
                <Breadcrumb class="fileList">
                    <BreadcrumbItem v-for="(item,index) in  road1"  :key='index'>{{item}}/</BreadcrumbItem>
                </Breadcrumb>
                <Col span="6" v-for="(item,index) in fileTypeList[fileSecIndex].children"  :key='index'>
                    <Card  class="fileList">
                        <div style="text-align:center;" @dblclick="openFile(0,index,item.name,item.typeId)">
                            <img :src="fileImg" style="width:80px;height:auto;">
                            <p>{{item.name}}</p>
                        </div>
                    </Card>
                </Col>
            </Row>
            <Row v-if="fileClass==0">
                 <Breadcrumb class="fileList">
                    <BreadcrumbItem v-for="(item,index) in road2"  :key='index'>{{item}}</BreadcrumbItem>
                </Breadcrumb>
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
            </Row>

        </Modal>
    </div>
</template>
<script>
import fileImg from "@/assets/images/file.png"
export default {
    name:"UploadFile",
    // props:{ 
    //     fileModal:Boolean
    // },
    data(){
       
        return {
            fileClass:1,
            fileImg,
            fileName:[],
            fileData:[],
            fileWrap:[],//用来保存要上传的文件，方便进行删除操作
            road1:[],
            road2:[],
            fileSecIndex:0,
            fileLastIndex:0,
            fileForm:new FormData(),
            fileCode:"",
            file:null,
            fileTypeList:[
                {
                    name:'公司证照资料',
                    children:[
                        {name:'营业执照',typeId:'SINO001'},
                        {name:'国税登记',typeId:'SINO002'},
                        {name:'地税登记',typeId:'SINO003'},
                        {name:'组织机构代码',typeId:'SINO004'},
                        {name:'银行基本账户',typeId:'SINO005'},
                        {name:'其他资料',typeId:'SINO006'},

                    ]
                },
                {
                    name:'公司运行环境',
                    children:[
                        {name:'行业',typeId:'SINO001'},
                        {name:'工商',typeId:'SINO001'},
                        {name:'国税',typeId:'SINO001'},
                        {name:'地税',typeId:'SINO001'},
                        {name:'银行',typeId:'SINO001'},
                        {name:'网站',typeId:'SINO001'},
                        {name:'其他',typeId:'SINO001'},
                    ]
                }
            ],
            showFile:false,
            fileModal:false
        }
    },methods:{
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
            this.fileClass=1;
            this.$emit('handleUploadFileEvent',this.fileModal)
        },
        handleUpload(file){
            let nameStr=this.fileTypeList[this.fileSecIndex].name+'--'+this.fileTypeList[this.fileSecIndex].children[this.fileLastIndex].name
            this.fileName.push(
                    {
                        name:file.name,
                        file:nameStr
                    }
                );
            this.fileWrap.push(
                {
                    file:file,
                    type:this.fileCode,//文件类型，目录选择的时候确定
                    
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
<style lang="less" scoped>
    .fileList{
        margin-bottom: 25px !important;
    }
     .fileName{
        // padding-left: 20px;
        ivu-col{
            padding-left: 20px !important;
        }
     }
    .fileName:hover{
        background: #eee;
    }
</style>