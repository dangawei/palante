<style lang="less">
  .SNS-box{
    overflow: hidden;
  }
  .SNS-centent-list{
    overflow: hidden;
    .SNS-list{
      float: left;
      width: 100%;
      padding: 10px 0;
      text-align:left;
      .SNS-list-hd{
        color: #666;
        padding: 5px 0;
      }
      .SNS-list-bd{
        text-indent: 2em
      }
    }
    .SNSlistright{
      text-align:right!important;
    }
  }
</style>
<template>
  <div class="">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem>售后管理</BreadcrumbItem>
          <BreadcrumbItem>报障列表</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
             <h2>报障列表【{{vin}}】</h2>
          </div>
      </div>
    </div>
    <div class="page-component-view">
     <div class="page-component-bd">
        <div class="SNS-box" v-if="show">
            <div class="SNS-centent">
              <Input v-model="reply" type="textarea"  placeholder="回复解决内容" />
            </div>
            <div class="SNS-centern-btn fr mt10">
              <span @click="SNScentent"><Button type="primary">回复</Button></span>
              <span @click="SNSjiejue" class="ml10"><Button type="primary">开始解决</Button></span>
            </div>
        </div>
        <div v-if="!show">
             <span v-if="status==1"><Button type="primary">待解决</Button></span>
             <span v-if="status==2"><Button type="primary">解决中</Button></span>
             <span v-if="status==3"><Button type="primary">已解决</Button></span>
        </div>
        <div class="SNS-centent-list">
            <div class="SNS-list" :class="{SNSlistright:item.replyFlag==1}" v-for="item in data">
              <div class="SNS-list-hd" >
                <span v-if="item.replyFlag==2">【客户】</span>
                {{item.createdtime}}
              </div>
              <div class="SNS-list-bd">
                  {{item.reply}}
              </div>
            </div>
        </div>
    </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
        return {
            show:false,
            reply:"",
            vin:"",
            status:"",
            data:{}
        }
    },
    mounted() {
      this.list()
      this.status = this.$route.query.status
      if(this.$route.query.status!=3){
        this.show = true
      }
      this.vin = this.$route.query.vin
    },
    methods: {
      list () {
        var listdata = {
          faultProblemId:this.$route.query.faultId,
          token:this.$webapi.get('token'),
        }
        var _this =  this
        this.$api.get('/fault_problem_reply/list',listdata,reset => {
          if (reset.codeId === 1) {
              var data = reset.resData
              data.forEach(function (a) {
                a.createdtime = _this.$webapi.gettime("time",a.createdAt/1000)
              })
             _this.data = data
          }
        })
      },
    storeEmit (e) {
      this.formCustom.dealerStorefrontId = e.id
    },
    SNSjiejue () {
      var _this =  this
      var data = {
        token:this.$webapi.get('token'),
        id:this.$route.query.faultId,
        callPhone:"",
        solveStatus:2
      }
      this.$api.post('/fault_problem/update',data,reset => {
        if (reset.codeId === 1) {
           window.location.href = window.location.href
        }else {
          _this.$netcode.getApiCode(reset)
        }
      })
    },
    SNScentent () {
      if(this.reply==""){
        this.$Message.info("回复内容不能为空")
        return
      }
      var listdata = {
        faultProblemId:this.$route.query.faultId,
        token:this.$webapi.get('token'),
        reply:this.reply
      }
      var _this =  this
      this.$api.post('/fault_problem_reply/save',listdata,reset => {
        if (reset.codeId === 1) {
           _this.list()
        }else {
          _this.$netcode.getApiCode(reset)
        }
      })
    }
   }
  }
</script>
