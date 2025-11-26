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

$title  = isset($_GET['title']) ? $_GET['title'] : "";
$artist = isset($_GET['artist']) ? $_GET['artist'] : "";
$album  = isset($_GET['album']) ? $_GET['album'] : "";

$sql = "SELECT * FROM songs WHERE 1=1";

$params = [];

if ($title !== "") {
    $sql .= " AND title LIKE ?";
    $params[] = "%$title%";
}
if ($artist !== "") {
    $sql .= " AND artist LIKE ?";
    $params[] = "%$artist%";
}
if ($album !== "") {
    $sql .= " AND album LIKE ?";
    $params[] = "%$album%";
}
$sql .= " ORDER BY id desc";
$stmt = $pdo->prepare($sql);
$stmt->execute($params);

echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
