<?php
header("Content-Type: application/json");

require_once "controller.php";

$data = json_decode(file_get_contents("php://input"), true);
$controller = new FavouriteMusicController();

response($controller->store($data));