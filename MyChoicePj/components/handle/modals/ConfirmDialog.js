function isConfirmDialog () {
    return {
      // Mở modal và lưu id bài hát muốn xóa
      openDeleteModal(id) {
        this.deleteId = id;
        this.showDeleteModal = true;
      },

      // Xác nhận hoặc hủy xóa
      async confirmDelete(result) {
        if (result && this.deleteId !== null) {
          // Thực hiện xóa bài hát
          await this.controller.deleteSong(this.deleteId);
        }
        // Ẩn modal và reset id
        this.showDeleteModal = false;
        this.deleteId = null;
      }
    }
}

export default isConfirmDialog;