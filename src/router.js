import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/Home'
import blog from '@/components/Blog'
import missionstatement from '@/components/MissionStatement'
import contact from '@/components/Contact'
import writeblog from '@/components/WriteBlog'
import blogPost from '@/components/BlogPost'
import login from '@/components/Login'
import VueRouter from 'vue-router';
import drafts from '@/components/Drafts'
import editBlog from '@/components/EditBlog'

Vue.use(Router)


 const routes = [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/blog',
      name: 'blog',
      component: blog
    },
    {
      path: '/missionstatement',
      name: 'missionstatement',
      component: missionstatement
    },
    {
      path: '/contact',
      name: 'contact',
      component: contact
    },
    {
      path: '/writeblog',
      name: 'writeblog',
      component: writeblog,
      meta: { requiresAuth: true}
    },
    {
      path: '/blogpost:id',
      name: 'blogpost',
      component: blogPost
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/drafts',
      name: 'drafts',
      component: drafts,
      meta: { requiresAuth: true}
    },
    {
      path: '/editblog:id',
      name: 'editblog',
      component: editBlog,
      meta: { requiresAuth: true}
    }
  ]

const router = new VueRouter({
  routes
})

router.beforeResolve((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let user;
    Vue.prototype.$Amplify.Auth.currentAuthenticatedUser().then(data => {
      if (data && data.signInUserSession) {
        user = data;
      }
      next()
    }).catch((e) => {
      next({
        path: '/login'
      });
    });
  }
  next()
})

export default router
