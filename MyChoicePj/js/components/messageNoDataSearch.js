const MessageNoDataSearchView = await fetch('./html/template/components/message_no_data_search.html').then(r => r.text());
/**
 * Tạo message thông báo không có data tìm kiếm.
 * @param {Object} searchController
 * @param {Object} searchModel 
 */
function messageNoDataSearchView({ searchController, searchModel }) {
  return {
    // Template
    template: MessageNoDataSearchView,

    /**
     * Data default
     * @override
     */
    data() {
      return {
        controller: searchController,
        model: searchModel
      };
    },

    computed: {
      /**
       * Trạng thái loading
       */
      getLoading() {
        return this.controller.loading;
      },

      /**
       * Lấy danh sách bài hát
       */
      getListSong() {
        return this.model.songs;
      },
    },
  };

}

export default messageNoDataSearchView;