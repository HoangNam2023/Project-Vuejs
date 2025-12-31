const ConfirmDialogTemplate = await fetch('./html/template/components/modals/confirm_dialog.html').then(r => r.text());
/**
 * Tạo Confirm Dialog Vue Component giống view.
 */
function confirmDialogView({ message = "", confirmCallback = null }) {
  return {
    // template
    template: ConfirmDialogTemplate,

    /**
     * Data default
     * @override
     */
    data() {
      return {
        show: false,
        id: null,
        message
      };
    },

    /**
     * Xử lý methods
     */
    methods: {
      /**
       * Mở hộp thoại comfirm
       * @param {int} id 
       */
      openConfirmDialog(id) {
        this.id = id;
        this.show = true;
      },

      /**
       * Xác nhận
       * @param {int} id 
       */
      confirmDialog() {
        if (confirmCallback && this.id !== null) {
          confirmCallback(this.id);
        }
        this.closeConfirmDialog();
      },

      /**
       * Tắt hộp thoại comfirm
       */
      closeConfirmDialog() {
        this.show = false;
        this.id = null;
      }
    },
  };
}

export default confirmDialogView;