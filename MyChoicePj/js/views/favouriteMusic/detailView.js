import BaseDetailView from '../base/detailView.js';
import FavouriteMusicUpdateModel from '../../models/favouriteMusic/updateModel.js';
import FavouriteMusicController from '../../controllers/FavouriteMusic/detailController.js';
import FavouriteMusicModel from '../../models/favouriteMusic/detailModel.js';
// Lớp view FavouriteMusicDetailView
async function FavouriteMusicDetailView() {
  // Nạp model vào Controller
  FavouriteMusicController?.init?.(FavouriteMusicModel);
  const FavouriteMusicDetailTemplate = await fetch('./html/templates/FavouriteMusic/detail_template.html').then(r => r.text());

  return BaseDetailView({
    /**
     * @override
     */
    template: FavouriteMusicDetailTemplate,

    /**
     * Data default
     * @override
     */
    data() {
      return {
        model: FavouriteMusicModel,
        controller: FavouriteMusicController,
        formUpdate: { ...FavouriteMusicUpdateModel },
        isSuccess: false
      }
    },

    /**
     * Xử lý computed
     * @override
     */
    computed: {
      /**
       * Trạng thái loading
       */
      getLoading() {
        return this.controller.loading;
      },
    },

    /**
     * Xử lý methods
     * @override
     */
    methods: {
      /**
       * Xử lý cập nhật
       * @private
       */
      async updateFavouriteMusic() {
        try {
          const response = await fetch('http://localhost/Project-Vuejs/MyChoicePj/api/favourite_music_update.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.formUpdate)
          });
          const result = await response.json();
          if (result.status === 'success') {
            this.isSuccess = true;
            this.message = "Cập nhật bài hát thành công!";
          } else {
            alert(result.message);
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
    },

    /**
     * Xử lý mounted
     * @override
     */
    mounted() {
      const id = this.$route.params.id;
      FavouriteMusicController.fetchSongsById?.(id);
    },

    /**
     * Theo dõi sự thay đổi của model
     */
    watch: {
      'model.song': {
        handler(newVal) {
          if (newVal.length) Object.assign(this.formUpdate, newVal[0]);
        },
        immediate: true
      }
    },
  });
}

export default FavouriteMusicDetailView;