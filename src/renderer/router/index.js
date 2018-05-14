import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'landing-page',
    //   component: require('@/components/LandingPage').default
    // },
    {
      path: '*',
      redirect: '/share-text'
    },
    {
      path: '/share-text',
      component: require('@/pages/share-text').default,
      meta: {
        title: '分享文本',
        icon: 'share'
      }
    },
    {
      path: '/setting',
      component: require('@/pages/setting').default,
      meta: {
        title: '设置',
        icon: 'settings'
      }
    }
  ]
})
