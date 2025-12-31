import BaseAddView from '../base/addView.js';
import FavouriteMusicAddModel from '../../models/favouriteMusic/addModel.js';
// Lớp view FavouriteMusicAddView
async function FavouriteMusicAddView () {
  const FavouriteMusicAddTemplate = await fetch('./html/template/FavouriteMusic/add_template.html').then(r => r.text());
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
          this._resetStatusMessage();
          if (result.status === 'success') {
            this.isSuccess = true;
            this.message = "Thêm bài hát thành công!";
            this._resetFormAdd();
          } else {
            this.isError = true;
            this.messageError = result.message;
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
      },

      /**
       * Xử lý reset lại status message
       * @private
       */
      _resetStatusMessage() {
        this.isSuccess = false;
        this.isError = false;
      }
    }
  });
}

export default FavouriteMusicAddView;