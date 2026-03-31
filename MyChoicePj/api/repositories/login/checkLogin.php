<?php
ini_set('session.gc_maxlifetime', 60); // đặt trước
session_start();

// timeout 1 phút
$timeout = 10;

if (isset($_SESSION['last_activity']) &&
    (time() - $_SESSION['last_activity'] > $timeout)) {

    session_unset();
    session_destroy();

    echo json_encode([
        "logged_in" => false,
        "message" => "Session expired"
    ]);
    exit;
}

// cập nhật thời gian hoạt động
$_SESSION['last_activity'] = time();
require_once __DIR__ . "/../../config/database.php";
require_once __DIR__ . "/../../helpers/response.php";

// Repository xử lý CheckLogin
class CheckLogin
{
    private $db;

    /**
     * Constructor
     * Khởi tạo đối tượng và gán kết nối CSDL PDO
     */
    public function __construct()
    {
        global $pdo;
        $this->db = $pdo;
    }

    /**
     * Check thông tin login
     */
    public function check_login()
    {
        if (isset($_SESSION['user'])) {
            echo json_encode([
                "logged_in" => true,
                "user" => $_SESSION['user']
            ]);
        } else {
            echo json_encode([
                "logged_in" => false
            ]);
        }
    }
}
