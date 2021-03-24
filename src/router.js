import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home.vue'
import gigApp from './views/gig-app.vue'
import gigDetails from './views/gig-details.vue'
import gigEdit from './views/gig-edit.vue'
import checkout from './views/gig-checkout.vue'
import loginSignup from './views/login-signup.vue'
import userProfile from './views/user-profile.vue'

Vue.use(Router)

export const router = new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: home
        },
        {
            path: '/gig',
            name: 'gig',
            component: gigApp
        },
        {
            path: '/gig/edit/:gigId?',
            name: 'gigEdit',
            component: gigEdit
        },
        {
            path: '/gig/:gigId/details',
            name: 'gigDetails',
            component: gigDetails
        },
        {
            path: '/gig/:gigId/checkout',
            name: 'checkout',
            component: checkout
        },
        {
            path: '/login',
            name: 'login-signup',
            component: loginSignup
        },
        {
            path: '/user/:userId/Profile',
            name: 'user-profile',
            component: userProfile
        }

    ]
})
