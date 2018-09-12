import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Homelayout from '@/components/Homelayout'
import monitorlayout from '@/components/monitorlayout'
import Login from '@/components/login'
import Index from '@/components/index/index'
import Department from '@/components/infobase/department/list'
import Resource from '@/components/infobase/resources/resource'
import dealerResources from '@/components/infobase/dealerResources/resource'
import Addresourcelist from '@/components/infobase/resources/addresourcelist'
import Adddealerresourcelist from '@/components/infobase/dealerResources/addresourcelist'
import Account from '@/components/infobase/account/list'
import dealerAccount from '@/components/infobase/dealeraccount/list'
import Role from '@/components/infosystem/role/role'
import dealerRole from '@/components/infosystem/dealerRole/role'
import Question from '@/components/infobase/question/list'
import Addquestion from '@/components/infobase/question/addquestion'
import Editquestion from '@/components/infobase/question/editquestion'
import Aboutus from '@/components/infobase/aboutus/aboutus'
import Addaboutus from '@/components/infobase/aboutus/addaboutus'
import Editaboutus from '@/components/infobase/aboutus/editaboutus'
import DetailAboutus from '@/components/infobase/aboutus/detailaboutus'
import city from '@/components/infosystem/city/city'
import addBannerlist from '@/components/infosystem/banner/addlist'
import editBannerlist from '@/components/infosystem/banner/editlist'
import Bannerlist from '@/components/infosystem/banner/list'
import bannerclassify from '@/components/infosystem/bannerclassify/list'
import noticelist from '@/components/infosystem/notice/list'
import editnotice from '@/components/infosystem/notice/editnotice'
import addnotice from '@/components/infosystem/notice/addnotice'
import DetailNotice from '@/components/infosystem/notice/detailnotice'
import subnav from '@/components/infosystem/subnav/list'
import dealerList from '@/components/dealer/list'
import Adddealer from '@/components/dealer/add'
import Editdealer from '@/components/dealer/editdearle'
import AdddealerBank from '@/components/dealer/addBank'
import editdealerBank from '@/components/dealer/editBank'
import DealerDetail from '@/components/dealer/detail'
import UE from '@/components/pub/UE'
import Citycommon from '@/components/pub/citycommon'
import GetResource from '@/components/infosystem/role/getResource'
import Car from '@/components/car/car'
import AreaPriceList from '@/components/car/areapricelist'
import GetdealerResource from '@/components/infosystem/dealerRole/getResource'
import Company from '@/components/company/company'
import AddCompany from '@/components/company/addcompany'
import EditCompany from '@/components/company/editcompany'
import Brand from '@/components/brand/brand'
import AddBrand from '@/components/brand/addbrand'
import EditBrand from '@/components/brand/editbrand'
import carSKU from '@/components/carSku/list'
import SKUlist from '@/components/carSku/skulist'
import SkuSave from '@/components/carSku/skuitemlist'
import Purcharse from '@/components/purcharse/list'
import POlist from '@/components/purchaseorder/list'
import POdetail from '@/components/purchaseorder/detail'
import POauditlist from '@/components/purchaseorder/purchaseauditlist'
import POauditdetail from '@/components/purchaseorder/purchaseauditdetail'
import AreaPriceDetailList from '@/components/car/areapricedetaillist'
import AddAreaprice from '@/components/car/addareaprice'
import UserSkuList from '@/components/userrent/skulist'
import UserPriceList from '@/components/userrent/userpricelist'
import AddUserPrice from '@/components/userrent/adduserprice'
import UserBuyList from '@/components/userrent/userbuylist'
import AddUserBuy from '@/components/userrent/adduserbuy'
import Deploy from '@/components/car/deploy'
import problemList from '@/components/infobase/problem/list'
import problemAdd from '@/components/infobase/problem/add'
import problemEdit from '@/components/infobase/problem/edit'
import problemDetail from '@/components/infobase/problem/detail'
import itemList from '@/components/item/list'
import itemAdd from '@/components/item/add'
import itemAddList from '@/components/item/additemlist'
import itemEditList from '@/components/item/edititemlist'
import itemView from '@/components/item/itemview'
import carModel from '@/components/carmodelcategory/list'
import Rent from '@/components/audit/rent/rent'
import RentDetail from '@/components/audit/rent/detail'
import Sell from '@/components/audit/sell/sell'
import SellDetail from '@/components/audit/sell/detail'
import Presell from '@/components/audit/presell/presell'
import PresellDetail from '@/components/audit/presell/detail'
import Member from '@/components/member/list'
import MemberDetail from '@/components/member/detail'
import MemberCompanyDetail from '@/components/member/companydetail'
import ProblemStyle from '@/components/infobase/problemstyle/list'
import AdvertisementList from '@/components/advertisement/list/'
import subcompanyList from '@/components/subcompany/list/'
import subcompanyAdd from '@/components/subcompany/add/'
import OpenCity from '@/components/opencity/list'
import subcompanyEdit from '@/components/subcompany/edit/'
import Hotitemlist from '@/components/hotitem/list/'
import Appointment from '@/components/order/Appointment/appointment'
import itemcard from '@/components/member/cardID'
import itemcardview from '@/components/member/cardview'
import itemdriver from '@/components/member/driver'
import itemdriverview from '@/components/member/driverview'
import appversion from '@/components/infobase/appversion/list'
import carduration from '@/components/car/carduration/list'
import Batterytype from '@/components/car/carclassify/batterytype/list'
import cardynamic from '@/components/car/carclassify/cardynamic/list'
import carmodel from '@/components/car/carclassify/carmodel/list'
import carvoltage from '@/components/car/carclassify/carvoltage/list'
import motorcooling from '@/components/car/carclassify/motorcooling/list'
import motordecorate from '@/components/car/carclassify/motordecorate/list'
import motortype from '@/components/car/carclassify/motortype/list'
import carmonitor from '@/components/carmonitor/list'
import carparms from '@/components/car/carconfiguration/list'
import warehouse from '@/components/warehouse/warehouselist/list'
import subcompanyhouse from '@/components/warehouse/subcampany/list'
import stockinList from '@/components/warehouse/stockin/list'
import stockinView from '@/components/warehouse/stockin/view'
import stockoutList from '@/components/warehouse/stockout/list'
import stockoutAdd from '@/components/warehouse/stockout/add'
import storageList from '@/components/warehouse/storage/list'
import storageView from '@/components/warehouse/storage/view'
import stockoutView from '@/components/warehouse/stockout/view'
import carList from '@/components/warehouse/carlist/list'
import dearlestorageList from '@/components/warehouse/dearlestorage/list'
import dearlestorageView from '@/components/warehouse/dearlestorage/view'
import carmonitorindex from '@/components/carmonitor/index'
import outLine from '@/components/order/outline/list'
import outLineView from '@/components/order/outline/detail'
import companyLine from '@/components/user/company/list'
import companyLinepass from '@/components/user/company/passlist'
import companyView from '@/components/user/company/view'
import orderTotal from '@/components/total/order/list'
import orderView from '@/components/total/order/view'
import todayorder from '@/components/total/order/todayorder'
import dearleorder from '@/components/total/dearleorder/list'
import dearleorderview from '@/components/total/dearleorder/listview'
import dearleTotal from '@/components/total/dearleorder/totallist'
import storageCompany from '@/components/warehouse/storage/companylist'
import purchaseOrderPay from '@/components/pay/purchase/list'
import purchasepay from '@/components/pay/purchase/view'
import Monitor from "@/components/Mlayout"
import MINDEX from "@/components/MSYSTEM/index"
import MLIST from "@/components/MSYSTEM/list/list"
import StorefrontList from "@/components/dealer/storefront/list"
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
     path:'/carmonitor/',
     name:'carmonitor',
     component:Homelayout,
     children:[
       {path:'/carmonitor/list/', component: carmonitor}
      ]
     },
     {
      path:'/monitorindex/',
      name:'monitorindex',
      component:monitorlayout,
      children:[
           {path:'/monitorindex/index/', component: carmonitorindex}
       ]
    },
    {
     path:'/Monitor/',
     name:'Monitor',
     component:Monitor,
     children:[
         {path:'/M/index/', component: MINDEX},
         {path:'/M/list/', component: MLIST}
      ]
    },
    {
      path: '/Home/',
      name: 'Home',
      component: Home,
      children: [
          {path:'/index/', component: Index},
          {path:'/banner/list/', component: Bannerlist},
          {path:'/banner/addlist/', component: addBannerlist},
          {path:'/banner/editlist/:title/:id/', component: editBannerlist},
          {path:'/notice/list/', component: noticelist},
          {path:'/notice/addnotice', component: addnotice},
          {path:'/notice/editnotice/:id', component: editnotice},
          {path:'/notice/detail/:id', component: DetailNotice},
          {path:'/subnav/list', component: subnav},
          {path:'/dealer/list', component: dealerList},
          {path:'/dealer/addlist', component: Adddealer},
          {path:'/dealer/editdearle/:id', component: Editdealer},
          {path:'/dealer/addbank/:id', component: AdddealerBank},
          {path:'/dealer/editbank/:id', component: editdealerBank},
          {path:'/dealer/detail/:id', component: DealerDetail},
          {path:'/city/city', component: city},
          {path:'/department', component: Department},
          {path:'/role', component: Role},
          {path:'/dealerRole', component: dealerRole},
          {path:'/account', component: Account},
          {path:'/dealerAccount', component: dealerAccount},
          {path:'/question', component: Question},
          {path:'/question/addquestion', component: Addquestion},
          {path:'/question/editquestion',name:'Editquestion', component: Editquestion},
          {path:'/aboutus', component: Aboutus},
          {path:'/aboutus/addaboutus', component: Addaboutus},
          {path:'/aboutus/editaboutus/:id', component: Editaboutus},
          {path:'/aboutus/detail/:id', component: DetailAboutus},
          {path:'/ue', component:UE},
          {path:'/citycommon', component: Citycommon},
          {path:'/resource', component: Resource},
          {path:'/resource/addresourcelist', component: Addresourcelist},
          {path:'/getResource/:id/', component: GetResource},
          {path:'/car', component: Car},
          {path:'/resource/adddealerresourcelist', component: Adddealerresourcelist},
          {path:'/getResource/:id/', component: GetResource},
          {path:'/getdealerResource/:id/', component: GetdealerResource},
          {path:'/dealerResource', component: dealerResources},
          {path:'/areapricelist/:modelId',name:'AreaPriceList', component: AreaPriceList},
          {path:'/company',name:'Company', component: Company},
          {path:'/company/addcompany',name:'AddCompany', component: AddCompany},
          {path:'/company/editcompany/:id',name:'EditCompany', component: EditCompany},
          {path:'/brand',name:'Brand', component: Brand},
          {path:'/bannerclassify',name:'bannerclassify', component: bannerclassify},
          {path:'/brand/addbrand',name:'AddBrand', component: AddBrand},
          {path:'/brand/editbrand/:enterpriseId/:id',name:'EditBrand', component: EditBrand},
          {path:'/carsku/:id/:title/',name:'carSKU', component: carSKU},
          {path:'/skulist/:id/:modelname/',name:'SKUlist', component: SKUlist},
          {path:'/skuitemlist/:id/:modelname/',name:'skuitemlist', component: SkuSave},
          {path:'/purcharse',name:'Purcharse', component: Purcharse},
          {path:'/purchaseorder',name:'POlist', component: POlist},
          {path:'/purchaseorder/detail/',name:'POdetail', component: POdetail},
          {path:'/purchaseorder/auditlist',name:'POauditlist', component: POauditlist},
          {path:'/purchaseorder/auditdetail',name:'POauditdetail', component: POauditdetail},
          {path:'/userskulist/:modelId',name:'UserSkuList', component: UserSkuList},
          {path:'/userpricelist/:modelId/:id',name:'UserPriceList', component: UserPriceList},
          {path:'/userpricelist/adduserprice/:modelId/:id',name:'AddUserPrice', component: AddUserPrice},
          {path:'/userbuylist/:modelId/:id',name:'UserBuyList', component: UserBuyList},
          {path:'/userbuylist/adduserbuy/:modelId/:id',name:'AddUserBuy', component: AddUserBuy},
          {path:'/areapricelist/detail/:modelId/:id',name:'AreaPriceDetailList', component: AreaPriceDetailList},
          {path:'/areapricelist/addareaprice/:modelId/:id',name:'AddAreaprice', component: AddAreaprice},
          {path:'/problemstyle/list/',name:'ProblemStyle', component: ProblemStyle},
          {path:'/problem/list/',name:'problemList', component: problemList},
          {path:'/problem/add/',name:'problemAdd', component: problemAdd},
          {path:'/problem/edit/:title/:id/:classifyId',name:'problemEdit', component: problemEdit},
          {path:'/problem/detail/:title/:id/:classifyId',name:'problemDetail', component: problemDetail},
          {path:'/item/list/',name:'itemList', component: itemList},
          {path:'/item/view/:id',name:'itemView', component: itemView},
          {path:'/item/add/',name:'itemList', component: itemAdd},
          {path:'/item/additemlist/:id/:title/:brandID/:brandName',name:'itemAddList', component:itemAddList},
          {path:'/item/edititemlist/:id',name:'itemEditList', component:itemEditList},
          {path:'/carmodel/list',name:'carModel', component:carModel},
          {path:'/rent',name:'Rent', component:Rent},
          {path: '/rent/detail/',name:'RentDetail',component: RentDetail},
          {path: '/sell',name:'Sell',component: Sell},
          {path: '/sell/detail',name:'SellDetail',component: SellDetail},
          {path: '/presell',name:'Presell',component: Presell},
          {path: '/presell/detail',name:'PresellDetail',component: PresellDetail},
          {path:'/item/deploy/:id/:title/',name:'Deploy', component:Deploy},
          {path:'/member/list',name:'Member', component:Member},
          {path:'/member/detail/:id',name:'MemberDetail', component:MemberDetail},
          {path:'/member/companydetail/:id',name:'MemberCompanyDetail', component:MemberCompanyDetail},
          {path:'/advertisement/list',name:'AdvertisementList', component:AdvertisementList},
          {path:'/opencity/list',name:'OpenCity', component:OpenCity},
          {path:'/subcompany/list',name:'subcompanyList', component:subcompanyList},
          {path:'/subcompany/add',name:'subcompanyAdd', component:subcompanyAdd},
          {path:'/subcompany/edit/:id/',name:'subcompanyEdit', component:subcompanyEdit},
          {path:'/hotitem/list/',name:'Hotitemlist', component:Hotitemlist},
          {path:'/order/appointment/',name:'Appointment', component:Appointment},
          {path:'/member/card/',name:'itemcard', component:itemcard},
          {path:'/member/cardview/:id/',name:'itemcardview', component:itemcardview},
          {path:'/member/driver/',name:'itemdriver', component:itemdriver},
          {path:'/member/itemdriverview/:id/',name:'itemdriverview', component:itemdriverview},
          {path:'/member/app/',name:'appversion', component:appversion},
          {path:'/car/carduration/',name:'carduration', component:carduration},
          {path:'/car/batterytype/',name:'Batterytype', component:Batterytype},
          {path:'/car/cardynamic/',name:'cardynamic', component:cardynamic},
          {path:'/car/carmodel/',name:'carmodel', component:carmodel},
          {path:'/car/carvoltage/',name:'carvoltage', component:carvoltage},
          {path:'/car/motorcooling/',name:'motorcooling', component:motorcooling},
          {path:'/car/motordecorate/',name:'motordecorate', component:motordecorate},
          {path:'/car/motortype/',name:'motortype', component:motortype},
          {path:'/car/carparms/',name:'carparms', component:carparms},
          {path:'/warehouse/list/',name:'warehouse', component:warehouse},
          {path:'/subcompanyhouse/list/',name:'subcompanyhouse', component:subcompanyhouse},
          {path:'/stockin/list/',name:'stockinList', component:stockinList},
          {path:'/stockin/view/:id/:status/',name:'stockinView', component:stockinView},
          {path:'/stockout/list/',name:'stockoutList', component:stockoutList},
          {path:'/stockout/add/',name:'stockoutAdd', component:stockoutAdd},
          {path:'/storage/list/',name:'storageList', component:storageList},
          {path:'/storage/view/:skuId/:modelName/:skuValue/:warehouseId?/',name:'storageView', component:storageView},
          {path:'/stockout/view/:id/:status',name:'stockoutView', component:stockoutView},
          {path:'/carlist/list/',name:'carList', component:carList},
          {path:'/dearlestorage/list/',name:'dearlestorageList', component:dearlestorageList},
          {path:'/dearlestorage/view/:modelId/:skuId/:dealerId?/',name:'dearlestorageView', component:dearlestorageView},
          {path:'/order/outline',name:'outLine', component:outLine},
          {path:'/order/outline/view/:id/:status/:outLineID/',name:'outLineView', component:outLineView},
          {path:'/user/company',name:'companyLine', component:companyLine},
          {path:'/user/companypass',name:'companyLinepass', component:companyLinepass},
          {path:'/user/ivew/:id',name:'companyView', component:companyView},
          {path:'/total/order',name:'orderTotal', component:orderTotal},
          {path:'/total/view/:startTime?/:endTime?/:id?/:shopID?/',name:'orderView', component:orderView},
          {path:'/total/todayorder/',name:'todayorder', component:todayorder},
          {path:'/dearleorder/order',name:'dearleorder', component:dearleorder},
          {path:'/dearleorder/orderview',name:'dearleorderview', component:dearleorderview},
          {path:'/dearleorder/totallist',name:'dearleTotal', component:dearleTotal},
          {path:'/storage/storageCompany/:modelId?/:skuId?/:warehouseId?/',name:'storageCompany', component:storageCompany},
          {path:'/pay/purchase',name:'purchaseOrderPay', component:purchaseOrderPay},
          {path:'/pay/purchase/view/:id/',name:'purchasepay', component:purchasepay},
          {path:'/storefront/list/',name:'StorefrontList', component:StorefrontList},
        ]
    },
  ]
})
