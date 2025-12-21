import BaseDetailView from '../base/detailView.js';
import FavouriteMusicUpdateModel from '../../models/favouriteMusic/updateModel.js';
import FavouriteMusicController from '../../controllers/FavouriteMusic/detailController.js';
import FavouriteMusicModel from '../../models/favouriteMusic/detailModel.js';
import MessageBoxView from '../../components/modals/messageBox.js';
// Lớp view FavouriteMusicDetailView
async function FavouriteMusicDetailView() {
  // Nạp model vào Controller
  FavouriteMusicController?.init?.(FavouriteMusicModel);
  const FavouriteMusicDetailTemplate = await fetch('./html/template/FavouriteMusic/detail_template.html').then(r => r.text());
  // Tạo component confirm dialog
  const messageBox = MessageBoxView({
    message: "Cập nhật bài hát yêu thích thành công!",
  });
  return BaseDetailView({
    /**
     * @override
     */
    template: FavouriteMusicDetailTemplate,

    data() {
      return {
        model: FavouriteMusicModel,
        controller: FavouriteMusicController,
        formUpdate: { ...FavouriteMusicUpdateModel },
        isSuccess: false
      }
    },
    components: { 'message-box': messageBox },

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
            this.$refs.messageBox.showMessageBox();
            setTimeout(() => {
              this.isSuccess = false;
            }, 3000);
          } else {
            alert(result.message);
          }
        } catch (error) {
          console.error(error);
          alert('Có lỗi xảy ra khi gửi dữ liệu!');
        }
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