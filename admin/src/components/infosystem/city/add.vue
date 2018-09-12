<template>
 <div class="">
   <Modal v-model="modal1" width="360">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>Delete confirmation</span>
        </p>
        <div style="text-align:center">
          <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
               <FormItem label="name" prop="name">
                   <Input type="text" v-model="formCustom.name"></Input>
               </FormItem>
               <FormItem>
                   <Button type="primary" @click="handleSubmit('formCustom')">Submit</Button>
                   <Button type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px">Reset</Button>
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
    data () {
        return {
          modal1:true,
          formValidate: {
            name: '',
            mail: '',
            city: '',
            gender: '',
            interest: [],
            date: '',
            time: '',
            desc: ''
          },
           ruleValidate: {
             name: [
                 { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                ],
           },
           methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
      }
    },
    methods:{
      add (item) {
          item.show = !item.show
      }
    }
}
</script>
<style scoped>
   .city-list-hd{
      margin-bottom: 10px;
      border-bottom: #eee 1px solid;
      min-height: 60px
    }
     .city-list-hd{
       display: flex;
       flex: 1;
       flex-direction: row;
     }
     .city-list-hd-left{
       display: flex;
       flex: 1;
     }
     .city-item-icon{
       padding: 0 10px;
       font-size: 28px;
       color:#06c;
       cursor: pointer;
     }
     .city-list-icon-left{
       width: 20px;
       overflow: hidden;
       background: url("../../../assets/cat_left.png")
      }
      .city-item-info{
        flex:1;
        text-align:left
      }
      .city-item-sort{
        width: 200px
      }
</style>
