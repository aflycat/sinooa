<template>
<!-- 草稿箱 -->
    <div class="draft_search">
        <Card  class="itemCard">
            <P slot="title">草稿列表</P>
            <Table stripe max-height="500"  :columns="columnsTask" :data="dataTask"></Table>
             <Page style="margin-top:20px;" :total="100"  show-elevator show-sizer />
        </Card>
      
    </div>
</template>
<script>
export default {
    data () {
            return {
                
                columnsTask:[
                    {title:'编号',key:'code'},
                    {title:'时间',key:'task'},
                    {title:'类型',key:'man'},
                    {title:'过期时间',key:'time'},
                    {title:'操作',key:'deal',render:(h,params)=>{
                        return h('div',[
                            h('span',{style:{color:"#3498db",marginRight:"8px",cursor:"pointer"}},"完成"),
                            h('span',{style:{color:"#ed4014",cursor:"pointer"}},"删除"),
                        ])
                        
                      
                        }

                    },

                ],
                dataTask:[
                    {code:"1",task:"2019-12-21 15:23",man:"周报",time:"2019-12-21 15:23"},
                    {code:"2",task:"2019-12-21 15:23",man:"基金开发",time:"2019-12-21 15:23"},
                    {code:"3",task:"2019-12-21 15:23",man:"工资发放",time:"2019-12-21 15:23"},
                    {code:"4",task:"2019-12-21 15:23",man:"人员变动",time:"2019-12-21 15:23"}
                ]
            }
        }
}
</script>
<style lang="less" scoped>
    .draft_search{
        .itemCard{
            margin-bottom: 25px;
        }
    }
</style>