import FavouriteMusicContainerView from '../../containers/FavouriteMusic.js';
import MenuAdminView from '../../components/MenuAdmin.js';
import FooterAdminView from '../../components/FooterAdmin.js';
import showTitleScreenAdmin from '../../components/handle/TitleScreenAdmin.js';
// Đây là lớp route
const { createApp } = Vue;
const { createRouter, createWebHashHistory, RouterView } = VueRouter;

// Đây là route của các màn hình
const routes = [
  { path:'/favourite_music', component:FavouriteMusicContainerView.FavouriteMusicSearchView },
  { path:'/favourite_music/add', component:FavouriteMusicContainerView.FavouriteMusicAddView }
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