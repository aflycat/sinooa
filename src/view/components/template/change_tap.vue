<template>
    <div class="tap">

          <FormItem label="事项标签" >
                <Row type="flex" justify="start" :gutter="16">
                    <Col span="12">
                        <Select placeholder='请选择事项标签' @on-change="selectNext" v-model="tap">
                            <Option v-for="item in tapList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </Col>
                    <Col span="12">
                        <Select placeholder='请选择事项标签详细' @on-change="returnNext" v-model="tapDep" >
                            <Option v-for="item in tapDetList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </Col>
                </Row>
            </FormItem>
    </div>
</template>
<script>
export default {
    name:"changeTap",
    data(){
        return{
            tap:'',
            tapDep:'',
            tapList:[
                {label:"权属平台",value:0},
                {label:"基金产品",value:1},
                {label:"基石LP",value:2},
                {label:"供应商",value:3},
                {label:"特定任务",value:4},
                {label:"基金产品",value:5},
                {label:"部门",value:6},
            ],
            tapDetList:[
                {label:"详细1",value:0},
                {label:"详细2",value:1},
                {label:"详细3",value:2},
                {label:"详细4",value:3},
                {label:"详细5",value:4},
                {label:"详细6",value:5},
                {label:"详细7",value:6},
            ]
        }
    },methods:{
        selectNext(value){
            console.log(value)
        },
        returnNext(value){
            console.log(value)
            this.$emit('getValue',this.tap,value);
        }
    }
}
</script>
<style scoped>

</style>