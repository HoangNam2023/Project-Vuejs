<?php
header("Content-Type: application/json");

require_once "controller.php";

$controller = new FavouriteMusicController();
responseSuccess($controller->index());