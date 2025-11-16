<?php
// ------------------------
// ⚙️ Cấu hình đầu file
// ------------------------
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// ------------------------
// 🧩 Kết nối Database
// ------------------------
$host = "localhost";     // tên host (ví dụ: localhost)
$user = "root";          // username MySQL
$pass = "";              // password MySQL
$db   = "mychoice";       // tên database của bạn

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    echo json_encode([
        "status" => "error",
        "message" => "Kết nối CSDL thất bại: " . $conn->connect_error
    ]);
    exit;
}

// ------------------------
// 📥 Nhận dữ liệu JSON từ Vue.js
// ------------------------
$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (!$data) {
    echo json_encode([
        "status" => "error",
        "message" => "Không nhận được dữ liệu JSON hợp lệ!"
    ]);
    exit;
}

// ------------------------
// 📝 Lấy dữ liệu từ body
// ------------------------
$id           = $data['id'] ?? '';
$title        = $data['title'] ?? '';
$artist       = $data['artist'] ?? '';
$album        = $data['album'] ?? '';
$release_year = $data['release_year'] ?? '';
$created_at   = $data['created_at'] ?? date("Y-m-d H:i:s");
$updated_at   = $data['updated_at'] ?? date("Y-m-d H:i:s");

// ------------------------
// ⚠️ Kiểm tra dữ liệu bắt buộc
// ------------------------
if (empty($title) || empty($artist)) {
    echo json_encode([
        "status" => "error",
        "message" => "Vui lòng nhập đầy đủ Tên bài hát và Nhạc sĩ!"
    ]);
    exit;
}

// ------------------------
// 💾 Thực hiện thêm vào database
// ------------------------
$stmt = $conn->prepare("INSERT INTO songs 
    (id, title, artist, album, release_year, created_at, updated_at) 
    VALUES (?, ?, ?, ?, ?, ?, ?)");

if (!$stmt) {
    echo json_encode([
        "status" => "error",
        "message" => "Lỗi truy vấn: " . $conn->error
    ]);
    exit;
}

$stmt->bind_param("sssssss", $id, $title, $artist, $album, $release_year, $created_at, $updated_at);

if ($stmt->execute()) {
    echo json_encode([
        "status" => "success",
        "message" => "🎵 Thêm mới bài hát thành công!"
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "❌ Lỗi khi thêm bài hát: " . $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>
