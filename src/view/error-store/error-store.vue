<template>
  <div>
     <Tabs value="name1">
        <TabPane label="开发进度" name="name1">
           <Card>
              <Timeline>
                <TimelineItem color="green">9.24 增加代办任务接口查询  ,文件上传模板创建-总经理会事宜报告</TimelineItem>
                <TimelineItem color="green">9.25 文件上传模板组件化,相关模块全部应用</TimelineItem>
                <TimelineItem color="green">9.29 人员管理，新增人员对话modal模板化</TimelineItem>
                <TimelineItem color="green">9.29 角色管理，新增角色对话框模板化</TimelineItem>
                <TimelineItem color="green">10.08 事项页签选择，事项页签便捷页面</TimelineItem>
                <TimelineItem color="green">10.09 网页相关modal添加和组件化</TimelineItem>
                <TimelineItem color="green">10.14 个人周报提交和预览数据，周报完成</TimelineItem>
                <TimelineItem color="green">10.15 项目开发完成大部分，等待新接口对接</TimelineItem>
                <TimelineItem color="green">10.16 自定义表单界面开发完成</TimelineItem>
                <TimelineItem color="green">10.17 自定义表单界面提交界面完成,js提交数据完成</TimelineItem>
                <TimelineItem color="green">10.18 项目立项开发完成，等待新接口对接</TimelineItem>
                <TimelineItem color="green">10.22 项目变动开发完成，等待新接口对接</TimelineItem>
                <TimelineItem color="green">10.22 项目进展开发完成，等待新接口对接</TimelineItem>
                <TimelineItem color="green">10.22 项目管理除了其他事宜，等待新接口的对接</TimelineItem>
                <TimelineItem color="green">10.22 基金投决，事务，合伙人，等待新接口的对接</TimelineItem>
                <TimelineItem color="green">10.25 差率费待接口对接</TimelineItem>
                <TimelineItem color="green">10.25 招待费待接口对接</TimelineItem>
                <TimelineItem color="green">05.20 部门和权属平台审批</TimelineItem>
                <TimelineItem color="green">05.20 部门和权属平台审批</TimelineItem>
                <TimelineItem color="green">05.25 项目进展协议等返回修改界面</TimelineItem>
                <TimelineItem color="green">05.26 项目进展协议等返回修改界面</TimelineItem>
                <TimelineItem color="green">05.27 项目开发变动返回修改界面</TimelineItem>
                <TimelineItem color="green">05.27 项目开发变动返回修改界面</TimelineItem>
                <TimelineItem color="green">05.28 基金开发变动返回修改界面</TimelineItem>
              </Timeline>
            </Card>
        </TabPane>
        <TabPane label="尚未完成" name="name2">
           <Card>
              <TimelineItem color="red">尚未完成、动态模板、退出、投资、部门变动、权属平台变动的审批界面</TimelineItem>
              <TimelineItem color="red">任务查询，附件查询，草稿箱，资料搜索</TimelineItem>
              <TimelineItem color="red">文件操作，删除，更改，上传，预览，下载</TimelineItem>
              <TimelineItem color="red">任务审批同意，不同意，驳回</TimelineItem>
              <TimelineItem color="red">选择项目项目品种项目种类</TimelineItem>
              <TimelineItem color="red">项目投资报告</TimelineItem>
              <TimelineItem color="red">基金添加人员相应的改变成员类型</TimelineItem>
              <TimelineItem color="red">接口自动获取</TimelineItem>
              <TimelineItem color="red">自定义编辑界面</TimelineItem>
            </Card>
        </TabPane>
        <TabPane label="需求改进" name="name3">
          <Card>
              <TimelineItem color="red">所有的查询信息接口返回名称信息和主键，如部门查询返回部门所属平台的平台名称</TimelineItem>
              <TimelineItem color="red">流程查询的时候接口返回步骤的处理组角色名称和处理人角色名称</TimelineItem>
              <TimelineItem color="red">流程编辑的时候可以完成某个流程的增删改查</TimelineItem>
              <TimelineItem color="red">查询个人信息的时候不返回用户的密码</TimelineItem>
              <TimelineItem color="red">国家查询接口</TimelineItem>
              <TimelineItem color="red">基金类型查询</TimelineItem>
              <TimelineItem color="red">客户代码，基金代码，项目代码，平台代码，部门代码是否重复查询接口</TimelineItem>
              <TimelineItem color="red">获取任务详情接口中没有返回预计工时费用EstimatedHourCost</TimelineItem>
              <TimelineItem color="red">需要一些不需要权限的接口，能获取全部的部门，基金，平台，项目等信息</TimelineItem>
              <TimelineItem color="red">审批流程的处理组和处理人都是必填，但是只能选一个</TimelineItem>
              <TimelineItem color="red">修改密码不需要原来的密码</TimelineItem>
              <TimelineItem color="red">角色修改权限的时候要返回菜单名称</TimelineItem>
              <TimelineItem color="red">怎么确定当前待处理任务是要审批还是要修改</TimelineItem>
              <TimelineItem color="red">投资退出接口返回对象的投资对象shortname</TimelineItem>
              <TimelineItem color="red">基金投资和退出怎么区别是否为当次任务要展示的内容（退出和投资都是数组）</TimelineItem>
            </Card>
        </TabPane>
         <TabPane label="版本更新" name="name4">
          <Card>
             <Timeline>
                <TimelineItem color="blue">流程设置中修改为流程图设置形式 框架采用jsplumb</TimelineItem>
                <TimelineItem color="blue">金额单位可以根据地区进行改变 人民币 港币 美元</TimelineItem>
                <TimelineItem color="blue">接口返回关键字要和提交关键字大小一致</TimelineItem>
                <TimelineItem color="blue">复用代码整合</TimelineItem>
                <TimelineItem color="blue">节假日提醒modal</TimelineItem>
                <TimelineItem color="blue">每日待办提醒modal</TimelineItem>
                <TimelineItem color="blue">自定义表单支持指定想运算</TimelineItem>
                <TimelineItem color="blue">自定义表单可以进行排序</TimelineItem>
             </Timeline>
            </Card>
        </TabPane>
        <TabPane label="bug修改" name="name5">
          <Card>
             <TimelineItem color="red">流程modal框出现一次界面卡死现象</TimelineItem>
             <TimelineItem color="red">多行表格中新添加一行原有数据也跟着改变</TimelineItem>
            </Card>
        </TabPane>
        <TabPane label="总结" name="name6">
          <Card>
             <TimelineItem color="red">返回修改，界面排版不变，重新加载提交的数据</TimelineItem>
              <TimelineItem color="red">项目进展之类的报告，返回修改之后不能选择其他项目提交</TimelineItem>
              <TimelineItem color="red">返回修不能重新选择</TimelineItem>
              <TimelineItem color="red">如果项目审批人提交了该项目则直接通过</TimelineItem>
            </Card>
        </TabPane>
        
    </Tabs>
   

  

    </Card>
  
  </div>
</template>

<script>
import { errorReq } from '@/api/data'
export default {
  name: 'error_store_page',
  methods: {
    click () {
      console.log(admin)
    },
    ajaxClick () {
      errorReq()
    }
  }
}
</script>

<style>
  .ivu-timeline-item{
    padding: 0;
  }
</style>
