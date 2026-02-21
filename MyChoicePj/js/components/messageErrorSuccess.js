const MessageErrorSuccessView = await fetch('./html/templates/components/message_error_success.html').then(r => r.text());
/**
 * Tạo message thông báo lỗi và thành công.
 * @param {Object} searchController
 * @param {Object} searchModel 
 */
function messageErrorSuccessView() {
  return {
    // Template
    template: MessageErrorSuccessView,

    /**
     * Data default
     * @override
     */
    data() {
      return {
        isError: false,
        isSuccess: false,
        msgSuccess: '',
        msgError: []
      };
    },

    /**
     * Xử lý methods
     */
    methods: {
      /**
       * Hiển thị message thành công
       * @param {string} msgSuccess 
       */
      showSuccessMessage(msgSuccess) {
        this.isSuccess = true;
        this.isError = false;
        this.msgSuccess = msgSuccess;
      },

      /**
       * Hiển thị message lỗi
       * @param {object} msgError 
       */
      showErrorMessage(msgError) {
        this.isSuccess = false;
        this.isError = true;
        this.msgError = msgError;
      },
    },
  };
}

export default messageErrorSuccessView;