// Lớp view FavouriteMusicSearch
import BaseSearchView from '../base/searchView.js';
import FavouriteMusicModel from '../../models/FavouriteMusic/FavouriteMusicSearch.js';
import FavouriteMusicController from '../../controllers/FavouriteMusic.js';

async function FavouriteMusicSearchView() {
  const FavouriteMusicSearchTemplate = await fetch('./template/FavouriteMusic/search_template.html').then(r => r.text());

  return BaseSearchView({
    template: FavouriteMusicSearchTemplate,
    model: FavouriteMusicModel,
    controller: FavouriteMusicController,
    page: 1,          // Trang hiện tại
    pageSize: 5,      // Số lượng bài hát trên mỗi trang
    computed: {
      // Lấy danh sách bài hát
      getListSong() {
        return this.model.songs;
      },

      // Trạng thái loading
      getLoding() {
        return this.controller.loading;
      },

      // Lỗi trong quá trình tải dữ liệu
      getError() {
        return this.controller.error;
      },

      // Tính tổng số trang dựa trên tổng số bài hát
      totalPages() {
        return Math.ceil(this.model.songs.length / this.pageSize);
      },

      // Lấy danh sách bài hát cho trang hiện tại
      paginatedSongs() {
        const start = (this.page - 1) * this.pageSize;
        const end = this.page * this.pageSize;
        return this.model.songs.slice(start, end);
      }
    },

    methods: {
      // Thay đổi trang
      changePage(newPage) {
        if (newPage >= 1 && newPage <= this.totalPages) {
          this.page = newPage;
          // Tải lại bài hát khi trang thay đổi
          this.controller.fetchSongs?.();
        }
      }
    },

    mounted() {
      // Tải dữ liệu ngay khi component được render
      this.controller.fetchSongs?.();
    },

  });
}

export default FavouriteMusicSearchView;
