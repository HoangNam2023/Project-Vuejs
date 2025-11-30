const ConfirmDeleteTemplate = await fetch('./template/Components/modals/confirm_delete.html').then(r => r.text());
/**
 * Tạo Confirm Dialog Vue Component giống view.
 */
function confirmDialogView({ message = "", confirmCallback = null }) {
  return {
    template: ConfirmDeleteTemplate,
    data() {
      return {
        show: false,
        id: null,
        message
      };
    },

    methods: {
      // Mở dialog với ID (hoặc dữ liệu bất kỳ)
      open(id) {
        this.id = id;
        this.show = true;
      },

      // Xác nhận
      confirm() {
        if (confirmCallback && this.id !== null) {
          confirmCallback(this.id);
        }
        this.close();
      },

      // Hủy
      close() {
        this.show = false;
        this.id = null;
      }
    },

    mounted() {
      console.log('ConfirmDialog mounted');
    }
  };
}

export default confirmDialogView;
