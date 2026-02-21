<?php
header('Content-Type: application/json');

require_once __DIR__ . '/../../repositories/favouriteMusic/addFavouriteMusic.php';

// Xử lý thêm mới FavouriteMusic
$add_action = new AddFavouriteMusic();
$data = json_decode(file_get_contents("php://input"), true); 
$add_action->add($data);