<template>
  <div class="">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem >城市管理</BreadcrumbItem>
          <BreadcrumbItem>城市列表</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
                <h2>城市列表</h2>
          </div>
      </div>
    </div>
    <div class="page-component-view">
     <div class="page-component-bd">
       <!--查询条件-->
       <div class="tableListForm">

       </div>
      <Row>
         <Col span="24">        
             <div class="city-list" v-for='item in citydata'>
                  <div class="city-list-hd">
                    <div class="city-list-hd-left">
                      <div class="city-item-icon">
                         <span @click='add(item)' v-if='!item.show'><Icon type="plus-circled"></Icon></span>
                         <span @click='add(item)' v-if='item.show'><Icon type="minus-circled"></Icon></span>
                      </div>
                      <div class="city-item-info">
                           <Input placeholder="" size="large" style="width: 200px" v-model='item.name'></Input>
                      </div>

                      <div class="city-item-sort">
                         <Input v-model="value" size="large" placeholder="" style="width:100px;margin-left:20px"></Input>
                      </div>
                    </div>
                     <div class="">
                       <Button type="primary">此类下添加子类</Button>
                       <Button type="primary">修改</Button>
                       <Button type="error">删除</Button>
                     </div>
                  </div>
                  <div class="city-list-bd" v-if='item.show'>
                    <div class="city-list" v-for='itemlist in item.list'>
                         <div class="city-list-hd">
                           <div class="city-list-hd-left">
                             <div class="city-list-icon-left ml80">

                             </div>
                             <div class="city-item-icon" >
                                <span @click='add(itemlist)' v-if='!itemlist.show'><Icon type="plus-circled"></Icon></span>
                                <span @click='add(itemlist)' v-if='itemlist.show'><Icon type="minus-circled"></Icon></span>
                             </div>
                             <div class="city-item-info">
                                  <Input placeholder=""  size="large" style="width: 200px" v-model='itemlist.name'></Input>
                             </div>

                             <div class="city-item-sort">
                                <Input v-model="value" size="large" placeholder="" style="width: 100px;margin-left:20px"></Input>
                             </div>
                           </div>
                            <div class="">
                              <Button type="primary">此类下添加子类</Button>
                              <Button type="primary">修改</Button>
                              <Button type="error">删除</Button>
                            </div>
                         </div>
                         <div class="city-list-bd" v-if='itemlist.show'>
                           <div class="city-list" v-for='itemlistlist in itemlist.list'>
                               <div class="city-list-hd">
                                  <div class="city-list-hd-left">
                                    <div class="city-list-icon-left ml120">

                                    </div>
                                     <div class="city-item-icon" ></div>
                                   <div class="city-item-info">
                                         <Input placeholder="" size="large" style="width: 200px" v-model='itemlistlist.name'></Input>
                                    </div>

                                    <div class="city-item-sort">
                                       <Input v-model="value"  size="large" placeholder="" style="width: 100px;margin-left:20px"></Input>
                                    </div>
                                  </div>
                                   <div class="">
                                     <Button type="primary">此类下添加子类</Button>
                                     <Button type="primary">修改</Button>
                                     <Button type="error">删除</Button>

                                   </div>
                                </div>
                                <div class="city-list-bd" v-if='itemlistlist.show'>

                              </div>
                           </div>
                       </div>
                    </div>
                </div>
             </div>
             <div class="city-list">
               <div class="city-list-hd">
                 <div class="city-list-hd-left">
                   <div class="city-item-icon">
                      <span><Icon type="plus-circled"></Icon></span>
                   </div>
                   <div class="city-item-info additem">
                       添加分类
                   </div>
                 </div>
               </div>
             </div>
         </Col>
      </Row>
    </div></div>
     <add-component-city @addcity></add-component-city>
  </div>
</template>
<script>
import addComponentCity from "../../infosystem/city/add"
export default {
   components:{
      addComponentCity
   },
    data () {
      return {
        citydata:[
          {
            name:'浙江省',
            show:false,
            list:[{
              name:'杭州',
              show:false,
              list:[{
                name:'西湖区',
                show:false
              }]
            }]
          },
          {
            name:'浙江省',
            show:false,
            list:[{
              name:'杭州',
              show:false,
              list:[{
                name:'西湖区',
                show:false
              }]
            }]
          },
          {
            name:'浙江省',
            show:false,
            list:[{
              name:'杭州',
              show:false,
              list:[{
                name:'西湖区',
                show:false
              }]
            }]
          },
          {
            name:'浙江省',
            show:false,
            list:[{
              name:'杭州',
              show:false,
              list:[{
                name:'西湖区',
                show:false
              }]
            }]
          }
        ]
      }
    },
    mounted() {
      //do something after mounting vue instance
      this.arealist()
    },
    methods:{
        arealist () {
           alert(1)
          var url = "http://192.168.1.203:9097/area/listArea"
          let _this = this
          this.$api.get(url, null, reset => {
            if (reset.codeId === 1) {
                 let data = reset.resData
                  console.log(data)
            }else {
              _this.$netcode.getApiCode(reset)
           }
          })
        }
    }
}
</script>
<style scoped>
    .additem{
      line-height: 40px
    }
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
