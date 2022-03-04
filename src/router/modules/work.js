import Layout from '@/layout'

const workLayout = {
  path: '/work',
  name: 'work',
  redirect: '/work/main',
  meta: { title: 'work', icon: 'form' },
  component: Layout,
  children: [
    {
      path: 'main',
      name: 'main',
      component: () => import('@/work/main/index'),
      meta: { title: 'main', icon: 'form' }
    },
    {
      path: 'canvas',
      name: 'canvas',
      component: () => import('@/work/canvas/index'),
      meta: { title: 'canvas', icon: 'form' }
    }
  ]
}

export default workLayout
