<template>
  <div>
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem to="/dealer/list/">经销商列表</BreadcrumbItem>
          <BreadcrumbItem>添加经销商</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
                <h2>添加经销商</h2>
          </div>
      </div>
    </div>
    <div class="page-view allm20">
      <div class="page-view-body">
      <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="100">
         <div class="pagelist">
                <div class="pagelist-hd">基本信息</div>
                <div class="pagelist-bd">
                  <Row>
                       <Col :xs="24" :sm="24" :md="6" :lg="8">
                         <FormItem label="经销商名称" prop="name">
                             <Input v-model="formItem.name" placeholder="经销商名称"></Input>
                         </FormItem>
                       </Col>
                     <Col :xs="24" :sm="24" :md="12" :lg="24">
                       <FormItem label="上传店招">
                         <Upload action="//jsonplaceholder.typicode.com/posts/">
                            <Button type="ghost" icon="ios-cloud-upload-outline">Upload files</Button>
                        </Upload>
                       </FormItem>
                     </Col>
                     <Col :xs="24" :sm="24" :md="6" :lg="8">
                         <FormItem label="联系人电话" prop="contactname">
                             <Input v-model="formItem.contactname" placeholder="联系人电话"></Input>
                         </FormItem>
                       </Col>
                       <Col :xs="24" :sm="24" :md="6" :lg="24"></Col>
                       <Col :xs="24" :sm="24" :md="12" :lg="8">
                         <FormItem label="选择城市" prop="provinceCode">
                           <Select v-model="formItem.provinceCode" placeholder="选择省份">
                               <Option value="beijing">New York</Option>
                               <Option value="shanghai">London</Option>
                               <Option value="shenzhen">Sydney</Option>
                           </Select>
                         </FormItem>
                       </Col>
                       <Col :xs="24" :sm="24" :md="12" :lg="8">
                         <FormItem label="选择市区" prop="cityCode">
                           <Select v-model="formItem.cityCode" placeholder="选择市区">
                               <Option value="beijing">New York</Option>
                               <Option value="shanghai">London</Option>
                               <Option value="shenzhen">Sydney</Option>
                           </Select>
                         </FormItem>
                       </Col>
                       <Col :xs="24" :sm="24" :md="12" :lg="8">
                         <FormItem label="选择区/县" prop="areaCode">
                           <Select v-model="formItem.areaCode" placeholder="选择区/县">
                               <Option value="beijing">New York</Option>
                               <Option value="shanghai">London</Option>
                               <Option value="shenzhen">Sydney</Option>
                           </Select>
                         </FormItem>
                       </Col>
                        <Col :xs="24" :sm="24" :md="6" :lg="8">
                         <FormItem label="具体地址" prop="address">
                             <Input v-model="formItem.address" type="textarea" :rows="4" placeholder="Enter something..."></Input>
                         </FormItem>
                       </Col>
                  </Row>
                </div>
                <div class="page-divider page-divider-horizontal "></div>
            </div>
         <FormItem>
           <Button type="primary" @click="handleSubmit('formItem')" size="large">添加</Button>
           <Button type="ghost" @click="handleReset('formItem')" style="margin-left: 8px" size="large">重置</Button>
       </FormItem>
      </Form>
      </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
        formItem: {
            name: '',
            receiptContactTelephone: '',
            receiptContactName:'',
            receiptContactName:'',
            payee:"",
            bankCard:"",
            depositBank:"",
            registrationumber:"",
            enterprisename:"",
            address:"",
            contactname:"",
            icon:"",
            provinceCode:"",
            cityCode:"",
            areaCode:""
    },
    ruleValidate: {
        name: [
            { required: true, message: '经销商名称没有填写', trigger: 'blur' },
            { type: 'string', max: 20, message: '经销商名称没有填写', trigger: 'blur' }
        ],
        contactname: [
            { required: true, message: '联系人没有填写',  trigger: 'blur' },
            { type: 'string', max: 20, message: '联系人长度不能超过20字符', trigger: 'blur' }
        ],
        provinceCode: [
            { required: true, message: '基本信息-省没有选择',  trigger: 'change' }
        ],
        cityCode: [
            { required: true, message: '基本信息-市区没有选择',  trigger: 'change' }
        ],
        areaCode: [
            { required: true, message: '基本信息-区/县没有选择',  trigger: 'change' }
        ],
        address: [
            { required: true, message: '地址没有填写',  trigger: 'blur' },
            { type: 'string', min: 20, message: '地址最小不能2个字符', trigger: 'blur' }
        ],
        enterprisename: [
            { required: true, message: '企业名称没有填写',  trigger: 'blur' },
            { type: 'string', message: '企业名称没有填写', trigger: 'blur' }
        ],
        registrationumber: [
            { required: true, message: '组织代码号没有填写',  trigger: 'blur' },
            { type: 'string', message: '组织代码号没有填写', trigger: 'blur' }
        ],
        depositBank: [
            { required: true, message: '开户行没有填写',  trigger: 'blur' },
            { type: 'string', message: '开户行没有填写', trigger: 'blur' }
        ],
        bankCard: [
            { required: true, message: '银行卡号没有填写',  trigger: 'blur' },
            { type: 'string', message: '银行卡号没有填写', trigger: 'blur' }
        ],
        payee: [
            { required: true, message: '银行信息-收款方没有填写',  trigger: 'blur' },
            { type: 'string',message: '银行信息-收款方没有填写', trigger: 'blur' }
        ],
        receiptContactTelephone: [
            { required: true, message: '银行信息-联系电话例子:0571-1111111111', trigger: 'blur' },
            { type: 'string', min: 13, message: '银行信息-联系电话例子:0571-1111111111', trigger: 'blur' }
        ],
        receiptContactName: [
            { required: true, message: '银行信息-联系人没有填写',  trigger: 'blur' },
            { type: 'string', message: '联系人长度不能超过20字符', trigger: 'blur' }
        ]
        },
       data: [{
                     value: 'beijing',
                     label: '北京',
                     children: [
                         {
                             value: 'gugong',
                             label: '故宫'
                         },
                         {
                             value: 'tiantan',
                             label: '天坛'
                         },
                         {
                             value: 'wangfujing',
                             label: '王府井'
                         }
                     ]
                 }, {
                     value: 'jiangsu',
                     label: '江苏',
                     children: [
                         {
                             value: 'nanjing',
                             label: '南京',
                             children: [
                                 {
                                     value: 'fuzimiao',
                                     label: '夫子庙',
                                 }
                             ]
                         },
                         {
                             value: 'suzhou',
                             label: '苏州',
                             children: [
                                 {
                                     value: 'zhuozhengyuan',
                                     label: '拙政园',
                                 },
                                 {
                                     value: 'shizilin',
                                     label: '狮子林',
                                 }
                             ]
                         }
                     ],
     }]
    }
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
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">


</style>
