// FavouriteMusicSearch.js
import BaseSearchView from '../base/searchView.js';
import Model from '../../model/FavouriteMusicModel.js';
import Controller from '../../controller/FavouriteMusicController.js';
async function searchView() {
  const html = await fetch('./template/FavouriteMusic/search_template.html').then(r => r.text());

  return BaseSearchView({
    template: html,
    model: Model,
    controller: Controller,
    computed: {
      getListSong() {
        return this.model.songs;
      },
      getLoding() {
        return this.controller.loading;
      },
      getError() {
        return this.controller.error;
      }
    },
    mounted() {
      this.controller.fetchSongs?.();
    },
  });
}

export default searchView;