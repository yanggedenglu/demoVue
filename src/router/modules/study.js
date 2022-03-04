import Layout from '@/layout'

const StudyRouter = {
  path: '/study',
  name: 'study',
  redirect: '/study/main',
  meta: { title: 'study', icon: 'eye' },
  component: Layout,
  children: [
    {
      path: 'attribute',
      name: 'attribute',
      component: () => import('@/study/attribute/index'),
      meta: { title: 'attribute', icon: 'form' }
    },
    {
      path: 'canvas',
      name: 'canvas',
      component: () => import('@/study/canvas/index'),
      meta: { title: 'canvas' }
    },
    {
      path: 'copy',
      name: 'copy',
      component: () => import('@/study/copy'),
      meta: { title: 'copy' }
    },
    {
      path: 'directive',
      name: 'directive',
      component: () => import('@/study/directive'),
      meta: { title: 'directive' }
    },
    {
      path: 'export',
      name: 'export',
      component: () => import('@/study/export/xlxs.vue'),
      meta: { title: 'export' }
    },
    {
      path: 'log',
      name: 'log',
      component: () => import('@/study/log'),
      meta: { title: 'log' }
    },
    {
      path: 'main',
      name: 'main',
      component: () => import('@/study/main/index'),
      meta: { title: 'main', icon: 'form' }
    },
    {
      path: 'select',
      name: 'select',
      component: () => import('@/study/select/index'),
      meta: { title: 'select' }
    },
    {
      path: 'upload',
      name: 'upload',
      component: () => import('@/study/upload/index'),
      meta: { title: 'upload', icon: 'form' }
    }
  ]
}

export default StudyRouter
