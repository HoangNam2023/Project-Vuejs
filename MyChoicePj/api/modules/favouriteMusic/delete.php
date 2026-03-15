<?php
header('Content-Type: application/json');

require_once __DIR__ . '/../../repositories/favouriteMusic/deleteFavouriteMusic.php';

// Xử lý xóa thông tin FavouriteMusic
$delete_action = new DeleteFavouriteMusic();
$delete_action->delete();
