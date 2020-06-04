<template>

    <div class="component" style="float:left;" :style="'width:'+obj.width+'%'"  @click="returnIndex()">
            <Form v-if="obj.type=='input'" :label-width="100">
                <FormItem :label="obj.label">
                    <Input v-model="obj.value" :disabled="obj.disabled" :readonly="obj.readonly" :maxlength="obj.maxlength" :placeholder="obj.placholder" :type="obj.props" ></Input>
                </FormItem>
            </Form>
         <Form v-else-if="obj.type=='textarea'" :label-width="100">
            <FormItem :label="obj.label">
                <Input  v-model="obj.value" :rows="obj.rows" :disabled="obj.disabled" :readonly="obj.readonly" :maxlength="obj.maxlength" :placeholder="obj.placholder" :type="obj.props" ></Input>
            </FormItem>
        </Form>
         <Form v-else-if="obj.type=='email'" :label-width="100">
            <FormItem  :label="obj.label">
                <Input  v-model="obj.value" :disabled="obj.disabled" :readonly="obj.readonly" :maxlength="obj.maxlength" :placeholder="obj.placholder" :type="obj.props" ></Input>
            </FormItem>
        </Form>
        <Form v-else-if="obj.type=='number'" :label-width="100">
            <FormItem :label="obj.label">
                <Input  v-model="obj.value"  :disabled="obj.disabled" :readonly="obj.readonly" :maxlength="obj.maxlength" :placeholder="obj.placholder" :type="obj.props" ></Input>
            </FormItem>
        </Form>
         <Form v-else-if="obj.type=='radio'" :label-width="100">
            <FormItem :label="obj.label">
                <RadioGroup v-model="obj.value">
                    <Radio :label="item.label"  v-for="(item,index) in obj.items" :key='index'>{{item.label}}</Radio>
                </RadioGroup> 
            </FormItem>
        </Form>
         <Form v-else-if="obj.type=='checkbox'" :label-width="100">
            <FormItem :label="obj.label">
                <CheckboxGroup v-model="obj.value">
                    <Checkbox v-for="(item,index) in obj.items" :label="item.label" :key='index'>{{item.label}}</Checkbox> 
                </CheckboxGroup>
                {{obj.items}}
            </FormItem>
        </Form>
        <Form v-else-if="obj.type=='select'" :label-width="100">
            <FormItem :label="obj.label">
                <Select v-model="obj.value" :multiple="obj.multiple">
                    <Option v-for="item in obj.items" :value="item.label" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
        </Form>
        <Form v-else-if="obj.type=='select'" :label-width="100">
            <FormItem :label="obj.label">
                <Select v-model="obj.value" :multiple="obj.multiple">
                    <Option v-for="item in obj.items" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
        </Form>
        <Form v-else-if="obj.type=='timepicker'" :label-width="100">
            <FormItem :label="obj.label">
               <DatePicker @on-change="selectTime" :value="obj.value" :type="obj.minCompany" :placeholder="obj.placeholder" ></DatePicker>
            </FormItem>
        </Form>

         <Form v-else-if="obj.type=='platform'" :label-width="100">
            <FormItem :label="obj.label">
                <Select v-model="obj.value"  filterable   placeholder="请选择权属平台">
                </Select>
            </FormItem>
        </Form>

         <Form v-else-if="obj.type=='depart'" :label-width="100">
            <FormItem :label="obj.label">
                 <Select v-model="obj.value"  filterable   placeholder="请选择所属部门">
                </Select>
            </FormItem>
        </Form>

         <Form v-else-if="obj.type=='fund'" :label-width="100">
            <FormItem :label="obj.label">
                 <Select v-model="obj.value"  filterable   placeholder="请选择所属基金">
                </Select>
            </FormItem>
        </Form>

         <Form v-else-if="obj.type=='program'" :label-width="100">
            <FormItem :label="obj.label">
                 <Select v-model="obj.value"  filterable   placeholder="请选择所属项目">
                </Select>
            </FormItem>
        </Form>

        <Form v-else-if="obj.type=='member'" :label-width="100">
            <FormItem :label="obj.label">
                 <Select v-model="obj.value"  filterable   placeholder="请选择人员">
                </Select>
            </FormItem>
        </Form>
        <Form v-else-if="obj.type=='table'" >
            <FormItem>
                <p :style='{textAlign:obj.titleLayout}'><b>{{obj.label}}</b></p>
                <Table border :columns="obj.header" :data="tabData">
                    
                </Table>
            </FormItem>
        </Form>

        
    </div>
</template>
<script>


export default {
    name:'formComponent',
    props:{
        obj:Object,
        index:Number
    },
    data(){
        return{
             platformList:[],
             colData:[],
             tabData:[]
        }
    },mounted(){
       if(this.obj.type=='table'){
           this.loadTableHeader(this.obj.header)
          
       }
    },
    methods:{

        selectTime(value){
            this.obj.value=value;
        },
        returnIndex(){
            this.$emit("getIndex",this.index)
        },loadTableHeader(headerDat){
            headerDat.forEach((element,index) => {
                this.colData.push({
                    title:element.label,
                    key:'key'+index
                })
            });

        }
    }
}
</script>
<style lang="less" scoped>
    .component{
         padding: 8px;
    }
</style>