import FavouriteMusicContainerView from '../../containers/FavouriteMusic.js';
import MenuAdminView from '../../components/MenuAdmin.js';
import FooterAdminView from '../../components/FooterAdmin.js';

const { createApp } = Vue;
const { createRouter, createWebHashHistory, RouterView } = VueRouter;

const routes = [
  { path:'/favourite_music', component:FavouriteMusicContainerView.FavouriteMusicSearchPage },
  { path:'/favourite_music/add', component:FavouriteMusicContainerView.FavouriteMusicAddPage }
]

// MenuAdmin view
const Router = createRouter({
  history: createWebHashHistory(),
  routes,
})
createApp(MenuAdminView).use(Router).mount('.menu-admin');

// Router view
const RouterViewMain = {
  components: { RouterView },
  template: `<router-view></router-view>`
}
createApp(RouterViewMain).use(Router).mount('#main-body');

// FooterAdmin view
createApp(FooterAdminView).mount('#footer');