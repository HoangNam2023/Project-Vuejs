<?php
header('Content-Type: application/json');

require_once __DIR__ . '/../../repositories/favouriteMusic/indexFavouriteMusic.php';

// Xử lý hiển thị thông tin FavouriteMusic
$index_action = new IndexFavouriteMusic();
$index_action->index();
