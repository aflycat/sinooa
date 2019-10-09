<template>
    <div class="tap">
         <Row >
                <Col span="24" style="background:#fff;margin:15px 0;padding:15px 0;">
                    <!-- <Button type="primary" style="margin-left:20px;">新增页签</Button> -->
                    <Button type="primary" style="margin-left:20px;" @click="flagMod=true">新增页签</Button>
                    <Button type="error" style="margin-left:20px;" @click="deleteTap()">删除页签</Button>
                </Col>
        </Row>
        <Row :gutter="16">
            <Col span="4">
                <Menu theme="light" active-name="1" style="width:100%;">
                    <MenuGroup title="页签列表">
                        <MenuItem name="1">
                            权属平台
                        </MenuItem>
                        <MenuItem name="2">
                            基金产品
                        </MenuItem>
                        <MenuItem name="3">
                            资产标的
                        </MenuItem>
                    </MenuGroup>
                </Menu>
            </Col>
            <Col span="20">
             <Row >
                <Col span="24" style="background:#fff;margin:15px 0;padding:15px 0;">
                    <Button type="primary" style="margin-left:20px;"  @click="flagMod=true">新增页签详情</Button>
                </Col>
                </Row>
                 <Table :columns="columnstap" :data="datatap"></Table>    
                 
            </Col>
        </Row>
        <Modal
            v-model="flagMod"
            title="名称"
            
            @on-ok="asyncOK">
             <Form class="formWrap"  :label-width="80" >
                  <FormItem label="名称" prop="name">
                        <Input placeholder="名称"></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>    
</template>
<script>
export default {
    data(){
        return{
            flagMod:false,
            columnstap:[
                {
                    title:"序列",
                    key:"id"
                },
                {
                    title:"名称",
                    key:"name"
                },
                {
                    title:"操作",
                    key:"deal",
                    render:(h,params)=>{
                        return h('div',[
                            h('span',{
                                style:{color:"#2d8cf0",cursor:"pointer",marginRight:"8px"},
                                on:{
                                    click:()=>{
                                        // console.log("sahnchu")
                                        this.flagMod=true;
                                    }
                                }
                            },'编辑'),
                            h('span',{
                                style:{color:"#ed4014",cursor:"pointer"},
                                on:{
                                    click:()=>{
                                        this.deleteTap()
                                        // console.log("sahnchu")
                                    }
                                }
                            },'删除')
                        ])
                        
                        
                      
                    }
                }
            ],
            datatap:[
                {id:"0",name:"2"}
            ]

        }
    },methods:{
        asyncOK(){

        },deleteTap(){
            this.$Modal.warning({
                title:"删除页签",
                content:"确定删除该页签?",
                onOk(){
                    console.log("删除")
                }

            })
        }
    }
}
</script>
<style lang="less" scoped>

</style>