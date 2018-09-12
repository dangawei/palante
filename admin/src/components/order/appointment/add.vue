<template>
    <div>
      <Modal v-model="eshow" width="360" @on-cancel="cancel" :mask-closable="false">
         <p slot="header">
             <Icon type="information-circled"></Icon>
             <span>到店体验时间</span>
         </p>
         <div style="text-align:center">
           <Form ref="formValidate" :model="formValidate" :label-width="80">
                <FormItem label="通知时间:">
                   <DatePicker type="date" :value="formValidate.time" style="width: 200px"></DatePicker>
                </FormItem>
              <FormItem>
                  <Button type="primary" @click="handleSubmit('formValidate')">通知</Button>
                  <Button type="error" @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
              </FormItem>
          </Form>
         </div>
         <div slot="footer">
         </div>
      </Modal>
    </div>
</template>
<script>
    export default {
        props: {
          addshow:{
              default:false
          },
          id:{
            default:""
          },
          time:{
            default:""
          }
        },
        data () {
            return {
                eshow:false,
                formValidate:{
                    id:"",
                    time:''
                }

            }
        },
        mounted(){
          this.formValidate.id = this.id
          this.formValidate.time = this.time
          this.eshow = this.addshow
        },
        methods: {
          cancel () {
            this.remove()
          },
          remove (item) {
            this.$Modal.confirm({
                title: '提示',
                content: '<p>确认要关闭吗?</p>',
                onOk: () => {
                  this.eshow = false
                  this.$emit('appointment',false)
                },
                onCancel: () => {
                   this.eshow = true
                }
            });
          },
          handleSubmit (name) {
              this.post()
            },
            handleReset (name) {
               this.remove()
            },
            post () {
              let _this = this;
              var data = {
                  token:this.$webapi.get('token'),
                  id:this.formValidate.id,
                  time:this.formValidate.time
              }
              this.$api.post("/appointment_driving/inform", data, reset => {
                if (reset.codeId === 1) {
                    this.$Message.success('修改成功');
                    _this.eshow = false
                    _this.$emit('appointment',false)
                }else {
                  _this.$netcode.getApiCode(reset)
               }
              })
            }
        }
    }
</script>
