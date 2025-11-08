import FavouriteMusicSearchPage from './pages/FavouriteMusic/FavouriteMusicSearch.js';
import FavouriteMusicAddPage from './pages/FavouriteMusic/FavouriteMusicAdd.js';
import MenuAdminPage from './components/MenuAdmin.js';

const { createApp } = Vue;
const { createRouter, createWebHashHistory, RouterView } = VueRouter;

const routes = [
  { path:'/favourite_music', component:FavouriteMusicSearchPage },
  { path:'/favourite_music/add', component:FavouriteMusicAddPage }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

createApp(MenuAdminPage).use(router).mount('.menu-admin')

const MainBody = {
  components: { RouterView },
  template: `<router-view></router-view>`
}

createApp(MainBody).use(router).mount('#main-body')