<template>
  <div class="">
   <Modal v-model="show" width="360" @on-cancel="cancel" :mask-closable="false">
      <p slot="header">
          <Icon type="information-circled"></Icon>
          <span>审核还车单</span>
      </p>
      <div style="text-align:center">
           <div class="carbox">
              <div class="carbox-hd">
                <Form :model="formValidate"  :label-width="80" :mask-closable="false">
                    <Row>
                       <Col :xs="24" :sm="24" :md="24" :lg="24">
                          <FormItem label="审核状态" prop="value" >
                            <Select v-model="formValidate.status">
                               <Option value="" >全部</Option>
                               <Option value="2">审核通过</Option>
                               <Option value="3">审核不通过</Option>
                            </Select>
                           </FormItem>
                        </Col>
                    </Row>
                </Form>
              </div>
              <div class="mt20">
                  <span><Button type="primary" @click="save()">保存</Button></span>
              </div>
           </div>
      </div>
      <div slot="footer">
      </div>
   </Modal>
</div>
</template>
<script>
  export default {
    props:{
      auitshow:{
        default:false
      }
    },
    data () {
        return {
            formValidate:{
              status:'',
            },
            show:false,
        }
    },
    mounted() {
      this.show = this.auitshow
    },
    methods: {
      save () {
        this.exportList()
      },
      cancel (){
        this.exportList()
      },
      exportList () {
        this.show = false
        this.$emit("auitemit",this.formValidate.status)
      }
    }
}
</script>
