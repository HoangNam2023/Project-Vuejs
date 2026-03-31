<?php
ini_set('session.gc_maxlifetime', 1);
session_start();
require_once __DIR__ . "/../../config/database.php";
// require_once __DIR__ . "/../../validates/login.php";
require_once __DIR__ . "/../../helpers/response.php";

// Repository xử lý login
class Login
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
     * Thêm mới thông tin FavouriteMusic
     * @param {array} $data
     */
    public function login(array $data)
    {
        $userName = $data['user_name'] ?? '';
        $passWord = $data['pass'] ?? '';
        $sql = "SELECT * FROM users WHERE user_name = :user_name AND pass = :pass";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([
            ':user_name' => $userName,
            ':pass' => $passWord,
        ]);
        $login_check = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$login_check) {
            responseError('Không có dữ liệu bài hát');
        } else {
            $_SESSION['user'] = $data['user_name'];
            echo json_encode([
                "success" => true,
                "user" => $_SESSION['user']
            ]);
        }
    }
}
