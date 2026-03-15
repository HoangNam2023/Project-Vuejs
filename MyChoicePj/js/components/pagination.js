const paginationViewView = await fetch('./html/templates/components/pagination.html').then(r => r.text());
/**
 * Tạo phân trang cho màn hình tìm kiếm.
 * @param {Object} searchController
 * @param {Object} searchModel 
 */
function paginationView({ searchController, searchModel, modelKey }) {
  return {
    // Template
    template: paginationViewView,

    // Emit event 'update:paginatedItem' mỗi khi phân trang thay đổi
    emits: ['update:paginatedItem'],

    /**
     * Data default
     * @override
     */
    data() {
      return {
        controller: searchController,
        model: searchModel,
        modelKey,
        page: 1,
        pageSize: 5,
      };
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

      /**
       * Lấy danh sách
       */
      getListItem() {
        return this.model?.[this.modelKey] || [];
      },

      /**
       * Tính tổng số trang
       */
      totalPages() {
        return Math.ceil(this.getListItem.length / this.pageSize);
      },
    },

    /**
     * Xử lý methods
     */
    methods: {
      /**
       * Thay đổi trang
       * @param {int} newPage 
       */
      changePage(newPage) {
        if (newPage >= 1 && newPage <= this.totalPages) {
          this.page = newPage;
          this.emitPaginatedItem();
        }
      },

      /**
       * Lấy danh sách cho trang hiện tại
       */
      emitPaginatedItem() {
        const start = (this.page - 1) * this.pageSize;
        const end = this.page * this.pageSize;
        const items = this.getListItem.slice(start, end);
        this.$emit('update:paginatedItem', items);
      }
    },

    /**
     * Xử lý mounted
     */
    mounted() {
      this.emitPaginatedItem();
    },

    /**
     * Theo dõi sự thay đổi của model
     */
    watch: {
      getListItem() {
        this.page = 1;
        this.emitPaginatedItem();
      }
    }
  };
}

export default paginationView;
