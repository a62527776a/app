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
        describeText: '分享页底部文本',
        icon: 'share'
      }
    }
  ]
})
