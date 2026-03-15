const MessageBoxViewTemplate = await fetch('./html/templates/components/modals/success_dialog.html').then(r => r.text());
/**
 * Tạo message box.
 */
function successDialogView({ message = "" }) {
  return {
    // Template
    template: MessageBoxViewTemplate,

    /**
     * Data default
     * @override
     */
    data() {
      return {
        showModal: false,
        message
      };
    },

    /**
     * Xử lý methods
     */
    methods: {
      /**
       * Hiển thị message box
       */
      showMessageBox() {
        this.showModal = true;
      },

      /**
       * Xác nhận message box
       */
      confirmMessageBox() {
        this.showModal = false;
      }
    }
  };
}

export default successDialogView;
