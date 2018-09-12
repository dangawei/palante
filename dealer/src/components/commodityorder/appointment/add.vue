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
                   <DatePicker type="date" :value="formValidate.time" style="width: 100px;float:left" @on-change="time01"></DatePicker>
                   <TimePicker format="HH:mm:ss" :value="formValidate.hhmm" placeholder=""style="width: 100px;float:left" @on-change="time" ></TimePicker>
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
                    time:'',
                    hhmm:""
                }

            }
        },
        mounted(){
          this.formValidate.id = this.id
          this.formValidate.time = this.time
          this.eshow = this.addshow
        },
        methods: {
          time01 (e) {
            this.formValidate.time = e
          },
          time (e) {
            console.log(e)
            this.formValidate.hhmm = e
          },
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
              if(this.formValidate.hhmm==""){
                this.$Message.success('时分没有选择');
                return
              }
              if(this.formValidate.time==""){
                this.$Message.success('年月日没有选择');
                return
              }
              var data = {
                  token:this.$webapi.get('token'),
                  id:this.formValidate.id,
                  drivingTime:this.formValidate.time+" "+this.formValidate.hhmm
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
