<?php
header('Content-Type: application/json');

// Kết nối database
$dsn = 'mysql:host=localhost;dbname=myChoice;charset=utf8';
$username = 'root';
$password = '';

try {
    $pdo = new PDO($dsn, $username, $password);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Kết nối database thất bại']);
    exit;
}

// Lấy ID từ query string
$id = isset($_GET['id']) ? $_GET['id'] : "";

$sql = "SELECT * FROM songs WHERE id = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$id]);

$song = $stmt->fetch(PDO::FETCH_ASSOC);

// Nếu không có bài hát
if (!$song) {
    echo json_encode([
        'success' => false,
        'message' => 'Không tìm thấy bài hát.'
    ]);
    exit;
}

// Trả về JSON đúng chuẩn
echo json_encode([
    'success' => true,
    'data' => $song
]);
