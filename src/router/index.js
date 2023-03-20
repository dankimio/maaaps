import { createRouter, createWebHashHistory } from 'vue-router'

// 1. Define route components
const Home = { template: '<div>Home</div>' }
const About = { template: '<div>About</div>' }

// 2. Define some routes
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About }
]

// 3. Create the router instance and pass the `routes` option
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes
})

export default router
