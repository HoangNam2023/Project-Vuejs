// Lớp controller FavouriteMusic
const FavouriteMusicController = Vue.reactive({
    model: null,
    error: null,
    loading: false,
    apiUrl: window.env.API_URL + "/api/favourite_music_add.php",
    init(model) {
        this.model = model;
    },
    async fetchSongs() {
        this.loading = true;
        this.error = null;
        try {
          const response = await fetch(window.env.API_URL + "api/favourite_music_search.php");
          const data = await response.json();
          if (data.success) this.model.songs = data.data;
          else this.error = 'Không thể tải danh sách bài hát.';
        } catch {
          this.error = 'Lỗi khi kết nối server.';
        } finally {
          this.loading = false;
        }
    },
})

export default FavouriteMusicController;