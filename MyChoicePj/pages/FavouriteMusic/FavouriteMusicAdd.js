const FavouriteMusicAddPage = {
  template: `
    <form id="add-form" method="post">
      <table class="no-search">
        <tr>
          <td class="set-w-130px">
            <strong>ID</strong>
          </td>
          <td>
            <input type="text" name="id" value="">
          </td>
        </tr>
        <tr>
          <td>
            <strong>Tên bài hát</strong>
          </td>
          <td>
            <input type="text" name="title" value="">
          </td>
        </tr>
        <tr>
          <td>
            <strong>Nhạc sĩ</strong>
          </td>
          <td>
            <input type="text" name="artist" value="">
          </td>
        </tr>
        <tr>
          <td>
            <strong>Album</strong>
          </td>
          <td>
            <input type="text" name="album" value="">
          </td>
        </tr>
        <tr>
          <td>
            <strong>Ngày phát hành</strong>
          </td>
          <td>
            <input type="text" name="release_year" value="">
          </td>
        </tr>
        <tr>
          <td>
            <strong>Ngày tạo</strong>
          </td>
          <td>
            <input type="datetime-local" name="created_at" value="">
          </td>
        </tr>
        <tr>
          <td>
            <strong>Ngày cập nhật</strong>
          </td>
          <td>
            <input type="datetime-local" name="updated_at" value="">
          </td>
        </tr>
        <tr>
          <td colspan="2" class="set-text-c">
            <button class="update-btn" type="submit">
              <i class="fa fa-tasks"></i> Thêm mới
            </button>
          </td>
        </tr>
      </table>
    </form>
  `
}

export default FavouriteMusicAddPage;