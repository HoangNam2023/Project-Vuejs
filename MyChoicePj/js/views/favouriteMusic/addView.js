import BaseAddView from '../base/addView.js';
import FavouriteMusicAddModel from '../../models/favouriteMusic/addModel.js';
import messageErrorSuccessView from '../../components/messageErrorSuccess.js';
// Lớp view FavouriteMusicAddView
async function FavouriteMusicAddView () {
  const FavouriteMusicAddTemplate = await fetch('./html/templates/FavouriteMusic/add_template.html').then(r => r.text());
  const messageErrorSuccess = messageErrorSuccessView();
  return BaseAddView({
    /**
     * @override
     */
    template: FavouriteMusicAddTemplate,

    /**
     * Data default
     * @override
     */
    data() {
      return {
        formAdd: FavouriteMusicAddModel,
        isSuccess: false,
        isError: false,
        messageError: []
      }
    },

    /**
     * Khai báo component
     * @override
     */
    components: {
      'message-error-success': messageErrorSuccess
    },

    /**
     * Xử lý methods
     * @override
     */
    methods: {
      /**
       * Xử lý thêm mới
       */
      async addFavouriteMusic() {
        try {
          const response = await fetch('http://localhost/Project-Vuejs/MyChoicePj/api/modules/favouriteMusic/add.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.formAdd)
          });
          const result = await response.json();
          if (result) {
            if (result.success) {
              this.$refs.messageErrorSuccess.showSuccessMessage("Thêm bài hát thành công!");
              this._resetFormAdd();
            } else {
              this.isError = true;
              this.$refs.messageErrorSuccess.showErrorMessage(result.message);
            }
          }
        } catch (error) {
          console.error(error);
          alert('Có lỗi xảy ra khi gửi dữ liệu!');
        }
      },

      /**
       * Xử lý trở về màn hình danh sách
       */
      handleClickBack() {
        window.location.href = '#/favourite_music';
      },

      /**
       * Xử lý reset lại form thêm mới
       * @private
       */
      _resetFormAdd() {
        this.formAdd.title = '';
        this.formAdd.artist = '';
        this.formAdd.album = '';
        this.formAdd.release_at = '';
      },

      /**
       * Xử lý reset lại status message
       * @private
       */
      _resetStatusMessage() {
        this.isSuccess = false;
        this.isError = false;
      }
    },

    /**
     * Xử lý mounted
     */
    mounted() {
      this._resetFormAdd();
    },
  });
}

export default FavouriteMusicAddView;