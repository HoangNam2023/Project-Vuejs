const SuccessDialogViewTemplate = await fetch('./template/Components/modals/success_dialog.html').then(r => r.text());
/**
 * Tạo Confirm Dialog Vue Component giống view.
 */
function successDialogView({ message = "" }) {
  return {
    template: SuccessDialogViewTemplate,
    data() {
      return {
        showModal: false,
        message
      };
    },

    methods: {
      show() {
        this.showModal = true;
      },
      confirmOK() {
        this.showModal = false;
      }
    }
  };
}

export default successDialogView;
