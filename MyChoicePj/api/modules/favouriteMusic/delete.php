<?php
header("Content-Type: application/json");
require_once "controller.php";

// Đây là API xóa thông tin FavouriteMusic
$controller = new FavouriteMusicController();
$controller->delete($_GET["id"] ?? null);