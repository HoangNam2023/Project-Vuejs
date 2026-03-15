import FavouriteMusicContainerView from '../../js/containers/favouriteMusic.js';
import MenuAdminView from '../../js/components/menuAdmin.js';
import FooterAdminView from '../../js/components/footerAdmin.js';
import showTitleScreenAdmin from '../../js/components/handle/TitleScreenAdmin.js';
// Đây là lớp route
const { createApp } = Vue;
const { createRouter, createWebHashHistory, RouterView } = VueRouter;

// Đây là route của các màn hình
const routes = [
  { path: '/favourite_music', component: FavouriteMusicContainerView.FavouriteMusicSearchView },
  { path: '/favourite_music/add', component: FavouriteMusicContainerView.FavouriteMusicAddView },
  { path: '/favourite_music/detail/:id', component: FavouriteMusicContainerView.FavouriteMusicDetailView }
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

// Hiển thị title screen admin
showTitleScreenAdmin(Router);
