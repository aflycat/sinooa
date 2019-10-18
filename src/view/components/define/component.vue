<template>

    <div class="component" style="float:left;" :style="'width:'+obj.width+'%'"  @click="returnIndex()">
        {{obj}}
       
            <Form v-if="obj.type=='input'" :label-width="80">
                <FormItem :label="obj.label">
                    
                    <Input v-model="obj.value" :disabled="obj.disabled" :readonly="obj.readonly" :maxlength="obj.maxlength" :placeholder="obj.placholder" :type="obj.props" ></Input>
                </FormItem>
            </Form>
         <Form v-else-if="obj.type=='textarea'" :label-width="80">
            <FormItem :label="obj.label">
                <Input  v-model="obj.value" :rows="obj.rows" :disabled="obj.disabled" :readonly="obj.readonly" :maxlength="obj.maxlength" :placeholder="obj.placholder" :type="obj.props" ></Input>
            </FormItem>
        </Form>
         <Form v-else-if="obj.type=='email'" :label-width="80">
            <FormItem  :label="obj.label">
                <Input  v-model="obj.value" :disabled="obj.disabled" :readonly="obj.readonly" :maxlength="obj.maxlength" :placeholder="obj.placholder" :type="obj.props" ></Input>
            </FormItem>
        </Form>
        <Form v-else-if="obj.type=='number'" :label-width="80">
            <FormItem :label="obj.label">
                <Input  v-model="obj.value"  :disabled="obj.disabled" :readonly="obj.readonly" :maxlength="obj.maxlength" :placeholder="obj.placholder" :type="obj.props" ></Input>
            </FormItem>
        </Form>
         <Form v-else-if="obj.type=='radio'" :label-width="80">
            <FormItem :label="obj.label">
                <RadioGroup v-model="obj.value">
                    <Radio :label="item.label"  v-for="item in obj.items">{{item.label}}</Radio>
                </RadioGroup> 
            </FormItem>
        </Form>
         <Form v-else-if="obj.type=='checkbox'" :label-width="80">
            <FormItem :label="obj.label">
                <CheckboxGroup v-model="obj.value">
                    <Checkbox v-for="item in obj.items" :label="item.label">{{item.label}}</Checkbox> 
                </CheckboxGroup>
            </FormItem>
        </Form>
        <Form v-else-if="obj.type=='select'" :label-width="80">
            <FormItem :label="obj.label">
                <Select v-model="obj.value" :multiple="obj.multiple">
                    <Option v-for="item in obj.items" :value="item.label" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
        </Form>
        <Form v-else-if="obj.type=='select'" :label-width="80">
            <FormItem :label="obj.label">
                <Select v-model="obj.value" :multiple="obj.multiple">
                    <Option v-for="item in obj.items" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
        </Form>
        <Form v-else-if="obj.type=='timepicker'" :label-width="80">
            <FormItem :label="obj.label">
               <DatePicker @on-change="selectTime" :value="obj.value" :type="obj.minCompany" :placeholder="obj.placeholder" ></DatePicker>
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

        }
    },methods:{
        selectTime(value){
            this.obj.value=value;
        },
        returnIndex(){
            this.$emit("getIndex",this.index)
        }
    }
}
</script>
<style lang="less" scoped>
    .component{
         padding: 8px;

        &:hover{
            border:1px dashed #2b85e4; 
             box-sizing: border-box;
        }
        
        // background: red;
        // display: flex;
        // display: -webkit-flex;
        // flex-wrap: wrap;
        // align-items: center;
        // align-content: center;
        // justify-items: center;
        // justify-content: center;
    }
</style>