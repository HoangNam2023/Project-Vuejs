import FavouriteMusicContainerView from './container/FavouriteMusic.js';
import MenuAdminPage from './components/MenuAdmin.js';

const { createApp } = Vue;
const { createRouter, createWebHashHistory, RouterView } = VueRouter;

const routes = [
  { path:'/favourite_music', component:FavouriteMusicContainerView.FavouriteMusicSearchPage },
  { path:'/favourite_music/add', component:FavouriteMusicContainerView.FavouriteMusicAddPage }
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