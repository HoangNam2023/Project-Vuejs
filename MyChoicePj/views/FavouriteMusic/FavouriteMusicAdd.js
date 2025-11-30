import BaseAddView from '../base/addView.js';
import FavouriteMusicAddModel from '../../models/FavouriteMusic/FavouriteMusicAdd.js';
import confirmDialogView from '../../components/modals/SuccessDialog.js';
// Lớp view FavouriteMusicAddView
async function FavouriteMusicAddView () {
  const FavouriteMusicAddTemplate = await fetch('./template/FavouriteMusic/add_template.html').then(r => r.text());
  // Tạo component confirm dialog
  const successDialog = confirmDialogView({
    message: "Đăng ký bài hát yêu thích thành công!",
  });
  return BaseAddView({
    /**
     * @override
     */
    template: FavouriteMusicAddTemplate,
    data() {
      return {
        formAdd: FavouriteMusicAddModel,
        isSuccess: false,
      }
    },
    components: { 'success-dialog': successDialog },

    /**
     * Xử lý methods
     * @override
     */
    methods: {
      /**
       * Xử lý thêm mới
       * @private
       */
      async addFavouriteMusic() {
        try {
          const response = await fetch('http://localhost/Project-Vuejs/MyChoicePj/api/favourite_music_add.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.formAdd)
          });
          const result = await response.json();
          if (result.status === 'success') {
            this.isSuccess = true;
            this.message = "Thêm bài hát thành công!";
            this._resetFormAdd();
            this.$refs.successDialog.show();
          } else {
            alert(result.message);
          }
        } catch (error) {
          console.error(error);
          alert('Có lỗi xảy ra khi gửi dữ liệu!');
        }
      },

      /**
       * Xử lý reset lại form thêm mới
       * @private
       */
      _resetFormAdd() {
        this.formAdd.title = '';
        this.formAdd.artist = '';
        this.formAdd.album = '';
        this.formAdd.release_year = '';
        this.formAdd.created_at = '';
        this.formAdd.updated_at = '';
      }
    }
  });
}

export default FavouriteMusicAddView;