<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");

// Preflight request cho CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit();
}

// Kết nối database
$dsn = 'mysql:host=localhost;dbname=myChoice;charset=utf8';
$username = 'root';
$password = '';

try {
    $pdo = new PDO($dsn, $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Kết nối database thất bại']);
    exit;
}

// Lấy ID
if (!isset($_GET['id'])) {
    echo json_encode([
        "success" => false,
        "message" => "Missing song ID"
    ]);
    exit;
}

$id = intval($_GET['id']);

// SQL xoá bài hát
$sql = "DELETE FROM songs WHERE id = ?";

$stmt = $pdo->prepare($sql);

try {
    $stmt->execute([$id]);

    // Kiểm tra số dòng bị ảnh hưởng
    if ($stmt->rowCount() > 0) {
        echo json_encode([
            'success' => true,
            'message' => "Xoá thành công bài hát ID $id"
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => "Không tìm thấy bài hát để xoá"
        ]);
    }

} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => "Lỗi SQL: " . $e->getMessage()
    ]);
}
