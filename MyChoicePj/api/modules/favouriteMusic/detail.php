<?php
header('Content-Type: application/json');

require_once __DIR__ . '/../../repositories/favouriteMusic/detailFavouriteMusic.php';

// Xử lý thêm mới FavouriteMusic
$detail_action = new DetailFavouriteMusic();
$detail_action->detail();