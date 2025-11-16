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
    echo json_encode(['error' => 'Kết nối database thất bại']);
    exit;
}

// Lấy từ khóa tìm kiếm từ query string


// Câu lệnh SQL
$sql = "SELECT * FROM songs";

// Thực thi truy vấn
$stmt = $pdo->prepare($sql);
$stmt->execute();
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Trả kết quả JSON
echo json_encode([
    'success' => true,
    'data' => $results
]);
