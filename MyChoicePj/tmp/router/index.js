import FavouriteMusicContainerView from '../../js/containers/favouriteMusic.js';
import LoginContainerView from '../../js/containers/login.js';
import MenuAdminView from '../../js/components/menuAdmin.js';
import FooterAdminView from '../../js/components/footerAdmin.js';
import showTitleScreenAdmin from '../../js/components/handle/TitleScreenAdmin.js';
import { checkLogin, logout } from '../../js/helpers/auth.js';
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
    data() {
    return {
      user: null
    };
  },

  computed: {
    isLogin() {
      return this.$route.path === '/login';
    }
  },

  async created() {
    const res = await checkLogin();
    if (res.logged_in) {
      this.user = res.user;
    }
  },
  methods: {
  async handleLogout() {
    await logout();
    this.$router.push('/login');
  }
},
  template: `
    <div id="header" v-if="!isLogin"><span v-if="user" style="
     margin-left: 400px; 
   ">Xin chào, {{ user }}</span>
    <a href="#"
   style="
     margin-left: 400px;
     display: inline-block;
     padding: 8px 14px;
     background-color: #e74c3c;
     color: #fff;
     border-radius: 6px;
     text-decoration: none;
     font-weight: 500;
     transition: 0.3s;
   "
   onmouseover="this.style.backgroundColor='#c0392b'"
   onmouseout="this.style.backgroundColor='#e74c3c'"

   @click.prevent="handleLogout"
>
  <i class="fa fa-sign-out"></i> Đăng xuất
</a>
    </div>
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

Router.beforeEach(async (to, from, next) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);

  const res = await checkLogin();

  if (authRequired && !res.logged_in) {
    return next('/login');
  }

  // Nếu đã login mà vào login → đá ra ngoài
  if (to.path === '/login' && res.logged_in) {
    return next('/favourite_music');
  }

  next();
});

// Hiển thị title screen admin
showTitleScreenAdmin(Router);
