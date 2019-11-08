<template>
  <div class="home">
    <Row>
      <Card class="itemCard">
          <p slot="title">常用功能</p>
          <Row :gutter='20' type="flex" justify="space-between" align="middle" style="text-align:center;">
            <Col span="3" >
              <router-link to="/normal/weekly">
                 <Card class="narmalBtn">
                    <Icon type="ios-paper"  size="36" color="rgb(105, 192, 255)"/>
                    <p style="color:#515a6e;">周报</p>
                  </Card>
              </router-link>
            </Col>
            <Col span="3">
              <router-link to="/normal/nead_deal">
                <Card  class="narmalBtn">
                  <Badge v-if="count!=0" :count="count" type="error" style="position:static;">
                      <a href="#" class="demo-badge"></a>
                  </Badge>
                    <Icon type="md-notifications" size="36" color="rgb(149, 222, 100)"/>
                    <p style="color:#515a6e;">待办任务</p>
                </Card>
               </router-link>
            </Col>
            <Col span="3">
              <router-link to="/normal/task_search">
                <Card class="narmalBtn">
                  <Icon type="md-briefcase" size="36" color="rgb(255, 156, 110)"/>
                  <p style="color:#515a6e;">任务查询</p>
                </Card>
              </router-link>  
            </Col>
            <Col span="3">
              <router-link to="/normal/enclosure_search">
                <Card class="narmalBtn">
                  <!-- <Icon type="md-pricetags" /> -->
                  <Icon type="md-attach" size="36" color="rgb(179, 127, 235)"/>
                  <p style="color:#515a6e;">附件查询</p>
                </Card>
              </router-link>  
            </Col>
            <Col span="3">
            
              <router-link to="/normal/draft_search">
                <Card class="narmalBtn">
                  <Badge v-if="draftNum!=0" :count="draftNum" type="error" style="position:static;">
                      <a href="#" class="demo-badge"></a>
                  </Badge>
                  <Icon type="ios-folder-open"  size="36" color="rgb(255, 214, 102)"/>
                  <p style="color:#515a6e;">草稿箱</p>
                </Card>
              </router-link>  
            </Col>
            <Col span="3">
              <router-link to="/normal/data_search">
                <Card class="narmalBtn">
                  <Icon type="md-search"  size="40" color="rgb(92, 219, 211)"/>
                  <p style="color:#515a6e;">资料搜索</p>
                </Card>
              </router-link>  
            </Col>
             <Col span="3">
              <router-link to="/normal/leave">
                <Card class="narmalBtn">
                  <!-- <Icon type="md-medical" /> -->
                  <Icon type="md-medical"  size="40" color="rgb(255, 133, 192)"/>
                  <p style="color:#515a6e;">请假申请</p>
                </Card>
              </router-link>  
            </Col>
            </Row>
          
      </Card>
    </Row>
    <Row>
      <Card  class="itemCard">
          <p slot="title">公共信息</p>
      </Card>
    </Row>
    <Row>
      <Card  class="itemCard">
          <p slot="title">技术支持</p>
      </Card>
    </Row>
    <Row>
      <Card  class="itemCard">
          <p slot="title">统计信息</p>
      </Card>
    </Row>
   
  </div>
</template>

<script>
import {getDealTask} from "@/api/data"
export default {
  name: 'home',
  data () {
    return {
      userId:'',
      count:0,
      draftNum:0
    }
  },
  mounted () {
    this.userId=JSON.parse(localStorage.getItem('userId'))
    this.getDealTaskNum();
  },methods:{
    getDealTaskNum(){
      getDealTask({FlowOwner:this.userId}).then(res=>{
        if(res.data.code==2101){
          this.count=res.data.dealTaskList.length
        }else{
          this.$Message.error({
            content:'待办任务查询失败：'+res.data.message
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
.count-style{
  font-size: 50px;
}
.home{
   .itemCard{
      margin-bottom: 20px;
   }
   .narmalBtn{
     cursor: pointer;
     
     p{
       margin: 15px 0;
      
     }
   }
}
</style>
