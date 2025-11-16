async function FavouriteMusicAddPage () {
  const html = await fetch('./template/FavouriteMusic/add_template.html').then(r => r.text());
  return {
    template: html,
    data() {
      return {
        form: {
          id: '',
          title: '',
          artist: '',
          album: '',
          release_year: '',
          created_at: '',
          updated_at: ''
        }
      }
    },
    methods: {
      async handleSubmit() {
        try {
          const response = await fetch('http://localhost/Project-Vuejs/MyChoicePj/api/favourite_music_add.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.form)
          });

          const result = await response.json();
          if (result.status === 'success') {
            alert('🎵 Thêm mới thành công!');
            this.resetForm();
          } else {
            alert('❌ ' + result.message);
          }
        } catch (error) {
          console.error(error);
          alert('⚠️ Có lỗi xảy ra khi gửi dữ liệu!');
        }
      },
      resetForm() {
        this.form = {
          id: '',
          title: '',
          artist: '',
          album: '',
          release_year: '',
          created_at: '',
          updated_at: ''
        };
      }
    }
  };
}

export default FavouriteMusicAddPage;
