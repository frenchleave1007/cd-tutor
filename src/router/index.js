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
const AdminInfo = () => import('@/components/backstage/AdminInfo')
const AdminChange = () => import('@/components/backstage/AdminChange')
const About = () => import('@/components/backstage/About')
const OrderManage = () => import('@/components/backstage/OrderManage')
const ParentInfo = () => import('@/components/backstage/ParentInfo')
const TeacherInfo = () => import('@/components/backstage/TeacherInfo')
const UserInfo = () => import('@/components/backstage/UserInfo')

Vue.use(Router)

const router = new Router({
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
      redirect: '/bgIndex/totalInfo',
      beforeEnter(to, from, next) {
        if(sessionStorage.adminNum){
                next();
              }else{
                next({
                  name:'bgLogin'
                })
              }
      },
      children: [
        {
          path: 'totalInfo',
          name: 'totalInfo',
          meta: ['数据总览'],
          component: TotalInfo
        },
        {
          path: 'adminManage',
          name: 'adminManage',
          meta: ['管理员管理', '管理员总览'],
          component: AdminManage
        },
        {
          path: 'addAdmin',
          name: 'addAdmin',
          meta: ['管理员管理', '管理员添加'],
          component: AddAdmin
        },
        {
          path: 'adminInfo',
          name: 'adminInfo',
          meta: ['管理员管理', '管理员信息'],
          component: AdminInfo
        },
        {
          path: 'adminChange',
          name: 'adminChange',
          meta: ['管理员管理', '管理员信息修改'],
          component: AdminChange
        },
        {
          path: 'about',
          name: 'about',
          meta: ['关于','相关信息说明'],
          component: About
        },
        {
          path: 'orderManage',
          name: 'orderManage',
          meta: ['订单管理'],
          component: OrderManage
        },
        {
          path: 'teacherInfo',
          name: 'teacherInfo',
          meta: ['发布信息管理','教师信息发布'],
          component: TeacherInfo
        },
        {
          path: 'parentInfo',
          name: 'parentInfo',
          meta: ['发布信息管理','家长信息发布'],
          component: ParentInfo
        },
        {
          path: 'userInfo',
          name: 'userInfo',
          meta: ['用户管理','所有用户'],
          component: UserInfo
        },
      ]
    }
  ]
})

// router.beforeEach((to,from,next) => { // 全局守卫
//   console.log(to)
//   if(to.path.indexOf("/bgIndex/") == 0){
//     if(sessionStorage.adminNum){
//       next();
//     }else{
//       next({
//         name:'bgLogin'
//       })
//     }
//   }else{
//     next();
//   }
//   // console.log(from)
// })

export default router;