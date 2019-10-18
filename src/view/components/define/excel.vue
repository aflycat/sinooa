<template>
    <div class="excel">
        <Row :gutter="16">
            <Col span="3">
                <Card>
                    <p slot="title">组件</p>
                    <Row type="flex" justify="center" align="middle" style="text-align:center;">
                        <Col span="12" >
                            <div class="comItem" @click="addCom('input')">
                                <Icon custom="iconfont icon-danhangshurukuang" />
                                <p>单行输入框</p>   
                            </div>
                        </Col>
                        <Col span="12">
                         <div class="comItem"  @click="addCom('textarea')">
                             <Icon custom="iconfont icon-duohangshurukuang" />
                            <p>多行输入框</p>
                            </div>
                        </Col>
                        <Col span="12" >
                         <div class="comItem"  @click="addCom('radio')">
                             <Icon custom="iconfont icon-danxuan" />
                            <p>单选</p>
                            </div>
                        </Col>
                        <Col span="12" >
                         <div class="comItem"  @click="addCom('checkbox')">
                             <Icon custom="iconfont icon-duoxuan" />
                            <p>多选</p>
                            </div>
                        </Col>
                        <Col span="12"  >
                         <div class="comItem"  @click="addCom('select')">
                             <Icon custom="iconfont icon-xiala" />
                            <p>下拉框</p>
                            </div>
                        </Col>
                        <Col span="12" >
                            <div class="comItem"  @click="addCom('email')">
                                <Icon custom="iconfont icon-youxiang" />
                                <p>邮箱</p>
                            </div>
                        </Col>
                        <Col span="12" >
                            <div class="comItem"  @click="addCom('timepicker')">
                                <Icon custom="iconfont icon-shijian" />
                                <p>时间选择</p>
                            </div>
                        </Col>
                        <Col span="12" >
                            <div class="comItem"  @click="addCom('number')">
                                <Icon custom="iconfont icon-shuzishurukuang" />
                                <p>数字</p>
                            </div>
                           
                        </Col>
                    </Row>
                </Card>
            </Col>
            <Col span="16">
                 <Card style="overflow:auto;">
                    <p slot="title">表格详情</p>
                    <Form >
                        <FormItem label="表单表头" :label-width="80">
                            <Input v-model="title"  placeholder="请输入表单表头"></Input>
                        </FormItem>
                    </Form>
                    <Divider dashed/>
                    
                        <form-component :class="checkIndex==index?'check':' '" @getIndex="getIndex"  v-for="(item,index) in tableData" :index="index" :obj="item" ></form-component>

                  
                    <div style="clear:both;">
                    <Button type="primary" style="margin-top:20px;" @click="submit()">提交</Button>

                    </div>
                    <!-- <Divider dashed/> -->
                </Card>
            </Col>
            <Col span="5">
                 <Card>
                    <p slot="title">属性</p>
                    <form-attr @deleteCom="deleteIndexCom" v-if="AttrData" :setAttrData="AttrData" :indexCom="indexAttr"></form-attr>
                </Card>
            </Col>


        </Row>
    </div>
</template>
<script>
import {component} from './conmonent'
import formComponent from "@/view/components/define/component.vue"
import formAttr from "@/view/components/define/attr.vue"

export default {
    mounted(){
        // console.log(component)
    },
    components:{
        formComponent,
        formAttr
    },
    data(){
        return{
            checkIndex:-1,
            AttrData:null,
            indexAttr:0,
            title:'',
            tableData:[
                // {
                //     type: 'input',
                //     label: '标题',
                //     placholder:'请输入内容',
                //     props: 'text',
                //     value: '',
                //     width: '100',
                //     maxlength:null,
                //     readonly:false,
                //     disabled:false
                // },
                // {
                //     type: 'textarea',
                //     label: '标题',
                //     props: 'textarea',
                //     placholder:'请输入内容',
                //     value: '',
                //     width: '100',
                //     rows: 5,
                //     maxlength:null,
                // },
                // {
                //     type: 'email',
                //     props: 'email',
                //     label: '标题',
                //     value: '',
                //     width: '100',
                //     maxlength:null,
                //     readonly:false,
                //     disabled:false
                // },
                // {
                //     type: 'number',
                //     props: 'number',
                //     label: '标题',
                //     value: '',
                //     width: '100',
                //     maxlength: null,
                //     readonly: false,
                //     disabled: false
                // },
                // {
                //     type: 'radio',
                //     label: '标题',
                //     width: '100',
                //     value:'',
                //     items: [{
                //             label: '选项1',
                            
                //         },
                //         {
                //             label: '选项2',
                           
                //         }
                //     ]
                // },
                //  {
                //     type: 'checkbox',
                //     label: '标题',
                //     width: '100',
                //     value:[],
                //     items: [{
                //             label: '选项1',
                //             value:'0'
                //         },
                //         {
                //             label: '选项2',
                //             value:'1'
                //         }
                //     ]
                // },
                // {
                //     type: 'select',
                //     label: '标题',
                //     width: '100',
                //     multiple: true,
                //     value:[],
                //     items: [{
                //             label: '选项1',
                //             value:'0'
                           
                //         },
                //         {
                //             label: '选项2',
                //             value:'1'
                            
                //         }
                //     ]
                // },
                // {
                //     type: 'timepicker',
                //     label: '标题',
                //     width: '100',
                //     value:'',
                //     placeholder:'选择日期',
                //     value: '',
                //     minCompany: 'month'
                // }
            ]
        }
    },
    methods:{
        addCom(type){
            this.tableData.push(JSON.parse(JSON.stringify(component[type])));
        },getIndex(index){
            this.checkIndex=index;
            this.AttrData=this.tableData[index];
            this.indexAttr=index;
        },
        deleteIndexCom(index){
            this.tableData.splice(index,1);
             this.checkIndex=-1;
             this.AttrData=null;
        },submit(){
            console.log(this.title);
            console.log(this.tableData)
        }
    }
}
</script>

<style lang="less" scoped>
    .check{
        background: #e8f3ff;
    }
    .ivu-card.ivu-card-bordered{
        overflow: visible;
    }
   .comItem{
       margin-top: 20px;
        cursor: pointer;
       &:hover {
          i,p{
              color:#2b85e4;
          } 

          
       }
       i{
           font-size: 2rem;
           margin-bottom: 8px;
       }
   }

</style>