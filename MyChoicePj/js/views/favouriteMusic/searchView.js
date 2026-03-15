import BaseSearchView from '../base/searchView.js';
import FavouriteMusicModel from '../../models/favouriteMusic/searchModel.js';
import FavouriteMusicController from '../../controllers/FavouriteMusic/searchController.js';
import confirmDialogView from '../../components/modals/confirmDialog.js';
import messageNoDataSearchView from '../../components/messageNoDataSearch.js';
import paginationView from '../../components/pagination.js';

// Lớp view FavouriteMusicSearch
async function FavouriteMusicSearchView() {
  const FavouriteMusicSearchTemplate = await fetch('./html/templates/FavouriteMusic/search_template.html').then(r => r.text());
  FavouriteMusicController?.init?.(FavouriteMusicModel);
  // Tạo component confirm dialog
  const confirmDialog = confirmDialogView({
    message: "Bạn có chắc muốn xóa bài hát này?",
    confirmCallback: async (id) => {
      await FavouriteMusicController.deleteSong(id);
      FavouriteMusicController.fetchSongs?.();
    }
  });
  // Tạo component không có kết quả search
  const messageNoDataSearch = messageNoDataSearchView({
    searchController: FavouriteMusicController,
    searchModel: FavouriteMusicModel
  });
  // Tạo component phân trang cho màn search
  const pagination = paginationView({
    searchController: FavouriteMusicController,
    searchModel: FavouriteMusicModel,
    modelKey: 'songs'
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
        paginatedSongs: []
      };
    },

    /**
     * Khai báo component
     * @override
     */
    components: {
      'confirm-dialog': confirmDialog,
      'message-no-data-search': messageNoDataSearch,
      'pagination': pagination
    },

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
       * Thu thập message
       */
      getMessage() {
        return this.controller.message;
      },

      /**
       * Thu thập message xóa thành công
       */
      getIsDeleteSuccess() {
        return this.controller.isDeleteSuccess;
      },

      // /**
      //  * Lấy danh sách bài hát cho trang hiện tại
      //  */
      // paginatedSongs() {
      //   this.model.songs = this.$refs.pagination.paginatedSongs();
      // }
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
        this.controller.isDeleteSuccess = false;
      },

      /**
       * In PDF FavouriteMusic
       */
      searchPrintPDFFavouriteMusic() {
        this.page = 1;
        this.controller.printPDF({
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
        this.controller.isDeleteSuccess = false;
      },

      // Mở modal và lưu id bài hát muốn xóa
      openDeleteModal(id) {
        this.$refs.confirmDialog.openConfirmDialog(id);
      },
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
