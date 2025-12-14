import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import GeneratorView from '../views/GeneratorView.vue'
import LibraryView from '../views/LibraryView.vue'
import ExportView from '../views/ExportView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/generator', name: 'Generator', component: GeneratorView },
  { path: '/library', name: 'Library', component: LibraryView },
  { path: '/export', name: 'Export', component: ExportView },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router