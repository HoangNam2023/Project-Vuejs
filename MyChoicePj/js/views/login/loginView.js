import BaseAddView from '../base/addView.js';
import LoginModel from '../../models/login/loginModel.js';

// Lớp view LoginView
async function LoginView() {
    const LoginTemplate = await fetch('./html/templates/login/login_template.html').then(r => r.text());
    return BaseAddView({
        /**
         * @override
         */
        template: LoginTemplate,

        components: {},

        /**
         * Data default
         * @override
         */
        data() {
            return {
                messageError: [],
                formLogin: LoginModel,
            }
        },

        /**
         * Xử lý methods
         * @override
         */
        methods: {
            /**
             * Xử lý login
             */
            async login() {
                try {
                    const response = await fetch('http://localhost/Project-Vuejs/MyChoicePj/api/modules/login/login.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        credentials: 'include',
                        body: JSON.stringify(this.formLogin)
                    });
                    const result = await response.json();
                    if (result) {
                        if (result.success) {
                            window.location.href = "http://localhost/project-vuejs/MyChoicePj/#/favourite_music";
                        }
                    }
                } catch (error) {
                    console.error(error);
                    alert('Có lỗi xảy ra khi gửi dữ liệu!');
                }
            }
        }
    });
}

export default LoginView;