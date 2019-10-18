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
                  <Badge :count="5" type="error" style="position:static;">
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
                  <Badge :count="6" type="error" style="position:static;">
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
    <!-- 统计信息 -->
    <!-- <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="8" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-pie style="height: 300px;" :value="pieData" text="用户访问来源"></chart-pie>
        </Card>
      </i-col>
      <i-col :md="24" :lg="16" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-bar style="height: 300px;" :value="barData" text="每周用户活跃量"/>
        </Card>
      </i-col>
    </Row> -->
    <!-- 用户 -->
    <!-- <Row>
      <Card shadow>
        <example style="height: 310px;"/>
      </Card>
    </Row> -->
    <!-- 图标 -->
  </div>
</template>

<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { ChartPie, ChartBar } from '_c/charts'
import Example from './example.vue'
export default {
  name: 'home',
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar,
    Example
  },
  data () {
    return {
      inforCardData: [
        { title: '新增用户', icon: 'md-person-add', count: 803, color: '#2d8cf0' },
        { title: '累计点击', icon: 'md-locate', count: 232, color: '#19be6b' },
        { title: '新增问答', icon: 'md-help-circle', count: 142, color: '#ff9900' },
        { title: '分享统计', icon: 'md-share', count: 657, color: '#ed3f14' },
        { title: '新增互动', icon: 'md-chatbubbles', count: 12, color: '#E46CBB' },
        { title: '新增页面', icon: 'md-map', count: 14, color: '#9A66E4' }
      ],
      pieData: [
        { value: 335, name: '直接访问' },
        { value: 310, name: '邮件营销' },
        { value: 234, name: '联盟广告' },
        { value: 135, name: '视频广告' },
        { value: 1548, name: '搜索引擎' }
      ],
      barData: {
        Mon: 13253,
        Tue: 34235,
        Wed: 26321,
        Thu: 12340,
        Fri: 24643,
        Sat: 1322,
        Sun: 1324
      }
    }
  },
  mounted () {
    //
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
