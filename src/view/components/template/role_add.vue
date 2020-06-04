<template>
  <Modal v-model="flags" title="角色" :loading="loading" @on-ok="handleOk()" @on-cancel="handleCancel()" width="750px">
        <Form :label-width="100">
            <Row :gutter="16">
                <Col span="24">
                    <FormItem label="角色名称">
                        <Input  placeholder="角色名称" v-model="name"></Input>
                    </FormItem>
                </Col>
            </Row> 
        </Form>
       
    </Modal>
</template>

<script>
import {addRole} from "@/api/user"
export default {
    name:'roleAAdd',
    data(){
        return{
            flags:false,
            loading: true,
            name:''

        }
    },methods:{

        handleOk(){
            setTimeout(()=>{
                this.flags=false;
                addRole({"RoleName":this.name}).then(res=>{
                    if(res.data.code==0){
                        this.$Message.success({
                            title:'角色创建成功'
                        })
                       this.$emit('loadRole')
                    }else{
                       this.$Message.error({
                            content:"新建角色失败："+res.data.message
                        })
                    }
                })
            },1000)
        },
        handleCancel(){

        },
        showModel(flag){
            this.flags=flag;
        }
    }
}
</script>

<style>

</style>