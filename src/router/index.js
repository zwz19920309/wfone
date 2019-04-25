import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage')
const signonList = r => require.ensure([], () => r(require('@/page/signon/signonList')), 'signonList')
const buildSignon = r => require.ensure([], () => r(require('@/page/signon/buildSignon')), 'buildSignon')
const buildScene = r => require.ensure([], () => r(require('@/page/signon/buildScene')), 'buildScene')
const sceneList = r => require.ensure([], () => r(require('@/page/signon/sceneList')), 'sceneList')
const prizeList = r => require.ensure([], () => r(require('@/page/signon/prizeList')), 'prizeList')
const scenesignon = r => require.ensure([], () => r(require('@/page/signon/scenesignon')), 'scenesignon')
const settings = r => require.ensure([], () => r(require('@/page/signon/settings')), 'settings')
const resignPlan = r => require.ensure([], () => r(require('@/page/signon/resignPlan')), 'resignPlan')
const awardList = r => require.ensure([], () => r(require('@/page/signon/awardList')), 'awardList')
const awardRecordList = r => require.ensure([], () => r(require('@/page/signon/awardRecordList')), 'awardRecordList')
export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: manage
    },
    {
      path: '/manage',
      component: manage,
      name: '',
      children: [{
        path: '/signonList',
        component: signonList,
        meta: []
      }, {
        path: '/buildSignon',
        component: buildSignon,
        meta: []
      },
      {
        path: '/buildScene',
        component: buildScene,
        meta: []
      },
      {
        path: '/sceneList',
        component: sceneList,
        meta: []
      },
      {
        path: '/prizeList',
        component: prizeList,
        meta: []
      },
      {
        path: '/scenesignon',
        component: scenesignon,
        meta: []
      },
      {
        path: '/settings',
        component: settings,
        meta: []
      },
      {
        path: '/resignPlan',
        component: resignPlan,
        meta: []
      },
      {
        path: '/awardList',
        component: awardList,
        meta: []
      },
      {
        path: '/awardRecordList',
        component: awardRecordList,
        meta: []
      }]
    }
  ]
})
