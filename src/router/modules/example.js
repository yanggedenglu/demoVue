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
      path: 'test',
      name: 'ComIndex',
      component: () => import('@/views/test/index'),
      meta: { title: '组件', icon: 'table' }
    }
  ]
}

export default ExampleRouter
