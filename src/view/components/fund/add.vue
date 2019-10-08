<template>
    <div class="add">
        <Tabs size="small">
            <TabPane label="基金合伙人">
                <p style="text-align:right;margin-bottom:15px;">
                    <Button type="primary" @click="showPart()">新增</Button>
                </p>
                <Table :columns="columnsPart" :data="dataPart"></Table>
            </TabPane>
            <TabPane label="基金投决会委员">
                <p style="text-align:right;margin-bottom:15px;">
                    <Button type="primary" @click="showDecision()">新增</Button>
                </p>
                <Table :columns="columnsDeci" :data="dataDeci"></Table>
            </TabPane>
            
        </Tabs>
    <fund-partner ref="partner"></fund-partner>
    <fund-decision ref="decision"></fund-decision>    
    </div>
</template>
<script>
import fundPartner from "@/view/components/template/fund_partner"
import fundDecision from "@/view/components/template/fund_decision"
export default {
    components:{
        fundPartner,
        fundDecision
    },
    data(){
        return{
            columnsPart:[
                {title:"姓名",key:"name"},
                {title:"地址",key:"addr"},
                {title:"联系电话",key:"phone"},
                {title:"出资金额(万元)",key:"money"},
                {title:"出资比例(%)",key:"persent"},
                {title:"证件类型",key:"idcard"},
                {title:"证件号码",key:"code"},
                {title:"联系人电话",key:"linkPhone"},
                {title:"联系人邮箱",key:"linkEmail"},
                {title:"操作",key:"deal",render:(h,params)=>{
                    return h('div',[
                        h('span',{
                            style:{
                                color:"#3498db",
                                marginRight:'8px'
                            }
                        },'编辑'),
                         h('span',{
                              style:{
                                color:"#ed4014",

                            }
                        },'删除')
                    ])
                      
                    
                }}

            ],
            dataPart:[
                {name:'祝福',addr:"深圳市",phone:"17620455702",mail:"1032715112@qq.com",idcard:"身份证",code:"372856196535455617",money:"1000",persent:"10%",linkPhone:"17620455702",linkEmail:"1032715112@qq.com"}
            ],
            columnsDeci:[
                {title:"姓名",key:"name"},
                {title:"地址",key:"addr"},
                {title:"联系电话",key:"phone"},
                {title:"邮箱",key:"mail"},
                {title:"证件类型",key:"idcard"},
                {title:"证件号码",key:"code"},                
                {title:"操作",key:"deal",render:(h,params)=>{
                    return h('div',[
                        h('span',{
                            style:{
                                color:"#3498db",
                                marginRight:'8px'
                            }
                        },'编辑'),
                         h('span',{
                              style:{
                                color:"#ed4014",

                            }
                        },'删除')
                    ])
                      
                    
                }}
            ],
            dataDeci:[
                {name:'祝福',addr:"深圳市",phone:"17620455702",mail:"1032715112@qq.com",idcard:"身份证",code:"372856196535455617"}
            ]
        }
    },methods:{
        showPart(){
            this.$refs["partner"].showModel(true)
        },
        showDecision(){
            this.$refs["decision"].showModel(true)
        }
    }
}
</script>
<style lang="less" scoped>
    .add{
        width: 100%;
        height: 100%;
        background: #fff;
        padding: 15px;
    }
</style>