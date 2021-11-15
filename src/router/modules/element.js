import Layout from '@/layout'

const ElementRouter = {
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
}

export default ElementRouter
