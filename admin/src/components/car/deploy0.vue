<template>
<div class="">
  <div class="pageHeader">
      <div class="pageBread">
          <Breadcrumb>
              <BreadcrumbItem to="/">首页</BreadcrumbItem>
              <BreadcrumbItem>车辆管理</BreadcrumbItem>
              <BreadcrumbItem to="/car">车辆型号</BreadcrumbItem>
          </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
              <h2>配置</h2>
          </div>
      </div>
  </div>
  <div class="page-component-view">
    <div class="page-view allm20">
        <div class="page-view-body">
          <div class="pagelist">
               <div class="pagelist-hd">配置文件路径 <span><a href="../../static/card.html">下载模板</a></span></div>
               <div class="pagelist-bd">
                 <Row>
                 <Col :xs="24" :sm="24" :md="6" :lg="8">
                   <Upload @uploadComponent="uploadComponent" v-if="show"></Upload>
                 </Col>
                 </Row>
               </div>
               <div class="" v-if="!show">
                    {{file}}
                    <Poptip
                      confirm
                      title="确定要删除吗?"
                      @on-ok="ok"
                      @on-cancel="cancel">
                      <Button type="error">删除</Button>
                      </Poptip>
               </div>
               <div class="page-divider page-divider-horizontal"></div>
           </div>
          <div class="pagelist">
              <div class="pagelist-hd">web浏览</div>
              <div class="pagelist-bd">
                  <iframe :src="file" width="100%" height="350" frameborder="0" v-if="!show"></iframe>
              </div>
              <div class="page-divider page-divider-horizontal "></div>
          </div>
          <div class="pagelist">
              <div class="pagelist-hd">app浏览</div>
              <div class="pagelist-bd">
                <iframe :src="file" width="720" height="350" frameborder="0" v-if="!show"></iframe>
              </div>
              <div class="page-divider page-divider-horizontal"></div>
          </div>
          <div class="">
            <Button type="primary" @click="handleSaveSubmit('formItem')" size="large" v-if="this.itemshow==2">保存</Button>
            <Button type="primary" @click="handleAddSubmit('formItem')" size="large" v-if="this.itemshow==1">添加</Button>
          </div>
        </div>
    </div>
  </div>
</div>
</template>
<script>
import Upload from "../pub/Uploadimg.vue"
export default {
    components: {
      Upload
    },
    created() {
      //do something after creating vue instance
      this.list ()
    },
    data() {
        return {
           show:true,
           file:"",
           item:{},
           itemshow:"1"
        }
    },
    watch:{
        file:function (val) {
            console.log(val)
           if(this.file.length>1){
             this.show = false
           }else{
             this.show = true
           }
        }
    },
    methods: {
      addsku () {
        this.addskushow = true
      },
      skuComponentData (e) {
          this.addskushow = e
          this.list()
      },
      skuComponenteditData (e) {
          this.editskushow = e
          this.list()
      },
      list () {
        let _this = this
        let data = {
            token:this.$webapi.get('token'),
            modelId:this.$route.params.id
        }
        this.$api.get('/model_parameter/getOne',data,reset => {
            if (reset.codeId == 1) {
                _this.itemshow = 2
               _this.file = reset.resData.url
               _this.item = reset.resData
            }
            else if(reset.codeId == 1021){
                _this.itemshow = 1
                _this.file = ""
            }
        })
      },
      remove (params) {
          let _this = this
          this.$Modal.confirm({
              title: '提示',
              content: '<p>确认【'+params.name+'】要删除吗?</p>',
              onOk: () => {
                let _this = this;
                let url="/sku_meta_property/delete?token=" + this.$webapi.get('token') + "&id=" + params.id;
                this.$api.post(url,null,reset => {
                    if (reset.codeId === 1) {
                        _this.list();
                        _this.$Message.info('删除成功')
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
                _this.Message.success("删除成功");
              },
              onCancel: () => {

              }
          });

      },
      uploadComponent (e) {
          this.file = e[0]
      },
      handleSaveSubmit () {
        let _this = this;
        let url="/model_parameter/update?token=" + this.$webapi.get('token') + "&carModelId=" + this.$route.params.id+"&url="+this.file
        this.$api.post(url,null,reset => {
            if (reset.codeId === 1) {
                 window.location.href = window.location.href
            }else {
                _this.$netcode.getApiCode(reset)
            }
        })
      },
      handleAddSubmit () {
        let _this = this;
        let url="/model_parameter/save?token=" + this.$webapi.get('token') + "&carModelId=" + this.$route.params.id+"&url="+this.file
        this.$api.post(url,null,reset => {
            if (reset.codeId === 1) {
                 window.location.href = window.location.href
            }else {
                _this.$netcode.getApiCode(reset)
            }
        })
      },
      ok () {
        let _this = this;
        let url="/model_parameter/delete?token=" + this.$webapi.get('token') + "&modelId=" + parseInt(this.$route.params.id)
        this.$api.post(url,null,reset => {
            if (reset.codeId === 1) {
               window.location.href = window.location.href
            }else {
                _this.$netcode.getApiCode(reset)
            }
        })
      }
    }
}
</script>
