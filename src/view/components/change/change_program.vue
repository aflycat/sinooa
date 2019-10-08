<template>
    <div class="change_program">
        <Row :gutter="16">
            
            <Col span="4">
                <Card>
                    <p slot="title">用户列表</p>
                    <Menu style="width:100%;">
                        <Submenu name="1">
                            <template slot="title">未审批</template>
                            <MenuItem name="1-1">用户1</MenuItem>
                            <MenuItem name="1-2">用户1</MenuItem>
                            <MenuItem name="1-3">用户1</MenuItem>
                        </Submenu>  
                        <Submenu name="2">
                            <template slot="title">正常</template>
                            <MenuItem name="1-1">用户1</MenuItem>
                            <MenuItem name="1-2">用户1</MenuItem>
                            <MenuItem name="1-3">用户1</MenuItem>
                        </Submenu>  
                        <Submenu name="3">
                            <template slot="title">冻结</template>
                            <MenuItem name="1-1">用户1</MenuItem>
                            <MenuItem name="1-2">用户1</MenuItem>
                            <MenuItem name="1-3">用户1</MenuItem>
                        </Submenu>  
                    </Menu>
                </Card>
            </Col>
            <Col span="20">
                <Card>
                    <p slot="title">所在项目/基金</p>
                    <Table stripe :columns="columnsPro" :data="dataPro"></Table>
                </Card>
            </Col>

        </Row>
    </div>
</template>
<script>
export default {
    data(){
        return{
            columnsPro:[
                {title:"项目/基金简称",key:'name'},
                {title:"项目主办",key:'name'},
                {title:"项目经理",key:'name'},
                {title:"项目品种",key:'name'},
                {title:"项目角色",key:'name'},
                {title:"操作",key:'deal',render:(h,params)=>{
                    return h('span',{style:{color:"#ed4014",cursor:'pointer'}},"删除")
                }}
            ],
            dataPro:[
                {name:'测试项目'}, {name:'测试项目'}, {name:'测试项目'}
            ]
        }
    }
}
</script>
<style lang="less" scoped>
.change_program{
    width: 100%;
    height: 100%;
    // background: #fff;
}
</style>