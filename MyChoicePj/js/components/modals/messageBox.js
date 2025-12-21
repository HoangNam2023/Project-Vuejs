const MessageBoxViewTemplate = await fetch('./html/template/components/modals/success_dialog.html').then(r => r.text());
/**
 * Tạo message box.
 */
function successDialogView({ message = "" }) {
  return {
    template: MessageBoxViewTemplate,
    data() {
      return {
        showModal: false,
        message
      };
    },

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