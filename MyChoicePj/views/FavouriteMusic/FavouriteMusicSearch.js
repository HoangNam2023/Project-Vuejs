import BaseSearchView from '../base/searchView.js';
import FavouriteMusicModel from '../../models/FavouriteMusic/FavouriteMusicSearch.js';
import FavouriteMusicController from '../../controllers/FavouriteMusic.js';
import confirmDialogView from '../../components/modals/ConfirmDelete.js';

// Lớp view FavouriteMusicSearch
async function FavouriteMusicSearchView() {
  const FavouriteMusicSearchTemplate = await fetch('./template/FavouriteMusic/search_template.html').then(r => r.text());
FavouriteMusicController?.init?.(FavouriteMusicModel);
  // Tạo component confirm dialog
  const confirmDialog = confirmDialogView({
    message: "Bạn có chắc muốn xóa bài hát này?",
    confirmCallback: async (id) => {
      await FavouriteMusicController.deleteSong(id);
      FavouriteMusicController.fetchSongs?.();
    }
  });
  // Kế thừa BaseSearchView
  return BaseSearchView({
    /**
     * @override
     */
    template: FavouriteMusicSearchTemplate,
     data() {
      return {
            model: FavouriteMusicModel,
    controller: FavouriteMusicController,
    page: 1,
    pageSize: 5,
    formSearch: {
      title: '',
      artist: '',
      album: ''
    },
    showDeleteModal: false,
    deleteId: null,
      };
    },


    components: { 'confirm-dialog': confirmDialog },

    /**
     * Xử lý computed
     * @override
     */
    computed: {
      /**
       * Lấy danh sách bài hát
       */
      getListSong() {
        return this.model.songs;
      },

      /**
       * Trạng thái loading
       */
      getLoading() {
        return this.controller.loading;
      },

      /**
       * Lỗi trong quá trình tải dữ liệu
       */
      getError() {
        return this.controller.error;
      },

      /**
       * Tính tổng số trang dựa trên tổng số bài hát
       */
      totalPages() {
        return Math.ceil(this.model.songs.length / this.pageSize);
      },

      /**
       * Lấy danh sách bài hát cho trang hiện tại
       */
      paginatedSongs() {
        const start = (this.page - 1) * this.pageSize;
        const end = this.page * this.pageSize;
        return this.model.songs.slice(start, end);
      }
    },

    /**
     * Xử lý methods
     * @override
     */
    methods: {
      /**
       * Thay đổi trang
       * @param {int} newPage 
       */
      changePage(newPage) {
        if (newPage >= 1 && newPage <= this.totalPages) {
          this.page = newPage;
          this.controller.fetchSongs?.();
        }
      },

      /**
       * Tìm kiếm thông tin FavouriteMusic
       */
      searchFavouriteMusic() {
        this.page = 1;
        this.controller.searchSongs({
          title: this.formSearch.title,
          artist: this.formSearch.artist,
          album: this.formSearch.album
        });
      },

      /**
       * Clear thông tin form search
       */
      clearFormSearch() {
        this.formSearch.title = '',
        this.formSearch.artist = '',
        this.formSearch.album = ''
        this.controller.fetchSongs?.();
      },

      // Mở modal và lưu id bài hát muốn xóa
      openDeleteModal(id) {
        this.$refs.confirmDialog.open(id);
      }
    },

    /**
     * Xử lý mounted
     * @override
     */
    mounted() {
      // Tải dữ liệu ngay khi component được render
      this.controller.fetchSongs?.();
    },
  });
}

export default FavouriteMusicSearchView;