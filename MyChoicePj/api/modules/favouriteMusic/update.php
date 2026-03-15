<?php
header('Content-Type: application/json');

require_once __DIR__ . '/../../repositories/favouriteMusic/updateFavouriteMusic.php';

// Xử lý update thông tin FavouriteMusic
$update_action = new UpdateFavouriteMusic();
$data = json_decode(file_get_contents("php://input"), true);
$update_action->update($data);
