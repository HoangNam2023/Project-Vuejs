<?php
header("Content-Type: application/json");

require_once "controller.php";

$data = json_decode(file_get_contents("php://input"), true);
$controller = new FavouriteMusicController();
if (!is_array($data)) {
    echo json_encode([
        'status' => false,
        'message' => 'Dữ liệu gửi lên không hợp lệ hoặc rỗng'
    ]);
    exit;
}

$controller->update($data);