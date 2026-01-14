<?php
header('Content-Type: application/json');

require_once 'controller.php';

$controller = new FavouriteMusicController();

// Đọc JSON body
$data = json_decode(file_get_contents("php://input"), true);

// Debug: bỏ comment nếu cần
// var_dump($data); die;

if (!is_array($data)) {
    echo json_encode([
        'status' => false,
        'message' => 'Dữ liệu gửi lên không hợp lệ hoặc rỗng'
    ]);
    exit;
}

$controller->add($data); // sẽ echo response JSON bên trong add()

