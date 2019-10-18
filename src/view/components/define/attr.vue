<template>
    <div class="attr">
        <!-- {{setAttrData}} -->
        
        <Form  :label-width="60">
            <FormItem label="标题">
                <Input v-model="setAttrData.label"></Input>
            </FormItem>

            <FormItem v-if="setAttrData.type=='input'||setAttrData.type=='email'||setAttrData.type=='textarea'" label="内容">
                <Input v-model="setAttrData.value"></Input>
            </FormItem>
            <FormItem v-if="setAttrData.type=='number'" label="内容">
                <Input v-model="setAttrData.value" type="number"></Input>
            </FormItem>
            <FormItem v-if="setAttrData.type=='input'||setAttrData.type=='textarea'||setAttrData.type=='number'" label="最大长度">
                <Input  v-model="setAttrData.maxlength" type="number"></Input>
            </FormItem>

            <FormItem label="宽度">
                <Input   v-model="setAttrData.width"></Input>
            </FormItem>

            <FormItem v-if="setAttrData.type=='radio'||setAttrData.type=='checkbox'||setAttrData.type=='select'" label="选项">
                <Input style="margin-top:8px;" type="text" v-for="(item,index) in setAttrData.items" v-model="item.label" @on-focus="getIndex(index)"></Input>                
                <Button style="margin-top:8px;" @click="addNewItem()">添加</Button>
                <Button type="error" style="margin-top:8px;margin-left:8px;" v-if="setAttrData.items.length>0" @click="deleteItem()">删除</Button>
            </FormItem>
            
            <FormItem v-if="setAttrData.type=='radio'" label="默认选中">
                 <Input type="text" v-model="setAttrData.value"></Input>   
            </FormItem>
             
            <FormItem v-if="setAttrData.type=='select'" label="属性">
                 <Checkbox v-model="setAttrData.multiple">多选</Checkbox>
            </FormItem>
             <FormItem v-if="setAttrData.type=='select'" label="默认选中">
                  <Select v-model="setAttrData.value" :multiple="setAttrData.multiple" >
                      <Option v-for="item in setAttrData.items" :value="item.label" :key="item.value">{{item.label}}</Option>
                  </Select>   
            </FormItem>
            <FormItem v-if="setAttrData.type=='checkbox'" label="默认选中">
                  <Select v-model="setAttrData.value" multiple >
                      <Option v-for="item in setAttrData.items" :value="item.label" :key="item.value">{{item.label}}</Option>
                  </Select>   
            </FormItem>
            <FormItem v-if="setAttrData.type=='textarea'" label="行数">
                <Input  v-model="setAttrData.rows"></Input>
            </FormItem>

            <FormItem v-if="setAttrData.type=='input'||setAttrData.type=='email'||setAttrData.type=='number'" label="属性">
                <Checkbox v-model="setAttrData.readonly">只读</Checkbox>
                <Checkbox v-model="setAttrData.disabled">禁用</Checkbox>
            </FormItem>
            <FormItem v-if="setAttrData.type=='timepicker'" label="默认日期">
                 <Input v-model="setAttrData.value"></Input>
            </FormItem>
            <FormItem v-if="setAttrData.type=='timepicker'" label="形式">
                <Select v-model="setAttrData.minCompany">
                    <Option v-for="item in timeType" :value="item.value" :key="item.value">{{item.label}}</Option>
                </Select>
            </FormItem>

            <FormItem label="操作">
               <Button type="error" @click="deleThisItem()">删除</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
export default {
    props:{
        setAttrData:Object,
        indexCom:Number
    },
    data(){
        return{
            time:'',
            index:0,
            timeType:[
                {
                    value: 'date',
                    label: '日期'
                },
                {
                    value: 'daterange',
                    label: '日期段'
                },
                {
                    value: 'datetime',
                    label: '日期和时间'
                },
                {
                    value: 'datetimerange',
                    label: '时间段'
                },
                {
                    value: 'year',
                    label: '年'
                },
                {
                    value: 'month',
                    label: '年月'
                }
            ]
        }
    },methods:{
        getIndex(index){
            this.index=index;
        },
        addNewItem(){
            this.setAttrData.items.push({
                label:"名称",
                value:this.setAttrData.items.length
            })
        },
        deleteItem(){
            this.setAttrData.items.splice(this.index,1)
        },
        deleThisItem(){
            this.$emit("deleteCom",this.indexCom)
        }
    }
}
</script>
<style lang="less" scoped>

</style>