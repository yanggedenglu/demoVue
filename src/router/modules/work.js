import Layout from '@/layout'

const workLayout = {
  path: '/work',
  name: 'work',
  redirect: '/work/main',
  meta: { title: 'work', icon: 'form' },
  component: Layout,
  children: [
    {
      path: 'canvas',
      name: 'canvas',
      component: () => import('@/work/canvas/index'),
      meta: { title: 'canvas', icon: 'form' }
    },
    {
      path: 'psd',
      name: 'psd',
      component: () => import('@/work/psd/index'),
      meta: { title: 'psd', icon: 'form' }
    }
  ]
}

export default workLayout
