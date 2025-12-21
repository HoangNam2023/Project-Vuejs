// Lớp controller FavouriteMusic
const FavouriteMusicDetailController = Vue.reactive({
  model: null,
  error: null,
  loading: false,
  apiDetail: window.env.API_URL + "/api/favourite_music_detail.php?id=",
  init(model) {
    this.model = model;
  },
  isSuccess: false,

  /**
   * Xử lý thu thập thông tin bài hát theo id
   * @param integer id
   */
  async fetchSongsById(id) {
    this.loading = true;
    this.error = null;
    try {
      const response = await fetch(this.apiDetail + id);
      const data = await response.json();
      if (data.success) this.model.song = [data.data];
      else this.error = 'Không thể tải bài hát.';
    } catch {
      this.error = 'Lỗi khi kết nối server.';
    } finally {
      this.loading = false;
    }
  },
}
)

export default FavouriteMusicDetailController;