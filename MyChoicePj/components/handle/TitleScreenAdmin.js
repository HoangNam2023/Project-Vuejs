// Xử lý hiển thị title màn hình admin
function showTitleScreenAdmin(Router) {
  const routeTitles = {
    "/favourite_music": "Tìm kiếm bài hát yêu thích",
    "/favourite_music/add": "Thêm bài hát yêu thích"
  };
  Router.afterEach((to) => {
    let titleEl = $(".title-function > p > span");
    const newTitle = routeTitles[to.fullPath] || "";
    titleEl.text(newTitle);
  });
}

export default showTitleScreenAdmin;