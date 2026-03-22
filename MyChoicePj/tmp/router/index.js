import FavouriteMusicContainerView from '../../js/containers/favouriteMusic.js';
import LoginContainerView from '../../js/containers/login.js';
import MenuAdminView from '../../js/components/menuAdmin.js';
import FooterAdminView from '../../js/components/footerAdmin.js';
import showTitleScreenAdmin from '../../js/components/handle/TitleScreenAdmin.js';
// Đây là lớp route
const { createApp } = Vue;
const { createRouter, createWebHashHistory, RouterView } = VueRouter;

// Đây là route của các màn hình
const routes = [
  { path: '/login', component: LoginContainerView.LoginView },
  { path: '/favourite_music', component: FavouriteMusicContainerView.FavouriteMusicSearchView },
  { path: '/favourite_music/add', component: FavouriteMusicContainerView.FavouriteMusicAddView },
  { path: '/favourite_music/detail/:id', component: FavouriteMusicContainerView.FavouriteMusicDetailView }
]

// MenuAdmin view
const Router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// createApp(MenuAdminView).use(Router).mount('.menu-admin');

// Router view

const RouterViewMain = {
  components: { RouterView, MenuAdminView, FooterAdminView },
  computed: {
    isLogin() {
      return this.$route.path === '/login';
    }
  },
  template: `
    <div id="header" v-if="!isLogin"></div>
    <div id="main" :style="isLogin ? 'justify-content: center;' : ''">
      <menu-admin-view v-if="!isLogin"></menu-admin-view>
      <div id="main-right" :style="isLogin ? 'width: 40%;' : ''">
        <div class="title-menu"v-if="!isLogin">Quản lý âm nhạc yêu thích</div>
        <div class="title-function" v-if="!isLogin"><p><i class="fa fa-desktop"></i><span></span></p></div>
        <div id="main-body">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <footer-admin-view v-if="!isLogin"></footer-admin-view>
  `
};
const app = createApp(RouterViewMain);
app.use(Router);

Router.isReady().then(() => {
  app.mount('.admin-ui');
});

// Hiển thị title screen admin
showTitleScreenAdmin(Router);
