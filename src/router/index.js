import Vue from 'vue'
import Router from 'vue-router'
const DefaultPage = () => import('@/index/DefaultPage')
const Login = () => import('@/components/login/Login')
const Register = () => import('@/components/register/Register')
const MainIndex = () => import('@/components/main/MainIndex')
const TeacherList = () => import('@/components/main/TeacherList')
const ParentList = () => import('@/components/main/ParentList')
const Details = () => import('@/components/main/Details')
const Order = () => import('@/components/main/Order')
const OrderStep1 = () => import('@/components/order/OrderStep1')
const OrderStep2 = () => import('@/components/order/OrderStep2')
const Pay = () => import('@/components/order/Pay')
const PayOk = () => import('@/components/order/PayOk')
const Waiting = () => import('@/components/order/Waiting')
const BgIndex = () => import('@/components/backstage/BgIndex')
const BgLogin = () => import('@/components/backstage/BgLogin')
const TotalInfo = () => import('@/components/backstage/TotalInfo')
const AdminManage = () => import('@/components/backstage/AdminManage')
const AddAdmin = () => import('@/components/backstage/AddAdmin')

Vue.use(Router)

export default new Router({
  // linkActiveClass: 'active',
  // linkExactActiveClass: 'exact',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'defaultPage',
      component: DefaultPage,
      redirect: '/mainindex',
      children: [
        {
          path: '/mainindex',
          name: 'mainindex',
          component: MainIndex
        },
        {
          path: '/teacherlist',
          name: 'teacherlist',
          component: TeacherList
        },
        {
          path: '/parentlist',
          name: 'parentlist',
          component: ParentList
        },
        {
          path: '/details',
          name: 'details',
          component: Details
        },
        {
          path: '/order',
          name: 'order',
          component: Order,
          redirect: 'orderStep1',
          children: [
            {
              path: '/orderStep1',
              name: 'orderStep1',
              component: OrderStep1
            },
            {
              path: '/orderStep2',
              name: 'orderStep2',
              component: OrderStep2
            },
            {
              path: '/pay',
              name: 'pay',
              component: Pay
            },
            {
              path: '/payOk',
              name: 'payOk',
              component: PayOk
            },
            {
              path: '/waiting',
              name: 'waiting',
              component: Waiting
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/bgLogin',
      name: 'bgLogin',
      component: BgLogin
    },
    {
      path: '/bgIndex',
      name: 'bgIndex',
      component: BgIndex,
      redirect: '/totalInfo',
      children:[
        {
          path: '/totalInfo',
          name: 'totalInfo',
          component: TotalInfo
        },
        {
          path: '/adminManage',
          name: 'adminManage',
          component: AdminManage
        },
        {
          path: '/addAdmin',
          name: 'addAdmin',
          component: AddAdmin
        },
      ]
    }
  ]
})
