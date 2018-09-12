<template>
  <div class="" style="text-align:left">
    <div class="demo-upload-list" v-for="(item,index) in items" v-if="items.length>0">
         <img :src="item">
         <div class="demo-upload-list-cover">
           <Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
       </div>
     </div>
     <div class="" v-if="modelstyle==1">
       <Upload
       :action="commonurl"
       :header="header"
       :format="format"
       :show-upload-list ="false"
       :Accept="Accept"
       name="mainpic"
       :on-success="onsuccess"
       style="text-align:left" v-if="items.length<uploadnum">
           <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
       </Upload>
     </div>
     <div class="" v-else-if="modelstyle==2">
       <Upload
       :action="commonurl"
       :header="header"
       :format="format"
       :show-upload-list ="false"
       :Accept="Accept"
       name="mainpic"
       :on-success="onsuccess02"
       style="text-align:left" v-if="items.length<uploadnum">
           <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
       </Upload>
     </div>
     <div class="" v-else-if="modelstyle==10">
       <Upload
       :action="commonurl"
       :header="header"
       :format="format"
       :show-upload-list ="false"
       :Accept="Accept"
       name="mainpic"
       :on-success="onsuccess02"
       style="text-align:left" v-if="items.length<uploadnum">
           <div class="upfile">
                 <p><Icon type="plus"></Icon></p>
                 <p>上传图片</p>
           </div>
       </Upload>
     </div>
     <div class="" v-else-if="modelstyle==12">
       <Upload
        multiple
       :action="commonurl"
       :header="header"
       :format="format"
       :show-upload-list ="false"
       :Accept="Accept"
       name="mainpic"
       :on-success="onsuccess01"
       style="text-align:left">
           <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
       </Upload>
     </div>
     <div class="" v-else>
       <Upload multiple
       :action="commonurl"
       :header="header"
       :format="format"
       :show-upload-list ="false"
       :Accept="Accept"
       name="mainpic"
       :on-success="onsuccess01"
       style="text-align:left">
           <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
       </Upload>
     </div>

  </div>
</template>

<script>
export default {
  props:{
    "uploadsizenum":{
      default:1
    },
    "Uploadimg":{
      default:""
    },
    "model":{
      default:1
    },
    "skuindex":String
  },
  data() {
      return {
          uploadnum:0,
          modelstyle:1,
          items:[],
          commonurl: this.$webcommon + "/pic/upload/",
          header: {
              'Content-Type': 'multipart/form-data'
          },
          format: ['jpg', 'jpeg', 'png','gif'],
          Accept: "application/json"
      }
    },
    mounted() {
      //do something after mounting vue instance
       this.uploadnum = this.uploadsizenum
       this.modelstyle = this.model
       if(this.model==2){
          if(this.Uploadimg){
             this.items = this.Uploadimg
          }else{
              this.items = []
          }
          return
       }
       if(this.Uploadimg){
          this.items.push(this.Uploadimg)
       }
    },
    methods: {
      handleRemove (index) {
         this.items.splice(index,1)
         this.$emit('delComponent',this.items)
         this.$emit('uploadComponent',this.items)
      },
      beforeupload() {

      },
      onsuccess(response, file, fileList) {
         this.items.push(response.resData)
         this.$emit('uploadComponent',this.items)
      },
      onsuccess02 (response, file, fileList){
          this.items.push(response.resData)
          var data = {
             items:this.items,
             skuindex:this.skuindex
          }
         this.$emit('uploadComponent',data)
      },
      onsuccess01(response, file, fileList) {
          this.items.push(response.resData)
          var data = {
             items:this.items,
             skuindex:this.skuindex
          }
         this.$emit('uploadComponent',data)
      }
    }
}
</script>
<style>
.upfile{
  display: inline-block;
  width:60px;
  height: 60px;
  text-align: center;
  border: 1px #999 dashed;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0,0,0,.2);
  margin-right: 10px;
}
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
