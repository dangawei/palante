<template>
  <div class="">
      <div class="demo-upload-list" v-for="(item,index) in items" v-if="items.length>0">
         <img :src="item">
         <div class="demo-upload-list-cover">
           <Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
       </div>
     </div>
    <Upload multiple
    :action="commonurl"
    :header="header"
    :format="format"
    :show-upload-list ="false"
    :Accept="Accept"
    name="mainpic"
    max-size="102400"
    :on-success="onsuccess"
    style="text-align:left"
    v-if="items.length<uploadnum">
        <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
    </Upload>
    <div class="mt10">
        <Alert banner closable type="warning">图片大小不能超过2M</Alert>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    "uploadsizenum":{
      default:1
    },
    "Uploadimg":String
  },
  data() {
      return {
          uploadnum:0,
          items:[],
          commonurl:this.$webcommon + "/pic/upload/" ,
          header: {
              'Content-Type': 'multipart/form-data'
          },
          format: ['jpg', 'jpeg', 'png'],
          Accept: "application/json"
      }
    },
    mounted() {
      //do something after mounting vue instance  
       this.uploadnum = this.uploadsizenum
       if(this.Uploadimg){
          this.items.push(this.Uploadimg)
       }

    },
    methods: {
      handleRemove (index) {
         this.items.splice(index,1)
         this.$emit('uploadComponent',this.items)
      },
      beforeupload() {

      },
      onsuccess(response, file, fileList) {
          if(response.codeId==1){
            this.items.push(response.resData)
            this.$emit('uploadComponent',this.items)
          }else{
            this.$netcode.getApiCode(response)
          }
      }
    }
}
</script>
<style>
.demo-upload-list{
     display: inline-block;
     width: 60px;
     height: 60px;
     text-align: center;
     line-height: 60px;
     border: 1px solid transparent;
     border-radius: 4px;
     overflow: hidden;
     background: #fff;
     position: relative;
     box-shadow: 0 1px 1px rgba(0,0,0,.2);
     margin-right: 4px;
 }
 .demo-upload-list img{
     width: 100%;
     height: 100%;
 }
 .demo-upload-list-cover{
     display: none;
     position: absolute;
     top: 0;
     bottom: 0;
     left: 0;
     right: 0;
     background: rgba(0,0,0,.6);
 }
 .demo-upload-list:hover .demo-upload-list-cover{
     display: block;
 }
 .demo-upload-list-cover i{
     color: #fff;
     font-size: 20px;
     cursor: pointer;
     margin: 0 2px;
 }
</style>
