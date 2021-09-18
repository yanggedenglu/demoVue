import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
// import { title } from '@/settings'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/register',
    component: () => import('@/views/login/register/index'),
    hidden: true
  },

  {
    path: '/email',
    component: () => import('@/views/login/email/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: { title: '首页', icon: 'dashboard' },
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '用户管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '用户信息', icon: 'table' }
      },
      {
        path: 'test',
        name: 'ComIndex',
        component: () => import('@/views/test/index'),
        meta: { title: '组件', icon: 'table' }
      }
    ]
  },
  {
    path: '/element',
    name: 'element',
    redirect: '/element/layout',
    meta: { title: 'element', icon: 'eye' },
    component: Layout,
    children: [
      {
        path: 'layout',
        name: 'layout',
        component: () => import('@/views/element/layout/index'),
        meta: { title: 'layout布局', icon: 'layout' }
      },
      {
        path: 'radio',
        name: 'radio',
        component: () => import('@/views/element/radio/index'),
        meta: { title: 'radio', icon: 'table' }
      },
      {
        path: 'cascader',
        name: 'cascader',
        component: () => import('@/views/element/cascader/index'),
        meta: { title: 'cascader', icon: 'table' }
      }
    ]
  },
  {
    path: '/study',
    name: 'study',
    redirect: '/study/main',
    meta: { title: 'study', icon: 'eye' },
    component: Layout,
    children: [
      {
        path: 'main',
        name: 'main',
        component: () => import('@/study/main/index'),
        meta: { title: 'main', icon: 'form' }
      },
      {
        path: 'upload',
        name: 'upload',
        component: () => import('@/study/upload/index'),
        meta: { title: 'upload', icon: 'form' }
      },
      {
        path: 'select',
        name: 'select',
        component: () => import('@/study/select/index'),
        meta: { title: 'select' }
      },
      {
        path: 'canvas',
        name: 'canvas',
        component: () => import('@/study/canvas/index'),
        meta: { title: 'canvas' }
      },
      {
        path: 'export',
        name: 'export',
        component: () => import('@/study/export/xlxs.vue'),
        meta: { title: 'export' }
      },
      {
        path: 'directive',
        name: 'directive',
        component: () => import('@/study/directive'),
        meta: { title: 'directive' }
      },
      {
        path: 'log',
        name: 'log',
        component: () => import('@/study/log'),
        meta: { title: 'log' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

// 实例化vue的时候只挂载constantRouter
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
