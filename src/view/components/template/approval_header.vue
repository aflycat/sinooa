<template>
     <Card  class="itemCard">
        <p slot="title">任务明细</p>
        <Form :label-width="80">
            <Row>
                <Col span="24">
                    <FormItem label="任务编号：">
                        <b>{{TaskNumber}}</b>
                    </FormItem>
                </Col>
                <Col span="24">
                    <FormItem label="事项要点：">
                        <b>{{TaskName}}</b>
                    </FormItem>
                </Col>
            
                <Col span="12">
                    <FormItem label="报送人：">
                        <b>{{TaskOwnerName}}</b>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="联系电话：">
                    <b>{{TaskOwnerPhone}}</b>
                    </FormItem>
                </Col>
                <Col span="24">
                    <FormItem label="报送内容：">
                        <b>{{TaskSummary}}</b>
                    </FormItem>
                </Col>
            </Row>
            </Form>    
    </Card>  
</template>
<script>
export default {
    props:{
        TaskNumber:String,
        TaskName:String,
        TaskOwnerName:String,
        TaskOwnerPhone:String,
        TaskSummary:String,
    },
    data(){
        return{

        }
    }
}
</script>