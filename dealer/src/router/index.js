import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/login'
import Index from '@/components/index/index'
import Map from '@/components/pub/map'
import Account from '@/components/infobase/account/list'
import Role from '@/components/infosystem/role/role'
import Resource from '@/components/infobase/resources/resource'
import Addresourcelist from '@/components/infobase/resources/addresourcelist'
import GetResource from '@/components/infosystem/role/getresource'
import StorefrontList from '@/components/storefront/list'
import StorefrontAdd from '@/components/storefront/add'
import StorefrontEdit from '@/components/storefront/edit'
import MaintainerList from '@/components/maintainer/list'
import POList from '@/components/purchaseorders/list'
import POAddList from '@/components/purchaseorders/addlist'
import POEditList from '@/components/purchaseorders/editlist'
import PODetail from '@/components/purchaseorders/detail'
import ListAudit from '@/components/purchaseorders/listaudit'
import AuditDetail from '@/components/purchaseorders/auditdetail'
import Rent from '@/components/commodityorder/rent/rent'
import RentDetail from '@/components/commodityorder/rent/detail'
import Appointment from '@/components/commodityorder/appointment/appointment'
import AppointmentDetail from '@/components/commodityorder/appointment/detail'
import Sell from '@/components/commodityorder/sell/sell'
import SellDetail from '@/components/commodityorder/sell/detail'
import Presell from '@/components/commodityorder/presell/presell'
import PresellDetail from '@/components/commodityorder/presell/detail'
import Cardcommon from '@/components/pub/cardcommon'
import StoreAccount from '@/components/storeaccount/list'
import carList from '@/components/carlist/list'
import storageList from '@/components/warehouse/storage/list'
import storageView from '@/components/warehouse/storage/view'
import orderTotal from '@/components/total/order'
import orderView from '@/components/total/orderview'
import todayorder from '@/components/total/todayorder'
import faultList from '@/components/fault/list'
import faultView from '@/components/fault/view'
import carlisting from '@/components/carlisting/list'
import addCaring from '@/components/carlisting/addEndCar'
import carview from '@/components/carlisting/view'
import outlineorder from '@/components/commodityorder/outline/list'
import outLineView from '@/components/commodityorder/outline/detail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/index/',
      name: 'index',
      component: Home,
      children:[
           { path: '/index/index/', component: Index}
        ]
    },
    {
      path: '/Home/',
      name: 'Home',
      component: Home,
      children:[
          { path: '/account', component: Account},
          { path: '/role', component: Role},
          { path: '/resource', component: Resource},
          { path: '/resource/addresourcelist', component: Addresourcelist},
          { path: '/getResource/:id', component: GetResource},
          { path: '/storefront/list', component: StorefrontList},
          { path: '/storefront/add', component: StorefrontAdd},
          { path: '/storefront/edit/:name/:id', component: StorefrontEdit},
          { path: '/maintainer/list', component: MaintainerList},
          { path: '/map', component: Map},
          { path: '/purchaseorder', component: POList},
          { path: '/purchaseorder/addlist', component: POAddList},
          { path: '/purchaseorder/editlist',name:'POEditList',component: POEditList},
          { path: '/purchaseorder/detail',name:'PODetail',component: PODetail},
          { path: '/purchaseorder/listaudit',name:'ListAudit',component: ListAudit},
          { path: '/purchaseorder/auditdetail',name:'AuditDetail',component: AuditDetail},
          { path: '/rent',name:'Rent',component: Rent},
          { path: '/rent/detail',name:'RentDetail',component: RentDetail},
          { path: '/appointment',name:'Appointment',component: Appointment},
          { path: '/appointment/detail',name:'AppointmentDetail',component: AppointmentDetail},
          { path: '/sell',name:'Sell',component: Sell},
          { path: '/sell/detail',name:'SellDetail',component: SellDetail},
          { path: '/presell',name:'Presell',component: Presell},
          { path: '/presell/detail',name:'PresellDetail',component: PresellDetail},
          { path: '/outline',name:'outlineorder',component: outlineorder},
          {path:'/order/outline/view/:id/:status/:outLineID/',name:'outLineView', component:outLineView},
          { path: '/cardcommon',name:'Cardcommon',component: Cardcommon},
          { path: '/storeaccount/list',name:'StoreAccount',component: StoreAccount},
          {path:'/carlist/list/',name:'carList', component:carList},
          {path:'/storage/list/',name:'storageList', component:storageList},
          {path:'/storage/view/:skuId/:modelName/:skuValue/',name:'storageView', component:storageView},
          {path:'/total/order/',name:'orderTotal', component:orderTotal},
          {path:'/total/view/:startTime?/:endTime?/:id?/:shopID?/',name:'orderView', component:orderView},
          {path:'/total/todayorder/',name:'todayorder', component:todayorder},
          {path:'/fault/list/',name:'faultList', component:faultList},
          {path:'/fault/view/',name:'faultView', component:faultView},
          {path:'/car/list/',name:'carlisting', component:carlisting},
          {path:'/car/add/',name:'addCaring', component:addCaring},
          {path:'/car/view/:id/',name:'carview', component:carview}
       ]
    },
  ]
})
