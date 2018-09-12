<template>
  <div class="">
    <Modal v-model="show" width="760" @on-cancel="cancel" :mask-closable="false">
       <p slot="header">
           <Icon type="information-circled"></Icon>
           <span>用户列表(点击查询才会有结果)</span>
       </p>
       <div style="text-align:center">
         <Form ref="formCustom" :model="formCustom" :label-width="80">
             <Row>
                 <Col :xs="24" :sm="24" :md="12" :lg="12">
                     <FormItem label="手机号" prop="name">
                         <Input type="text" v-model="formCustom.name"></Input>
                     </FormItem>
                 </Col>
                 <Col :xs="24" :sm="24" :md="12" :lg="12">
                   <div class="">
                     <FormItem style="margin-left: -70px;text-align:left">
                         <Button type="primary" @click="handleSubmit()">查询</Button>
                     </FormItem>
                   </div>
                 </Col>
             </Row>
         </Form>
         <Row>
            <Col :xs="24" :sm="24" :md="24" :lg="24">
                <div class="">
                     <Table border :columns="columnsdata" :data="data" v-if="tableshow"></Table>
                </div>
            </Col>
         </Row>
       </div>
       <div slot="footer">
       </div>
    </Modal>
  </div>
</template>
<script>
export default {
    props:{
      usershow:{
        default:false
      }
    },
    mounted() {
      //do something after mounting vue instance
      this.show = this.usershow
    },
    watch:{
        usershow:{
          handler:function (val,oldval) {
              console.log(val,oldval)
              this.show = val
          },
          deep:true
        }
    },
    data() {
        return {
            show:false,
            tableshow:false,
            formCustom:{
                name:""
            },
            data:[],
            columnsdata: [
                {
                    title: '姓名',
                    key: 'name'
                },
                {
                    title: '个人身份证，企业营业执照',
                    key: 'idCarOrBusinessLicenseNo'
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    width:180,
                    render: (h, params) => {
                        var str = false
                        if(params.row.itemStatus==4 || params.row.itemStatus==3){
                          str = true
                        }
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'default'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.exportdata()
                                    }
                                }
                            }, '选择')
                        ]);
                    }
                }
            ],
        }
    },
    methods: {
      handleSubmit () {
          if(this.formCustom.name==""){
             this.$Message.info("手机号不能为空")
             return
          }
          this.post()
       },
       cancel () {
          this.remove()
       },
       remove (item) {
           this.$Modal.confirm({
               title: '提示',
               content: '<p>确认要关闭吗?</p>',
               onOk: () => {
                  this.$emit("skucomponent",this.data[0])
               },
               onCancel: () => {
                  this.show = true
               }
           });
       },
      post() {
          let _this = this
          this.data = []
          var data = {
              token:this.$webapi.get("token"),
              loginAccount:this.formCustom.name
          }
          this.$api.post("/user/getOneByLoginAccount", data, reset => {
            if (reset.codeId === 1) {
                this.data.push(reset.resData)
                this.tableshow = true
            }else {
              _this.$netcode.getApiCode(reset)
            }
          })
      },
      exportdata () {
          this.$emit('skucomponent',this.data[0])
      }
    }
  }
</script>
