import Layout from '@/layout'

const VueElementAdmin = {
  path: '/vueAdmin',
  name: 'vue-admin',
  redirect: '/vueAdmin/admin',
  meta: { title: 'vue-element模板', icon: 'layout' },
  component: Layout,
  children: [
    {
      path: 'admin',
      name: 'admin',
      component: () => import('@/vue-element-admin/admin'),
      meta: { title: '模板首页' }
    }
  ]
}

export default VueElementAdmin
