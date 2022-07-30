import Layout from '@/layout'

const ExampleRouter = {
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
      path: '​FormData',
      name: '​FormData',
      component: () => import('@/views/​formData/index'),
      meta: { title: '​FormData', icon: 'table' }
    }
  ]
}

export default ExampleRouter
