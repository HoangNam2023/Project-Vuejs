<?php
header("Content-Type: application/json");
require_once "controller.php";

// Đây là API thu thập thông tin FavouriteMusic
$controller = new FavouriteMusicController();
responseDataSuccess($controller->index());